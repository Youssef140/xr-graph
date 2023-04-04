AFRAME.registerComponent('grabbable', {
    schema: {
        debug: {
            default: false
        }
    },
    init: function() {
        this.boxHelper = new THREE.BoxHelper();
    },
    update: function() {

    },
    tick: function() {
        if (this.data.debug) {
            try {
                this.boxHelper.setFromObject(this.el.object3D, new THREE.Color(Math.random(), Math.random(), Math.random()));
                if (!this.boxHelper.parent) { this.el.sceneEl.object3D.add(this.boxHelper); }
            } catch(error) {
                AFRAME.log(error);
            }
            
        }
    }
  });