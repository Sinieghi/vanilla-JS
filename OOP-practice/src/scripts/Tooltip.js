import { Component } from "./Component";

export class ToolTip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }
  closeTooltip() {
    this.detach();
    this.closeNotifier();
  }
  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    //  dando vida aos elementos contidos no template
    const tooltipTemplate = document.getElementById("tooltip");
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector("p").textContent = this.text;
    tooltipElement.append(tooltipBody);

    const hostElePositionLeft = this.hostElement.offsetLeft;
    const hostElePositionTop = this.hostElement.offsetTop;
    const hostElePositionHeight = this.hostElement.offsetHeight;
    const parentElementScroll = this.hostElement.parentElement.scrollTop;
    const x = hostElePositionLeft + 20;
    const y =
      hostElePositionTop + hostElePositionHeight - parentElementScroll - 10;

    tooltipElement.style.position = "absolute";
    tooltipElement.style.left = x + "px";
    tooltipElement.style.top = y + "px";

    tooltipElement.addEventListener("click", this.closeTooltip.bind(this));
    this.element = tooltipElement;
  }
}
