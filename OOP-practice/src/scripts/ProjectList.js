import { DOMHelper } from "../utility/DOOMHelper";
import { ProjectItem } from "./ProjectItem";
export class Little {}
export class Exemplo {}
export class Of {}
export class How {}
export class ToImportWithModules {}

export class ProjectList {
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
