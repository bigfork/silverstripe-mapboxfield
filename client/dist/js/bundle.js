/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/bundles/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/bundles/bundle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_MapboxField_MapboxField__ = __webpack_require__("./client/src/components/MapboxField/MapboxField.js");



__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.entwine('ss', function ($) {
  $('.cms-edit-form .mapbox').entwine({
    MapboxField: null,

    onmatch: function onmatch() {
      if (!this.getMapboxField()) {
        this.setMapboxField(new __WEBPACK_IMPORTED_MODULE_1_components_MapboxField_MapboxField__["a" /* default */](this));
      }
    }
  });

  $('.cms-edit-form [aria-hidden="false"] .mapbox').entwine({
    onmatch: function onmatch() {
      this._super();

      this.getMapboxField().render();
    }
  });
});

/***/ }),

/***/ "./client/src/components/MapboxField/MapboxField.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapboxField = function () {
  function MapboxField($container) {
    _classCallCheck(this, MapboxField);

    this.$container = $container;
    this.rendered = false;
  }

  _createClass(MapboxField, [{
    key: '_getLngLatValue',
    value: function _getLngLatValue() {
      return [this._getLngField().val(), this._getLatField().val()];
    }
  }, {
    key: '_setLngLatValue',
    value: function _setLngLatValue(coords) {
      this._getLngField().val(coords[0]).change();
      this._getLatField().val(coords[1]).change();
    }
  }, {
    key: '_getLngField',
    value: function _getLngField() {
      return this.$container.find('input[data-mapbox-field="Longitude"]');
    }
  }, {
    key: '_getLatField',
    value: function _getLatField() {
      return this.$container.find('input[data-mapbox-field="Latitude"]');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      if (this.rendered) {
        return;
      }

      mapboxgl.accessToken = MapboxField._getAccessToken();
      var map = new mapboxgl.Map({
        center: this._getLngLatValue(),
        container: this.$container.find('.mapbox__map').get(0),
        style: 'mapbox://styles/mapbox/basic-v9',
        zoom: 15
      });

      var marker = new mapboxgl.Marker({
        draggable: true
      }).setLngLat(this._getLngLatValue()).addTo(map);

      marker.on('dragend', function () {
        _this._onMarkerUpdate(marker);
      });

      var geocoder = new MapboxGeocoder({
        accessToken: MapboxField._getAccessToken()
      });
      map.addControl(geocoder);

      geocoder.on('result', function (event) {
        marker.setLngLat(event.result.geometry.coordinates);
        _this._onMarkerUpdate(marker);
      });

      map.addControl(new mapboxgl.NavigationControl());

      this.rendered = true;
    }
  }, {
    key: '_onMarkerUpdate',
    value: function _onMarkerUpdate(marker) {
      var lngLat = marker.getLngLat();
      this._setLngLatValue([lngLat.lng, lngLat.lat]);
    }
  }], [{
    key: '_getAccessToken',
    value: function _getAccessToken() {
      return window.mapboxAccessToken;
    }
  }]);

  return MapboxField;
}();

/* harmony default export */ __webpack_exports__["a"] = (MapboxField);

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map