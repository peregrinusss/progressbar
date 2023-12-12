// const progressBar = document.querySelector(".prog");
// window.onload = function () {
//   progressBar.classList.add("loaded");
// };

const valueOfSwitcher = document.getElementById("switch-value"),
  animateSwitcher = document.getElementById("switch-anim"),
  hideSwitcher = document.getElementById("switch-hide");
let progress = new Progress("progress", {
  pathWidth: 9,
  colorCircle: "#dfe6f0",
  colorPath: "#0000ff",
  hideByOpacity: !0,
  animateDuration: 1.5,
});
progress.setFraction(valueOfSwitcher.value),
  (valueOfSwitcher.oninput = () => {
    progress.setFraction(valueOfSwitcher.value);
  }),
  (animateSwitcher.onchange = () => {
    animateSwitcher.checked ? progress.start() : progress.stop();
  }),
  (hideSwitcher.onchange = () => {
    hideSwitcher.checked ? progress.hide() : progress.view();
  });