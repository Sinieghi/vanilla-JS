class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
  static moveElement(eleId, newDestinationSelector) {
    const element = document.getElementById(eleId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ block: "center", behavior: "smooth" });
  }
}
class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }
  detach() {
    if (this.element) this.element.remove();
    //para os browsers mais velho
    // this.element.parentElement.removeChild(this.element);
  }
  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element
    );
  }
}
class ToolTip extends Component {
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
class ProjectItem {
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
    const tooltip = new ToolTip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
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
class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const projItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projItem of projItems) {
      this.projects.push(
        new ProjectItem(projItem.id, this.switchProject.bind(this), this.type)
      );
    }
    this.connectDroppableEvent();
  }
  //drag drop event
  connectDroppableEvent() {
    const list = document.querySelector(`#${this.type}-projects ul`);
    list.addEventListener("dragenter", (e) => {
      if (e.dataTransfer.types[0] === "text/plain") {
        e.preventDefault();
        list.parentElement.classList.add("droppable");
      }
    });
    list.addEventListener("dragover", (e) => {
      if (e.dataTransfer.types[0] === "text/plain") e.preventDefault();
    });
    list.addEventListener("dragleave", (e) => {
      if (e.relatedTarget.closest(`#${this.type}-projects ul`) !== list)
        list.parentElement.classList.remove("droppable");
    });
    list.addEventListener("drop", (e) => {
      const projId = e.dataTransfer.getData("text/plain");
      if (this.projects.find((p) => p.id === projId)) return;
      document
        .getElementById(projId)
        .querySelector("button:last-of-type")
        .click();
      list.parentElement.classList.remove("droppable");
      // e.preventDefault()
    });
  }
  //
  setSwitchHandler(switchHandlerFunc) {
    this.switchHandler = switchHandlerFunc;
  }
  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }
  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
class App {
  static init() {
    // new ProjectItem();
    const activeProj = new ProjectList("active");
    const finishProj = new ProjectList("finished");
    activeProj.setSwitchHandler(finishProj.addProject.bind(finishProj));
    finishProj.setSwitchHandler(activeProj.addProject.bind(activeProj));
    setTimeout(() => {
      this.statAnalyticsScript();
    }, 3000);
  }
  static statAnalyticsScript() {
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "assets/scripts/analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}
App.init();

//
function func(url) {
  const urlNavigation = new URL(window.location.pathname);
  urlNavigation.searchParams.set(url);
  urlNavigation.pathname({ origin }, "", urlNavigation.pathname);
  const previewsScript = document.getElementsByTagName("head");

  //   const someScript = document.createElement("script");
  //   someScript.textContent = "alert('hello');";
  //   document.head.append(someScript);
}
