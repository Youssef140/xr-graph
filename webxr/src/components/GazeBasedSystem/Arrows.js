import { isPhone } from "./DeviceCamera";

function updateGraphUV(id) {
  let interval = setInterval(() => {
    let plot = document.getElementById("plot");
    let graphAtributes = plot.getAttribute("graph");
    let { uMax, vMax } = graphAtributes;
    if (id === "arrow-up") vMax += 0.5;
    else if (id === "arrow-down" && vMax > 0) vMax -= 0.5;
    else if (id === "arrow-right") uMax += 0.5;
    else if (id === "arrow-left" && uMax > 0) uMax -= 0.5;
    let newAttributes = {
      ...graphAtributes,
      uMax,
      vMax,
    };
    plot.setAttribute("graph", newAttributes);
  }, 150);
  return interval;
}

window.addEventListener("load", () => {
  let arrows = document.querySelectorAll(".arrow");
  console.log("tets", arrows);
  arrows.forEach((arrow) => {
    var interval = null;
    if (isPhone()) {
      arrow.addEventListener("mouseenter", () => {
        if (interval) clearInterval(interval);
        interval = updateGraphUV(arrow.id);
      });
      arrow.addEventListener("mouseleave", () => {
        if (interval) clearInterval(interval);
      });
    } else {
      arrow.addEventListener("mousedown", () => {
        if (interval) clearInterval(interval);
        interval = updateGraphUV(arrow.id);
      });
      arrow.addEventListener("mouseup", () => {
        if (interval) clearInterval(interval);
      });
    }
  });
});
