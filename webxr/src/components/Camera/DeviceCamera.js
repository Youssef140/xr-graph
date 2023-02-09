export function isPhone() {
  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  );
}

window.addEventListener("load", (event) => {
  var desktopCamera = document.createElement("a-entity");
  desktopCamera.setAttribute("camera", "");
  desktopCamera.setAttribute("position", "0 1.2 0.3");
  desktopCamera.setAttribute("kinematic-body", "radius: 0.3");
  desktopCamera.setAttribute("look-controls", "pointerLockEnabled: false;");
  desktopCamera.setAttribute("wasd-controls", "acceleration: 200");
  var cursorEntity = document.createElement("a-entity");
  cursorEntity.setAttribute("cursor", "");
  cursorEntity.setAttribute("position", "0 0 -0.1");
  cursorEntity.setAttribute(
    "geometry",
    `primitive: sphere; radius: ${isPhone() ? "0.001" : "0.0006"}`
  );
  cursorEntity.setAttribute(
    "material",
    "color: #000; shader: flat; opacity: 0.6"
  );
  cursorEntity.setAttribute("raycaster", "showLine: true");
  desktopCamera.appendChild(cursorEntity);
  AFRAME.scenes[0].appendChild(desktopCamera);
});
