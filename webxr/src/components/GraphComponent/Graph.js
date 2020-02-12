import { SpriteText2D, textAlign } from 'three-text2d'
import { MathExpression } from './MathExpression';
import { MathGraphMaterial } from './MathGraphShader';
import { MathCurveMaterial } from './MathCurveShader';
const createTubeGeometry = require('./createTubeGeometry');

AFRAME.registerComponent('graph', {
    schema: {
        segmentsMultiplier: {
            default: 2
        },
        showGrid: {
            default: true
        },
        showBoundingLabels: {
            default: true
        },
        showAxes: {
            default: false
        },
        showBoundingBox: {
            default: false
        },
        showWireframe: {
            default: false
        },
        function: {
            default: "f(u, v) = [1.5 * u, 0.1 * u^2 * cos(v), 0.1 * u^2 * sin(v)]"
        }
    },
    init: function () {

        this.boundariesNeedUpdate = false;

        this.expression = new MathExpression(this.data.function);
        this.boundingBox = this.createColliderBox(this.expression, 20);
        this.graph = this.createGraph(this.expression);
        
        this.el.object3D.colliderBox = new THREE.Box3();
        this.el.object3D.colliderBox.copy( this.boundingBox ).applyMatrix4( this.graph.matrixWorld );
        this.boundingBoxVisual = new THREE.Box3Helper(this.boundingBox, 0xffffff);
        
        this.root = new THREE.Group();
        this.root.add(this.graph);

        this.root.add(this.boundingBoxVisual);
        
        this.updateAxesLabels();
        this.root.add(this.labels);

        // weird fix
        new THREE.BufferGeometry();

        this.root.scale.set(0.1, 0.1, 0.1)

        //root.add(this.makeZeroPlanes())
        this.el.setObject3D('mesh', this.root)

    },
    createGraph: function(expression) {
        // function mapping:
        // 1 input 1 output = curve
        // 1 input 2 output = curve
        // 1 input 3 output = curve
        // 2 input 1 output = graph (x,y,f(x,y))
        // 2 input 3 output = graph
        
        const inputSize = expression.getInputSize();
        const outputSize = expression.getOutputSize();
        if (inputSize == 1) {            
            return this.createCurve(expression);
        } else if (inputSize == 2) {
            if (outputSize == 1) {
                return this.createSurface(expression);
            } else {
                return this.createSurface(expression);
            }
        }
    },
    update: function (oldData) {

        if (this.data.function != oldData.function) {
            this.expression = new MathExpression(this.data.function);
            this.root.remove(this.graph);
            this.createGraph(this.expression);
            this.root.add(this.graph);
            this.boundariesNeedUpdate = true;
        }

        if (this.data.showBoundingLabels != oldData.showBoundingLabels) {
            this.labels.visible = this.data.showBoundingLabels;
        }
        if (this.data.showBoundingBox != oldData.showBoundingBox) {
            this.boundingBoxVisual.visible = this.data.showBoundingBox;
        }
        if (this.data.showWireframe != oldData.showWireframe) {
            if (this.graph.material.uniforms.wireframeActive != null )
            this.graph.material.uniforms.wireframeActive.value = this.data.showWireframe;
        }

        this.expression.getParameters().forEach(param => {
            if (this.data[param+"Min"] != oldData[param+"Min"]) {
                let min = -6;
                if (this.data[param+"Min"] != null) {
                    min = this.data[param+"Min"]
                }
                this.graph.material.uniforms[param+"Min"].value = min;
                this.boundariesNeedUpdate = true;
            }
            if (this.data[param+"Max"] != oldData[param+"Max"]) {
                let max = 6;
                if (this.data[param+"Max"] != null) {
                    max = this.data[param+"Max"]
                }
                this.graph.material.uniforms[param+"Max"].value = max;
                this.boundariesNeedUpdate = true;
            }
        });
        this.expression.getVariables().forEach(param => {
            if (this.data[param] != oldData[param]) {
                if (this.data[param] != null) {
                    this.graph.material.uniforms[param].value = this.data[param]
                    this.boundariesNeedUpdate = true;
               }
            }
        });

        if (this.boundariesNeedUpdate) {
            this.updateBoundaries();
            if (this.yMax != null) {
                this.graph.material.uniforms.yBoundaryMax.value = this.yMax;
            }
            if (this.yMin != null) {
                this.graph.material.uniforms.yBoundaryMin.value = this.yMin;
            }
            this.updateAxesLabels();
        }
        this.boundariesNeedUpdate = false;

    },
    updateSchema: function (newData) {
        if (newData.function !== this.oldData.function) {
            const expression = new MathExpression(newData.function);
            let schema = {};
            expression.getParameters().forEach(param => {
                schema[param+"Min"] = {
                    default: -6
                };
                schema[param+"Max"] = {
                    default: 6
                };
            });
            expression.getVariables().forEach(param => {
                schema[param] = {
                    default: 1
                };
            });
          this.extendSchema(schema);
        }
    },
    getParameterExtrema: function (expression) {
        let parameterExtrema = {};
        expression.getParameters().forEach(param => {
            let min = -6;
            let max = 6;
            if (this.data[param+"Min"] != null) {
                min = parseFloat(this.data[param+"Min"])
            }
            if (this.data[param+"Max"] != null) {
                max = parseFloat(this.data[param+"Max"])
            }
            parameterExtrema[param] = {
                min: min,
                max: max,
                range: max - min
            }
        });
        
        return parameterExtrema;
    },
    createColliderBox: function (expression, segments = 100) {

        const extrema = this.getParameterExtrema(expression);
        const parameters = expression.getParameters();        

        let explicitFunctionParameter = [];

        function cartesianProduct(arr) {
            return arr.reduce(function(a,b){
                return a.map(function(x){
                    return b.map(function(y){
                        return x.concat([y]);
                    })
                }).reduce(function(a,b){ return a.concat(b) },[])
            }, [[]])
        }

        for (let i = 0; i < parameters.length; i++) {
            const extremum = extrema[parameters[i]];
            explicitFunctionParameter[i] = new Array(segments + 1);
            for (let segmentIndex = 0; segmentIndex <= segments; segmentIndex++) {
                explicitFunctionParameter[i][segmentIndex] = extremum.min + extremum.range / segments * segmentIndex;
            }
        }
        explicitFunctionParameter = cartesianProduct(explicitFunctionParameter);

        this.xMin = null;
        this.xMax = null;
        this.yMin = null;
        this.yMax = null;
        this.zMin = null;
        this.zMax = null;

        let xValue;
        let yValue;
        let zValue;

        let variables = {}
        for (const variable of expression.getVariables()) {
            variables[variable] = 1;
            if (this.data[variable] != null) {
                variables[variable] = parseFloat(this.data[variable])
            }
        }
        let JSFunc = expression.getJSFunction(variables);
        const inputSize = expression.getInputSize();
        const outputSize = expression.getOutputSize();
        let func;
        if (inputSize == 2 && outputSize == 1) {
            func = (x,y) => [x,JSFunc(x,y),y]
        } else {
            func = JSFunc;
        }
        for (let i = 0; i < explicitFunctionParameter.length; i++) {
            xValue = func(...explicitFunctionParameter[i])[0];
            yValue = func(...explicitFunctionParameter[i])[1];
            zValue = func(...explicitFunctionParameter[i])[2];

            if (this.xMin == null || xValue < this.xMin) {
                this.xMin = xValue
            }
            if (this.xMax == null || xValue > this.xMax) {
                this.xMax = xValue
            }
            if (this.yMin == null || yValue < this.yMin) {
                this.yMin = yValue
            }
            if (this.yMax == null || yValue > this.yMax) {
                this.yMax = yValue
            }
            if (this.zMin == null || zValue < this.zMin) {
                this.zMin = zValue
            }
            if (this.zMax == null || zValue > this.zMax) {
                this.zMax = zValue
            }
        }
        const minVec = new THREE.Vector3(this.xMin, this.yMin, this.zMin);
        const maxVec = new THREE.Vector3(this.xMax, this.yMax, this.zMax);

        this.xRange = this.xMax - this.xMin;
        this.yRange = this.yMax - this.yMin;
        this.zRange = this.zMax - this.zMin;

        return new THREE.Box3(minVec, maxVec)
    },
    tick: function () {
        if (this.boundingBox != null) {
            this.el.object3D.colliderBox.copy( this.boundingBox ).applyMatrix4( this.graph.matrixWorld );
        }
    },
    updateBoundaries: function() {
        this.boundingBox = this.createColliderBox(this.expression, 20);
        this.boundingBoxVisual.box = this.boundingBox;
        if (this.graph != null) {
            if (this.yMax != null) {
                this.graph.material.uniforms.yBoundaryMax.value = this.yMax;
            }
            if (this.yMin != null) {
                this.graph.material.uniforms.yBoundaryMin.value = this.yMin;
            }
        }
    },
    createSurface: function (expression) {
        new THREE.BufferGeometry();
        const graphGeometry = new THREE.PlaneBufferGeometry(1, 1, 200, 200);
        graphGeometry.scale(1, 1, 1);
        const graphMat = new MathGraphMaterial(expression);
        const graph = new THREE.Mesh(graphGeometry, graphMat.material);
        graph.frustumCulled = false;

        return graph;
    },
    createCurve: function (expression) {

        const numSides = 8;
        const subdivisions = 100;

        const graphGeometry = createTubeGeometry(numSides, subdivisions);
        graphGeometry.scale(1, 1, 1);
        const graphMat = new MathCurveMaterial(expression, subdivisions)
        const graph = new THREE.Mesh(graphGeometry, graphMat.material);
        graph.frustumCulled = false;

        return graph;
    },
    makeAxes: function () {
        var size = Math.min(this.xRange, this.yRange, this.zRange) / 2
        var axes = new THREE.AxesHelper(size);
        axes.position.set(this.xMin, this.yMin, this.zMin)
        return axes;
    },
    updateAxesLabels: function () {

        const scale = 0.02;
        const space = 0.2;
        const offset = 0.6;
        
        if (this.xMinText == null) {            
            this.xMinText = new SpriteText2D("", {fillStyle: "#fb2841"});
        }
        this.xMinText.text = (Math.floor(this.xMin * 100) / 100).toString();
        this.xMinText.scale.set(scale,scale,scale);
        this.xMinText.position.set(this.xMin + space, this.yMin, this.zMin - offset);
        if (this.xMaxText == null) {
            this.xMaxText = new SpriteText2D("", {fillStyle: "#fb2841"});
        }
        this.xMaxText.text = (Math.floor(this.xMax * 100) / 100).toString();
        this.xMaxText.scale.set(scale,scale,scale);
        this.xMaxText.position.set(this.xMax - space, this.yMin, this.zMin - offset)

        if (this.yMinText == null) {
            this.yMinText = new SpriteText2D("", {fillStyle: "#14eb0d"});
        }
        this.yMinText.text = (Math.floor(this.yMin * 100) / 100).toString();
        this.yMinText.scale.set(scale,scale,scale);
        this.yMinText.position.set(this.xMax + offset, this.yMin + space, this.zMax + offset);
        if (this.yMaxText == null) {
            this.yMaxText = new SpriteText2D("", {fillStyle: "#14eb0d"});
        }
        this.yMaxText.text = (Math.floor(this.yMax * 100) / 100).toString();
        this.yMaxText.scale.set(scale,scale,scale);
        this.yMaxText.position.set(this.xMax + offset, this.yMax - space, this.zMax + offset)

        if (this.zMinText == null) {
            this.zMinText = new SpriteText2D("", {fillStyle: "#49caf3"});
        }
        this.zMinText.text = (Math.floor(this.zMin * 100) / 100).toString();
        this.zMinText.scale.set(scale,scale,scale);
        this.zMinText.position.set(this.xMin - offset, this.yMin, this.zMin + space);
        if (this.zMaxText == null) {
            this.zMaxText = new SpriteText2D("", {fillStyle: "#49caf3"});
        }
        this.zMaxText.text = (Math.floor(this.zMax * 100) / 100).toString();
        this.zMaxText.scale.set(scale,scale,scale);
        this.zMaxText.position.set(this.xMin - offset, this.yMin, this.zMax - space)

        if (this.labels == null) {
            this.labels = new THREE.Group();
            this.labels.add(this.xMinText);
            this.labels.add(this.xMaxText);
            this.labels.add(this.yMinText);
            this.labels.add(this.yMaxText);
            this.labels.add(this.zMinText);
            this.labels.add(this.zMaxText);
        }
    }
})