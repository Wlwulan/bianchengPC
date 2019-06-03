"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Uploader = function () {
  function Uploader(t) {
    _classCallCheck(this, Uploader);

    this.growingio = t, this.messageQueue = [], this.uploadingQueue = [], this.uploadTimer = null, this.projectId = this.growingio.projectId, this.appId = this.growingio.appId, this.host = this.growingio.host, this.url = this.host + "/projects/" + this.projectId + "/apps/" + this.appId + "/collect";
  }

  _createClass(Uploader, [{
    key: "upload",
    value: function upload(t) {
      var _this = this;

      this.messageQueue.push(t);var e = this.messageQueue.length;e > 100 && (this.messageQueue = this.messageQueue.slice(e - 100)), this.uploadTimer || (this.uploadTimer = setTimeout(function () {
        _this._flush(), _this.uploadTimer = null;
      }, 1e3));
    }
  }, {
    key: "forceFlush",
    value: function forceFlush() {
      this.uploadTimer && (clearTimeout(this.uploadTimer), this.uploadTimer = null), this._flush();
    }
  }, {
    key: "_flush",
    value: function _flush() {
      var _this2 = this;

      this.uploadingQueue = this.messageQueue.slice(), this.messageQueue = [], this.uploadingQueue.length > 0 && wx.request({ url: this.url + "?stm=" + Date.now(), header: { "content-type": "application/json" }, method: "POST", data: this.uploadingQueue, success: function success() {
          _this2.messageQueue.length > 0 && _this2._flush();
        }, fail: function fail() {
          _this2.messageQueue = _this2.uploadingQueue.concat(_this2.messageQueue);
        } });
    }
  }]);

  return Uploader;
}();

var Utils = { sdkVer: "1.8.7", devVer: 1, guid: function guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
      var e = 16 * Math.random() | 0;return ("x" == t ? e : 3 & e | 8).toString(16);
    });
  }, getScreenHeight: function getScreenHeight(t) {
    return Math.round(t.screenHeight * t.pixelRatio);
  }, getScreenWidth: function getScreenWidth(t) {
    return Math.round(t.screenWidth * t.pixelRatio);
  }, getOS: function getOS(t) {
    if (t) {
      var e = t.toLowerCase();return -1 != e.indexOf("android") ? "Weixin-Android" : -1 != e.indexOf("ios") ? "Weixin-iOS" : t;
    }
  }, getOSV: function getOSV(t) {
    return "Weixin " + t;
  }, isEmpty: function isEmpty(t) {
    for (var e in t) {
      if (t.hasOwnProperty(e)) return false;
    }return true;
  } };
var Page$1 = function () {
  function Page$1() {
    _classCallCheck(this, Page$1);

    this.queries = {};
  }

  _createClass(Page$1, [{
    key: "touch",
    value: function touch(t) {
      this.path = t.route, this.time = Date.now(), this.query = this.queries[t.route] ? this.queries[t.route] : undefined;
    }
  }, {
    key: "addQuery",
    value: function addQuery(t, e) {
      this.queries[t.route] = e ? this._getQuery(e) : null;
    }
  }, {
    key: "_getQuery",
    value: function _getQuery(t) {
      return Object.keys(t).map(function (e) {
        return e + "=" + t[e];
      }).join("&");
    }
  }]);

  return Page$1;
}();

var eventTypeMap = { tap: ["tap", "click"], longtap: ["longtap"], input: ["input"], blur: ["change", "blur"], submit: ["submit"], focus: ["focus"] },
    fnExpRE = /^function[^\(]*\([^\)]+\).*[^\.]+\.([^\(]+)\(.*/;function getComKey(t) {
  return t && t.$attrs ? t.$attrs.mpcomid : "0";
}function getVM(t, e) {
  undefined === e && (e = []);var i = e.slice(1);return i.length ? i.reduce(function (t, e) {
    for (var i = t.$children.length, s = 0; i > s; s++) {
      var n = t.$children[s];if (getComKey(n) === e) return t = n;
    }return t;
  }, t) : t;
}function _getHandle(t, e, i) {
  undefined === i && (i = []);var s = [];if (!t || !t.tag) return s;var n = t || {},
      r = n.data;undefined === r && (r = {});var o = n.children;undefined === o && (o = []);var a = n.componentInstance;a ? Object.keys(a.$slots).forEach(function (t) {
    var n = a.$slots[t];(Array.isArray(n) ? n : [n]).forEach(function (t) {
      s = s.concat(_getHandle(t, e, i));
    });
  }) : o.forEach(function (t) {
    s = s.concat(_getHandle(t, e, i));
  });var h = r.attrs,
      g = r.on;return h && g && h.eventid === e && i.forEach(function (t) {
    var e = g[t];"function" == typeof e ? s.push(e) : Array.isArray(e) && (s = s.concat(e));
  }), s;
}
var VueProxy = function () {
  function VueProxy(t) {
    _classCallCheck(this, VueProxy);

    this.vueVM = t;
  }

  _createClass(VueProxy, [{
    key: "getHandle",
    value: function getHandle(t) {
      var e = t.type,
          i = t.target;undefined === i && (i = {});var s = (t.currentTarget || i).dataset;undefined === s && (s = {});var n = s.comkey;undefined === n && (n = "");var r = s.eventid,
          o = getVM(this.vueVM, n.split(","));if (o) {
        var a = _getHandle(o._vnode, r, eventTypeMap[e] || [e]);if (a.length) {
          var h = a[0];if (h.isProxied) return h.proxiedName;try {
            var g = ("" + h).replace("\n", "");if (g.match(fnExpRE)) {
              var u = fnExpRE.exec(g);if (u && u.length > 1) return u[1];
            }
          } catch (t) {}return h.name;
        }
      }
    }
  }]);

  return VueProxy;
}();

var Observer = function () {
  function Observer(t) {
    _classCallCheck(this, Observer);

    this.growingio = t, this.weixin = t.weixin, this.currentPage = new Page$1(), this.scene = null, this._sessionId = null, this.cs1 = null, this.lastPageEvent = undefined, this.lastVstArgs = undefined, this.lastCloseTime = null, this.lastScene = undefined, this.keepAlive = t.keepAlive, this.isPauseSession = false, this._observer = null, this.CLICK_TYPE = { tap: "clck", longpress: "lngprss", longtap: "lngprss" };
  }

  _createClass(Observer, [{
    key: "resetSessionId",
    value: function resetSessionId() {
      this._sessionId = null;
    }
  }, {
    key: "pauseSession",
    value: function pauseSession() {
      this.isPauseSession = true;
    }
  }, {
    key: "getVisitorId",
    value: function getVisitorId() {
      return this.weixin.uid;
    }
  }, {
    key: "getUserId",
    value: function getUserId() {
      return this.cs1;
    }
  }, {
    key: "setUserId",
    value: function setUserId(t) {
      var e = t + "";e && 100 > e.length && (this.cs1 = e, this.lastPageEvent && this._sendEvent(this.lastPageEvent));
    }
  }, {
    key: "clearUserId",
    value: function clearUserId() {
      this.cs1 = null;
    }
  }, {
    key: "collectImp",
    value: function collectImp(t) {
      var _this3 = this;

      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      this.growingio.vue && (t = t.$mp.page), this.growingio.taro && (t = t.$scope);var i = {};this._observer && this._observer.disconnect(), this._observer = t.isComponent ? t.createIntersectionObserver({ observeAll: true }) : wx.createIntersectionObserver(t, { observeAll: true }), this._relative = e ? this._observer.relativeTo(e) : this._observer.relativeToViewport(), this._relative.observe(".growing_collect_imp", function (t) {
        t.id && !i[t.id] && (_this3.track(t.dataset.gioTrack && t.dataset.gioTrack.name, t.dataset.gioTrack && t.dataset.gioTrack.properties), i[t.id] = true);
      });
    }
  }, {
    key: "appListener",
    value: function appListener(t, e, i) {
      this.isPauseSession || (this.growingio.debug && console.log("App.", e, Date.now()), "onShow" == e ? (this._parseScene(i), !this.lastCloseTime || Date.now() - this.lastCloseTime > this.keepAlive || this.lastScene && this.scene !== this.lastScene ? (this.resetSessionId(), this.sendVisitEvent(i), this.lastVstArgs = i, this.lastPageEvent = undefined) : this.useLastPageTime = true) : "onHide" == e ? (this.lastScene = this.scene, this.growingio.forceFlush(), this.weixin.syncStorage(), this.isPauseSession || (this.lastCloseTime = Date.now(), this.sendVisitCloseEvent())) : "onError" == e && this.sendErrorEvent(i));
    }
  }, {
    key: "pageListener",
    value: function pageListener(t, e, i) {
      if (this.growingio.debug && console.log("Page.", t.route, "#", e, Date.now()), "onShow" === e) this.isPauseSession ? this.isPauseSession = false : (this.currentPage.touch(t), this.sendPage(t));else if ("onLoad" === e) {
        Utils.isEmpty(s = i[0]) || this.currentPage.addQuery(t, s);
      } else if ("onHide" === e) this._observer && this._observer.disconnect();else if ("onShareAppMessage" === e) {
        var s = null,
            n = null;2 > i.length ? 1 === i.length && (i[0].from ? s = i[0] : i[0].title && (n = i[0])) : (s = i[0], n = i[1]), this.pauseSession(), this.sendPageShare(t, s, n);
      } else if ("onTabItemTap" === e) {
        this.sendTabClick(i[0]);
      }
    }
  }, {
    key: "actionListener",
    value: function actionListener(t, e) {
      if ("handleProxy" === e && this.growingio.vueRootVMs && this.growingio.vueRootVMs[this.currentPage.path]) {
        var i = new VueProxy(this.growingio.vueRootVMs[this.currentPage.path]).getHandle(t);i && (e = i);
      }this.growingio.taroRootVMs && this.growingio.taroRootVMs[e] && (e = this.growingio.taroRootVMs[e]), this.growingio.debug && console.log("Click on ", e, Date.now()), "tap" === t.type || "longpress" === t.type ? this.sendClick(t, e) : -1 !== ["change", "confirm", "blur"].indexOf(t.type) ? this.sendChange(t, e) : "getuserinfo" === t.type ? (this.sendClick(t, e), t.detail && t.detail.userInfo && this.setVisitor(t.detail.userInfo)) : "getphonenumber" === t.type ? this.sendClick(t, e) : "contact" === t.type ? this.sendClick(t, e) : "submit" === t.type && this.sendSubmit(t, e);
    }
  }, {
    key: "getLocation",
    value: function getLocation() {
      this.growingio.getLocation = true, this.sendVisitEvent(this.lastVstArgs);
    }
  }, {
    key: "track",
    value: function track(t, e) {
      if (null !== t && undefined !== t && 0 !== t.length) {
        var i = { t: "cstm", ptm: this.currentPage.time, p: this.currentPage.path, q: this.currentPage.query, n: t };null !== e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (i.var = e), this._sendEvent(i);
      }
    }
  }, {
    key: "identify",
    value: function identify(t, e) {
      undefined !== t && 0 !== t.length && (this.growingio.login(t), this._sendEvent({ t: "vstr", var: { openid: t, unionid: e } }));
    }
  }, {
    key: "setVisitor",
    value: function setVisitor(t) {
      this._sendEvent({ t: "vstr", var: t });
    }
  }, {
    key: "setUser",
    value: function setUser(t) {
      this._sendEvent({ t: "ppl", var: t });
    }
  }, {
    key: "setPage",
    value: function setPage(t) {
      this._sendEvent({ t: "pvar", ptm: this.currentPage.time, p: this.currentPage.path, q: this.currentPage.query, var: t });
    }
  }, {
    key: "setEvar",
    value: function setEvar(t) {
      this._sendEvent({ t: "evar", var: t });
    }
  }, {
    key: "sendVisitEvent",
    value: function sendVisitEvent(t) {
      var _this4 = this;

      var e = this.weixin.systemInfo,
          i = { t: "vst", tm: Date.now(), av: Utils.sdkVer, db: e.brand, dm: e.model.replace(/<.*>/, ""), sh: Utils.getScreenHeight(e), sw: Utils.getScreenWidth(e), os: Utils.getOS(e.platform), osv: Utils.getOSV(e.version), l: e.language };if (this.growingio.appVer && (i.cv = this.growingio.appVer + ""), t.length > 0) {
        var s = t[0];i.p = s.path, Utils.isEmpty(s.query) || (i.q = this.currentPage._getQuery(s.query)), i.ch = "scn:" + this.scene, s.referrerInfo && s.referrerInfo.appId && (i.rf = s.referrerInfo.appId);
      }this.weixin.getNetworkType().then(function (t) {
        t && (i.nt = t.networkType, _this4.growingio.getLocation ? _this4.weixin.requestLocation().then(function () {
          null != _this4.weixin.location && (i.lat = _this4.weixin.location.latitude, i.lng = _this4.weixin.location.longitude), _this4._sendEvent(i);
        }) : _this4._sendEvent(i));
      });
    }
  }, {
    key: "sendVisitCloseEvent",
    value: function sendVisitCloseEvent() {
      this._sendEvent({ t: "cls", p: this.currentPage.path, q: this.currentPage.query });
    }
  }, {
    key: "sendErrorEvent",
    value: function sendErrorEvent(t) {
      if (t && t.length > 0) {
        var e = t[0].split("\n");if (e && e.length > 1) {
          var _t = e[1].split(";");if (_t && _t.length > 1) {
            var i = _t[1].match(/at ([^ ]+) page (.*) function/),
                _s = { key: e[0], error: _t[0] };i && i.length > 2 && (_s.page = i[1], _s.function = i[2]), this._sendEvent({ t: "cstm", ptm: this.currentPage.time, p: this.currentPage.path, q: this.currentPage.query, n: "onError", var: _s });
          }
        }
      }
    }
  }, {
    key: "sendPage",
    value: function sendPage(t) {
      var e = { t: "page", tm: this.currentPage.time, p: this.currentPage.path, q: this.currentPage.query };this.lastPageEvent ? (e.rp = this.lastPageEvent.p, this.useLastPageTime && (e.tm = this.lastPageEvent.tm, this.useLastPageTime = false)) : e.rp = this.scene ? "scn:" + this.scene : null, t.data && t.data.pvar && (e.var = t.data.pvar);var i = this.weixin.getPageTitle(t);i && i.length > 0 && (e.tl = i), this._sendEvent(e), this.lastPageEvent = e;
    }
  }, {
    key: "sendPageShare",
    value: function sendPageShare(t, e, i) {
      this._sendEvent({ t: "cstm", ptm: this.currentPage.time, p: this.currentPage.path, q: this.currentPage.query, n: "onShareAppMessage", var: { from: e ? e.from : undefined, target: e && e.target ? e.target.id : undefined, title: i ? i.title : undefined, path: i ? i.path : undefined } });
    }
  }, {
    key: "sendClick",
    value: function sendClick(t, e) {
      var i = { t: this.CLICK_TYPE[t.type] || "clck", ptm: this.currentPage.time, p: this.currentPage.path, q: this.currentPage.query },
          s = t.currentTarget,
          n = { x: s.id + "#" + e };s.dataset.title ? n.v = s.dataset.title : s.dataset.src && (n.h = s.dataset.src), undefined !== s.dataset.index && (n.idx = /^[\d]+$/.test(s.dataset.index) ? parseInt(s.dataset.index) : -1), i.e = [n], this._sendEvent(i);
    }
  }, {
    key: "sendSubmit",
    value: function sendSubmit(t, e) {
      var i = { t: "sbmt", ptm: this.currentPage.time, p: this.currentPage.path, q: this.currentPage.query };i.e = [{ x: t.currentTarget.id + "#" + e }], this._sendEvent(i);
    }
  }, {
    key: "sendChange",
    value: function sendChange(t, e) {
      var i = { t: "chng", ptm: this.currentPage.time, p: this.currentPage.path, q: this.currentPage.query },
          s = t.currentTarget,
          n = { x: s.id + "#" + e };if (-1 !== ["blur", "change", "confirm"].indexOf(t.type) && s.dataset.growingTrack) {
        if (!t.detail.value || 0 === t.detail.value.length) return;"string" == typeof t.detail.value ? n.v = t.detail.value : "[object Array]" === Object.prototype.toString.call(t.detail.value) && (n.v = t.detail.value.join(","));
      }"change" === t.type && t.detail && t.detail.source && "autoplay" === t.detail.source || (i.e = [n], this._sendEvent(i));
    }
  }, {
    key: "sendTabClick",
    value: function sendTabClick(t) {
      var e = { t: "clck", ptm: this.currentPage.time, p: this.currentPage.path, q: this.currentPage.query, e: [{ x: "#onTabItemTap", v: t.text, idx: t.index, h: JSON.stringify(t.pagePath) }] };this._sendEvent(e);
    }
  }, {
    key: "_sendEvent",
    value: function _sendEvent(t) {
      t.u = this.weixin.uid, t.s = this.sessionId, t.tm = t.tm || Date.now(), t.d = this.growingio.appId, t.b = "MinP", null !== this.cs1 && (t.cs1 = this.cs1), this.growingio.upload(t);
    }
  }, {
    key: "_parseScene",
    value: function _parseScene(t) {
      if (t.length > 0) {
        var e = t[0];e.scene && (this.scene = e.scene);
      }
    }
  }, {
    key: "sessionId",
    get: function get() {
      return null === this._sessionId && (this._sessionId = Utils.guid()), this._sessionId;
    }
  }]);

  return Observer;
}();

var Weixin = function () {
  function Weixin(t) {
    _classCallCheck(this, Weixin);

    this._location = null, this._systemInfo = null, this._uid = wx.getStorageSync("_growing_uid_"), this._uid && 36 !== this._uid.length && (t.forceLogin = false), this._esid = wx.getStorageSync("_growing_esid_");
  }

  _createClass(Weixin, [{
    key: "syncStorage",
    value: function syncStorage() {
      wx.getStorageSync("_growing_uid_") || wx.setStorageSync("_growing_uid_", this._uid);
    }
  }, {
    key: "requestLocation",
    value: function requestLocation() {
      var _this5 = this;

      return new Promise(function (t) {
        _this5._getLocation().then(function (e) {
          return _this5._location = e, t(e);
        });
      });
    }
  }, {
    key: "getNetworkType",
    value: function getNetworkType() {
      return new Promise(function (t) {
        wx.getNetworkType({ success: function success(e) {
            return t(e);
          }, fail: function fail() {
            return t(null);
          } });
      });
    }
  }, {
    key: "getPageTitle",
    value: function getPageTitle(t) {
      var e = "";try {
        if (t.data.title && t.data.title.length > 0 && (e = Array.isArray(t.data.title) ? t.data.title.join(" ") : t.data.title), 0 === e.length && __wxConfig) {
          if (__wxConfig.tabBar) {
            var i = __wxConfig.tabBar.list.find(function (e) {
              return e.pathPath == t.route || e.pagePath == t.route + ".html";
            });i && i.text && (e = i.text);
          }if (0 == e.length) {
            var s = __wxConfig.page[t.route] || __wxConfig.page[t.route + ".html"];e = s ? s.window.navigationBarTitleText : __wxConfig.global.window.navigationBarTitleText;
          }
        }
      } catch (t) {}return e;
    }
  }, {
    key: "_getSetting",
    value: function _getSetting() {
      return new Promise(function (t) {
        wx.getSetting({ success: t, fail: t });
      });
    }
  }, {
    key: "_getLocation",
    value: function _getLocation() {
      return new Promise(function (t) {
        wx.getLocation({ success: t, fail: function fail() {
            return t(null);
          } });
      });
    }
  }, {
    key: "location",
    get: function get() {
      return this._location;
    }
  }, {
    key: "systemInfo",
    get: function get() {
      return null == this._systemInfo && (this._systemInfo = wx.getSystemInfoSync()), this._systemInfo;
    }
  }, {
    key: "esid",
    set: function set(t) {
      this._esid = t, wx.setStorageSync("_growing_esid_", this._esid);
    },
    get: function get() {
      return this._esid || (this._esid = 1), this._esid;
    }
  }, {
    key: "uid",
    set: function set(t) {
      this._uid = t, wx.setStorageSync("_growing_uid_", this._uid);
    },
    get: function get() {
      return this._uid || (this.uid = Utils.guid()), this._uid;
    }
  }]);

  return Weixin;
}();

var VdsInstrumentAgent = { defaultPageCallbacks: {}, defaultAppCallbacks: {}, appHandlers: ["onShow", "onHide", "onError"], pageHandlers: ["onLoad", "onShow", "onShareAppMessage", "onTabItemTap", "onHide"], actionEventTypes: ["tap", "longpress", "blur", "change", "submit", "confirm", "getuserinfo", "getphonenumber", "contact"], originalPage: Page, originalApp: App, originalComponent: Component, originalBehavior: Behavior, hook: function hook(t, e) {
    return function () {
      var i,
          s = arguments ? arguments[0] : undefined;if (s && s.currentTarget && -1 != VdsInstrumentAgent.actionEventTypes.indexOf(s.type)) try {
        VdsInstrumentAgent.observer.actionListener(s, t);
      } catch (t) {
        console.error(t);
      }if (this._growing_app_ && "onShow" !== t ? i = e.apply(this, arguments) : this._growing_page_ && -1 === ["onShow", "onLoad", "onTabItemTap"].indexOf(t) && (i = e.apply(this, arguments)), this._growing_app_ && -1 !== VdsInstrumentAgent.appHandlers.indexOf(t)) {
        try {
          VdsInstrumentAgent.defaultAppCallbacks[t].apply(this, arguments);
        } catch (t) {
          console.error(t);
        }"onShow" === t && (i = e.apply(this, arguments));
      }if (this._growing_page_ && -1 !== VdsInstrumentAgent.pageHandlers.indexOf(t)) {
        var n = Array.prototype.slice.call(arguments);i && n.push(i);try {
          VdsInstrumentAgent.defaultPageCallbacks[t].apply(this, n);
        } catch (t) {
          console.error(t);
        }if (-1 !== ["onShow", "onLoad", "onTabItemTap", "onHide"].indexOf(t)) i = e.apply(this, arguments);else {
          var r = VdsInstrumentAgent.observer.growingio;r && r.followShare && i && i.path && (i.path = -1 === i.path.indexOf("?") ? i.path + "?suid=" + r.weixin.uid : i.path + "&suid=" + r.weixin.uid);
        }
      }return i;
    };
  }, hookComponent: function hookComponent(t, e) {
    return function () {
      var i = arguments ? arguments[0] : undefined;if (i && i.currentTarget && -1 != VdsInstrumentAgent.actionEventTypes.indexOf(i.type)) try {
        VdsInstrumentAgent.observer.actionListener(i, t);
      } catch (t) {
        console.error(t);
      }return e.apply(this, arguments);
    };
  }, instrument: function instrument(t) {
    for (var e in t) {
      "function" == typeof t[e] && (t[e] = this.hook(e, t[e]));
    }return t._growing_app_ && VdsInstrumentAgent.appHandlers.map(function (e) {
      t[e] || (t[e] = VdsInstrumentAgent.defaultAppCallbacks[e]);
    }), t._growing_page_ && VdsInstrumentAgent.pageHandlers.map(function (e) {
      t[e] || "onShareAppMessage" === e || (t[e] = VdsInstrumentAgent.defaultPageCallbacks[e]);
    }), t;
  }, instrumentTaroPageComponent: function instrumentTaroPageComponent(t) {
    if (t.methods) {
      var e = t.methods;
      var _loop = function _loop(i) {
        if ("function" == typeof e[i] && -1 != VdsInstrumentAgent.pageHandlers.indexOf(i)) {
          var _s2 = e[i];t.methods[i] = function () {
            return VdsInstrumentAgent.observer.pageListener(this, i, arguments), _s2.apply(this, arguments);
          };
        }
      };

      for (var i in e) {
        _loop(i);
      }
    }return t;
  }, instrumentComponent: function instrumentComponent(t) {
    if (t.methods) {
      var e = t.methods;for (var i in e) {
        "function" == typeof e[i] && (t.methods[i] = this.hookComponent(i, e[i]));
      }
    }return t;
  }, GrowingPage: function GrowingPage(t) {
    return t._growing_page_ = true, VdsInstrumentAgent.originalPage(VdsInstrumentAgent.instrument(t));
  }, GrowingComponent: function GrowingComponent(t) {
    return VdsInstrumentAgent.originalComponent(VdsInstrumentAgent.instrumentComponent(t));
  }, GrowingBehavior: function GrowingBehavior(t) {
    return VdsInstrumentAgent.originalBehavior(VdsInstrumentAgent.instrumentComponent(t));
  }, GrowingApp: function GrowingApp(t) {
    return t._growing_app_ = true, VdsInstrumentAgent.originalApp(VdsInstrumentAgent.instrument(t));
  }, initInstrument: function initInstrument(t, e) {
    VdsInstrumentAgent.observer = t, VdsInstrumentAgent.pageHandlers.forEach(function (t) {
      VdsInstrumentAgent.defaultPageCallbacks[t] = function () {
        this.__route__ && VdsInstrumentAgent.observer.pageListener(this, t, arguments);
      };
    }), VdsInstrumentAgent.appHandlers.forEach(function (t) {
      VdsInstrumentAgent.defaultAppCallbacks[t] = function () {
        VdsInstrumentAgent.observer.appListener(this, t, arguments);
      };
    }), e ? (global.GioPage = VdsInstrumentAgent.GrowingPage, global.GioApp = VdsInstrumentAgent.GrowingApp, global.GioComponent = VdsInstrumentAgent.GrowingBehavior, global.GioBehavior = VdsInstrumentAgent.GrowingBehavior) : (Page = function Page() {
      return VdsInstrumentAgent.GrowingPage(arguments[0]);
    }, App = function App() {
      return VdsInstrumentAgent.GrowingApp(arguments[0]);
    }, Component = function Component() {
      return VdsInstrumentAgent.GrowingComponent(arguments[0]);
    }, Behavior = function Behavior() {
      return VdsInstrumentAgent.GrowingBehavior(arguments[0]);
    });
  } };Object.getOwnPropertyDescriptors || (Object.getOwnPropertyDescriptors = function (t) {
  var e = {};var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Reflect.ownKeys(t)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      e[i] = Object.getOwnPropertyDescriptor(t, i);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return e;
});
var GrowingIO = function () {
  function GrowingIO() {
    _classCallCheck(this, GrowingIO);

    this.uploadingMessages = [];
  }

  _createClass(GrowingIO, [{
    key: "init",
    value: function init(t, e) {
      var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      this.projectId = t, this.appId = e, this.appVer = i.version, this.debug = i.debug || false, this.forceLogin = i.forceLogin || false, this.followShare = i.followShare || false, this.usePlugin = i.usePlugin || false, this.getLocation = i.getLocation || false, this.keepAlive = +i.keepAlive || 3e4, this.vue = !!i.vue, this.taro = !!i.taro, this.stopTrack = !!i.stopTrack, this.weixin = new Weixin(this), this.esid = this.weixin.esid, this.host = "https://wxapi.growingio.com", i.host && i.host.indexOf("http") >= 0 && (this.host = "https://" + i.host.slice(i.host.indexOf("://") + 3)), this.uploader = new Uploader(this), this.observer = new Observer(this), i.vue && (this.vueRootVMs = {}, this._proxyVue(i.vue)), i.taro && (this.taroRootVMs = {}, this._proxyTaro(i.taro)), i.stopTrack || this._start();
    }
  }, {
    key: "setVue",
    value: function setVue(t) {
      this.vueRootVMs || (this.vueRootVMs = {}), this.vue = true, this._proxyVue(t);
    }
  }, {
    key: "setStopTrack",
    value: function setStopTrack(t) {
      this.stopTrack = t;
    }
  }, {
    key: "login",
    value: function login(t) {
      if (this.forceLogin) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (this.weixin.uid = t, this.forceLogin = false, this.uploadingMessages)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var e = _step2.value;
            e.u = t, this._upload(e);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }, {
    key: "upload",
    value: function upload(t) {
      this.stopTrack || (this.forceLogin ? this.uploadingMessages.push(t) : this._upload(t));
    }
  }, {
    key: "forceFlush",
    value: function forceFlush() {
      this.weixin.esid = this.esid, this.uploader.forceFlush();
    }
  }, {
    key: "proxy",
    value: function proxy(t, e) {
      try {
        if ("setVue" === t) this.setVue(e[0]);else if ("setStopTrack" === t) this.setStopTrack(e[0]);else if (this.observer && this.observer[t]) return this.observer[t].apply(this.observer, e);
      } catch (t) {
        console.error(t);
      }
    }
  }, {
    key: "_start",
    value: function _start() {
      VdsInstrumentAgent.initInstrument(this.observer, this.usePlugin);try {
        global && (global.App = App, global.Page = Page, global.Component = Component);
      } catch (t) {
        console.error(t);
      }
    }
  }, {
    key: "_upload",
    value: function _upload(t) {
      t.esid = this.esid++, this.debug && console.info("generate new event", JSON.stringify(t, 0, 2)), this.uploader.upload(t);
    }
  }, {
    key: "_proxyTaro",
    value: function _proxyTaro(t) {
      var e = this;var i = t.createComponent;t.createComponent = function (t, s) {
        var n = t;for (; n && n.prototype;) {
          var _i = Object.keys(Object.getOwnPropertyDescriptors(n.prototype) || {});for (var _s3 = 0; _i.length > _s3; _s3++) {
            if (_i[_s3].startsWith("func__")) {
              var _r = n.name,
                  o = _i[_s3].slice(6);e.taroRootVMs[_i[_s3]] = _r + "_" + ("" + t.prototype[_i[_s3]]).match(/this\.__triggerPropsFn\(\"(.+)\",/)[1] + "_" + o;
            }
          }n = Object.getPrototypeOf(n);
        }var r = i(t, s);return s && VdsInstrumentAgent.instrumentTaroPageComponent(r), r;
      };
    }
  }, {
    key: "_proxyVue",
    value: function _proxyVue(t) {
      if (undefined !== t.mixin) {
        var e = this;t.mixin({ created: function created() {
            if (!this.$options.methods) return;var t = Object.keys(this.$options.methods);var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = Object.keys(this)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _e = _step3.value;
                0 > t.indexOf(_e) || "function" != typeof this[_e] || (Object.defineProperty(this[_e], "proxiedName", { value: _e }), Object.defineProperty(this[_e], "isProxied", { value: true }));
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }, beforeMount: function beforeMount() {
            var t = this.$root;t.$mp && "page" === t.$mp.mpType && t.$mp.page && (e.vueRootVMs[t.$mp.page.route] = t);
          } });
      }
    }
  }]);

  return GrowingIO;
}();

var growingio = new GrowingIO(),
    gio = function gio() {
  var t = arguments[0];if (t) {
    var e = 2 > arguments.length ? [] : [].slice.call(arguments, 1);if ("init" !== t) return growingio.proxy(t, e);if (e.length < 2) console.log("初始化 GrowingIO SDK 失败。请使用 gio('init', '你的GrowingIO项目ID', '你的微信APP_ID', options);");else growingio.init(e[0], e[1], e[2]);
  }
};console.log("init growingio...");var GioPage = VdsInstrumentAgent.GrowingPage,
    GioApp = VdsInstrumentAgent.GrowingApp,
    GioComponent = VdsInstrumentAgent.GrowingComponent,
    GioBehavior = VdsInstrumentAgent.GioBehavior;exports.GioPage = GioPage, exports.GioApp = GioApp, exports.GioComponent = GioComponent, exports.GioBehavior = GioBehavior, exports.default = gio;