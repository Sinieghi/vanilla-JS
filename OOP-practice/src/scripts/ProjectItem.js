import { DOMHelper } from "../utility/DOOMHelper";
export class ProjectItem {
  hasActiveTooltip = false;
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.ConnextMoreInfo();
    this.connectSwitchButton(type);
    this.connectDrag();
  }
  showMoreInfosHandler() {
    if (this.hasActiveTooltip) return;
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    //exemplo de como importar só quando necessário usando os modules

    import("./Tooltip.js").then((module) => {
      const tooltip = new module.ToolTip(
        () => {
          this.hasActiveTooltip = false;
        },
        tooltipText,
        this.id
      );
      tooltip.attach();
      this.hasActiveTooltip = true;
    });
  }

  //drag drop event
  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", this.id);
      e.dataTransfer.effectAllowed = "move";
    });
    item.addEventListener("dragend", (e) => {
      console.log(e.dataTransfer.dropEffect);
      if (e.dataTransfer.dropEffect === "none") {
        alert("you did a bad job congratulation");
        return;
      }
      alert("you did a good job");
    });
  }

  ConnextMoreInfo() {
    const projectItemEle = document.getElementById(this.id);
    const moreInfoBtn = projectItemEle.querySelector("button:first-of-type");
    moreInfoBtn.addEventListener("click", this.showMoreInfosHandler.bind(this));
  }
  connectSwitchButton(type) {
    const projectItemEle = document.getElementById(this.id);
    let setStatus = projectItemEle.querySelector("button:last-of-type");
    setStatus = DOMHelper.clearEventListeners(setStatus);
    setStatus.textContent = type === "active" ? "Finish" : "Activate";
    setStatus.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }
  update(updateProjectListFunc, type) {
    this.updateProjectListsHandler = updateProjectListFunc;
    this.connectSwitchButton(type);
  }
}
