import * as PrjList from "./scripts/ProjectList";
PrjList.Little;
PrjList.Exemplo;
PrjList.Of;
PrjList.How;
PrjList.ToImportWithModules;
class App {
  static init() {
    // new ProjectItem();
    const activeProj = new PrjList.ProjectList("active");
    const finishProj = new PrjList.ProjectList("finished");
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
// function func(url) {
//   const urlNavigation = new URL(window.location.pathname);
//   urlNavigation.searchParams.set(url);
//   urlNavigation.pathname({ origin }, "", urlNavigation.pathname);
//   const previewsScript = document.getElementsByTagName("head");

//   //   const someScript = document.createElement("script");
//   //   someScript.textContent = "alert('hello');";
//   //   document.head.append(someScript);
// }
