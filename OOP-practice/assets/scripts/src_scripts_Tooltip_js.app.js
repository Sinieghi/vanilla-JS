"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["src_scripts_Tooltip_js"],{

/***/ "./src/scripts/Component.js":
/*!**********************************!*\
  !*** ./src/scripts/Component.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Component: () => (/* binding */ Component)\n/* harmony export */ });\nclass Component {\r\n  constructor(hostElementId, insertBefore = false) {\r\n    if (hostElementId) {\r\n      this.hostElement = document.getElementById(hostElementId);\r\n    } else {\r\n      this.hostElement = document.body;\r\n    }\r\n    this.insertBefore = insertBefore;\r\n  }\r\n  detach() {\r\n    if (this.element) this.element.remove();\r\n    //para os browsers mais velho\r\n    // this.element.parentElement.removeChild(this.element);\r\n  }\r\n  attach() {\r\n    this.hostElement.insertAdjacentElement(\r\n      this.insertBefore ? \"afterbegin\" : \"beforeend\",\r\n      this.element\r\n    );\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/scripts/Component.js?");

/***/ }),

/***/ "./src/scripts/Tooltip.js":
/*!********************************!*\
  !*** ./src/scripts/Tooltip.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ToolTip: () => (/* binding */ ToolTip)\n/* harmony export */ });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ \"./src/scripts/Component.js\");\n\r\n\r\nclass ToolTip extends _Component__WEBPACK_IMPORTED_MODULE_0__.Component {\r\n  constructor(closeNotifierFunction, text, hostElementId) {\r\n    super(hostElementId);\r\n    this.closeNotifier = closeNotifierFunction;\r\n    this.text = text;\r\n    this.create();\r\n  }\r\n  closeTooltip() {\r\n    this.detach();\r\n    this.closeNotifier();\r\n  }\r\n  create() {\r\n    const tooltipElement = document.createElement(\"div\");\r\n    tooltipElement.className = \"card\";\r\n    //  dando vida aos elementos contidos no template\r\n    const tooltipTemplate = document.getElementById(\"tooltip\");\r\n    const tooltipBody = document.importNode(tooltipTemplate.content, true);\r\n    tooltipBody.querySelector(\"p\").textContent = this.text;\r\n    tooltipElement.append(tooltipBody);\r\n\r\n    const hostElePositionLeft = this.hostElement.offsetLeft;\r\n    const hostElePositionTop = this.hostElement.offsetTop;\r\n    const hostElePositionHeight = this.hostElement.offsetHeight;\r\n    const parentElementScroll = this.hostElement.parentElement.scrollTop;\r\n    const x = hostElePositionLeft + 20;\r\n    const y =\r\n      hostElePositionTop + hostElePositionHeight - parentElementScroll - 10;\r\n\r\n    tooltipElement.style.position = \"absolute\";\r\n    tooltipElement.style.left = x + \"px\";\r\n    tooltipElement.style.top = y + \"px\";\r\n\r\n    tooltipElement.addEventListener(\"click\", this.closeTooltip.bind(this));\r\n    this.element = tooltipElement;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/scripts/Tooltip.js?");

/***/ })

}]);