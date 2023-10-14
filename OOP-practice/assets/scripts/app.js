/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_ProjectList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/ProjectList */ \"./src/scripts/ProjectList.js\");\n\n\n_scripts_ProjectList__WEBPACK_IMPORTED_MODULE_0__.Little;\n_scripts_ProjectList__WEBPACK_IMPORTED_MODULE_0__.Exemplo;\n_scripts_ProjectList__WEBPACK_IMPORTED_MODULE_0__.Of;\n_scripts_ProjectList__WEBPACK_IMPORTED_MODULE_0__.How;\n_scripts_ProjectList__WEBPACK_IMPORTED_MODULE_0__.ToImportWithModules;\nclass App {\n  static init() {\n    // new ProjectItem();\n    const activeProj = new _scripts_ProjectList__WEBPACK_IMPORTED_MODULE_0__.ProjectList(\"active\");\n    const finishProj = new _scripts_ProjectList__WEBPACK_IMPORTED_MODULE_0__.ProjectList(\"finished\");\n    activeProj.setSwitchHandler(finishProj.addProject.bind(finishProj));\n    finishProj.setSwitchHandler(activeProj.addProject.bind(activeProj));\n    setTimeout(() => {\n      this.statAnalyticsScript();\n    }, 3000);\n  }\n  static statAnalyticsScript() {\n    const analyticsScript = document.createElement(\"script\");\n    analyticsScript.src = \"assets/scripts/analytics.js\";\n    analyticsScript.defer = true;\n    document.head.append(analyticsScript);\n  }\n}\nApp.init();\n\n//\n// function func(url) {\n//   const urlNavigation = new URL(window.location.pathname);\n//   urlNavigation.searchParams.set(url);\n//   urlNavigation.pathname({ origin }, \"\", urlNavigation.pathname);\n//   const previewsScript = document.getElementsByTagName(\"head\");\n\n//   //   const someScript = document.createElement(\"script\");\n//   //   someScript.textContent = \"alert('hello');\";\n//   //   document.head.append(someScript);\n// }\n\n\n//# sourceURL=webpack://my-webpack-project/./src/app.js?");

/***/ }),

/***/ "./src/scripts/ProjectItem.js":
/*!************************************!*\
  !*** ./src/scripts/ProjectItem.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProjectItem: () => (/* binding */ ProjectItem)\n/* harmony export */ });\n/* harmony import */ var _utility_DOOMHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/DOOMHelper */ \"./src/utility/DOOMHelper.js\");\n\r\nclass ProjectItem {\r\n  hasActiveTooltip = false;\r\n  constructor(id, updateProjectListsFunction, type) {\r\n    this.id = id;\r\n    this.updateProjectListsHandler = updateProjectListsFunction;\r\n    this.ConnextMoreInfo();\r\n    this.connectSwitchButton(type);\r\n    this.connectDrag();\r\n  }\r\n  showMoreInfosHandler() {\r\n    if (this.hasActiveTooltip) return;\r\n    const projectElement = document.getElementById(this.id);\r\n    const tooltipText = projectElement.dataset.extraInfo;\r\n    //exemplo de como importar só quando necessário usando os modules\r\n    __webpack_require__.e(/*! import() */ \"src_scripts_Tooltip_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./Tooltip.js */ \"./src/scripts/Tooltip.js\")).then((module) => {\r\n      const tooltip = new module.ToolTip(\r\n        () => {\r\n          this.hasActiveTooltip = false;\r\n        },\r\n        tooltipText,\r\n        this.id\r\n      );\r\n      tooltip.attach();\r\n      this.hasActiveTooltip = true;\r\n    });\r\n  }\r\n\r\n  //drag drop event\r\n  connectDrag() {\r\n    const item = document.getElementById(this.id);\r\n    item.addEventListener(\"dragstart\", (e) => {\r\n      e.dataTransfer.setData(\"text/plain\", this.id);\r\n      e.dataTransfer.effectAllowed = \"move\";\r\n    });\r\n    item.addEventListener(\"dragend\", (e) => {\r\n      console.log(e.dataTransfer.dropEffect);\r\n      if (e.dataTransfer.dropEffect === \"none\") {\r\n        alert(\"you did a bad job congratulation\");\r\n        return;\r\n      }\r\n      alert(\"you did a good job\");\r\n    });\r\n  }\r\n\r\n  ConnextMoreInfo() {\r\n    const projectItemEle = document.getElementById(this.id);\r\n    const moreInfoBtn = projectItemEle.querySelector(\"button:first-of-type\");\r\n    moreInfoBtn.addEventListener(\"click\", this.showMoreInfosHandler.bind(this));\r\n  }\r\n  connectSwitchButton(type) {\r\n    const projectItemEle = document.getElementById(this.id);\r\n    let setStatus = projectItemEle.querySelector(\"button:last-of-type\");\r\n    setStatus = _utility_DOOMHelper__WEBPACK_IMPORTED_MODULE_0__.DOMHelper.clearEventListeners(setStatus);\r\n    setStatus.textContent = type === \"active\" ? \"Finish\" : \"Activate\";\r\n    setStatus.addEventListener(\r\n      \"click\",\r\n      this.updateProjectListsHandler.bind(null, this.id)\r\n    );\r\n  }\r\n  update(updateProjectListFunc, type) {\r\n    this.updateProjectListsHandler = updateProjectListFunc;\r\n    this.connectSwitchButton(type);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/scripts/ProjectItem.js?");

/***/ }),

/***/ "./src/scripts/ProjectList.js":
/*!************************************!*\
  !*** ./src/scripts/ProjectList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Exemplo: () => (/* binding */ Exemplo),\n/* harmony export */   How: () => (/* binding */ How),\n/* harmony export */   Little: () => (/* binding */ Little),\n/* harmony export */   Of: () => (/* binding */ Of),\n/* harmony export */   ToImportWithModules: () => (/* binding */ ToImportWithModules)\n/* harmony export */ });\n/* harmony import */ var _utility_DOOMHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/DOOMHelper */ \"./src/utility/DOOMHelper.js\");\n/* harmony import */ var _ProjectItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProjectItem */ \"./src/scripts/ProjectItem.js\");\n\r\n\r\nclass Little {}\r\nclass Exemplo {}\r\nclass Of {}\r\nclass How {}\r\nclass ToImportWithModules {\r\n  projects = [];\r\n  constructor(type) {\r\n    this.type = type;\r\n    const projItems = document.querySelectorAll(`#${type}-projects li`);\r\n    for (const projItem of projItems) {\r\n      this.projects.push(\r\n        new _ProjectItem__WEBPACK_IMPORTED_MODULE_1__.ProjectItem(projItem.id, this.switchProject.bind(this), this.type)\r\n      );\r\n    }\r\n    this.connectDroppableEvent();\r\n  }\r\n  //drag drop event\r\n  connectDroppableEvent() {\r\n    const list = document.querySelector(`#${this.type}-projects ul`);\r\n    list.addEventListener(\"dragenter\", (e) => {\r\n      if (e.dataTransfer.types[0] === \"text/plain\") {\r\n        e.preventDefault();\r\n        list.parentElement.classList.add(\"droppable\");\r\n      }\r\n    });\r\n    list.addEventListener(\"dragover\", (e) => {\r\n      if (e.dataTransfer.types[0] === \"text/plain\") e.preventDefault();\r\n    });\r\n    list.addEventListener(\"dragleave\", (e) => {\r\n      if (e.relatedTarget.closest(`#${this.type}-projects ul`) !== list)\r\n        list.parentElement.classList.remove(\"droppable\");\r\n    });\r\n    list.addEventListener(\"drop\", (e) => {\r\n      const projId = e.dataTransfer.getData(\"text/plain\");\r\n      if (this.projects.find((p) => p.id === projId)) return;\r\n      document\r\n        .getElementById(projId)\r\n        .querySelector(\"button:last-of-type\")\r\n        .click();\r\n      list.parentElement.classList.remove(\"droppable\");\r\n      // e.preventDefault()\r\n    });\r\n  }\r\n  //\r\n  setSwitchHandler(switchHandlerFunc) {\r\n    this.switchHandler = switchHandlerFunc;\r\n  }\r\n  addProject(project) {\r\n    this.projects.push(project);\r\n    _utility_DOOMHelper__WEBPACK_IMPORTED_MODULE_0__.DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);\r\n    project.update(this.switchProject.bind(this), this.type);\r\n  }\r\n  switchProject(projectId) {\r\n    this.switchHandler(this.projects.find((p) => p.id === projectId));\r\n    this.projects = this.projects.filter((p) => p.id !== projectId);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/scripts/ProjectList.js?");

/***/ }),

/***/ "./src/utility/DOOMHelper.js":
/*!***********************************!*\
  !*** ./src/utility/DOOMHelper.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DOMHelper: () => (/* binding */ DOMHelper)\n/* harmony export */ });\nclass DOMHelper {\r\n  static clearEventListeners(element) {\r\n    const clonedElement = element.cloneNode(true);\r\n    element.replaceWith(clonedElement);\r\n    return clonedElement;\r\n  }\r\n  static moveElement(eleId, newDestinationSelector) {\r\n    const element = document.getElementById(eleId);\r\n    const destinationElement = document.querySelector(newDestinationSelector);\r\n    destinationElement.append(element);\r\n    element.scrollIntoView({ block: \"center\", behavior: \"smooth\" });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/utility/DOOMHelper.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".app.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "my-webpack-project:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "assets/scripts/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;