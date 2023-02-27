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
  if (device === "Desktop") {
    camera.setAttribute("position", "0 1.2 1.2");
    camera.setAttribute("kinematic-body", "radius: 0.3");
    camera.setAttribute("look-controls", "pointerLockEnabled: false;");
    camera.setAttribute("wasd-controls", "acceleration: 200");
    var cursorEntity = document.createElement("a-entity");
    cursorEntity.setAttribute("cursor", "");
    cursorEntity.setAttribute("position", "0 0 -0.1");
    cursorEntity.setAttribute(
      "geometry",
      `primitive: sphere; radius: 0.0015;`
    );
    cursorEntity.setAttribute(
      "material",
      "color: #fff; shader: flat; opacity: 0.6"
    );
    camera.appendChild(cursorEntity);
    // const leftTeleport = document.getElementById("left-teleport")
    // leftTeleport.addEventListener("mouseenter", () => {
    //   camera.setAttribute("position", "-1 1.2 -1");
    // });
  }
  else if(device === "Mobile"){
    camera.setAttribute("position", "0 1.2 1.2");
    camera.setAttribute("kinematic-body", "radius: 0.3");
    camera.setAttribute("look-controls", "pointerLockEnabled: false;");
    camera.setAttribute("wasd-controls", "acceleration: 200");
    var cursorEntity = document.createElement("a-entity");
    cursorEntity.setAttribute("cursor", "");
    cursorEntity.setAttribute("position", "0 0 -0.1");
    cursorEntity.setAttribute(
        "geometry",
        `primitive: sphere; radius: 0.0012;`
    );
    cursorEntity.setAttribute(
        "material",
        "color: #000; shader: flat; opacity: 0.6"
    );
    camera.appendChild(cursorEntity);

    var leftTeleport = document.createElement("a-entity")
    leftTeleport.setAttribute("id","left-teleport")
    leftTeleport.setAttribute("gltf-model","#teleportationArea")
    leftTeleport.setAttribute("modify-materials","")
    leftTeleport.setAttribute("scale","0.02 0.02 0.02")
    leftTeleport.setAttribute("position","-1 0.1 -1")

    var cameraPosition = null
    function setPosition(position){
      cameraPosition = position
    }


    leftTeleport.addEventListener("mouseenter", () => {
      setPosition("leftTeleport")
      setTimeout(function() {
          if(cameraPosition === "leftTeleport"){
            camera.setAttribute("position", "-1 1.2 -1")
          }
      }, 2000);

    });

    leftTeleport.addEventListener("mouseleave", () => {
      setPosition(null)
    });

    const rightTeleport = document.getElementById("right-teleport")
    rightTeleport.addEventListener("mouseenter", () => {
      setPosition("rightTeleport")
      setTimeout(function() {
        if(cameraPosition === "rightTeleport"){
          camera.setAttribute("position", "1 1.2 -1")
        }
      }, 2000);
    });

    rightTeleport.addEventListener("mouseleave", () => {
      setPosition(null)
    });


    const centerUpTeleport = document.getElementById("center-up-teleport")
    centerUpTeleport.addEventListener("mouseenter", () => {
      setPosition("centerUpTeleport")
      setTimeout(function() {
        if(cameraPosition === "centerUpTeleport"){
          camera.setAttribute("position", "0 1.2 -2")
        }
      }, 2000);
    });

    centerUpTeleport.addEventListener("mouseleave", () => {
      setPosition(null)
    });

    const centerDownTeleport = document.getElementById("center-down-teleport")
    centerDownTeleport.addEventListener("mouseenter", () => {
      setPosition("centerDownTeleport")
      setTimeout(function() {
        if(cameraPosition === "centerDownTeleport"){
          camera.setAttribute("position", "0 0.5 -0.7")
        }
      }, 2000);
    });

    centerDownTeleport.addEventListener("mouseleave", () => {
      setPosition(null)
    });
  }
  else {
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
