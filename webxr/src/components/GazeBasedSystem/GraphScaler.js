import { THREE } from "aframe";
import { MeshText2D } from "three-text2d";
import { getDevice } from "./DeviceCamera";

window.addEventListener("load", () => {
  if (getDevice() === "Desktop" || getDevice() === "Mobile") {
    let titlesGroup = new THREE.Group();

    let scaleTitle = new MeshText2D("Graph Scale:", { fillStyle: "#ffffff" });
    scaleTitle.scale.set(0.001, 0.001, 0.001);
    scaleTitle.position.set(0, 0.4, 0.2);
    scaleTitle.rotation.set(0, -Math.PI / 2, 0);

    let rangeTitle = new MeshText2D("Graph Range:", { fillStyle: "#ffffff" });
    rangeTitle.scale.set(0.001, 0.001, 0.001);
    rangeTitle.position.set(0, 0.2, 0.2);
    rangeTitle.rotation.set(0, -Math.PI / 2, 0);

    let rangeXTitle = new MeshText2D("X:", { fillStyle: "#ffffff" });
    rangeXTitle.scale.set(0.001, 0.001, 0.001);
    rangeXTitle.position.set(0, 0.13, 0.08);
    rangeXTitle.rotation.set(0, -Math.PI / 2, 0);

    let rangeYTitle = new MeshText2D("Y:", { fillStyle: "#ffffff" });
    rangeYTitle.scale.set(0.001, 0.001, 0.001);
    rangeYTitle.position.set(0, 0.05, 0.08);
    rangeYTitle.rotation.set(0, -Math.PI / 2, 0);

    titlesGroup.add(scaleTitle);
    titlesGroup.add(rangeTitle);
    titlesGroup.add(rangeXTitle);
    titlesGroup.add(rangeYTitle);
    let titlesEntity = document.createElement("a-entity");
    titlesEntity.setObject3D("mesh", titlesGroup);

    let scalePlus = document.createElement("a-entity");
    scalePlus.setAttribute("class", "scaleButton");
    scalePlus.setAttribute("id", "scalePlus");
    scalePlus.setAttribute("gltf-model", "#plus");
    scalePlus.setAttribute("scale", "0.0055 0.0055 0.0055");
    scalePlus.setAttribute("rotation", "0 0 90");
    scalePlus.setAttribute("position", "0 0.2 0.3");

    let scaleMinus = document.createElement("a-entity");
    scaleMinus.setAttribute("class", "scaleButton");
    scaleMinus.setAttribute("id", "scaleMinus");
    scaleMinus.setAttribute("gltf-model", "#minus");
    scaleMinus.setAttribute("scale", "0.0055 0.0055 0.0055");
    scaleMinus.setAttribute("rotation", "90 0 90");
    scaleMinus.setAttribute("position", `0 0.2575 -0.08`);

    let rangeXPlus = document.createElement("a-entity");
    rangeXPlus.setAttribute("class", "rangeButton");
    rangeXPlus.setAttribute("id", "rangeXPlus");
    rangeXPlus.setAttribute("gltf-model", "#plus");
    rangeXPlus.setAttribute("scale", "0.0055 0.0055 0.0055");
    rangeXPlus.setAttribute("rotation", "0 0 90");
    rangeXPlus.setAttribute("position", "0 0 0.3");

    let rangeXMinus = document.createElement("a-entity");
    rangeXMinus.setAttribute("class", "rangeButton");
    rangeXMinus.setAttribute("id", "rangeXMinus");
    rangeXMinus.setAttribute("gltf-model", "#minus");
    rangeXMinus.setAttribute("scale", "0.0055 0.0055 0.0055");
    rangeXMinus.setAttribute("rotation", "90 0 90");
    rangeXMinus.setAttribute("position", `0 0.0575 -0.08`);

    let rangeYPlus = document.createElement("a-entity");
    rangeYPlus.setAttribute("class", "rangeButton");
    rangeYPlus.setAttribute("id", "rangeYPlus");
    rangeYPlus.setAttribute("gltf-model", "#plus");
    rangeYPlus.setAttribute("scale", "0.0055 0.0055 0.0055");
    rangeYPlus.setAttribute("rotation", "0 0 90");
    rangeYPlus.setAttribute("position", "0 -0.08 0.3");

    let rangeYMinus = document.createElement("a-entity");
    rangeYMinus.setAttribute("class", "rangeButton");
    rangeYMinus.setAttribute("id", "rangeYMinus");
    rangeYMinus.setAttribute("gltf-model", "#minus");
    rangeYMinus.setAttribute("scale", "0.0055 0.0055 0.0055");
    rangeYMinus.setAttribute("rotation", "90 0 90");
    rangeYMinus.setAttribute("position", `0 -0.0225 -0.08`);

    let graphscale = document.createElement("a-entity");
    graphscale.setAttribute("position", "-1 0.9 0");
    graphscale.setAttribute("rotation", "0 160 0");
    graphscale.setAttribute("scale", "1.5 1.5 1.5");
    graphscale.appendChild(titlesEntity);
    graphscale.appendChild(scalePlus);
    graphscale.appendChild(scaleMinus);
    graphscale.appendChild(rangeXPlus);
    graphscale.appendChild(rangeXMinus);
    graphscale.appendChild(rangeYPlus);
    graphscale.appendChild(rangeYMinus);

    let function1OpacityPlus = document.getElementById(
      "function1-opacity-plus"
    );
    let function1OpacityMinus = document.getElementById(
      "function1-opacity-minus"
    );
    let function2OpacityPlus = document.getElementById(
      "function2-opacity-plus"
    );
    let function2OpacityMinus = document.getElementById(
      "function2-opacity-minus"
    );

    if (getDevice() === "Desktop") {
      let interval = null;
      function1OpacityPlus.addEventListener("mousedown", () => {
        if (interval) clearInterval(interval);
        interval = setOpacity(1, "plus");
      });
      function1OpacityPlus.addEventListener("mouseup", () => {
        if (interval) clearInterval(interval);
      });
      function1OpacityMinus.addEventListener("mousedown", () => {
        if (interval) clearInterval(interval);
        interval = setOpacity(1, "minus");
      });
      function1OpacityMinus.addEventListener("mouseup", () => {
        if (interval) clearInterval(interval);
      });
      function2OpacityPlus.addEventListener("mousedown", () => {
        if (interval) clearInterval(interval);
        interval = setOpacity(2, "plus");
      });
      function2OpacityPlus.addEventListener("mouseup", () => {
        if (interval) clearInterval(interval);
      });
      function2OpacityMinus.addEventListener("mousedown", () => {
        if (interval) clearInterval(interval);
        interval = setOpacity(2, "minus");
      });
      function2OpacityMinus.addEventListener("mouseup", () => {
        if (interval) clearInterval(interval);
      });
    } else {
      let interval = null;
      function1OpacityPlus.addEventListener("mouseenter", () => {
        if (interval) clearInterval(interval);
        interval = setOpacity(1, "plus");
      });
      function1OpacityPlus.addEventListener("mouseleave", () => {
        if (interval) clearInterval(interval);
      });
      function1OpacityMinus.addEventListener("mouseenter", () => {
        if (interval) clearInterval(interval);
        interval = setOpacity(1, "minus");
      });
      function1OpacityMinus.addEventListener("mouseleave", () => {
        if (interval) clearInterval(interval);
      });
      function2OpacityPlus.addEventListener("mouseenter", () => {
        if (interval) clearInterval(interval);
        interval = setOpacity(2, "plus");
      });
      function2OpacityPlus.addEventListener("mouseleave", () => {
        if (interval) clearInterval(interval);
      });
      function2OpacityMinus.addEventListener("mouseenter", () => {
        if (interval) clearInterval(interval);
        interval = setOpacity(2, "minus");
      });
      function2OpacityMinus.addEventListener("mouseleave", () => {
        if (interval) clearInterval(interval);
      });
    }

    setButtonColorEvents([
      scalePlus,
      scaleMinus,
      rangeXPlus,
      rangeXMinus,
      rangeYPlus,
      rangeYMinus,
      function1OpacityPlus,
      function1OpacityMinus,
      function2OpacityPlus,
      function2OpacityMinus,
    ]);
    AFRAME.scenes[0].appendChild(graphscale);
  } else {
    const slider1 = document.getElementById(`function1-opacity-slider`);
    const slider2 = document.getElementById(`function2-opacity-slider`);
    const graph = document.getElementById("plot");

    slider1.addEventListener("change", (evt) => {
      var newvalue = evt.detail.value;
      let graphAtributes = {};
      graphAtributes["opacity"] = newvalue;
      graph.setAttribute("graph", graphAtributes);
    });

    slider2.addEventListener("change", (evt) => {
      var newvalue = evt.detail.value;
      let graphAtributes = {};
      graphAtributes["opacity2"] = newvalue;
      graph.setAttribute("graph", graphAtributes);
    });
  }
});

export function setButtonColorEvents(buttonsArr) {
  buttonsArr.forEach((button) => {
    button.addEventListener("model-loaded", () => {
      const obj = button.getObject3D("mesh");
      obj.traverse((node) => {
        if (node.name === "Sketchup003" || node.name === "Cylinder007") {
          node.children.forEach((mesh) => {
            mesh.material.color.set("rgb(0, 150, 255)");
          });
        }
      });
    });

    button.addEventListener("mouseenter", () => {
      const obj = button.getObject3D("mesh");
      obj.traverse((node) => {
        if (node.name === "Sketchup003" || node.name === "Cylinder007") {
          node.children.forEach((mesh) => {
            mesh.material.color.set("rgb(0, 75, 127)");
          });
        }
      });
    });

    button.addEventListener("mouseleave", () => {
      const obj = button.getObject3D("mesh");
      obj.traverse((node) => {
        if (node.name === "Sketchup003" || node.name === "Cylinder007") {
          node.children.forEach((mesh) => {
            mesh.material.color.set("rgb(0, 150, 255)");
          });
        }
      });
    });
  });
}
function updateGraphXY(id) {
  let interval = setInterval(() => {
    let plot = document.getElementById("plot");
    let graphAtributes = plot.getAttribute("graph");
    let { xMax, xMin, yMax, yMin, x2Max, x2Min, y2Max, y2Min } = graphAtributes;
    let change = 0.12;
    if (id === "rangeYPlus") {
      yMax += change;
      yMin -= change;
      y2Max += change;
      y2Min -= change;
    } else if (id === "rangeYMinus" && yMax > 0 && yMin < 0) {
      yMax -= change;
      yMin += change;
      y2Max -= change;
      y2Min += change;
    } else if (id === "rangeXPlus") {
      xMax += change;
      xMin -= change;
      x2Max += change;
      x2Min -= change;
    } else if (id === "rangeXMinus" && xMax > 0 && xMin < 0) {
      xMax -= change;
      xMin += change;
      x2Max -= change;
      x2Min += change;
    }
    let newAttributes = {
      ...graphAtributes,
      xMax,
      xMin,
      yMax,
      yMin,
      x2Max,
      x2Min,
      y2Max,
      y2Min,
    };
    plot.setAttribute("graph", newAttributes);
  }, 30);
  return interval;
}

window.addEventListener("load", () => {
  let rangeButtons = document.querySelectorAll(".rangeButton");
  rangeButtons.forEach((rangeButton) => {
    var interval = null;
    if (getDevice() === "Mobile") {
      rangeButton.addEventListener("mouseenter", () => {
        if (interval) clearInterval(interval);
        interval = updateGraphXY(rangeButton.id);
      });
    } else {
      rangeButton.addEventListener("mousedown", () => {
        if (interval) clearInterval(interval);
        interval = updateGraphXY(rangeButton.id);
      });
      rangeButton.addEventListener("mouseup", () => {
        if (interval) clearInterval(interval);
      });
    }
    rangeButton.addEventListener("mouseleave", () => {
      if (interval) clearInterval(interval);
    });
  });

  let scaleButtons = document.querySelectorAll(".scaleButton");
  scaleButtons.forEach((scaleButton) => {
    if (getDevice() === "Mobile") {
      scaleButton.addEventListener("mouseenter", () => {
        scaleButton.emit("scaleGraph", scaleButton.id);
      });
    } else {
      scaleButton.addEventListener("mousedown", () => {
        scaleButton.emit("scaleGraph", scaleButton.id);
      });
      scaleButton.addEventListener("mouseup", () => {
        scaleButton.emit("stopScaleGraph");
      });
    }
    scaleButton.addEventListener("mouseleave", () => {
      scaleButton.emit("stopScaleGraph");
    });
  });
});

function setOpacity(index, mode) {
  const slider = document.getElementById(`function${index}-opacity-slider`);
  const graph = document.getElementById("plot");
  let interval = setInterval(() => {
    let sliderAttributes = slider.getAttribute("my-slider");
    if (
      (mode === "plus" && sliderAttributes.value < sliderAttributes.max) ||
      (mode === "minus" && sliderAttributes.value > sliderAttributes.min)
    ) {
      let newvalue = sliderAttributes.value + (mode === "plus" ? 0.01 : -0.01);
      let graphAtributes = {};
      graphAtributes[`opacity${index === 1 ? "" : "2"}`] = newvalue;
      graph.setAttribute("graph", graphAtributes);
      sliderAttributes["value"] = newvalue;
      slider.setAttribute("my-slider", sliderAttributes);
    }
  }, 25);
  return interval;
}
