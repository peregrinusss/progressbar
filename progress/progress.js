class Progress {
  constructor(t, {
    pathWidth = 5,
    colorCircle = "#000000",
    colorPath = "#ffffff",
    animateDuration = 2,
    hideByOpacity = false,
  } = {}) {
    this.width = pathWidth;
    this.colors = {
      circle: colorCircle,
      path: colorPath,
    };
    this.hideByOpacity = hideByOpacity;
    this.isAnim = false;
    this.animDuration = animateDuration;

    this.create(t);
    this.render();
  }

  render() {
    const style = `
      stroke-dasharray: ${this.fraction} ${this.length};
      stroke-width: ${this.width}px;
      animation-duration: ${this.animDuration}s;
      animation-play-state: ${this.isAnim ? "running" : "paused"};`;
    this.path.setAttribute("style", style);
  }

  setFraction(t = 0) {
    if (!isNaN(t)) {
      this.fraction = (this.length * Math.max(0, Math.min(100, t))) / 100;
      this.render();
    }
  }

  start() {
    if (!this.isAnim) {
      this.isAnim = true;
      this.render();
    }
  }

  stop() {
    if (this.isAnim) {
      this.isAnim = false;
      this.render();
    } 
  }

  hide() {
    if (!this.isHide) {
      this.isHide = true;
      this.body.style[this.hideByOpacity ? "opacity" : "display"] = this.hideByOpacity ? 0 : "none";
    }
  }

  view() {
    if (this.isHide) {
      this.isHide = false;
      this.body.style[this.hideByOpacity ? "opacity" : "display"] = this.hideByOpacity ? 1 : "flex";
    }
  }

  create(t) {
    const container = document.getElementById(t);
    const size = 126;
    const radius = (size - this.width) / 2;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "figure");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("fill", "none");
    group.setAttribute("stroke", "none");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("style", `stroke-width: ${this.width - 0.5}px;`);
    circle.setAttribute("stroke", this.colors.circle);
    circle.setAttribute("cx", "50%");
    circle.setAttribute("cy", "50%");
    circle.setAttribute("r", radius);
    group.append(circle);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", this.colors.path);
    path.setAttribute("class", "path");
    path.setAttribute(
      "d",
      `M ${size / 2} ${size / 2} m ${-radius}, 0 a ${radius},${radius} 0 1,0 ${2 * radius},0 a ${radius},${radius} 0 1,0 ${-2 * radius},0`
    );

    svg.append(group, path);
    container.append(svg);

    this.length = 2 * Math.PI * radius;
    this.path = path;
    this.body = container;
  }
}
