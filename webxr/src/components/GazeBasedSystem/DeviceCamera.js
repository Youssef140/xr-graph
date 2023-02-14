export function getDevice() {
  if (navigator.userAgent.indexOf("OculusBrowser") !== -1) {
    return "OculusBrowser";
  } else if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return "Mobile";
  } else {
    return "Desktop";
  }
}

window.addEventListener("load", (event) => {
  var camera = document.createElement("a-entity");
  camera.setAttribute("camera", "");
  var device = getDevice();
  if (device === "Desktop" || device === "Mobile") {
    camera.setAttribute("position", "0 1.2 0.3");
    camera.setAttribute("kinematic-body", "radius: 0.3");
    camera.setAttribute("look-controls", "pointerLockEnabled: false;");
    camera.setAttribute("wasd-controls", "acceleration: 200");
    var cursorEntity = document.createElement("a-entity");
    cursorEntity.setAttribute("cursor", "");
    cursorEntity.setAttribute("position", "0 0 -0.1");
    cursorEntity.setAttribute(
      "geometry",
      `primitive: sphere; radius: ${
        getDevice() === "Mobile" ? "0.001" : "0.0006"
      }`
    );
    cursorEntity.setAttribute(
      "material",
      "color: #000; shader: flat; opacity: 0.6"
    );
    cursorEntity.setAttribute("raycaster", "showLine: true");
    camera.appendChild(cursorEntity);

    var arrowUp = document.createElement("a-entity");
    arrowUp.setAttribute("id", "arrow-up");
    arrowUp.setAttribute("class", "arrow");
    arrowUp.setAttribute("gltf-model", "#arrow");
    arrowUp.setAttribute("scale", "0.03 0.03 0.03");
    arrowUp.setAttribute("position", "0 0 0");

    var arrowRight = document.createElement("a-entity");
    arrowRight.setAttribute("id", "arrow-right");
    arrowRight.setAttribute("class", "arrow");
    arrowRight.setAttribute("gltf-model", "#arrow");
    arrowRight.setAttribute("rotation", "90 0 0");
    arrowRight.setAttribute("scale", "0.03 0.03 0.03");
    arrowRight.setAttribute("position", "0 -0.01 -0.05");

    var arrowLeft = document.createElement("a-entity");
    arrowLeft.setAttribute("id", "arrow-left");
    arrowLeft.setAttribute("class", "arrow");
    arrowLeft.setAttribute("gltf-model", "#arrow");
    arrowLeft.setAttribute("rotation", "-90 0 0");
    arrowLeft.setAttribute("scale", "0.03 0.03 0.03");
    arrowLeft.setAttribute("position", "0 0.06 -0.03");

    var arrowDown = document.createElement("a-entity");
    arrowDown.setAttribute("id", "arrow-down");
    arrowDown.setAttribute("class", "arrow");
    arrowDown.setAttribute("gltf-model", "#arrow");
    arrowDown.setAttribute("rotation", "180 0 0");
    arrowDown.setAttribute("scale", "0.03 0.03 0.03");
    arrowDown.setAttribute("position", "0 0.04 -0.08");

    var arrows = document.createElement("a-entity");
    arrows.setAttribute("position", "0.05 0.85 0");
    arrows.setAttribute("rotation", "0 90 -30");
    arrows.appendChild(arrowLeft);
    arrows.appendChild(arrowDown);
    arrows.appendChild(arrowRight);
    arrows.appendChild(arrowUp);

    AFRAME.scenes[0].appendChild(arrows);
  } else {
    camera.setAttribute(
      "orbit-controls",
      "target: 0 1 -0.6; initialPosition: -0.5 1.4 0.3; minDistance: -0.01; enableZoom: false;"
    );

    var graphScaler = document.createElement("a-entity");
    graphScaler.setAttribute("data-aabb-collider-dynamic", "true");
    graphScaler.setAttribute("class", "grabbable visible-on-vr");
    graphScaler.setAttribute("position", "-0.6 1 0");
    graphScaler.setAttribute("rotation", "0 70 0");
    graphScaler.setAttribute("graph-parameter-ui", "graph: #plot");

    AFRAME.scenes[0].appendChild(graphScaler);
  }

  AFRAME.scenes[0].appendChild(camera);
});
