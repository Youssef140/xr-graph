// <!--  camera-->
// <a-entity camera  position = "0 1.2 0.3" look-controls>
// <a-entity mixin="progressivecontrolsgazedefault"></a-entity>
// </a-entity>

function isPhone() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}
window.addEventListener("load", (event) => {
  var phone = isPhone();

  if (phone) {
    alert("Phone");

    var cursorMixin = document.createElement("a-mixin");
    cursorMixin.setAttribute("id", "progressivecontrolsgazedefault");
    cursorMixin.setAttribute("position", "0 0 -0.5");
    cursorMixin.setAttribute("raycaster", "objects: .UIbutton");
    cursorMixin.setAttribute("cursor", "fuse: true; fuseTimeout: 1000");
    cursorMixin.setAttribute("geometry", "primitive: sphere; radius: 0.0025");
    cursorMixin.setAttribute("material", "color: #999; shader: flat");
    cursorMixin.setAttribute(
      "super-hands",
      `colliderEvent: raycaster-intersection;
                              colliderEventProperty: els;
                              colliderEndEvent: raycaster-intersection-cleared;
                              colliderEndEventProperty: el`
    );

    var assets = document.createElement("a-assets");
    assets.appendChild(cursorMixin);
    AFRAME.scenes[0].appendChild(assets);

    var phoneCamera = document.createElement("a-entity");
    phoneCamera.setAttribute("camera", "");
    phoneCamera.setAttribute("position", "0 1.2 0.3");
    phoneCamera.setAttribute("look-controls", "");
    var cameraMixin = document.createElement("a-entity");
    cameraMixin.setAttribute("mixin", "progressivecontrolsgazedefault");
    phoneCamera.appendChild(cameraMixin);
    AFRAME.scenes[0].appendChild(phoneCamera);
  } else {

    var desktopCamera = document.createElement("a-entity");
    desktopCamera.setAttribute("camera", "");
    desktopCamera.setAttribute("position", "0 1.2 0.3");
    desktopCamera.setAttribute("kinematic-body", "radius: 0.3");
    desktopCamera.setAttribute("look-controls", "pointerLockEnabled: true;");
    desktopCamera.setAttribute("wasd-controls", "acceleration: 200");
    var cursorEntity = document.createElement("a-entity");
    cursorEntity.setAttribute("cursor", "");
    cursorEntity.setAttribute("position", "0 0 -1");
    cursorEntity.setAttribute("geometry", "primitive: sphere; radius: 0.007");
    cursorEntity.setAttribute(
      "material",
      "color: #ffffff; shader: flat; opacity: 0.6"
    );
    cursorEntity.setAttribute("raycaster", "showLine: true");
    desktopCamera.appendChild(cursorEntity);
    AFRAME.scenes[0].appendChild(desktopCamera);
    
  }
});
