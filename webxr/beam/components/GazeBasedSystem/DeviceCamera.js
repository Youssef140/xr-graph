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
  var rig = document.createElement("a-entity");
  rig.setAttribute("id", "rig");
  rig.setAttribute("position", "3 0 7");
  var camera = document.createElement("a-entity");
  camera.setAttribute("camera", "");
  camera.setAttribute("id", "camera");
  var device = getDevice();
  if (device === "Desktop") {
    rig.setAttribute("kinematic-body", "radius: 0.4");
    // rig.setAttribute("wasd-controls", "acceleration: 200");
    rig.setAttribute("movement-controls", "speed: 0.2");
    camera.setAttribute("position", "0 1.6 0");
    camera.setAttribute("look-controls", "pointerLockEnabled: false;");
    var cursorEntity = document.createElement("a-entity");
    cursorEntity.setAttribute("cursor", "");
    cursorEntity.setAttribute("position", "0 0 -0.1");
    cursorEntity.setAttribute("geometry", `primitive: sphere; radius: 0.0015;`);
    cursorEntity.setAttribute(
      "material",
      "color: #000; shader: flat; opacity: 0.6"
    );
    camera.appendChild(cursorEntity);
    rig.appendChild(camera);
    AFRAME.scenes[0].appendChild(rig);
  } else if (device === "Mobile") {
    camera.setAttribute("position", "0 1.75 0");
    camera.setAttribute("kinematic-body", "radius: 0.3");
    camera.setAttribute("look-controls", "pointerLockEnabled: false;");
    camera.setAttribute("wasd-controls", "acceleration: 200");
    var cursorEntity = document.createElement("a-entity");
    cursorEntity.setAttribute("cursor", "");
    cursorEntity.setAttribute("position", "0 0 -0.6");
    cursorEntity.setAttribute("geometry", `primitive: sphere; radius: 0.004;`);
    cursorEntity.setAttribute(
      "material",
      "color: #000; shader: flat; opacity: 0.6"
    );
    camera.appendChild(cursorEntity);

    createTeleport("left-teleport", "6 0.3 2.7", rig, "6 0 2.7");
    createTeleport("right-teleport", "0 0.3 2.7", rig, "0 0 2.7");
    createTeleport("center-up-teleport", "3 0.2 0.5", rig, "3 0 0.5");
    createTeleport("center-down-teleport", "3 0.2 7", rig, "3 0 7");

    rig.appendChild(camera);
    AFRAME.scenes[0].appendChild(rig);
  } else {
   
    rig.setAttribute("kinematic-body", "radius: 0.4");
    rig.setAttribute("movement-controls", "speed: 0.1");
    rig.setAttribute("position", "3 1 7");


    // Create the left hand entity and attach it to the rig
    var leftHand = document.createElement('a-entity');
    leftHand.setAttribute('id', 'lhand');
    leftHand.setAttribute('interaction-hands', '');
    leftHand.setAttribute('aabb-collider', 'objects: .grabbable');
    leftHand.setAttribute('hand-controls', 'hand: left; handModelStyle: highPoly');
    leftHand.setAttribute('mixin', 'touch');
    rig.appendChild(leftHand);

    // Create the right hand entity and attach it to the rig
    var rightHand = document.createElement('a-entity');
    rightHand.setAttribute('id', 'rhand');
    rightHand.setAttribute('interaction-hands', '');
    rightHand.setAttribute('aabb-collider', 'objects: .grabbable');
    rightHand.setAttribute('hand-controls', 'hand: right; handModelStyle: highPoly');
    rightHand.setAttribute('mixin', 'touch');
    rig.appendChild(rightHand);

    camera.setAttribute("look-controls", "pointerLockEnabled: false;");
    rig.appendChild(camera);
    AFRAME.scenes[0].appendChild(rig);
  }
});

const createTeleport = (id, position, camera, cameraPos) => {
  let teleportationArea = document.createElement("a-entity");
  teleportationArea.setAttribute("id", id);
  teleportationArea.setAttribute("gltf-model", "#teleportationArea");
  teleportationArea.setAttribute("modify-materials", "");
  teleportationArea.setAttribute("scale", "0.065 0.065 0.065");
  teleportationArea.setAttribute("position", position);
  teleportationArea.setAttribute(
    "animation",
    "property: scale; to: 0.075 0.075 0.075; dur: 2000; startEvents: mouseenter;"
  );
  teleportationArea.setAttribute(
    "animation__2",
    "property: scale; to: 0.035 0.035 0.035; dur: 200; startEvents: mouseleave;"
  );

  AFRAME.scenes[0].appendChild(teleportationArea);

  var stillHovering = false;

  teleportationArea.addEventListener("mouseenter", () => {
    stillHovering = true;
    setTimeout(function () {
      if (stillHovering) camera.setAttribute("position", cameraPos);
    }, 2000);
  });

  teleportationArea.addEventListener("mouseleave", () => {
    stillHovering = false;
  });

  return teleportationArea;
};
