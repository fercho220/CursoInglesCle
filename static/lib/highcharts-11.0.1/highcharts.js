/*
 Highcharts JS v11.0.1 (2023-05-08)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
"use strict";
(function (S, M) {
  "object" === typeof module && module.exports
    ? ((M["default"] = M), (module.exports = S.document ? M(S) : M))
    : "function" === typeof define && define.amd
    ? define("highcharts/highcharts", function () {
        return M(S);
      })
    : (S.Highcharts && S.Highcharts.error(16, !0), (S.Highcharts = M(S)));
})("undefined" !== typeof window ? window : this, function (S) {
  function M(a, y, G, L) {
    a.hasOwnProperty(y) ||
      ((a[y] = L.apply(null, G)),
      "function" === typeof CustomEvent &&
        S.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: y, module: a[y] },
          })
        ));
  }
  var a = {};
  M(a, "Core/Globals.js", [], function () {
    var a;
    (function (a) {
      a.SVG_NS = "http://www.w3.org/2000/svg";
      a.product = "Highcharts";
      a.version = "11.0.1";
      a.win = "undefined" !== typeof S ? S : {};
      a.doc = a.win.document;
      a.svg =
        a.doc &&
        a.doc.createElementNS &&
        !!a.doc.createElementNS(a.SVG_NS, "svg").createSVGRect;
      a.userAgent = (a.win.navigator && a.win.navigator.userAgent) || "";
      a.isChrome = -1 !== a.userAgent.indexOf("Chrome");
      a.isFirefox = -1 !== a.userAgent.indexOf("Firefox");
      a.isMS = /(edge|msie|trident)/i.test(a.userAgent) && !a.win.opera;
      a.isSafari = !a.isChrome && -1 !== a.userAgent.indexOf("Safari");
      a.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(a.userAgent);
      a.isWebKit = -1 !== a.userAgent.indexOf("AppleWebKit");
      a.deg2rad = (2 * Math.PI) / 360;
      a.hasBidiBug =
        a.isFirefox && 4 > parseInt(a.userAgent.split("Firefox/")[1], 10);
      a.hasTouch = !!a.win.TouchEvent;
      a.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
      a.noop = function () {};
      a.supportsPassiveEvents = (function () {
        let x = !1;
        if (!a.isMS) {
          const y = Object.defineProperty({}, "passive", {
            get: function () {
              x = !0;
            },
          });
          a.win.addEventListener &&
            a.win.removeEventListener &&
            (a.win.addEventListener("testPassive", a.noop, y),
            a.win.removeEventListener("testPassive", a.noop, y));
        }
        return x;
      })();
      a.charts = [];
      a.dateFormats = {};
      a.seriesTypes = {};
      a.symbolSizes = {};
      a.chartCount = 0;
    })(a || (a = {}));
    ("");
    return a;
  });
  M(a, "Core/Utilities.js", [a["Core/Globals.js"]], function (a) {
    function x(d, k, b, f) {
      const E = k ? "Highcharts error" : "Highcharts warning";
      32 === d && (d = `${E}: Deprecated member`);
      const m = v(d);
      let g = m ? `${E} #${d}: www.highcharts.com/errors/${d}/` : d.toString();
      if ("undefined" !== typeof f) {
        let d = "";
        m && (g += "?");
        J(f, function (k, b) {
          d += `\n - ${b}: ${k}`;
          m && (g += encodeURI(b) + "=" + encodeURI(k));
        });
        g += d;
      }
      e(
        a,
        "displayError",
        { chart: b, code: d, message: g, params: f },
        function () {
          if (k) throw Error(g);
          p.console && -1 === x.messages.indexOf(g) && console.warn(g);
        }
      );
      x.messages.push(g);
    }
    function G(d, k) {
      const b = {};
      J(d, function (f, E) {
        if (C(d[E], !0) && !d.nodeType && k[E])
          (f = G(d[E], k[E])), Object.keys(f).length && (b[E] = f);
        else if (C(d[E]) || d[E] !== k[E] || (E in d && !(E in k))) b[E] = d[E];
      });
      return b;
    }
    function L(d, k) {
      return parseInt(d, k || 10);
    }
    function A(d) {
      return "string" === typeof d;
    }
    function D(d) {
      d = Object.prototype.toString.call(d);
      return "[object Array]" === d || "[object Array Iterator]" === d;
    }
    function C(d, k) {
      return !!d && "object" === typeof d && (!k || !D(d));
    }
    function z(d) {
      return C(d) && "number" === typeof d.nodeType;
    }
    function t(d) {
      const k = d && d.constructor;
      return !(!C(d, !0) || z(d) || !k || !k.name || "Object" === k.name);
    }
    function v(d) {
      return (
        "number" === typeof d && !isNaN(d) && Infinity > d && -Infinity < d
      );
    }
    function c(d) {
      return "undefined" !== typeof d && null !== d;
    }
    function n(d, k, b) {
      const f = A(k) && !c(b);
      let E;
      const e = (k, b) => {
        c(k)
          ? d.setAttribute(b, k)
          : f
          ? (E = d.getAttribute(b)) ||
            "class" !== b ||
            (E = d.getAttribute(b + "Name"))
          : d.removeAttribute(b);
      };
      A(k) ? e(b, k) : J(k, e);
      return E;
    }
    function r(d, b) {
      let k;
      d || (d = {});
      for (k in b) d[k] = b[k];
      return d;
    }
    function l() {
      const d = arguments,
        b = d.length;
      for (let k = 0; k < b; k++) {
        const b = d[k];
        if ("undefined" !== typeof b && null !== b) return b;
      }
    }
    function h(d, b) {
      a.isMS &&
        !a.svg &&
        b &&
        c(b.opacity) &&
        (b.filter = `alpha(opacity=${100 * b.opacity})`);
      r(d.style, b);
    }
    function q(d) {
      return Math.pow(10, Math.floor(Math.log(d) / Math.LN10));
    }
    function g(d, b) {
      return 1e14 < d ? d : parseFloat(d.toPrecision(b || 14));
    }
    function w(d, b, f) {
      let k;
      if ("width" === b)
        return (
          (b = Math.min(d.offsetWidth, d.scrollWidth)),
          (f = d.getBoundingClientRect && d.getBoundingClientRect().width),
          f < b && f >= b - 1 && (b = Math.floor(f)),
          Math.max(
            0,
            b -
              (w(d, "padding-left", !0) || 0) -
              (w(d, "padding-right", !0) || 0)
          )
        );
      if ("height" === b)
        return Math.max(
          0,
          Math.min(d.offsetHeight, d.scrollHeight) -
            (w(d, "padding-top", !0) || 0) -
            (w(d, "padding-bottom", !0) || 0)
        );
      if ((d = p.getComputedStyle(d, void 0)))
        (k = d.getPropertyValue(b)), l(f, "opacity" !== b) && (k = L(k));
      return k;
    }
    function J(d, b, f) {
      for (const k in d)
        Object.hasOwnProperty.call(d, k) && b.call(f || d[k], d[k], k, d);
    }
    function F(d, b, f) {
      function k(b, k) {
        const f = d.removeEventListener;
        f && f.call(d, b, k, !1);
      }
      function e(f) {
        let e, K;
        d.nodeName &&
          (b ? ((e = {}), (e[b] = !0)) : (e = f),
          J(e, function (d, b) {
            if (f[b]) for (K = f[b].length; K--; ) k(b, f[b][K].fn);
          }));
      }
      var p = ("function" === typeof d && d.prototype) || d;
      if (Object.hasOwnProperty.call(p, "hcEvents")) {
        const d = p.hcEvents;
        b
          ? ((p = d[b] || []),
            f
              ? ((d[b] = p.filter(function (d) {
                  return f !== d.fn;
                })),
                k(b, f))
              : (e(d), (d[b] = [])))
          : (e(d), delete p.hcEvents);
      }
    }
    function e(d, b, f, e) {
      f = f || {};
      if (u.createEvent && (d.dispatchEvent || (d.fireEvent && d !== a))) {
        var k = u.createEvent("Events");
        k.initEvent(b, !0, !0);
        f = r(k, f);
        d.dispatchEvent ? d.dispatchEvent(f) : d.fireEvent(b, f);
      } else if (d.hcEvents) {
        f.target ||
          r(f, {
            preventDefault: function () {
              f.defaultPrevented = !0;
            },
            target: d,
            type: b,
          });
        k = [];
        let e = d,
          E = !1;
        for (; e.hcEvents; )
          Object.hasOwnProperty.call(e, "hcEvents") &&
            e.hcEvents[b] &&
            (k.length && (E = !0), k.unshift.apply(k, e.hcEvents[b])),
            (e = Object.getPrototypeOf(e));
        E && k.sort((d, b) => d.order - b.order);
        k.forEach((b) => {
          !1 === b.fn.call(d, f) && f.preventDefault();
        });
      }
      e && !f.defaultPrevented && e.call(d, f);
    }
    const { charts: m, doc: u, win: p } = a;
    (x || (x = {})).messages = [];
    Math.easeInOutSine = function (d) {
      return -0.5 * (Math.cos(Math.PI * d) - 1);
    };
    var H = Array.prototype.find
      ? function (d, b) {
          return d.find(b);
        }
      : function (d, b) {
          let k;
          const f = d.length;
          for (k = 0; k < f; k++) if (b(d[k], k)) return d[k];
        };
    J(
      {
        map: "map",
        each: "forEach",
        grep: "filter",
        reduce: "reduce",
        some: "some",
      },
      function (d, b) {
        a[b] = function (k) {
          x(32, !1, void 0, { [`Highcharts.${b}`]: `use Array.${d}` });
          return Array.prototype[d].apply(k, [].slice.call(arguments, 1));
        };
      }
    );
    let b;
    const f = (function () {
      const d = Math.random().toString(36).substring(2, 9) + "-";
      let k = 0;
      return function () {
        return "highcharts-" + (b ? "" : d) + k++;
      };
    })();
    p.jQuery &&
      (p.jQuery.fn.highcharts = function () {
        const d = [].slice.call(arguments);
        if (this[0])
          return d[0]
            ? (new a[A(d[0]) ? d.shift() : "Chart"](this[0], d[0], d[1]), this)
            : m[n(this[0], "data-highcharts-chart")];
      });
    H = {
      addEvent: function (d, b, f, e = {}) {
        var k = ("function" === typeof d && d.prototype) || d;
        Object.hasOwnProperty.call(k, "hcEvents") || (k.hcEvents = {});
        k = k.hcEvents;
        a.Point &&
          d instanceof a.Point &&
          d.series &&
          d.series.chart &&
          (d.series.chart.runTrackerClick = !0);
        const p = d.addEventListener;
        p &&
          p.call(
            d,
            b,
            f,
            a.supportsPassiveEvents
              ? {
                  passive:
                    void 0 === e.passive
                      ? -1 !== b.indexOf("touch")
                      : e.passive,
                  capture: !1,
                }
              : !1
          );
        k[b] || (k[b] = []);
        k[b].push({
          fn: f,
          order: "number" === typeof e.order ? e.order : Infinity,
        });
        k[b].sort((d, b) => d.order - b.order);
        return function () {
          F(d, b, f);
        };
      },
      arrayMax: function (d) {
        let b = d.length,
          f = d[0];
        for (; b--; ) d[b] > f && (f = d[b]);
        return f;
      },
      arrayMin: function (d) {
        let b = d.length,
          f = d[0];
        for (; b--; ) d[b] < f && (f = d[b]);
        return f;
      },
      attr: n,
      clamp: function (d, b, f) {
        return d > b ? (d < f ? d : f) : b;
      },
      cleanRecursively: G,
      clearTimeout: function (b) {
        c(b) && clearTimeout(b);
      },
      correctFloat: g,
      createElement: function (b, k, f, e, p) {
        b = u.createElement(b);
        k && r(b, k);
        p && h(b, { padding: "0", border: "none", margin: "0" });
        f && h(b, f);
        e && e.appendChild(b);
        return b;
      },
      css: h,
      defined: c,
      destroyObjectProperties: function (b, k) {
        J(b, function (d, f) {
          d && d !== k && d.destroy && d.destroy();
          delete b[f];
        });
      },
      discardElement: function (b) {
        b && b.parentElement && b.parentElement.removeChild(b);
      },
      erase: function (b, k) {
        let d = b.length;
        for (; d--; )
          if (b[d] === k) {
            b.splice(d, 1);
            break;
          }
      },
      error: x,
      extend: r,
      extendClass: function (b, k) {
        const d = function () {};
        d.prototype = new b();
        r(d.prototype, k);
        return d;
      },
      find: H,
      fireEvent: e,
      getMagnitude: q,
      getNestedProperty: function (b, k) {
        for (b = b.split("."); b.length && c(k); ) {
          const d = b.shift();
          if ("undefined" === typeof d || "__proto__" === d) return;
          k = k[d];
          if (
            !c(k) ||
            "function" === typeof k ||
            "number" === typeof k.nodeType ||
            k === p
          )
            return;
        }
        return k;
      },
      getStyle: w,
      inArray: function (b, k, f) {
        x(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" });
        return k.indexOf(b, f);
      },
      isArray: D,
      isClass: t,
      isDOMElement: z,
      isFunction: function (b) {
        return "function" === typeof b;
      },
      isNumber: v,
      isObject: C,
      isString: A,
      keys: function (b) {
        x(32, !1, void 0, { "Highcharts.keys": "use Object.keys" });
        return Object.keys(b);
      },
      merge: function () {
        let b,
          k = arguments,
          f = {};
        const e = function (b, d) {
          "object" !== typeof b && (b = {});
          J(d, function (k, f) {
            "__proto__" !== f &&
              "constructor" !== f &&
              (!C(k, !0) || t(k) || z(k)
                ? (b[f] = d[f])
                : (b[f] = e(b[f] || {}, k)));
          });
          return b;
        };
        !0 === k[0] && ((f = k[1]), (k = Array.prototype.slice.call(k, 2)));
        const p = k.length;
        for (b = 0; b < p; b++) f = e(f, k[b]);
        return f;
      },
      normalizeTickInterval: function (b, k, f, e, p) {
        let d = b;
        f = l(f, q(b));
        const E = b / f;
        k ||
          ((k = p
            ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
            : [1, 2, 2.5, 5, 10]),
          !1 === e &&
            (1 === f
              ? (k = k.filter(function (b) {
                  return 0 === b % 1;
                }))
              : 0.1 >= f && (k = [1 / f])));
        for (
          e = 0;
          e < k.length &&
          !((d = k[e]),
          (p && d * f >= b) || (!p && E <= (k[e] + (k[e + 1] || k[e])) / 2));
          e++
        );
        return (d = g(d * f, -Math.round(Math.log(0.001) / Math.LN10)));
      },
      objectEach: J,
      offset: function (b) {
        const d = u.documentElement;
        b =
          b.parentElement || b.parentNode
            ? b.getBoundingClientRect()
            : { top: 0, left: 0, width: 0, height: 0 };
        return {
          top: b.top + (p.pageYOffset || d.scrollTop) - (d.clientTop || 0),
          left: b.left + (p.pageXOffset || d.scrollLeft) - (d.clientLeft || 0),
          width: b.width,
          height: b.height,
        };
      },
      pad: function (b, f, e) {
        return (
          Array((f || 2) + 1 - String(b).replace("-", "").length).join(
            e || "0"
          ) + b
        );
      },
      pick: l,
      pInt: L,
      pushUnique: function (b, f) {
        return 0 > b.indexOf(f) && !!b.push(f);
      },
      relativeLength: function (b, f, e) {
        return /%$/.test(b)
          ? (f * parseFloat(b)) / 100 + (e || 0)
          : parseFloat(b);
      },
      removeEvent: F,
      splat: function (b) {
        return D(b) ? b : [b];
      },
      stableSort: function (b, f) {
        const d = b.length;
        let k, e;
        for (e = 0; e < d; e++) b[e].safeI = e;
        b.sort(function (b, d) {
          k = f(b, d);
          return 0 === k ? b.safeI - d.safeI : k;
        });
        for (e = 0; e < d; e++) delete b[e].safeI;
      },
      syncTimeout: function (b, f, e) {
        if (0 < f) return setTimeout(b, f, e);
        b.call(0, e);
        return -1;
      },
      timeUnits: {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5,
      },
      uniqueKey: f,
      useSerialIds: function (d) {
        return (b = l(d, b));
      },
      wrap: function (b, f, e) {
        const d = b[f];
        b[f] = function () {
          const b = arguments,
            f = this;
          return e.apply(
            this,
            [
              function () {
                return d.apply(f, arguments.length ? arguments : b);
              },
            ].concat([].slice.call(arguments))
          );
        };
      },
    };
    ("");
    return H;
  });
  M(a, "Core/Chart/ChartDefaults.js", [], function () {
    return {
      alignThresholds: !1,
      panning: { enabled: !1, type: "x" },
      styledMode: !1,
      borderRadius: 0,
      colorCount: 10,
      allowMutatingData: !0,
      ignoreHiddenSeries: !0,
      spacing: [10, 10, 15, 10],
      resetZoomButton: {
        theme: { zIndex: 6 },
        position: { align: "right", x: -10, y: 10 },
      },
      reflow: !0,
      type: "line",
      zoomBySingleTouch: !1,
      zooming: {
        singleTouch: !1,
        resetButton: {
          theme: { zIndex: 6 },
          position: { align: "right", x: -10, y: 10 },
        },
      },
      width: null,
      height: null,
      borderColor: "#334eff",
      backgroundColor: "#ffffff",
      plotBorderColor: "#cccccc",
    };
  });
  M(
    a,
    "Core/Color/Color.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, y) {
      const { isNumber: x, merge: L, pInt: A } = y;
      class D {
        static parse(a) {
          return a ? new D(a) : D.None;
        }
        constructor(x) {
          this.rgba = [NaN, NaN, NaN, NaN];
          this.input = x;
          const z = a.Color;
          if (z && z !== D) return new z(x);
          this.init(x);
        }
        init(a) {
          let z;
          let t;
          if ("object" === typeof a && "undefined" !== typeof a.stops)
            this.stops = a.stops.map((c) => new D(c[1]));
          else if ("string" === typeof a) {
            this.input = a = D.names[a.toLowerCase()] || a;
            if ("#" === a.charAt(0)) {
              var v = a.length;
              var c = parseInt(a.substr(1), 16);
              7 === v
                ? (z = [(c & 16711680) >> 16, (c & 65280) >> 8, c & 255, 1])
                : 4 === v &&
                  (z = [
                    ((c & 3840) >> 4) | ((c & 3840) >> 8),
                    ((c & 240) >> 4) | (c & 240),
                    ((c & 15) << 4) | (c & 15),
                    1,
                  ]);
            }
            if (!z)
              for (c = D.parsers.length; c-- && !z; )
                (t = D.parsers[c]), (v = t.regex.exec(a)) && (z = t.parse(v));
          }
          z && (this.rgba = z);
        }
        get(a) {
          const z = this.input,
            t = this.rgba;
          if ("object" === typeof z && "undefined" !== typeof this.stops) {
            const v = L(z);
            v.stops = [].slice.call(v.stops);
            this.stops.forEach((c, n) => {
              v.stops[n] = [v.stops[n][0], c.get(a)];
            });
            return v;
          }
          return t && x(t[0])
            ? "rgb" === a || (!a && 1 === t[3])
              ? "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"
              : "a" === a
              ? `${t[3]}`
              : "rgba(" + t.join(",") + ")"
            : z;
        }
        brighten(a) {
          const z = this.rgba;
          if (this.stops)
            this.stops.forEach(function (t) {
              t.brighten(a);
            });
          else if (x(a) && 0 !== a)
            for (let t = 0; 3 > t; t++)
              (z[t] += A(255 * a)),
                0 > z[t] && (z[t] = 0),
                255 < z[t] && (z[t] = 255);
          return this;
        }
        setOpacity(a) {
          this.rgba[3] = a;
          return this;
        }
        tweenTo(a, z) {
          const t = this.rgba,
            v = a.rgba;
          if (!x(t[0]) || !x(v[0])) return a.input || "none";
          a = 1 !== v[3] || 1 !== t[3];
          return (
            (a ? "rgba(" : "rgb(") +
            Math.round(v[0] + (t[0] - v[0]) * (1 - z)) +
            "," +
            Math.round(v[1] + (t[1] - v[1]) * (1 - z)) +
            "," +
            Math.round(v[2] + (t[2] - v[2]) * (1 - z)) +
            (a ? "," + (v[3] + (t[3] - v[3]) * (1 - z)) : "") +
            ")"
          );
        }
      }
      D.names = { white: "#ffffff", black: "#000000" };
      D.parsers = [
        {
          regex:
            /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
          parse: function (a) {
            return [A(a[1]), A(a[2]), A(a[3]), parseFloat(a[4], 10)];
          },
        },
        {
          regex:
            /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
          parse: function (a) {
            return [A(a[1]), A(a[2]), A(a[3]), 1];
          },
        },
      ];
      D.None = new D("");
      ("");
      return D;
    }
  );
  M(a, "Core/Color/Palettes.js", [], function () {
    return {
      colors:
        "#2caffe #544fc5 #00e272 #fe6a35 #6b8abc #d568fb #2ee0ca #fa4b42 #feb56a #91e8e1".split(
          " "
        ),
    };
  });
  M(
    a,
    "Core/Time.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, y) {
      const { win: x } = a,
        {
          defined: L,
          error: A,
          extend: D,
          isObject: C,
          merge: z,
          objectEach: t,
          pad: v,
          pick: c,
          splat: n,
          timeUnits: r,
        } = y,
        l = a.isSafari && x.Intl && x.Intl.DateTimeFormat.prototype.formatRange,
        h =
          a.isSafari && x.Intl && !x.Intl.DateTimeFormat.prototype.formatRange;
      class q {
        constructor(g) {
          this.options = {};
          this.variableTimezone = this.useUTC = !1;
          this.Date = x.Date;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.update(g);
        } 
        get(g, w) {
          if (this.variableTimezone || this.timezoneOffset) {
            const c = w.getTime(),
              l = c - this.getTimezoneOffset(w);
            w.setTime(l);
            g = w["getUTC" + g]();
            w.setTime(c);
            return g;
          }
          return this.useUTC ? w["getUTC" + g]() : w["get" + g]();
        }
        set(g, c, q) {
          if (this.variableTimezone || this.timezoneOffset) {
            if (
              "Milliseconds" === g ||
              "Seconds" === g ||
              ("Minutes" === g && 0 === this.getTimezoneOffset(c) % 36e5)
            )
              return c["setUTC" + g](q);
            var w = this.getTimezoneOffset(c);
            w = c.getTime() - w;
            c.setTime(w);
            c["setUTC" + g](q);
            g = this.getTimezoneOffset(c);
            w = c.getTime() + g;
            return c.setTime(w);
          }
          return this.useUTC || (l && "FullYear" === g)
            ? c["setUTC" + g](q)
            : c["set" + g](q);
        }
        update(g = {}) {
          const w = c(g.useUTC, !0);
          this.options = g = z(!0, this.options, g);
          this.Date = g.Date || x.Date || Date;
          this.timezoneOffset =
            ((this.useUTC = w) && g.timezoneOffset) || void 0;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.variableTimezone = w && !(!g.getTimezoneOffset && !g.timezone);
        }
        makeTime(g, w, l, q, e, m) {
          let u, p, H;
          this.useUTC
            ? ((u = this.Date.UTC.apply(0, arguments)),
              (p = this.getTimezoneOffset(u)),
              (u += p),
              (H = this.getTimezoneOffset(u)),
              p !== H
                ? (u += H - p)
                : p - 36e5 !== this.getTimezoneOffset(u - 36e5) ||
                  h ||
                  (u -= 36e5))
            : (u = new this.Date(
                g,
                w,
                c(l, 1),
                c(q, 0),
                c(e, 0),
                c(m, 0)
              ).getTime());
          return u;
        }
        timezoneOffsetFunction() {
          const g = this,
            c = this.options,
            l = c.getTimezoneOffset,
            q = c.moment || x.moment;
          if (!this.useUTC)
            return function (e) {
              return 6e4 * new Date(e.toString()).getTimezoneOffset();
            };
          if (c.timezone) {
            if (q)
              return function (e) {
                return 6e4 * -q.tz(e, c.timezone).utcOffset();
              };
            A(25);
          }
          return this.useUTC && l
            ? function (e) {
                return 6e4 * l(e.valueOf());
              }
            : function () {
                return 6e4 * (g.timezoneOffset || 0);
              };
        }
        dateFormat(g, w, l) {
          if (!L(w) || isNaN(w))
            return (
              (a.defaultOptions.lang && a.defaultOptions.lang.invalidDate) || ""
            );
          g = c(g, "%Y-%m-%d %H:%M:%S");
          const q = this;
          var e = new this.Date(w);
          const m = this.get("Hours", e),
            u = this.get("Day", e),
            p = this.get("Date", e),
            h = this.get("Month", e),
            b = this.get("FullYear", e),
            f = a.defaultOptions.lang,
            d = f && f.weekdays,
            k = f && f.shortWeekdays;
          e = D(
            {
              a: k ? k[u] : d[u].substr(0, 3),
              A: d[u],
              d: v(p),
              e: v(p, 2, " "),
              w: u,
              b: f.shortMonths[h],
              B: f.months[h],
              m: v(h + 1),
              o: h + 1,
              y: b.toString().substr(2, 2),
              Y: b,
              H: v(m),
              k: m,
              I: v(m % 12 || 12),
              l: m % 12 || 12,
              M: v(this.get("Minutes", e)),
              p: 12 > m ? "AM" : "PM",
              P: 12 > m ? "am" : "pm",
              S: v(e.getSeconds()),
              L: v(Math.floor(w % 1e3), 3),
            },
            a.dateFormats
          );
          t(e, function (b, d) {
            for (; -1 !== g.indexOf("%" + d); )
              g = g.replace(
                "%" + d,
                "function" === typeof b ? b.call(q, w) : b
              );
          });
          return l ? g.substr(0, 1).toUpperCase() + g.substr(1) : g;
        }
        resolveDTLFormat(g) {
          return C(g, !0)
            ? g
            : ((g = n(g)), { main: g[0], from: g[1], to: g[2] });
        }
        getTimeTicks(g, w, l, q) {
          const e = this,
            m = [],
            u = {};
          var p = new e.Date(w);
          const h = g.unitRange,
            b = g.count || 1;
          let f;
          q = c(q, 1);
          if (L(w)) {
            e.set(
              "Milliseconds",
              p,
              h >= r.second ? 0 : b * Math.floor(e.get("Milliseconds", p) / b)
            );
            h >= r.second &&
              e.set(
                "Seconds",
                p,
                h >= r.minute ? 0 : b * Math.floor(e.get("Seconds", p) / b)
              );
            h >= r.minute &&
              e.set(
                "Minutes",
                p,
                h >= r.hour ? 0 : b * Math.floor(e.get("Minutes", p) / b)
              );
            h >= r.hour &&
              e.set(
                "Hours",
                p,
                h >= r.day ? 0 : b * Math.floor(e.get("Hours", p) / b)
              );
            h >= r.day &&
              e.set(
                "Date",
                p,
                h >= r.month
                  ? 1
                  : Math.max(1, b * Math.floor(e.get("Date", p) / b))
              );
            if (h >= r.month) {
              e.set(
                "Month",
                p,
                h >= r.year ? 0 : b * Math.floor(e.get("Month", p) / b)
              );
              var d = e.get("FullYear", p);
            }
            h >= r.year && e.set("FullYear", p, d - (d % b));
            h === r.week &&
              ((d = e.get("Day", p)),
              e.set("Date", p, e.get("Date", p) - d + q + (d < q ? -7 : 0)));
            d = e.get("FullYear", p);
            q = e.get("Month", p);
            const k = e.get("Date", p),
              g = e.get("Hours", p);
            w = p.getTime();
            (!e.variableTimezone && e.useUTC) ||
              !L(l) ||
              (f =
                l - w > 4 * r.month ||
                e.getTimezoneOffset(w) !== e.getTimezoneOffset(l));
            w = p.getTime();
            for (p = 1; w < l; )
              m.push(w),
                (w =
                  h === r.year
                    ? e.makeTime(d + p * b, 0)
                    : h === r.month
                    ? e.makeTime(d, q + p * b)
                    : !f || (h !== r.day && h !== r.week)
                    ? f && h === r.hour && 1 < b
                      ? e.makeTime(d, q, k, g + p * b)
                      : w + h * b
                    : e.makeTime(d, q, k + p * b * (h === r.day ? 1 : 7))),
                p++;
            m.push(w);
            h <= r.hour &&
              1e4 > m.length &&
              m.forEach(function (b) {
                0 === b % 18e5 &&
                  "000000000" === e.dateFormat("%H%M%S%L", b) &&
                  (u[b] = "day");
              });
          }
          m.info = D(g, { higherRanks: u, totalRange: h * b });
          return m;
        }
        getDateFormat(g, c, q, l) {
          const e = this.dateFormat("%m-%d %H:%M:%S.%L", c),
            m = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 };
          let u,
            p = "millisecond";
          for (u in r) {
            if (
              g === r.week &&
              +this.dateFormat("%w", c) === q &&
              "00:00:00.000" === e.substr(6)
            ) {
              u = "week";
              break;
            }
            if (r[u] > g) {
              u = p;
              break;
            }
            if (m[u] && e.substr(m[u]) !== "01-01 00:00:00.000".substr(m[u]))
              break;
            "week" !== u && (p = u);
          }
          return this.resolveDTLFormat(l[u]).main;
        }
      }
      ("");
      return q;
    }
  );
  M(
    a,
    "Core/Defaults.js",
    [
      a["Core/Chart/ChartDefaults.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Color/Palettes.js"],
      a["Core/Time.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A, D) {
      const { isTouchDevice: x, svg: z } = G,
        { merge: t } = D,
        v = {
          colors: L.colors,
          symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
          lang: {
            loading: "Loading...",
            months:
              "January February March April May June July August September October November December".split(
                " "
              ),
            shortMonths:
              "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays:
              "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                " "
              ),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " ",
          },
          global: {},
          time: {
            Date: void 0,
            getTimezoneOffset: void 0,
            timezone: void 0,
            timezoneOffset: 0,
            useUTC: !0,
          },
          chart: a,
          title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            widthAdjust: -44,
          },
          subtitle: { text: "", align: "center", widthAdjust: -44 },
          caption: {
            margin: 15,
            text: "",
            align: "left",
            verticalAlign: "bottom",
          },
          plotOptions: {},
          legend: {
            enabled: !0,
            align: "center",
            alignColumns: !0,
            className: "highcharts-no-tooltip",
            layout: "horizontal",
            itemMarginBottom: 2,
            itemMarginTop: 2,
            labelFormatter: function () {
              return this.name;
            },
            borderColor: "#999999",
            borderRadius: 0,
            navigation: {
              style: { fontSize: "0.8em" },
              activeColor: "#0022ff",
              inactiveColor: "#cccccc",
            },
            itemStyle: {
              color: "#333333",
              cursor: "pointer",
              fontSize: "0.8em",
              textDecoration: "none",
              textOverflow: "ellipsis",
            },
            itemHoverStyle: { color: "#000000" },
            itemHiddenStyle: {
              color: "#666666",
              textDecoration: "line-through",
            },
            shadow: !1,
            itemCheckboxStyle: {
              position: "absolute",
              width: "13px",
              height: "13px",
            },
            squareSymbol: !0,
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: { style: { fontSize: "0.8em", fontWeight: "bold" } },
          },
          loading: {
            labelStyle: {
              fontWeight: "bold",
              position: "relative",
              top: "45%",
            },
            style: {
              position: "absolute",
              backgroundColor: "#ffffff",
              opacity: 0.5,
              textAlign: "center",
            },
          },
          tooltip: {
            enabled: !0,
            animation: z,
            borderRadius: 3,
            dateTimeLabelFormats: {
              millisecond: "%A, %e %b, %H:%M:%S.%L",
              second: "%A, %e %b, %H:%M:%S",
              minute: "%A, %e %b, %H:%M",
              hour: "%A, %e %b, %H:%M",
              day: "%A, %e %b %Y",
              week: "Week from %A, %e %b %Y",
              month: "%B %Y",
              year: "%Y",
            },
            footerFormat: "",
            headerShape: "callout",
            hideDelay: 500,
            padding: 8,
            shape: "callout",
            shared: !1,
            snap: x ? 25 : 10,
            headerFormat:
              '<span style="font-size: 0.8em">{point.key}</span><br/>',
            pointFormat:
              '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            backgroundColor: "#ffffff",
            borderWidth: void 0,
            shadow: !0,
            stickOnContact: !1,
            style: { color: "#333333", cursor: "default", fontSize: "0.8em" },
            useHTML: !1,
          },
          credits: {
            enabled: !0,
            // href: "https://www.highcharts.com?credits",
            href: "#",
            position: {
              align: "right",
              x: -10,
              verticalAlign: "bottom",
              y: -5,
            },
            style: { cursor: "pointer", color: "#999999", fontSize: "0.6em" },
            //text: "Highcharts.com",
            text: "Coordinación de lenguas extranjeras",
          },
        };
      v.chart.styledMode = !1;
      ("");
      const c = new A(v.time);
      a = {
        defaultOptions: v,
        defaultTime: c,
        getOptions: function () {
          return v;
        },
        setOptions: function (n) {
          t(!0, v, n);
          if (n.time || n.global)
            G.time
              ? G.time.update(t(v.global, v.time, n.global, n.time))
              : (G.time = c);
          return v;
        },
      };
      ("");
      return a;
    }
  );
  M(
    a,
    "Core/Animation/Fx.js",
    [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, y, G) {
      const { parse: x } = a,
        { win: A } = y,
        { isNumber: D, objectEach: C } = G;
      class z {
        constructor(a, v, c) {
          this.pos = NaN;
          this.options = v;
          this.elem = a;
          this.prop = c;
        }
        dSetter() {
          var a = this.paths;
          const v = a && a[0];
          a = a && a[1];
          const c = this.now || 0;
          let n = [];
          if (1 !== c && v && a)
            if (v.length === a.length && 1 > c)
              for (let r = 0; r < a.length; r++) {
                const l = v[r],
                  h = a[r],
                  q = [];
                for (let g = 0; g < h.length; g++) {
                  const w = l[g],
                    a = h[g];
                  D(w) && D(a) && ("A" !== h[0] || (4 !== g && 5 !== g))
                    ? (q[g] = w + c * (a - w))
                    : (q[g] = a);
                }
                n.push(q);
              }
            else n = a;
          else n = this.toD || [];
          this.elem.attr("d", n, void 0, !0);
        }
        update() {
          const a = this.elem,
            v = this.prop,
            c = this.now,
            n = this.options.step;
          if (this[v + "Setter"]) this[v + "Setter"]();
          else
            a.attr
              ? a.element && a.attr(v, c, null, !0)
              : (a.style[v] = c + this.unit);
          n && n.call(a, c, this);
        }
        run(a, v, c) {
          const n = this,
            r = n.options,
            l = function (g) {
              return l.stopped ? !1 : n.step(g);
            },
            h =
              A.requestAnimationFrame ||
              function (g) {
                setTimeout(g, 13);
              },
            q = function () {
              for (let g = 0; g < z.timers.length; g++)
                z.timers[g]() || z.timers.splice(g--, 1);
              z.timers.length && h(q);
            };
          a !== v || this.elem["forceAnimate:" + this.prop]
            ? ((this.startTime = +new Date()),
              (this.start = a),
              (this.end = v),
              (this.unit = c),
              (this.now = this.start),
              (this.pos = 0),
              (l.elem = this.elem),
              (l.prop = this.prop),
              l() && 1 === z.timers.push(l) && h(q))
            : (delete r.curAnim[this.prop],
              r.complete &&
                0 === Object.keys(r.curAnim).length &&
                r.complete.call(this.elem));
        }
        step(a) {
          const v = +new Date(),
            c = this.options,
            n = this.elem,
            r = c.complete,
            l = c.duration,
            h = c.curAnim;
          let q;
          n.attr && !n.element
            ? (a = !1)
            : a || v >= l + this.startTime
            ? ((this.now = this.end),
              (this.pos = 1),
              this.update(),
              (q = h[this.prop] = !0),
              C(h, function (g) {
                !0 !== g && (q = !1);
              }),
              q && r && r.call(n),
              (a = !1))
            : ((this.pos = c.easing((v - this.startTime) / l)),
              (this.now = this.start + (this.end - this.start) * this.pos),
              this.update(),
              (a = !0));
          return a;
        }
        initPath(a, v, c) {
          function n(e, m) {
            for (; e.length < J; ) {
              var g = e[0];
              const p = m[J - e.length];
              p &&
                "M" === g[0] &&
                (e[0] =
                  "C" === p[0]
                    ? ["C", g[1], g[2], g[1], g[2], g[1], g[2]]
                    : ["L", g[1], g[2]]);
              e.unshift(g);
              q && ((g = e.pop()), e.push(e[e.length - 1], g));
            }
          }
          function r(e, m) {
            for (; e.length < J; )
              if (
                ((m = e[Math.floor(e.length / g) - 1].slice()),
                "C" === m[0] && ((m[1] = m[5]), (m[2] = m[6])),
                q)
              ) {
                const c = e[Math.floor(e.length / g)].slice();
                e.splice(e.length / 2, 0, m, c);
              } else e.push(m);
          }
          const l = a.startX,
            h = a.endX;
          c = c.slice();
          const q = a.isArea,
            g = q ? 2 : 1;
          let w, J, F;
          v = v && v.slice();
          if (!v) return [c, c];
          if (l && h && h.length) {
            for (a = 0; a < l.length; a++)
              if (l[a] === h[0]) {
                w = a;
                break;
              } else if (l[0] === h[h.length - l.length + a]) {
                w = a;
                F = !0;
                break;
              } else if (l[l.length - 1] === h[h.length - l.length + a]) {
                w = l.length - a;
                break;
              }
            "undefined" === typeof w && (v = []);
          }
          v.length &&
            D(w) &&
            ((J = c.length + w * g),
            F ? (n(v, c), r(c, v)) : (n(c, v), r(v, c)));
          return [v, c];
        }
        fillSetter() {
          z.prototype.strokeSetter.apply(this, arguments);
        }
        strokeSetter() {
          this.elem.attr(
            this.prop,
            x(this.start).tweenTo(x(this.end), this.pos),
            void 0,
            !0
          );
        }
      }
      z.timers = [];
      return z;
    }
  );
  M(
    a,
    "Core/Animation/AnimationUtilities.js",
    [a["Core/Animation/Fx.js"], a["Core/Utilities.js"]],
    function (a, y) {
      function x(c) {
        return t(c)
          ? v({ duration: 500, defer: 0 }, c)
          : { duration: c ? 500 : 0, defer: 0 };
      }
      function L(c, l) {
        let h = a.timers.length;
        for (; h--; )
          a.timers[h].elem !== c ||
            (l && l !== a.timers[h].prop) ||
            (a.timers[h].stopped = !0);
      }
      const {
        defined: A,
        getStyle: D,
        isArray: C,
        isNumber: z,
        isObject: t,
        merge: v,
        objectEach: c,
        pick: n,
      } = y;
      return {
        animate: function (n, l, h) {
          let q,
            g = "",
            w,
            J,
            r;
          t(h) ||
            ((r = arguments),
            (h = { duration: r[2], easing: r[3], complete: r[4] }));
          z(h.duration) || (h.duration = 400);
          h.easing =
            "function" === typeof h.easing
              ? h.easing
              : Math[h.easing] || Math.easeInOutSine;
          h.curAnim = v(l);
          c(l, function (e, m) {
            L(n, m);
            J = new a(n, h, m);
            w = void 0;
            "d" === m && C(l.d)
              ? ((J.paths = J.initPath(n, n.pathArray, l.d)),
                (J.toD = l.d),
                (q = 0),
                (w = 1))
              : n.attr
              ? (q = n.attr(m))
              : ((q = parseFloat(D(n, m)) || 0), "opacity" !== m && (g = "px"));
            w || (w = e);
            "string" === typeof w &&
              w.match("px") &&
              (w = w.replace(/px/g, ""));
            J.run(q, w, g);
          });
        },
        animObject: x,
        getDeferredAnimation: function (c, l, a) {
          const q = x(l);
          let g = 0,
            w = 0;
          (a ? [a] : c.series).forEach((c) => {
            c = x(c.options.animation);
            g = l && A(l.defer) ? q.defer : Math.max(g, c.duration + c.defer);
            w = Math.min(q.duration, c.duration);
          });
          c.renderer.forExport && (g = 0);
          return { defer: Math.max(0, g - w), duration: Math.min(g, w) };
        },
        setAnimation: function (c, l) {
          l.renderer.globalAnimation = n(c, l.options.chart.animation, !0);
        },
        stop: L,
      };
    }
  );
  M(
    a,
    "Core/Renderer/HTML/AST.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, y) {
      const { SVG_NS: x, win: L } = a,
        {
          attr: A,
          createElement: D,
          css: C,
          error: z,
          isFunction: t,
          isString: v,
          objectEach: c,
          splat: n,
        } = y;
      ({ trustedTypes: y } = L);
      const r =
        y &&
        t(y.createPolicy) &&
        y.createPolicy("highcharts", { createHTML: (g) => g });
      y = r ? r.createHTML("") : "";
      try {
        var l = !!new DOMParser().parseFromString(y, "text/html");
      } catch (g) {
        l = !1;
      }
      const h = l;
      class q {
        static filterUserAttributes(g) {
          c(g, (c, l) => {
            let a = !0;
            -1 === q.allowedAttributes.indexOf(l) && (a = !1);
            -1 !==
              ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(l) &&
              (a = v(c) && q.allowedReferences.some((e) => 0 === c.indexOf(e)));
            a ||
              (z(33, !1, void 0, { "Invalid attribute in config": `${l}` }),
              delete g[l]);
            v(c) && g[l] && (g[l] = c.replace(/</g, "&lt;"));
          });
          return g;
        }
        static parseStyle(g) {
          return g.split(";").reduce((g, c) => {
            c = c.split(":").map((e) => e.trim());
            const l = c.shift();
            l &&
              c.length &&
              (g[l.replace(/-([a-z])/g, (e) => e[1].toUpperCase())] =
                c.join(":"));
            return g;
          }, {});
        }
        static setElementHTML(g, c) {
          g.innerHTML = q.emptyHTML;
          c && new q(c).addToDOM(g);
        }
        constructor(g) {
          this.nodes = "string" === typeof g ? this.parseMarkup(g) : g;
        }
        addToDOM(g) {
          function l(g, h) {
            let e;
            n(g).forEach(function (m) {
              var g = m.tagName;
              const p = m.textContent
                  ? a.doc.createTextNode(m.textContent)
                  : void 0,
                w = q.bypassHTMLFiltering;
              let b;
              if (g)
                if ("#text" === g) b = p;
                else if (-1 !== q.allowedTags.indexOf(g) || w) {
                  g = a.doc.createElementNS(
                    "svg" === g ? x : h.namespaceURI || x,
                    g
                  );
                  const f = m.attributes || {};
                  c(m, function (b, k) {
                    "tagName" !== k &&
                      "attributes" !== k &&
                      "children" !== k &&
                      "style" !== k &&
                      "textContent" !== k &&
                      (f[k] = b);
                  });
                  A(g, w ? f : q.filterUserAttributes(f));
                  m.style && C(g, m.style);
                  p && g.appendChild(p);
                  l(m.children || [], g);
                  b = g;
                } else z(33, !1, void 0, { "Invalid tagName in config": g });
              b && h.appendChild(b);
              e = b;
            });
            return e;
          }
          return l(this.nodes, g);
        }
        parseMarkup(g) {
          const c = [];
          g = g.trim().replace(/ style=(["'])/g, " data-style=$1");
          if (h)
            g = new DOMParser().parseFromString(
              r ? r.createHTML(g) : g,
              "text/html"
            );
          else {
            const c = D("div");
            c.innerHTML = g;
            g = { body: c };
          }
          const l = (g, e) => {
            var m = g.nodeName.toLowerCase();
            const c = { tagName: m };
            "#text" === m && (c.textContent = g.textContent || "");
            if ((m = g.attributes)) {
              const e = {};
              [].forEach.call(m, (p) => {
                "data-style" === p.name
                  ? (c.style = q.parseStyle(p.value))
                  : (e[p.name] = p.value);
              });
              c.attributes = e;
            }
            if (g.childNodes.length) {
              const e = [];
              [].forEach.call(g.childNodes, (p) => {
                l(p, e);
              });
              e.length && (c.children = e);
            }
            e.push(c);
          };
          [].forEach.call(g.body.childNodes, (g) => l(g, c));
          return c;
        }
      }
      q.allowedAttributes =
        "alt aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill flood-color flood-opacity height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 xlink:href y y1 y2 zIndex".split(
          " "
        );
      q.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
      q.allowedTags =
        "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feDropShadow feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead title tbody tspan td th tr u ul #text".split(
          " "
        );
      q.emptyHTML = y;
      q.bypassHTMLFiltering = !1;
      ("");
      return q;
    }
  );
  M(
    a,
    "Core/FormatUtilities.js",
    [a["Core/Defaults.js"], a["Core/Utilities.js"]],
    function (a, y) {
      function x(a, c, n, r) {
        a = +a || 0;
        c = +c;
        const l = L.lang;
        var h = (a.toString().split(".")[1] || "").split("e")[0].length;
        const q = a.toString().split("e"),
          g = c;
        if (-1 === c) c = Math.min(h, 20);
        else if (!C(c)) c = 2;
        else if (c && q[1] && 0 > q[1]) {
          var w = c + +q[1];
          0 <= w
            ? ((q[0] = (+q[0]).toExponential(w).split("e")[0]), (c = w))
            : ((q[0] = q[0].split(".")[0] || 0),
              (a = 20 > c ? (q[0] * Math.pow(10, q[1])).toFixed(c) : 0),
              (q[1] = 0));
        }
        w = (
          Math.abs(q[1] ? q[0] : a) + Math.pow(10, -Math.max(c, h) - 1)
        ).toFixed(c);
        h = String(t(w));
        const J = 3 < h.length ? h.length % 3 : 0;
        n = z(n, l.decimalPoint);
        r = z(r, l.thousandsSep);
        a = (0 > a ? "-" : "") + (J ? h.substr(0, J) + r : "");
        a =
          0 > +q[1] && !g
            ? "0"
            : a + h.substr(J).replace(/(\d{3})(?=\d)/g, "$1" + r);
        c && (a += n + w.slice(-c));
        q[1] && 0 !== +a && (a += "e" + q[1]);
        return a;
      }
      const { defaultOptions: L, defaultTime: A } = a,
        { getNestedProperty: D, isNumber: C, pick: z, pInt: t } = y;
      return {
        dateFormat: function (a, c, n) {
          return A.dateFormat(a, c, n);
        },
        format: function (a, c, n) {
          var r = "{";
          let l = !1;
          let h;
          const q = /f$/,
            g = /\.([0-9])/,
            w = L.lang,
            J = (n && n.time) || A;
          n = (n && n.numberFormatter) || x;
          const F = [];
          for (; a; ) {
            h = a.indexOf(r);
            if (-1 === h) break;
            var e = a.slice(0, h);
            if (l) {
              e = e.split(":");
              r = D(e.shift() || "", c);
              if (e.length && "number" === typeof r)
                if (((e = e.join(":")), q.test(e))) {
                  const m = parseInt((e.match(g) || ["", "-1"])[1], 10);
                  null !== r &&
                    (r = n(
                      r,
                      m,
                      w.decimalPoint,
                      -1 < e.indexOf(",") ? w.thousandsSep : ""
                    ));
                } else r = J.dateFormat(e, r);
              F.push(r);
            } else F.push(e);
            a = a.slice(h + 1);
            r = (l = !l) ? "}" : "{";
          }
          F.push(a);
          return F.join("");
        },
        numberFormat: x,
      };
    }
  );
  M(
    a,
    "Core/Renderer/RendererUtilities.js",
    [a["Core/Utilities.js"]],
    function (a) {
      const { clamp: x, pick: G, stableSort: L } = a;
      var A;
      (function (a) {
        function y(a, t, v) {
          const c = a;
          var n = c.reducedLen || t,
            r = (g, c) => (c.rank || 0) - (g.rank || 0);
          const l = (g, c) => g.target - c.target;
          let h,
            q = !0,
            g = [],
            w = 0;
          for (h = a.length; h--; ) w += a[h].size;
          if (w > n) {
            L(a, r);
            for (w = h = 0; w <= n; ) (w += a[h].size), h++;
            g = a.splice(h - 1, a.length);
          }
          L(a, l);
          for (
            a = a.map((g) => ({
              size: g.size,
              targets: [g.target],
              align: G(g.align, 0.5),
            }));
            q;

          ) {
            for (h = a.length; h--; )
              (n = a[h]),
                (r =
                  (Math.min.apply(0, n.targets) +
                    Math.max.apply(0, n.targets)) /
                  2),
                (n.pos = x(r - n.size * n.align, 0, t - n.size));
            h = a.length;
            for (q = !1; h--; )
              0 < h &&
                a[h - 1].pos + a[h - 1].size > a[h].pos &&
                ((a[h - 1].size += a[h].size),
                (a[h - 1].targets = a[h - 1].targets.concat(a[h].targets)),
                (a[h - 1].align = 0.5),
                a[h - 1].pos + a[h - 1].size > t &&
                  (a[h - 1].pos = t - a[h - 1].size),
                a.splice(h, 1),
                (q = !0));
          }
          c.push.apply(c, g);
          h = 0;
          a.some((g) => {
            let a = 0;
            return (g.targets || []).some(() => {
              c[h].pos = g.pos + a;
              if (
                "undefined" !== typeof v &&
                Math.abs(c[h].pos - c[h].target) > v
              )
                return (
                  c.slice(0, h + 1).forEach((e) => delete e.pos),
                  (c.reducedLen = (c.reducedLen || t) - 0.1 * t),
                  c.reducedLen > 0.1 * t && y(c, t, v),
                  !0
                );
              a += c[h].size;
              h++;
              return !1;
            });
          });
          L(c, l);
          return c;
        }
        a.distribute = y;
      })(A || (A = {}));
      return A;
    }
  );
  M(
    a,
    "Core/Renderer/SVG/SVGElement.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L) {
      const { animate: x, animObject: D, stop: C } = a,
        { deg2rad: z, doc: t, svg: v, SVG_NS: c, win: n } = G,
        {
          addEvent: r,
          attr: l,
          createElement: h,
          css: q,
          defined: g,
          erase: w,
          extend: J,
          fireEvent: F,
          isArray: e,
          isFunction: m,
          isObject: u,
          isString: p,
          merge: H,
          objectEach: b,
          pick: f,
          pInt: d,
          syncTimeout: k,
          uniqueKey: O,
        } = L;
      class N {
        constructor() {
          this.element = void 0;
          this.onEvents = {};
          this.opacity = 1;
          this.renderer = void 0;
          this.SVG_NS = c;
        }
        _defaultGetter(b) {
          b = f(
            this[b + "Value"],
            this[b],
            this.element ? this.element.getAttribute(b) : null,
            0
          );
          /^[\-0-9\.]+$/.test(b) && (b = parseFloat(b));
          return b;
        }
        _defaultSetter(b, d, f) {
          f.setAttribute(d, b);
        }
        add(b) {
          const d = this.renderer,
            f = this.element;
          let k;
          b && (this.parentGroup = b);
          "undefined" !== typeof this.textStr &&
            "text" === this.element.nodeName &&
            d.buildText(this);
          this.added = !0;
          if (!b || b.handleZ || this.zIndex) k = this.zIndexSetter();
          k || (b ? b.element : d.box).appendChild(f);
          if (this.onAdd) this.onAdd();
          return this;
        }
        addClass(b, d) {
          const f = d ? "" : this.attr("class") || "";
          b = (b || "")
            .split(/ /g)
            .reduce(
              function (b, d) {
                -1 === f.indexOf(d) && b.push(d);
                return b;
              },
              f ? [f] : []
            )
            .join(" ");
          b !== f && this.attr("class", b);
          return this;
        }
        afterSetters() {
          this.doTransform && (this.updateTransform(), (this.doTransform = !1));
        }
        align(b, d, k) {
          const e = {};
          var K = this.renderer,
            m = K.alignedObjects,
            g;
          let E, c;
          if (b) {
            if (
              ((this.alignOptions = b), (this.alignByTranslate = d), !k || p(k))
            )
              (this.alignTo = g = k || "renderer"),
                w(m, this),
                m.push(this),
                (k = void 0);
          } else
            (b = this.alignOptions),
              (d = this.alignByTranslate),
              (g = this.alignTo);
          k = f(k, K[g], "scrollablePlotBox" === g ? K.plotBox : void 0, K);
          g = b.align;
          const B = b.verticalAlign;
          K = (k.x || 0) + (b.x || 0);
          m = (k.y || 0) + (b.y || 0);
          "right" === g ? (E = 1) : "center" === g && (E = 2);
          E && (K += (k.width - (b.width || 0)) / E);
          e[d ? "translateX" : "x"] = Math.round(K);
          "bottom" === B ? (c = 1) : "middle" === B && (c = 2);
          c && (m += (k.height - (b.height || 0)) / c);
          e[d ? "translateY" : "y"] = Math.round(m);
          this[this.placed ? "animate" : "attr"](e);
          this.placed = !0;
          this.alignAttr = e;
          return this;
        }
        alignSetter(b) {
          const d = { left: "start", center: "middle", right: "end" };
          d[b] &&
            ((this.alignValue = b),
            this.element.setAttribute("text-anchor", d[b]));
        }
        animate(d, e, p) {
          const m = D(f(e, this.renderer.globalAnimation, !0));
          e = m.defer;
          t.hidden && (m.duration = 0);
          0 !== m.duration
            ? (p && (m.complete = p),
              k(() => {
                this.element && x(this, d, m);
              }, e))
            : (this.attr(d, void 0, p || m.complete),
              b(
                d,
                function (b, d) {
                  m.step &&
                    m.step.call(this, b, { prop: d, pos: 1, elem: this });
                },
                this
              ));
          return this;
        }
        applyTextOutline(b) {
          const d = this.element;
          -1 !== b.indexOf("contrast") &&
            (b = b.replace(
              /contrast/g,
              this.renderer.getContrast(d.style.fill)
            ));
          var f = b.split(" ");
          b = f[f.length - 1];
          if ((f = f[0]) && "none" !== f && G.svg) {
            this.fakeTS = !0;
            f = f.replace(/(^[\d\.]+)(.*?)$/g, function (b, d, f) {
              return 2 * Number(d) + f;
            });
            this.removeTextOutline();
            const k = t.createElementNS(c, "tspan");
            l(k, {
              class: "highcharts-text-outline",
              fill: b,
              stroke: b,
              "stroke-width": f,
              "stroke-linejoin": "round",
            });
            b = d.querySelector("textPath") || d;
            [].forEach.call(b.childNodes, (b) => {
              const d = b.cloneNode(!0);
              d.removeAttribute &&
                ["fill", "stroke", "stroke-width", "stroke"].forEach((b) =>
                  d.removeAttribute(b)
                );
              k.appendChild(d);
            });
            let e = 0;
            [].forEach.call(b.querySelectorAll("text tspan"), (b) => {
              e += Number(b.getAttribute("dy"));
            });
            f = t.createElementNS(c, "tspan");
            f.textContent = "\u200b";
            l(f, { x: Number(d.getAttribute("x")), dy: -e });
            k.appendChild(f);
            b.insertBefore(k, b.firstChild);
          }
        }
        attr(d, f, k, e) {
          const K = this.element,
            p = N.symbolCustomAttribs;
          let m,
            g,
            c = this,
            B,
            E;
          "string" === typeof d &&
            "undefined" !== typeof f &&
            ((m = d), (d = {}), (d[m] = f));
          "string" === typeof d
            ? (c = (this[d + "Getter"] || this._defaultGetter).call(this, d, K))
            : (b(
                d,
                function (b, f) {
                  B = !1;
                  e || C(this, f);
                  this.symbolName &&
                    -1 !== p.indexOf(f) &&
                    (g || (this.symbolAttr(d), (g = !0)), (B = !0));
                  !this.rotation ||
                    ("x" !== f && "y" !== f) ||
                    (this.doTransform = !0);
                  B ||
                    ((E = this[f + "Setter"] || this._defaultSetter),
                    E.call(this, b, f, K));
                },
                this
              ),
              this.afterSetters());
          k && k.call(this);
          return c;
        }
        clip(b) {
          return this.attr(
            "clip-path",
            b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none"
          );
        }
        crisp(b, d) {
          d = d || b.strokeWidth || 0;
          const f = (Math.round(d) % 2) / 2;
          b.x = Math.floor(b.x || this.x || 0) + f;
          b.y = Math.floor(b.y || this.y || 0) + f;
          b.width = Math.floor((b.width || this.width || 0) - 2 * f);
          b.height = Math.floor((b.height || this.height || 0) - 2 * f);
          g(b.strokeWidth) && (b.strokeWidth = d);
          return b;
        }
        complexColor(d, f, k) {
          const p = this.renderer;
          let K,
            m,
            c,
            a,
            E,
            B,
            l,
            I,
            q,
            u,
            h = [],
            w;
          F(this.renderer, "complexColor", { args: arguments }, function () {
            d.radialGradient
              ? (m = "radialGradient")
              : d.linearGradient && (m = "linearGradient");
            if (m) {
              c = d[m];
              E = p.gradients;
              B = d.stops;
              q = k.radialReference;
              e(c) &&
                (d[m] = c =
                  {
                    x1: c[0],
                    y1: c[1],
                    x2: c[2],
                    y2: c[3],
                    gradientUnits: "userSpaceOnUse",
                  });
              "radialGradient" === m &&
                q &&
                !g(c.gradientUnits) &&
                ((a = c),
                (c = H(c, p.getRadialAttr(q, a), {
                  gradientUnits: "userSpaceOnUse",
                })));
              b(c, function (b, d) {
                "id" !== d && h.push(d, b);
              });
              b(B, function (b) {
                h.push(b);
              });
              h = h.join(",");
              if (E[h]) u = E[h].attr("id");
              else {
                c.id = u = O();
                const b = (E[h] = p.createElement(m).attr(c).add(p.defs));
                b.radAttr = a;
                b.stops = [];
                B.forEach(function (d) {
                  0 === d[1].indexOf("rgba")
                    ? ((K = y.parse(d[1])),
                      (l = K.get("rgb")),
                      (I = K.get("a")))
                    : ((l = d[1]), (I = 1));
                  d = p
                    .createElement("stop")
                    .attr({ offset: d[0], "stop-color": l, "stop-opacity": I })
                    .add(b);
                  b.stops.push(d);
                });
              }
              w = "url(" + p.url + "#" + u + ")";
              k.setAttribute(f, w);
              k.gradient = h;
              d.toString = function () {
                return w;
              };
            }
          });
        }
        css(f) {
          const k = this.styles,
            e = {},
            p = this.element;
          let K,
            m = !k;
          f.color && (f.fill = f.color);
          k &&
            b(f, function (b, d) {
              k && k[d] !== b && ((e[d] = b), (m = !0));
            });
          if (m) {
            k && (f = J(k, e));
            null === f.width || "auto" === f.width
              ? delete this.textWidth
              : "text" === p.nodeName.toLowerCase() &&
                f.width &&
                (K = this.textWidth = d(f.width));
            this.styles = f;
            K && !v && this.renderer.forExport && delete f.width;
            const b = H(f);
            p.namespaceURI === this.SVG_NS &&
              ["textOutline", "textOverflow", "width"].forEach(
                (d) => b && delete b[d]
              );
            q(p, b);
          }
          this.added &&
            ("text" === this.element.nodeName && this.renderer.buildText(this),
            f.textOutline && this.applyTextOutline(f.textOutline));
          return this;
        }
        dashstyleSetter(b) {
          let k = this["stroke-width"];
          "inherit" === k && (k = 1);
          if ((b = b && b.toLowerCase())) {
            const e = b
              .replace("shortdashdotdot", "3,1,1,1,1,1,")
              .replace("shortdashdot", "3,1,1,1")
              .replace("shortdot", "1,1,")
              .replace("shortdash", "3,1,")
              .replace("longdash", "8,3,")
              .replace(/dot/g, "1,3,")
              .replace("dash", "4,3,")
              .replace(/,$/, "")
              .split(",");
            for (b = e.length; b--; ) e[b] = "" + d(e[b]) * f(k, NaN);
            b = e.join(",").replace(/NaN/g, "none");
            this.element.setAttribute("stroke-dasharray", b);
          }
        }
        destroy() {
          const d = this;
          var f = d.element || {};
          const k = d.renderer;
          var e = f.ownerSVGElement;
          let p = ("SPAN" === f.nodeName && d.parentGroup) || void 0;
          f.onclick =
            f.onmouseout =
            f.onmouseover =
            f.onmousemove =
            f.point =
              null;
          C(d);
          if (d.clipPath && e) {
            const b = d.clipPath;
            [].forEach.call(
              e.querySelectorAll("[clip-path],[CLIP-PATH]"),
              function (d) {
                -1 < d.getAttribute("clip-path").indexOf(b.element.id) &&
                  d.removeAttribute("clip-path");
              }
            );
            d.clipPath = b.destroy();
          }
          if (d.stops) {
            for (e = 0; e < d.stops.length; e++) d.stops[e].destroy();
            d.stops.length = 0;
            d.stops = void 0;
          }
          for (
            d.safeRemoveChild(f);
            p && p.div && 0 === p.div.childNodes.length;

          )
            (f = p.parentGroup),
              d.safeRemoveChild(p.div),
              delete p.div,
              (p = f);
          d.alignTo && w(k.alignedObjects, d);
          b(d, function (b, f) {
            d[f] && d[f].parentGroup === d && d[f].destroy && d[f].destroy();
            delete d[f];
          });
        }
        dSetter(b, d, f) {
          e(b) &&
            ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)),
            (this.pathArray = b),
            (b = b.reduce(
              (b, d, f) =>
                d && d.join
                  ? (f ? b + " " : "") + d.join(" ")
                  : (d || "").toString(),
              ""
            )));
          /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
          this[d] !== b && (f.setAttribute(d, b), (this[d] = b));
        }
        fadeOut(b) {
          const d = this;
          d.animate(
            { opacity: 0 },
            {
              duration: f(b, 150),
              complete: function () {
                d.hide();
              },
            }
          );
        }
        fillSetter(b, d, f) {
          "string" === typeof b
            ? f.setAttribute(d, b)
            : b && this.complexColor(b, d, f);
        }
        getBBox(b, d) {
          const {
              alignValue: k,
              element: e,
              renderer: p,
              styles: c,
              textStr: a,
            } = this,
            { cache: l, cacheKeys: u } = p;
          var B = e.namespaceURI === this.SVG_NS;
          d = f(d, this.rotation, 0);
          var P = p.styledMode
            ? e && N.prototype.getStyle.call(e, "font-size")
            : c && c.fontSize;
          let I;
          let h;
          g(a) &&
            ((h = a.toString()),
            -1 === h.indexOf("<") && (h = h.replace(/[0-9]/g, "0")),
            (h += [
              "",
              p.rootFontSize,
              P,
              d,
              this.textWidth,
              k,
              c && c.textOverflow,
              c && c.fontWeight,
            ].join()));
          h && !b && (I = l[h]);
          if (!I) {
            if (B || p.forExport) {
              try {
                var E =
                  this.fakeTS &&
                  function (b) {
                    const d = e.querySelector(".highcharts-text-outline");
                    d && q(d, { display: b });
                  };
                m(E) && E("none");
                I = e.getBBox
                  ? J({}, e.getBBox())
                  : {
                      width: e.offsetWidth,
                      height: e.offsetHeight,
                      x: 0,
                      y: 0,
                    };
                m(E) && E("");
              } catch (ha) {
                ("");
              }
              if (!I || 0 > I.width) I = { x: 0, y: 0, width: 0, height: 0 };
            } else I = this.htmlGetBBox();
            E = I.width;
            b = I.height;
            B &&
              (I.height = b =
                { "11px,17": 14, "13px,20": 16 }[
                  `${P || ""},${Math.round(b)}`
                ] || b);
            if (d) {
              B = Number(e.getAttribute("y") || 0) - I.y;
              P = { right: 1, center: 0.5 }[k || 0] || 0;
              var w = d * z,
                n = (d - 90) * z,
                r = E * Math.cos(w);
              d = E * Math.sin(w);
              var H = Math.cos(n);
              w = Math.sin(n);
              E = I.x + P * (E - r) + B * H;
              n = E + r;
              H = n - b * H;
              r = H - r;
              B = I.y + B - P * d + B * w;
              P = B + d;
              b = P - b * w;
              d = b - d;
              I.x = Math.min(E, n, H, r);
              I.y = Math.min(B, P, b, d);
              I.width = Math.max(E, n, H, r) - I.x;
              I.height = Math.max(B, P, b, d) - I.y;
            }
          }
          if (h && ("" === a || 0 < I.height)) {
            for (; 250 < u.length; ) delete l[u.shift()];
            l[h] || u.push(h);
            l[h] = I;
          }
          return I;
        }
        getStyle(b) {
          return n
            .getComputedStyle(this.element || this, "")
            .getPropertyValue(b);
        }
        hasClass(b) {
          return -1 !== ("" + this.attr("class")).split(" ").indexOf(b);
        }
        hide() {
          return this.attr({ visibility: "hidden" });
        }
        htmlGetBBox() {
          return { height: 0, width: 0, x: 0, y: 0 };
        }
        init(b, d) {
          this.element =
            "span" === d ? h(d) : t.createElementNS(this.SVG_NS, d);
          this.renderer = b;
          F(this, "afterInit");
        }
        on(b, d) {
          const { onEvents: f } = this;
          if (f[b]) f[b]();
          f[b] = r(this.element, b, d);
          return this;
        }
        opacitySetter(b, d, f) {
          this.opacity = b = Number(Number(b).toFixed(3));
          f.setAttribute(d, b);
        }
        removeClass(b) {
          return this.attr(
            "class",
            ("" + this.attr("class"))
              .replace(p(b) ? new RegExp(`(^| )${b}( |$)`) : b, " ")
              .replace(/ +/g, " ")
              .trim()
          );
        }
        removeTextOutline() {
          const b = this.element.querySelector("tspan.highcharts-text-outline");
          b && this.safeRemoveChild(b);
        }
        safeRemoveChild(b) {
          const d = b.parentNode;
          d && d.removeChild(b);
        }
        setRadialReference(b) {
          const d =
            this.element.gradient &&
            this.renderer.gradients[this.element.gradient];
          this.element.radialReference = b;
          d &&
            d.radAttr &&
            d.animate(this.renderer.getRadialAttr(b, d.radAttr));
          return this;
        }
        setTextPath(b, d) {
          d = H(
            !0,
            {
              enabled: !0,
              attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" },
            },
            d
          );
          const f = this.renderer.url,
            k = this.text || this,
            e = k.textPath,
            { attributes: p, enabled: m } = d;
          b = b || (e && e.path);
          e && e.undo();
          b && m
            ? ((d = r(k, "afterModifyTree", (d) => {
                if (b && m) {
                  let B = b.attr("id");
                  B || b.attr("id", (B = O()));
                  var e = { x: 0, y: 0 };
                  g(p.dx) && ((e.dx = p.dx), delete p.dx);
                  g(p.dy) && ((e.dy = p.dy), delete p.dy);
                  k.attr(e);
                  this.attr({ transform: "" });
                  this.box && (this.box = this.box.destroy());
                  e = d.nodes.slice(0);
                  d.nodes.length = 0;
                  d.nodes[0] = {
                    tagName: "textPath",
                    attributes: J(p, {
                      "text-anchor": p.textAnchor,
                      href: `${f}#${B}`,
                    }),
                    children: e,
                  };
                }
              })),
              (k.textPath = { path: b, undo: d }))
            : (k.attr({ dx: 0, dy: 0 }), delete k.textPath);
          this.added && ((k.textCache = ""), this.renderer.buildText(k));
          return this;
        }
        shadow(b) {
          var d;
          const { renderer: f } = this,
            k = H(
              90 ===
                (null === (d = this.parentGroup) || void 0 === d
                  ? void 0
                  : d.rotation)
                ? { offsetX: -1, offsetY: -1 }
                : {},
              u(b) ? b : {}
            );
          d = f.shadowDefinition(k);
          return this.attr({ filter: b ? `url(${f.url}#${d})` : "none" });
        }
        show(b = !0) {
          return this.attr({ visibility: b ? "inherit" : "visible" });
        }
        ["stroke-widthSetter"](b, d, f) {
          this[d] = b;
          f.setAttribute(d, b);
        }
        strokeWidth() {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          const b = this.getStyle("stroke-width");
          let f = 0,
            k;
          b.indexOf("px") === b.length - 2
            ? (f = d(b))
            : "" !== b &&
              ((k = t.createElementNS(c, "rect")),
              l(k, { width: b, "stroke-width": 0 }),
              this.element.parentNode.appendChild(k),
              (f = k.getBBox().width),
              k.parentNode.removeChild(k));
          return f;
        }
        symbolAttr(b) {
          const d = this;
          N.symbolCustomAttribs.forEach(function (k) {
            d[k] = f(b[k], d[k]);
          });
          d.attr({
            d: d.renderer.symbols[d.symbolName](d.x, d.y, d.width, d.height, d),
          });
        }
        textSetter(b) {
          b !== this.textStr &&
            (delete this.textPxLength,
            (this.textStr = b),
            this.added && this.renderer.buildText(this));
        }
        titleSetter(b) {
          const d = this.element,
            k =
              d.getElementsByTagName("title")[0] ||
              t.createElementNS(this.SVG_NS, "title");
          d.insertBefore ? d.insertBefore(k, d.firstChild) : d.appendChild(k);
          k.textContent = String(f(b, ""))
            .replace(/<[^>]*>/g, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        }
        toFront() {
          const b = this.element;
          b.parentNode.appendChild(b);
          return this;
        }
        translate(b, d) {
          return this.attr({ translateX: b, translateY: d });
        }
        updateTransform() {
          const {
              element: b,
              matrix: d,
              rotation: k = 0,
              scaleX: e,
              scaleY: p,
              translateX: m = 0,
              translateY: c = 0,
            } = this,
            a = ["translate(" + m + "," + c + ")"];
          g(d) && a.push("matrix(" + d.join(",") + ")");
          k &&
            a.push(
              "rotate(" +
                k +
                " " +
                f(this.rotationOriginX, b.getAttribute("x"), 0) +
                " " +
                f(this.rotationOriginY, b.getAttribute("y") || 0) +
                ")"
            );
          (g(e) || g(p)) && a.push("scale(" + f(e, 1) + " " + f(p, 1) + ")");
          a.length &&
            !(this.text || this).textPath &&
            b.setAttribute("transform", a.join(" "));
        }
        visibilitySetter(b, d, f) {
          "inherit" === b
            ? f.removeAttribute(d)
            : this[d] !== b && f.setAttribute(d, b);
          this[d] = b;
        }
        xGetter(b) {
          "circle" === this.element.nodeName &&
            ("x" === b ? (b = "cx") : "y" === b && (b = "cy"));
          return this._defaultGetter(b);
        }
        zIndexSetter(b, f) {
          var k = this.renderer,
            e = this.parentGroup;
          const p = (e || k).element || k.box,
            m = this.element;
          k = p === k.box;
          let c = !1,
            a;
          var l = this.added;
          let B;
          g(b)
            ? (m.setAttribute("data-z-index", b),
              (b = +b),
              this[f] === b && (l = !1))
            : g(this[f]) && m.removeAttribute("data-z-index");
          this[f] = b;
          if (l) {
            (b = this.zIndex) && e && (e.handleZ = !0);
            f = p.childNodes;
            for (B = f.length - 1; 0 <= B && !c; B--)
              if (
                ((e = f[B]),
                (l = e.getAttribute("data-z-index")),
                (a = !g(l)),
                e !== m)
              )
                if (0 > b && a && !k && !B) p.insertBefore(m, f[B]), (c = !0);
                else if (d(l) <= b || (a && (!g(b) || 0 <= b)))
                  p.insertBefore(m, f[B + 1]), (c = !0);
            c || (p.insertBefore(m, f[k ? 3 : 0]), (c = !0));
          }
          return c;
        }
      }
      N.symbolCustomAttribs =
        "anchorX anchorY clockwise end height innerR r start width x y".split(
          " "
        );
      N.prototype.strokeSetter = N.prototype.fillSetter;
      N.prototype.yGetter = N.prototype.xGetter;
      N.prototype.matrixSetter =
        N.prototype.rotationOriginXSetter =
        N.prototype.rotationOriginYSetter =
        N.prototype.rotationSetter =
        N.prototype.scaleXSetter =
        N.prototype.scaleYSetter =
        N.prototype.translateXSetter =
        N.prototype.translateYSetter =
        N.prototype.verticalAlignSetter =
          function (b, d) {
            this[d] = b;
            this.doTransform = !0;
          };
      ("");
      return N;
    }
  );
  M(
    a,
    "Core/Renderer/RendererRegistry.js",
    [a["Core/Globals.js"]],
    function (a) {
      var x;
      (function (x) {
        x.rendererTypes = {};
        let y;
        x.getRendererType = function (a = y) {
          return x.rendererTypes[a] || x.rendererTypes[y];
        };
        x.registerRendererType = function (A, D, C) {
          x.rendererTypes[A] = D;
          if (!y || C) (y = A), (a.Renderer = D);
        };
      })(x || (x = {}));
      return x;
    }
  );
  M(
    a,
    "Core/Renderer/SVG/SVGLabel.js",
    [a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]],
    function (a, y) {
      const {
        defined: x,
        extend: L,
        isNumber: A,
        merge: D,
        pick: C,
        removeEvent: z,
      } = y;
      class t extends a {
        constructor(a, c, n, r, l, h, q, g, w, J) {
          super();
          this.paddingRightSetter = this.paddingLeftSetter = this.paddingSetter;
          this.init(a, "g");
          this.textStr = c;
          this.x = n;
          this.y = r;
          this.anchorX = h;
          this.anchorY = q;
          this.baseline = w;
          this.className = J;
          this.addClass(
            "button" === J ? "highcharts-no-tooltip" : "highcharts-label"
          );
          J && this.addClass("highcharts-" + J);
          this.text = a.text(void 0, 0, 0, g).attr({ zIndex: 1 });
          let F;
          "string" === typeof l &&
            ((F = /^url\((.*?)\)$/.test(l)) || this.renderer.symbols[l]) &&
            (this.symbolKey = l);
          this.bBox = t.emptyBBox;
          this.padding = 3;
          this.baselineOffset = 0;
          this.needsBox = a.styledMode || F;
          this.deferredAttr = {};
          this.alignFactor = 0;
        }
        alignSetter(a) {
          a = { left: 0, center: 0.5, right: 1 }[a];
          a !== this.alignFactor &&
            ((this.alignFactor = a),
            this.bBox && A(this.xSetting) && this.attr({ x: this.xSetting }));
        }
        anchorXSetter(a, c) {
          this.anchorX = a;
          this.boxAttr(
            c,
            Math.round(a) - this.getCrispAdjust() - this.xSetting
          );
        }
        anchorYSetter(a, c) {
          this.anchorY = a;
          this.boxAttr(c, a - this.ySetting);
        }
        boxAttr(a, c) {
          this.box ? this.box.attr(a, c) : (this.deferredAttr[a] = c);
        }
        css(v) {
          if (v) {
            const c = {};
            v = D(v);
            t.textProps.forEach((a) => {
              "undefined" !== typeof v[a] && ((c[a] = v[a]), delete v[a]);
            });
            this.text.css(c);
            "fontSize" in c || "fontWeight" in c
              ? this.updateTextPadding()
              : ("width" in c || "textOverflow" in c) && this.updateBoxSize();
          }
          return a.prototype.css.call(this, v);
        }
        destroy() {
          z(this.element, "mouseenter");
          z(this.element, "mouseleave");
          this.text && this.text.destroy();
          this.box && (this.box = this.box.destroy());
          a.prototype.destroy.call(this);
        }
        fillSetter(a, c) {
          a && (this.needsBox = !0);
          this.fill = a;
          this.boxAttr(c, a);
        }
        getBBox() {
          this.textStr &&
            0 === this.bBox.width &&
            0 === this.bBox.height &&
            this.updateBoxSize();
          const a = this.padding,
            c = C(this.paddingLeft, a);
          return {
            width: this.width,
            height: this.height,
            x: this.bBox.x - c,
            y: this.bBox.y - a,
          };
        }
        getCrispAdjust() {
          return this.renderer.styledMode && this.box
            ? (this.box.strokeWidth() % 2) / 2
            : ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) %
                2) /
                2;
        }
        heightSetter(a) {
          this.heightSetting = a;
        }
        onAdd() {
          this.text.add(this);
          this.attr({
            text: C(this.textStr, ""),
            x: this.x || 0,
            y: this.y || 0,
          });
          this.box &&
            x(this.anchorX) &&
            this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        }
        paddingSetter(a, c) {
          A(a)
            ? a !== this[c] && ((this[c] = a), this.updateTextPadding())
            : (this[c] = void 0);
        }
        rSetter(a, c) {
          this.boxAttr(c, a);
        }
        strokeSetter(a, c) {
          this.stroke = a;
          this.boxAttr(c, a);
        }
        ["stroke-widthSetter"](a, c) {
          a && (this.needsBox = !0);
          this["stroke-width"] = a;
          this.boxAttr(c, a);
        }
        ["text-alignSetter"](a) {
          this.textAlign = a;
        }
        textSetter(a) {
          "undefined" !== typeof a && this.text.attr({ text: a });
          this.updateTextPadding();
        }
        updateBoxSize() {
          var a = this.text;
          const c = {},
            n = this.padding,
            r = (this.bBox =
              (A(this.widthSetting) &&
                A(this.heightSetting) &&
                !this.textAlign) ||
              !x(a.textStr)
                ? t.emptyBBox
                : a.getBBox());
          this.width = this.getPaddedWidth();
          this.height = (this.heightSetting || r.height || 0) + 2 * n;
          const l = this.renderer.fontMetrics(a);
          this.baselineOffset =
            n +
            Math.min((this.text.firstLineMetrics || l).b, r.height || Infinity);
          this.heightSetting &&
            (this.baselineOffset += (this.heightSetting - l.h) / 2);
          this.needsBox &&
            !a.textPath &&
            (this.box ||
              ((a = this.box =
                this.symbolKey
                  ? this.renderer.symbol(this.symbolKey)
                  : this.renderer.rect()),
              a.addClass(
                ("button" === this.className ? "" : "highcharts-label-box") +
                  (this.className
                    ? " highcharts-" + this.className + "-box"
                    : "")
              ),
              a.add(this)),
            (a = this.getCrispAdjust()),
            (c.x = a),
            (c.y = (this.baseline ? -this.baselineOffset : 0) + a),
            (c.width = Math.round(this.width)),
            (c.height = Math.round(this.height)),
            this.box.attr(L(c, this.deferredAttr)),
            (this.deferredAttr = {}));
        }
        updateTextPadding() {
          const a = this.text;
          if (!a.textPath) {
            this.updateBoxSize();
            const c = this.baseline ? 0 : this.baselineOffset;
            let n = C(this.paddingLeft, this.padding);
            x(this.widthSetting) &&
              this.bBox &&
              ("center" === this.textAlign || "right" === this.textAlign) &&
              (n +=
                { center: 0.5, right: 1 }[this.textAlign] *
                (this.widthSetting - this.bBox.width));
            if (n !== a.x || c !== a.y)
              a.attr("x", n),
                a.hasBoxWidthChanged && (this.bBox = a.getBBox(!0)),
                "undefined" !== typeof c && a.attr("y", c);
            a.x = n;
            a.y = c;
          }
        }
        widthSetter(a) {
          this.widthSetting = A(a) ? a : void 0;
        }
        getPaddedWidth() {
          var a = this.padding;
          const c = C(this.paddingLeft, a);
          a = C(this.paddingRight, a);
          return (this.widthSetting || this.bBox.width || 0) + c + a;
        }
        xSetter(a) {
          this.x = a;
          this.alignFactor &&
            ((a -= this.alignFactor * this.getPaddedWidth()),
            (this["forceAnimate:x"] = !0));
          this.xSetting = Math.round(a);
          this.attr("translateX", this.xSetting);
        }
        ySetter(a) {
          this.ySetting = this.y = Math.round(a);
          this.attr("translateY", this.ySetting);
        }
      }
      t.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
      t.textProps =
        "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow whiteSpace width".split(
          " "
        );
      return t;
    }
  );
  M(a, "Core/Renderer/SVG/Symbols.js", [a["Core/Utilities.js"]], function (a) {
    function x(a, t, v, c, n) {
      const r = [];
      if (n) {
        const l = n.start || 0,
          h = C(n.r, v);
        v = C(n.r, c || v);
        c = (n.end || 0) - 0.001;
        const q = n.innerR,
          g = C(n.open, 0.001 > Math.abs((n.end || 0) - l - 2 * Math.PI)),
          w = Math.cos(l),
          J = Math.sin(l),
          F = Math.cos(c),
          e = Math.sin(c),
          m = C(n.longArc, 0.001 > c - l - Math.PI ? 0 : 1);
        let u = ["A", h, v, 0, m, C(n.clockwise, 1), a + h * F, t + v * e];
        u.params = { start: l, end: c, cx: a, cy: t };
        r.push(["M", a + h * w, t + v * J], u);
        A(q) &&
          ((u = [
            "A",
            q,
            q,
            0,
            m,
            A(n.clockwise) ? 1 - n.clockwise : 0,
            a + q * w,
            t + q * J,
          ]),
          (u.params = { start: c, end: l, cx: a, cy: t }),
          r.push(
            g ? ["M", a + q * F, t + q * e] : ["L", a + q * F, t + q * e],
            u
          ));
        g || r.push(["Z"]);
      }
      return r;
    }
    function G(a, t, v, c, n) {
      return n && n.r
        ? L(a, t, v, c, n)
        : [
            ["M", a, t],
            ["L", a + v, t],
            ["L", a + v, t + c],
            ["L", a, t + c],
            ["Z"],
          ];
    }
    function L(a, t, v, c, n) {
      n = (null === n || void 0 === n ? void 0 : n.r) || 0;
      return [
        ["M", a + n, t],
        ["L", a + v - n, t],
        ["A", n, n, 0, 0, 1, a + v, t + n],
        ["L", a + v, t + c - n],
        ["A", n, n, 0, 0, 1, a + v - n, t + c],
        ["L", a + n, t + c],
        ["A", n, n, 0, 0, 1, a, t + c - n],
        ["L", a, t + n],
        ["A", n, n, 0, 0, 1, a + n, t],
        ["Z"],
      ];
    }
    const { defined: A, isNumber: D, pick: C } = a;
    return {
      arc: x,
      callout: function (a, t, v, c, n) {
        const r = Math.min((n && n.r) || 0, v, c),
          l = r + 6,
          h = n && n.anchorX;
        n = (n && n.anchorY) || 0;
        const q = L(a, t, v, c, { r });
        if (!D(h)) return q;
        a + h >= v
          ? n > t + l && n < t + c - l
            ? q.splice(
                3,
                1,
                ["L", a + v, n - 6],
                ["L", a + v + 6, n],
                ["L", a + v, n + 6],
                ["L", a + v, t + c - r]
              )
            : q.splice(
                3,
                1,
                ["L", a + v, c / 2],
                ["L", h, n],
                ["L", a + v, c / 2],
                ["L", a + v, t + c - r]
              )
          : 0 >= a + h
          ? n > t + l && n < t + c - l
            ? q.splice(
                7,
                1,
                ["L", a, n + 6],
                ["L", a - 6, n],
                ["L", a, n - 6],
                ["L", a, t + r]
              )
            : q.splice(
                7,
                1,
                ["L", a, c / 2],
                ["L", h, n],
                ["L", a, c / 2],
                ["L", a, t + r]
              )
          : n && n > c && h > a + l && h < a + v - l
          ? q.splice(
              5,
              1,
              ["L", h + 6, t + c],
              ["L", h, t + c + 6],
              ["L", h - 6, t + c],
              ["L", a + r, t + c]
            )
          : n &&
            0 > n &&
            h > a + l &&
            h < a + v - l &&
            q.splice(
              1,
              1,
              ["L", h - 6, t],
              ["L", h, t - 6],
              ["L", h + 6, t],
              ["L", v - r, t]
            );
        return q;
      },
      circle: function (a, t, v, c) {
        return x(a + v / 2, t + c / 2, v / 2, c / 2, {
          start: 0.5 * Math.PI,
          end: 2.5 * Math.PI,
          open: !1,
        });
      },
      diamond: function (a, t, v, c) {
        return [
          ["M", a + v / 2, t],
          ["L", a + v, t + c / 2],
          ["L", a + v / 2, t + c],
          ["L", a, t + c / 2],
          ["Z"],
        ];
      },
      rect: G,
      roundedRect: L,
      square: G,
      triangle: function (a, t, v, c) {
        return [
          ["M", a + v / 2, t],
          ["L", a + v, t + c],
          ["L", a, t + c],
          ["Z"],
        ];
      },
      "triangle-down": function (a, t, v, c) {
        return [["M", a, t], ["L", a + v, t], ["L", a + v / 2, t + c], ["Z"]];
      },
    };
  });
  M(
    a,
    "Core/Renderer/SVG/TextBuilder.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { doc: x, SVG_NS: A, win: D } = y,
        {
          attr: C,
          extend: z,
          fireEvent: t,
          isString: v,
          objectEach: c,
          pick: n,
        } = G;
      class r {
        constructor(a) {
          const c = a.styles;
          this.renderer = a.renderer;
          this.svgElement = a;
          this.width = a.textWidth;
          this.textLineHeight = c && c.lineHeight;
          this.textOutline = c && c.textOutline;
          this.ellipsis = !(!c || "ellipsis" !== c.textOverflow);
          this.noWrap = !(!c || "nowrap" !== c.whiteSpace);
        }
        buildSVG() {
          const c = this.svgElement,
            h = c.element;
          var q = c.renderer,
            g = n(c.textStr, "").toString();
          const w = -1 !== g.indexOf("<"),
            r = h.childNodes;
          q = !c.added && q.box;
          const F = /<br.*?>/g;
          var e = [
            g,
            this.ellipsis,
            this.noWrap,
            this.textLineHeight,
            this.textOutline,
            c.getStyle("font-size"),
            this.width,
          ].join();
          if (e !== c.textCache) {
            c.textCache = e;
            delete c.actualWidth;
            for (e = r.length; e--; ) h.removeChild(r[e]);
            w ||
            this.ellipsis ||
            this.width ||
            c.textPath ||
            (-1 !== g.indexOf(" ") && (!this.noWrap || F.test(g)))
              ? "" !== g &&
                (q && q.appendChild(h),
                (g = new a(g)),
                this.modifyTree(g.nodes),
                g.addToDOM(h),
                this.modifyDOM(),
                this.ellipsis &&
                  -1 !== (h.textContent || "").indexOf("\u2026") &&
                  c.attr(
                    "title",
                    this.unescapeEntities(c.textStr || "", ["&lt;", "&gt;"])
                  ),
                q && q.removeChild(h))
              : h.appendChild(x.createTextNode(this.unescapeEntities(g)));
            v(this.textOutline) &&
              c.applyTextOutline &&
              c.applyTextOutline(this.textOutline);
          }
        }
        modifyDOM() {
          const a = this.svgElement,
            c = C(a.element, "x");
          a.firstLineMetrics = void 0;
          let q;
          for (; (q = a.element.firstChild); )
            if (/^[\s\u200B]*$/.test(q.textContent || " "))
              a.element.removeChild(q);
            else break;
          [].forEach.call(
            a.element.querySelectorAll("tspan.highcharts-br"),
            (g, e) => {
              g.nextSibling &&
                g.previousSibling &&
                (0 === e &&
                  1 === g.previousSibling.nodeType &&
                  (a.firstLineMetrics = a.renderer.fontMetrics(
                    g.previousSibling
                  )),
                C(g, { dy: this.getLineHeight(g.nextSibling), x: c }));
            }
          );
          const g = this.width || 0;
          if (g) {
            var w = (q, e) => {
                var m = q.textContent || "";
                const u = m.replace(/([^\^])-/g, "$1- ").split(" ");
                var p =
                  !this.noWrap &&
                  (1 < u.length || 1 < a.element.childNodes.length);
                const l = this.getLineHeight(e);
                let b = 0,
                  f = a.actualWidth;
                if (this.ellipsis)
                  m &&
                    this.truncate(
                      q,
                      m,
                      void 0,
                      0,
                      Math.max(0, g - 0.8 * l),
                      (b, f) => b.substring(0, f) + "\u2026"
                    );
                else if (p) {
                  m = [];
                  for (p = []; e.firstChild && e.firstChild !== q; )
                    p.push(e.firstChild), e.removeChild(e.firstChild);
                  for (; u.length; )
                    u.length &&
                      !this.noWrap &&
                      0 < b &&
                      (m.push(q.textContent || ""),
                      (q.textContent = u.join(" ").replace(/- /g, "-"))),
                      this.truncate(
                        q,
                        void 0,
                        u,
                        0 === b ? f || 0 : 0,
                        g,
                        (b, f) => u.slice(0, f).join(" ").replace(/- /g, "-")
                      ),
                      (f = a.actualWidth),
                      b++;
                  p.forEach((b) => {
                    e.insertBefore(b, q);
                  });
                  m.forEach((b) => {
                    e.insertBefore(x.createTextNode(b), q);
                    b = x.createElementNS(A, "tspan");
                    b.textContent = "\u200b";
                    C(b, { dy: l, x: c });
                    e.insertBefore(b, q);
                  });
                }
              },
              n = (c) => {
                [].slice.call(c.childNodes).forEach((e) => {
                  e.nodeType === D.Node.TEXT_NODE
                    ? w(e, c)
                    : (-1 !== e.className.baseVal.indexOf("highcharts-br") &&
                        (a.actualWidth = 0),
                      n(e));
                });
              };
            n(a.element);
          }
        }
        getLineHeight(a) {
          a = a.nodeType === D.Node.TEXT_NODE ? a.parentElement : a;
          return this.textLineHeight
            ? parseInt(this.textLineHeight.toString(), 10)
            : this.renderer.fontMetrics(a || this.svgElement.element).h;
        }
        modifyTree(a) {
          const c = (q, g) => {
            const {
                attributes: h = {},
                children: l,
                style: n = {},
                tagName: e,
              } = q,
              m = this.renderer.styledMode;
            if ("b" === e || "strong" === e)
              m ? (h["class"] = "highcharts-strong") : (n.fontWeight = "bold");
            else if ("i" === e || "em" === e)
              m
                ? (h["class"] = "highcharts-emphasized")
                : (n.fontStyle = "italic");
            n && n.color && (n.fill = n.color);
            "br" === e
              ? ((h["class"] = "highcharts-br"),
                (q.textContent = "\u200b"),
                (g = a[g + 1]) &&
                  g.textContent &&
                  (g.textContent = g.textContent.replace(/^ +/gm, "")))
              : "a" === e &&
                l &&
                l.some((e) => "#text" === e.tagName) &&
                (q.children = [{ children: l, tagName: "tspan" }]);
            "#text" !== e && "a" !== e && (q.tagName = "tspan");
            z(q, { attributes: h, style: n });
            l && l.filter((e) => "#text" !== e.tagName).forEach(c);
          };
          a.forEach(c);
          t(this.svgElement, "afterModifyTree", { nodes: a });
        }
        truncate(a, c, q, g, w, n) {
          const l = this.svgElement,
            { rotation: e } = l,
            m = [];
          let u = q ? 1 : 0,
            p = (c || q || "").length,
            h = p,
            b,
            f;
          const d = function (b, d) {
            b = d || b;
            if (
              (d = a.parentNode) &&
              "undefined" === typeof m[b] &&
              d.getSubStringLength
            )
              try {
                m[b] = g + d.getSubStringLength(0, q ? b + 1 : b);
              } catch (N) {
                ("");
              }
            return m[b];
          };
          l.rotation = 0;
          f = d(a.textContent.length);
          if (g + f > w) {
            for (; u <= p; )
              (h = Math.ceil((u + p) / 2)),
                q && (b = n(q, h)),
                (f = d(h, b && b.length - 1)),
                u === p ? (u = p + 1) : f > w ? (p = h - 1) : (u = h);
            0 === p
              ? (a.textContent = "")
              : (c && p === c.length - 1) ||
                (a.textContent = b || n(c || q, h));
          }
          q && q.splice(0, h);
          l.actualWidth = f;
          l.rotation = e;
        }
        unescapeEntities(a, h) {
          c(this.renderer.escapes, function (c, g) {
            (h && -1 !== h.indexOf(c)) ||
              (a = a.toString().replace(new RegExp(c, "g"), g));
          });
          return a;
        }
      }
      return r;
    }
  );
  M(
    a,
    "Core/Renderer/SVG/SVGRenderer.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGLabel.js"],
      a["Core/Renderer/SVG/Symbols.js"],
      a["Core/Renderer/SVG/TextBuilder.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A, D, C, z, t) {
      const {
          charts: v,
          deg2rad: c,
          doc: n,
          isFirefox: r,
          isMS: l,
          isWebKit: h,
          noop: q,
          SVG_NS: g,
          symbolSizes: w,
          win: J,
        } = G,
        {
          addEvent: F,
          attr: e,
          createElement: m,
          css: u,
          defined: p,
          destroyObjectProperties: H,
          extend: b,
          isArray: f,
          isNumber: d,
          isObject: k,
          isString: O,
          merge: N,
          pick: E,
          pInt: x,
          uniqueKey: T,
        } = t;
      let U;
      class K {
        constructor(b, d, f, k, e, a, p) {
          this.width =
            this.url =
            this.style =
            this.imgCount =
            this.height =
            this.gradients =
            this.globalAnimation =
            this.defs =
            this.chartIndex =
            this.cacheKeys =
            this.cache =
            this.boxWrapper =
            this.box =
            this.alignedObjects =
              void 0;
          this.init(b, d, f, k, e, a, p);
        }
        init(b, d, f, k, a, p, m) {
          const B = this.createElement("svg").attr({
              version: "1.1",
              class: "highcharts-root",
            }),
            c = B.element;
          m || B.css(this.getStyle(k));
          b.appendChild(c);
          e(b, "dir", "ltr");
          -1 === b.innerHTML.indexOf("xmlns") && e(c, "xmlns", this.SVG_NS);
          this.box = c;
          this.boxWrapper = B;
          this.alignedObjects = [];
          this.url = this.getReferenceURL();
          this.createElement("desc")
            .add()
            .element.appendChild(
              n.createTextNode("Created with Highcharts 11.0.1")
            );
          this.defs = this.createElement("defs").add();
          this.allowHTML = p;
          this.forExport = a;
          this.styledMode = m;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.rootFontSize = B.getStyle("font-size");
          this.setSize(d, f, !1);
          let K;
          r &&
            b.getBoundingClientRect &&
            ((d = function () {
              u(b, { left: 0, top: 0 });
              K = b.getBoundingClientRect();
              u(b, {
                left: Math.ceil(K.left) - K.left + "px",
                top: Math.ceil(K.top) - K.top + "px",
              });
            }),
            d(),
            (this.unSubPixelFix = F(J, "resize", d)));
        }
        definition(b) {
          return new a([b]).addToDOM(this.defs.element);
        }
        getReferenceURL() {
          if ((r || h) && n.getElementsByTagName("base").length) {
            if (!p(U)) {
              var b = T();
              b = new a([
                {
                  tagName: "svg",
                  attributes: { width: 8, height: 8 },
                  children: [
                    {
                      tagName: "defs",
                      children: [
                        {
                          tagName: "clipPath",
                          attributes: { id: b },
                          children: [
                            {
                              tagName: "rect",
                              attributes: { width: 4, height: 4 },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: "rect",
                      attributes: {
                        id: "hitme",
                        width: 8,
                        height: 8,
                        "clip-path": `url(#${b})`,
                        fill: "rgba(0,0,0,0.001)",
                      },
                    },
                  ],
                },
              ]).addToDOM(n.body);
              u(b, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
              const d = n.elementFromPoint(6, 6);
              U = "hitme" === (d && d.id);
              n.body.removeChild(b);
            }
            if (U)
              return J.location.href
                .split("#")[0]
                .replace(/<[^>]*>/g, "")
                .replace(/([\('\)])/g, "\\$1")
                .replace(/ /g, "%20");
          }
          return "";
        }
        getStyle(d) {
          return (this.style = b(
            { fontFamily: "Helvetica, Arial, sans-serif", fontSize: "1rem" },
            d
          ));
        }
        setStyle(b) {
          this.boxWrapper.css(this.getStyle(b));
        }
        isHidden() {
          return !this.boxWrapper.getBBox().width;
        }
        destroy() {
          const b = this.defs;
          this.box = null;
          this.boxWrapper = this.boxWrapper.destroy();
          H(this.gradients || {});
          this.gradients = null;
          this.defs = b.destroy();
          this.unSubPixelFix && this.unSubPixelFix();
          return (this.alignedObjects = null);
        }
        createElement(b) {
          const d = new this.Element();
          d.init(this, b);
          return d;
        }
        getRadialAttr(b, d) {
          return {
            cx: b[0] - b[2] / 2 + (d.cx || 0) * b[2],
            cy: b[1] - b[2] / 2 + (d.cy || 0) * b[2],
            r: (d.r || 0) * b[2],
          };
        }
        shadowDefinition(b) {
          const d = [
              `highcharts-drop-shadow-${this.chartIndex}`,
              ...Object.keys(b).map((d) => b[d]),
            ]
              .join("-")
              .replace(/[^a-z0-9\-]/g, ""),
            f = N(
              {
                color: "#000000",
                offsetX: 1,
                offsetY: 1,
                opacity: 0.15,
                width: 5,
              },
              b
            );
          this.defs.element.querySelector(`#${d}`) ||
            this.definition({
              tagName: "filter",
              attributes: { id: d },
              children: [
                {
                  tagName: "feDropShadow",
                  attributes: {
                    dx: f.offsetX,
                    dy: f.offsetY,
                    "flood-color": f.color,
                    "flood-opacity": Math.min(5 * f.opacity, 1),
                    stdDeviation: f.width / 2,
                  },
                },
              ],
            });
          return d;
        }
        buildText(b) {
          new z(b).buildSVG();
        }
        getContrast(b) {
          b = y.parse(b).rgba.map((b) => {
            b /= 255;
            return 0.03928 >= b
              ? b / 12.92
              : Math.pow((b + 0.055) / 1.055, 2.4);
          });
          b = 0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2];
          return 1.05 / (b + 0.05) > (b + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
        }
        button(d, f, e, p, B = {}, m, c, K, g, q) {
          const I = this.label(d, f, e, g, void 0, void 0, q, void 0, "button"),
            u = this.styledMode;
          d = B.states || {};
          let h = 0;
          B = N(B);
          delete B.states;
          const P = N(
            {
              color: "#333333",
              cursor: "pointer",
              fontSize: "0.8em",
              fontWeight: "normal",
            },
            B.style
          );
          delete B.style;
          let w = a.filterUserAttributes(B);
          I.attr(N({ padding: 8, r: 2 }, w));
          let Q, n, r;
          u ||
            ((w = N(
              { fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1 },
              w
            )),
            (m = N(
              w,
              { fill: "#e6e6e6" },
              a.filterUserAttributes(m || d.hover || {})
            )),
            (Q = m.style),
            delete m.style,
            (c = N(
              w,
              {
                fill: "#e6e9ff",
                style: { color: "#000000", fontWeight: "bold" },
              },
              a.filterUserAttributes(c || d.select || {})
            )),
            (n = c.style),
            delete c.style,
            (K = N(
              w,
              { style: { color: "#cccccc" } },
              a.filterUserAttributes(K || d.disabled || {})
            )),
            (r = K.style),
            delete K.style);
          F(I.element, l ? "mouseover" : "mouseenter", function () {
            3 !== h && I.setState(1);
          });
          F(I.element, l ? "mouseout" : "mouseleave", function () {
            3 !== h && I.setState(h);
          });
          I.setState = function (b) {
            1 !== b && (I.state = h = b);
            I.removeClass(
              /highcharts-button-(normal|hover|pressed|disabled)/
            ).addClass(
              "highcharts-button-" +
                ["normal", "hover", "pressed", "disabled"][b || 0]
            );
            u ||
              (I.attr([w, m, c, K][b || 0]),
              (b = [P, Q, n, r][b || 0]),
              k(b) && I.css(b));
          };
          u ||
            (I.attr(w).css(b({ cursor: "default" }, P)),
            q && I.text.css({ pointerEvents: "none" }));
          return I.on("touchstart", (b) => b.stopPropagation()).on(
            "click",
            function (b) {
              3 !== h && p.call(I, b);
            }
          );
        }
        crispLine(b, d, f = "round") {
          const k = b[0],
            e = b[1];
          p(k[1]) &&
            k[1] === e[1] &&
            (k[1] = e[1] = Math[f](k[1]) - (d % 2) / 2);
          p(k[2]) &&
            k[2] === e[2] &&
            (k[2] = e[2] = Math[f](k[2]) + (d % 2) / 2);
          return b;
        }
        path(d) {
          const e = this.styledMode ? {} : { fill: "none" };
          f(d) ? (e.d = d) : k(d) && b(e, d);
          return this.createElement("path").attr(e);
        }
        circle(b, d, f) {
          b = k(b) ? b : "undefined" === typeof b ? {} : { x: b, y: d, r: f };
          d = this.createElement("circle");
          d.xSetter = d.ySetter = function (b, d, f) {
            f.setAttribute("c" + d, b);
          };
          return d.attr(b);
        }
        arc(b, d, f, e, a, p) {
          k(b)
            ? ((e = b), (d = e.y), (f = e.r), (b = e.x))
            : (e = { innerR: e, start: a, end: p });
          b = this.symbol("arc", b, d, f, f, e);
          b.r = f;
          return b;
        }
        rect(d, f, a, p, B, m) {
          d = k(d)
            ? d
            : "undefined" === typeof d
            ? {}
            : {
                x: d,
                y: f,
                r: B,
                width: Math.max(a || 0, 0),
                height: Math.max(p || 0, 0),
              };
          const c = this.createElement("rect");
          this.styledMode ||
            ("undefined" !== typeof m &&
              ((d["stroke-width"] = m), b(d, c.crisp(d))),
            (d.fill = "none"));
          c.rSetter = function (b, d, f) {
            c.r = b;
            e(f, { rx: b, ry: b });
          };
          c.rGetter = function () {
            return c.r || 0;
          };
          return c.attr(d);
        }
        roundedRect(b) {
          return this.symbol("roundedRect").attr(b);
        }
        setSize(b, d, f) {
          this.width = b;
          this.height = d;
          this.boxWrapper.animate(
            { width: b, height: d },
            {
              step: function () {
                this.attr({
                  viewBox:
                    "0 0 " + this.attr("width") + " " + this.attr("height"),
                });
              },
              duration: E(f, !0) ? void 0 : 0,
            }
          );
          this.alignElements();
        }
        g(b) {
          const d = this.createElement("g");
          return b ? d.attr({ class: "highcharts-" + b }) : d;
        }
        image(b, f, k, e, a, p) {
          const m = { preserveAspectRatio: "none" },
            B = function (b, d) {
              b.setAttributeNS
                ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", d)
                : b.setAttribute("hc-svg-href", d);
            };
          d(f) && (m.x = f);
          d(k) && (m.y = k);
          d(e) && (m.width = e);
          d(a) && (m.height = a);
          const c = this.createElement("image").attr(m);
          f = function (d) {
            B(c.element, b);
            p.call(c, d);
          };
          p
            ? (B(
                c.element,
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              ),
              (k = new J.Image()),
              F(k, "load", f),
              (k.src = b),
              k.complete && f({}))
            : B(c.element, b);
          return c;
        }
        symbol(d, f, k, a, B, c) {
          const K = this,
            g = /^url\((.*?)\)$/,
            q = g.test(d),
            h = !q && (this.symbols[d] ? d : "circle"),
            l = h && this.symbols[h];
          let P, Q, r, H;
          if (l)
            "number" === typeof f &&
              (Q = l.call(
                this.symbols,
                Math.round(f || 0),
                Math.round(k || 0),
                a || 0,
                B || 0,
                c
              )),
              (P = this.path(Q)),
              K.styledMode || P.attr("fill", "none"),
              b(P, {
                symbolName: h || void 0,
                x: f,
                y: k,
                width: a,
                height: B,
              }),
              c && b(P, c);
          else if (q) {
            r = d.match(g)[1];
            const b = (P = this.image(r));
            b.imgwidth = E(c && c.width, w[r] && w[r].width);
            b.imgheight = E(c && c.height, w[r] && w[r].height);
            H = (b) => b.attr({ width: b.width, height: b.height });
            ["width", "height"].forEach(function (d) {
              b[d + "Setter"] = function (b, d) {
                this[d] = b;
                const {
                  alignByTranslate: f,
                  element: k,
                  width: a,
                  height: m,
                  imgwidth: B,
                  imgheight: K,
                } = this;
                b = this["img" + d];
                if (p(b)) {
                  let p = 1;
                  c && "within" === c.backgroundSize && a && m
                    ? ((p = Math.min(a / B, m / K)),
                      e(k, {
                        width: Math.round(B * p),
                        height: Math.round(K * p),
                      }))
                    : k && k.setAttribute(d, b);
                  f ||
                    this.translate(
                      ((a || 0) - B * p) / 2,
                      ((m || 0) - K * p) / 2
                    );
                }
              };
            });
            p(f) && b.attr({ x: f, y: k });
            b.isImg = !0;
            p(b.imgwidth) && p(b.imgheight)
              ? H(b)
              : (b.attr({ width: 0, height: 0 }),
                m("img", {
                  onload: function () {
                    const d = v[K.chartIndex];
                    0 === this.width &&
                      (u(this, { position: "absolute", top: "-999em" }),
                      n.body.appendChild(this));
                    w[r] = { width: this.width, height: this.height };
                    b.imgwidth = this.width;
                    b.imgheight = this.height;
                    b.element && H(b);
                    this.parentNode && this.parentNode.removeChild(this);
                    K.imgCount--;
                    if (!K.imgCount && d && !d.hasLoaded) d.onload();
                  },
                  src: r,
                }),
                this.imgCount++);
          }
          return P;
        }
        clipRect(b, d, f, k) {
          const e = T() + "-",
            a = this.createElement("clipPath").attr({ id: e }).add(this.defs);
          b = this.rect(b, d, f, k, 0).add(a);
          b.id = e;
          b.clipPath = a;
          b.count = 0;
          return b;
        }
        text(b, d, f, k) {
          const e = {};
          if (k && (this.allowHTML || !this.forExport))
            return this.html(b, d, f);
          e.x = Math.round(d || 0);
          f && (e.y = Math.round(f));
          p(b) && (e.text = b);
          b = this.createElement("text").attr(e);
          if (!k || (this.forExport && !this.allowHTML))
            b.xSetter = function (b, d, f) {
              const k = f.getElementsByTagName("tspan"),
                e = f.getAttribute(d);
              for (let f = 0, a; f < k.length; f++)
                (a = k[f]), a.getAttribute(d) === e && a.setAttribute(d, b);
              f.setAttribute(d, b);
            };
          return b;
        }
        fontMetrics(b) {
          b = x(A.prototype.getStyle.call(b, "font-size") || 0);
          const d = 24 > b ? b + 3 : Math.round(1.2 * b);
          return { h: d, b: Math.round(0.8 * d), f: b };
        }
        rotCorr(b, d, f) {
          let k = b;
          d && f && (k = Math.max(k * Math.cos(d * c), 4));
          return { x: (-b / 3) * Math.sin(d * c), y: k };
        }
        pathToSegments(b) {
          const f = [],
            k = [],
            e = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 };
          for (let a = 0; a < b.length; a++)
            O(k[0]) &&
              d(b[a]) &&
              k.length === e[k[0].toUpperCase()] &&
              b.splice(a, 0, k[0].replace("M", "L").replace("m", "l")),
              "string" === typeof b[a] &&
                (k.length && f.push(k.slice(0)), (k.length = 0)),
              k.push(b[a]);
          f.push(k.slice(0));
          return f;
        }
        label(b, d, f, k, e, a, p, m, c) {
          return new D(this, b, d, f, k, e, a, p, m, c);
        }
        alignElements() {
          this.alignedObjects.forEach((b) => b.align());
        }
      }
      b(K.prototype, {
        Element: A,
        SVG_NS: g,
        escapes: {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        },
        symbols: C,
        draw: q,
      });
      L.registerRendererType("svg", K, !0);
      ("");
      return K;
    }
  );
  M(
    a,
    "Core/Renderer/HTML/HTMLElement.js",
    [
      a["Core/Globals.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { isFirefox: x, isMS: A, isWebKit: D, win: C } = a,
        { css: z, defined: t, extend: v, pick: c, pInt: n } = G,
        r = [];
      class l extends y {
        static compose(a) {
          if (G.pushUnique(r, a)) {
            const c = l.prototype,
              g = a.prototype;
            g.getSpanCorrection = c.getSpanCorrection;
            g.htmlCss = c.htmlCss;
            g.htmlGetBBox = c.htmlGetBBox;
            g.htmlUpdateTransform = c.htmlUpdateTransform;
            g.setSpanRotation = c.setSpanRotation;
          }
          return a;
        }
        getSpanCorrection(a, c, g) {
          this.xCorr = -a * g;
          this.yCorr = -c;
        }
        htmlCss(a) {
          const q = "SPAN" === this.element.tagName && a && "width" in a,
            g = c(q && a.width, void 0);
          let l;
          q && (delete a.width, (this.textWidth = g), (l = !0));
          a &&
            "ellipsis" === a.textOverflow &&
            ((a.whiteSpace = "nowrap"), (a.overflow = "hidden"));
          this.styles = v(this.styles, a);
          z(this.element, a);
          l && this.htmlUpdateTransform();
          return this;
        }
        htmlGetBBox() {
          const a = this.element;
          return {
            x: a.offsetLeft,
            y: a.offsetTop,
            width: a.offsetWidth,
            height: a.offsetHeight,
          };
        }
        htmlUpdateTransform() {
          if (this.added) {
            var a = this.renderer,
              c = this.element,
              g = this.x || 0,
              l = this.y || 0,
              r = this.textAlign || "left",
              F = { left: 0, center: 0.5, right: 1 }[r],
              e = this.styles,
              m = e && e.whiteSpace;
            z(c, {
              marginLeft: this.translateX || 0,
              marginTop: this.translateY || 0,
            });
            if ("SPAN" === c.tagName) {
              e = this.rotation;
              const p = this.textWidth && n(this.textWidth),
                q = [e, r, c.innerHTML, this.textWidth, this.textAlign].join();
              let b = !1;
              if (p !== this.oldTextWidth) {
                if (this.textPxLength) var u = this.textPxLength;
                else
                  z(c, { width: "", whiteSpace: m || "nowrap" }),
                    (u = c.offsetWidth);
                (p > this.oldTextWidth || u > p) &&
                  (/[ \-]/.test(c.textContent || c.innerText) ||
                    "ellipsis" === c.style.textOverflow) &&
                  (z(c, {
                    width: u > p || e ? p + "px" : "auto",
                    display: "block",
                    whiteSpace: m || "normal",
                  }),
                  (this.oldTextWidth = p),
                  (b = !0));
              }
              this.hasBoxWidthChanged = b;
              q !== this.cTT &&
                ((a = a.fontMetrics(c).b),
                !t(e) ||
                  (e === (this.oldRotation || 0) && r === this.oldAlign) ||
                  this.setSpanRotation(e, F, a),
                this.getSpanCorrection(
                  (!t(e) && this.textPxLength) || c.offsetWidth,
                  a,
                  F,
                  e,
                  r
                ));
              z(c, {
                left: g + (this.xCorr || 0) + "px",
                top: l + (this.yCorr || 0) + "px",
              });
              this.cTT = q;
              this.oldRotation = e;
              this.oldAlign = r;
            }
          } else this.alignOnAdd = !0;
        }
        setSpanRotation(a, c, g) {
          const l = {},
            q =
              A && !/Edge/.test(C.navigator.userAgent)
                ? "-ms-transform"
                : D
                ? "-webkit-transform"
                : x
                ? "MozTransform"
                : C.opera
                ? "-o-transform"
                : void 0;
          q &&
            ((l[q] = l.transform = "rotate(" + a + "deg)"),
            (l[q + (x ? "Origin" : "-origin")] = l.transformOrigin =
              100 * c + "% " + g + "px"),
            z(this.element, l));
        }
      }
      return l;
    }
  );
  M(
    a,
    "Core/Renderer/HTML/HTMLRenderer.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L) {
      const { attr: x, createElement: D, extend: C, pick: z } = L,
        t = [];
      class v extends G {
        static compose(a) {
          L.pushUnique(t, a) && (a.prototype.html = v.prototype.html);
          return a;
        }
        html(c, n, r) {
          const l = this.createElement("span"),
            h = l.element,
            q = l.renderer,
            g = function (a, c) {
              ["opacity", "visibility"].forEach(function (g) {
                a[g + "Setter"] = function (e, m, l) {
                  const p = a.div ? a.div.style : c;
                  y.prototype[g + "Setter"].call(this, e, m, l);
                  p && (p[m] = e);
                };
              });
              a.addedSetters = !0;
            };
          l.textSetter = function (c) {
            c !== this.textStr &&
              (delete this.bBox,
              delete this.oldTextWidth,
              a.setElementHTML(this.element, z(c, "")),
              (this.textStr = c),
              (l.doTransform = !0));
          };
          g(l, l.element.style);
          l.xSetter =
            l.ySetter =
            l.alignSetter =
            l.rotationSetter =
              function (a, c) {
                "align" === c ? (l.alignValue = l.textAlign = a) : (l[c] = a);
                l.doTransform = !0;
              };
          l.afterSetters = function () {
            this.doTransform &&
              (this.htmlUpdateTransform(), (this.doTransform = !1));
          };
          l.attr({ text: c, x: Math.round(n), y: Math.round(r) }).css({
            position: "absolute",
          });
          q.styledMode ||
            l.css({
              fontFamily: this.style.fontFamily,
              fontSize: this.style.fontSize,
            });
          h.style.whiteSpace = "nowrap";
          l.css = l.htmlCss;
          l.add = function (a) {
            const c = q.box.parentNode,
              n = [];
            let e;
            if ((this.parentGroup = a)) {
              if (((e = a.div), !e)) {
                for (; a; ) n.push(a), (a = a.parentGroup);
                n.reverse().forEach(function (a) {
                  function m(f, d) {
                    a[d] = f;
                    "translateX" === d
                      ? (b.left = f + "px")
                      : (b.top = f + "px");
                    a.doTransform = !0;
                  }
                  const p = x(a.element, "class"),
                    q = a.styles || {};
                  e = a.div =
                    a.div ||
                    D(
                      "div",
                      p ? { className: p } : void 0,
                      {
                        position: "absolute",
                        left: (a.translateX || 0) + "px",
                        top: (a.translateY || 0) + "px",
                        display: a.display,
                        opacity: a.opacity,
                        visibility: a.visibility,
                      },
                      e || c
                    );
                  const b = e.style;
                  C(a, {
                    classSetter: (function (b) {
                      return function (d) {
                        this.element.setAttribute("class", d);
                        b.className = d;
                      };
                    })(e),
                    css: function (f) {
                      l.css.call(a, f);
                      ["cursor", "pointerEvents"].forEach((d) => {
                        f[d] && (b[d] = f[d]);
                      });
                      return a;
                    },
                    on: function () {
                      n[0].div &&
                        l.on.apply(
                          { element: n[0].div, onEvents: a.onEvents },
                          arguments
                        );
                      return a;
                    },
                    translateXSetter: m,
                    translateYSetter: m,
                  });
                  a.addedSetters || g(a);
                  a.css(q);
                });
              }
            } else e = c;
            e.appendChild(h);
            l.added = !0;
            l.alignOnAdd && l.htmlUpdateTransform();
            return l;
          };
          return l;
        }
      }
      return v;
    }
  );
  M(a, "Core/Axis/AxisDefaults.js", [], function () {
    var a;
    (function (a) {
      a.defaultXAxisOptions = {
        alignTicks: !0,
        allowDecimals: void 0,
        panningEnabled: !0,
        zIndex: 2,
        zoomEnabled: !0,
        dateTimeLabelFormats: {
          millisecond: { main: "%H:%M:%S.%L", range: !1 },
          second: { main: "%H:%M:%S", range: !1 },
          minute: { main: "%H:%M", range: !1 },
          hour: { main: "%H:%M", range: !1 },
          day: { main: "%e %b" },
          week: { main: "%e %b" },
          month: { main: "%b '%y" },
          year: { main: "%Y" },
        },
        endOnTick: !1,
        gridLineDashStyle: "Solid",
        gridZIndex: 1,
        labels: {
          autoRotation: void 0,
          autoRotationLimit: 80,
          distance: 15,
          enabled: !0,
          indentation: 10,
          overflow: "justify",
          padding: 5,
          reserveSpace: void 0,
          rotation: void 0,
          staggerLines: 0,
          step: 0,
          useHTML: !1,
          zIndex: 7,
          style: { color: "#333333", cursor: "default", fontSize: "0.8em" },
        },
        maxPadding: 0.01,
        minorGridLineDashStyle: "Solid",
        minorTickLength: 2,
        minorTickPosition: "outside",
        minorTicksPerMajor: 5,
        minPadding: 0.01,
        offset: void 0,
        opposite: !1,
        reversed: void 0,
        reversedStacks: !1,
        showEmpty: !0,
        showFirstLabel: !0,
        showLastLabel: !0,
        startOfWeek: 1,
        startOnTick: !1,
        tickLength: 10,
        tickPixelInterval: 100,
        tickmarkPlacement: "between",
        tickPosition: "outside",
        title: {
          align: "middle",
          rotation: 0,
          useHTML: !1,
          x: 0,
          y: 0,
          style: { color: "#666666", fontSize: "0.8em" },
        },
        type: "linear",
        uniqueNames: !0,
        visible: !0,
        minorGridLineColor: "#f2f2f2",
        minorGridLineWidth: 1,
        minorTickColor: "#999999",
        lineColor: "#333333",
        lineWidth: 1,
        gridLineColor: "#e6e6e6",
        gridLineWidth: void 0,
        tickColor: "#333333",
      };
      a.defaultYAxisOptions = {
        reversedStacks: !0,
        endOnTick: !0,
        maxPadding: 0.05,
        minPadding: 0.05,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: { x: void 0 },
        startOnTick: !0,
        title: { rotation: 270, text: "Values" },
        stackLabels: {
          animation: {},
          allowOverlap: !1,
          enabled: !1,
          crop: !0,
          overflow: "justify",
          formatter: function () {
            const { numberFormatter: a } = this.axis.chart;
            return a(this.total || 0, -1);
          },
          style: {
            color: "#000000",
            fontSize: "0.7em",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
        gridLineWidth: 1,
        lineWidth: 0,
      };
      a.defaultLeftAxisOptions = { title: { rotation: 270 } };
      a.defaultRightAxisOptions = { title: { rotation: 90 } };
      a.defaultBottomAxisOptions = {
        labels: { autoRotation: [-45] },
        margin: 15,
        title: { rotation: 0 },
      };
      a.defaultTopAxisOptions = {
        labels: { autoRotation: [-45] },
        margin: 15,
        title: { rotation: 0 },
      };
    })(a || (a = {}));
    return a;
  });
  M(a, "Core/Foundation.js", [a["Core/Utilities.js"]], function (a) {
    const { addEvent: x, isFunction: G, objectEach: L, removeEvent: A } = a;
    var D;
    (function (a) {
      a.registerEventOptions = function (a, t) {
        a.eventOptions = a.eventOptions || {};
        L(t.events, function (t, c) {
          a.eventOptions[c] !== t &&
            (a.eventOptions[c] &&
              (A(a, c, a.eventOptions[c]), delete a.eventOptions[c]),
            G(t) && ((a.eventOptions[c] = t), x(a, c, t, { order: 0 })));
        });
      };
    })(D || (D = {}));
    return D;
  });
  M(
    a,
    "Core/Axis/Tick.js",
    [
      a["Core/FormatUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { deg2rad: x } = y,
        {
          clamp: A,
          correctFloat: D,
          defined: C,
          destroyObjectProperties: z,
          extend: t,
          fireEvent: v,
          isNumber: c,
          merge: n,
          objectEach: r,
          pick: l,
        } = G;
      class h {
        constructor(a, c, l, h, n) {
          this.isNewLabel = this.isNew = !0;
          this.axis = a;
          this.pos = c;
          this.type = l || "";
          this.parameters = n || {};
          this.tickmarkOffset = this.parameters.tickmarkOffset;
          this.options = this.parameters.options;
          v(this, "init");
          l || h || this.addLabel();
        }
        addLabel() {
          const q = this,
            g = q.axis;
          var h = g.options;
          const n = g.chart;
          var r = g.categories;
          const e = g.logarithmic,
            m = g.names,
            u = q.pos,
            p = l(q.options && q.options.labels, h.labels);
          var H = g.tickPositions;
          const b = u === H[0],
            f = u === H[H.length - 1],
            d = (!p.step || 1 === p.step) && 1 === g.tickInterval;
          H = H.info;
          let k = q.label,
            O,
            N,
            E;
          r = this.parameters.category || (r ? l(r[u], m[u], u) : u);
          e && c(r) && (r = D(e.lin2log(r)));
          g.dateTime &&
            (H
              ? ((N = n.time.resolveDTLFormat(
                  h.dateTimeLabelFormats[
                    (!h.grid && H.higherRanks[u]) || H.unitName
                  ]
                )),
                (O = N.main))
              : c(r) &&
                (O = g.dateTime.getXDateFormat(
                  r,
                  h.dateTimeLabelFormats || {}
                )));
          q.isFirst = b;
          q.isLast = f;
          const x = {
            axis: g,
            chart: n,
            dateTimeLabelFormat: O,
            isFirst: b,
            isLast: f,
            pos: u,
            tick: q,
            tickPositionInfo: H,
            value: r,
          };
          v(this, "labelFormat", x);
          const z = (b) =>
            p.formatter
              ? p.formatter.call(b, b)
              : p.format
              ? ((b.text = g.defaultLabelFormatter.call(b, b)),
                a.format(p.format, b, n))
              : g.defaultLabelFormatter.call(b, b);
          h = z.call(x, x);
          const y = N && N.list;
          q.shortenLabel = y
            ? function () {
                for (E = 0; E < y.length; E++)
                  if (
                    (t(x, { dateTimeLabelFormat: y[E] }),
                    k.attr({ text: z.call(x, x) }),
                    k.getBBox().width < g.getSlotWidth(q) - 2 * p.padding)
                  )
                    return;
                k.attr({ text: "" });
              }
            : void 0;
          d && g._addedPlotLB && q.moveLabel(h, p);
          C(k) || q.movedLabel
            ? k &&
              k.textStr !== h &&
              !d &&
              (!k.textWidth ||
                p.style.width ||
                k.styles.width ||
                k.css({ width: null }),
              k.attr({ text: h }),
              (k.textPxLength = k.getBBox().width))
            : ((q.label = k = q.createLabel({ x: 0, y: 0 }, h, p)),
              (q.rotation = 0));
        }
        createLabel(a, c, l) {
          const g = this.axis,
            q = g.chart;
          if (
            (a =
              C(c) && l.enabled
                ? q.renderer.text(c, a.x, a.y, l.useHTML).add(g.labelGroup)
                : null)
          )
            q.styledMode || a.css(n(l.style)),
              (a.textPxLength = a.getBBox().width);
          return a;
        }
        destroy() {
          z(this, this.axis);
        }
        getPosition(a, c, l, h) {
          const g = this.axis,
            e = g.chart,
            m = (h && e.oldChartHeight) || e.chartHeight;
          a = {
            x: a
              ? D(g.translate(c + l, void 0, void 0, h) + g.transB)
              : g.left +
                g.offset +
                (g.opposite
                  ? ((h && e.oldChartWidth) || e.chartWidth) - g.right - g.left
                  : 0),
            y: a
              ? m - g.bottom + g.offset - (g.opposite ? g.height : 0)
              : D(m - g.translate(c + l, void 0, void 0, h) - g.transB),
          };
          a.y = A(a.y, -1e5, 1e5);
          v(this, "afterGetPosition", { pos: a });
          return a;
        }
        getLabelPosition(a, c, h, n, r, e, m, u) {
          const p = this.axis,
            g = p.transA,
            b =
              p.isLinked && p.linkedParent
                ? p.linkedParent.reversed
                : p.reversed,
            f = p.staggerLines,
            d = p.tickRotCorr || { x: 0, y: 0 },
            k =
              n || p.reserveSpaceDefault
                ? 0
                : -p.labelOffset * ("center" === p.labelAlign ? 0.5 : 1),
            q = r.distance,
            w = {};
          h =
            0 === p.side
              ? h.rotation
                ? -q
                : -h.getBBox().height
              : 2 === p.side
              ? d.y + q
              : Math.cos(h.rotation * x) * (d.y - h.getBBox(!1, 0).height / 2);
          C(r.y) && (h = 0 === p.side && p.horiz ? r.y + h : r.y);
          a =
            a +
            l(r.x, [0, 1, 0, -1][p.side] * q) +
            k +
            d.x -
            (e && n ? e * g * (b ? -1 : 1) : 0);
          c = c + h - (e && !n ? e * g * (b ? 1 : -1) : 0);
          f &&
            ((n = (m / (u || 1)) % f),
            p.opposite && (n = f - n - 1),
            (c += (p.labelOffset / f) * n));
          w.x = a;
          w.y = Math.round(c);
          v(this, "afterGetLabelPosition", {
            pos: w,
            tickmarkOffset: e,
            index: m,
          });
          return w;
        }
        getLabelSize() {
          return this.label
            ? this.label.getBBox()[this.axis.horiz ? "height" : "width"]
            : 0;
        }
        getMarkPath(a, c, l, h, n, e) {
          return e.crispLine(
            [
              ["M", a, c],
              ["L", a + (n ? 0 : -l), c + (n ? l : 0)],
            ],
            h
          );
        }
        handleOverflow(a) {
          const c = this.axis,
            h = c.options.labels,
            n = a.x;
          var q = c.chart.chartWidth,
            e = c.chart.spacing;
          const m = l(c.labelLeft, Math.min(c.pos, e[3]));
          e = l(
            c.labelRight,
            Math.max(c.isRadial ? 0 : c.pos + c.len, q - e[1])
          );
          const u = this.label,
            p = this.rotation,
            r = { left: 0, center: 0.5, right: 1 }[
              c.labelAlign || u.attr("align")
            ],
            b = u.getBBox().width,
            f = c.getSlotWidth(this),
            d = {};
          let k = f,
            O = 1,
            N;
          if (p || "justify" !== h.overflow)
            0 > p && n - r * b < m
              ? (N = Math.round(n / Math.cos(p * x) - m))
              : 0 < p &&
                n + r * b > e &&
                (N = Math.round((q - n) / Math.cos(p * x)));
          else if (
            ((q = n + (1 - r) * b),
            n - r * b < m
              ? (k = a.x + k * (1 - r) - m)
              : q > e && ((k = e - a.x + k * r), (O = -1)),
            (k = Math.min(f, k)),
            k < f &&
              "center" === c.labelAlign &&
              (a.x += O * (f - k - r * (f - Math.min(b, k)))),
            b > k || (c.autoRotation && (u.styles || {}).width))
          )
            N = k;
          N &&
            (this.shortenLabel
              ? this.shortenLabel()
              : ((d.width = Math.floor(N) + "px"),
                (h.style || {}).textOverflow || (d.textOverflow = "ellipsis"),
                u.css(d)));
        }
        moveLabel(a, c) {
          const g = this;
          var l = g.label;
          const h = g.axis;
          let e = !1;
          l && l.textStr === a
            ? ((g.movedLabel = l), (e = !0), delete g.label)
            : r(h.ticks, function (c) {
                e ||
                  c.isNew ||
                  c === g ||
                  !c.label ||
                  c.label.textStr !== a ||
                  ((g.movedLabel = c.label),
                  (e = !0),
                  (c.labelPos = g.movedLabel.xy),
                  delete c.label);
              });
          e ||
            (!g.labelPos && !l) ||
            ((l = g.labelPos || l.xy),
            (g.movedLabel = g.createLabel(l, a, c)),
            g.movedLabel && g.movedLabel.attr({ opacity: 0 }));
        }
        render(a, c, h) {
          var g = this.axis,
            n = g.horiz,
            e = this.pos,
            m = l(this.tickmarkOffset, g.tickmarkOffset);
          e = this.getPosition(n, e, m, c);
          m = e.x;
          const u = e.y;
          g = (n && m === g.pos + g.len) || (!n && u === g.pos) ? -1 : 1;
          n = l(h, this.label && this.label.newOpacity, 1);
          h = l(h, 1);
          this.isActive = !0;
          this.renderGridLine(c, h, g);
          this.renderMark(e, h, g);
          this.renderLabel(e, c, n, a);
          this.isNew = !1;
          v(this, "afterRender");
        }
        renderGridLine(a, c, h) {
          const g = this.axis,
            n = g.options,
            e = {},
            m = this.pos,
            u = this.type,
            p = l(this.tickmarkOffset, g.tickmarkOffset),
            q = g.chart.renderer;
          let b = this.gridLine,
            f = n.gridLineWidth,
            d = n.gridLineColor,
            k = n.gridLineDashStyle;
          "minor" === this.type &&
            ((f = n.minorGridLineWidth),
            (d = n.minorGridLineColor),
            (k = n.minorGridLineDashStyle));
          b ||
            (g.chart.styledMode ||
              ((e.stroke = d), (e["stroke-width"] = f || 0), (e.dashstyle = k)),
            u || (e.zIndex = 1),
            a && (c = 0),
            (this.gridLine = b =
              q
                .path()
                .attr(e)
                .addClass("highcharts-" + (u ? u + "-" : "") + "grid-line")
                .add(g.gridGroup)));
          if (
            b &&
            (h = g.getPlotLinePath({
              value: m + p,
              lineWidth: b.strokeWidth() * h,
              force: "pass",
              old: a,
              acrossPanes: !1,
            }))
          )
            b[a || this.isNew ? "attr" : "animate"]({ d: h, opacity: c });
        }
        renderMark(a, c, h) {
          const g = this.axis;
          var n = g.options;
          const e = g.chart.renderer,
            m = this.type,
            u = g.tickSize(m ? m + "Tick" : "tick"),
            p = a.x;
          a = a.y;
          const q = l(
            n["minor" !== m ? "tickWidth" : "minorTickWidth"],
            !m && g.isXAxis ? 1 : 0
          );
          n = n["minor" !== m ? "tickColor" : "minorTickColor"];
          let b = this.mark;
          const f = !b;
          u &&
            (g.opposite && (u[0] = -u[0]),
            b ||
              ((this.mark = b =
                e
                  .path()
                  .addClass("highcharts-" + (m ? m + "-" : "") + "tick")
                  .add(g.axisGroup)),
              g.chart.styledMode || b.attr({ stroke: n, "stroke-width": q })),
            b[f ? "attr" : "animate"]({
              d: this.getMarkPath(p, a, u[0], b.strokeWidth() * h, g.horiz, e),
              opacity: c,
            }));
        }
        renderLabel(a, g, h, n) {
          var r = this.axis;
          const e = r.horiz,
            m = r.options,
            u = this.label,
            p = m.labels,
            q = p.step;
          r = l(this.tickmarkOffset, r.tickmarkOffset);
          const b = a.x;
          a = a.y;
          let f = !0;
          u &&
            c(b) &&
            ((u.xy = a = this.getLabelPosition(b, a, u, e, p, r, n, q)),
            (this.isFirst && !this.isLast && !m.showFirstLabel) ||
            (this.isLast && !this.isFirst && !m.showLastLabel)
              ? (f = !1)
              : !e ||
                p.step ||
                p.rotation ||
                g ||
                0 === h ||
                this.handleOverflow(a),
            q && n % q && (f = !1),
            f && c(a.y)
              ? ((a.opacity = h),
                u[this.isNewLabel ? "attr" : "animate"](a).show(!0),
                (this.isNewLabel = !1))
              : (u.hide(), (this.isNewLabel = !0)));
        }
        replaceMovedLabel() {
          const a = this.label,
            c = this.axis;
          a &&
            !this.isNew &&
            (a.animate({ opacity: 0 }, void 0, a.destroy), delete this.label);
          c.isDirty = !0;
          this.label = this.movedLabel;
          delete this.movedLabel;
        }
      }
      ("");
      return h;
    }
  );
  M(
    a,
    "Core/Axis/Axis.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/AxisDefaults.js"],
      a["Core/Color/Color.js"],
      a["Core/Defaults.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Axis/Tick.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A, D, C, z) {
      const { animObject: t } = a,
        { defaultOptions: v } = L,
        { registerEventOptions: c } = A,
        { deg2rad: n } = D,
        {
          arrayMax: r,
          arrayMin: l,
          clamp: h,
          correctFloat: q,
          defined: g,
          destroyObjectProperties: w,
          erase: J,
          error: x,
          extend: e,
          fireEvent: m,
          isArray: u,
          isNumber: p,
          isString: H,
          merge: b,
          normalizeTickInterval: f,
          objectEach: d,
          pick: k,
          relativeLength: O,
          removeEvent: N,
          splat: E,
          syncTimeout: Z,
        } = z,
        T = (b, d) =>
          f(
            d,
            void 0,
            void 0,
            k(b.options.allowDecimals, 0.5 > d || void 0 !== b.tickAmount),
            !!b.tickAmount
          );
      class U {
        constructor(b, d) {
          this.zoomEnabled =
            this.width =
            this.visible =
            this.userOptions =
            this.translationSlope =
            this.transB =
            this.transA =
            this.top =
            this.ticks =
            this.tickRotCorr =
            this.tickPositions =
            this.tickmarkOffset =
            this.tickInterval =
            this.tickAmount =
            this.side =
            this.series =
            this.right =
            this.positiveValuesOnly =
            this.pos =
            this.pointRangePadding =
            this.pointRange =
            this.plotLinesAndBandsGroups =
            this.plotLinesAndBands =
            this.paddedTicks =
            this.overlap =
            this.options =
            this.offset =
            this.names =
            this.minPixelPadding =
            this.minorTicks =
            this.minorTickInterval =
            this.min =
            this.maxLabelLength =
            this.max =
            this.len =
            this.left =
            this.labelFormatter =
            this.labelEdge =
            this.isLinked =
            this.height =
            this.hasVisibleSeries =
            this.hasNames =
            this.eventOptions =
            this.coll =
            this.closestPointRange =
            this.chart =
            this.bottom =
            this.alternateBands =
              void 0;
          this.init(b, d);
        }
        init(b, d) {
          const a = d.isX;
          this.chart = b;
          this.horiz = b.inverted && !this.isZAxis ? !a : a;
          this.isXAxis = a;
          this.coll = this.coll || (a ? "xAxis" : "yAxis");
          m(this, "init", { userOptions: d });
          this.opposite = k(d.opposite, this.opposite);
          this.side = k(
            d.side,
            this.side,
            this.horiz ? (this.opposite ? 0 : 2) : this.opposite ? 1 : 3
          );
          this.setOptions(d);
          const f = this.options,
            e = f.labels,
            B = f.type;
          this.userOptions = d;
          this.minPixelPadding = 0;
          this.reversed = k(f.reversed, this.reversed);
          this.visible = f.visible;
          this.zoomEnabled = f.zoomEnabled;
          this.hasNames = "category" === B || !0 === f.categories;
          this.categories = f.categories || (this.hasNames ? [] : void 0);
          this.names || ((this.names = []), (this.names.keys = {}));
          this.plotLinesAndBandsGroups = {};
          this.positiveValuesOnly = !!this.logarithmic;
          this.isLinked = g(f.linkedTo);
          this.ticks = {};
          this.labelEdge = [];
          this.minorTicks = {};
          this.plotLinesAndBands = [];
          this.alternateBands = {};
          this.len = 0;
          this.minRange = this.userMinRange = f.minRange || f.maxZoom;
          this.range = f.range;
          this.offset = f.offset || 0;
          this.min = this.max = null;
          d = k(f.crosshair, E(b.options.tooltip.crosshairs)[a ? 0 : 1]);
          this.crosshair = !0 === d ? {} : d;
          -1 === b.axes.indexOf(this) &&
            (a ? b.axes.splice(b.xAxis.length, 0, this) : b.axes.push(this),
            b[this.coll].push(this));
          this.series = this.series || [];
          b.inverted &&
            !this.isZAxis &&
            a &&
            "undefined" === typeof this.reversed &&
            (this.reversed = !0);
          this.labelRotation = p(e.rotation) ? e.rotation : void 0;
          c(this, f);
          m(this, "afterInit");
        }
        setOptions(d) {
          this.options = b(
            y.defaultXAxisOptions,
            "yAxis" === this.coll && y.defaultYAxisOptions,
            [
              y.defaultTopAxisOptions,
              y.defaultRightAxisOptions,
              y.defaultBottomAxisOptions,
              y.defaultLeftAxisOptions,
            ][this.side],
            b(v[this.coll], d)
          );
          m(this, "afterSetOptions", { userOptions: d });
        }
        defaultLabelFormatter(b) {
          var d = this.axis;
          ({ numberFormatter: b } = this.chart);
          const f = p(this.value) ? this.value : NaN,
            a = d.chart.time,
            k = this.dateTimeLabelFormat;
          var e = v.lang;
          const c = e.numericSymbols;
          e = e.numericSymbolMagnitude || 1e3;
          const m = d.logarithmic ? Math.abs(f) : d.tickInterval;
          let g = c && c.length,
            K;
          if (d.categories) K = `${this.value}`;
          else if (k) K = a.dateFormat(k, f);
          else if (g && 1e3 <= m)
            for (; g-- && "undefined" === typeof K; )
              (d = Math.pow(e, g + 1)),
                m >= d &&
                  0 === (10 * f) % d &&
                  null !== c[g] &&
                  0 !== f &&
                  (K = b(f / d, -1) + c[g]);
          "undefined" === typeof K &&
            (K = 1e4 <= Math.abs(f) ? b(f, -1) : b(f, -1, void 0, ""));
          return K;
        }
        getSeriesExtremes() {
          const b = this,
            d = b.chart;
          let f;
          m(this, "getSeriesExtremes", null, function () {
            b.hasVisibleSeries = !1;
            b.dataMin = b.dataMax = b.threshold = null;
            b.softThreshold = !b.isXAxis;
            b.series.forEach(function (a) {
              if (a.visible || !d.options.chart.ignoreHiddenSeries) {
                var e = a.options;
                let d = e.threshold,
                  c,
                  m;
                b.hasVisibleSeries = !0;
                b.positiveValuesOnly && 0 >= d && (d = null);
                if (b.isXAxis)
                  (e = a.xData) &&
                    e.length &&
                    ((e = b.logarithmic ? e.filter((b) => 0 < b) : e),
                    (f = a.getXExtremes(e)),
                    (c = f.min),
                    (m = f.max),
                    p(c) ||
                      c instanceof Date ||
                      ((e = e.filter(p)),
                      (f = a.getXExtremes(e)),
                      (c = f.min),
                      (m = f.max)),
                    e.length &&
                      ((b.dataMin = Math.min(k(b.dataMin, c), c)),
                      (b.dataMax = Math.max(k(b.dataMax, m), m))));
                else if (
                  ((a = a.applyExtremes()),
                  p(a.dataMin) &&
                    ((c = a.dataMin),
                    (b.dataMin = Math.min(k(b.dataMin, c), c))),
                  p(a.dataMax) &&
                    ((m = a.dataMax),
                    (b.dataMax = Math.max(k(b.dataMax, m), m))),
                  g(d) && (b.threshold = d),
                  !e.softThreshold || b.positiveValuesOnly)
                )
                  b.softThreshold = !1;
              }
            });
          });
          m(this, "afterGetSeriesExtremes");
        }
        translate(b, d, f, a, k, e) {
          const c = this.linkedParent || this,
            m = a && c.old ? c.old.min : c.min;
          if (!p(m)) return NaN;
          const B = c.minPixelPadding;
          k =
            (c.isOrdinal ||
              (c.brokenAxis && c.brokenAxis.hasBreaks) ||
              (c.logarithmic && k)) &&
            c.lin2val;
          let g = 1,
            K = 0;
          a = a && c.old ? c.old.transA : c.transA;
          a || (a = c.transA);
          f && ((g *= -1), (K = c.len));
          c.reversed && ((g *= -1), (K -= g * (c.sector || c.len)));
          d
            ? ((e = (b * g + K - B) / a + m), k && (e = c.lin2val(e)))
            : (k && (b = c.val2lin(b)),
              (b = g * (b - m) * a),
              (e = (c.isRadial ? b : q(b)) + K + g * B + (p(e) ? a * e : 0)));
          return e;
        }
        toPixels(b, d) {
          return (
            this.translate(b, !1, !this.horiz, void 0, !0) + (d ? 0 : this.pos)
          );
        }
        toValue(b, d) {
          return this.translate(
            b - (d ? 0 : this.pos),
            !0,
            !this.horiz,
            void 0,
            !0
          );
        }
        getPlotLinePath(b) {
          function d(b, d, a) {
            "pass" !== E &&
              (b < d || b > a) &&
              (E ? (b = h(b, d, a)) : (H = !0));
            return b;
          }
          const a = this,
            f = a.chart,
            e = a.left,
            c = a.top,
            g = b.old,
            K = b.value,
            l = b.lineWidth,
            n = (g && f.oldChartHeight) || f.chartHeight,
            u = (g && f.oldChartWidth) || f.chartWidth,
            r = a.transB;
          let q = b.translatedValue,
            E = b.force,
            w,
            O,
            N,
            X,
            H;
          b = {
            value: K,
            lineWidth: l,
            old: g,
            force: E,
            acrossPanes: b.acrossPanes,
            translatedValue: q,
          };
          m(this, "getPlotLinePath", b, function (b) {
            q = k(q, a.translate(K, void 0, void 0, g));
            q = h(q, -1e5, 1e5);
            w = N = Math.round(q + r);
            O = X = Math.round(n - q - r);
            p(q)
              ? a.horiz
                ? ((O = c), (X = n - a.bottom), (w = N = d(w, e, e + a.width)))
                : ((w = e), (N = u - a.right), (O = X = d(O, c, c + a.height)))
              : ((H = !0), (E = !1));
            b.path =
              H && !E
                ? null
                : f.renderer.crispLine(
                    [
                      ["M", w, O],
                      ["L", N, X],
                    ],
                    l || 1
                  );
          });
          return b.path;
        }
        getLinearTickPositions(b, d, a) {
          const f = q(Math.floor(d / b) * b);
          a = q(Math.ceil(a / b) * b);
          const k = [];
          let e, c;
          q(f + b) === f && (c = 20);
          if (this.single) return [d];
          for (d = f; d <= a; ) {
            k.push(d);
            d = q(d + b, c);
            if (d === e) break;
            e = d;
          }
          return k;
        }
        getMinorTickInterval() {
          const b = this.options;
          return !0 === b.minorTicks
            ? k(b.minorTickInterval, "auto")
            : !1 === b.minorTicks
            ? null
            : b.minorTickInterval;
        }
        getMinorTickPositions() {
          var b = this.options;
          const d = this.tickPositions,
            a = this.minorTickInterval;
          var f = this.pointRangePadding || 0;
          const k = this.min - f;
          f = this.max + f;
          const e = f - k;
          let c = [];
          if (e && e / a < this.len / 3) {
            const e = this.logarithmic;
            if (e)
              this.paddedTicks.forEach(function (b, d, f) {
                d &&
                  c.push.apply(c, e.getLogTickPositions(a, f[d - 1], f[d], !0));
              });
            else if (this.dateTime && "auto" === this.getMinorTickInterval())
              c = c.concat(
                this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(a),
                  k,
                  f,
                  b.startOfWeek
                )
              );
            else
              for (b = k + ((d[0] - k) % a); b <= f && b !== c[0]; b += a)
                c.push(b);
          }
          0 !== c.length && this.trimTicks(c);
          return c;
        }
        adjustForMinRange() {
          const b = this.options,
            d = this.logarithmic;
          let a = this.min;
          var f = this.max;
          let e,
            c = 0,
            p,
            m,
            h,
            n,
            u;
          this.isXAxis &&
            "undefined" === typeof this.minRange &&
            !d &&
            (g(b.min) || g(b.max) || g(b.floor) || g(b.ceiling)
              ? (this.minRange = null)
              : (this.series.forEach(function (b) {
                  h = b.xData;
                  n = b.xIncrement ? 1 : h.length - 1;
                  if (1 < h.length)
                    for (p = n; 0 < p; p--)
                      if (((m = h[p] - h[p - 1]), !c || m < c)) c = m;
                }),
                (this.minRange = Math.min(
                  5 * c,
                  this.dataMax - this.dataMin
                ))));
          if (f - a < this.minRange) {
            e = this.dataMax - this.dataMin >= this.minRange;
            u = this.minRange;
            var q = (u - f + a) / 2;
            q = [a - q, k(b.min, a - q)];
            e &&
              (q[2] = this.logarithmic
                ? this.logarithmic.log2lin(this.dataMin)
                : this.dataMin);
            a = r(q);
            f = [a + u, k(b.max, a + u)];
            e && (f[2] = d ? d.log2lin(this.dataMax) : this.dataMax);
            f = l(f);
            f - a < u && ((q[0] = f - u), (q[1] = k(b.min, f - u)), (a = r(q)));
          }
          this.min = a;
          this.max = f;
        }
        getClosest() {
          let b;
          this.categories
            ? (b = 1)
            : this.series.forEach(function (d) {
                const a = d.closestPointRange,
                  f = d.visible || !d.chart.options.chart.ignoreHiddenSeries;
                !d.noSharedTooltip &&
                  g(a) &&
                  f &&
                  (b = g(b) ? Math.min(b, a) : a);
              });
          return b;
        }
        nameToX(b) {
          const d = u(this.options.categories),
            a = d ? this.categories : this.names;
          let f = b.options.x,
            e;
          b.series.requireSorting = !1;
          g(f) ||
            (f =
              this.options.uniqueNames && a
                ? d
                  ? a.indexOf(b.name)
                  : k(a.keys[b.name], -1)
                : b.series.autoIncrement());
          -1 === f ? !d && a && (e = a.length) : (e = f);
          "undefined" !== typeof e
            ? ((this.names[e] = b.name), (this.names.keys[b.name] = e))
            : b.x && (e = b.x);
          return e;
        }
        updateNames() {
          const b = this,
            d = this.names;
          0 < d.length &&
            (Object.keys(d.keys).forEach(function (b) {
              delete d.keys[b];
            }),
            (d.length = 0),
            (this.minRange = this.userMinRange),
            (this.series || []).forEach(function (d) {
              d.xIncrement = null;
              if (!d.points || d.isDirtyData)
                (b.max = Math.max(b.max, d.xData.length - 1)),
                  d.processData(),
                  d.generatePoints();
              d.data.forEach(function (a, f) {
                let e;
                a &&
                  a.options &&
                  "undefined" !== typeof a.name &&
                  ((e = b.nameToX(a)),
                  "undefined" !== typeof e &&
                    e !== a.x &&
                    ((a.x = e), (d.xData[f] = e)));
              });
            }));
        }
        setAxisTranslation() {
          const b = this,
            d = b.max - b.min;
          var a = b.linkedParent;
          const f = !!b.categories,
            e = b.isXAxis;
          let c = b.axisPointRange || 0,
            p,
            g = 0,
            h = 0,
            l = b.transA;
          if (e || f || c)
            (p = b.getClosest()),
              a
                ? ((g = a.minPointOffset), (h = a.pointRangePadding))
                : b.series.forEach(function (d) {
                    const a = f
                        ? 1
                        : e
                        ? k(d.options.pointRange, p, 0)
                        : b.axisPointRange || 0,
                      m = d.options.pointPlacement;
                    c = Math.max(c, a);
                    if (!b.single || f)
                      (d = d.is("xrange") ? !e : e),
                        (g = Math.max(g, d && H(m) ? 0 : a / 2)),
                        (h = Math.max(h, d && "on" === m ? 0 : a));
                  }),
              (a = b.ordinal && b.ordinal.slope && p ? b.ordinal.slope / p : 1),
              (b.minPointOffset = g *= a),
              (b.pointRangePadding = h *= a),
              (b.pointRange = Math.min(c, b.single && f ? 1 : d)),
              e && (b.closestPointRange = p);
          b.translationSlope =
            b.transA =
            l =
              b.staticScale || b.len / (d + h || 1);
          b.transB = b.horiz ? b.left : b.bottom;
          b.minPixelPadding = l * g;
          m(this, "afterSetAxisTranslation");
        }
        minFromRange() {
          return this.max - this.range;
        }
        setTickInterval(b) {
          var d = this.chart;
          const a = this.logarithmic,
            f = this.options,
            e = this.isXAxis,
            c = this.isLinked,
            h = f.tickPixelInterval,
            l = this.categories,
            K = this.softThreshold;
          let n = f.maxPadding,
            u = f.minPadding;
          let r =
              p(f.tickInterval) && 0 <= f.tickInterval
                ? f.tickInterval
                : void 0,
            E = p(this.threshold) ? this.threshold : null,
            w,
            O,
            N;
          this.dateTime || l || c || this.getTickAmount();
          O = k(this.userMin, f.min);
          N = k(this.userMax, f.max);
          if (c) {
            this.linkedParent = d[this.coll][f.linkedTo];
            var H = this.linkedParent.getExtremes();
            this.min = k(H.min, H.dataMin);
            this.max = k(H.max, H.dataMax);
            f.type !== this.linkedParent.options.type && x(11, 1, d);
          } else
            K &&
              g(E) &&
              (this.dataMin >= E
                ? ((H = E), (u = 0))
                : this.dataMax <= E && ((w = E), (n = 0))),
              (this.min = k(O, H, this.dataMin)),
              (this.max = k(N, w, this.dataMax));
          a &&
            (this.positiveValuesOnly &&
              !b &&
              0 >= Math.min(this.min, k(this.dataMin, this.min)) &&
              x(10, 1, d),
            (this.min = q(a.log2lin(this.min), 16)),
            (this.max = q(a.log2lin(this.max), 16)));
          this.range &&
            g(this.max) &&
            ((this.userMin =
              this.min =
              O =
                Math.max(this.dataMin, this.minFromRange())),
            (this.userMax = N = this.max),
            (this.range = null));
          m(this, "foundExtremes");
          this.beforePadding && this.beforePadding();
          this.adjustForMinRange();
          !(
            l ||
            this.axisPointRange ||
            (this.stacking && this.stacking.usePercentage) ||
            c
          ) &&
            g(this.min) &&
            g(this.max) &&
            (d = this.max - this.min) &&
            (!g(O) && u && (this.min -= d * u),
            !g(N) && n && (this.max += d * n));
          p(this.userMin) ||
            (p(f.softMin) && f.softMin < this.min && (this.min = O = f.softMin),
            p(f.floor) && (this.min = Math.max(this.min, f.floor)));
          p(this.userMax) ||
            (p(f.softMax) && f.softMax > this.max && (this.max = N = f.softMax),
            p(f.ceiling) && (this.max = Math.min(this.max, f.ceiling)));
          K &&
            g(this.dataMin) &&
            ((E = E || 0),
            !g(O) && this.min < E && this.dataMin >= E
              ? (this.min = this.options.minRange
                  ? Math.min(E, this.max - this.minRange)
                  : E)
              : !g(N) &&
                this.max > E &&
                this.dataMax <= E &&
                (this.max = this.options.minRange
                  ? Math.max(E, this.min + this.minRange)
                  : E));
          p(this.min) &&
            p(this.max) &&
            !this.chart.polar &&
            this.min > this.max &&
            (g(this.options.min)
              ? (this.max = this.min)
              : g(this.options.max) && (this.min = this.max));
          this.tickInterval =
            this.min === this.max ||
            "undefined" === typeof this.min ||
            "undefined" === typeof this.max
              ? 1
              : c &&
                this.linkedParent &&
                !r &&
                h === this.linkedParent.options.tickPixelInterval
              ? (r = this.linkedParent.tickInterval)
              : k(
                  r,
                  this.tickAmount
                    ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1)
                    : void 0,
                  l ? 1 : ((this.max - this.min) * h) / Math.max(this.len, h)
                );
          if (e && !b) {
            const b =
              this.min !== (this.old && this.old.min) ||
              this.max !== (this.old && this.old.max);
            this.series.forEach(function (d) {
              d.forceCrop = d.forceCropping && d.forceCropping();
              d.processData(b);
            });
            m(this, "postProcessData", { hasExtremesChanged: b });
          }
          this.setAxisTranslation();
          m(this, "initialAxisTranslation");
          this.pointRange &&
            !r &&
            (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
          b = k(
            f.minTickInterval,
            this.dateTime && !this.series.some((b) => b.noSharedTooltip)
              ? this.closestPointRange
              : 0
          );
          !r && this.tickInterval < b && (this.tickInterval = b);
          this.dateTime ||
            this.logarithmic ||
            r ||
            (this.tickInterval = T(this, this.tickInterval));
          this.tickAmount || (this.tickInterval = this.unsquish());
          this.setTickPositions();
        }
        setTickPositions() {
          var b = this.options;
          const d = b.tickPositions,
            a = b.tickPositioner;
          var f = this.getMinorTickInterval(),
            e = this.hasVerticalPanning(),
            k = "colorAxis" === this.coll;
          const c = (k || !e) && b.startOnTick;
          e = (k || !e) && b.endOnTick;
          k = [];
          let h;
          this.tickmarkOffset =
            this.categories &&
            "between" === b.tickmarkPlacement &&
            1 === this.tickInterval
              ? 0.5
              : 0;
          this.minorTickInterval =
            "auto" === f && this.tickInterval
              ? this.tickInterval / b.minorTicksPerMajor
              : f;
          this.single =
            this.min === this.max &&
            g(this.min) &&
            !this.tickAmount &&
            (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
          if (d) k = d.slice();
          else if (p(this.min) && p(this.max)) {
            if (
              (this.ordinal && this.ordinal.positions) ||
              !(
                (this.max - this.min) / this.tickInterval >
                Math.max(2 * this.len, 200)
              )
            )
              if (this.dateTime)
                k = this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(
                    this.tickInterval,
                    b.units
                  ),
                  this.min,
                  this.max,
                  b.startOfWeek,
                  this.ordinal && this.ordinal.positions,
                  this.closestPointRange,
                  !0
                );
              else if (this.logarithmic)
                k = this.logarithmic.getLogTickPositions(
                  this.tickInterval,
                  this.min,
                  this.max
                );
              else
                for (f = b = this.tickInterval; f <= 2 * b; )
                  if (
                    ((k = this.getLinearTickPositions(
                      this.tickInterval,
                      this.min,
                      this.max
                    )),
                    this.tickAmount && k.length > this.tickAmount)
                  )
                    this.tickInterval = T(this, (f *= 1.1));
                  else break;
            else (k = [this.min, this.max]), x(19, !1, this.chart);
            k.length > this.len &&
              ((k = [k[0], k[k.length - 1]]), k[0] === k[1] && (k.length = 1));
            a &&
              ((this.tickPositions = k),
              (h = a.apply(this, [this.min, this.max])) && (k = h));
          }
          this.tickPositions = k;
          this.paddedTicks = k.slice(0);
          this.trimTicks(k, c, e);
          !this.isLinked &&
            p(this.min) &&
            p(this.max) &&
            (this.single &&
              2 > k.length &&
              !this.categories &&
              !this.series.some(
                (b) => b.is("heatmap") && "between" === b.options.pointPlacement
              ) &&
              ((this.min -= 0.5), (this.max += 0.5)),
            d || h || this.adjustTickAmount());
          m(this, "afterSetTickPositions");
        }
        trimTicks(b, d, a) {
          const f = b[0],
            k = b[b.length - 1],
            e = (!this.isOrdinal && this.minPointOffset) || 0;
          m(this, "trimTicks");
          if (!this.isLinked) {
            if (d && -Infinity !== f) this.min = f;
            else for (; this.min - e > b[0]; ) b.shift();
            if (a) this.max = k;
            else for (; this.max + e < b[b.length - 1]; ) b.pop();
            0 === b.length &&
              g(f) &&
              !this.options.tickPositions &&
              b.push((k + f) / 2);
          }
        }
        alignToOthers() {
          const b = this,
            d = [this],
            f = b.options,
            a =
              "yAxis" === this.coll && this.chart.options.chart.alignThresholds,
            k = [];
          let e;
          b.thresholdAlignment = void 0;
          if (
            ((!1 !== this.chart.options.chart.alignTicks && f.alignTicks) ||
              a) &&
            !1 !== f.startOnTick &&
            !1 !== f.endOnTick &&
            !b.logarithmic
          ) {
            const f = (b) => {
                const { horiz: d, options: f } = b;
                return [d ? f.left : f.top, f.width, f.height, f.pane].join();
              },
              a = f(this);
            this.chart[this.coll].forEach(function (k) {
              const { series: c } = k;
              c.length &&
                c.some((b) => b.visible) &&
                k !== b &&
                f(k) === a &&
                ((e = !0), d.push(k));
            });
          }
          if (e && a) {
            d.forEach((d) => {
              d = d.getThresholdAlignment(b);
              p(d) && k.push(d);
            });
            const f =
              1 < k.length ? k.reduce((b, d) => b + d, 0) / k.length : void 0;
            d.forEach((b) => {
              b.thresholdAlignment = f;
            });
          }
          return e;
        }
        getThresholdAlignment(b) {
          (!p(this.dataMin) ||
            (this !== b &&
              this.series.some((b) => b.isDirty || b.isDirtyData))) &&
            this.getSeriesExtremes();
          if (p(this.threshold))
            return (
              (b = h(
                (this.threshold - (this.dataMin || 0)) /
                  ((this.dataMax || 0) - (this.dataMin || 0)),
                0,
                1
              )),
              this.options.reversed && (b = 1 - b),
              b
            );
        }
        getTickAmount() {
          const b = this.options,
            d = b.tickPixelInterval;
          let f = b.tickAmount;
          !g(b.tickInterval) &&
            !f &&
            this.len < d &&
            !this.isRadial &&
            !this.logarithmic &&
            b.startOnTick &&
            b.endOnTick &&
            (f = 2);
          !f && this.alignToOthers() && (f = Math.ceil(this.len / d) + 1);
          4 > f && ((this.finalTickAmt = f), (f = 5));
          this.tickAmount = f;
        }
        adjustTickAmount() {
          const b = this,
            {
              finalTickAmt: d,
              max: f,
              min: a,
              options: e,
              tickPositions: c,
              tickAmount: m,
              thresholdAlignment: h,
            } = b,
            l = c && c.length;
          var n = k(b.threshold, b.softThreshold ? 0 : null);
          var u = b.tickInterval;
          let r;
          p(h) &&
            ((r = 0.5 > h ? Math.ceil(h * (m - 1)) : Math.floor(h * (m - 1))),
            e.reversed && (r = m - 1 - r));
          if (b.hasData() && p(a) && p(f)) {
            const k = () => {
              b.transA *= (l - 1) / (m - 1);
              b.min = e.startOnTick ? c[0] : Math.min(a, c[0]);
              b.max = e.endOnTick
                ? c[c.length - 1]
                : Math.max(f, c[c.length - 1]);
            };
            if (p(r) && p(b.threshold)) {
              for (
                ;
                c[r] !== n || c.length !== m || c[0] > a || c[c.length - 1] < f;

              ) {
                c.length = 0;
                for (c.push(b.threshold); c.length < m; )
                  void 0 === c[r] || c[r] > b.threshold
                    ? c.unshift(q(c[0] - u))
                    : c.push(q(c[c.length - 1] + u));
                if (u > 8 * b.tickInterval) break;
                u *= 2;
              }
              k();
            } else if (l < m) {
              for (; c.length < m; )
                c.length % 2 || a === n
                  ? c.push(q(c[c.length - 1] + u))
                  : c.unshift(q(c[0] - u));
              k();
            }
            if (g(d)) {
              for (u = n = c.length; u--; )
                ((3 === d && 1 === u % 2) || (2 >= d && 0 < u && u < n - 1)) &&
                  c.splice(u, 1);
              b.finalTickAmt = void 0;
            }
          }
        }
        setScale() {
          let b = !1,
            d = !1;
          this.series.forEach(function (f) {
            b = b || f.isDirtyData || f.isDirty;
            d = d || (f.xAxis && f.xAxis.isDirty) || !1;
          });
          this.setAxisSize();
          const f = this.len !== (this.old && this.old.len);
          f ||
          b ||
          d ||
          this.isLinked ||
          this.forceRedraw ||
          this.userMin !== (this.old && this.old.userMin) ||
          this.userMax !== (this.old && this.old.userMax) ||
          this.alignToOthers()
            ? (this.stacking &&
                (this.stacking.resetStacks(), this.stacking.buildStacks()),
              (this.forceRedraw = !1),
              this.userMinRange || (this.minRange = void 0),
              this.getSeriesExtremes(),
              this.setTickInterval(),
              this.isDirty ||
                (this.isDirty =
                  f ||
                  this.min !== (this.old && this.old.min) ||
                  this.max !== (this.old && this.old.max)))
            : this.stacking && this.stacking.cleanStacks();
          b && this.panningState && (this.panningState.isDirty = !0);
          m(this, "afterSetScale");
        }
        setExtremes(b, d, f, a, c) {
          const p = this,
            g = p.chart;
          f = k(f, !0);
          p.series.forEach(function (b) {
            delete b.kdTree;
          });
          c = e(c, { min: b, max: d });
          m(p, "setExtremes", c, function () {
            p.userMin = b;
            p.userMax = d;
            p.eventArgs = c;
            f && g.redraw(a);
          });
        }
        zoom(b, d) {
          const f = this,
            a = this.dataMin,
            e = this.dataMax,
            c = this.options,
            p = Math.min(a, k(c.min, a)),
            h = Math.max(e, k(c.max, e));
          b = { newMin: b, newMax: d };
          m(this, "zoom", b, function (b) {
            let d = b.newMin,
              k = b.newMax;
            if (d !== f.min || k !== f.max)
              f.allowZoomOutside ||
                (g(a) && (d < p && (d = p), d > h && (d = h)),
                g(e) && (k < p && (k = p), k > h && (k = h))),
                (f.displayBtn =
                  "undefined" !== typeof d || "undefined" !== typeof k),
                f.setExtremes(d, k, !1, void 0, { trigger: "zoom" });
            b.zoomed = !0;
          });
          return b.zoomed;
        }
        setAxisSize() {
          const b = this.chart;
          var d = this.options;
          const f = d.offsets || [0, 0, 0, 0],
            a = this.horiz,
            e = (this.width = Math.round(
              O(k(d.width, b.plotWidth - f[3] + f[1]), b.plotWidth)
            )),
            c = (this.height = Math.round(
              O(k(d.height, b.plotHeight - f[0] + f[2]), b.plotHeight)
            )),
            p = (this.top = Math.round(
              O(k(d.top, b.plotTop + f[0]), b.plotHeight, b.plotTop)
            ));
          d = this.left = Math.round(
            O(k(d.left, b.plotLeft + f[3]), b.plotWidth, b.plotLeft)
          );
          this.bottom = b.chartHeight - c - p;
          this.right = b.chartWidth - e - d;
          this.len = Math.max(a ? e : c, 0);
          this.pos = a ? d : p;
        }
        getExtremes() {
          const b = this.logarithmic;
          return {
            min: b ? q(b.lin2log(this.min)) : this.min,
            max: b ? q(b.lin2log(this.max)) : this.max,
            dataMin: this.dataMin,
            dataMax: this.dataMax,
            userMin: this.userMin,
            userMax: this.userMax,
          };
        }
        getThreshold(b) {
          var d = this.logarithmic;
          const f = d ? d.lin2log(this.min) : this.min;
          d = d ? d.lin2log(this.max) : this.max;
          null === b || -Infinity === b
            ? (b = f)
            : Infinity === b
            ? (b = d)
            : f > b
            ? (b = f)
            : d < b && (b = d);
          return this.translate(b, 0, 1, 0, 1);
        }
        autoLabelAlign(b) {
          const d = (k(b, 0) - 90 * this.side + 720) % 360;
          b = { align: "center" };
          m(this, "autoLabelAlign", b, function (b) {
            15 < d && 165 > d
              ? (b.align = "right")
              : 195 < d && 345 > d && (b.align = "left");
          });
          return b.align;
        }
        tickSize(b) {
          const d = this.options,
            f = k(
              d["tick" === b ? "tickWidth" : "minorTickWidth"],
              "tick" === b && this.isXAxis && !this.categories ? 1 : 0
            );
          let a = d["tick" === b ? "tickLength" : "minorTickLength"],
            e;
          f && a && ("inside" === d[b + "Position"] && (a = -a), (e = [a, f]));
          b = { tickSize: e };
          m(this, "afterTickSize", b);
          return b.tickSize;
        }
        labelMetrics() {
          const b = this.chart.renderer;
          var d = this.ticks;
          d = d[Object.keys(d)[0]] || {};
          return this.chart.renderer.fontMetrics(
            d.label || d.movedLabel || b.box
          );
        }
        unsquish() {
          const b = this.options.labels;
          var d = this.horiz;
          const f = this.tickInterval,
            a =
              this.len /
              (((this.categories ? 1 : 0) + this.max - this.min) / f),
            e = b.rotation,
            c = 0.75 * this.labelMetrics().h,
            m = Math.max(this.max - this.min, 0),
            g = function (b) {
              let d = b / (a || 1);
              d = 1 < d ? Math.ceil(d) : 1;
              d * f > m &&
                Infinity !== b &&
                Infinity !== a &&
                m &&
                (d = Math.ceil(m / f));
              return q(d * f);
            };
          let h = f,
            l,
            u = Number.MAX_VALUE,
            r;
          if (d) {
            if (
              (b.staggerLines ||
                (p(e)
                  ? (r = [e])
                  : a < b.autoRotationLimit && (r = b.autoRotation)),
              r)
            ) {
              let b;
              for (const f of r)
                if (f === e || (f && -90 <= f && 90 >= f))
                  (d = g(Math.abs(c / Math.sin(n * f)))),
                    (b = d + Math.abs(f / 360)),
                    b < u && ((u = b), (l = f), (h = d));
            }
          } else h = g(c);
          this.autoRotation = r;
          this.labelRotation = k(l, p(e) ? e : 0);
          return b.step ? f : h;
        }
        getSlotWidth(b) {
          const d = this.chart,
            f = this.horiz,
            a = this.options.labels,
            e = Math.max(
              this.tickPositions.length - (this.categories ? 0 : 1),
              1
            ),
            k = d.margin[3];
          if (b && p(b.slotWidth)) return b.slotWidth;
          if (f && 2 > a.step)
            return a.rotation ? 0 : ((this.staggerLines || 1) * this.len) / e;
          if (!f) {
            b = a.style.width;
            if (void 0 !== b) return parseInt(String(b), 10);
            if (k) return k - d.spacing[3];
          }
          return 0.33 * d.chartWidth;
        }
        renderUnsquish() {
          const b = this.chart,
            d = b.renderer,
            f = this.tickPositions,
            a = this.ticks,
            e = this.options.labels,
            k = e.style,
            c = this.horiz,
            p = this.getSlotWidth();
          var m = Math.max(1, Math.round(p - 2 * e.padding));
          const g = {},
            h = this.labelMetrics(),
            l = k.textOverflow;
          let u,
            n,
            r = 0;
          H(e.rotation) || (g.rotation = e.rotation || 0);
          f.forEach(function (b) {
            b = a[b];
            b.movedLabel && b.replaceMovedLabel();
            b &&
              b.label &&
              b.label.textPxLength > r &&
              (r = b.label.textPxLength);
          });
          this.maxLabelLength = r;
          if (this.autoRotation)
            r > m && r > h.h
              ? (g.rotation = this.labelRotation)
              : (this.labelRotation = 0);
          else if (p && ((u = m), !l))
            for (n = "clip", m = f.length; !c && m--; ) {
              var q = f[m];
              if ((q = a[q].label))
                q.styles && "ellipsis" === q.styles.textOverflow
                  ? q.css({ textOverflow: "clip" })
                  : q.textPxLength > p && q.css({ width: p + "px" }),
                  q.getBBox().height > this.len / f.length - (h.h - h.f) &&
                    (q.specificTextOverflow = "ellipsis");
            }
          g.rotation &&
            ((u = r > 0.5 * b.chartHeight ? 0.33 * b.chartHeight : r),
            l || (n = "ellipsis"));
          if (
            (this.labelAlign =
              e.align || this.autoLabelAlign(this.labelRotation))
          )
            g.align = this.labelAlign;
          f.forEach(function (b) {
            const d = (b = a[b]) && b.label,
              f = k.width,
              e = {};
            d &&
              (d.attr(g),
              b.shortenLabel
                ? b.shortenLabel()
                : u &&
                  !f &&
                  "nowrap" !== k.whiteSpace &&
                  (u < d.textPxLength || "SPAN" === d.element.tagName)
                ? ((e.width = u + "px"),
                  l || (e.textOverflow = d.specificTextOverflow || n),
                  d.css(e))
                : d.styles &&
                  d.styles.width &&
                  !e.width &&
                  !f &&
                  d.css({ width: null }),
              delete d.specificTextOverflow,
              (b.rotation = g.rotation));
          }, this);
          this.tickRotCorr = d.rotCorr(
            h.b,
            this.labelRotation || 0,
            0 !== this.side
          );
        }
        hasData() {
          return (
            this.series.some(function (b) {
              return b.hasData();
            }) ||
            (this.options.showEmpty && g(this.min) && g(this.max))
          );
        }
        addTitle(d) {
          const f = this.chart.renderer,
            a = this.horiz,
            e = this.opposite,
            k = this.options.title,
            c = this.chart.styledMode;
          let p;
          this.axisTitle ||
            ((p = k.textAlign) ||
              (p = (
                a
                  ? { low: "left", middle: "center", high: "right" }
                  : {
                      low: e ? "right" : "left",
                      middle: "center",
                      high: e ? "left" : "right",
                    }
              )[k.align]),
            (this.axisTitle = f
              .text(k.text || "", 0, 0, k.useHTML)
              .attr({ zIndex: 7, rotation: k.rotation, align: p })
              .addClass("highcharts-axis-title")),
            c || this.axisTitle.css(b(k.style)),
            this.axisTitle.add(this.axisGroup),
            (this.axisTitle.isNew = !0));
          c ||
            k.style.width ||
            this.isRadial ||
            this.axisTitle.css({ width: this.len + "px" });
          this.axisTitle[d ? "show" : "hide"](d);
        }
        generateTick(b) {
          const d = this.ticks;
          d[b] ? d[b].addLabel() : (d[b] = new C(this, b));
        }
        getOffset() {
          const b = this,
            {
              chart: f,
              horiz: a,
              options: e,
              side: c,
              ticks: h,
              tickPositions: l,
              coll: u,
              axisParent: n,
            } = b,
            r = f.renderer,
            q = f.inverted && !b.isZAxis ? [1, 0, 3, 2][c] : c;
          var E = b.hasData();
          const w = e.title;
          var O = e.labels;
          const N = p(e.crossing);
          var H = f.axisOffset;
          const t = f.clipOffset,
            X = [-1, 1, 1, -1][c],
            aa = e.className;
          let ea,
            J = 0,
            v;
          var x = 0;
          let F = 0;
          b.showAxis = ea = E || e.showEmpty;
          b.staggerLines = (b.horiz && O.staggerLines) || void 0;
          if (!b.axisGroup) {
            const d = (b, d, f) =>
              r
                .g(b)
                .attr({ zIndex: f })
                .addClass(
                  `highcharts-${u.toLowerCase()}${d} ` +
                    (this.isRadial ? `highcharts-radial-axis${d} ` : "") +
                    (aa || "")
                )
                .add(n);
            b.gridGroup = d("grid", "-grid", e.gridZIndex);
            b.axisGroup = d("axis", "", e.zIndex);
            b.labelGroup = d("axis-labels", "-labels", O.zIndex);
          }
          E || b.isLinked
            ? (l.forEach(function (d) {
                b.generateTick(d);
              }),
              b.renderUnsquish(),
              (b.reserveSpaceDefault =
                0 === c ||
                2 === c ||
                { 1: "left", 3: "right" }[c] === b.labelAlign),
              k(
                O.reserveSpace,
                N ? !1 : null,
                "center" === b.labelAlign ? !0 : null,
                b.reserveSpaceDefault
              ) &&
                l.forEach(function (b) {
                  F = Math.max(h[b].getLabelSize(), F);
                }),
              b.staggerLines && (F *= b.staggerLines),
              (b.labelOffset = F * (b.opposite ? -1 : 1)))
            : d(h, function (b, d) {
                b.destroy();
                delete h[d];
              });
          w &&
            w.text &&
            !1 !== w.enabled &&
            (b.addTitle(ea),
            ea &&
              !N &&
              !1 !== w.reserveSpace &&
              ((b.titleOffset = J =
                b.axisTitle.getBBox()[a ? "height" : "width"]),
              (v = w.offset),
              (x = g(v) ? 0 : k(w.margin, a ? 5 : 10))));
          b.renderLine();
          b.offset = X * k(e.offset, H[c] ? H[c] + (e.margin || 0) : 0);
          b.tickRotCorr = b.tickRotCorr || { x: 0, y: 0 };
          E = 0 === c ? -b.labelMetrics().h : 2 === c ? b.tickRotCorr.y : 0;
          x = Math.abs(F) + x;
          F &&
            (x =
              x -
              E +
              X *
                (a
                  ? k(O.y, b.tickRotCorr.y + X * O.distance)
                  : k(O.x, X * O.distance)));
          b.axisTitleMargin = k(v, x);
          b.getMaxLabelDimensions &&
            (b.maxLabelDimensions = b.getMaxLabelDimensions(h, l));
          "colorAxis" !== u &&
            ((O = this.tickSize("tick")),
            (H[c] = Math.max(
              H[c],
              (b.axisTitleMargin || 0) + J + X * b.offset,
              x,
              l && l.length && O ? O[0] + X * b.offset : 0
            )),
            (H =
              !b.axisLine || e.offset
                ? 0
                : 2 * Math.floor(b.axisLine.strokeWidth() / 2)),
            (t[q] = Math.max(t[q], H)));
          m(this, "afterGetOffset");
        }
        getLinePath(b) {
          const d = this.chart,
            f = this.opposite;
          var a = this.offset;
          const e = this.horiz,
            k = this.left + (f ? this.width : 0) + a;
          a = d.chartHeight - this.bottom - (f ? this.height : 0) + a;
          f && (b *= -1);
          return d.renderer.crispLine(
            [
              ["M", e ? this.left : k, e ? a : this.top],
              [
                "L",
                e ? d.chartWidth - this.right : k,
                e ? a : d.chartHeight - this.bottom,
              ],
            ],
            b
          );
        }
        renderLine() {
          this.axisLine ||
            ((this.axisLine = this.chart.renderer
              .path()
              .addClass("highcharts-axis-line")
              .add(this.axisGroup)),
            this.chart.styledMode ||
              this.axisLine.attr({
                stroke: this.options.lineColor,
                "stroke-width": this.options.lineWidth,
                zIndex: 7,
              }));
        }
        getTitlePosition(b) {
          var d = this.horiz,
            f = this.left;
          const a = this.top;
          var e = this.len;
          const k = this.options.title,
            c = d ? f : a,
            p = this.opposite,
            g = this.offset,
            h = k.x,
            l = k.y,
            u = this.chart.renderer.fontMetrics(b);
          b = b ? Math.max(b.getBBox(!1, 0).height - u.h - 1, 0) : 0;
          e = {
            low: c + (d ? 0 : e),
            middle: c + e / 2,
            high: c + (d ? e : 0),
          }[k.align];
          f =
            (d ? a + this.height : f) +
            (d ? 1 : -1) * (p ? -1 : 1) * (this.axisTitleMargin || 0) +
            [-b, b, u.f, -b][this.side];
          d = {
            x: d ? e + h : f + (p ? this.width : 0) + g + h,
            y: d ? f + l - (p ? this.height : 0) + g : e + l,
          };
          m(this, "afterGetTitlePosition", { titlePosition: d });
          return d;
        }
        renderMinorTick(b, d) {
          const f = this.minorTicks;
          f[b] || (f[b] = new C(this, b, "minor"));
          d && f[b].isNew && f[b].render(null, !0);
          f[b].render(null, !1, 1);
        }
        renderTick(b, d, f) {
          const a = this.ticks;
          if (
            !this.isLinked ||
            (b >= this.min && b <= this.max) ||
            (this.grid && this.grid.isColumn)
          )
            a[b] || (a[b] = new C(this, b)),
              f && a[b].isNew && a[b].render(d, !0, -1),
              a[b].render(d);
        }
        render() {
          const b = this,
            f = b.chart,
            a = b.logarithmic,
            e = b.options,
            k = b.isLinked,
            c = b.tickPositions,
            g = b.axisTitle,
            h = b.ticks,
            l = b.minorTicks,
            u = b.alternateBands,
            n = e.stackLabels,
            r = e.alternateGridColor,
            q = e.crossing,
            E = b.tickmarkOffset,
            w = b.axisLine,
            O = b.showAxis,
            H = t(f.renderer.globalAnimation);
          let N, aa;
          b.labelEdge.length = 0;
          b.overlap = !1;
          [h, l, u].forEach(function (b) {
            d(b, function (b) {
              b.isActive = !1;
            });
          });
          if (p(q)) {
            const b = this.isXAxis ? f.yAxis[0] : f.xAxis[0],
              d = [1, -1, -1, 1][this.side];
            b && (this.offset = d * b.toPixels(q, !0));
          }
          if (b.hasData() || k) {
            const d = b.chart.hasRendered && b.old && p(b.old.min);
            b.minorTickInterval &&
              !b.categories &&
              b.getMinorTickPositions().forEach(function (f) {
                b.renderMinorTick(f, d);
              });
            c.length &&
              (c.forEach(function (f, a) {
                b.renderTick(f, a, d);
              }),
              E &&
                (0 === b.min || b.single) &&
                (h[-1] || (h[-1] = new C(b, -1, null, !0)), h[-1].render(-1)));
            r &&
              c.forEach(function (d, e) {
                aa = "undefined" !== typeof c[e + 1] ? c[e + 1] + E : b.max - E;
                0 === e % 2 &&
                  d < b.max &&
                  aa <= b.max + (f.polar ? -E : E) &&
                  (u[d] || (u[d] = new D.PlotLineOrBand(b)),
                  (N = d + E),
                  (u[d].options = {
                    from: a ? a.lin2log(N) : N,
                    to: a ? a.lin2log(aa) : aa,
                    color: r,
                    className: "highcharts-alternate-grid",
                  }),
                  u[d].render(),
                  (u[d].isActive = !0));
              });
            b._addedPlotLB ||
              ((b._addedPlotLB = !0),
              (e.plotLines || [])
                .concat(e.plotBands || [])
                .forEach(function (d) {
                  b.addPlotBandOrLine(d);
                }));
          }
          [h, l, u].forEach(function (b) {
            const a = [],
              e = H.duration;
            d(b, function (b, d) {
              b.isActive || (b.render(d, !1, 0), (b.isActive = !1), a.push(d));
            });
            Z(
              function () {
                let d = a.length;
                for (; d--; )
                  b[a[d]] &&
                    !b[a[d]].isActive &&
                    (b[a[d]].destroy(), delete b[a[d]]);
              },
              b !== u && f.hasRendered && e ? e : 0
            );
          });
          w &&
            (w[w.isPlaced ? "animate" : "attr"]({
              d: this.getLinePath(w.strokeWidth()),
            }),
            (w.isPlaced = !0),
            w[O ? "show" : "hide"](O));
          g &&
            O &&
            (g[g.isNew ? "attr" : "animate"](b.getTitlePosition(g)),
            (g.isNew = !1));
          n && n.enabled && b.stacking && b.stacking.renderStackTotals();
          b.old = {
            len: b.len,
            max: b.max,
            min: b.min,
            transA: b.transA,
            userMax: b.userMax,
            userMin: b.userMin,
          };
          b.isDirty = !1;
          m(this, "afterRender");
        }
        redraw() {
          this.visible &&
            (this.render(),
            this.plotLinesAndBands.forEach(function (b) {
              b.render();
            }));
          this.series.forEach(function (b) {
            b.isDirty = !0;
          });
        }
        getKeepProps() {
          return this.keepProps || U.keepProps;
        }
        destroy(b) {
          const f = this,
            a = f.plotLinesAndBands,
            e = this.eventOptions;
          m(this, "destroy", { keepEvents: b });
          b || N(f);
          [f.ticks, f.minorTicks, f.alternateBands].forEach(function (b) {
            w(b);
          });
          if (a) for (b = a.length; b--; ) a[b].destroy();
          "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar"
            .split(" ")
            .forEach(function (b) {
              f[b] && (f[b] = f[b].destroy());
            });
          for (const b in f.plotLinesAndBandsGroups)
            f.plotLinesAndBandsGroups[b] =
              f.plotLinesAndBandsGroups[b].destroy();
          d(f, function (b, d) {
            -1 === f.getKeepProps().indexOf(d) && delete f[d];
          });
          this.eventOptions = e;
        }
        drawCrosshair(b, d) {
          const f = this.crosshair;
          var a = k(f && f.snap, !0);
          const c = this.chart;
          let p,
            h = this.cross;
          m(this, "drawCrosshair", { e: b, point: d });
          b || (b = this.cross && this.cross.e);
          if (f && !1 !== (g(d) || !a)) {
            a
              ? g(d) &&
                (p = k(
                  "colorAxis" !== this.coll ? d.crosshairPos : null,
                  this.isXAxis ? d.plotX : this.len - d.plotY
                ))
              : (p =
                  b &&
                  (this.horiz
                    ? b.chartX - this.pos
                    : this.len - b.chartY + this.pos));
            if (g(p)) {
              var l = {
                value: d && (this.isXAxis ? d.x : k(d.stackY, d.y)),
                translatedValue: p,
              };
              c.polar &&
                e(l, {
                  isCrosshair: !0,
                  chartX: b && b.chartX,
                  chartY: b && b.chartY,
                  point: d,
                });
              l = this.getPlotLinePath(l) || null;
            }
            if (!g(l)) {
              this.hideCrosshair();
              return;
            }
            a = this.categories && !this.isRadial;
            h ||
              ((this.cross = h =
                c.renderer
                  .path()
                  .addClass(
                    "highcharts-crosshair highcharts-crosshair-" +
                      (a ? "category " : "thin ") +
                      (f.className || "")
                  )
                  .attr({ zIndex: k(f.zIndex, 2) })
                  .add()),
              c.styledMode ||
                (h
                  .attr({
                    stroke:
                      f.color ||
                      (a
                        ? G.parse("#ccd3ff").setOpacity(0.25).get()
                        : "#cccccc"),
                    "stroke-width": k(f.width, 1),
                  })
                  .css({ "pointer-events": "none" }),
                f.dashStyle && h.attr({ dashstyle: f.dashStyle })));
            h.show().attr({ d: l });
            a && !f.width && h.attr({ "stroke-width": this.transA });
            this.cross.e = b;
          } else this.hideCrosshair();
          m(this, "afterDrawCrosshair", { e: b, point: d });
        }
        hideCrosshair() {
          this.cross && this.cross.hide();
          m(this, "afterHideCrosshair");
        }
        hasVerticalPanning() {
          const b = this.chart.options.chart.panning;
          return !!(b && b.enabled && /y/.test(b.type));
        }
        update(d, f) {
          const a = this.chart;
          d = b(this.userOptions, d);
          this.destroy(!0);
          this.init(a, d);
          a.isDirtyBox = !0;
          k(f, !0) && a.redraw();
        }
        remove(b) {
          const d = this.chart,
            f = this.coll,
            a = this.series;
          let e = a.length;
          for (; e--; ) a[e] && a[e].remove(!1);
          J(d.axes, this);
          J(d[f], this);
          d[f].forEach(function (b, d) {
            b.options.index = b.userOptions.index = d;
          });
          this.destroy();
          d.isDirtyBox = !0;
          k(b, !0) && d.redraw();
        }
        setTitle(b, d) {
          this.update({ title: b }, d);
        }
        setCategories(b, d) {
          this.update({ categories: b }, d);
        }
      }
      U.defaultOptions = y.defaultXAxisOptions;
      U.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
      ("");
      return U;
    }
  );
  M(a, "Core/Axis/DateTimeAxis.js", [a["Core/Utilities.js"]], function (a) {
    const {
      addEvent: x,
      getMagnitude: G,
      normalizeTickInterval: L,
      timeUnits: A,
    } = a;
    var D;
    (function (y) {
      function z() {
        return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
      }
      function t(a) {
        "datetime" !== a.userOptions.type
          ? (this.dateTime = void 0)
          : this.dateTime || (this.dateTime = new c(this));
      }
      const v = [];
      y.compose = function (c) {
        a.pushUnique(v, c) &&
          (c.keepProps.push("dateTime"),
          (c.prototype.getTimeTicks = z),
          x(c, "init", t));
        return c;
      };
      class c {
        constructor(a) {
          this.axis = a;
        }
        normalizeTimeTickInterval(a, c) {
          const l = c || [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1, 2]],
            ["week", [1, 2]],
            ["month", [1, 2, 3, 4, 6]],
            ["year", null],
          ];
          c = l[l.length - 1];
          let h = A[c[0]],
            n = c[1],
            g;
          for (
            g = 0;
            g < l.length &&
            !((c = l[g]),
            (h = A[c[0]]),
            (n = c[1]),
            l[g + 1] && a <= (h * n[n.length - 1] + A[l[g + 1][0]]) / 2);
            g++
          );
          h === A.year && a < 5 * h && (n = [1, 2, 5]);
          a = L(a / h, n, "year" === c[0] ? Math.max(G(a / h), 1) : 1);
          return { unitRange: h, count: a, unitName: c[0] };
        }
        getXDateFormat(a, c) {
          const { axis: l } = this,
            h = l.chart.time;
          return l.closestPointRange
            ? h.getDateFormat(
                l.closestPointRange,
                a,
                l.options.startOfWeek,
                c
              ) || h.resolveDTLFormat(c.year).main
            : h.resolveDTLFormat(c.day).main;
        }
      }
      y.Additions = c;
    })(D || (D = {}));
    return D;
  });
  M(a, "Core/Axis/LogarithmicAxis.js", [a["Core/Utilities.js"]], function (a) {
    const { addEvent: x, normalizeTickInterval: G, pick: L } = a;
    var A;
    (function (y) {
      function C(a) {
        let c = this.logarithmic;
        "logarithmic" !== a.userOptions.type
          ? (this.logarithmic = void 0)
          : c || (this.logarithmic = new v(this));
      }
      function z() {
        const a = this.logarithmic;
        a &&
          ((this.lin2val = function (c) {
            return a.lin2log(c);
          }),
          (this.val2lin = function (c) {
            return a.log2lin(c);
          }));
      }
      const t = [];
      y.compose = function (c) {
        a.pushUnique(t, c) &&
          (c.keepProps.push("logarithmic"),
          x(c, "init", C),
          x(c, "afterInit", z));
        return c;
      };
      class v {
        constructor(a) {
          this.axis = a;
        }
        getLogTickPositions(a, n, r, l) {
          const c = this.axis;
          var q = c.len,
            g = c.options;
          let w = [];
          l || (this.minorAutoInterval = void 0);
          if (0.5 <= a)
            (a = Math.round(a)), (w = c.getLinearTickPositions(a, n, r));
          else if (0.08 <= a) {
            g = Math.floor(n);
            let c, h, e, m, u;
            for (
              q =
                0.3 < a
                  ? [1, 2, 4]
                  : 0.15 < a
                  ? [1, 2, 4, 6, 8]
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9];
              g < r + 1 && !u;
              g++
            )
              for (h = q.length, c = 0; c < h && !u; c++)
                (e = this.log2lin(this.lin2log(g) * q[c])),
                  e > n &&
                    (!l || m <= r) &&
                    "undefined" !== typeof m &&
                    w.push(m),
                  m > r && (u = !0),
                  (m = e);
          } else
            (n = this.lin2log(n)),
              (r = this.lin2log(r)),
              (a = l ? c.getMinorTickInterval() : g.tickInterval),
              (a = L(
                "auto" === a ? null : a,
                this.minorAutoInterval,
                ((g.tickPixelInterval / (l ? 5 : 1)) * (r - n)) /
                  ((l ? q / c.tickPositions.length : q) || 1)
              )),
              (a = G(a)),
              (w = c.getLinearTickPositions(a, n, r).map(this.log2lin)),
              l || (this.minorAutoInterval = a / 5);
          l || (c.tickInterval = a);
          return w;
        }
        lin2log(a) {
          return Math.pow(10, a);
        }
        log2lin(a) {
          return Math.log(a) / Math.LN10;
        }
      }
      y.Additions = v;
    })(A || (A = {}));
    return A;
  });
  M(
    a,
    "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js",
    [a["Core/Utilities.js"]],
    function (a) {
      const { erase: x, extend: G, isNumber: L } = a;
      var A;
      (function (y) {
        function C(a) {
          return this.addPlotBandOrLine(a, "plotBands");
        }
        function z(a, c) {
          const g = this.userOptions;
          let l = new h(this, a);
          this.visible && (l = l.render());
          if (l) {
            this._addedPlotLB ||
              ((this._addedPlotLB = !0),
              (g.plotLines || []).concat(g.plotBands || []).forEach((a) => {
                this.addPlotBandOrLine(a);
              }));
            if (c) {
              const h = g[c] || [];
              h.push(a);
              g[c] = h;
            }
            this.plotLinesAndBands.push(l);
          }
          return l;
        }
        function t(a) {
          return this.addPlotBandOrLine(a, "plotLines");
        }
        function v(a, c, h = this.options) {
          const g = this.getPlotLinePath({
              value: c,
              force: !0,
              acrossPanes: h.acrossPanes,
            }),
            l = [],
            e = this.horiz;
          c =
            !L(this.min) ||
            !L(this.max) ||
            (a < this.min && c < this.min) ||
            (a > this.max && c > this.max);
          a = this.getPlotLinePath({
            value: a,
            force: !0,
            acrossPanes: h.acrossPanes,
          });
          h = 1;
          let m;
          if (a && g)
            for (
              c && ((m = a.toString() === g.toString()), (h = 0)), c = 0;
              c < a.length;
              c += 2
            ) {
              const u = a[c],
                p = a[c + 1],
                n = g[c],
                b = g[c + 1];
              ("M" !== u[0] && "L" !== u[0]) ||
                ("M" !== p[0] && "L" !== p[0]) ||
                ("M" !== n[0] && "L" !== n[0]) ||
                ("M" !== b[0] && "L" !== b[0]) ||
                (e && n[1] === u[1]
                  ? ((n[1] += h), (b[1] += h))
                  : e || n[2] !== u[2] || ((n[2] += h), (b[2] += h)),
                l.push(
                  ["M", u[1], u[2]],
                  ["L", p[1], p[2]],
                  ["L", b[1], b[2]],
                  ["L", n[1], n[2]],
                  ["Z"]
                ));
              l.isFlat = m;
            }
          return l;
        }
        function c(a) {
          this.removePlotBandOrLine(a);
        }
        function n(a) {
          const c = this.plotLinesAndBands,
            h = this.options,
            l = this.userOptions;
          if (c) {
            let g = c.length;
            for (; g--; ) c[g].id === a && c[g].destroy();
            [
              h.plotLines || [],
              l.plotLines || [],
              h.plotBands || [],
              l.plotBands || [],
            ].forEach(function (e) {
              for (g = e.length; g--; ) (e[g] || {}).id === a && x(e, e[g]);
            });
          }
        }
        function r(a) {
          this.removePlotBandOrLine(a);
        }
        const l = [];
        let h;
        y.compose = function (q, g) {
          h || (h = q);
          a.pushUnique(l, g) &&
            G(g.prototype, {
              addPlotBand: C,
              addPlotLine: t,
              addPlotBandOrLine: z,
              getPlotBandPath: v,
              removePlotBand: c,
              removePlotLine: r,
              removePlotBandOrLine: n,
            });
          return g;
        };
      })(A || (A = {}));
      return A;
    }
  );
  M(
    a,
    "Core/Axis/PlotLineOrBand/PlotLineOrBand.js",
    [
      a["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y) {
      const {
        arrayMax: x,
        arrayMin: L,
        defined: A,
        destroyObjectProperties: D,
        erase: C,
        fireEvent: z,
        merge: t,
        objectEach: v,
        pick: c,
      } = y;
      class n {
        static compose(c) {
          return a.compose(n, c);
        }
        constructor(a, c) {
          this.axis = a;
          c && ((this.options = c), (this.id = c.id));
        }
        render() {
          z(this, "render");
          const a = this,
            l = a.axis,
            h = l.horiz;
          var n = l.logarithmic;
          const g = a.options,
            w = g.color,
            x = c(g.zIndex, 0),
            F = g.events,
            e = {},
            m = l.chart.renderer;
          let u = g.label,
            p = a.label,
            H = g.to,
            b = g.from,
            f = g.value,
            d = a.svgElem;
          var k = [];
          const O = A(b) && A(H);
          k = A(f);
          const N = !d,
            E = {
              class:
                "highcharts-plot-" +
                (O ? "band " : "line ") +
                (g.className || ""),
            };
          let Z = O ? "bands" : "lines";
          n && ((b = n.log2lin(b)), (H = n.log2lin(H)), (f = n.log2lin(f)));
          l.chart.styledMode ||
            (k
              ? ((E.stroke = w || "#999999"),
                (E["stroke-width"] = c(g.width, 1)),
                g.dashStyle && (E.dashstyle = g.dashStyle))
              : O &&
                ((E.fill = w || "#e6e9ff"),
                g.borderWidth &&
                  ((E.stroke = g.borderColor),
                  (E["stroke-width"] = g.borderWidth))));
          e.zIndex = x;
          Z += "-" + x;
          (n = l.plotLinesAndBandsGroups[Z]) ||
            (l.plotLinesAndBandsGroups[Z] = n =
              m
                .g("plot-" + Z)
                .attr(e)
                .add());
          N && (a.svgElem = d = m.path().attr(E).add(n));
          if (k)
            k = l.getPlotLinePath({
              value: f,
              lineWidth: d.strokeWidth(),
              acrossPanes: g.acrossPanes,
            });
          else if (O) k = l.getPlotBandPath(b, H, g);
          else return;
          !a.eventsAdded &&
            F &&
            (v(F, function (b, f) {
              d.on(f, function (b) {
                F[f].apply(a, [b]);
              });
            }),
            (a.eventsAdded = !0));
          (N || !d.d) && k && k.length
            ? d.attr({ d: k })
            : d &&
              (k
                ? (d.show(), d.animate({ d: k }))
                : d.d && (d.hide(), p && (a.label = p = p.destroy())));
          u &&
          (A(u.text) || A(u.formatter)) &&
          k &&
          k.length &&
          0 < l.width &&
          0 < l.height &&
          !k.isFlat
            ? ((u = t(
                {
                  align: h && O && "center",
                  x: h ? !O && 4 : 10,
                  verticalAlign: !h && O && "middle",
                  y: h ? (O ? 16 : 10) : O ? 6 : -4,
                  rotation: h && !O && 90,
                },
                u
              )),
              this.renderLabel(u, k, O, x))
            : p && p.hide();
          return a;
        }
        renderLabel(a, c, h, n) {
          const g = this.axis;
          var l = g.chart.renderer;
          let r = this.label;
          r ||
            ((this.label = r =
              l
                .text(this.getLabelText(a), 0, 0, a.useHTML)
                .attr({
                  align: a.textAlign || a.align,
                  rotation: a.rotation,
                  class:
                    "highcharts-plot-" +
                    (h ? "band" : "line") +
                    "-label " +
                    (a.className || ""),
                  zIndex: n,
                })
                .add()),
            g.chart.styledMode ||
              r.css(
                t({ fontSize: "0.8em", textOverflow: "ellipsis" }, a.style)
              ));
          n = c.xBounds || [c[0][1], c[1][1], h ? c[2][1] : c[0][1]];
          c = c.yBounds || [c[0][2], c[1][2], h ? c[2][2] : c[0][2]];
          h = L(n);
          l = L(c);
          r.align(a, !1, { x: h, y: l, width: x(n) - h, height: x(c) - l });
          (r.alignValue && "left" !== r.alignValue) ||
            ((a = a.clip ? g.width : g.chart.chartWidth),
            r.css({
              width:
                (90 === r.rotation
                  ? g.height - (r.alignAttr.y - g.top)
                  : a - (r.alignAttr.x - g.left)) + "px",
            }));
          r.show(!0);
        }
        getLabelText(a) {
          return A(a.formatter) ? a.formatter.call(this) : a.text;
        }
        destroy() {
          C(this.axis.plotLinesAndBands, this);
          delete this.axis;
          D(this);
        }
      }
      ("");
      ("");
      return n;
    }
  );
  M(
    a,
    "Core/Tooltip.js",
    [
      a["Core/FormatUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A) {
      const { format: x } = a,
        { doc: C, isSafari: z } = y,
        { distribute: t } = G,
        {
          addEvent: v,
          clamp: c,
          css: n,
          discardElement: r,
          extend: l,
          fireEvent: h,
          isArray: q,
          isNumber: g,
          isString: w,
          merge: J,
          pick: F,
          splat: e,
          syncTimeout: m,
        } = A;
      class u {
        constructor(a, e) {
          this.allowShared = !0;
          this.container = void 0;
          this.crosshairs = [];
          this.distance = 0;
          this.isHidden = !0;
          this.isSticky = !1;
          this.now = {};
          this.options = {};
          this.outside = !1;
          this.chart = a;
          this.init(a, e);
        }
        bodyFormatter(a) {
          return a.map(function (a) {
            const b = a.series.tooltipOptions;
            return (
              b[(a.point.formatPrefix || "point") + "Formatter"] ||
              a.point.tooltipFormatter
            ).call(
              a.point,
              b[(a.point.formatPrefix || "point") + "Format"] || ""
            );
          });
        }
        cleanSplit(a) {
          this.chart.series.forEach(function (e) {
            const b = e && e.tt;
            b && (!b.isActive || a ? (e.tt = b.destroy()) : (b.isActive = !1));
          });
        }
        defaultFormatter(a) {
          const c = this.points || e(this);
          let b;
          b = [a.tooltipFooterHeaderFormatter(c[0])];
          b = b.concat(a.bodyFormatter(c));
          b.push(a.tooltipFooterHeaderFormatter(c[0], !0));
          return b;
        }
        destroy() {
          this.label && (this.label = this.label.destroy());
          this.split &&
            (this.cleanSplit(!0), this.tt && (this.tt = this.tt.destroy()));
          this.renderer &&
            ((this.renderer = this.renderer.destroy()), r(this.container));
          A.clearTimeout(this.hideTimer);
          A.clearTimeout(this.tooltipTimeout);
        }
        getAnchor(a, c) {
          var b = this.chart;
          const f = b.pointer,
            d = b.inverted,
            k = b.plotTop;
          b = b.plotLeft;
          a = e(a);
          a[0].series &&
            a[0].series.yAxis &&
            !a[0].series.yAxis.options.reversedStacks &&
            (a = a.slice().reverse());
          if (this.followPointer && c)
            "undefined" === typeof c.chartX && (c = f.normalize(c)),
              (a = [c.chartX - b, c.chartY - k]);
          else if (a[0].tooltipPos) a = a[0].tooltipPos;
          else {
            let f = 0,
              e = 0;
            a.forEach(function (b) {
              if ((b = b.pos(!0))) (f += b[0]), (e += b[1]);
            });
            f /= a.length;
            e /= a.length;
            this.shared &&
              1 < a.length &&
              c &&
              (d ? (f = c.chartX) : (e = c.chartY));
            a = [f - b, e - k];
          }
          return a.map(Math.round);
        }
        getClassName(a, e, b) {
          const f = a.series,
            d = f.options;
          return [
            this.options.className,
            "highcharts-label",
            b && "highcharts-tooltip-header",
            e ? "highcharts-tooltip-box" : "highcharts-tooltip",
            !b && "highcharts-color-" + F(a.colorIndex, f.colorIndex),
            d && d.className,
          ]
            .filter(w)
            .join(" ");
        }
        getLabel() {
          const a = this,
            e = this.chart.styledMode,
            b = this.options,
            f = this.split && this.allowShared,
            d =
              b.style.pointerEvents ||
              (this.shouldStickOnContact() ? "auto" : "none");
          let c,
            m = this.chart.renderer;
          if (this.label) {
            var g = !this.label.hasClass("highcharts-label");
            ((!f && g) || (f && !g)) && this.destroy();
          }
          if (!this.label) {
            if (this.outside) {
              g = this.chart.options.chart.style;
              const b = L.getRendererType();
              this.container = c = y.doc.createElement("div");
              c.className = "highcharts-tooltip-container";
              n(c, {
                position: "absolute",
                top: "1px",
                pointerEvents: d,
                zIndex: Math.max(
                  this.options.style.zIndex || 0,
                  ((g && g.zIndex) || 0) + 3
                ),
              });
              y.doc.body.appendChild(c);
              this.renderer = m = new b(
                c,
                0,
                0,
                g,
                void 0,
                void 0,
                m.styledMode
              );
            }
            f
              ? (this.label = m.g("tooltip"))
              : ((this.label = m
                  .label(
                    "",
                    0,
                    0,
                    b.shape,
                    void 0,
                    void 0,
                    b.useHTML,
                    void 0,
                    "tooltip"
                  )
                  .attr({ padding: b.padding, r: b.borderRadius })),
                e ||
                  this.label
                    .attr({
                      fill: b.backgroundColor,
                      "stroke-width": b.borderWidth || 0,
                    })
                    .css(b.style)
                    .css({ pointerEvents: d }));
            if (a.outside) {
              const b = this.label,
                { xSetter: d, ySetter: f } = b;
              b.xSetter = function (f) {
                d.call(b, a.distance);
                c.style.left = f + "px";
              };
              b.ySetter = function (d) {
                f.call(b, a.distance);
                c.style.top = d + "px";
              };
            }
            this.label.attr({ zIndex: 8 }).shadow(b.shadow).add();
          }
          return this.label;
        }
        getPlayingField() {
          const { body: a, documentElement: e } = C,
            { chart: b, distance: f, outside: d } = this;
          return {
            width: d
              ? Math.max(
                  a.scrollWidth,
                  e.scrollWidth,
                  a.offsetWidth,
                  e.offsetWidth,
                  e.clientWidth
                ) -
                2 * f
              : b.chartWidth,
            height: d
              ? Math.max(
                  a.scrollHeight,
                  e.scrollHeight,
                  a.offsetHeight,
                  e.offsetHeight,
                  e.clientHeight
                )
              : b.chartHeight,
          };
        }
        getPosition(a, e, b) {
          const f = this.chart,
            d = this.distance,
            c = {},
            p = (f.inverted && b.h) || 0,
            m = this.outside;
          var g = this.getPlayingField();
          const h = g.width,
            l = g.height,
            u = f.pointer.getChartPosition();
          g = (c) => {
            const k = "x" === c;
            return [c, k ? h : l, k ? a : e].concat(
              m
                ? [
                    k ? a * u.scaleX : e * u.scaleY,
                    k
                      ? u.left - d + (b.plotX + f.plotLeft) * u.scaleX
                      : u.top - d + (b.plotY + f.plotTop) * u.scaleY,
                    0,
                    k ? h : l,
                  ]
                : [
                    k ? a : e,
                    k ? b.plotX + f.plotLeft : b.plotY + f.plotTop,
                    k ? f.plotLeft : f.plotTop,
                    k ? f.plotLeft + f.plotWidth : f.plotTop + f.plotHeight,
                  ]
            );
          };
          let n = g("y"),
            r = g("x"),
            q;
          g = !!b.negative;
          !f.polar &&
            f.hoverSeries &&
            f.hoverSeries.yAxis &&
            f.hoverSeries.yAxis.reversed &&
            (g = !g);
          const w = !this.followPointer && F(b.ttBelow, !f.inverted === g),
            H = function (b, a, f, e, k, g, h) {
              const l = m ? ("y" === b ? d * u.scaleY : d * u.scaleX) : d,
                n = (f - e) / 2,
                B = e < k - d,
                r = k + d + e < a,
                q = k - l - f + n;
              k = k + l - n;
              if (w && r) c[b] = k;
              else if (!w && B) c[b] = q;
              else if (B) c[b] = Math.min(h - e, 0 > q - p ? q : q - p);
              else if (r) c[b] = Math.max(g, k + p + f > a ? k : k + p);
              else return !1;
            },
            B = function (b, a, f, e, k) {
              let p;
              k < d || k > a - d
                ? (p = !1)
                : (c[b] =
                    k < f / 2 ? 1 : k > a - e / 2 ? a - e - 2 : k - f / 2);
              return p;
            },
            P = function (b) {
              const d = n;
              n = r;
              r = d;
              q = b;
            },
            I = function () {
              !1 !== H.apply(0, n)
                ? !1 !== B.apply(0, r) || q || (P(!0), I())
                : q
                ? (c.x = c.y = 0)
                : (P(!0), I());
            };
          (f.inverted || 1 < this.len) && P();
          I();
          return c;
        }
        hide(a) {
          const e = this;
          A.clearTimeout(this.hideTimer);
          a = F(a, this.options.hideDelay);
          this.isHidden ||
            (this.hideTimer = m(function () {
              e.getLabel().fadeOut(a ? void 0 : a);
              e.isHidden = !0;
            }, a));
        }
        init(a, e) {
          this.chart = a;
          this.options = e;
          this.crosshairs = [];
          this.now = { x: 0, y: 0 };
          this.isHidden = !0;
          this.split = e.split && !a.inverted && !a.polar;
          this.shared = e.shared || this.split;
          this.outside = F(
            e.outside,
            !(!a.scrollablePixelsX && !a.scrollablePixelsY)
          );
        }
        shouldStickOnContact(a) {
          return !(
            this.followPointer ||
            !this.options.stickOnContact ||
            (a && !this.chart.pointer.inClass(a.target, "highcharts-tooltip"))
          );
        }
        move(a, e, b, f) {
          const d = this,
            c = d.now,
            m =
              !1 !== d.options.animation &&
              !d.isHidden &&
              (1 < Math.abs(a - c.x) || 1 < Math.abs(e - c.y)),
            p = d.followPointer || 1 < d.len;
          l(c, {
            x: m ? (2 * c.x + a) / 3 : a,
            y: m ? (c.y + e) / 2 : e,
            anchorX: p ? void 0 : m ? (2 * c.anchorX + b) / 3 : b,
            anchorY: p ? void 0 : m ? (c.anchorY + f) / 2 : f,
          });
          d.getLabel().attr(c);
          d.drawTracker();
          m &&
            (A.clearTimeout(this.tooltipTimeout),
            (this.tooltipTimeout = setTimeout(function () {
              d && d.move(a, e, b, f);
            }, 32)));
        }
        refresh(a, c) {
          const b = this.chart,
            f = this.options,
            d = b.pointer,
            k = e(a),
            m = k[0],
            p = [];
          var g = f.formatter || this.defaultFormatter,
            l = this.shared;
          const u = b.styledMode;
          let n = {};
          if (f.enabled && m.series) {
            A.clearTimeout(this.hideTimer);
            this.allowShared = !(!q(a) && a.series && a.series.noSharedTooltip);
            this.followPointer =
              !this.split && m.series.tooltipOptions.followPointer;
            a = this.getAnchor(a, c);
            var r = a[0],
              w = a[1];
            l && this.allowShared
              ? (d.applyInactiveState(k),
                k.forEach(function (b) {
                  b.setState("hover");
                  p.push(b.getLabelConfig());
                }),
                (n = { x: m.category, y: m.y }),
                (n.points = p))
              : (n = m.getLabelConfig());
            this.len = p.length;
            g = g.call(n, this);
            l = m.series;
            this.distance = F(l.tooltipOptions.distance, 16);
            if (!1 === g) this.hide();
            else {
              if (this.split && this.allowShared) this.renderSplit(g, k);
              else {
                let e = r,
                  p = w;
                c &&
                  d.isDirectTouch &&
                  ((e = c.chartX - b.plotLeft), (p = c.chartY - b.plotTop));
                if (
                  b.polar ||
                  !1 === l.options.clip ||
                  k.some(
                    (b) => d.isDirectTouch || b.series.shouldShowTooltip(e, p)
                  )
                )
                  (c = this.getLabel()),
                    (f.style.width && !u) ||
                      c.css({
                        width:
                          (this.outside ? this.getPlayingField() : b.spacingBox)
                            .width + "px",
                      }),
                    c.attr({ text: g && g.join ? g.join("") : g }),
                    c.addClass(this.getClassName(m), !0),
                    u ||
                      c.attr({
                        stroke:
                          f.borderColor || m.color || l.color || "#666666",
                      }),
                    this.updatePosition({
                      plotX: r,
                      plotY: w,
                      negative: m.negative,
                      ttBelow: m.ttBelow,
                      h: a[2] || 0,
                    });
                else {
                  this.hide();
                  return;
                }
              }
              this.isHidden &&
                this.label &&
                this.label.attr({ opacity: 1 }).show();
              this.isHidden = !1;
            }
            h(this, "refresh");
          }
        }
        renderSplit(a, e) {
          function b(b, d, a, e, k = !0) {
            a
              ? ((d = J ? 0 : D),
                (b = c(b - e / 2, I.left, I.right - e - (f.outside ? W : 0))))
              : ((d -= ca),
                (b = k ? b - e - x : b + x),
                (b = c(b, k ? b : I.left, I.right)));
            return { x: b, y: d };
          }
          const f = this,
            {
              chart: d,
              chart: {
                chartWidth: k,
                chartHeight: m,
                plotHeight: g,
                plotLeft: p,
                plotTop: h,
                pointer: u,
                scrollablePixelsY: n = 0,
                scrollablePixelsX: r,
                scrollingContainer: { scrollLeft: q, scrollTop: H } = {
                  scrollLeft: 0,
                  scrollTop: 0,
                },
                styledMode: v,
              },
              distance: x,
              options: B,
              options: { positioner: P },
            } = f,
            I =
              f.outside && "number" !== typeof r
                ? C.documentElement.getBoundingClientRect()
                : { left: q, right: q + k, top: H, bottom: H + m },
            V = f.getLabel(),
            R = this.renderer || d.renderer,
            J = !(!d.xAxis[0] || !d.xAxis[0].opposite),
            { left: W, top: y } = u.getChartPosition();
          let ca = h + H,
            A = 0,
            D = g - n;
          w(a) && (a = [!1, a]);
          a = a.slice(0, e.length + 1).reduce(function (d, a, k) {
            if (!1 !== a && "" !== a) {
              k = e[k - 1] || {
                isHeader: !0,
                plotX: e[0].plotX,
                plotY: g,
                series: {},
              };
              const q = k.isHeader;
              var m = q ? f : k.series,
                l;
              {
                var u = k;
                a = a.toString();
                var n = m.tt;
                const { isHeader: b, series: d } = u;
                n ||
                  ((n = { padding: B.padding, r: B.borderRadius }),
                  v ||
                    ((n.fill = B.backgroundColor),
                    (n["stroke-width"] =
                      null !== (l = B.borderWidth) && void 0 !== l ? l : 1)),
                  (n = R.label(
                    "",
                    0,
                    0,
                    B[b ? "headerShape" : "shape"],
                    void 0,
                    void 0,
                    B.useHTML
                  )
                    .addClass(f.getClassName(u, !0, b))
                    .attr(n)
                    .add(V)));
                n.isActive = !0;
                n.attr({ text: a });
                v ||
                  n
                    .css(B.style)
                    .attr({
                      stroke: B.borderColor || u.color || d.color || "#333333",
                    });
                l = n;
              }
              l = m.tt = l;
              u = l.getBBox();
              m = u.width + l.strokeWidth();
              q && ((A = u.height), (D += A), J && (ca -= A));
              {
                const {
                  isHeader: b,
                  plotX: d = 0,
                  plotY: f = 0,
                  series: e,
                } = k;
                if (b) {
                  a = p + d;
                  var r = h + g / 2;
                } else {
                  const { xAxis: b, yAxis: k } = e;
                  a = b.pos + c(d, -x, b.len + x);
                  e.shouldShowTooltip(0, k.pos - h + f, { ignoreX: !0 }) &&
                    (r = k.pos + f);
                }
                a = c(a, I.left - x, I.right + x);
                r = { anchorX: a, anchorY: r };
              }
              const { anchorX: w, anchorY: E } = r;
              "number" === typeof E
                ? ((r = u.height + 1),
                  (u = P ? P.call(f, m, r, k) : b(w, E, q, m)),
                  d.push({
                    align: P ? 0 : void 0,
                    anchorX: w,
                    anchorY: E,
                    boxWidth: m,
                    point: k,
                    rank: F(u.rank, q ? 1 : 0),
                    size: r,
                    target: u.y,
                    tt: l,
                    x: u.x,
                  }))
                : (l.isActive = !1);
            }
            return d;
          }, []);
          !P &&
            a.some((b) => {
              var { outside: d } = f;
              d = (d ? W : 0) + b.anchorX;
              return d < I.left && d + b.boxWidth < I.right
                ? !0
                : d < W - I.left + b.boxWidth && I.right - d > d;
            }) &&
            (a = a.map((d) => {
              const { x: a, y: f } = b(
                d.anchorX,
                d.anchorY,
                d.point.isHeader,
                d.boxWidth,
                !1
              );
              return l(d, { target: f, x: a });
            }));
          f.cleanSplit();
          t(a, D);
          var G = W,
            X = W;
          a.forEach(function (b) {
            const { x: d, boxWidth: a, isHeader: e } = b;
            e ||
              (f.outside && W + d < G && (G = W + d),
              !e && f.outside && G + a > X && (X = W + d));
          });
          a.forEach(function (b) {
            const {
                x: d,
                anchorX: a,
                anchorY: e,
                pos: c,
                point: { isHeader: k },
              } = b,
              m = {
                visibility: "undefined" === typeof c ? "hidden" : "inherit",
                x: d,
                y: (c || 0) + ca,
                anchorX: a,
                anchorY: e,
              };
            if (f.outside && d < a) {
              const b = W - G;
              0 < b &&
                (k || ((m.x = d + b), (m.anchorX = a + b)),
                k && ((m.x = (X - G) / 2), (m.anchorX = a + b)));
            }
            b.tt.attr(m);
          });
          const { container: aa, outside: ea, renderer: ia } = f;
          if (ea && aa && ia) {
            const { width: b, height: d, x: a, y: f } = V.getBBox();
            ia.setSize(b + a, d + f, !1);
            aa.style.left = G + "px";
            aa.style.top = y + "px";
          }
          z && V.attr({ opacity: 1 === V.opacity ? 0.999 : 1 });
        }
        drawTracker() {
          if (this.shouldStickOnContact()) {
            var a = this.chart,
              e = this.label,
              b = this.shared ? a.hoverPoints : a.hoverPoint;
            if (e && b) {
              var f = { x: 0, y: 0, width: 0, height: 0 };
              b = this.getAnchor(b);
              var d = e.getBBox();
              b[0] += a.plotLeft - e.translateX;
              b[1] += a.plotTop - e.translateY;
              f.x = Math.min(0, b[0]);
              f.y = Math.min(0, b[1]);
              f.width =
                0 > b[0]
                  ? Math.max(Math.abs(b[0]), d.width - b[0])
                  : Math.max(Math.abs(b[0]), d.width);
              f.height =
                0 > b[1]
                  ? Math.max(Math.abs(b[1]), d.height - Math.abs(b[1]))
                  : Math.max(Math.abs(b[1]), d.height);
              this.tracker
                ? this.tracker.attr(f)
                : ((this.tracker = e.renderer
                    .rect(f)
                    .addClass("highcharts-tracker")
                    .add(e)),
                  a.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
            }
          } else this.tracker && (this.tracker = this.tracker.destroy());
        }
        styledModeFormat(a) {
          return a
            .replace('style="font-size: 0.8em"', 'class="highcharts-header"')
            .replace(
              /style="color:{(point|series)\.color}"/g,
              'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"'
            );
        }
        tooltipFooterHeaderFormatter(a, e) {
          const b = a.series,
            f = b.tooltipOptions;
          var d = b.xAxis;
          const c = d && d.dateTime;
          d = { isFooter: e, labelConfig: a };
          let m = f.xDateFormat,
            p = f[e ? "footerFormat" : "headerFormat"];
          h(this, "headerFormatter", d, function (d) {
            c &&
              !m &&
              g(a.key) &&
              (m = c.getXDateFormat(a.key, f.dateTimeLabelFormats));
            c &&
              m &&
              ((a.point && a.point.tooltipDateKeys) || ["key"]).forEach(
                function (b) {
                  p = p.replace(
                    "{point." + b + "}",
                    "{point." + b + ":" + m + "}"
                  );
                }
              );
            b.chart.styledMode && (p = this.styledModeFormat(p));
            d.text = x(p, { point: a, series: b }, this.chart);
          });
          return d.text;
        }
        update(a) {
          this.destroy();
          J(!0, this.chart.options.tooltip.userOptions, a);
          this.init(this.chart, J(!0, this.options, a));
        }
        updatePosition(a) {
          const { chart: e, distance: b, options: f } = this;
          var d = e.pointer;
          const c = this.getLabel(),
            { left: m, top: g, scaleX: p, scaleY: h } = d.getChartPosition();
          d = (f.positioner || this.getPosition).call(
            this,
            c.width,
            c.height,
            a
          );
          let l = (a.plotX || 0) + e.plotLeft;
          a = (a.plotY || 0) + e.plotTop;
          let u;
          if (this.outside) {
            f.positioner && ((d.x += m - b), (d.y += g - b));
            u = (f.borderWidth || 0) + 2 * b;
            this.renderer.setSize(c.width + u, c.height + u, !1);
            if (1 !== p || 1 !== h)
              n(this.container, { transform: `scale(${p}, ${h})` }),
                (l *= p),
                (a *= h);
            l += m - d.x;
            a += g - d.y;
          }
          this.move(Math.round(d.x), Math.round(d.y || 0), l, a);
        }
      }
      (function (a) {
        const e = [];
        a.compose = function (b) {
          A.pushUnique(e, b) &&
            v(b, "afterInit", function () {
              const b = this.chart;
              b.options.tooltip && (b.tooltip = new a(b, b.options.tooltip));
            });
        };
      })(u || (u = {}));
      ("");
      return u;
    }
  );
  M(
    a,
    "Core/Series/Point.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Defaults.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A) {
      const { animObject: x } = y,
        { defaultOptions: C } = G,
        { format: z } = L,
        {
          addEvent: t,
          defined: v,
          erase: c,
          extend: n,
          fireEvent: r,
          getNestedProperty: l,
          isArray: h,
          isFunction: q,
          isNumber: g,
          isObject: w,
          merge: J,
          objectEach: F,
          pick: e,
          syncTimeout: m,
          removeEvent: u,
          uniqueKey: p,
        } = A;
      class H {
        constructor() {
          this.category = void 0;
          this.destroyed = !1;
          this.formatPrefix = "point";
          this.id = void 0;
          this.isNull = !1;
          this.percentage = this.options = this.name = void 0;
          this.selected = !1;
          this.total = this.shapeArgs = this.series = void 0;
          this.visible = !0;
          this.x = void 0;
        }
        animateBeforeDestroy() {
          const b = this,
            a = { x: b.startXPos, opacity: 0 },
            d = b.getGraphicalProps();
          d.singular.forEach(function (d) {
            b[d] = b[d].animate(
              "dataLabel" === d
                ? { x: b[d].startXPos, y: b[d].startYPos, opacity: 0 }
                : a
            );
          });
          d.plural.forEach(function (d) {
            b[d].forEach(function (d) {
              d.element &&
                d.animate(
                  n(
                    { x: b.startXPos },
                    d.startYPos ? { x: d.startXPos, y: d.startYPos } : {}
                  )
                );
            });
          });
        }
        applyOptions(b, a) {
          const d = this.series,
            f = d.options.pointValKey || d.pointValKey;
          b = H.prototype.optionsToObject.call(this, b);
          n(this, b);
          this.options = this.options ? n(this.options, b) : b;
          b.group && delete this.group;
          b.dataLabels && delete this.dataLabels;
          f && (this.y = H.prototype.getNestedProperty.call(this, f));
          this.formatPrefix = (this.isNull = this.isValid && !this.isValid())
            ? "null"
            : "point";
          this.selected && (this.state = "select");
          "name" in this &&
            "undefined" === typeof a &&
            d.xAxis &&
            d.xAxis.hasNames &&
            (this.x = d.xAxis.nameToX(this));
          "undefined" === typeof this.x && d
            ? (this.x = "undefined" === typeof a ? d.autoIncrement() : a)
            : g(b.x) &&
              d.options.relativeXValue &&
              (this.x = d.autoIncrement(b.x));
          return this;
        }
        destroy() {
          if (!this.destroyed) {
            const a = this;
            var b = a.series;
            const d = b.chart;
            b = b.options.dataSorting;
            const e = d.hoverPoints,
              g = x(a.series.chart.renderer.globalAnimation),
              p = () => {
                if (a.graphic || a.graphics || a.dataLabel || a.dataLabels)
                  u(a), a.destroyElements();
                for (const b in a) delete a[b];
              };
            a.legendItem && d.legend.destroyItem(a);
            e && (a.setState(), c(e, a), e.length || (d.hoverPoints = null));
            if (a === d.hoverPoint) a.onMouseOut();
            b && b.enabled
              ? (this.animateBeforeDestroy(), m(p, g.duration))
              : p();
            d.pointCount--;
          }
          this.destroyed = !0;
        }
        destroyElements(b) {
          const a = this;
          b = a.getGraphicalProps(b);
          b.singular.forEach(function (b) {
            a[b] = a[b].destroy();
          });
          b.plural.forEach(function (b) {
            a[b].forEach(function (b) {
              b && b.element && b.destroy();
            });
            delete a[b];
          });
        }
        firePointEvent(b, a, d) {
          const f = this,
            e = this.series.options;
          (e.point.events[b] ||
            (f.options && f.options.events && f.options.events[b])) &&
            f.importEvents();
          "click" === b &&
            e.allowPointSelect &&
            (d = function (b) {
              f.select && f.select(null, b.ctrlKey || b.metaKey || b.shiftKey);
            });
          r(f, b, a, d);
        }
        getClassName() {
          return (
            "highcharts-point" +
            (this.selected ? " highcharts-point-select" : "") +
            (this.negative ? " highcharts-negative" : "") +
            (this.isNull ? " highcharts-null-point" : "") +
            ("undefined" !== typeof this.colorIndex
              ? " highcharts-color-" + this.colorIndex
              : "") +
            (this.options.className ? " " + this.options.className : "") +
            (this.zone && this.zone.className
              ? " " + this.zone.className.replace("highcharts-negative", "")
              : "")
          );
        }
        getGraphicalProps(b) {
          const a = this,
            d = [],
            e = { singular: [], plural: [] };
          let c, m;
          b = b || { graphic: 1, dataLabel: 1 };
          b.graphic && d.push("graphic");
          b.dataLabel &&
            d.push("dataLabel", "dataLabelPath", "dataLabelUpper", "connector");
          for (m = d.length; m--; ) (c = d[m]), a[c] && e.singular.push(c);
          ["graphic", "dataLabel", "connector"].forEach(function (d) {
            const f = d + "s";
            b[d] && a[f] && e.plural.push(f);
          });
          return e;
        }
        getLabelConfig() {
          return {
            x: this.category,
            y: this.y,
            color: this.color,
            colorIndex: this.colorIndex,
            key: this.name || this.category,
            series: this.series,
            point: this,
            percentage: this.percentage,
            total: this.total || this.stackTotal,
          };
        }
        getNestedProperty(b) {
          if (b)
            return 0 === b.indexOf("custom.") ? l(b, this.options) : this[b];
        }
        getZone() {
          var b = this.series;
          const a = b.zones;
          b = b.zoneAxis || "y";
          let d,
            e = 0;
          for (d = a[e]; this[b] >= d.value; ) d = a[++e];
          this.nonZonedColor || (this.nonZonedColor = this.color);
          this.color =
            d && d.color && !this.options.color ? d.color : this.nonZonedColor;
          return d;
        }
        hasNewShapeType() {
          return (
            (this.graphic &&
              (this.graphic.symbolName || this.graphic.element.nodeName)) !==
            this.shapeType
          );
        }
        init(b, a, d) {
          this.series = b;
          this.applyOptions(a, d);
          this.id = v(this.id) ? this.id : p();
          this.resolveColor();
          b.chart.pointCount++;
          r(this, "afterInit");
          return this;
        }
        isValid() {
          return null !== this.x && g(this.y);
        }
        optionsToObject(b) {
          var a = this.series;
          const d = a.options.keys,
            e = d || a.pointArrayMap || ["y"],
            c = e.length;
          let m = {},
            p = 0,
            l = 0;
          if (g(b) || null === b) m[e[0]] = b;
          else if (h(b))
            for (
              !d &&
              b.length > c &&
              ((a = typeof b[0]),
              "string" === a ? (m.name = b[0]) : "number" === a && (m.x = b[0]),
              p++);
              l < c;

            )
              (d && "undefined" === typeof b[p]) ||
                (0 < e[l].indexOf(".")
                  ? H.prototype.setNestedProperty(m, b[p], e[l])
                  : (m[e[l]] = b[p])),
                p++,
                l++;
          else
            "object" === typeof b &&
              ((m = b),
              b.dataLabels && (a._hasPointLabels = !0),
              b.marker && (a._hasPointMarkers = !0));
          return m;
        }
        pos(b, a = this.plotY) {
          if (!this.destroyed) {
            const { plotX: d, series: f } = this,
              { chart: e, xAxis: c, yAxis: m } = f;
            let p = 0,
              h = 0;
            if (g(d) && g(a))
              return (
                b &&
                  ((p = c ? c.pos : e.plotLeft), (h = m ? m.pos : e.plotTop)),
                e.inverted && c && m
                  ? [m.len - a + h, c.len - d + p]
                  : [d + p, a + h]
              );
          }
        }
        resolveColor() {
          const b = this.series;
          var a = b.chart.styledMode;
          let d;
          var c = b.chart.options.chart.colorCount;
          delete this.nonZonedColor;
          b.options.colorByPoint
            ? (a ||
                ((c = b.options.colors || b.chart.options.colors),
                (d = c[b.colorCounter]),
                (c = c.length)),
              (a = b.colorCounter),
              b.colorCounter++,
              b.colorCounter === c && (b.colorCounter = 0))
            : (a || (d = b.color), (a = b.colorIndex));
          this.colorIndex = e(this.options.colorIndex, a);
          this.color = e(this.options.color, d);
        }
        setNestedProperty(b, a, d) {
          d.split(".").reduce(function (b, d, f, e) {
            b[d] = e.length - 1 === f ? a : w(b[d], !0) ? b[d] : {};
            return b[d];
          }, b);
          return b;
        }
        shouldDraw() {
          return !this.isNull;
        }
        tooltipFormatter(b) {
          const a = this.series,
            d = a.tooltipOptions,
            c = e(d.valueDecimals, ""),
            m = d.valuePrefix || "",
            g = d.valueSuffix || "";
          a.chart.styledMode && (b = a.chart.tooltip.styledModeFormat(b));
          (a.pointArrayMap || ["y"]).forEach(function (a) {
            a = "{point." + a;
            if (m || g) b = b.replace(RegExp(a + "}", "g"), m + a + "}" + g);
            b = b.replace(RegExp(a + "}", "g"), a + ":,." + c + "f}");
          });
          return z(b, { point: this, series: this.series }, a.chart);
        }
        update(b, a, d, c) {
          function f() {
            k.applyOptions(b);
            var f = g && k.hasMockGraphic;
            f = null === k.y ? !f : f;
            g && f && ((k.graphic = g.destroy()), delete k.hasMockGraphic);
            w(b, !0) &&
              (g &&
                g.element &&
                b &&
                b.marker &&
                "undefined" !== typeof b.marker.symbol &&
                (k.graphic = g.destroy()),
              b &&
                b.dataLabels &&
                k.dataLabel &&
                (k.dataLabel = k.dataLabel.destroy()),
              k.connector && (k.connector = k.connector.destroy()));
            l = k.index;
            m.updateParallelArrays(k, l);
            h.data[l] =
              w(h.data[l], !0) || w(b, !0) ? k.options : e(b, h.data[l]);
            m.isDirty = m.isDirtyData = !0;
            !m.fixedBox && m.hasCartesianSeries && (p.isDirtyBox = !0);
            "point" === h.legendType && (p.isDirtyLegend = !0);
            a && p.redraw(d);
          }
          const k = this,
            m = k.series,
            g = k.graphic,
            p = m.chart,
            h = m.options;
          let l;
          a = e(a, !0);
          !1 === c ? f() : k.firePointEvent("update", { options: b }, f);
        }
        remove(b, a) {
          this.series.removePoint(this.series.data.indexOf(this), b, a);
        }
        select(b, a) {
          const d = this,
            f = d.series,
            c = f.chart;
          this.selectedStaging = b = e(b, !d.selected);
          d.firePointEvent(
            b ? "select" : "unselect",
            { accumulate: a },
            function () {
              d.selected = d.options.selected = b;
              f.options.data[f.data.indexOf(d)] = d.options;
              d.setState(b && "select");
              a ||
                c.getSelectedPoints().forEach(function (b) {
                  const a = b.series;
                  b.selected &&
                    b !== d &&
                    ((b.selected = b.options.selected = !1),
                    (a.options.data[a.data.indexOf(b)] = b.options),
                    b.setState(
                      c.hoverPoints && a.options.inactiveOtherPoints
                        ? "inactive"
                        : ""
                    ),
                    b.firePointEvent("unselect"));
                });
            }
          );
          delete this.selectedStaging;
        }
        onMouseOver(b) {
          const a = this.series.chart,
            d = a.pointer;
          b = b
            ? d.normalize(b)
            : d.getChartCoordinatesFromPoint(this, a.inverted);
          d.runPointActions(b, this);
        }
        onMouseOut() {
          const b = this.series.chart;
          this.firePointEvent("mouseOut");
          this.series.options.inactiveOtherPoints ||
            (b.hoverPoints || []).forEach(function (b) {
              b.setState();
            });
          b.hoverPoints = b.hoverPoint = null;
        }
        importEvents() {
          if (!this.hasImportedEvents) {
            const b = this,
              a = J(b.series.options.point, b.options).events;
            b.events = a;
            F(a, function (a, f) {
              q(a) && t(b, f, a);
            });
            this.hasImportedEvents = !0;
          }
        }
        setState(b, f) {
          const d = this.series;
          var c = this.state,
            m = d.options.states[b || "normal"] || {},
            p = C.plotOptions[d.type].marker && d.options.marker;
          const h = p && !1 === p.enabled,
            l = (p && p.states && p.states[b || "normal"]) || {},
            u = !1 === l.enabled,
            q = this.marker || {},
            w = d.chart,
            H = p && d.markerAttribs;
          let t = d.halo;
          var v;
          let x;
          var B = d.stateMarkerGraphic;
          b = b || "";
          if (
            !(
              (b === this.state && !f) ||
              (this.selected && "select" !== b) ||
              !1 === m.enabled ||
              (b && (u || (h && !1 === l.enabled))) ||
              (b && q.states && q.states[b] && !1 === q.states[b].enabled)
            )
          ) {
            this.state = b;
            H && (v = d.markerAttribs(this, b));
            if (this.graphic && !this.hasMockGraphic) {
              c && this.graphic.removeClass("highcharts-point-" + c);
              b && this.graphic.addClass("highcharts-point-" + b);
              if (!w.styledMode) {
                c = d.pointAttribs(this, b);
                x = e(w.options.chart.animation, m.animation);
                const a = c.opacity;
                d.options.inactiveOtherPoints &&
                  g(a) &&
                  ((this.dataLabels || []).forEach(function (b) {
                    b &&
                      !b.hasClass("highcharts-data-label-hidden") &&
                      b.animate({ opacity: a }, x);
                  }),
                  this.connector && this.connector.animate({ opacity: a }, x));
                this.graphic.animate(c, x);
              }
              v &&
                this.graphic.animate(
                  v,
                  e(w.options.chart.animation, l.animation, p.animation)
                );
              B && B.hide();
            } else {
              if (b && l) {
                p = q.symbol || d.symbol;
                B && B.currentSymbol !== p && (B = B.destroy());
                if (v)
                  if (B) B[f ? "animate" : "attr"]({ x: v.x, y: v.y });
                  else
                    p &&
                      ((d.stateMarkerGraphic = B =
                        w.renderer
                          .symbol(p, v.x, v.y, v.width, v.height)
                          .add(d.markerGroup)),
                      (B.currentSymbol = p));
                !w.styledMode &&
                  B &&
                  "inactive" !== this.state &&
                  B.attr(d.pointAttribs(this, b));
              }
              B &&
                (B[b && this.isInside ? "show" : "hide"](),
                (B.element.point = this),
                B.addClass(this.getClassName(), !0));
            }
            m = m.halo;
            v = ((B = this.graphic || B) && B.visibility) || "inherit";
            m && m.size && B && "hidden" !== v && !this.isCluster
              ? (t || (d.halo = t = w.renderer.path().add(B.parentGroup)),
                t.show()[f ? "animate" : "attr"]({ d: this.haloPath(m.size) }),
                t.attr({
                  class:
                    "highcharts-halo highcharts-color-" +
                    e(this.colorIndex, d.colorIndex) +
                    (this.className ? " " + this.className : ""),
                  visibility: v,
                  zIndex: -1,
                }),
                (t.point = this),
                w.styledMode ||
                  t.attr(
                    n(
                      {
                        fill: this.color || d.color,
                        "fill-opacity": m.opacity,
                      },
                      a.filterUserAttributes(m.attributes || {})
                    )
                  ))
              : t &&
                t.point &&
                t.point.haloPath &&
                t.animate({ d: t.point.haloPath(0) }, null, t.hide);
            r(this, "afterSetState", { state: b });
          }
        }
        haloPath(b) {
          const a = this.pos();
          return a
            ? this.series.chart.renderer.symbols.circle(
                Math.floor(a[0]) - b,
                a[1] - b,
                2 * b,
                2 * b
              )
            : [];
        }
      }
      ("");
      return H;
    }
  );
  M(
    a,
    "Core/Pointer.js",
    [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, y, G) {
      const { parse: x } = a,
        { charts: A, noop: D } = y,
        {
          addEvent: C,
          attr: z,
          css: t,
          defined: v,
          extend: c,
          find: n,
          fireEvent: r,
          isNumber: l,
          isObject: h,
          objectEach: q,
          offset: g,
          pick: w,
          splat: J,
        } = G;
      class F {
        constructor(a, c) {
          this.lastValidTouch = {};
          this.pinchDown = [];
          this.runChartClick = !1;
          this.eventsToUnbind = [];
          this.chart = a;
          this.hasDragged = !1;
          this.options = c;
          this.init(a, c);
        }
        applyInactiveState(a) {
          let e = [],
            c;
          (a || []).forEach(function (a) {
            c = a.series;
            e.push(c);
            c.linkedParent && e.push(c.linkedParent);
            c.linkedSeries && (e = e.concat(c.linkedSeries));
            c.navigatorSeries && e.push(c.navigatorSeries);
          });
          this.chart.series.forEach(function (a) {
            -1 === e.indexOf(a)
              ? a.setState("inactive", !0)
              : a.options.inactiveOtherPoints &&
                a.setAllPointsToState("inactive");
          });
        }
        destroy() {
          const a = this;
          this.eventsToUnbind.forEach((a) => a());
          this.eventsToUnbind = [];
          y.chartCount ||
            (F.unbindDocumentMouseUp &&
              (F.unbindDocumentMouseUp = F.unbindDocumentMouseUp()),
            F.unbindDocumentTouchEnd &&
              (F.unbindDocumentTouchEnd = F.unbindDocumentTouchEnd()));
          clearInterval(a.tooltipTimeout);
          q(a, function (e, c) {
            a[c] = void 0;
          });
        }
        getSelectionMarkerAttrs(a, c) {
          const e = {
            args: { chartX: a, chartY: c },
            attrs: {},
            shapeType: "rect",
          };
          r(this, "getSelectionMarkerAttrs", e, (e) => {
            const {
              chart: m,
              mouseDownX: b = 0,
              mouseDownY: f = 0,
              zoomHor: d,
              zoomVert: k,
            } = this;
            e = e.attrs;
            let g;
            e.x = m.plotLeft;
            e.y = m.plotTop;
            e.width = d ? 1 : m.plotWidth;
            e.height = k ? 1 : m.plotHeight;
            d &&
              ((g = a - b),
              (e.width = Math.abs(g)),
              (e.x = (0 < g ? 0 : g) + b));
            k &&
              ((g = c - f),
              (e.height = Math.abs(g)),
              (e.y = (0 < g ? 0 : g) + f));
          });
          return e;
        }
        drag(a) {
          const e = this.chart,
            c = e.options.chart;
          var g = e.plotLeft;
          const l = e.plotTop,
            b = e.plotWidth,
            f = e.plotHeight,
            d = this.mouseDownX || 0,
            k = this.mouseDownY || 0,
            n = h(c.panning) ? c.panning && c.panning.enabled : c.panning,
            r = c.panKey && a[c.panKey + "Key"];
          let q = a.chartX,
            w = a.chartY,
            t = this.selectionMarker;
          if (!t || !t.touch)
            if (
              (q < g ? (q = g) : q > g + b && (q = g + b),
              w < l ? (w = l) : w > l + f && (w = l + f),
              (this.hasDragged = Math.sqrt(
                Math.pow(d - q, 2) + Math.pow(k - w, 2)
              )),
              10 < this.hasDragged)
            ) {
              g = e.isInsidePlot(d - g, k - l, { visiblePlotOnly: !0 });
              const { shapeType: b, attrs: f } = this.getSelectionMarkerAttrs(
                q,
                w
              );
              (!e.hasCartesianSeries && !e.mapView) ||
                (!this.zoomX && !this.zoomY) ||
                !g ||
                r ||
                t ||
                ((this.selectionMarker = t = e.renderer[b]()),
                t
                  .attr({ class: "highcharts-selection-marker", zIndex: 7 })
                  .add(),
                e.styledMode ||
                  t.attr({
                    fill:
                      c.selectionMarkerFill ||
                      x("#334eff").setOpacity(0.25).get(),
                  }));
              t && t.attr(f);
              g && !t && n && e.pan(a, c.panning);
            }
        }
        dragStart(a) {
          const e = this.chart;
          e.mouseIsDown = a.type;
          e.cancelClick = !1;
          e.mouseDownX = this.mouseDownX = a.chartX;
          e.mouseDownY = this.mouseDownY = a.chartY;
        }
        getSelectionBox(a) {
          const e = { args: { marker: a }, result: {} };
          r(this, "getSelectionBox", e, (e) => {
            e.result = {
              x: a.attr ? +a.attr("x") : a.x,
              y: a.attr ? +a.attr("y") : a.y,
              width: a.attr ? a.attr("width") : a.width,
              height: a.attr ? a.attr("height") : a.height,
            };
          });
          return e.result;
        }
        drop(a) {
          const e = this,
            g = this.chart,
            p = this.hasPinched;
          if (this.selectionMarker) {
            const {
                x: m,
                y: b,
                width: f,
                height: d,
              } = this.getSelectionBox(this.selectionMarker),
              k = {
                originalEvent: a,
                xAxis: [],
                yAxis: [],
                x: m,
                y: b,
                width: f,
                height: d,
              };
            let h = !!g.mapView;
            if (this.hasDragged || p)
              g.axes.forEach(function (c) {
                if (
                  c.zoomEnabled &&
                  v(c.min) &&
                  (p || e[{ xAxis: "zoomX", yAxis: "zoomY" }[c.coll]]) &&
                  l(m) &&
                  l(b) &&
                  l(f) &&
                  l(d)
                ) {
                  var g = c.horiz;
                  const e = "touchend" === a.type ? c.minPixelPadding : 0,
                    p = c.toValue((g ? m : b) + e);
                  g = c.toValue((g ? m + f : b + d) - e);
                  k[c.coll].push({
                    axis: c,
                    min: Math.min(p, g),
                    max: Math.max(p, g),
                  });
                  h = !0;
                }
              }),
                h &&
                  r(g, "selection", k, function (b) {
                    g.zoom(c(b, p ? { animation: !1 } : null));
                  });
            l(g.index) &&
              (this.selectionMarker = this.selectionMarker.destroy());
            p && this.scaleGroups();
          }
          g &&
            l(g.index) &&
            (t(g.container, { cursor: g._cursor }),
            (g.cancelClick = 10 < this.hasDragged),
            (g.mouseIsDown = this.hasDragged = this.hasPinched = !1),
            (this.pinchDown = []));
        }
        findNearestKDPoint(a, c, g) {
          let e;
          a.forEach(function (a) {
            var b =
              !(a.noSharedTooltip && c) &&
              0 > a.options.findNearestPointBy.indexOf("y");
            a = a.searchPoint(g, b);
            if ((b = h(a, !0) && a.series) && !(b = !h(e, !0))) {
              {
                b = e.distX - a.distX;
                const f = e.dist - a.dist,
                  d =
                    (a.series.group && a.series.group.zIndex) -
                    (e.series.group && e.series.group.zIndex);
                b =
                  0 !== b && c
                    ? b
                    : 0 !== f
                    ? f
                    : 0 !== d
                    ? d
                    : e.series.index > a.series.index
                    ? -1
                    : 1;
              }
              b = 0 < b;
            }
            b && (e = a);
          });
          return e;
        }
        getChartCoordinatesFromPoint(a, c) {
          var e = a.series;
          const g = e.xAxis;
          e = e.yAxis;
          const m = a.shapeArgs;
          if (g && e) {
            let b = w(a.clientX, a.plotX),
              f = a.plotY || 0;
            a.isNode && m && l(m.x) && l(m.y) && ((b = m.x), (f = m.y));
            return c
              ? { chartX: e.len + e.pos - f, chartY: g.len + g.pos - b }
              : { chartX: b + g.pos, chartY: f + e.pos };
          }
          if (m && m.x && m.y) return { chartX: m.x, chartY: m.y };
        }
        getChartPosition() {
          if (this.chartPosition) return this.chartPosition;
          var { container: a } = this.chart;
          const c = g(a);
          this.chartPosition = {
            left: c.left,
            top: c.top,
            scaleX: 1,
            scaleY: 1,
          };
          const h = a.offsetWidth;
          a = a.offsetHeight;
          2 < h &&
            2 < a &&
            ((this.chartPosition.scaleX = c.width / h),
            (this.chartPosition.scaleY = c.height / a));
          return this.chartPosition;
        }
        getCoordinates(a) {
          const c = { xAxis: [], yAxis: [] };
          this.chart.axes.forEach(function (e) {
            c[e.isXAxis ? "xAxis" : "yAxis"].push({
              axis: e,
              value: e.toValue(a[e.horiz ? "chartX" : "chartY"]),
            });
          });
          return c;
        }
        getHoverData(a, c, g, p, l, b) {
          const f = [];
          p = !(!p || !a);
          const d = function (b) {
            return (
              b.visible &&
              !(!l && b.directTouch) &&
              w(b.options.enableMouseTracking, !0)
            );
          };
          let e,
            m = {
              chartX: b ? b.chartX : void 0,
              chartY: b ? b.chartY : void 0,
              shared: l,
            };
          r(this, "beforeGetHoverData", m);
          e =
            c && !c.stickyTracking
              ? [c]
              : g.filter((b) => b.stickyTracking && (m.filter || d)(b));
          const u = p || !b ? a : this.findNearestKDPoint(e, l, b);
          c = u && u.series;
          u &&
            (l && !c.noSharedTooltip
              ? ((e = g.filter(function (b) {
                  return m.filter ? m.filter(b) : d(b) && !b.noSharedTooltip;
                })),
                e.forEach(function (b) {
                  let a = n(b.points, function (b) {
                    return b.x === u.x && !b.isNull;
                  });
                  h(a) &&
                    (b.boosted && b.boost && (a = b.boost.getPoint(a)),
                    f.push(a));
                }))
              : f.push(u));
          m = { hoverPoint: u };
          r(this, "afterGetHoverData", m);
          return { hoverPoint: m.hoverPoint, hoverSeries: c, hoverPoints: f };
        }
        getPointFromEvent(a) {
          a = a.target;
          let c;
          for (; a && !c; ) (c = a.point), (a = a.parentNode);
          return c;
        }
        onTrackerMouseOut(a) {
          a = a.relatedTarget;
          const c = this.chart.hoverSeries;
          this.isDirectTouch = !1;
          if (
            !(
              !c ||
              !a ||
              c.stickyTracking ||
              this.inClass(a, "highcharts-tooltip") ||
              (this.inClass(a, "highcharts-series-" + c.index) &&
                this.inClass(a, "highcharts-tracker"))
            )
          )
            c.onMouseOut();
        }
        inClass(a, c) {
          let e;
          for (; a; ) {
            if ((e = z(a, "class"))) {
              if (-1 !== e.indexOf(c)) return !0;
              if (-1 !== e.indexOf("highcharts-container")) return !1;
            }
            a = a.parentElement;
          }
        }
        init(a, c) {
          this.options = c;
          this.chart = a;
          this.runChartClick = !(!c.chart.events || !c.chart.events.click);
          this.pinchDown = [];
          this.lastValidTouch = {};
          this.setDOMEvents();
          r(this, "afterInit");
        }
        normalize(a, g) {
          var e = a.touches,
            m = e
              ? e.length
                ? e.item(0)
                : w(e.changedTouches, a.changedTouches)[0]
              : a;
          g || (g = this.getChartPosition());
          e = m.pageX - g.left;
          m = m.pageY - g.top;
          e /= g.scaleX;
          m /= g.scaleY;
          return c(a, { chartX: Math.round(e), chartY: Math.round(m) });
        }
        onContainerClick(a) {
          const e = this.chart,
            g = e.hoverPoint;
          a = this.normalize(a);
          const p = e.plotLeft,
            h = e.plotTop;
          e.cancelClick ||
            (g && this.inClass(a.target, "highcharts-tracker")
              ? (r(g.series, "click", c(a, { point: g })),
                e.hoverPoint && g.firePointEvent("click", a))
              : (c(a, this.getCoordinates(a)),
                e.isInsidePlot(a.chartX - p, a.chartY - h, {
                  visiblePlotOnly: !0,
                }) && r(e, "click", a)));
        }
        onContainerMouseDown(a) {
          const c = 1 === ((a.buttons || a.button) & 1);
          a = this.normalize(a);
          if (y.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
          if ("undefined" === typeof a.button || c)
            this.zoomOption(a),
              c && a.preventDefault && a.preventDefault(),
              this.dragStart(a);
        }
        onContainerMouseLeave(a) {
          const c = A[w(F.hoverChartIndex, -1)];
          a = this.normalize(a);
          c &&
            a.relatedTarget &&
            !this.inClass(a.relatedTarget, "highcharts-tooltip") &&
            (c.pointer.reset(), (c.pointer.chartPosition = void 0));
        }
        onContainerMouseEnter(a) {
          delete this.chartPosition;
        }
        onContainerMouseMove(a) {
          const c = this.chart,
            e = c.tooltip;
          a = this.normalize(a);
          this.setHoverChartIndex();
          ("mousedown" === c.mouseIsDown || this.touchSelect(a)) &&
            this.drag(a);
          c.openMenu ||
            (!this.inClass(a.target, "highcharts-tracker") &&
              !c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
                visiblePlotOnly: !0,
              })) ||
            (e && e.shouldStickOnContact(a)) ||
            (this.inClass(a.target, "highcharts-no-tooltip")
              ? this.reset(!1, 0)
              : this.runPointActions(a));
        }
        onDocumentTouchEnd(a) {
          const c = A[w(F.hoverChartIndex, -1)];
          c && c.pointer.drop(a);
        }
        onContainerTouchMove(a) {
          if (this.touchSelect(a)) this.onContainerMouseMove(a);
          else this.touch(a);
        }
        onContainerTouchStart(a) {
          if (this.touchSelect(a)) this.onContainerMouseDown(a);
          else this.zoomOption(a), this.touch(a, !0);
        }
        onDocumentMouseMove(a) {
          const c = this.chart,
            e = c.tooltip,
            g = this.chartPosition;
          a = this.normalize(a, g);
          !g ||
            c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
              visiblePlotOnly: !0,
            }) ||
            (e && e.shouldStickOnContact(a)) ||
            this.inClass(a.target, "highcharts-tracker") ||
            this.reset();
        }
        onDocumentMouseUp(a) {
          const c = A[w(F.hoverChartIndex, -1)];
          c && c.pointer.drop(a);
        }
        pinch(a) {
          const e = this,
            g = e.chart,
            p = e.pinchDown,
            h = a.touches || [],
            b = h.length,
            f = e.lastValidTouch,
            d = e.hasZoom,
            k = {},
            l =
              1 === b &&
              ((e.inClass(a.target, "highcharts-tracker") &&
                g.runTrackerClick) ||
                e.runChartClick),
            n = {};
          var q = e.chart.tooltip;
          q = 1 === b && w(q && q.options.followTouchMove, !0);
          let t = e.selectionMarker;
          1 < b ? (e.initiated = !0) : q && (e.initiated = !1);
          d && e.initiated && !l && !1 !== a.cancelable && a.preventDefault();
          [].map.call(h, function (b) {
            return e.normalize(b);
          });
          "touchstart" === a.type
            ? ([].forEach.call(h, function (b, a) {
                p[a] = { chartX: b.chartX, chartY: b.chartY };
              }),
              (f.x = [p[0].chartX, p[1] && p[1].chartX]),
              (f.y = [p[0].chartY, p[1] && p[1].chartY]),
              g.axes.forEach(function (b) {
                if (b.zoomEnabled) {
                  const a = g.bounds[b.horiz ? "h" : "v"],
                    d = b.minPixelPadding,
                    f = b.toPixels(
                      Math.min(w(b.options.min, b.dataMin), b.dataMin)
                    ),
                    c = b.toPixels(
                      Math.max(w(b.options.max, b.dataMax), b.dataMax)
                    ),
                    e = Math.max(f, c);
                  a.min = Math.min(b.pos, Math.min(f, c) - d);
                  a.max = Math.max(b.pos + b.len, e + d);
                }
              }),
              (e.res = !0))
            : q
            ? this.runPointActions(e.normalize(a))
            : p.length &&
              (r(g, "touchpan", { originalEvent: a }, () => {
                t ||
                  (e.selectionMarker = t =
                    c({ destroy: D, touch: !0 }, g.plotBox));
                e.pinchTranslate(p, h, k, t, n, f);
                e.hasPinched = d;
                e.scaleGroups(k, n);
              }),
              e.res && ((e.res = !1), this.reset(!1, 0)));
        }
        pinchTranslate(a, c, g, p, h, b) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, c, g, p, h, b);
          this.zoomVert && this.pinchTranslateDirection(!1, a, c, g, p, h, b);
        }
        pinchTranslateDirection(a, c, g, p, h, b, f, d) {
          const e = this.chart,
            m = a ? "x" : "y",
            l = a ? "X" : "Y",
            n = "chart" + l,
            r = a ? "width" : "height",
            u = e["plot" + (a ? "Left" : "Top")],
            q = e.inverted,
            w = e.bounds[a ? "h" : "v"],
            t = 1 === c.length,
            v = c[0][n],
            x = !t && c[1][n];
          c = function () {
            "number" === typeof V &&
              20 < Math.abs(v - x) &&
              (P = d || Math.abs(I - V) / Math.abs(v - x));
            B = (u - I) / P + v;
            H = e["plot" + (a ? "Width" : "Height")] / P;
          };
          let H,
            B,
            P = d || 1,
            I = g[0][n],
            V = !t && g[1][n],
            R;
          c();
          g = B;
          g < w.min
            ? ((g = w.min), (R = !0))
            : g + H > w.max && ((g = w.max - H), (R = !0));
          R
            ? ((I -= 0.8 * (I - f[m][0])),
              "number" === typeof V && (V -= 0.8 * (V - f[m][1])),
              c())
            : (f[m] = [I, V]);
          q || ((b[m] = B - u), (b[r] = H));
          b = q ? 1 / P : P;
          h[r] = H;
          h[m] = g;
          p[q ? (a ? "scaleY" : "scaleX") : "scale" + l] = P;
          p["translate" + l] = b * u + (I - b * v);
        }
        reset(a, c) {
          const e = this.chart,
            g = e.hoverSeries,
            m = e.hoverPoint,
            b = e.hoverPoints,
            f = e.tooltip,
            d = f && f.shared ? b : m;
          a &&
            d &&
            J(d).forEach(function (b) {
              b.series.isCartesian &&
                "undefined" === typeof b.plotX &&
                (a = !1);
            });
          if (a)
            f &&
              d &&
              J(d).length &&
              (f.refresh(d),
              f.shared && b
                ? b.forEach(function (b) {
                    b.setState(b.state, !0);
                    b.series.isCartesian &&
                      (b.series.xAxis.crosshair &&
                        b.series.xAxis.drawCrosshair(null, b),
                      b.series.yAxis.crosshair &&
                        b.series.yAxis.drawCrosshair(null, b));
                  })
                : m &&
                  (m.setState(m.state, !0),
                  e.axes.forEach(function (b) {
                    b.crosshair &&
                      m.series[b.coll] === b &&
                      b.drawCrosshair(null, m);
                  })));
          else {
            if (m) m.onMouseOut();
            b &&
              b.forEach(function (b) {
                b.setState();
              });
            if (g) g.onMouseOut();
            f && f.hide(c);
            this.unDocMouseMove &&
              (this.unDocMouseMove = this.unDocMouseMove());
            e.axes.forEach(function (b) {
              b.hideCrosshair();
            });
            this.hoverX = e.hoverPoints = e.hoverPoint = null;
          }
        }
        runPointActions(a, c, g) {
          const e = this.chart,
            m = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0,
            b = m ? m.shared : !1;
          let f = c || e.hoverPoint,
            d = (f && f.series) || e.hoverSeries;
          c = this.getHoverData(
            f,
            d,
            e.series,
            (!a || "touchmove" !== a.type) &&
              (!!c || (d && d.directTouch && this.isDirectTouch)),
            b,
            a
          );
          f = c.hoverPoint;
          d = c.hoverSeries;
          const k = c.hoverPoints;
          c = d && d.tooltipOptions.followPointer && !d.tooltipOptions.split;
          const h = b && d && !d.noSharedTooltip;
          if (f && (g || f !== e.hoverPoint || (m && m.isHidden))) {
            (e.hoverPoints || []).forEach(function (b) {
              -1 === k.indexOf(b) && b.setState();
            });
            if (e.hoverSeries !== d) d.onMouseOver();
            this.applyInactiveState(k);
            (k || []).forEach(function (b) {
              b.setState("hover");
            });
            e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
            if (!f.series) return;
            e.hoverPoints = k;
            e.hoverPoint = f;
            f.firePointEvent("mouseOver", void 0, () => {
              m && f && m.refresh(h ? k : f, a);
            });
          } else
            c &&
              m &&
              !m.isHidden &&
              ((g = m.getAnchor([{}], a)),
              e.isInsidePlot(g[0], g[1], { visiblePlotOnly: !0 }) &&
                m.updatePosition({ plotX: g[0], plotY: g[1] }));
          this.unDocMouseMove ||
            ((this.unDocMouseMove = C(
              e.container.ownerDocument,
              "mousemove",
              function (b) {
                const a = A[F.hoverChartIndex];
                if (a) a.pointer.onDocumentMouseMove(b);
              }
            )),
            this.eventsToUnbind.push(this.unDocMouseMove));
          e.axes.forEach(function (b) {
            const d = w((b.crosshair || {}).snap, !0);
            let f;
            d &&
              (((f = e.hoverPoint) && f.series[b.coll] === b) ||
                (f = n(k, (a) => a.series && a.series[b.coll] === b)));
            f || !d ? b.drawCrosshair(a, f) : b.hideCrosshair();
          });
        }
        scaleGroups(a, c) {
          const e = this.chart;
          e.series.forEach(function (g) {
            const m = a || g.getPlotBox();
            g.group &&
              ((g.xAxis && g.xAxis.zoomEnabled) || e.mapView) &&
              (g.group.attr(m),
              g.markerGroup &&
                (g.markerGroup.attr(m),
                g.markerGroup.clip(c ? e.clipRect : null)),
              g.dataLabelsGroup && g.dataLabelsGroup.attr(m));
          });
          e.clipRect.attr(c || e.clipBox);
        }
        setDOMEvents() {
          const a = this.chart.container,
            c = a.ownerDocument;
          a.onmousedown = this.onContainerMouseDown.bind(this);
          a.onmousemove = this.onContainerMouseMove.bind(this);
          a.onclick = this.onContainerClick.bind(this);
          this.eventsToUnbind.push(
            C(a, "mouseenter", this.onContainerMouseEnter.bind(this))
          );
          this.eventsToUnbind.push(
            C(a, "mouseleave", this.onContainerMouseLeave.bind(this))
          );
          F.unbindDocumentMouseUp ||
            (F.unbindDocumentMouseUp = C(
              c,
              "mouseup",
              this.onDocumentMouseUp.bind(this)
            ));
          let g = this.chart.renderTo.parentElement;
          for (; g && "BODY" !== g.tagName; )
            this.eventsToUnbind.push(
              C(g, "scroll", () => {
                delete this.chartPosition;
              })
            ),
              (g = g.parentElement);
          y.hasTouch &&
            (this.eventsToUnbind.push(
              C(a, "touchstart", this.onContainerTouchStart.bind(this), {
                passive: !1,
              })
            ),
            this.eventsToUnbind.push(
              C(a, "touchmove", this.onContainerTouchMove.bind(this), {
                passive: !1,
              })
            ),
            F.unbindDocumentTouchEnd ||
              (F.unbindDocumentTouchEnd = C(
                c,
                "touchend",
                this.onDocumentTouchEnd.bind(this),
                { passive: !1 }
              )));
        }
        setHoverChartIndex() {
          const a = this.chart,
            c = y.charts[w(F.hoverChartIndex, -1)];
          if (c && c !== a)
            c.pointer.onContainerMouseLeave({ relatedTarget: a.container });
          (c && c.mouseIsDown) || (F.hoverChartIndex = a.index);
        }
        touch(a, c) {
          const e = this.chart;
          let g, m;
          this.setHoverChartIndex();
          1 === a.touches.length
            ? ((a = this.normalize(a)),
              (m = e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop, {
                visiblePlotOnly: !0,
              })) && !e.openMenu
                ? (c && this.runPointActions(a),
                  "touchmove" === a.type &&
                    ((c = this.pinchDown),
                    (g = c[0]
                      ? 4 <=
                        Math.sqrt(
                          Math.pow(c[0].chartX - a.chartX, 2) +
                            Math.pow(c[0].chartY - a.chartY, 2)
                        )
                      : !1)),
                  w(g, !0) && this.pinch(a))
                : c && this.reset())
            : 2 === a.touches.length && this.pinch(a);
        }
        touchSelect(a) {
          return !(
            !this.chart.options.chart.zooming.singleTouch ||
            !a.touches ||
            1 !== a.touches.length
          );
        }
        zoomOption(a) {
          var c = this.chart,
            e = c.options.chart;
          c = c.inverted;
          let g = e.zooming.type || "";
          /touch/.test(a.type) && (g = w(e.zooming.pinchType, g));
          this.zoomX = a = /x/.test(g);
          this.zoomY = e = /y/.test(g);
          this.zoomHor = (a && !c) || (e && c);
          this.zoomVert = (e && !c) || (a && c);
          this.hasZoom = a || e;
        }
      }
      (function (a) {
        const c = [],
          e = [];
        a.compose = function (c) {
          G.pushUnique(e, c) &&
            C(c, "beforeRender", function () {
              this.pointer = new a(this, this.options);
            });
        };
        a.dissolve = function () {
          for (let a = 0, e = c.length; a < e; ++a) c[a]();
          c.length = 0;
        };
      })(F || (F = {}));
      ("");
      return F;
    }
  );
  M(
    a,
    "Core/Legend/Legend.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Series/Point.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A, D) {
      const { animObject: x, setAnimation: z } = a,
        { format: t } = y,
        { marginNames: v } = G,
        { distribute: c } = A,
        {
          addEvent: n,
          createElement: r,
          css: l,
          defined: h,
          discardElement: q,
          find: g,
          fireEvent: w,
          isNumber: J,
          merge: F,
          pick: e,
          relativeLength: m,
          stableSort: u,
          syncTimeout: p,
        } = D;
      class H {
        constructor(b, a) {
          this.allItems = [];
          this.contentGroup = this.box = void 0;
          this.display = !1;
          this.group = void 0;
          this.offsetWidth =
            this.maxLegendWidth =
            this.maxItemWidth =
            this.legendWidth =
            this.legendHeight =
            this.lastLineHeight =
            this.lastItemY =
            this.itemY =
            this.itemX =
            this.itemMarginTop =
            this.itemMarginBottom =
            this.itemHeight =
            this.initialItemY =
              0;
          this.options = void 0;
          this.padding = 0;
          this.pages = [];
          this.proximate = !1;
          this.scrollGroup = void 0;
          this.widthOption =
            this.totalItemWidth =
            this.titleHeight =
            this.symbolWidth =
            this.symbolHeight =
              0;
          this.chart = b;
          this.init(b, a);
        }
        init(b, a) {
          this.chart = b;
          this.setOptions(a);
          a.enabled &&
            (this.render(),
            n(this.chart, "endResize", function () {
              this.legend.positionCheckboxes();
            }),
            n(this.chart, "render", () => {
              this.proximate &&
                (this.proximatePositions(), this.positionItems());
            }));
        }
        setOptions(b) {
          const a = e(b.padding, 8);
          this.options = b;
          this.chart.styledMode ||
            ((this.itemStyle = b.itemStyle),
            (this.itemHiddenStyle = F(this.itemStyle, b.itemHiddenStyle)));
          this.itemMarginTop = b.itemMarginTop;
          this.itemMarginBottom = b.itemMarginBottom;
          this.padding = a;
          this.initialItemY = a - 5;
          this.symbolWidth = e(b.symbolWidth, 16);
          this.pages = [];
          this.proximate = "proximate" === b.layout && !this.chart.inverted;
          this.baseline = void 0;
        }
        update(b, a) {
          const d = this.chart;
          this.setOptions(F(!0, this.options, b));
          this.destroy();
          d.isDirtyLegend = d.isDirtyBox = !0;
          e(a, !0) && d.redraw();
          w(this, "afterUpdate");
        }
        colorizeItem(b, a) {
          const { group: d, label: c, line: f, symbol: e } = b.legendItem || {};
          if (d)
            d[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
          if (!this.chart.styledMode) {
            var g = this.options;
            const d = this.itemHiddenStyle.color;
            g = a ? g.itemStyle.color : d;
            const k = a ? b.color || d : d,
              m = b.options && b.options.marker;
            let h = { fill: k };
            c && c.css({ fill: g });
            f && f.attr({ stroke: k });
            e &&
              (m &&
                e.isMarker &&
                ((h = b.pointAttribs()), a || (h.stroke = h.fill = d)),
              e.attr(h));
          }
          w(this, "afterColorizeItem", { item: b, visible: a });
        }
        positionItems() {
          this.allItems.forEach(this.positionItem, this);
          this.chart.isResizing || this.positionCheckboxes();
        }
        positionItem(b) {
          const { group: a, x: d = 0, y: c = 0 } = b.legendItem || {};
          var e = this.options,
            g = e.symbolPadding;
          const m = !e.rtl;
          e = b.checkbox;
          a &&
            a.element &&
            ((g = {
              translateX: m ? d : this.legendWidth - d - 2 * g - 4,
              translateY: c,
            }),
            a[h(a.translateY) ? "animate" : "attr"](g, void 0, () => {
              w(this, "afterPositionItem", { item: b });
            }));
          e && ((e.x = d), (e.y = c));
        }
        destroyItem(b) {
          const a = b.checkbox,
            d = b.legendItem || {};
          for (const b of ["group", "label", "line", "symbol"])
            d[b] && (d[b] = d[b].destroy());
          a && q(a);
          b.legendItem = void 0;
        }
        destroy() {
          for (const b of this.getAllItems()) this.destroyItem(b);
          for (const b of "clipRect up down pager nav box title group".split(
            " "
          ))
            this[b] && (this[b] = this[b].destroy());
          this.display = null;
        }
        positionCheckboxes() {
          const b = this.group && this.group.alignAttr,
            a = this.clipHeight || this.legendHeight,
            d = this.titleHeight;
          let c;
          b &&
            ((c = b.translateY),
            this.allItems.forEach(function (f) {
              const e = f.checkbox;
              let k;
              e &&
                ((k = c + d + e.y + (this.scrollOffset || 0) + 3),
                l(e, {
                  left: b.translateX + f.checkboxOffset + e.x - 20 + "px",
                  top: k + "px",
                  display:
                    this.proximate || (k > c - 6 && k < c + a - 6)
                      ? ""
                      : "none",
                }));
            }, this));
        }
        renderTitle() {
          var b = this.options;
          const a = this.padding,
            d = b.title;
          let c = 0;
          d.text &&
            (this.title ||
              ((this.title = this.chart.renderer
                .label(
                  d.text,
                  a - 3,
                  a - 4,
                  void 0,
                  void 0,
                  void 0,
                  b.useHTML,
                  void 0,
                  "legend-title"
                )
                .attr({ zIndex: 1 })),
              this.chart.styledMode || this.title.css(d.style),
              this.title.add(this.group)),
            d.width || this.title.css({ width: this.maxLegendWidth + "px" }),
            (b = this.title.getBBox()),
            (c = b.height),
            (this.offsetWidth = b.width),
            this.contentGroup.attr({ translateY: c }));
          this.titleHeight = c;
        }
        setText(b) {
          const a = this.options;
          b.legendItem.label.attr({
            text: a.labelFormat
              ? t(a.labelFormat, b, this.chart)
              : a.labelFormatter.call(b),
          });
        }
        renderItem(b) {
          const a = (b.legendItem = b.legendItem || {});
          var d = this.chart,
            c = d.renderer;
          const g = this.options,
            m = this.symbolWidth,
            h = g.symbolPadding || 0,
            p = this.itemStyle,
            l = this.itemHiddenStyle,
            n = "horizontal" === g.layout ? e(g.itemDistance, 20) : 0,
            r = !g.rtl,
            q = !b.series,
            u = !q && b.series.drawLegendSymbol ? b.series : b;
          var w = u.options;
          const t = this.createCheckboxForItem && w && w.showCheckbox,
            B = g.useHTML,
            P = b.options.className;
          let I = a.label;
          w = m + h + n + (t ? 20 : 0);
          I ||
            ((a.group = c
              .g("legend-item")
              .addClass(
                "highcharts-" +
                  u.type +
                  "-series highcharts-color-" +
                  b.colorIndex +
                  (P ? " " + P : "") +
                  (q ? " highcharts-series-" + b.index : "")
              )
              .attr({ zIndex: 1 })
              .add(this.scrollGroup)),
            (a.label = I = c.text("", r ? m + h : -h, this.baseline || 0, B)),
            d.styledMode || I.css(F(b.visible ? p : l)),
            I.attr({ align: r ? "left" : "right", zIndex: 2 }).add(a.group),
            this.baseline ||
              ((this.fontMetrics = c.fontMetrics(I)),
              (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
              I.attr("y", this.baseline),
              (this.symbolHeight = e(g.symbolHeight, this.fontMetrics.f)),
              g.squareSymbol &&
                ((this.symbolWidth = e(
                  g.symbolWidth,
                  Math.max(this.symbolHeight, 16)
                )),
                (w = this.symbolWidth + h + n + (t ? 20 : 0)),
                r && I.attr("x", this.symbolWidth + h))),
            u.drawLegendSymbol(this, b),
            this.setItemEvents && this.setItemEvents(b, I, B));
          t &&
            !b.checkbox &&
            this.createCheckboxForItem &&
            this.createCheckboxForItem(b);
          this.colorizeItem(b, b.visible);
          (!d.styledMode && p.width) ||
            I.css({
              width:
                (g.itemWidth || this.widthOption || d.spacingBox.width) -
                w +
                "px",
            });
          this.setText(b);
          d = I.getBBox();
          c = (this.fontMetrics && this.fontMetrics.h) || 0;
          b.itemWidth = b.checkboxOffset =
            g.itemWidth || a.labelWidth || d.width + w;
          this.maxItemWidth = Math.max(this.maxItemWidth, b.itemWidth);
          this.totalItemWidth += b.itemWidth;
          this.itemHeight = b.itemHeight = Math.round(
            a.labelHeight || (d.height > 1.5 * c ? d.height : c)
          );
        }
        layoutItem(b) {
          var a = this.options;
          const d = this.padding,
            c = "horizontal" === a.layout,
            g = b.itemHeight,
            m = this.itemMarginBottom,
            h = this.itemMarginTop,
            p = c ? e(a.itemDistance, 20) : 0,
            l = this.maxLegendWidth;
          a =
            a.alignColumns && this.totalItemWidth > l
              ? this.maxItemWidth
              : b.itemWidth;
          const n = b.legendItem || {};
          c &&
            this.itemX - d + a > l &&
            ((this.itemX = d),
            this.lastLineHeight && (this.itemY += h + this.lastLineHeight + m),
            (this.lastLineHeight = 0));
          this.lastItemY = h + this.itemY + m;
          this.lastLineHeight = Math.max(g, this.lastLineHeight);
          n.x = this.itemX;
          n.y = this.itemY;
          c
            ? (this.itemX += a)
            : ((this.itemY += h + g + m), (this.lastLineHeight = g));
          this.offsetWidth =
            this.widthOption ||
            Math.max(
              (c ? this.itemX - d - (b.checkbox ? 0 : p) : a) + d,
              this.offsetWidth
            );
        }
        getAllItems() {
          let b = [];
          this.chart.series.forEach(function (a) {
            const d = a && a.options;
            a &&
              e(d.showInLegend, h(d.linkedTo) ? !1 : void 0, !0) &&
              (b = b.concat(
                (a.legendItem || {}).labels ||
                  ("point" === d.legendType ? a.data : a)
              ));
          });
          w(this, "afterGetAllItems", { allItems: b });
          return b;
        }
        getAlignment() {
          const b = this.options;
          return this.proximate
            ? b.align.charAt(0) + "tv"
            : b.floating
            ? ""
            : b.align.charAt(0) +
              b.verticalAlign.charAt(0) +
              b.layout.charAt(0);
        }
        adjustMargins(b, a) {
          const d = this.chart,
            c = this.options,
            f = this.getAlignment();
          f &&
            [
              /(lth|ct|rth)/,
              /(rtv|rm|rbv)/,
              /(rbh|cb|lbh)/,
              /(lbv|lm|ltv)/,
            ].forEach(function (g, k) {
              g.test(f) &&
                !h(b[k]) &&
                (d[v[k]] = Math.max(
                  d[v[k]],
                  d.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] +
                    [1, -1, -1, 1][k] * c[k % 2 ? "x" : "y"] +
                    e(c.margin, 12) +
                    a[k] +
                    (d.titleOffset[k] || 0)
                ));
            });
        }
        proximatePositions() {
          const b = this.chart,
            a = [],
            d = "left" === this.options.align;
          this.allItems.forEach(function (c) {
            var f;
            var e = d;
            let k;
            c.yAxis &&
              (c.xAxis.options.reversed && (e = !e),
              c.points &&
                (f = g(
                  e ? c.points : c.points.slice(0).reverse(),
                  function (b) {
                    return J(b.plotY);
                  }
                )),
              (e =
                this.itemMarginTop +
                c.legendItem.label.getBBox().height +
                this.itemMarginBottom),
              (k = c.yAxis.top - b.plotTop),
              c.visible
                ? ((f = f ? f.plotY : c.yAxis.height), (f += k - 0.3 * e))
                : (f = k + c.yAxis.height),
              a.push({ target: f, size: e, item: c }));
          }, this);
          let e;
          for (const d of c(a, b.plotHeight))
            (e = d.item.legendItem || {}),
              J(d.pos) && (e.y = b.plotTop - b.spacing[0] + d.pos);
        }
        render() {
          const b = this.chart,
            a = b.renderer,
            d = this.options,
            c = this.padding;
          var e = this.getAllItems();
          let g,
            h = this.group,
            p = this.box;
          this.itemX = c;
          this.itemY = this.initialItemY;
          this.lastItemY = this.offsetWidth = 0;
          this.widthOption = m(d.width, b.spacingBox.width - c);
          var l = b.spacingBox.width - 2 * c - d.x;
          -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) &&
            (l /= 2);
          this.maxLegendWidth = this.widthOption || l;
          h ||
            ((this.group = h =
              a
                .g("legend")
                .addClass(d.className || "")
                .attr({ zIndex: 7 })
                .add()),
            (this.contentGroup = a.g().attr({ zIndex: 1 }).add(h)),
            (this.scrollGroup = a.g().add(this.contentGroup)));
          this.renderTitle();
          u(
            e,
            (b, a) =>
              ((b.options && b.options.legendIndex) || 0) -
              ((a.options && a.options.legendIndex) || 0)
          );
          d.reversed && e.reverse();
          this.allItems = e;
          this.display = l = !!e.length;
          this.itemHeight =
            this.totalItemWidth =
            this.maxItemWidth =
            this.lastLineHeight =
              0;
          e.forEach(this.renderItem, this);
          e.forEach(this.layoutItem, this);
          e = (this.widthOption || this.offsetWidth) + c;
          g = this.lastItemY + this.lastLineHeight + this.titleHeight;
          g = this.handleOverflow(g);
          g += c;
          p ||
            (this.box = p =
              a
                .rect()
                .addClass("highcharts-legend-box")
                .attr({ r: d.borderRadius })
                .add(h));
          b.styledMode ||
            p
              .attr({
                stroke: d.borderColor,
                "stroke-width": d.borderWidth || 0,
                fill: d.backgroundColor || "none",
              })
              .shadow(d.shadow);
          if (0 < e && 0 < g)
            p[p.placed ? "animate" : "attr"](
              p.crisp.call(
                {},
                { x: 0, y: 0, width: e, height: g },
                p.strokeWidth()
              )
            );
          h[l ? "show" : "hide"]();
          b.styledMode && "none" === h.getStyle("display") && (e = g = 0);
          this.legendWidth = e;
          this.legendHeight = g;
          l && this.align();
          this.proximate || this.positionItems();
          w(this, "afterRender");
        }
        align(b = this.chart.spacingBox) {
          const a = this.chart,
            d = this.options;
          let c = b.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0]
            ? (c += a.titleOffset[0])
            : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
              0 < a.titleOffset[2] &&
              (c -= a.titleOffset[2]);
          c !== b.y && (b = F(b, { y: c }));
          a.hasRendered || (this.group.placed = !1);
          this.group.align(
            F(d, {
              width: this.legendWidth,
              height: this.legendHeight,
              verticalAlign: this.proximate ? "top" : d.verticalAlign,
            }),
            !0,
            b
          );
        }
        handleOverflow(b) {
          const a = this,
            d = this.chart,
            c = d.renderer,
            g = this.options;
          var m = g.y;
          const h = "top" === g.verticalAlign,
            p = this.padding,
            l = g.maxHeight,
            n = g.navigation,
            r = e(n.animation, !0),
            q = n.arrowSize || 12,
            u = this.pages,
            w = this.allItems,
            t = function (b) {
              "number" === typeof b
                ? J.attr({ height: b })
                : J && ((a.clipRect = J.destroy()), a.contentGroup.clip());
              a.contentGroup.div &&
                (a.contentGroup.div.style.clip = b
                  ? "rect(" + p + "px,9999px," + (p + b) + "px,0)"
                  : "auto");
            },
            B = function (b) {
              a[b] = c
                .circle(0, 0, 1.3 * q)
                .translate(q / 2, q / 2)
                .add(x);
              d.styledMode || a[b].attr("fill", "rgba(0,0,0,0.0001)");
              return a[b];
            };
          let P, I, v;
          m = d.spacingBox.height + (h ? -m : m) - p;
          let x = this.nav,
            J = this.clipRect;
          "horizontal" !== g.layout ||
            "middle" === g.verticalAlign ||
            g.floating ||
            (m /= 2);
          l && (m = Math.min(m, l));
          u.length = 0;
          b && 0 < m && b > m && !1 !== n.enabled
            ? ((this.clipHeight = P =
                Math.max(m - 20 - this.titleHeight - p, 0)),
              (this.currentPage = e(this.currentPage, 1)),
              (this.fullHeight = b),
              w.forEach((b, a) => {
                v = b.legendItem || {};
                b = v.y || 0;
                const d = Math.round(v.label.getBBox().height);
                let c = u.length;
                if (!c || (b - u[c - 1] > P && (I || b) !== u[c - 1]))
                  u.push(I || b), c++;
                v.pageIx = c - 1;
                I && ((w[a - 1].legendItem || {}).pageIx = c - 1);
                a === w.length - 1 &&
                  b + d - u[c - 1] > P &&
                  b > u[c - 1] &&
                  (u.push(b), (v.pageIx = c));
                b !== I && (I = b);
              }),
              J ||
                ((J = a.clipRect = c.clipRect(0, p - 2, 9999, 0)),
                a.contentGroup.clip(J)),
              t(P),
              x ||
                ((this.nav = x = c.g().attr({ zIndex: 1 }).add(this.group)),
                (this.up = c.symbol("triangle", 0, 0, q, q).add(x)),
                B("upTracker").on("click", function () {
                  a.scroll(-1, r);
                }),
                (this.pager = c
                  .text("", 15, 10)
                  .addClass("highcharts-legend-navigation")),
                !d.styledMode && n.style && this.pager.css(n.style),
                this.pager.add(x),
                (this.down = c.symbol("triangle-down", 0, 0, q, q).add(x)),
                B("downTracker").on("click", function () {
                  a.scroll(1, r);
                })),
              a.scroll(0),
              (b = m))
            : x &&
              (t(),
              (this.nav = x.destroy()),
              this.scrollGroup.attr({ translateY: 1 }),
              (this.clipHeight = 0));
          return b;
        }
        scroll(b, a) {
          const d = this.chart,
            c = this.pages,
            f = c.length,
            g = this.clipHeight,
            m = this.options.navigation,
            h = this.pager,
            l = this.padding;
          let n = this.currentPage + b;
          n > f && (n = f);
          0 < n &&
            ("undefined" !== typeof a && z(a, d),
            this.nav.attr({
              translateX: l,
              translateY: g + this.padding + 7 + this.titleHeight,
              visibility: "inherit",
            }),
            [this.up, this.upTracker].forEach(function (b) {
              b.attr({
                class:
                  1 === n
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }),
            h.attr({ text: n + "/" + f }),
            [this.down, this.downTracker].forEach(function (b) {
              b.attr({
                x: 18 + this.pager.getBBox().width,
                class:
                  n === f
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }, this),
            d.styledMode ||
              (this.up.attr({
                fill: 1 === n ? m.inactiveColor : m.activeColor,
              }),
              this.upTracker.css({ cursor: 1 === n ? "default" : "pointer" }),
              this.down.attr({
                fill: n === f ? m.inactiveColor : m.activeColor,
              }),
              this.downTracker.css({
                cursor: n === f ? "default" : "pointer",
              })),
            (this.scrollOffset = -c[n - 1] + this.initialItemY),
            this.scrollGroup.animate({ translateY: this.scrollOffset }),
            (this.currentPage = n),
            this.positionCheckboxes(),
            (b = x(e(a, d.renderer.globalAnimation, !0))),
            p(() => {
              w(this, "afterScroll", { currentPage: n });
            }, b.duration));
        }
        setItemEvents(b, a, d) {
          const c = this,
            f = b.legendItem || {},
            e = c.chart.renderer.boxWrapper,
            g = b instanceof L,
            m = "highcharts-legend-" + (g ? "point" : "series") + "-active",
            h = c.chart.styledMode;
          d = d ? [a, f.symbol] : [f.group];
          const p = (a) => {
            c.allItems.forEach((d) => {
              b !== d &&
                [d].concat(d.linkedSeries || []).forEach((b) => {
                  b.setState(a, !g);
                });
            });
          };
          for (const f of d)
            if (f)
              f.on("mouseover", function () {
                b.visible && p("inactive");
                b.setState("hover");
                b.visible && e.addClass(m);
                h || a.css(c.options.itemHoverStyle);
              })
                .on("mouseout", function () {
                  c.chart.styledMode ||
                    a.css(F(b.visible ? c.itemStyle : c.itemHiddenStyle));
                  p("");
                  e.removeClass(m);
                  b.setState();
                })
                .on("click", function (a) {
                  const d = function () {
                    b.setVisible && b.setVisible();
                    p(b.visible ? "inactive" : "");
                  };
                  e.removeClass(m);
                  a = { browserEvent: a };
                  b.firePointEvent
                    ? b.firePointEvent("legendItemClick", a, d)
                    : w(b, "legendItemClick", a, d);
                });
        }
        createCheckboxForItem(b) {
          b.checkbox = r(
            "input",
            {
              type: "checkbox",
              className: "highcharts-legend-checkbox",
              checked: b.selected,
              defaultChecked: b.selected,
            },
            this.options.itemCheckboxStyle,
            this.chart.container
          );
          n(b.checkbox, "click", function (a) {
            w(
              b.series || b,
              "checkboxClick",
              { checked: a.target.checked, item: b },
              function () {
                b.select();
              }
            );
          });
        }
      }
      (function (b) {
        const a = [];
        b.compose = function (d) {
          D.pushUnique(a, d) &&
            n(d, "beforeMargins", function () {
              this.legend = new b(this, this.options.legend);
            });
        };
      })(H || (H = {}));
      ("");
      return H;
    }
  );
  M(
    a,
    "Core/Series/SeriesRegistry.js",
    [
      a["Core/Globals.js"],
      a["Core/Defaults.js"],
      a["Core/Series/Point.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L) {
      const { defaultOptions: x } = y,
        { extendClass: D, merge: C } = L;
      var z;
      (function (t) {
        function v(a, n) {
          const c = x.plotOptions || {},
            l = n.defaultOptions,
            h = n.prototype;
          h.type = a;
          h.pointClass || (h.pointClass = G);
          l && (c[a] = l);
          t.seriesTypes[a] = n;
        }
        t.seriesTypes = a.seriesTypes;
        t.registerSeriesType = v;
        t.seriesType = function (a, n, r, l, h) {
          const c = x.plotOptions || {};
          n = n || "";
          c[a] = C(c[n], r);
          v(a, D(t.seriesTypes[n] || function () {}, l));
          t.seriesTypes[a].prototype.type = a;
          h && (t.seriesTypes[a].prototype.pointClass = D(G, h));
          return t.seriesTypes[a];
        };
      })(z || (z = {}));
      return z;
    }
  );
  M(
    a,
    "Core/Chart/Chart.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Defaults.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Time.js"],
      a["Core/Utilities.js"],
      a["Core/Renderer/HTML/AST.js"],
    ],
    function (a, y, G, L, A, D, C, z, t, v, c, n) {
      const { animate: r, animObject: l, setAnimation: h } = a,
        { defaultOptions: q, defaultTime: g } = G,
        { numberFormat: w } = L,
        { registerEventOptions: x } = A,
        { charts: F, doc: e, marginNames: m, svg: u, win: p } = D,
        { seriesTypes: H } = z,
        {
          addEvent: b,
          attr: f,
          cleanRecursively: d,
          createElement: k,
          css: O,
          defined: N,
          discardElement: E,
          erase: Z,
          error: T,
          extend: U,
          find: K,
          fireEvent: Q,
          getStyle: M,
          isArray: fa,
          isNumber: Y,
          isObject: B,
          isString: P,
          merge: I,
          objectEach: V,
          pick: R,
          pInt: ja,
          relativeLength: W,
          removeEvent: ba,
          splat: ca,
          syncTimeout: ha,
          uniqueKey: ka,
        } = c;
      class da {
        static chart(b, a, d) {
          return new da(b, a, d);
        }
        constructor(b, a, d) {
          this.series =
            this.renderTo =
            this.renderer =
            this.pointer =
            this.pointCount =
            this.plotWidth =
            this.plotTop =
            this.plotLeft =
            this.plotHeight =
            this.plotBox =
            this.options =
            this.numberFormatter =
            this.margin =
            this.labelCollectors =
            this.isResizing =
            this.index =
            this.eventOptions =
            this.container =
            this.colorCounter =
            this.clipBox =
            this.chartWidth =
            this.chartHeight =
            this.bounds =
            this.axisOffset =
            this.axes =
              void 0;
          this.sharedClips = {};
          this.yAxis =
            this.xAxis =
            this.userOptions =
            this.titleOffset =
            this.time =
            this.symbolCounter =
            this.spacingBox =
            this.spacing =
              void 0;
          this.getArgs(b, a, d);
        }
        getArgs(b, a, d) {
          P(b) || b.nodeName
            ? ((this.renderTo = b), this.init(a, d))
            : this.init(b, a);
        }
        init(b, a) {
          const d = b.plotOptions || {};
          Q(this, "init", { args: arguments }, function () {
            const c = I(q, b),
              f = c.chart;
            V(c.plotOptions, function (b, a) {
              B(b) && (b.tooltip = (d[a] && I(d[a].tooltip)) || void 0);
            });
            c.tooltip.userOptions =
              (b.chart && b.chart.forExport && b.tooltip.userOptions) ||
              b.tooltip;
            this.userOptions = b;
            this.margin = [];
            this.spacing = [];
            this.bounds = { h: {}, v: {} };
            this.labelCollectors = [];
            this.callback = a;
            this.isResizing = 0;
            const e = (f.zooming = f.zooming || {});
            b.chart && !b.chart.zooming && (e.resetButton = f.resetZoomButton);
            e.key = R(e.key, f.zoomKey);
            e.pinchType = R(e.pinchType, f.pinchType);
            e.singleTouch = R(e.singleTouch, f.zoomBySingleTouch);
            e.type = R(e.type, f.zoomType);
            this.options = c;
            this.axes = [];
            this.series = [];
            this.time =
              b.time && Object.keys(b.time).length ? new v(b.time) : D.time;
            this.numberFormatter = f.numberFormatter || w;
            this.styledMode = f.styledMode;
            this.hasCartesianSeries = f.showAxes;
            this.index = F.length;
            F.push(this);
            D.chartCount++;
            x(this, f);
            this.xAxis = [];
            this.yAxis = [];
            this.pointCount = this.colorCounter = this.symbolCounter = 0;
            Q(this, "afterInit");
            this.firstRender();
          });
        }
        initSeries(b) {
          var a = this.options.chart;
          a = b.type || a.type;
          const d = H[a];
          d || T(17, !0, this, { missingModuleFor: a });
          a = new d();
          "function" === typeof a.init && a.init(this, b);
          return a;
        }
        setSeriesData() {
          this.getSeriesOrderByLinks().forEach(function (b) {
            b.points ||
              b.data ||
              !b.enabledDataSorting ||
              b.setData(b.options.data, !1);
          });
        }
        getSeriesOrderByLinks() {
          return this.series.concat().sort(function (b, a) {
            return b.linkedSeries.length || a.linkedSeries.length
              ? a.linkedSeries.length - b.linkedSeries.length
              : 0;
          });
        }
        orderSeries(b) {
          const a = this.series;
          for (let d = b || 0, c = a.length; d < c; ++d)
            a[d] && ((a[d].index = d), (a[d].name = a[d].getName()));
        }
        isInsidePlot(b, a, d = {}) {
          const {
            inverted: c,
            plotBox: f,
            plotLeft: e,
            plotTop: g,
            scrollablePlotBox: k,
          } = this;
          var m = 0;
          let h = 0;
          d.visiblePlotOnly &&
            this.scrollingContainer &&
            ({ scrollLeft: m, scrollTop: h } = this.scrollingContainer);
          const p = d.series,
            l = (d.visiblePlotOnly && k) || f;
          var n = d.inverted ? a : b;
          a = d.inverted ? b : a;
          b = { x: n, y: a, isInsidePlot: !0, options: d };
          if (!d.ignoreX) {
            const a = (p && (c && !this.polar ? p.yAxis : p.xAxis)) || {
              pos: e,
              len: Infinity,
            };
            n = d.paneCoordinates ? a.pos + n : e + n;
            (n >= Math.max(m + e, a.pos) &&
              n <= Math.min(m + e + l.width, a.pos + a.len)) ||
              (b.isInsidePlot = !1);
          }
          !d.ignoreY &&
            b.isInsidePlot &&
            ((m = (!c && d.axis && !d.axis.isXAxis && d.axis) ||
              (p && (c ? p.xAxis : p.yAxis)) || { pos: g, len: Infinity }),
            (d = d.paneCoordinates ? m.pos + a : g + a),
            (d >= Math.max(h + g, m.pos) &&
              d <= Math.min(h + g + l.height, m.pos + m.len)) ||
              (b.isInsidePlot = !1));
          Q(this, "afterIsInsidePlot", b);
          return b.isInsidePlot;
        }
        redraw(b) {
          Q(this, "beforeRedraw");
          const a = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
            d = this.series,
            c = this.pointer,
            f = this.legend,
            e = this.userOptions.legend,
            g = this.renderer,
            k = g.isHidden(),
            m = [];
          let p,
            l,
            n = this.isDirtyBox,
            B = this.isDirtyLegend,
            r;
          g.rootFontSize = g.boxWrapper.getStyle("font-size");
          this.setResponsive && this.setResponsive(!1);
          h(this.hasRendered ? b : !1, this);
          k && this.temporaryDisplay();
          this.layOutTitles();
          for (b = d.length; b--; )
            if (((r = d[b]), r.options.stacking || r.options.centerInCategory))
              if (((l = !0), r.isDirty)) {
                p = !0;
                break;
              }
          if (p)
            for (b = d.length; b--; )
              (r = d[b]), r.options.stacking && (r.isDirty = !0);
          d.forEach(function (b) {
            b.isDirty &&
              ("point" === b.options.legendType
                ? ("function" === typeof b.updateTotals && b.updateTotals(),
                  (B = !0))
                : e && (e.labelFormatter || e.labelFormat) && (B = !0));
            b.isDirtyData && Q(b, "updatedData");
          });
          B &&
            f &&
            f.options.enabled &&
            (f.render(), (this.isDirtyLegend = !1));
          l && this.getStacks();
          a.forEach(function (b) {
            b.updateNames();
            b.setScale();
          });
          this.getMargins();
          a.forEach(function (b) {
            b.isDirty && (n = !0);
          });
          a.forEach(function (b) {
            const a = b.min + "," + b.max;
            b.extKey !== a &&
              ((b.extKey = a),
              m.push(function () {
                Q(b, "afterSetExtremes", U(b.eventArgs, b.getExtremes()));
                delete b.eventArgs;
              }));
            (n || l) && b.redraw();
          });
          n && this.drawChartBox();
          Q(this, "predraw");
          d.forEach(function (b) {
            (n || b.isDirty) && b.visible && b.redraw();
            b.isDirtyData = !1;
          });
          c && c.reset(!0);
          g.draw();
          Q(this, "redraw");
          Q(this, "render");
          k && this.temporaryDisplay(!0);
          m.forEach(function (b) {
            b.call();
          });
        }
        get(b) {
          function a(a) {
            return a.id === b || (a.options && a.options.id === b);
          }
          const d = this.series;
          let c = K(this.axes, a) || K(this.series, a);
          for (let b = 0; !c && b < d.length; b++) c = K(d[b].points || [], a);
          return c;
        }
        getAxes() {
          const b = this;
          var a = this.options;
          const d = (a.xAxis = ca(a.xAxis || {}));
          a = a.yAxis = ca(a.yAxis || {});
          Q(this, "getAxes");
          d.forEach(function (b, a) {
            b.index = a;
            b.isX = !0;
          });
          a.forEach(function (b, a) {
            b.index = a;
          });
          d.concat(a).forEach(function (a) {
            new y(b, a);
          });
          Q(this, "afterGetAxes");
        }
        getSelectedPoints() {
          return this.series.reduce((b, a) => {
            a.getPointsCollection().forEach((a) => {
              R(a.selectedStaging, a.selected) && b.push(a);
            });
            return b;
          }, []);
        }
        getSelectedSeries() {
          return this.series.filter(function (b) {
            return b.selected;
          });
        }
        setTitle(b, a, d) {
          this.applyDescription("title", b);
          this.applyDescription("subtitle", a);
          this.applyDescription("caption", void 0);
          this.layOutTitles(d);
        }
        applyDescription(b, a) {
          const d = this;
          var c =
            "title" === b
              ? {
                  color: "#333333",
                  fontSize: this.options.isStock ? "1em" : "1.2em",
                  fontWeight: "bold",
                }
              : { color: "#666666", fontSize: "0.8em" };
          c = this.options[b] = I(
            !this.styledMode && { style: c },
            this.options[b],
            a
          );
          let f = this[b];
          f && a && (this[b] = f = f.destroy());
          c &&
            !f &&
            ((f = this.renderer
              .text(c.text, 0, 0, c.useHTML)
              .attr({
                align: c.align,
                class: "highcharts-" + b,
                zIndex: c.zIndex || 4,
              })
              .add()),
            (f.update = function (a) {
              d[
                {
                  title: "setTitle",
                  subtitle: "setSubtitle",
                  caption: "setCaption",
                }[b]
              ](a);
            }),
            this.styledMode || f.css(c.style),
            (this[b] = f));
        }
        layOutTitles(b) {
          const a = [0, 0, 0],
            d = this.renderer,
            c = this.spacingBox;
          ["title", "subtitle", "caption"].forEach(function (b) {
            const f = this[b],
              e = this.options[b],
              g = e.verticalAlign || "top";
            b =
              "title" === b
                ? "top" === g
                  ? -3
                  : 0
                : "top" === g
                ? a[0] + 2
                : 0;
            if (f) {
              f.css({
                width: (e.width || c.width + (e.widthAdjust || 0)) + "px",
              });
              const k = d.fontMetrics(f).b,
                m = Math.round(f.getBBox(e.useHTML).height);
              f.align(
                U({ y: "bottom" === g ? k : b + k, height: m }, e),
                !1,
                "spacingBox"
              );
              e.floating ||
                ("top" === g
                  ? (a[0] = Math.ceil(a[0] + m))
                  : "bottom" === g && (a[2] = Math.ceil(a[2] + m)));
            }
          }, this);
          a[0] &&
            "top" === (this.options.title.verticalAlign || "top") &&
            (a[0] += this.options.title.margin);
          a[2] &&
            "bottom" === this.options.caption.verticalAlign &&
            (a[2] += this.options.caption.margin);
          const f =
            !this.titleOffset || this.titleOffset.join(",") !== a.join(",");
          this.titleOffset = a;
          Q(this, "afterLayOutTitles");
          !this.isDirtyBox &&
            f &&
            ((this.isDirtyBox = this.isDirtyLegend = f),
            this.hasRendered && R(b, !0) && this.isDirtyBox && this.redraw());
        }
        getContainerBox() {
          return {
            width: M(this.renderTo, "width", !0) || 0,
            height: M(this.renderTo, "height", !0) || 0,
          };
        }
        getChartSize() {
          var b = this.options.chart;
          const a = b.width;
          b = b.height;
          const d = this.getContainerBox();
          this.chartWidth = Math.max(0, a || d.width || 600);
          this.chartHeight = Math.max(
            0,
            W(b, this.chartWidth) || (1 < d.height ? d.height : 400)
          );
          this.containerBox = d;
        }
        temporaryDisplay(b) {
          let a = this.renderTo;
          if (b)
            for (; a && a.style; )
              a.hcOrigStyle && (O(a, a.hcOrigStyle), delete a.hcOrigStyle),
                a.hcOrigDetached &&
                  (e.body.removeChild(a), (a.hcOrigDetached = !1)),
                (a = a.parentNode);
          else
            for (; a && a.style; ) {
              e.body.contains(a) ||
                a.parentNode ||
                ((a.hcOrigDetached = !0), e.body.appendChild(a));
              if ("none" === M(a, "display", !1) || a.hcOricDetached)
                (a.hcOrigStyle = {
                  display: a.style.display,
                  height: a.style.height,
                  overflow: a.style.overflow,
                }),
                  (b = { display: "block", overflow: "hidden" }),
                  a !== this.renderTo && (b.height = 0),
                  O(a, b),
                  a.offsetWidth ||
                    a.style.setProperty("display", "block", "important");
              a = a.parentNode;
              if (a === e.body) break;
            }
        }
        setClassName(b) {
          this.container.className = "highcharts-container " + (b || "");
        }
        getContainer() {
          const b = this.options,
            a = b.chart;
          var d = ka();
          let c,
            g = this.renderTo;
          g || (this.renderTo = g = a.renderTo);
          P(g) && (this.renderTo = g = e.getElementById(g));
          g || T(13, !0, this);
          var m = ja(f(g, "data-highcharts-chart"));
          Y(m) && F[m] && F[m].hasRendered && F[m].destroy();
          f(g, "data-highcharts-chart", this.index);
          g.innerHTML = n.emptyHTML;
          a.skipClone || g.offsetWidth || this.temporaryDisplay();
          this.getChartSize();
          m = this.chartWidth;
          const p = this.chartHeight;
          O(g, { overflow: "hidden" });
          this.styledMode ||
            (c = U(
              {
                position: "relative",
                overflow: "hidden",
                width: m + "px",
                height: p + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                userSelect: "none",
                "touch-action": "manipulation",
                outline: "none",
              },
              a.style || {}
            ));
          this.container = d = k("div", { id: d }, c, g);
          this._cursor = d.style.cursor;
          this.renderer = new (
            a.renderer || !u ? C.getRendererType(a.renderer) : t
          )(
            d,
            m,
            p,
            void 0,
            a.forExport,
            b.exporting && b.exporting.allowHTML,
            this.styledMode
          );
          this.containerBox = this.getContainerBox();
          h(void 0, this);
          this.setClassName(a.className);
          if (this.styledMode)
            for (const a in b.defs) this.renderer.definition(b.defs[a]);
          else this.renderer.setStyle(a.style);
          this.renderer.chartIndex = this.index;
          Q(this, "afterGetContainer");
        }
        getMargins(b) {
          const { spacing: a, margin: d, titleOffset: c } = this;
          this.resetMargins();
          c[0] &&
            !N(d[0]) &&
            (this.plotTop = Math.max(this.plotTop, c[0] + a[0]));
          c[2] &&
            !N(d[2]) &&
            (this.marginBottom = Math.max(this.marginBottom, c[2] + a[2]));
          this.legend && this.legend.display && this.legend.adjustMargins(d, a);
          Q(this, "getMargins");
          b || this.getAxisMargins();
        }
        getAxisMargins() {
          const b = this,
            a = (b.axisOffset = [0, 0, 0, 0]),
            d = b.colorAxis,
            c = b.margin,
            f = function (b) {
              b.forEach(function (b) {
                b.visible && b.getOffset();
              });
            };
          b.hasCartesianSeries ? f(b.axes) : d && d.length && f(d);
          m.forEach(function (d, f) {
            N(c[f]) || (b[d] += a[f]);
          });
          b.setChartSize();
        }
        reflow(b) {
          const a = this;
          var d = a.options.chart;
          d = N(d.width) && N(d.height);
          const f = a.containerBox,
            e = a.getContainerBox();
          delete a.pointer.chartPosition;
          if (!d && !a.isPrinting && f && e.width) {
            if (e.width !== f.width || e.height !== f.height)
              c.clearTimeout(a.reflowTimeout),
                (a.reflowTimeout = ha(
                  function () {
                    a.container && a.setSize(void 0, void 0, !1);
                  },
                  b ? 100 : 0
                ));
            a.containerBox = e;
          }
        }
        setReflow() {
          const a = this;
          var d = (b) => {
            var d;
            (null === (d = a.options) || void 0 === d ? 0 : d.chart.reflow) &&
              a.hasLoaded &&
              a.reflow(b);
          };
          "function" === typeof ResizeObserver
            ? new ResizeObserver(d).observe(a.renderTo)
            : ((d = b(p, "resize", d)), b(this, "destroy", d));
        }
        setSize(b, a, d) {
          const c = this,
            f = c.renderer;
          c.isResizing += 1;
          h(d, c);
          d = f.globalAnimation;
          c.oldChartHeight = c.chartHeight;
          c.oldChartWidth = c.chartWidth;
          "undefined" !== typeof b && (c.options.chart.width = b);
          "undefined" !== typeof a && (c.options.chart.height = a);
          c.getChartSize();
          c.styledMode ||
            (d ? r : O)(
              c.container,
              { width: c.chartWidth + "px", height: c.chartHeight + "px" },
              d
            );
          c.setChartSize(!0);
          f.setSize(c.chartWidth, c.chartHeight, d);
          c.axes.forEach(function (b) {
            b.isDirty = !0;
            b.setScale();
          });
          c.isDirtyLegend = !0;
          c.isDirtyBox = !0;
          c.layOutTitles();
          c.getMargins();
          c.redraw(d);
          c.oldChartHeight = null;
          Q(c, "resize");
          ha(function () {
            c &&
              Q(c, "endResize", null, function () {
                --c.isResizing;
              });
          }, l(d).duration);
        }
        setChartSize(b) {
          var a = this.inverted;
          const d = this.renderer;
          var c = this.chartWidth,
            f = this.chartHeight;
          const e = this.options.chart,
            g = this.spacing,
            k = this.clipOffset;
          let m, h, p, l;
          this.plotLeft = m = Math.round(this.plotLeft);
          this.plotTop = h = Math.round(this.plotTop);
          this.plotWidth = p = Math.max(
            0,
            Math.round(c - m - this.marginRight)
          );
          this.plotHeight = l = Math.max(
            0,
            Math.round(f - h - this.marginBottom)
          );
          this.plotSizeX = a ? l : p;
          this.plotSizeY = a ? p : l;
          this.plotBorderWidth = e.plotBorderWidth || 0;
          this.spacingBox = d.spacingBox = {
            x: g[3],
            y: g[0],
            width: c - g[3] - g[1],
            height: f - g[0] - g[2],
          };
          this.plotBox = d.plotBox = { x: m, y: h, width: p, height: l };
          a = 2 * Math.floor(this.plotBorderWidth / 2);
          c = Math.ceil(Math.max(a, k[3]) / 2);
          f = Math.ceil(Math.max(a, k[0]) / 2);
          this.clipBox = {
            x: c,
            y: f,
            width: Math.floor(this.plotSizeX - Math.max(a, k[1]) / 2 - c),
            height: Math.max(
              0,
              Math.floor(this.plotSizeY - Math.max(a, k[2]) / 2 - f)
            ),
          };
          b ||
            (this.axes.forEach(function (b) {
              b.setAxisSize();
              b.setAxisTranslation();
            }),
            d.alignElements());
          Q(this, "afterSetChartSize", { skipAxes: b });
        }
        resetMargins() {
          Q(this, "resetMargins");
          const b = this,
            a = b.options.chart;
          ["margin", "spacing"].forEach(function (d) {
            const c = a[d],
              f = B(c) ? c : [c, c, c, c];
            ["Top", "Right", "Bottom", "Left"].forEach(function (c, e) {
              b[d][e] = R(a[d + c], f[e]);
            });
          });
          m.forEach(function (a, d) {
            b[a] = R(b.margin[d], b.spacing[d]);
          });
          b.axisOffset = [0, 0, 0, 0];
          b.clipOffset = [0, 0, 0, 0];
        }
        drawChartBox() {
          const b = this.options.chart,
            a = this.renderer,
            d = this.chartWidth,
            c = this.chartHeight,
            f = this.styledMode,
            e = this.plotBGImage;
          var g = b.backgroundColor;
          const k = b.plotBackgroundColor,
            m = b.plotBackgroundImage,
            h = this.plotLeft,
            p = this.plotTop,
            l = this.plotWidth,
            n = this.plotHeight,
            B = this.plotBox,
            r = this.clipRect,
            q = this.clipBox;
          let u = this.chartBackground,
            I = this.plotBackground,
            w = this.plotBorder,
            t,
            P,
            v = "animate";
          u ||
            ((this.chartBackground = u =
              a.rect().addClass("highcharts-background").add()),
            (v = "attr"));
          if (f) t = P = u.strokeWidth();
          else {
            t = b.borderWidth || 0;
            P = t + (b.shadow ? 8 : 0);
            g = { fill: g || "none" };
            if (t || u["stroke-width"])
              (g.stroke = b.borderColor), (g["stroke-width"] = t);
            u.attr(g).shadow(b.shadow);
          }
          u[v]({
            x: P / 2,
            y: P / 2,
            width: d - P - (t % 2),
            height: c - P - (t % 2),
            r: b.borderRadius,
          });
          v = "animate";
          I ||
            ((v = "attr"),
            (this.plotBackground = I =
              a.rect().addClass("highcharts-plot-background").add()));
          I[v](B);
          f ||
            (I.attr({ fill: k || "none" }).shadow(b.plotShadow),
            m &&
              (e
                ? (m !== e.attr("href") && e.attr("href", m), e.animate(B))
                : (this.plotBGImage = a.image(m, h, p, l, n).add())));
          r
            ? r.animate({ width: q.width, height: q.height })
            : (this.clipRect = a.clipRect(q));
          v = "animate";
          w ||
            ((v = "attr"),
            (this.plotBorder = w =
              a
                .rect()
                .addClass("highcharts-plot-border")
                .attr({ zIndex: 1 })
                .add()));
          f ||
            w.attr({
              stroke: b.plotBorderColor,
              "stroke-width": b.plotBorderWidth || 0,
              fill: "none",
            });
          w[v](w.crisp({ x: h, y: p, width: l, height: n }, -w.strokeWidth()));
          this.isDirtyBox = !1;
          Q(this, "afterDrawChartBox");
        }
        propFromSeries() {
          const b = this,
            a = b.options.chart,
            d = b.options.series;
          let c, f, e;
          ["inverted", "angular", "polar"].forEach(function (g) {
            f = H[a.type];
            e = a[g] || (f && f.prototype[g]);
            for (c = d && d.length; !e && c--; )
              (f = H[d[c].type]) && f.prototype[g] && (e = !0);
            b[g] = e;
          });
        }
        linkSeries(b) {
          const a = this,
            d = a.series;
          d.forEach(function (b) {
            b.linkedSeries.length = 0;
          });
          d.forEach(function (b) {
            let d = b.options.linkedTo;
            P(d) &&
              (d = ":previous" === d ? a.series[b.index - 1] : a.get(d)) &&
              d.linkedParent !== b &&
              (d.linkedSeries.push(b),
              (b.linkedParent = d),
              d.enabledDataSorting && b.setDataSortingOptions(),
              (b.visible = R(b.options.visible, d.options.visible, b.visible)));
          });
          Q(this, "afterLinkSeries", { isUpdating: b });
        }
        renderSeries() {
          this.series.forEach(function (b) {
            b.translate();
            b.render();
          });
        }
        render() {
          const b = this.axes,
            a = this.colorAxis,
            d = this.renderer,
            c = function (b) {
              b.forEach(function (b) {
                b.visible && b.render();
              });
            };
          let f = 0;
          this.setTitle();
          Q(this, "beforeMargins");
          this.getStacks && this.getStacks();
          this.getMargins(!0);
          this.setChartSize();
          const e = this.plotWidth;
          b.some(function (b) {
            if (
              b.horiz &&
              b.visible &&
              b.options.labels.enabled &&
              b.series.length
            )
              return (f = 21), !0;
          });
          const g = (this.plotHeight = Math.max(this.plotHeight - f, 0));
          b.forEach(function (b) {
            b.setScale();
          });
          this.getAxisMargins();
          const k = 1.1 < e / this.plotWidth,
            m = 1.05 < g / this.plotHeight;
          if (k || m)
            b.forEach(function (b) {
              ((b.horiz && k) || (!b.horiz && m)) && b.setTickInterval(!0);
            }),
              this.getMargins();
          this.drawChartBox();
          this.hasCartesianSeries ? c(b) : a && a.length && c(a);
          this.seriesGroup ||
            (this.seriesGroup = d
              .g("series-group")
              .attr({ zIndex: 3 })
              .shadow(this.options.chart.seriesGroupShadow)
              .add());
          this.renderSeries();
          this.addCredits();
          this.setResponsive && this.setResponsive();
          this.hasRendered = !0;
        }
        addCredits(b) {
          const a = this,
            d = I(!0, this.options.credits, b);
          d.enabled &&
            !this.credits &&
            ((this.credits = this.renderer
              .text(d.text + (this.mapCredits || ""), 0, 0)
              .addClass("highcharts-credits")
              .on("click", function () {
                d.href && (p.location.href = d.href);
              })
              .attr({ align: d.position.align, zIndex: 8 })),
            a.styledMode || this.credits.css(d.style),
            this.credits.add().align(d.position),
            (this.credits.update = function (b) {
              a.credits = a.credits.destroy();
              a.addCredits(b);
            }));
        }
        destroy() {
          const b = this,
            a = b.axes,
            d = b.series,
            c = b.container,
            f = c && c.parentNode;
          let e;
          Q(b, "destroy");
          b.renderer.forExport ? Z(F, b) : (F[b.index] = void 0);
          D.chartCount--;
          b.renderTo.removeAttribute("data-highcharts-chart");
          ba(b);
          for (e = a.length; e--; ) a[e] = a[e].destroy();
          this.scroller && this.scroller.destroy && this.scroller.destroy();
          for (e = d.length; e--; ) d[e] = d[e].destroy();
          "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
            .split(" ")
            .forEach(function (a) {
              const d = b[a];
              d && d.destroy && (b[a] = d.destroy());
            });
          c && ((c.innerHTML = n.emptyHTML), ba(c), f && E(c));
          V(b, function (a, d) {
            delete b[d];
          });
        }
        firstRender() {
          const b = this,
            a = b.options;
          b.getContainer();
          b.resetMargins();
          b.setChartSize();
          b.propFromSeries();
          b.getAxes();
          (fa(a.series) ? a.series : []).forEach(function (a) {
            b.initSeries(a);
          });
          b.linkSeries();
          b.setSeriesData();
          Q(b, "beforeRender");
          b.render();
          b.pointer.getChartPosition();
          if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
          b.temporaryDisplay(!0);
        }
        onload() {
          this.callbacks.concat([this.callback]).forEach(function (b) {
            b && "undefined" !== typeof this.index && b.apply(this, [this]);
          }, this);
          Q(this, "load");
          Q(this, "render");
          N(this.index) && this.setReflow();
          this.warnIfA11yModuleNotLoaded();
          this.hasLoaded = !0;
        }
        warnIfA11yModuleNotLoaded() {
          const { options: b, title: a } = this;
          b &&
            !this.accessibility &&
            (this.renderer.boxWrapper.attr({
              role: "img",
              "aria-label": ((a && a.element.textContent) || "").replace(
                /</g,
                "&lt;"
              ),
            }),
            (b.accessibility && !1 === b.accessibility.enabled) ||
              T(
                'Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
                !1,
                this
              ));
        }
        addSeries(b, a, d) {
          const c = this;
          let f;
          b &&
            ((a = R(a, !0)),
            Q(c, "addSeries", { options: b }, function () {
              f = c.initSeries(b);
              c.isDirtyLegend = !0;
              c.linkSeries();
              f.enabledDataSorting && f.setData(b.data, !1);
              Q(c, "afterAddSeries", { series: f });
              a && c.redraw(d);
            }));
          return f;
        }
        addAxis(b, a, d, c) {
          return this.createAxis(a ? "xAxis" : "yAxis", {
            axis: b,
            redraw: d,
            animation: c,
          });
        }
        addColorAxis(b, a, d) {
          return this.createAxis("colorAxis", {
            axis: b,
            redraw: a,
            animation: d,
          });
        }
        createAxis(b, a) {
          b = new y(
            this,
            I(a.axis, { index: this[b].length, isX: "xAxis" === b })
          );
          R(a.redraw, !0) && this.redraw(a.animation);
          return b;
        }
        showLoading(a) {
          const d = this,
            c = d.options,
            f = c.loading,
            e = function () {
              g &&
                O(g, {
                  left: d.plotLeft + "px",
                  top: d.plotTop + "px",
                  width: d.plotWidth + "px",
                  height: d.plotHeight + "px",
                });
            };
          let g = d.loadingDiv,
            m = d.loadingSpan;
          g ||
            (d.loadingDiv = g =
              k(
                "div",
                { className: "highcharts-loading highcharts-loading-hidden" },
                null,
                d.container
              ));
          m ||
            ((d.loadingSpan = m =
              k("span", { className: "highcharts-loading-inner" }, null, g)),
            b(d, "redraw", e));
          g.className = "highcharts-loading";
          n.setElementHTML(m, R(a, c.lang.loading, ""));
          d.styledMode ||
            (O(g, U(f.style, { zIndex: 10 })),
            O(m, f.labelStyle),
            d.loadingShown ||
              (O(g, { opacity: 0, display: "" }),
              r(
                g,
                { opacity: f.style.opacity || 0.5 },
                { duration: f.showDuration || 0 }
              )));
          d.loadingShown = !0;
          e();
        }
        hideLoading() {
          const b = this.options,
            a = this.loadingDiv;
          a &&
            ((a.className = "highcharts-loading highcharts-loading-hidden"),
            this.styledMode ||
              r(
                a,
                { opacity: 0 },
                {
                  duration: b.loading.hideDuration || 100,
                  complete: function () {
                    O(a, { display: "none" });
                  },
                }
              ));
          this.loadingShown = !1;
        }
        update(b, a, c, f) {
          const e = this,
            k = {
              credits: "addCredits",
              title: "setTitle",
              subtitle: "setSubtitle",
              caption: "setCaption",
            },
            m = b.isResponsiveOptions,
            h = [];
          let p, l;
          Q(e, "update", { options: b });
          m || e.setResponsive(!1, !0);
          b = d(b, e.options);
          e.userOptions = I(e.userOptions, b);
          var n = b.chart;
          if (n) {
            I(!0, e.options.chart, n);
            "className" in n && e.setClassName(n.className);
            if ("inverted" in n || "polar" in n || "type" in n) {
              e.propFromSeries();
              var B = !0;
            }
            "alignTicks" in n && (B = !0);
            "events" in n && x(this, n);
            V(n, function (b, a) {
              -1 !== e.propsRequireUpdateSeries.indexOf("chart." + a) &&
                (p = !0);
              -1 !== e.propsRequireDirtyBox.indexOf(a) && (e.isDirtyBox = !0);
              -1 !== e.propsRequireReflow.indexOf(a) &&
                (m ? (e.isDirtyBox = !0) : (l = !0));
            });
            !e.styledMode &&
              n.style &&
              e.renderer.setStyle(e.options.chart.style || {});
          }
          !e.styledMode && b.colors && (this.options.colors = b.colors);
          b.time &&
            (this.time === g && (this.time = new v(b.time)),
            I(!0, e.options.time, b.time));
          V(b, function (a, d) {
            if (e[d] && "function" === typeof e[d].update) e[d].update(a, !1);
            else if ("function" === typeof e[k[d]]) e[k[d]](a);
            else
              "colors" !== d &&
                -1 === e.collectionsWithUpdate.indexOf(d) &&
                I(!0, e.options[d], b[d]);
            "chart" !== d &&
              -1 !== e.propsRequireUpdateSeries.indexOf(d) &&
              (p = !0);
          });
          this.collectionsWithUpdate.forEach(function (a) {
            let d;
            b[a] &&
              ((d = []),
              e[a].forEach(function (b, a) {
                b.options.isInternal || d.push(R(b.options.index, a));
              }),
              ca(b[a]).forEach(function (b, f) {
                const g = N(b.id);
                let k;
                g && (k = e.get(b.id));
                !k &&
                  e[a] &&
                  (k = e[a][d ? d[f] : f]) &&
                  g &&
                  N(k.options.id) &&
                  (k = void 0);
                k && k.coll === a && (k.update(b, !1), c && (k.touched = !0));
                !k &&
                  c &&
                  e.collectionsWithInit[a] &&
                  (e.collectionsWithInit[a][0].apply(
                    e,
                    [b].concat(e.collectionsWithInit[a][1] || []).concat([!1])
                  ).touched = !0);
              }),
              c &&
                e[a].forEach(function (b) {
                  b.touched || b.options.isInternal
                    ? delete b.touched
                    : h.push(b);
                }));
          });
          h.forEach(function (b) {
            b.chart && b.remove && b.remove(!1);
          });
          B &&
            e.axes.forEach(function (b) {
              b.update({}, !1);
            });
          p &&
            e.getSeriesOrderByLinks().forEach(function (b) {
              b.chart && b.update({}, !1);
            }, this);
          B = n && n.width;
          n = n && (P(n.height) ? W(n.height, B || e.chartWidth) : n.height);
          l || (Y(B) && B !== e.chartWidth) || (Y(n) && n !== e.chartHeight)
            ? e.setSize(B, n, f)
            : R(a, !0) && e.redraw(f);
          Q(e, "afterUpdate", { options: b, redraw: a, animation: f });
        }
        setSubtitle(b, a) {
          this.applyDescription("subtitle", b);
          this.layOutTitles(a);
        }
        setCaption(b, a) {
          this.applyDescription("caption", b);
          this.layOutTitles(a);
        }
        showResetZoom() {
          function b() {
            a.zoomOut();
          }
          const a = this,
            d = q.lang,
            c = a.options.chart.zooming.resetButton,
            f = c.theme,
            e =
              "chart" === c.relativeTo || "spacingBox" === c.relativeTo
                ? null
                : "scrollablePlotBox";
          Q(this, "beforeShowResetZoom", null, function () {
            a.resetZoomButton = a.renderer
              .button(d.resetZoom, null, null, b, f)
              .attr({ align: c.position.align, title: d.resetZoomTitle })
              .addClass("highcharts-reset-zoom")
              .add()
              .align(c.position, !1, e);
          });
          Q(this, "afterShowResetZoom");
        }
        zoomOut() {
          Q(this, "selection", { resetSelection: !0 }, this.zoom);
        }
        zoom(b) {
          const a = this,
            d = a.pointer;
          let c = !1,
            f;
          !b || b.resetSelection
            ? (a.axes.forEach(function (b) {
                f = b.zoom();
              }),
              (d.initiated = !1))
            : b.xAxis.concat(b.yAxis).forEach(function (b) {
                const e = b.axis;
                if (
                  (d[e.isXAxis ? "zoomX" : "zoomY"] &&
                    N(d.mouseDownX) &&
                    N(d.mouseDownY) &&
                    a.isInsidePlot(
                      d.mouseDownX - a.plotLeft,
                      d.mouseDownY - a.plotTop,
                      { axis: e }
                    )) ||
                  !N(a.inverted ? d.mouseDownX : d.mouseDownY)
                )
                  (f = e.zoom(b.min, b.max)), e.displayBtn && (c = !0);
              });
          const e = a.resetZoomButton;
          c && !e
            ? a.showResetZoom()
            : !c && B(e) && (a.resetZoomButton = e.destroy());
          f &&
            a.redraw(
              R(a.options.chart.animation, b && b.animation, 100 > a.pointCount)
            );
        }
        pan(b, a) {
          const d = this,
            c = d.hoverPoints;
          a = "object" === typeof a ? a : { enabled: a, type: "x" };
          const f = d.options.chart;
          f && f.panning && (f.panning = a);
          const e = a.type;
          let g;
          Q(this, "pan", { originalEvent: b }, function () {
            c &&
              c.forEach(function (b) {
                b.setState();
              });
            let a = d.xAxis;
            "xy" === e ? (a = a.concat(d.yAxis)) : "y" === e && (a = d.yAxis);
            const f = {};
            a.forEach(function (a) {
              if (a.options.panningEnabled && !a.options.isInternal) {
                var c = a.horiz,
                  k = b[c ? "chartX" : "chartY"];
                c = c ? "mouseDownX" : "mouseDownY";
                var m = d[c],
                  h = a.minPointOffset || 0,
                  p =
                    (a.reversed && !d.inverted) || (!a.reversed && d.inverted)
                      ? -1
                      : 1,
                  l = a.getExtremes(),
                  n = a.toValue(m - k, !0) + h * p,
                  B =
                    a.toValue(m + a.len - k, !0) -
                    (h * p || (a.isXAxis && a.pointRangePadding) || 0),
                  r = B < n;
                p = a.hasVerticalPanning();
                m = r ? B : n;
                n = r ? n : B;
                var q = a.panningState;
                !p ||
                  a.isXAxis ||
                  (q && !q.isDirty) ||
                  a.series.forEach(function (b) {
                    var a = b.getProcessedData(!0);
                    a = b.getExtremes(a.yData, !0);
                    q ||
                      (q = {
                        startMin: Number.MAX_VALUE,
                        startMax: -Number.MAX_VALUE,
                      });
                    Y(a.dataMin) &&
                      Y(a.dataMax) &&
                      ((q.startMin = Math.min(
                        R(b.options.threshold, Infinity),
                        a.dataMin,
                        q.startMin
                      )),
                      (q.startMax = Math.max(
                        R(b.options.threshold, -Infinity),
                        a.dataMax,
                        q.startMax
                      )));
                  });
                p = Math.min(
                  R(q && q.startMin, l.dataMin),
                  h ? l.min : a.toValue(a.toPixels(l.min) - a.minPixelPadding)
                );
                B = Math.max(
                  R(q && q.startMax, l.dataMax),
                  h ? l.max : a.toValue(a.toPixels(l.max) + a.minPixelPadding)
                );
                a.panningState = q;
                a.isOrdinal ||
                  ((h = p - m),
                  0 < h && ((n += h), (m = p)),
                  (h = n - B),
                  0 < h && ((n = B), (m -= h)),
                  a.series.length &&
                    m !== l.min &&
                    n !== l.max &&
                    m >= p &&
                    n <= B &&
                    (a.setExtremes(m, n, !1, !1, { trigger: "pan" }),
                    !d.resetZoomButton &&
                      m !== p &&
                      n !== B &&
                      e.match("y") &&
                      (d.showResetZoom(), (a.displayBtn = !1)),
                    (g = !0)),
                  (f[c] = k));
              }
            });
            V(f, (b, a) => {
              d[a] = b;
            });
            g && d.redraw(!1);
            O(d.container, { cursor: "move" });
          });
        }
      }
      U(da.prototype, {
        callbacks: [],
        collectionsWithInit: {
          xAxis: [da.prototype.addAxis, [!0]],
          yAxis: [da.prototype.addAxis, [!1]],
          series: [da.prototype.addSeries],
        },
        collectionsWithUpdate: ["xAxis", "yAxis", "series"],
        propsRequireDirtyBox:
          "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
            " "
          ),
        propsRequireReflow:
          "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(
            " "
          ),
        propsRequireUpdateSeries:
          "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(
            " "
          ),
      });
      ("");
      return da;
    }
  );
  M(a, "Core/Legend/LegendSymbol.js", [a["Core/Utilities.js"]], function (a) {
    const { extend: x, merge: G, pick: L } = a;
    var A;
    (function (a) {
      a.lineMarker = function (a, z) {
        z = this.legendItem = this.legendItem || {};
        var t = this.options;
        const v = a.symbolWidth,
          c = a.symbolHeight,
          n = c / 2,
          r = this.chart.renderer,
          l = z.group;
        a = a.baseline - Math.round(0.3 * a.fontMetrics.b);
        let h = {},
          q = t.marker,
          g = 0;
        this.chart.styledMode ||
          ((h = { "stroke-width": Math.min(t.lineWidth || 0, 24) }),
          t.dashStyle
            ? (h.dashstyle = t.dashStyle)
            : "square" !== t.linecap && (h["stroke-linecap"] = "round"));
        z.line = r.path().addClass("highcharts-graph").attr(h).add(l);
        h["stroke-linecap"] && (g = Math.min(z.line.strokeWidth(), v) / 2);
        v &&
          z.line.attr({
            d: [
              ["M", g, a],
              ["L", v - g, a],
            ],
          });
        q &&
          !1 !== q.enabled &&
          v &&
          ((t = Math.min(L(q.radius, n), n)),
          0 === this.symbol.indexOf("url") &&
            ((q = G(q, { width: c, height: c })), (t = 0)),
          (z.symbol = z =
            r
              .symbol(
                this.symbol,
                v / 2 - t,
                a - t,
                2 * t,
                2 * t,
                x({ context: "legend" }, q)
              )
              .addClass("highcharts-point")
              .add(l)),
          (z.isMarker = !0));
      };
      a.rectangle = function (a, x) {
        x = x.legendItem || {};
        const t = a.symbolHeight,
          v = a.options.squareSymbol;
        x.symbol = this.chart.renderer
          .rect(
            v ? (a.symbolWidth - t) / 2 : 0,
            a.baseline - t + 1,
            v ? t : a.symbolWidth,
            t,
            L(a.options.symbolRadius, t / 2)
          )
          .addClass("highcharts-point")
          .attr({ zIndex: 3 })
          .add(x.group);
      };
    })(A || (A = {}));
    return A;
  });
  M(a, "Core/Series/SeriesDefaults.js", [], function () {
    return {
      lineWidth: 1,
      allowPointSelect: !1,
      crisp: !0,
      showCheckbox: !1,
      animation: { duration: 1e3 },
      events: {},
      marker: {
        enabledThreshold: 2,
        lineColor: "#ffffff",
        lineWidth: 0,
        radius: 4,
        states: {
          normal: { animation: !0 },
          hover: {
            animation: { duration: 150 },
            enabled: !0,
            radiusPlus: 2,
            lineWidthPlus: 1,
          },
          select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 },
        },
      },
      point: { events: {} },
      dataLabels: {
        animation: {},
        align: "center",
        borderWidth: 0,
        defer: !0,
        formatter: function () {
          const { numberFormatter: a } = this.series.chart;
          return "number" !== typeof this.y ? "" : a(this.y, -1);
        },
        padding: 5,
        style: {
          fontSize: "0.7em",
          fontWeight: "bold",
          color: "contrast",
          textOutline: "1px contrast",
        },
        verticalAlign: "bottom",
        x: 0,
        y: 0,
      },
      cropThreshold: 300,
      opacity: 1,
      pointRange: 0,
      softThreshold: !0,
      states: {
        normal: { animation: !0 },
        hover: {
          animation: { duration: 150 },
          lineWidthPlus: 1,
          marker: {},
          halo: { size: 10, opacity: 0.25 },
        },
        select: { animation: { duration: 0 } },
        inactive: { animation: { duration: 150 }, opacity: 0.2 },
      },
      stickyTracking: !0,
      turboThreshold: 1e3,
      findNearestPointBy: "x",
    };
  });
  M(
    a,
    "Core/Series/Series.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Defaults.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Series/Point.js"],
      a["Core/Series/SeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A, D, C, z, t, v) {
      const { animObject: c, setAnimation: n } = a,
        { defaultOptions: r } = y,
        { registerEventOptions: l } = G,
        { hasTouch: h, svg: q, win: g } = L,
        { seriesTypes: w } = z,
        {
          arrayMax: x,
          arrayMin: F,
          clamp: e,
          cleanRecursively: m,
          correctFloat: u,
          defined: p,
          erase: H,
          error: b,
          extend: f,
          find: d,
          fireEvent: k,
          getNestedProperty: O,
          isArray: N,
          isNumber: E,
          isString: Z,
          merge: T,
          objectEach: U,
          pick: K,
          removeEvent: Q,
          splat: M,
          syncTimeout: fa,
        } = v;
      class Y {
        constructor() {
          this.zones =
            this.yAxis =
            this.xAxis =
            this.userOptions =
            this.tooltipOptions =
            this.processedYData =
            this.processedXData =
            this.points =
            this.options =
            this.linkedSeries =
            this.index =
            this.eventsToUnbind =
            this.eventOptions =
            this.data =
            this.chart =
            this._i =
              void 0;
        }
        init(b, a) {
          k(this, "init", { options: a });
          const d = this,
            c = b.series;
          this.eventsToUnbind = [];
          d.chart = b;
          d.options = d.setOptions(a);
          a = d.options;
          d.linkedSeries = [];
          d.bindAxes();
          f(d, {
            name: a.name,
            state: "",
            visible: !1 !== a.visible,
            selected: !0 === a.selected,
          });
          l(this, a);
          const e = a.events;
          if (
            (e && e.click) ||
            (a.point && a.point.events && a.point.events.click) ||
            a.allowPointSelect
          )
            b.runTrackerClick = !0;
          d.getColor();
          d.getSymbol();
          d.parallelArrays.forEach(function (b) {
            d[b + "Data"] || (d[b + "Data"] = []);
          });
          d.isCartesian && (b.hasCartesianSeries = !0);
          let g;
          c.length && (g = c[c.length - 1]);
          d._i = K(g && g._i, -1) + 1;
          d.opacity = d.options.opacity;
          b.orderSeries(this.insert(c));
          a.dataSorting && a.dataSorting.enabled
            ? d.setDataSortingOptions()
            : d.points || d.data || d.setData(a.data, !1);
          k(this, "afterInit");
        }
        is(b) {
          return w[b] && this instanceof w[b];
        }
        insert(b) {
          const a = this.options.index;
          let d;
          if (E(a)) {
            for (d = b.length; d--; )
              if (a >= K(b[d].options.index, b[d]._i)) {
                b.splice(d + 1, 0, this);
                break;
              }
            -1 === d && b.unshift(this);
            d += 1;
          } else b.push(this);
          return K(d, b.length - 1);
        }
        bindAxes() {
          const a = this,
            d = a.options,
            c = a.chart;
          let f;
          k(this, "bindAxes", null, function () {
            (a.axisTypes || []).forEach(function (e) {
              let g = 0;
              c[e].forEach(function (b) {
                f = b.options;
                if (
                  (d[e] === g && !f.isInternal) ||
                  ("undefined" !== typeof d[e] && d[e] === f.id) ||
                  ("undefined" === typeof d[e] && 0 === f.index)
                )
                  a.insert(b.series), (a[e] = b), (b.isDirty = !0);
                f.isInternal || g++;
              });
              a[e] || a.optionalAxis === e || b(18, !0, c);
            });
          });
          k(this, "afterBindAxes");
        }
        updateParallelArrays(b, a, d) {
          const c = b.series,
            f = E(a)
              ? function (d) {
                  const f = "y" === d && c.toYData ? c.toYData(b) : b[d];
                  c[d + "Data"][a] = f;
                }
              : function (b) {
                  Array.prototype[a].apply(c[b + "Data"], d);
                };
          c.parallelArrays.forEach(f);
        }
        hasData() {
          return (
            (this.visible &&
              "undefined" !== typeof this.dataMax &&
              "undefined" !== typeof this.dataMin) ||
            (this.visible && this.yData && 0 < this.yData.length)
          );
        }
        autoIncrement(b) {
          var a = this.options;
          const d = a.pointIntervalUnit,
            c = a.relativeXValue,
            f = this.chart.time;
          let e = this.xIncrement,
            g;
          e = K(e, a.pointStart, 0);
          this.pointInterval = g = K(this.pointInterval, a.pointInterval, 1);
          c && E(b) && (g *= b);
          d &&
            ((a = new f.Date(e)),
            "day" === d
              ? f.set("Date", a, f.get("Date", a) + g)
              : "month" === d
              ? f.set("Month", a, f.get("Month", a) + g)
              : "year" === d && f.set("FullYear", a, f.get("FullYear", a) + g),
            (g = a.getTime() - e));
          if (c && E(b)) return e + g;
          this.xIncrement = e + g;
          return e;
        }
        setDataSortingOptions() {
          const b = this.options;
          f(this, {
            requireSorting: !1,
            sorted: !1,
            enabledDataSorting: !0,
            allowDG: !1,
          });
          p(b.pointRange) || (b.pointRange = 1);
        }
        setOptions(b) {
          var a = this.chart,
            d = a.options,
            c = d.plotOptions,
            f = a.userOptions || {};
          b = T(b);
          a = a.styledMode;
          const e = { plotOptions: c, userOptions: b };
          k(this, "setOptions", e);
          const g = e.plotOptions[this.type],
            m = f.plotOptions || {};
          this.userOptions = e.userOptions;
          f = T(g, c.series, f.plotOptions && f.plotOptions[this.type], b);
          this.tooltipOptions = T(
            r.tooltip,
            r.plotOptions.series && r.plotOptions.series.tooltip,
            r.plotOptions[this.type].tooltip,
            d.tooltip.userOptions,
            c.series && c.series.tooltip,
            c[this.type].tooltip,
            b.tooltip
          );
          this.stickyTracking = K(
            b.stickyTracking,
            m[this.type] && m[this.type].stickyTracking,
            m.series && m.series.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip
              ? !0
              : f.stickyTracking
          );
          null === g.marker && delete f.marker;
          this.zoneAxis = f.zoneAxis;
          c = this.zones = (f.zones || []).slice();
          (!f.negativeColor && !f.negativeFillColor) ||
            f.zones ||
            ((d = {
              value: f[this.zoneAxis + "Threshold"] || f.threshold || 0,
              className: "highcharts-negative",
            }),
            a ||
              ((d.color = f.negativeColor),
              (d.fillColor = f.negativeFillColor)),
            c.push(d));
          c.length &&
            p(c[c.length - 1].value) &&
            c.push(a ? {} : { color: this.color, fillColor: this.fillColor });
          k(this, "afterSetOptions", { options: f });
          return f;
        }
        getName() {
          return K(this.options.name, "Series " + (this.index + 1));
        }
        getCyclic(b, a, d) {
          const c = this.chart,
            f = this.userOptions,
            e = b + "Index",
            g = b + "Counter",
            k = d ? d.length : K(c.options.chart[b + "Count"], c[b + "Count"]);
          if (!a) {
            var m = K(f[e], f["_" + e]);
            p(m) ||
              (c.series.length || (c[g] = 0),
              (f["_" + e] = m = c[g] % k),
              (c[g] += 1));
            d && (a = d[m]);
          }
          "undefined" !== typeof m && (this[e] = m);
          this[b] = a;
        }
        getColor() {
          this.chart.styledMode
            ? this.getCyclic("color")
            : this.options.colorByPoint
            ? (this.color = "#cccccc")
            : this.getCyclic(
                "color",
                this.options.color || r.plotOptions[this.type].color,
                this.chart.options.colors
              );
        }
        getPointsCollection() {
          return (this.hasGroupedData ? this.points : this.data) || [];
        }
        getSymbol() {
          this.getCyclic(
            "symbol",
            this.options.marker.symbol,
            this.chart.options.symbols
          );
        }
        findPointIndex(b, a) {
          const c = b.id,
            f = b.x,
            e = this.points;
          var g = this.options.dataSorting,
            k;
          let m, h;
          if (c) (g = this.chart.get(c)), g instanceof D && (k = g);
          else if (
            this.linkedParent ||
            this.enabledDataSorting ||
            this.options.relativeXValue
          )
            if (
              ((k = (a) => !a.touched && a.index === b.index),
              g && g.matchByName
                ? (k = (a) => !a.touched && a.name === b.name)
                : this.options.relativeXValue &&
                  (k = (a) => !a.touched && a.options.x === b.x),
              (k = d(e, k)),
              !k)
            )
              return;
          k && ((h = k && k.index), "undefined" !== typeof h && (m = !0));
          "undefined" === typeof h && E(f) && (h = this.xData.indexOf(f, a));
          -1 !== h &&
            "undefined" !== typeof h &&
            this.cropped &&
            (h = h >= this.cropStart ? h - this.cropStart : h);
          !m && E(h) && e[h] && e[h].touched && (h = void 0);
          return h;
        }
        updateData(b, a) {
          const d = this.options,
            c = d.dataSorting,
            f = this.points,
            e = [],
            g = this.requireSorting,
            k = b.length === f.length;
          let m,
            h,
            l,
            n = !0;
          this.xIncrement = null;
          b.forEach(function (b, a) {
            var h =
              (p(b) &&
                this.pointClass.prototype.optionsToObject.call(
                  { series: this },
                  b
                )) ||
              {};
            const n = h.x;
            if (h.id || E(n)) {
              if (
                ((h = this.findPointIndex(h, l)),
                -1 === h || "undefined" === typeof h
                  ? e.push(b)
                  : f[h] && b !== d.data[h]
                  ? (f[h].update(b, !1, null, !1),
                    (f[h].touched = !0),
                    g && (l = h + 1))
                  : f[h] && (f[h].touched = !0),
                !k || a !== h || (c && c.enabled) || this.hasDerivedData)
              )
                m = !0;
            } else e.push(b);
          }, this);
          if (m)
            for (b = f.length; b--; )
              (h = f[b]) && !h.touched && h.remove && h.remove(!1, a);
          else
            !k || (c && c.enabled)
              ? (n = !1)
              : (b.forEach(function (b, a) {
                  b === f[a].y ||
                    f[a].destroyed ||
                    f[a].update(b, !1, null, !1);
                }),
                (e.length = 0));
          f.forEach(function (b) {
            b && (b.touched = !1);
          });
          if (!n) return !1;
          e.forEach(function (b) {
            this.addPoint(b, !1, null, null, !1);
          }, this);
          null === this.xIncrement &&
            this.xData &&
            this.xData.length &&
            ((this.xIncrement = x(this.xData)), this.autoIncrement());
          return !0;
        }
        setData(a, d = !0, c, f) {
          var e;
          const g = this,
            k = g.points,
            m = (k && k.length) || 0,
            h = g.options,
            p = g.chart,
            l = h.dataSorting,
            n = g.xAxis,
            r = h.turboThreshold,
            q = this.xData,
            u = this.yData;
          var B = g.pointArrayMap;
          B = B && B.length;
          const w = h.keys;
          let t,
            I = 0,
            v = 1,
            x = null;
          if (!p.options.chart.allowMutatingData) {
            h.data && delete g.options.data;
            g.userOptions.data && delete g.userOptions.data;
            var P = T(!0, a);
          }
          a = P || a || [];
          P = a.length;
          l && l.enabled && (a = this.sortData(a));
          p.options.chart.allowMutatingData &&
            !1 !== f &&
            P &&
            m &&
            !g.cropped &&
            !g.hasGroupedData &&
            g.visible &&
            !g.boosted &&
            (t = this.updateData(a, c));
          if (!t) {
            g.xIncrement = null;
            g.colorCounter = 0;
            this.parallelArrays.forEach(function (b) {
              g[b + "Data"].length = 0;
            });
            if (r && P > r)
              if (((x = g.getFirstValidPoint(a)), E(x)))
                for (c = 0; c < P; c++)
                  (q[c] = this.autoIncrement()), (u[c] = a[c]);
              else if (N(x))
                if (B)
                  if (x.length === B)
                    for (c = 0; c < P; c++)
                      (q[c] = this.autoIncrement()), (u[c] = a[c]);
                  else
                    for (c = 0; c < P; c++)
                      (f = a[c]), (q[c] = f[0]), (u[c] = f.slice(1, B + 1));
                else if (
                  (w &&
                    ((I = w.indexOf("x")),
                    (v = w.indexOf("y")),
                    (I = 0 <= I ? I : 0),
                    (v = 0 <= v ? v : 1)),
                  1 === x.length && (v = 0),
                  I === v)
                )
                  for (c = 0; c < P; c++)
                    (q[c] = this.autoIncrement()), (u[c] = a[c][v]);
                else
                  for (c = 0; c < P; c++)
                    (f = a[c]), (q[c] = f[I]), (u[c] = f[v]);
              else b(12, !1, p);
            else
              for (c = 0; c < P; c++)
                (f = { series: g }),
                  g.pointClass.prototype.applyOptions.apply(f, [a[c]]),
                  g.updateParallelArrays(f, c);
            u && Z(u[0]) && b(14, !0, p);
            g.data = [];
            g.options.data = g.userOptions.data = a;
            for (c = m; c--; )
              null === (e = k[c]) || void 0 === e ? void 0 : e.destroy();
            n && (n.minRange = n.userMinRange);
            g.isDirty = p.isDirtyBox = !0;
            g.isDirtyData = !!k;
            c = !1;
          }
          "point" === h.legendType &&
            (this.processData(), this.generatePoints());
          d && p.redraw(c);
        }
        sortData(b) {
          const a = this,
            d = a.options.dataSorting.sortKey || "y",
            c = function (b, a) {
              return (
                (p(a) &&
                  b.pointClass.prototype.optionsToObject.call(
                    { series: b },
                    a
                  )) ||
                {}
              );
            };
          b.forEach(function (d, f) {
            b[f] = c(a, d);
            b[f].index = f;
          }, this);
          b.concat()
            .sort((b, a) => {
              b = O(d, b);
              a = O(d, a);
              return a < b ? -1 : a > b ? 1 : 0;
            })
            .forEach(function (b, a) {
              b.x = a;
            }, this);
          a.linkedSeries &&
            a.linkedSeries.forEach(function (a) {
              const d = a.options,
                f = d.data;
              (d.dataSorting && d.dataSorting.enabled) ||
                !f ||
                (f.forEach(function (d, e) {
                  f[e] = c(a, d);
                  b[e] && ((f[e].x = b[e].x), (f[e].index = e));
                }),
                a.setData(f, !1));
            });
          return b;
        }
        getProcessedData(a) {
          var d = this.xAxis,
            c = this.options,
            f = c.cropThreshold;
          const e = a || this.getExtremesFromAll || c.getExtremesFromAll,
            g = this.isCartesian;
          a = d && d.val2lin;
          c = !(!d || !d.logarithmic);
          let k = 0,
            m;
          let h,
            p,
            l = this.xData,
            n = this.yData,
            q = this.requireSorting;
          var r = !1;
          const u = l.length;
          d &&
            ((r = d.getExtremes()),
            (h = r.min),
            (p = r.max),
            (r = !(!d.categories || d.names.length)));
          if (g && this.sorted && !e && (!f || u > f || this.forceCrop))
            if (l[u - 1] < h || l[0] > p) (l = []), (n = []);
            else if (this.yData && (l[0] < h || l[u - 1] > p)) {
              var B = this.cropData(this.xData, this.yData, h, p);
              l = B.xData;
              n = B.yData;
              k = B.start;
              B = !0;
            }
          for (f = l.length || 1; --f; )
            (d = c ? a(l[f]) - a(l[f - 1]) : l[f] - l[f - 1]),
              0 < d && ("undefined" === typeof m || d < m)
                ? (m = d)
                : 0 > d && q && !r && (b(15, !1, this.chart), (q = !1));
          return {
            xData: l,
            yData: n,
            cropped: B,
            cropStart: k,
            closestPointRange: m,
          };
        }
        processData(b) {
          const a = this.xAxis;
          if (
            this.isCartesian &&
            !this.isDirty &&
            !a.isDirty &&
            !this.yAxis.isDirty &&
            !b
          )
            return !1;
          b = this.getProcessedData();
          this.cropped = b.cropped;
          this.cropStart = b.cropStart;
          this.processedXData = b.xData;
          this.processedYData = b.yData;
          this.closestPointRange = this.basePointRange = b.closestPointRange;
          k(this, "afterProcessData");
        }
        cropData(b, a, d, c, f) {
          const e = b.length;
          let g,
            k = 0,
            m = e;
          f = K(f, this.cropShoulder);
          for (g = 0; g < e; g++)
            if (b[g] >= d) {
              k = Math.max(0, g - f);
              break;
            }
          for (d = g; d < e; d++)
            if (b[d] > c) {
              m = d + f;
              break;
            }
          return {
            xData: b.slice(k, m),
            yData: a.slice(k, m),
            start: k,
            end: m,
          };
        }
        generatePoints() {
          var b = this.options;
          const a = this.processedData || b.data,
            d = this.processedXData,
            c = this.processedYData,
            e = this.pointClass,
            g = d.length,
            m = this.cropStart || 0,
            h = this.hasGroupedData,
            p = b.keys,
            l = [];
          b = b.dataGrouping && b.dataGrouping.groupAll ? m : 0;
          let n;
          let r,
            q,
            u = this.data;
          if (!u && !h) {
            var w = [];
            w.length = a.length;
            u = this.data = w;
          }
          p && h && (this.options.keys = !1);
          for (q = 0; q < g; q++)
            (w = m + q),
              h
                ? ((r = new e().init(this, [d[q]].concat(M(c[q])))),
                  (r.dataGroup = this.groupMap[b + q]),
                  r.dataGroup.options &&
                    ((r.options = r.dataGroup.options),
                    f(r, r.dataGroup.options),
                    delete r.dataLabels))
                : (r = u[w]) ||
                  "undefined" === typeof a[w] ||
                  (u[w] = r = new e().init(this, a[w], d[q])),
              r && ((r.index = h ? b + q : w), (l[q] = r));
          this.options.keys = p;
          if (u && (g !== (n = u.length) || h))
            for (q = 0; q < n; q++)
              q !== m || h || (q += g),
                u[q] && (u[q].destroyElements(), (u[q].plotX = void 0));
          this.data = u;
          this.points = l;
          k(this, "afterGeneratePoints");
        }
        getXExtremes(b) {
          return { min: F(b), max: x(b) };
        }
        getExtremes(b, a) {
          const d = this.xAxis;
          var c = this.yAxis;
          const f = this.processedXData || this.xData,
            e = [],
            g = this.requireSorting ? this.cropShoulder : 0;
          c = c ? c.positiveValuesOnly : !1;
          let m,
            h = 0,
            p = 0,
            l = 0;
          b = b || this.stackedYData || this.processedYData || [];
          const n = b.length;
          if (d) {
            var q = d.getExtremes();
            h = q.min;
            p = q.max;
          }
          for (m = 0; m < n; m++) {
            var r = f[m];
            q = b[m];
            var u = (E(q) || N(q)) && (q.length || 0 < q || !c);
            r =
              a ||
              this.getExtremesFromAll ||
              this.options.getExtremesFromAll ||
              this.cropped ||
              !d ||
              ((f[m + g] || r) >= h && (f[m - g] || r) <= p);
            if (u && r)
              if ((u = q.length)) for (; u--; ) E(q[u]) && (e[l++] = q[u]);
              else e[l++] = q;
          }
          b = { activeYData: e, dataMin: F(e), dataMax: x(e) };
          k(this, "afterGetExtremes", { dataExtremes: b });
          return b;
        }
        applyExtremes() {
          const b = this.getExtremes();
          this.dataMin = b.dataMin;
          this.dataMax = b.dataMax;
          return b;
        }
        getFirstValidPoint(b) {
          const a = b.length;
          let d = 0,
            c = null;
          for (; null === c && d < a; ) (c = b[d]), d++;
          return c;
        }
        translate() {
          var b;
          this.processedXData || this.processData();
          this.generatePoints();
          const a = this.options,
            d = a.stacking,
            c = this.xAxis,
            f = c.categories,
            g = this.enabledDataSorting,
            m = this.yAxis,
            h = this.points,
            l = h.length,
            n = this.pointPlacementToXValue(),
            q = !!n,
            r = a.threshold,
            w = a.startFromThreshold ? r : 0,
            t = this.zoneAxis || "y";
          let v,
            x,
            J,
            F,
            H = Number.MAX_VALUE;
          for (v = 0; v < l; v++) {
            const k = h[v],
              l = k.x;
            let B,
              I,
              P = k.y,
              O = k.low;
            const z =
              d &&
              (null === (b = m.stacking) || void 0 === b
                ? void 0
                : b.stacks[
                    (this.negStacks && P < (w ? 0 : r) ? "-" : "") +
                      this.stackKey
                  ]);
            x = c.translate(l, !1, !1, !1, !0, n);
            k.plotX = E(x) ? u(e(x, -1e5, 1e5)) : void 0;
            d &&
              this.visible &&
              z &&
              z[l] &&
              ((F = this.getStackIndicator(F, l, this.index)),
              !k.isNull && F.key && ((B = z[l]), (I = B.points[F.key])),
              B &&
                N(I) &&
                ((O = I[0]),
                (P = I[1]),
                O === w && F.key === z[l].base && (O = K(E(r) ? r : m.min)),
                m.positiveValuesOnly && p(O) && 0 >= O && (O = void 0),
                (k.total = k.stackTotal = K(B.total)),
                (k.percentage =
                  p(k.y) && B.total ? (k.y / B.total) * 100 : void 0),
                (k.stackY = P),
                this.irregularWidths ||
                  B.setOffset(
                    this.pointXOffset || 0,
                    this.barW || 0,
                    void 0,
                    void 0,
                    void 0,
                    this.xAxis
                  )));
            k.yBottom = p(O)
              ? e(m.translate(O, !1, !0, !1, !0), -1e5, 1e5)
              : void 0;
            this.dataModify && (P = this.dataModify.modifyValue(P, v));
            let y;
            E(P) &&
              void 0 !== k.plotX &&
              ((y = m.translate(P, !1, !0, !1, !0)),
              (y = E(y) ? e(y, -1e5, 1e5) : void 0));
            k.plotY = y;
            k.isInside = this.isPointInside(k);
            k.clientX = q ? u(c.translate(l, !1, !1, !1, !0, n)) : x;
            k.negative = k[t] < (a[t + "Threshold"] || r || 0);
            k.category = K(f && f[k.x], k.x);
            k.isNull ||
              !1 === k.visible ||
              ("undefined" !== typeof J && (H = Math.min(H, Math.abs(x - J))),
              (J = x));
            k.zone = this.zones.length ? k.getZone() : void 0;
            !k.graphic && this.group && g && (k.isNew = !0);
          }
          this.closestPointRangePx = H;
          k(this, "afterTranslate");
        }
        getValidPoints(b, a, d) {
          const c = this.chart;
          return (b || this.points || []).filter(function (b) {
            const { plotX: f, plotY: e } = b;
            return (!d && (b.isNull || !E(e))) ||
              (a && !c.isInsidePlot(f, e, { inverted: c.inverted }))
              ? !1
              : !1 !== b.visible;
          });
        }
        getClipBox() {
          const { chart: b, xAxis: a, yAxis: d } = this,
            c = T(b.clipBox);
          a && a.len !== b.plotSizeX && (c.width = a.len);
          d && d.len !== b.plotSizeY && (c.height = d.len);
          return c;
        }
        getSharedClipKey() {
          return (this.sharedClipKey =
            (this.options.xAxis || 0) + "," + (this.options.yAxis || 0));
        }
        setClip() {
          const { chart: b, group: a, markerGroup: d } = this,
            c = b.sharedClips,
            f = b.renderer,
            e = this.getClipBox(),
            g = this.getSharedClipKey();
          let k = c[g];
          k ? k.animate(e) : (c[g] = k = f.clipRect(e));
          a && a.clip(!1 === this.options.clip ? void 0 : k);
          d && d.clip();
        }
        animate(b) {
          const { chart: a, group: d, markerGroup: f } = this,
            e = a.inverted;
          var g = c(this.options.animation),
            k = [this.getSharedClipKey(), g.duration, g.easing, g.defer].join();
          let m = a.sharedClips[k],
            h = a.sharedClips[k + "m"];
          if (b && d)
            (g = this.getClipBox()),
              m
                ? m.attr("height", g.height)
                : ((g.width = 0),
                  e && (g.x = a.plotHeight),
                  (m = a.renderer.clipRect(g)),
                  (a.sharedClips[k] = m),
                  (h = a.renderer.clipRect({
                    x: -99,
                    y: -99,
                    width: e ? a.plotWidth + 199 : 99,
                    height: e ? 99 : a.plotHeight + 199,
                  })),
                  (a.sharedClips[k + "m"] = h)),
              d.clip(m),
              f && f.clip(h);
          else if (m && !m.hasClass("highcharts-animating")) {
            k = this.getClipBox();
            const b = g.step;
            f &&
              f.element.childNodes.length &&
              (g.step = function (a, d) {
                b && b.apply(d, arguments);
                "width" === d.prop &&
                  h &&
                  h.element &&
                  h.attr(e ? "height" : "width", a + 99);
              });
            m.addClass("highcharts-animating").animate(k, g);
          }
        }
        afterAnimate() {
          this.setClip();
          U(this.chart.sharedClips, (b, a, d) => {
            b &&
              !this.chart.container.querySelector(
                `[clip-path="url(#${b.id})"]`
              ) &&
              (b.destroy(), delete d[a]);
          });
          this.finishedAnimating = !0;
          k(this, "afterAnimate");
        }
        drawPoints(b = this.points) {
          const a = this.chart,
            d = a.styledMode,
            { colorAxis: c, options: f } = this,
            e = f.marker,
            g = this[this.specialGroup || "markerGroup"],
            k = this.xAxis,
            m = K(
              e.enabled,
              !k || k.isRadial ? !0 : null,
              this.closestPointRangePx >= e.enabledThreshold * e.radius
            );
          let h, p, l, n;
          let q, r;
          if (!1 !== e.enabled || this._hasPointMarkers)
            for (h = 0; h < b.length; h++) {
              p = b[h];
              n = (l = p.graphic) ? "animate" : "attr";
              var u = p.marker || {};
              q = !!p.marker;
              if (
                ((m && "undefined" === typeof u.enabled) || u.enabled) &&
                !p.isNull &&
                !1 !== p.visible
              ) {
                const b = K(u.symbol, this.symbol, "rect");
                r = this.markerAttribs(p, p.selected && "select");
                this.enabledDataSorting &&
                  (p.startXPos = k.reversed ? -(r.width || 0) : k.width);
                const f = !1 !== p.isInside;
                !l &&
                  f &&
                  (0 < (r.width || 0) || p.hasImage) &&
                  ((p.graphic = l =
                    a.renderer
                      .symbol(b, r.x, r.y, r.width, r.height, q ? u : e)
                      .add(g)),
                  this.enabledDataSorting &&
                    a.hasRendered &&
                    (l.attr({ x: p.startXPos }), (n = "animate")));
                l && "animate" === n && l[f ? "show" : "hide"](f).animate(r);
                if (l)
                  if (
                    ((u = this.pointAttribs(
                      p,
                      d || !p.selected ? void 0 : "select"
                    )),
                    d)
                  )
                    c && l.css({ fill: u.fill });
                  else l[n](u);
                l && l.addClass(p.getClassName(), !0);
              } else l && (p.graphic = l.destroy());
            }
        }
        markerAttribs(b, a) {
          const d = this.options;
          var c = d.marker;
          const f = b.marker || {},
            e = f.symbol || c.symbol,
            g = {};
          let k = K(f.radius, c && c.radius);
          a &&
            ((c = c.states[a]),
            (a = f.states && f.states[a]),
            (k = K(
              a && a.radius,
              c && c.radius,
              k && k + ((c && c.radiusPlus) || 0)
            )));
          b.hasImage = e && 0 === e.indexOf("url");
          b.hasImage && (k = 0);
          b = b.pos();
          E(k) &&
            b &&
            ((g.x = b[0] - k),
            (g.y = b[1] - k),
            d.crisp && (g.x = Math.floor(g.x)));
          k && (g.width = g.height = 2 * k);
          return g;
        }
        pointAttribs(b, a) {
          var d = this.options.marker,
            c = b && b.options;
          const f = (c && c.marker) || {};
          var e = c && c.color,
            g = b && b.color;
          const k = b && b.zone && b.zone.color;
          let m = this.color;
          b = K(f.lineWidth, d.lineWidth);
          c = 1;
          m = e || k || g || m;
          e = f.fillColor || d.fillColor || m;
          g = f.lineColor || d.lineColor || m;
          a = a || "normal";
          d = d.states[a] || {};
          a = (f.states && f.states[a]) || {};
          b = K(
            a.lineWidth,
            d.lineWidth,
            b + K(a.lineWidthPlus, d.lineWidthPlus, 0)
          );
          e = a.fillColor || d.fillColor || e;
          g = a.lineColor || d.lineColor || g;
          c = K(a.opacity, d.opacity, c);
          return { stroke: g, "stroke-width": b, fill: e, opacity: c };
        }
        destroy(b) {
          const a = this,
            d = a.chart,
            c = /AppleWebKit\/533/.test(g.navigator.userAgent),
            f = a.data || [];
          let e, m, h, p;
          k(a, "destroy", { keepEventsForUpdate: b });
          this.removeEvents(b);
          (a.axisTypes || []).forEach(function (b) {
            (p = a[b]) &&
              p.series &&
              (H(p.series, a), (p.isDirty = p.forceRedraw = !0));
          });
          a.legendItem && a.chart.legend.destroyItem(a);
          for (m = f.length; m--; ) (h = f[m]) && h.destroy && h.destroy();
          a.clips && a.clips.forEach((b) => b.destroy());
          v.clearTimeout(a.animationTimeout);
          U(a, function (b, a) {
            b instanceof t &&
              !b.survive &&
              ((e = c && "group" === a ? "hide" : "destroy"), b[e]());
          });
          d.hoverSeries === a && (d.hoverSeries = void 0);
          H(d.series, a);
          d.orderSeries();
          U(a, function (d, c) {
            (b && "hcEvents" === c) || delete a[c];
          });
        }
        applyZones() {
          const b = this,
            a = this.chart,
            d = a.renderer,
            c = this.zones,
            f = this.clips || [],
            g = this.graph,
            k = this.area,
            m = Math.max(a.plotWidth, a.plotHeight),
            h = this[(this.zoneAxis || "y") + "Axis"],
            p = a.inverted;
          let l,
            n,
            r,
            q,
            u,
            w,
            t,
            v,
            x,
            J,
            E,
            F = !1;
          c.length && (g || k) && h && "undefined" !== typeof h.min
            ? ((u = h.reversed),
              (w = h.horiz),
              g && !this.showLine && g.hide(),
              k && k.hide(),
              (q = h.getExtremes()),
              c.forEach(function (c, B) {
                l = u ? (w ? a.plotWidth : 0) : w ? 0 : h.toPixels(q.min) || 0;
                l = e(K(n, l), 0, m);
                n = e(Math.round(h.toPixels(K(c.value, q.max), !0) || 0), 0, m);
                F && (l = n = h.toPixels(q.max));
                t = Math.abs(l - n);
                v = Math.min(l, n);
                x = Math.max(l, n);
                h.isXAxis
                  ? ((r = { x: p ? x : v, y: 0, width: t, height: m }),
                    w || (r.x = a.plotHeight - r.x))
                  : ((r = { x: 0, y: p ? x : v, width: m, height: t }),
                    w && (r.y = a.plotWidth - r.y));
                f[B] ? f[B].animate(r) : (f[B] = d.clipRect(r));
                J = b["zone-area-" + B];
                E = b["zone-graph-" + B];
                g && E && E.clip(f[B]);
                k && J && J.clip(f[B]);
                F = c.value > q.max;
                b.resetZones && 0 === n && (n = void 0);
              }),
              (this.clips = f))
            : b.visible && (g && g.show(), k && k.show());
        }
        plotGroup(b, a, d, c, f) {
          let e = this[b];
          const g = !e;
          d = { visibility: d, zIndex: c || 0.1 };
          "undefined" === typeof this.opacity ||
            this.chart.styledMode ||
            "inactive" === this.state ||
            (d.opacity = this.opacity);
          g && (this[b] = e = this.chart.renderer.g().add(f));
          e.addClass(
            "highcharts-" +
              a +
              " highcharts-series-" +
              this.index +
              " highcharts-" +
              this.type +
              "-series " +
              (p(this.colorIndex)
                ? "highcharts-color-" + this.colorIndex + " "
                : "") +
              (this.options.className || "") +
              (e.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""),
            !0
          );
          e.attr(d)[g ? "attr" : "animate"](this.getPlotBox(a));
          return e;
        }
        getPlotBox(b) {
          let a = this.xAxis,
            d = this.yAxis;
          const c = this.chart;
          b =
            c.inverted &&
            !c.polar &&
            a &&
            !1 !== this.invertible &&
            "series" === b;
          c.inverted && ((a = d), (d = this.xAxis));
          return {
            translateX: a ? a.left : c.plotLeft,
            translateY: d ? d.top : c.plotTop,
            rotation: b ? 90 : 0,
            rotationOriginX: b ? (a.len - d.len) / 2 : 0,
            rotationOriginY: b ? (a.len + d.len) / 2 : 0,
            scaleX: b ? -1 : 1,
            scaleY: 1,
          };
        }
        removeEvents(b) {
          b || Q(this);
          this.eventsToUnbind.length &&
            (this.eventsToUnbind.forEach(function (b) {
              b();
            }),
            (this.eventsToUnbind.length = 0));
        }
        render() {
          const b = this;
          var a = b.chart;
          const d = b.options,
            f = c(d.animation),
            e = b.visible ? "inherit" : "hidden",
            g = d.zIndex,
            m = b.hasRendered;
          a = a.seriesGroup;
          let h = b.finishedAnimating ? 0 : f.duration;
          k(this, "render");
          b.plotGroup("group", "series", e, g, a);
          b.markerGroup = b.plotGroup("markerGroup", "markers", e, g, a);
          !1 !== d.clip && b.setClip();
          b.animate && h && b.animate(!0);
          b.drawGraph && (b.drawGraph(), b.applyZones());
          b.visible && b.drawPoints();
          b.drawDataLabels && b.drawDataLabels();
          b.redrawPoints && b.redrawPoints();
          b.drawTracker &&
            !1 !== b.options.enableMouseTracking &&
            b.drawTracker();
          b.animate && h && b.animate();
          m ||
            (h && f.defer && (h += f.defer),
            (b.animationTimeout = fa(function () {
              b.afterAnimate();
            }, h || 0)));
          b.isDirty = !1;
          b.hasRendered = !0;
          k(b, "afterRender");
        }
        redraw() {
          const b = this.isDirty || this.isDirtyData;
          this.translate();
          this.render();
          b && delete this.kdTree;
        }
        searchPoint(b, a) {
          const d = this.xAxis,
            c = this.yAxis,
            f = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: f ? d.len - b.chartY + d.pos : b.chartX - d.pos,
              plotY: f ? c.len - b.chartX + c.pos : b.chartY - c.pos,
            },
            a,
            b
          );
        }
        buildKDTree(b) {
          function a(b, c, f) {
            var e = b && b.length;
            let g;
            if (e)
              return (
                (g = d.kdAxisArray[c % f]),
                b.sort(function (b, a) {
                  return b[g] - a[g];
                }),
                (e = Math.floor(e / 2)),
                {
                  point: b[e],
                  left: a(b.slice(0, e), c + 1, f),
                  right: a(b.slice(e + 1), c + 1, f),
                }
              );
          }
          this.buildingKdTree = !0;
          const d = this,
            c = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          delete d.kdTree;
          fa(
            function () {
              d.kdTree = a(d.getValidPoints(null, !d.directTouch), c, c);
              d.buildingKdTree = !1;
            },
            d.options.kdNow || (b && "touchstart" === b.type) ? 0 : 1
          );
        }
        searchKDTree(b, a, d) {
          function c(b, a, d, m) {
            const h = a.point;
            var l = f.kdAxisArray[d % m];
            let n = h;
            var r = p(b[e]) && p(h[e]) ? Math.pow(b[e] - h[e], 2) : null;
            var q = p(b[g]) && p(h[g]) ? Math.pow(b[g] - h[g], 2) : null;
            q = (r || 0) + (q || 0);
            h.dist = p(q) ? Math.sqrt(q) : Number.MAX_VALUE;
            h.distX = p(r) ? Math.sqrt(r) : Number.MAX_VALUE;
            l = b[l] - h[l];
            q = 0 > l ? "left" : "right";
            r = 0 > l ? "right" : "left";
            a[q] && ((q = c(b, a[q], d + 1, m)), (n = q[k] < n[k] ? q : h));
            a[r] &&
              Math.sqrt(l * l) < n[k] &&
              ((b = c(b, a[r], d + 1, m)), (n = b[k] < n[k] ? b : n));
            return n;
          }
          const f = this,
            e = this.kdAxisArray[0],
            g = this.kdAxisArray[1],
            k = a ? "distX" : "dist";
          a = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree(d);
          if (this.kdTree) return c(b, this.kdTree, a, a);
        }
        pointPlacementToXValue() {
          const {
            options: { pointPlacement: b, pointRange: a },
            xAxis: d,
          } = this;
          let c = b;
          "between" === c && (c = d.reversed ? -0.5 : 0.5);
          return E(c) ? c * (a || d.pointRange) : 0;
        }
        isPointInside(b) {
          const { chart: a, xAxis: d, yAxis: c } = this;
          return (
            "undefined" !== typeof b.plotY &&
            "undefined" !== typeof b.plotX &&
            0 <= b.plotY &&
            b.plotY <= (c ? c.len : a.plotHeight) &&
            0 <= b.plotX &&
            b.plotX <= (d ? d.len : a.plotWidth)
          );
        }
        drawTracker() {
          const b = this,
            a = b.options,
            d = a.trackByArea,
            c = [].concat(d ? b.areaPath : b.graphPath),
            f = b.chart,
            e = f.pointer,
            g = f.renderer,
            m = f.options.tooltip.snap,
            p = b.tracker,
            l = function (a) {
              if (f.hoverSeries !== b) b.onMouseOver();
            },
            n = "rgba(192,192,192," + (q ? 0.0001 : 0.002) + ")";
          p
            ? p.attr({ d: c })
            : b.graph &&
              ((b.tracker = g
                .path(c)
                .attr({
                  visibility: b.visible ? "inherit" : "hidden",
                  zIndex: 2,
                })
                .addClass(
                  d ? "highcharts-tracker-area" : "highcharts-tracker-line"
                )
                .add(b.group)),
              f.styledMode ||
                b.tracker.attr({
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  stroke: n,
                  fill: d ? n : "none",
                  "stroke-width": b.graph.strokeWidth() + (d ? 0 : 2 * m),
                }),
              [b.tracker, b.markerGroup, b.dataLabelsGroup].forEach(function (
                b
              ) {
                if (
                  b &&
                  (b
                    .addClass("highcharts-tracker")
                    .on("mouseover", l)
                    .on("mouseout", function (b) {
                      e.onTrackerMouseOut(b);
                    }),
                  a.cursor && !f.styledMode && b.css({ cursor: a.cursor }),
                  h)
                )
                  b.on("touchstart", l);
              }));
          k(this, "afterDrawTracker");
        }
        addPoint(b, a, d, c, f) {
          const e = this.options,
            g = this.data,
            m = this.chart;
          var h = this.xAxis;
          h = h && h.hasNames && h.names;
          const p = e.data,
            l = this.xData;
          let n, q;
          a = K(a, !0);
          const r = { series: this };
          this.pointClass.prototype.applyOptions.apply(r, [b]);
          const u = r.x;
          q = l.length;
          if (this.requireSorting && u < l[q - 1])
            for (n = !0; q && l[q - 1] > u; ) q--;
          this.updateParallelArrays(r, "splice", [q, 0, 0]);
          this.updateParallelArrays(r, q);
          h && r.name && (h[u] = r.name);
          p.splice(q, 0, b);
          if (n || this.processedData)
            this.data.splice(q, 0, null), this.processData();
          "point" === e.legendType && this.generatePoints();
          d &&
            (g[0] && g[0].remove
              ? g[0].remove(!1)
              : (g.shift(), this.updateParallelArrays(r, "shift"), p.shift()));
          !1 !== f && k(this, "addPoint", { point: r });
          this.isDirtyData = this.isDirty = !0;
          a && m.redraw(c);
        }
        removePoint(b, a, d) {
          const c = this,
            f = c.data,
            e = f[b],
            g = c.points,
            k = c.chart,
            m = function () {
              g && g.length === f.length && g.splice(b, 1);
              f.splice(b, 1);
              c.options.data.splice(b, 1);
              c.updateParallelArrays(e || { series: c }, "splice", [b, 1]);
              e && e.destroy();
              c.isDirty = !0;
              c.isDirtyData = !0;
              a && k.redraw();
            };
          n(d, k);
          a = K(a, !0);
          e ? e.firePointEvent("remove", null, m) : m();
        }
        remove(b, a, d, c) {
          function f() {
            e.destroy(c);
            g.isDirtyLegend = g.isDirtyBox = !0;
            g.linkSeries(c);
            K(b, !0) && g.redraw(a);
          }
          const e = this,
            g = e.chart;
          !1 !== d ? k(e, "remove", null, f) : f();
        }
        update(a, d) {
          a = m(a, this.userOptions);
          k(this, "update", { options: a });
          const c = this,
            e = c.chart;
          var g = c.userOptions;
          const h = c.initialType || c.type;
          var p = e.options.plotOptions;
          const l = w[h].prototype;
          var n = c.finishedAnimating && { animation: !1 };
          const q = {};
          let r,
            u = ["eventOptions", "navigatorSeries", "baseSeries"],
            t = a.type || g.type || e.options.chart.type;
          const v = !(
            this.hasDerivedData ||
            (t && t !== this.type) ||
            "undefined" !== typeof a.pointStart ||
            "undefined" !== typeof a.pointInterval ||
            "undefined" !== typeof a.relativeXValue ||
            a.joinBy ||
            a.mapData ||
            c.hasOptionChanged("dataGrouping") ||
            c.hasOptionChanged("pointStart") ||
            c.hasOptionChanged("pointInterval") ||
            c.hasOptionChanged("pointIntervalUnit") ||
            c.hasOptionChanged("keys")
          );
          t = t || h;
          v &&
            (u.push(
              "data",
              "isDirtyData",
              "points",
              "processedData",
              "processedXData",
              "processedYData",
              "xIncrement",
              "cropped",
              "_hasPointMarkers",
              "_hasPointLabels",
              "clips",
              "nodes",
              "layout",
              "level",
              "mapMap",
              "mapData",
              "minY",
              "maxY",
              "minX",
              "maxX"
            ),
            !1 !== a.visible && u.push("area", "graph"),
            c.parallelArrays.forEach(function (b) {
              u.push(b + "Data");
            }),
            a.data &&
              (a.dataSorting && f(c.options.dataSorting, a.dataSorting),
              this.setData(a.data, !1)));
          a = T(
            g,
            n,
            {
              index: "undefined" === typeof g.index ? c.index : g.index,
              pointStart: K(
                p && p.series && p.series.pointStart,
                g.pointStart,
                c.xData[0]
              ),
            },
            !v && { data: c.options.data },
            a
          );
          v && a.data && (a.data = c.options.data);
          u = [
            "group",
            "markerGroup",
            "dataLabelsGroup",
            "transformGroup",
          ].concat(u);
          u.forEach(function (b) {
            u[b] = c[b];
            delete c[b];
          });
          p = !1;
          if (w[t]) {
            if (((p = t !== c.type), c.remove(!1, !1, !1, !0), p))
              if (Object.setPrototypeOf)
                Object.setPrototypeOf(c, w[t].prototype);
              else {
                n = Object.hasOwnProperty.call(c, "hcEvents") && c.hcEvents;
                for (r in l) c[r] = void 0;
                f(c, w[t].prototype);
                n ? (c.hcEvents = n) : delete c.hcEvents;
              }
          } else b(17, !0, e, { missingModuleFor: t });
          u.forEach(function (b) {
            c[b] = u[b];
          });
          c.init(e, a);
          if (v && this.points) {
            a = c.options;
            if (!1 === a.visible) (q.graphic = 1), (q.dataLabel = 1);
            else if (!c._hasPointLabels) {
              const { marker: b, dataLabels: d } = a;
              g = g.marker || {};
              !b ||
                (!1 !== b.enabled &&
                  g.symbol === b.symbol &&
                  g.height === b.height &&
                  g.width === b.width) ||
                (q.graphic = 1);
              d && !1 === d.enabled && (q.dataLabel = 1);
            }
            for (const b of this.points)
              b &&
                b.series &&
                (b.resolveColor(),
                Object.keys(q).length && b.destroyElements(q),
                !1 === a.showInLegend &&
                  b.legendItem &&
                  e.legend.destroyItem(b));
          }
          c.initialType = h;
          e.linkSeries();
          p && c.linkedSeries.length && (c.isDirtyData = !0);
          k(this, "afterUpdate");
          K(d, !0) && e.redraw(v ? void 0 : !1);
        }
        setName(b) {
          this.name = this.options.name = this.userOptions.name = b;
          this.chart.isDirtyLegend = !0;
        }
        hasOptionChanged(b) {
          const a = this.options[b],
            d = this.chart.options.plotOptions,
            c = this.userOptions[b];
          return c
            ? a !== c
            : a !==
                K(
                  d && d[this.type] && d[this.type][b],
                  d && d.series && d.series[b],
                  a
                );
        }
        onMouseOver() {
          const b = this.chart,
            a = b.hoverSeries;
          b.pointer.setHoverChartIndex();
          if (a && a !== this) a.onMouseOut();
          this.options.events.mouseOver && k(this, "mouseOver");
          this.setState("hover");
          b.hoverSeries = this;
        }
        onMouseOut() {
          const b = this.options,
            a = this.chart,
            d = a.tooltip,
            c = a.hoverPoint;
          a.hoverSeries = null;
          if (c) c.onMouseOut();
          this && b.events.mouseOut && k(this, "mouseOut");
          !d ||
            this.stickyTracking ||
            (d.shared && !this.noSharedTooltip) ||
            d.hide();
          a.series.forEach(function (b) {
            b.setState("", !0);
          });
        }
        setState(b, a) {
          const d = this;
          var c = d.options;
          const f = d.graph,
            e = c.inactiveOtherPoints,
            g = c.states,
            k = K(
              g[b || "normal"] && g[b || "normal"].animation,
              d.chart.options.chart.animation
            );
          let m = c.lineWidth,
            h = 0,
            p = c.opacity;
          b = b || "";
          if (
            d.state !== b &&
            ([d.group, d.markerGroup, d.dataLabelsGroup].forEach(function (a) {
              a &&
                (d.state && a.removeClass("highcharts-series-" + d.state),
                b && a.addClass("highcharts-series-" + b));
            }),
            (d.state = b),
            !d.chart.styledMode)
          ) {
            if (g[b] && !1 === g[b].enabled) return;
            b &&
              ((m = g[b].lineWidth || m + (g[b].lineWidthPlus || 0)),
              (p = K(g[b].opacity, p)));
            if (f && !f.dashstyle && E(m))
              for (
                c = { "stroke-width": m }, f.animate(c, k);
                d["zone-graph-" + h];

              )
                d["zone-graph-" + h].animate(c, k), (h += 1);
            e ||
              [
                d.group,
                d.markerGroup,
                d.dataLabelsGroup,
                d.labelBySeries,
              ].forEach(function (b) {
                b && b.animate({ opacity: p }, k);
              });
          }
          a && e && d.points && d.setAllPointsToState(b || void 0);
        }
        setAllPointsToState(b) {
          this.points.forEach(function (a) {
            a.setState && a.setState(b);
          });
        }
        setVisible(b, a) {
          const d = this,
            c = d.chart,
            f = c.options.chart.ignoreHiddenSeries,
            e = d.visible,
            g = (d.visible =
              b =
              d.options.visible =
              d.userOptions.visible =
                "undefined" === typeof b ? !e : b)
              ? "show"
              : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(
            function (b) {
              if (d[b]) d[b][g]();
            }
          );
          if (
            c.hoverSeries === d ||
            (c.hoverPoint && c.hoverPoint.series) === d
          )
            d.onMouseOut();
          d.legendItem && c.legend.colorizeItem(d, b);
          d.isDirty = !0;
          d.options.stacking &&
            c.series.forEach(function (b) {
              b.options.stacking && b.visible && (b.isDirty = !0);
            });
          d.linkedSeries.forEach(function (a) {
            a.setVisible(b, !1);
          });
          f && (c.isDirtyBox = !0);
          k(d, g);
          !1 !== a && c.redraw();
        }
        show() {
          this.setVisible(!0);
        }
        hide() {
          this.setVisible(!1);
        }
        select(b) {
          this.selected =
            b =
            this.options.selected =
              "undefined" === typeof b ? !this.selected : b;
          this.checkbox && (this.checkbox.checked = b);
          k(this, b ? "select" : "unselect");
        }
        shouldShowTooltip(b, a, d = {}) {
          d.series = this;
          d.visiblePlotOnly = !0;
          return this.chart.isInsidePlot(b, a, d);
        }
        drawLegendSymbol(b, a) {
          var d;
          null === (d = A[this.options.legendSymbol || "rectangle"]) ||
          void 0 === d
            ? void 0
            : d.call(this, b, a);
        }
      }
      Y.defaultOptions = C;
      Y.types = z.seriesTypes;
      Y.registerType = z.registerSeriesType;
      f(Y.prototype, {
        axisTypes: ["xAxis", "yAxis"],
        coll: "series",
        colorCounter: 0,
        cropShoulder: 1,
        directTouch: !1,
        isCartesian: !0,
        kdAxisArray: ["clientX", "plotY"],
        parallelArrays: ["x", "y"],
        pointClass: D,
        requireSorting: !0,
        sorted: !0,
      });
      z.series = Y;
      ("");
      ("");
      return Y;
    }
  );
  M(
    a,
    "Extensions/ScrollablePlotArea.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Series/Series.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A, D) {
      const { stop: x } = a,
        { addEvent: z, createElement: t, defined: v, merge: c, pick: n } = D;
      z(G, "afterSetChartSize", function (a) {
        var l = this.options.chart.scrollablePlotArea,
          h = l && l.minWidth;
        l = l && l.minHeight;
        let n;
        if (!this.renderer.forExport) {
          if (h) {
            if ((this.scrollablePixelsX = h = Math.max(0, h - this.chartWidth)))
              (this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                c(this.plotBox)),
                (this.plotBox.width = this.plotWidth += h),
                this.inverted
                  ? (this.clipBox.height += h)
                  : (this.clipBox.width += h),
                (n = { 1: { name: "right", value: h } });
          } else
            l &&
              ((this.scrollablePixelsY = h = Math.max(0, l - this.chartHeight)),
              v(h) &&
                ((this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                  c(this.plotBox)),
                (this.plotBox.height = this.plotHeight += h),
                this.inverted
                  ? (this.clipBox.width += h)
                  : (this.clipBox.height += h),
                (n = { 2: { name: "bottom", value: h } })));
          n &&
            !a.skipAxes &&
            this.axes.forEach(function (a) {
              n[a.side]
                ? (a.getPlotLinePath = function () {
                    let c = n[a.side].name,
                      g = this[c],
                      h;
                    this[c] = g - n[a.side].value;
                    h = y.prototype.getPlotLinePath.apply(this, arguments);
                    this[c] = g;
                    return h;
                  })
                : (a.setAxisSize(), a.setAxisTranslation());
            });
        }
      });
      z(G, "render", function () {
        this.scrollablePixelsX || this.scrollablePixelsY
          ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
          : this.fixedDiv && this.applyFixed();
      });
      G.prototype.setUpScrolling = function () {
        const a = {
          WebkitOverflowScrolling: "touch",
          overflowX: "hidden",
          overflowY: "hidden",
        };
        this.scrollablePixelsX && (a.overflowX = "auto");
        this.scrollablePixelsY && (a.overflowY = "auto");
        this.scrollingParent = t(
          "div",
          { className: "highcharts-scrolling-parent" },
          { position: "relative" },
          this.renderTo
        );
        this.scrollingContainer = t(
          "div",
          { className: "highcharts-scrolling" },
          a,
          this.scrollingParent
        );
        let c;
        z(this.scrollingContainer, "scroll", () => {
          this.pointer &&
            (delete this.pointer.chartPosition,
            this.hoverPoint && (c = this.hoverPoint),
            this.pointer.runPointActions(void 0, c, !0));
        });
        this.innerContainer = t(
          "div",
          { className: "highcharts-inner-container" },
          null,
          this.scrollingContainer
        );
        this.innerContainer.appendChild(this.container);
        this.setUpScrolling = null;
      };
      G.prototype.moveFixedElements = function () {
        let a = this.container,
          c = this.fixedRenderer,
          h =
            ".highcharts-breadcrumbs-group .highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(
              " "
            ),
          n;
        this.scrollablePixelsX && !this.inverted
          ? (n = ".highcharts-yaxis")
          : this.scrollablePixelsX && this.inverted
          ? (n = ".highcharts-xaxis")
          : this.scrollablePixelsY && !this.inverted
          ? (n = ".highcharts-xaxis")
          : this.scrollablePixelsY &&
            this.inverted &&
            (n = ".highcharts-yaxis");
        n &&
          h.push(
            `${n}:not(.highcharts-radial-axis)`,
            `${n}-labels:not(.highcharts-radial-axis-labels)`
          );
        h.forEach(function (g) {
          [].forEach.call(a.querySelectorAll(g), function (a) {
            (a.namespaceURI === c.SVG_NS
              ? c.box
              : c.box.parentNode
            ).appendChild(a);
            a.style.pointerEvents = "auto";
          });
        });
      };
      G.prototype.applyFixed = function () {
        var a = !this.fixedDiv,
          c = this.options.chart,
          h = c.scrollablePlotArea,
          q = A.getRendererType();
        a
          ? ((this.fixedDiv = t(
              "div",
              { className: "highcharts-fixed" },
              {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: ((c.style && c.style.zIndex) || 0) + 2,
                top: 0,
              },
              null,
              !0
            )),
            this.scrollingContainer &&
              this.scrollingContainer.parentNode.insertBefore(
                this.fixedDiv,
                this.scrollingContainer
              ),
            (this.renderTo.style.overflow = "visible"),
            (this.fixedRenderer = c =
              new q(
                this.fixedDiv,
                this.chartWidth,
                this.chartHeight,
                this.options.chart.style
              )),
            (this.scrollableMask = c
              .path()
              .attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": n(h.opacity, 0.85),
                zIndex: -1,
              })
              .addClass("highcharts-scrollable-mask")
              .add()),
            z(this, "afterShowResetZoom", this.moveFixedElements),
            z(this, "afterApplyDrilldown", this.moveFixedElements),
            z(this, "afterLayOutTitles", this.moveFixedElements))
          : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
        if (this.scrollableDirty || a)
          (this.scrollableDirty = !1), this.moveFixedElements();
        c = this.chartWidth + (this.scrollablePixelsX || 0);
        q = this.chartHeight + (this.scrollablePixelsY || 0);
        x(this.container);
        this.container.style.width = c + "px";
        this.container.style.height = q + "px";
        this.renderer.boxWrapper.attr({
          width: c,
          height: q,
          viewBox: [0, 0, c, q].join(" "),
        });
        this.chartBackground.attr({ width: c, height: q });
        this.scrollingContainer.style.height = this.chartHeight + "px";
        a &&
          (h.scrollPositionX &&
            (this.scrollingContainer.scrollLeft =
              this.scrollablePixelsX * h.scrollPositionX),
          h.scrollPositionY &&
            (this.scrollingContainer.scrollTop =
              this.scrollablePixelsY * h.scrollPositionY));
        q = this.axisOffset;
        a = this.plotTop - q[0] - 1;
        h = this.plotLeft - q[3] - 1;
        c = this.plotTop + this.plotHeight + q[2] + 1;
        q = this.plotLeft + this.plotWidth + q[1] + 1;
        let g = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
          w = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
        a = this.scrollablePixelsX
          ? [
              ["M", 0, a],
              ["L", this.plotLeft - 1, a],
              ["L", this.plotLeft - 1, c],
              ["L", 0, c],
              ["Z"],
              ["M", g, a],
              ["L", this.chartWidth, a],
              ["L", this.chartWidth, c],
              ["L", g, c],
              ["Z"],
            ]
          : this.scrollablePixelsY
          ? [
              ["M", h, 0],
              ["L", h, this.plotTop - 1],
              ["L", q, this.plotTop - 1],
              ["L", q, 0],
              ["Z"],
              ["M", h, w],
              ["L", h, this.chartHeight],
              ["L", q, this.chartHeight],
              ["L", q, w],
              ["Z"],
            ]
          : [["M", 0, 0]];
        "adjustHeight" !== this.redrawTrigger &&
          this.scrollableMask.attr({ d: a });
      };
      z(y, "afterInit", function () {
        this.chart.scrollableDirty = !0;
      });
      z(L, "show", function () {
        this.chart.scrollableDirty = !0;
      });
      ("");
    }
  );
  M(
    a,
    "Core/Axis/Stacking/StackItem.js",
    [
      a["Core/FormatUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { format: x } = a,
        { series: A } = y,
        { destroyObjectProperties: D, fireEvent: C, isNumber: z, pick: t } = G;
      class v {
        constructor(a, n, r, l, h) {
          const c = a.chart.inverted,
            g = a.reversed;
          this.axis = a;
          a = this.isNegative = !!r !== !!g;
          this.options = n = n || {};
          this.x = l;
          this.cumulative = this.total = null;
          this.points = {};
          this.hasValidPoints = !1;
          this.stack = h;
          this.rightCliff = this.leftCliff = 0;
          this.alignOptions = {
            align: n.align || (c ? (a ? "left" : "right") : "center"),
            verticalAlign:
              n.verticalAlign || (c ? "middle" : a ? "bottom" : "top"),
            y: n.y,
            x: n.x,
          };
          this.textAlign =
            n.textAlign || (c ? (a ? "right" : "left") : "center");
        }
        destroy() {
          D(this, this.axis);
        }
        render(a) {
          const c = this.axis.chart,
            r = this.options;
          var l = r.format;
          l = l ? x(l, this, c) : r.formatter.call(this);
          this.label
            ? this.label.attr({ text: l, visibility: "hidden" })
            : ((this.label = c.renderer.label(
                l,
                null,
                void 0,
                r.shape,
                void 0,
                void 0,
                r.useHTML,
                !1,
                "stack-labels"
              )),
              (l = {
                r: r.borderRadius || 0,
                text: l,
                padding: t(r.padding, 5),
                visibility: "hidden",
              }),
              c.styledMode ||
                ((l.fill = r.backgroundColor),
                (l.stroke = r.borderColor),
                (l["stroke-width"] = r.borderWidth),
                this.label.css(r.style || {})),
              this.label.attr(l),
              this.label.added || this.label.add(a));
          this.label.labelrank = c.plotSizeY;
          C(this, "afterRender");
        }
        setOffset(a, n, r, l, h, q) {
          const {
              alignOptions: c,
              axis: w,
              label: v,
              options: x,
              textAlign: e,
            } = this,
            m = w.chart;
          r = this.getStackBox({
            xOffset: a,
            width: n,
            boxBottom: r,
            boxTop: l,
            defaultX: h,
            xAxis: q,
          });
          var { verticalAlign: u } = c;
          if (v && r) {
            l = v.getBBox();
            h = v.padding;
            q = "justify" === t(x.overflow, "justify");
            c.x = x.x || 0;
            c.y = x.y || 0;
            const { x: a, y: g } = this.adjustStackPosition({
              labelBox: l,
              verticalAlign: u,
              textAlign: e,
            });
            r.x -= a;
            r.y -= g;
            v.align(c, !1, r);
            (u = m.isInsidePlot(
              v.alignAttr.x + c.x + a,
              v.alignAttr.y + c.y + g
            )) || (q = !1);
            q && A.prototype.justifyDataLabel.call(w, v, c, v.alignAttr, l, r);
            v.attr({
              x: v.alignAttr.x,
              y: v.alignAttr.y,
              rotation: x.rotation,
              rotationOriginX: l.width / 2,
              rotationOriginY: l.height / 2,
            });
            t(!q && x.crop, !0) &&
              (u =
                z(v.x) &&
                z(v.y) &&
                m.isInsidePlot(v.x - h + v.width, v.y) &&
                m.isInsidePlot(v.x + h, v.y));
            v[u ? "show" : "hide"]();
          }
          C(this, "afterSetOffset", { xOffset: a, width: n });
        }
        adjustStackPosition({ labelBox: a, verticalAlign: n, textAlign: r }) {
          const c = {
            bottom: 0,
            middle: 1,
            top: 2,
            right: 1,
            center: 0,
            left: -1,
          };
          return {
            x: a.width / 2 + (a.width / 2) * c[r],
            y: (a.height / 2) * c[n],
          };
        }
        getStackBox(a) {
          var c = this.axis;
          const r = c.chart,
            { boxTop: l, defaultX: h, xOffset: q, width: g, boxBottom: w } = a;
          var v = c.stacking.usePercentage ? 100 : t(l, this.total, 0);
          v = c.toPixels(v);
          a = a.xAxis || r.xAxis[0];
          const x = t(h, a.translate(this.x)) + q;
          c = c.toPixels(
            w ||
              (z(c.min) && c.logarithmic && c.logarithmic.lin2log(c.min)) ||
              0
          );
          c = Math.abs(v - c);
          const e = this.isNegative;
          return r.inverted
            ? {
                x: (e ? v : v - c) - r.plotLeft,
                y: a.height - x - g,
                width: c,
                height: g,
              }
            : {
                x: x + a.transB - r.plotLeft,
                y: (e ? v - c : v) - r.plotTop,
                width: g,
                height: c,
              };
        }
      }
      ("");
      return v;
    }
  );
  M(
    a,
    "Core/Axis/Stacking/StackingAxis.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Axis/Stacking/StackItem.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A) {
      function x() {
        const b = this,
          a = b.inverted;
        b.yAxis.forEach((b) => {
          b.stacking &&
            b.stacking.stacks &&
            b.hasVisibleSeries &&
            (b.stacking.oldStacks = b.stacking.stacks);
        });
        b.series.forEach((d) => {
          const c = (d.xAxis && d.xAxis.options) || {};
          !d.options.stacking ||
            (!0 !== d.visible && !1 !== b.options.chart.ignoreHiddenSeries) ||
            (d.stackKey = [
              d.type,
              p(d.options.stack, ""),
              a ? c.top : c.left,
              a ? c.height : c.width,
            ].join());
        });
      }
      function C() {
        const b = this.stacking;
        if (b) {
          var a = b.stacks;
          u(a, function (b, d) {
            J(b);
            a[d] = null;
          });
          b && b.stackTotalGroup && b.stackTotalGroup.destroy();
        }
      }
      function z() {
        "yAxis" !== this.coll || this.stacking || (this.stacking = new H(this));
      }
      function t(b, a, c, e) {
        !w(b) || b.x !== a || (e && b.stackKey !== e)
          ? (b = { x: a, index: 0, key: e, stackKey: e })
          : b.index++;
        b.key = [c, a, b.index].join();
        return b;
      }
      function v() {
        const b = this,
          a = b.stackKey,
          c = b.yAxis.stacking.stacks,
          e = b.processedXData,
          g = b[b.options.stacking + "Stacker"];
        let m;
        g &&
          [a, "-" + a].forEach((a) => {
            let d = e.length;
            let f;
            for (; d--; ) {
              var k = e[d];
              m = b.getStackIndicator(m, k, b.index, a);
              (f = (k = c[a] && c[a][k]) && k.points[m.key]) &&
                g.call(b, f, k, d);
            }
          });
      }
      function c(b, a, c) {
        a = a.total ? 100 / a.total : 0;
        b[0] = g(b[0] * a);
        b[1] = g(b[1] * a);
        this.stackedYData[c] = b[1];
      }
      function n() {
        const b = this.yAxis.stacking;
        this.options.centerInCategory &&
        (this.is("column") || this.is("columnrange")) &&
        !this.options.stacking &&
        1 < this.chart.series.length
          ? h.setStackedPoints.call(this, "group")
          : b &&
            u(b.stacks, (a, c) => {
              "group" === c.slice(-5) &&
                (u(a, (b) => b.destroy()), delete b.stacks[c]);
            });
      }
      function r(b) {
        var a = this.chart;
        const c = b || this.options.stacking;
        if (
          c &&
          (!0 === this.visible || !1 === a.options.chart.ignoreHiddenSeries)
        ) {
          var f = this.processedXData,
            m = this.processedYData,
            h = [],
            l = m.length,
            n = this.options,
            q = n.threshold,
            r = p(n.startFromThreshold && q, 0);
          n = n.stack;
          b = b ? `${this.type},${c}` : this.stackKey;
          var u = "-" + b,
            v = this.negStacks;
          a = "group" === c ? a.yAxis[0] : this.yAxis;
          var t = a.stacking.stacks,
            x = a.stacking.oldStacks,
            F,
            H;
          a.stacking.stacksTouched += 1;
          for (H = 0; H < l; H++) {
            var J = f[H];
            var z = m[H];
            var y = this.getStackIndicator(y, J, this.index);
            var A = y.key;
            var C = (F = v && z < (r ? 0 : q)) ? u : b;
            t[C] || (t[C] = {});
            t[C][J] ||
              (x[C] && x[C][J]
                ? ((t[C][J] = x[C][J]), (t[C][J].total = null))
                : (t[C][J] = new L(a, a.options.stackLabels, !!F, J, n)));
            C = t[C][J];
            null !== z
              ? ((C.points[A] = C.points[this.index] = [p(C.cumulative, r)]),
                w(C.cumulative) || (C.base = A),
                (C.touched = a.stacking.stacksTouched),
                0 < y.index &&
                  !1 === this.singleStacks &&
                  (C.points[A][0] = C.points[this.index + "," + J + ",0"][0]))
              : (C.points[A] = C.points[this.index] = null);
            "percent" === c
              ? ((F = F ? b : u),
                v && t[F] && t[F][J]
                  ? ((F = t[F][J]),
                    (C.total = F.total =
                      Math.max(F.total, C.total) + Math.abs(z) || 0))
                  : (C.total = g(C.total + (Math.abs(z) || 0))))
              : "group" === c
              ? (e(z) && (z = z[0]),
                null !== z && (C.total = (C.total || 0) + 1))
              : (C.total = g(C.total + (z || 0)));
            C.cumulative =
              "group" === c
                ? (C.total || 1) - 1
                : g(p(C.cumulative, r) + (z || 0));
            null !== z &&
              (C.points[A].push(C.cumulative),
              (h[H] = C.cumulative),
              (C.hasValidPoints = !0));
          }
          "percent" === c && (a.stacking.usePercentage = !0);
          "group" !== c && (this.stackedYData = h);
          a.stacking.oldStacks = {};
        }
      }
      const { getDeferredAnimation: l } = a,
        {
          series: { prototype: h },
        } = G,
        {
          addEvent: q,
          correctFloat: g,
          defined: w,
          destroyObjectProperties: J,
          fireEvent: F,
          isArray: e,
          isNumber: m,
          objectEach: u,
          pick: p,
        } = A;
      class H {
        constructor(b) {
          this.oldStacks = {};
          this.stacks = {};
          this.stacksTouched = 0;
          this.axis = b;
        }
        buildStacks() {
          const b = this.axis,
            a = b.series,
            c = b.options.reversedStacks,
            e = a.length;
          let g, m;
          this.usePercentage = !1;
          for (m = e; m--; )
            (g = a[c ? m : e - m - 1]),
              g.setStackedPoints(),
              g.setGroupedPoints();
          for (m = 0; m < e; m++) a[m].modifyStacks();
          F(b, "afterBuildStacks");
        }
        cleanStacks() {
          let b;
          this.oldStacks && (b = this.stacks = this.oldStacks);
          u(b, function (b) {
            u(b, function (b) {
              b.cumulative = b.total;
            });
          });
        }
        resetStacks() {
          u(this.stacks, (b) => {
            u(b, (a, c) => {
              m(a.touched) && a.touched < this.stacksTouched
                ? (a.destroy(), delete b[c])
                : ((a.total = null), (a.cumulative = null));
            });
          });
        }
        renderStackTotals() {
          var b = this.axis;
          const a = b.chart,
            c = a.renderer,
            e = this.stacks;
          b = l(
            a,
            (b.options.stackLabels && b.options.stackLabels.animation) || !1
          );
          const g = (this.stackTotalGroup =
            this.stackTotalGroup ||
            c.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add());
          g.translate(a.plotLeft, a.plotTop);
          u(e, function (b) {
            u(b, function (b) {
              b.render(g);
            });
          });
          g.animate({ opacity: 1 }, b);
        }
      }
      var b;
      (function (b) {
        const a = [];
        b.compose = function (b, d, e) {
          A.pushUnique(a, b) && (q(b, "init", z), q(b, "destroy", C));
          A.pushUnique(a, d) && (d.prototype.getStacks = x);
          A.pushUnique(a, e) &&
            ((b = e.prototype),
            (b.getStackIndicator = t),
            (b.modifyStacks = v),
            (b.percentStacker = c),
            (b.setGroupedPoints = n),
            (b.setStackedPoints = r));
        };
      })(b || (b = {}));
      return b;
    }
  );
  M(
    a,
    "Series/Line/LineSeries.js",
    [
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { defined: x, merge: A } = G;
      class D extends a {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        drawGraph() {
          const a = this,
            x = this.options,
            t = (this.gappedPath || this.getGraphPath).call(this),
            v = this.chart.styledMode;
          let c = [["graph", "highcharts-graph"]];
          v || c[0].push(x.lineColor || this.color || "#cccccc", x.dashStyle);
          c = a.getZonesGraphs(c);
          c.forEach(function (c, r) {
            var l = c[0];
            let h = a[l];
            const n = h ? "animate" : "attr";
            h
              ? ((h.endX = a.preventGraphAnimation ? null : t.xMap),
                h.animate({ d: t }))
              : t.length &&
                (a[l] = h =
                  a.chart.renderer
                    .path(t)
                    .addClass(c[1])
                    .attr({ zIndex: 1 })
                    .add(a.group));
            h &&
              !v &&
              ((l = {
                stroke: c[2],
                "stroke-width": x.lineWidth || 0,
                fill: (a.fillGraph && a.color) || "none",
              }),
              c[3]
                ? (l.dashstyle = c[3])
                : "square" !== x.linecap &&
                  (l["stroke-linecap"] = l["stroke-linejoin"] = "round"),
              h[n](l).shadow(2 > r && x.shadow));
            h && ((h.startX = t.xMap), (h.isArea = t.isArea));
          });
        }
        getGraphPath(a, z, t) {
          const v = this,
            c = v.options,
            n = [],
            r = [];
          let l,
            h = c.step;
          a = a || v.points;
          const q = a.reversed;
          q && a.reverse();
          (h = { right: 1, center: 2 }[h] || (h && 3)) && q && (h = 4 - h);
          a = this.getValidPoints(a, !1, !(c.connectNulls && !z && !t));
          a.forEach(function (g, q) {
            const w = g.plotX,
              F = g.plotY,
              e = a[q - 1],
              m = g.isNull || "number" !== typeof F;
            (g.leftCliff || (e && e.rightCliff)) && !t && (l = !0);
            m && !x(z) && 0 < q
              ? (l = !c.connectNulls)
              : m && !z
              ? (l = !0)
              : (0 === q || l
                  ? (q = [["M", g.plotX, g.plotY]])
                  : v.getPointSpline
                  ? (q = [v.getPointSpline(a, g, q)])
                  : h
                  ? ((q =
                      1 === h
                        ? [["L", e.plotX, F]]
                        : 2 === h
                        ? [
                            ["L", (e.plotX + w) / 2, e.plotY],
                            ["L", (e.plotX + w) / 2, F],
                          ]
                        : [["L", w, e.plotY]]),
                    q.push(["L", w, F]))
                  : (q = [["L", w, F]]),
                r.push(g.x),
                h && (r.push(g.x), 2 === h && r.push(g.x)),
                n.push.apply(n, q),
                (l = !1));
          });
          n.xMap = r;
          return (v.graphPath = n);
        }
        getZonesGraphs(a) {
          this.zones.forEach(function (x, t) {
            t = [
              "zone-graph-" + t,
              "highcharts-graph highcharts-zone-graph-" +
                t +
                " " +
                (x.className || ""),
            ];
            this.chart.styledMode ||
              t.push(
                x.color || this.color,
                x.dashStyle || this.options.dashStyle
              );
            a.push(t);
          }, this);
          return a;
        }
      }
      D.defaultOptions = A(a.defaultOptions, { legendSymbol: "lineMarker" });
      y.registerSeriesType("line", D);
      ("");
      return D;
    }
  );
  M(
    a,
    "Series/Area/AreaSeries.js",
    [
      a["Core/Color/Color.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { parse: x } = a,
        {
          seriesTypes: { line: A },
        } = y,
        { extend: D, merge: C, objectEach: z, pick: t } = G;
      class v extends A {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        drawGraph() {
          this.areaPath = [];
          super.drawGraph.apply(this);
          const a = this,
            n = this.areaPath,
            r = this.options,
            l = [["area", "highcharts-area", this.color, r.fillColor]];
          this.zones.forEach(function (c, n) {
            l.push([
              "zone-area-" + n,
              "highcharts-area highcharts-zone-area-" + n + " " + c.className,
              c.color || a.color,
              c.fillColor || r.fillColor,
            ]);
          });
          l.forEach(function (c) {
            const h = c[0],
              g = {};
            let l = a[h];
            const v = l ? "animate" : "attr";
            l
              ? ((l.endX = a.preventGraphAnimation ? null : n.xMap),
                l.animate({ d: n }))
              : ((g.zIndex = 0),
                (l = a[h] =
                  a.chart.renderer.path(n).addClass(c[1]).add(a.group)),
                (l.isArea = !0));
            a.chart.styledMode ||
              (g.fill = t(
                c[3],
                x(c[2]).setOpacity(t(r.fillOpacity, 0.75)).get()
              ));
            l[v](g);
            l.startX = n.xMap;
            l.shiftUnit = r.step ? 2 : 1;
          });
        }
        getGraphPath(a) {
          var c = A.prototype.getGraphPath,
            r = this.options;
          const l = r.stacking,
            h = this.yAxis,
            q = [],
            g = [],
            w = this.index,
            v = h.stacking.stacks[this.stackKey],
            x = r.threshold,
            e = Math.round(h.getThreshold(r.threshold));
          r = t(r.connectNulls, "percent" === l);
          var m = function (b, c, d) {
            var f = a[b];
            b = l && v[f.x].points[w];
            const m = f[d + "Null"] || 0;
            d = f[d + "Cliff"] || 0;
            let p, n;
            f = !0;
            d || m
              ? ((p = (m ? b[0] : b[1]) + d), (n = b[0] + d), (f = !!m))
              : !l && a[c] && a[c].isNull && (p = n = x);
            "undefined" !== typeof p &&
              (g.push({
                plotX: u,
                plotY: null === p ? e : h.getThreshold(p),
                isNull: f,
                isCliff: !0,
              }),
              q.push({
                plotX: u,
                plotY: null === n ? e : h.getThreshold(n),
                doCurve: !1,
              }));
          };
          let u;
          a = a || this.points;
          l && (a = this.getStackPoints(a));
          for (let b = 0, c = a.length; b < c; ++b) {
            l ||
              (a[b].leftCliff =
                a[b].rightCliff =
                a[b].leftNull =
                a[b].rightNull =
                  void 0);
            var p = a[b].isNull;
            u = t(a[b].rectPlotX, a[b].plotX);
            var H = l ? t(a[b].yBottom, e) : e;
            if (!p || r)
              r || m(b, b - 1, "left"),
                (p && !l && r) ||
                  (g.push(a[b]), q.push({ x: b, plotX: u, plotY: H })),
                r || m(b, b + 1, "right");
          }
          m = c.call(this, g, !0, !0);
          q.reversed = !0;
          p = c.call(this, q, !0, !0);
          (H = p[0]) && "M" === H[0] && (p[0] = ["L", H[1], H[2]]);
          p = m.concat(p);
          p.length && p.push(["Z"]);
          c = c.call(this, g, !1, r);
          p.xMap = m.xMap;
          this.areaPath = p;
          return c;
        }
        getStackPoints(a) {
          const c = this,
            r = [],
            l = [],
            h = this.xAxis,
            q = this.yAxis,
            g = q.stacking.stacks[this.stackKey],
            w = {},
            v = q.series,
            x = v.length,
            e = q.options.reversedStacks ? 1 : -1,
            m = v.indexOf(c);
          a = a || this.points;
          if (this.options.stacking) {
            for (let c = 0; c < a.length; c++)
              (a[c].leftNull = a[c].rightNull = void 0), (w[a[c].x] = a[c]);
            z(g, function (a, c) {
              null !== a.total && l.push(c);
            });
            l.sort(function (a, c) {
              return a - c;
            });
            const n = v.map((a) => a.visible);
            l.forEach(function (a, u) {
              let b = 0,
                f,
                d;
              if (w[a] && !w[a].isNull)
                r.push(w[a]),
                  [-1, 1].forEach(function (b) {
                    const k = 1 === b ? "rightNull" : "leftNull",
                      h = g[l[u + b]];
                    let p = 0;
                    if (h) {
                      let b = m;
                      for (; 0 <= b && b < x; ) {
                        const m = v[b].index;
                        f = h.points[m];
                        f ||
                          (m === c.index
                            ? (w[a][k] = !0)
                            : n[b] &&
                              (d = g[a].points[m]) &&
                              (p -= d[1] - d[0]));
                        b += e;
                      }
                    }
                    w[a][1 === b ? "rightCliff" : "leftCliff"] = p;
                  });
              else {
                let d = m;
                for (; 0 <= d && d < x; ) {
                  if ((f = g[a].points[v[d].index])) {
                    b = f[1];
                    break;
                  }
                  d += e;
                }
                b = t(b, 0);
                b = q.translate(b, 0, 1, 0, 1);
                r.push({
                  isNull: !0,
                  plotX: h.translate(a, 0, 0, 0, 1),
                  x: a,
                  plotY: b,
                  yBottom: b,
                });
              }
            });
          }
          return r;
        }
      }
      v.defaultOptions = C(A.defaultOptions, {
        threshold: 0,
        legendSymbol: "rectangle",
      });
      D(v.prototype, { singleStacks: !1 });
      y.registerSeriesType("area", v);
      ("");
      return v;
    }
  );
  M(
    a,
    "Series/Spline/SplineSeries.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, y) {
      const { line: x } = a.seriesTypes,
        { merge: L, pick: A } = y;
      class D extends x {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        getPointSpline(a, x, t) {
          const v = x.plotX || 0,
            c = x.plotY || 0,
            n = a[t - 1];
          t = a[t + 1];
          let r, l;
          let h;
          if (
            n &&
            !n.isNull &&
            !1 !== n.doCurve &&
            !x.isCliff &&
            t &&
            !t.isNull &&
            !1 !== t.doCurve &&
            !x.isCliff
          ) {
            a = n.plotY || 0;
            var q = t.plotX || 0;
            t = t.plotY || 0;
            let g = 0;
            r = (1.5 * v + (n.plotX || 0)) / 2.5;
            l = (1.5 * c + a) / 2.5;
            q = (1.5 * v + q) / 2.5;
            h = (1.5 * c + t) / 2.5;
            q !== r && (g = ((h - l) * (q - v)) / (q - r) + c - h);
            l += g;
            h += g;
            l > a && l > c
              ? ((l = Math.max(a, c)), (h = 2 * c - l))
              : l < a && l < c && ((l = Math.min(a, c)), (h = 2 * c - l));
            h > t && h > c
              ? ((h = Math.max(t, c)), (l = 2 * c - h))
              : h < t && h < c && ((h = Math.min(t, c)), (l = 2 * c - h));
            x.rightContX = q;
            x.rightContY = h;
          }
          x = [
            "C",
            A(n.rightContX, n.plotX, 0),
            A(n.rightContY, n.plotY, 0),
            A(r, v, 0),
            A(l, c, 0),
            v,
            c,
          ];
          n.rightContX = n.rightContY = void 0;
          return x;
        }
      }
      D.defaultOptions = L(x.defaultOptions);
      a.registerSeriesType("spline", D);
      ("");
      return D;
    }
  );
  M(
    a,
    "Series/AreaSpline/AreaSplineSeries.js",
    [
      a["Series/Spline/SplineSeries.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const {
          area: x,
          area: { prototype: A },
        } = y.seriesTypes,
        { extend: D, merge: C } = G;
      class z extends a {
        constructor() {
          super(...arguments);
          this.options = this.points = this.data = void 0;
        }
      }
      z.defaultOptions = C(a.defaultOptions, x.defaultOptions);
      D(z.prototype, {
        getGraphPath: A.getGraphPath,
        getStackPoints: A.getStackPoints,
        drawGraph: A.drawGraph,
      });
      y.registerSeriesType("areaspline", z);
      ("");
      return z;
    }
  );
  M(a, "Series/Column/ColumnSeriesDefaults.js", [], function () {
    "";
    return {
      borderRadius: 3,
      centerInCategory: !1,
      groupPadding: 0.2,
      marker: null,
      pointPadding: 0.1,
      minPointLength: 0,
      cropThreshold: 50,
      pointRange: null,
      states: {
        hover: { halo: !1, brightness: 0.1 },
        select: { color: "#cccccc", borderColor: "#000000" },
      },
      dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
      startFromThreshold: !0,
      stickyTracking: !1,
      tooltip: { distance: 6 },
      threshold: 0,
      borderColor: "#ffffff",
    };
  });
  M(
    a,
    "Series/Column/ColumnSeries.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Color/Color.js"],
      a["Series/Column/ColumnSeriesDefaults.js"],
      a["Core/Globals.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A, D, C) {
      const { animObject: x } = a,
        { parse: t } = y,
        { hasTouch: v, noop: c } = L,
        {
          clamp: n,
          defined: r,
          extend: l,
          fireEvent: h,
          isArray: q,
          isNumber: g,
          merge: w,
          pick: J,
          objectEach: F,
        } = C;
      class e extends A {
        constructor() {
          super(...arguments);
          this.points =
            this.options =
            this.group =
            this.data =
            this.borderWidth =
              void 0;
        }
        animate(a) {
          const c = this,
            e = this.yAxis,
            g = e.pos,
            b = c.options,
            f = this.chart.inverted,
            d = {},
            k = f ? "translateX" : "translateY";
          let m;
          a
            ? ((d.scaleY = 0.001),
              (a = n(e.toPixels(b.threshold), g, g + e.len)),
              f ? (d.translateX = a - e.len) : (d.translateY = a),
              c.clipBox && c.setClip(),
              c.group.attr(d))
            : ((m = Number(c.group.attr(k))),
              c.group.animate(
                { scaleY: 1 },
                l(x(c.options.animation), {
                  step: function (b, a) {
                    c.group && ((d[k] = m + a.pos * (g - m)), c.group.attr(d));
                  },
                })
              ));
        }
        init(a, c) {
          super.init.apply(this, arguments);
          const e = this;
          a = e.chart;
          a.hasRendered &&
            a.series.forEach(function (a) {
              a.type === e.type && (a.isDirty = !0);
            });
        }
        getColumnMetrics() {
          const a = this;
          var c = a.options;
          const e = a.xAxis,
            g = a.yAxis;
          var b = e.options.reversedStacks;
          b = (e.reversed && !b) || (!e.reversed && b);
          const f = {};
          let d,
            k = 0;
          !1 === c.grouping
            ? (k = 1)
            : a.chart.series.forEach(function (b) {
                const c = b.yAxis,
                  e = b.options;
                let m;
                b.type !== a.type ||
                  (!b.visible && a.chart.options.chart.ignoreHiddenSeries) ||
                  g.len !== c.len ||
                  g.pos !== c.pos ||
                  (e.stacking && "group" !== e.stacking
                    ? ((d = b.stackKey),
                      "undefined" === typeof f[d] && (f[d] = k++),
                      (m = f[d]))
                    : !1 !== e.grouping && (m = k++),
                  (b.columnIndex = m));
              });
          const h = Math.min(
              Math.abs(e.transA) *
                ((e.ordinal && e.ordinal.slope) ||
                  c.pointRange ||
                  e.closestPointRange ||
                  e.tickInterval ||
                  1),
              e.len
            ),
            l = h * c.groupPadding,
            n = (h - 2 * l) / (k || 1);
          c = Math.min(
            c.maxPointWidth || e.len,
            J(c.pointWidth, n * (1 - 2 * c.pointPadding))
          );
          a.columnMetrics = {
            width: c,
            offset:
              (n - c) / 2 +
              (l + ((a.columnIndex || 0) + (b ? 1 : 0)) * n - h / 2) *
                (b ? -1 : 1),
            paddedWidth: n,
            columnCount: k,
          };
          return a.columnMetrics;
        }
        crispCol(a, c, e, g) {
          var b = this.borderWidth,
            f = -(b % 2 ? 0.5 : 0);
          b = b % 2 ? 0.5 : 1;
          this.options.crisp &&
            ((e = Math.round(a + e) + f), (a = Math.round(a) + f), (e -= a));
          g = Math.round(c + g) + b;
          f = 0.5 >= Math.abs(c) && 0.5 < g;
          c = Math.round(c) + b;
          g -= c;
          f && g && (--c, (g += 1));
          return { x: a, y: c, width: e, height: g };
        }
        adjustForMissingColumns(a, c, e, g) {
          const b = this.options.stacking;
          if (!e.isNull && 1 < g.columnCount) {
            const f = this.yAxis.options.reversedStacks;
            let d = 0,
              k = f ? 0 : -g.columnCount;
            F(this.yAxis.stacking && this.yAxis.stacking.stacks, (a) => {
              if ("number" === typeof e.x) {
                const c = a[e.x.toString()];
                c &&
                  ((a = c.points[this.index]),
                  b
                    ? (a && (d = k), c.hasValidPoints && (f ? k++ : k--))
                    : q(a) &&
                      ((a = Object.keys(c.points)
                        .filter(
                          (b) =>
                            !b.match(",") &&
                            c.points[b] &&
                            1 < c.points[b].length
                        )
                        .map(parseFloat)
                        .sort((b, a) => a - b)),
                      (d = a.indexOf(this.index)),
                      (k = a.length)));
              }
            });
            a =
              (e.plotX || 0) +
              ((k - 1) * g.paddedWidth + c) / 2 -
              c -
              d * g.paddedWidth;
          }
          return a;
        }
        translate() {
          const a = this,
            c = a.chart,
            e = a.options;
          var l = (a.dense = 2 > a.closestPointRange * a.xAxis.transA);
          l = a.borderWidth = J(e.borderWidth, l ? 0 : 1);
          const b = a.xAxis,
            f = a.yAxis,
            d = e.threshold,
            k = J(e.minPointLength, 5),
            q = a.getColumnMetrics(),
            w = q.width,
            v = (a.pointXOffset = q.offset),
            t = a.dataMin,
            x = a.dataMax;
          let F = (a.barW = Math.max(w, 1 + 2 * l)),
            y = (a.translatedThreshold = f.getThreshold(d));
          c.inverted && (y -= 0.5);
          e.pointPadding && (F = Math.ceil(F));
          A.prototype.translate.apply(a);
          a.points.forEach(function (m) {
            const h = J(m.yBottom, y);
            var l = 999 + Math.abs(h),
              p = m.plotX || 0;
            l = n(m.plotY, -l, f.len + l);
            let u = Math.min(l, h),
              E = Math.max(l, h) - u,
              H = w,
              z = p + v,
              A = F;
            k &&
              Math.abs(E) < k &&
              ((E = k),
              (p = (!f.reversed && !m.negative) || (f.reversed && m.negative)),
              g(d) &&
                g(x) &&
                m.y === d &&
                x <= d &&
                (f.min || 0) < d &&
                (t !== x || (f.max || 0) <= d) &&
                (p = !p),
              (u = Math.abs(u - y) > k ? h - k : y - (p ? k : 0)));
            r(m.options.pointWidth) &&
              ((H = A = Math.ceil(m.options.pointWidth)),
              (z -= Math.round((H - w) / 2)));
            e.centerInCategory && (z = a.adjustForMissingColumns(z, H, m, q));
            m.barX = z;
            m.pointWidth = H;
            m.tooltipPos = c.inverted
              ? [
                  n(
                    f.len + f.pos - c.plotLeft - l,
                    f.pos - c.plotLeft,
                    f.len + f.pos - c.plotLeft
                  ),
                  b.len + b.pos - c.plotTop - z - A / 2,
                  E,
                ]
              : [
                  b.left - c.plotLeft + z + A / 2,
                  n(
                    l + f.pos - c.plotTop,
                    f.pos - c.plotTop,
                    f.len + f.pos - c.plotTop
                  ),
                  E,
                ];
            m.shapeType = a.pointClass.prototype.shapeType || "roundedRect";
            m.shapeArgs = a.crispCol(z, m.isNull ? y : u, A, m.isNull ? 0 : E);
          });
          h(this, "afterColumnTranslate");
        }
        drawGraph() {
          this.group[this.dense ? "addClass" : "removeClass"](
            "highcharts-dense-data"
          );
        }
        pointAttribs(a, c) {
          const e = this.options;
          var g = this.pointAttrToOptions || {},
            b = g.stroke || "borderColor";
          const f = g["stroke-width"] || "borderWidth";
          let d,
            k = (a && a.color) || this.color,
            m = (a && a[b]) || e[b] || k;
          g = (a && a.options.dashStyle) || e.dashStyle;
          let h = (a && a[f]) || e[f] || this[f] || 0,
            l = J(a && a.opacity, e.opacity, 1);
          a &&
            this.zones.length &&
            ((d = a.getZone()),
            (k =
              a.options.color ||
              (d && (d.color || a.nonZonedColor)) ||
              this.color),
            d &&
              ((m = d.borderColor || m),
              (g = d.dashStyle || g),
              (h = d.borderWidth || h)));
          c &&
            a &&
            ((a = w(
              e.states[c],
              (a.options.states && a.options.states[c]) || {}
            )),
            (c = a.brightness),
            (k =
              a.color ||
              ("undefined" !== typeof c && t(k).brighten(a.brightness).get()) ||
              k),
            (m = a[b] || m),
            (h = a[f] || h),
            (g = a.dashStyle || g),
            (l = J(a.opacity, l)));
          b = { fill: k, stroke: m, "stroke-width": h, opacity: l };
          g && (b.dashstyle = g);
          return b;
        }
        drawPoints(a = this.points) {
          const c = this,
            e = this.chart,
            m = c.options,
            b = e.renderer,
            f = m.animationLimit || 250;
          let d;
          a.forEach(function (a) {
            let k = a.graphic,
              h = !!k,
              l = k && e.pointCount < f ? "animate" : "attr";
            if (g(a.plotY) && null !== a.y) {
              d = a.shapeArgs;
              k && a.hasNewShapeType() && (k = k.destroy());
              c.enabledDataSorting &&
                (a.startXPos = c.xAxis.reversed
                  ? -(d ? d.width || 0 : 0)
                  : c.xAxis.width);
              k ||
                ((a.graphic = k = b[a.shapeType](d).add(a.group || c.group)) &&
                  c.enabledDataSorting &&
                  e.hasRendered &&
                  e.pointCount < f &&
                  (k.attr({ x: a.startXPos }), (h = !0), (l = "animate")));
              if (k && h) k[l](w(d));
              e.styledMode ||
                k[l](c.pointAttribs(a, a.selected && "select")).shadow(
                  !1 !== a.allowShadow && m.shadow
                );
              k &&
                (k.addClass(a.getClassName(), !0),
                k.attr({ visibility: a.visible ? "inherit" : "hidden" }));
            } else k && (a.graphic = k.destroy());
          });
        }
        drawTracker(a = this.points) {
          const c = this,
            e = c.chart,
            g = e.pointer,
            b = function (b) {
              const a = g.getPointFromEvent(b);
              "undefined" !== typeof a &&
                ((g.isDirectTouch = !0), a.onMouseOver(b));
            };
          let f;
          a.forEach(function (b) {
            f = q(b.dataLabels)
              ? b.dataLabels
              : b.dataLabel
              ? [b.dataLabel]
              : [];
            b.graphic && (b.graphic.element.point = b);
            f.forEach(function (a) {
              a.div ? (a.div.point = b) : (a.element.point = b);
            });
          });
          c._hasTracking ||
            (c.trackerGroups.forEach(function (a) {
              if (c[a]) {
                c[a]
                  .addClass("highcharts-tracker")
                  .on("mouseover", b)
                  .on("mouseout", function (b) {
                    g.onTrackerMouseOut(b);
                  });
                if (v) c[a].on("touchstart", b);
                !e.styledMode &&
                  c.options.cursor &&
                  c[a].css({ cursor: c.options.cursor });
              }
            }),
            (c._hasTracking = !0));
          h(this, "afterDrawTracker");
        }
        remove() {
          const a = this,
            c = a.chart;
          c.hasRendered &&
            c.series.forEach(function (c) {
              c.type === a.type && (c.isDirty = !0);
            });
          A.prototype.remove.apply(a, arguments);
        }
      }
      e.defaultOptions = w(A.defaultOptions, G);
      l(e.prototype, {
        cropShoulder: 0,
        directTouch: !0,
        getSymbol: c,
        negStacks: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      D.registerSeriesType("column", e);
      ("");
      return e;
    }
  );
  M(
    a,
    "Core/Series/DataLabel.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { getDeferredAnimation: x } = a,
        { format: A } = y,
        {
          defined: D,
          extend: C,
          fireEvent: z,
          isArray: t,
          isString: v,
          merge: c,
          objectEach: n,
          pick: r,
          splat: l,
        } = G;
      var h;
      (function (a) {
        function g(b, a, d, c, e) {
          const f = this.chart;
          var g = this.isCartesian && f.inverted;
          const k = this.enabledDataSorting;
          var m = b.plotX,
            h = b.plotY;
          const l = d.rotation;
          var n = d.align;
          h =
            D(m) &&
            D(h) &&
            f.isInsidePlot(m, Math.round(h), {
              inverted: g,
              paneCoordinates: !0,
              series: this,
            });
          let p = "justify" === r(d.overflow, k ? "none" : "justify");
          g =
            this.visible &&
            !1 !== b.visible &&
            D(m) &&
            (b.series.forceDL ||
              (k && !p) ||
              h ||
              (r(d.inside, !!this.options.stacking) &&
                c &&
                f.isInsidePlot(m, g ? c.x + 1 : c.y + c.height - 1, {
                  inverted: g,
                  paneCoordinates: !0,
                  series: this,
                })));
          m = b.pos();
          if (g && m) {
            l && a.attr({ align: n });
            n = a.getBBox(!0);
            var q = [0, 0];
            var u = f.renderer.fontMetrics(a).b;
            c = C({ x: m[0], y: Math.round(m[1]), width: 0, height: 0 }, c);
            C(d, { width: n.width, height: n.height });
            l
              ? ((p = !1),
                (q = f.renderer.rotCorr(u, l)),
                (u = {
                  x: c.x + (d.x || 0) + c.width / 2 + q.x,
                  y:
                    c.y +
                    (d.y || 0) +
                    { top: 0, middle: 0.5, bottom: 1 }[d.verticalAlign] *
                      c.height,
                }),
                (q = [n.x - Number(a.attr("x")), n.y - Number(a.attr("y"))]),
                k &&
                  this.xAxis &&
                  !p &&
                  this.setDataLabelStartPos(b, a, e, h, u),
                a[e ? "attr" : "animate"](u))
              : (k &&
                  this.xAxis &&
                  !p &&
                  this.setDataLabelStartPos(b, a, e, h, c),
                a.align(d, void 0, c),
                (u = a.alignAttr));
            if (p && 0 <= c.height) this.justifyDataLabel(a, d, u, n, c, e);
            else if (r(d.crop, !0)) {
              let { x: b, y: a } = u;
              b += q[0];
              a += q[1];
              g =
                f.isInsidePlot(b, a, { paneCoordinates: !0, series: this }) &&
                f.isInsidePlot(b + n.width, a + n.height, {
                  paneCoordinates: !0,
                  series: this,
                });
            }
            if (d.shape && !l)
              a[e ? "attr" : "animate"]({ anchorX: m[0], anchorY: m[1] });
          }
          e && k && (a.placed = !1);
          g || (k && !p) ? a.show() : (a.hide(), (a.placed = !1));
        }
        function h(b, a) {
          var d = a.filter;
          return d
            ? ((a = d.operator),
              (b = b[d.property]),
              (d = d.value),
              (">" === a && b > d) ||
              ("<" === a && b < d) ||
              (">=" === a && b >= d) ||
              ("<=" === a && b <= d) ||
              ("==" === a && b == d) ||
              ("===" === a && b === d)
                ? !0
                : !1)
            : !0;
        }
        function q() {
          return this.plotGroup(
            "dataLabelsGroup",
            "data-labels",
            this.hasRendered ? "inherit" : "hidden",
            this.options.dataLabels.zIndex || 6
          );
        }
        function F(b) {
          const a = this.hasRendered || 0,
            d = this.initDataLabelsGroup().attr({ opacity: +a });
          !a &&
            d &&
            (this.visible && d.show(),
            this.options.animation
              ? d.animate({ opacity: 1 }, b)
              : d.attr({ opacity: 1 }));
          return d;
        }
        function e(b = this.points) {
          const a = this,
            d = a.chart,
            c = a.options,
            e = d.renderer,
            { backgroundColor: g, plotBackgroundColor: m } = d.options.chart,
            p = e.getContrast((v(m) && m) || (v(g) && g) || "#000000");
          let q = c.dataLabels,
            w,
            F;
          var J = l(q)[0];
          const y = J.animation;
          J = J.defer ? x(d, y, a) : { defer: 0, duration: 0 };
          q = u(
            u(
              d.options.plotOptions &&
                d.options.plotOptions.series &&
                d.options.plotOptions.series.dataLabels,
              d.options.plotOptions &&
                d.options.plotOptions[a.type] &&
                d.options.plotOptions[a.type].dataLabels
            ),
            q
          );
          z(this, "drawDataLabels");
          if (t(q) || q.enabled || a._hasPointLabels)
            (F = this.initDataLabels(J)),
              b.forEach((b) => {
                w = l(u(q, b.dlOptions || (b.options && b.options.dataLabels)));
                w.forEach((f, g) => {
                  const k =
                      f.enabled && (!b.isNull || b.dataLabelOnNull) && h(b, f),
                    m = b.connectors ? b.connectors[g] : b.connector;
                  let l,
                    q,
                    u = b.dataLabels ? b.dataLabels[g] : b.dataLabel,
                    w = !u;
                  const v = r(f.distance, b.labelDistance);
                  if (k) {
                    var t = b.getLabelConfig();
                    var x = r(f[b.formatPrefix + "Format"], f.format);
                    t = D(x)
                      ? A(x, t, d)
                      : (f[b.formatPrefix + "Formatter"] || f.formatter).call(
                          t,
                          f
                        );
                    x = f.style;
                    l = f.rotation;
                    d.styledMode ||
                      ((x.color = r(f.color, x.color, a.color, "#000000")),
                      "contrast" === x.color
                        ? ((b.contrastColor = e.getContrast(
                            b.color || a.color
                          )),
                          (x.color =
                            (!D(v) && f.inside) || 0 > v || c.stacking
                              ? b.contrastColor
                              : p))
                        : delete b.contrastColor,
                      c.cursor && (x.cursor = c.cursor));
                    q = {
                      r: f.borderRadius || 0,
                      rotation: l,
                      padding: f.padding,
                      zIndex: 1,
                    };
                    if (!d.styledMode) {
                      const { backgroundColor: a, borderColor: d } = f;
                      q.fill = "auto" === a ? b.color : a;
                      q.stroke = "auto" === d ? b.color : d;
                      q["stroke-width"] = f.borderWidth;
                    }
                    n(q, function (b, a) {
                      "undefined" === typeof b && delete q[a];
                    });
                  }
                  !u ||
                    (k &&
                      D(t) &&
                      !!u.div === !!f.useHTML &&
                      ((u.rotation && f.rotation) ||
                        u.rotation === f.rotation)) ||
                    ((w = !0),
                    (b.dataLabel = u = b.dataLabel && b.dataLabel.destroy()),
                    b.dataLabels &&
                      (1 === b.dataLabels.length
                        ? delete b.dataLabels
                        : delete b.dataLabels[g]),
                    g || delete b.dataLabel,
                    m &&
                      ((b.connector = b.connector.destroy()),
                      b.connectors &&
                        (1 === b.connectors.length
                          ? delete b.connectors
                          : delete b.connectors[g])));
                  k && D(t)
                    ? (u
                        ? (q.text = t)
                        : ((b.dataLabels = b.dataLabels || []),
                          (u = b.dataLabels[g] =
                            l
                              ? e
                                  .text(t, 0, 0, f.useHTML)
                                  .addClass("highcharts-data-label")
                              : e.label(
                                  t,
                                  0,
                                  0,
                                  f.shape,
                                  null,
                                  null,
                                  f.useHTML,
                                  null,
                                  "data-label"
                                )),
                          g || (b.dataLabel = u),
                          u.addClass(
                            " highcharts-data-label-color-" +
                              b.colorIndex +
                              " " +
                              (f.className || "") +
                              (f.useHTML ? " highcharts-tracker" : "")
                          )),
                      (u.options = f),
                      u.attr(q),
                      d.styledMode || u.css(x).shadow(f.shadow),
                      (g = f[b.formatPrefix + "TextPath"] || f.textPath) &&
                        !f.useHTML &&
                        (u.setTextPath(
                          (b.getDataLabelPath && b.getDataLabelPath(u)) ||
                            b.graphic,
                          g
                        ),
                        b.dataLabelPath &&
                          !g.enabled &&
                          (b.dataLabelPath = b.dataLabelPath.destroy())),
                      u.added || u.add(F),
                      a.alignDataLabel(b, u, f, null, w))
                    : u && u.hide();
                });
              });
          z(this, "afterDrawDataLabels");
        }
        function m(b, a, d, c, e, g) {
          const f = this.chart,
            k = a.align,
            m = a.verticalAlign,
            h = b.box ? 0 : b.padding || 0;
          let { x: l = 0, y: n = 0 } = a,
            p,
            q;
          p = (d.x || 0) + h;
          0 > p &&
            ("right" === k && 0 <= l
              ? ((a.align = "left"), (a.inside = !0))
              : (l -= p),
            (q = !0));
          p = (d.x || 0) + c.width - h;
          p > f.plotWidth &&
            ("left" === k && 0 >= l
              ? ((a.align = "right"), (a.inside = !0))
              : (l += f.plotWidth - p),
            (q = !0));
          p = d.y + h;
          0 > p &&
            ("bottom" === m && 0 <= n
              ? ((a.verticalAlign = "top"), (a.inside = !0))
              : (n -= p),
            (q = !0));
          p = (d.y || 0) + c.height - h;
          p > f.plotHeight &&
            ("top" === m && 0 >= n
              ? ((a.verticalAlign = "bottom"), (a.inside = !0))
              : (n += f.plotHeight - p),
            (q = !0));
          q && ((a.x = l), (a.y = n), (b.placed = !g), b.align(a, void 0, e));
          return q;
        }
        function u(b, a) {
          let d = [],
            e;
          if (t(b) && !t(a))
            d = b.map(function (b) {
              return c(b, a);
            });
          else if (t(a) && !t(b))
            d = a.map(function (a) {
              return c(b, a);
            });
          else if (t(b) || t(a))
            for (e = Math.max(b.length, a.length); e--; ) d[e] = c(b[e], a[e]);
          else d = c(b, a);
          return d;
        }
        function p(b, a, d, c, e) {
          const f = this.chart,
            g = f.inverted,
            k = this.xAxis,
            m = k.reversed,
            h = g ? a.height / 2 : a.width / 2;
          b = (b = b.pointWidth) ? b / 2 : 0;
          a.startXPos = g ? e.x : m ? -h - b : k.width - h + b;
          a.startYPos = g ? (m ? this.yAxis.height - h + b : -h - b) : e.y;
          c
            ? "hidden" === a.visibility &&
              (a.show(), a.attr({ opacity: 0 }).animate({ opacity: 1 }))
            : a.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, a.hide);
          f.hasRendered &&
            (d && a.attr({ x: a.startXPos, y: a.startYPos }), (a.placed = !0));
        }
        const y = [];
        a.compose = function (b) {
          G.pushUnique(y, b) &&
            ((b = b.prototype),
            (b.initDataLabelsGroup = q),
            (b.initDataLabels = F),
            (b.alignDataLabel = g),
            (b.drawDataLabels = e),
            (b.justifyDataLabel = m),
            (b.setDataLabelStartPos = p));
        };
      })(h || (h = {}));
      ("");
      return h;
    }
  );
  M(
    a,
    "Series/Column/ColumnDataLabel.js",
    [
      a["Core/Series/DataLabel.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { series: x } = y,
        { merge: A, pick: D } = G;
      var C;
      (function (y) {
        function t(a, n, r, l, h) {
          let c = this.chart.inverted;
          var g = a.series;
          let w = (g.xAxis ? g.xAxis.len : this.chart.plotSizeX) || 0;
          g = (g.yAxis ? g.yAxis.len : this.chart.plotSizeY) || 0;
          var v = a.dlBox || a.shapeArgs;
          let t = D(a.below, a.plotY > D(this.translatedThreshold, g)),
            e = D(r.inside, !!this.options.stacking);
          v &&
            ((l = A(v)),
            0 > l.y && ((l.height += l.y), (l.y = 0)),
            (v = l.y + l.height - g),
            0 < v && v < l.height && (l.height -= v),
            c &&
              (l = {
                x: g - l.y - l.height,
                y: w - l.x - l.width,
                width: l.height,
                height: l.width,
              }),
            e ||
              (c
                ? ((l.x += t ? 0 : l.width), (l.width = 0))
                : ((l.y += t ? l.height : 0), (l.height = 0))));
          r.align = D(r.align, !c || e ? "center" : t ? "right" : "left");
          r.verticalAlign = D(
            r.verticalAlign,
            c || e ? "middle" : t ? "top" : "bottom"
          );
          x.prototype.alignDataLabel.call(this, a, n, r, l, h);
          r.inside && a.contrastColor && n.css({ color: a.contrastColor });
        }
        const v = [];
        y.compose = function (c) {
          a.compose(x);
          G.pushUnique(v, c) && (c.prototype.alignDataLabel = t);
        };
      })(C || (C = {}));
      return C;
    }
  );
  M(
    a,
    "Series/Bar/BarSeries.js",
    [
      a["Series/Column/ColumnSeries.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { extend: x, merge: A } = G;
      class D extends a {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
      }
      D.defaultOptions = A(a.defaultOptions, {});
      x(D.prototype, { inverted: !0 });
      y.registerSeriesType("bar", D);
      ("");
      return D;
    }
  );
  M(a, "Series/Scatter/ScatterSeriesDefaults.js", [], function () {
    "";
    return {
      lineWidth: 0,
      findNearestPointBy: "xy",
      jitter: { x: 0, y: 0 },
      marker: { enabled: !0 },
      tooltip: {
        headerFormat:
          '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 0.8em"> {series.name}</span><br/>',
        pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
      },
    };
  });
  M(
    a,
    "Series/Scatter/ScatterSeries.js",
    [
      a["Series/Scatter/ScatterSeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { column: x, line: A } = y.seriesTypes,
        { addEvent: D, extend: C, merge: z } = G;
      class t extends A {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        applyJitter() {
          const a = this,
            c = this.options.jitter,
            n = this.points.length;
          c &&
            this.points.forEach(function (r, l) {
              ["x", "y"].forEach(function (h, q) {
                let g = "plot" + h.toUpperCase(),
                  w,
                  v;
                if (c[h] && !r.isNull) {
                  var t = a[h + "Axis"];
                  v = c[h] * t.transA;
                  t &&
                    !t.isLog &&
                    ((w = Math.max(0, r[g] - v)),
                    (t = Math.min(t.len, r[g] + v)),
                    (q = 1e4 * Math.sin(l + q * n)),
                    (q -= Math.floor(q)),
                    (r[g] = w + (t - w) * q),
                    "x" === h && (r.clientX = r.plotX));
                }
              });
            });
        }
        drawGraph() {
          this.options.lineWidth
            ? super.drawGraph()
            : this.graph && (this.graph = this.graph.destroy());
        }
      }
      t.defaultOptions = z(A.defaultOptions, a);
      C(t.prototype, {
        drawTracker: x.prototype.drawTracker,
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
      });
      D(t, "afterTranslate", function () {
        this.applyJitter();
      });
      y.registerSeriesType("scatter", t);
      return t;
    }
  );
  M(
    a,
    "Series/CenteredUtilities.js",
    [a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]],
    function (a, y, G) {
      const { deg2rad: x } = a,
        { fireEvent: A, isNumber: D, pick: C, relativeLength: z } = G;
      var t;
      (function (a) {
        a.getCenter = function () {
          var a = this.options,
            n = this.chart;
          const r = 2 * (a.slicedOffset || 0),
            l = n.plotWidth - 2 * r,
            h = n.plotHeight - 2 * r;
          var q = a.center;
          const g = Math.min(l, h),
            w = a.thickness;
          var t = a.size;
          let v = a.innerSize || 0;
          "string" === typeof t && (t = parseFloat(t));
          "string" === typeof v && (v = parseFloat(v));
          a = [
            C(q[0], "50%"),
            C(q[1], "50%"),
            C(t && 0 > t ? void 0 : a.size, "100%"),
            C(v && 0 > v ? void 0 : a.innerSize || 0, "0%"),
          ];
          !n.angular || this instanceof y || (a[3] = 0);
          for (q = 0; 4 > q; ++q)
            (t = a[q]),
              (n = 2 > q || (2 === q && /%$/.test(t))),
              (a[q] = z(t, [l, h, g, a[2]][q]) + (n ? r : 0));
          a[3] > a[2] && (a[3] = a[2]);
          D(w) && 2 * w < a[2] && 0 < w && (a[3] = a[2] - 2 * w);
          A(this, "afterGetCenter", { positions: a });
          return a;
        };
        a.getStartAndEndRadians = function (a, n) {
          a = D(a) ? a : 0;
          n = D(n) && n > a && 360 > n - a ? n : a + 360;
          return { start: x * (a + -90), end: x * (n + -90) };
        };
      })(t || (t = {}));
      ("");
      return t;
    }
  );
  M(
    a,
    "Series/Pie/PiePoint.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Series/Point.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G) {
      const { setAnimation: x } = a,
        {
          addEvent: A,
          defined: D,
          extend: C,
          isNumber: z,
          pick: t,
          relativeLength: v,
        } = G;
      class c extends y {
        constructor() {
          super(...arguments);
          this.series = this.options = this.labelDistance = void 0;
        }
        getConnectorPath() {
          const a = this.labelPosition,
            c = this.series.options.dataLabels,
            l = this.connectorShapes;
          let h = c.connectorShape;
          l[h] && (h = l[h]);
          return h.call(
            this,
            { x: a.computed.x, y: a.computed.y, alignment: a.alignment },
            a.connectorPosition,
            c
          );
        }
        getTranslate() {
          return this.sliced
            ? this.slicedTranslation
            : { translateX: 0, translateY: 0 };
        }
        haloPath(a) {
          const c = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(
                c.x,
                c.y,
                c.r + a,
                c.r + a,
                {
                  innerR: c.r - 1,
                  start: c.start,
                  end: c.end,
                  borderRadius: c.borderRadius,
                }
              );
        }
        init() {
          super.init.apply(this, arguments);
          this.name = t(this.name, "Slice");
          const a = (a) => {
            this.slice("select" === a.type);
          };
          A(this, "select", a);
          A(this, "unselect", a);
          return this;
        }
        isValid() {
          return z(this.y) && 0 <= this.y;
        }
        setVisible(a, c) {
          const l = this.series,
            h = l.chart,
            n = l.options.ignoreHiddenPoint;
          c = t(c, n);
          a !== this.visible &&
            ((this.visible =
              this.options.visible =
              a =
                "undefined" === typeof a ? !this.visible : a),
            (l.options.data[l.data.indexOf(this)] = this.options),
            ["graphic", "dataLabel", "connector"].forEach((c) => {
              if (this[c]) this[c][a ? "show" : "hide"](a);
            }),
            this.legendItem && h.legend.colorizeItem(this, a),
            a || "hover" !== this.state || this.setState(""),
            n && (l.isDirty = !0),
            c && h.redraw());
        }
        slice(a, c, l) {
          const h = this.series;
          x(l, h.chart);
          t(c, !0);
          this.sliced = this.options.sliced = D(a) ? a : !this.sliced;
          h.options.data[h.data.indexOf(this)] = this.options;
          this.graphic && this.graphic.animate(this.getTranslate());
        }
      }
      C(c.prototype, {
        connectorShapes: {
          fixedOffset: function (a, c, l) {
            const h = c.breakAt;
            c = c.touchingSliceAt;
            return [
              ["M", a.x, a.y],
              l.softConnector
                ? [
                    "C",
                    a.x + ("left" === a.alignment ? -5 : 5),
                    a.y,
                    2 * h.x - c.x,
                    2 * h.y - c.y,
                    h.x,
                    h.y,
                  ]
                : ["L", h.x, h.y],
              ["L", c.x, c.y],
            ];
          },
          straight: function (a, c) {
            c = c.touchingSliceAt;
            return [
              ["M", a.x, a.y],
              ["L", c.x, c.y],
            ];
          },
          crookedLine: function (a, c, l) {
            const { breakAt: h, touchingSliceAt: n } = c;
            ({ series: c } = this);
            const [g, r, t] = c.center,
              x = t / 2,
              e = c.chart.plotWidth,
              m = c.chart.plotLeft;
            c = "left" === a.alignment;
            const { x: u, y: p } = a;
            l.crookDistance
              ? ((a = v(l.crookDistance, 1)),
                (a = c ? g + x + (e + m - g - x) * (1 - a) : m + (g - x) * a))
              : (a = g + (r - p) * Math.tan((this.angle || 0) - Math.PI / 2));
            l = [["M", u, p]];
            (c ? a <= u && a >= h.x : a >= u && a <= h.x) &&
              l.push(["L", a, p]);
            l.push(["L", h.x, h.y], ["L", n.x, n.y]);
            return l;
          },
        },
      });
      return c;
    }
  );
  M(a, "Series/Pie/PieSeriesDefaults.js", [], function () {
    "";
    return {
      borderRadius: 3,
      center: [null, null],
      clip: !1,
      colorByPoint: !0,
      dataLabels: {
        allowOverlap: !0,
        connectorPadding: 5,
        connectorShape: "crookedLine",
        crookDistance: void 0,
        distance: 30,
        enabled: !0,
        formatter: function () {
          return this.point.isNull ? void 0 : this.point.name;
        },
        softConnector: !0,
        x: 0,
      },
      fillColor: void 0,
      ignoreHiddenPoint: !0,
      inactiveOtherPoints: !0,
      legendType: "point",
      marker: null,
      size: null,
      showInLegend: !1,
      slicedOffset: 10,
      stickyTracking: !1,
      tooltip: { followPointer: !0 },
      borderColor: "#ffffff",
      borderWidth: 1,
      lineWidth: void 0,
      states: { hover: { brightness: 0.1 } },
    };
  });
  M(
    a,
    "Series/Pie/PieSeries.js",
    [
      a["Series/CenteredUtilities.js"],
      a["Series/Column/ColumnSeries.js"],
      a["Core/Globals.js"],
      a["Series/Pie/PiePoint.js"],
      a["Series/Pie/PieSeriesDefaults.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/Symbols.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A, D, C, z, t) {
      const { getStartAndEndRadians: v } = a;
      ({ noop: G } = G);
      const {
        clamp: c,
        extend: n,
        fireEvent: r,
        merge: l,
        pick: h,
        relativeLength: q,
      } = t;
      class g extends D {
        constructor() {
          super(...arguments);
          this.points =
            this.options =
            this.maxLabelDistance =
            this.data =
            this.center =
              void 0;
        }
        animate(a) {
          const c = this,
            g = c.points,
            e = c.startAngleRad;
          a ||
            g.forEach(function (a) {
              const g = a.graphic,
                m = a.shapeArgs;
              g &&
                m &&
                (g.attr({
                  r: h(a.startR, c.center && c.center[3] / 2),
                  start: e,
                  end: e,
                }),
                g.animate(
                  { r: m.r, start: m.start, end: m.end },
                  c.options.animation
                ));
            });
        }
        drawEmpty() {
          const a = this.startAngleRad,
            c = this.endAngleRad,
            g = this.options;
          let e, m;
          0 === this.total && this.center
            ? ((e = this.center[0]),
              (m = this.center[1]),
              this.graph ||
                (this.graph = this.chart.renderer
                  .arc(e, m, this.center[1] / 2, 0, a, c)
                  .addClass("highcharts-empty-series")
                  .add(this.group)),
              this.graph.attr({
                d: z.arc(e, m, this.center[2] / 2, 0, {
                  start: a,
                  end: c,
                  innerR: this.center[3] / 2,
                }),
              }),
              this.chart.styledMode ||
                this.graph.attr({
                  "stroke-width": g.borderWidth,
                  fill: g.fillColor || "none",
                  stroke: g.color || "#cccccc",
                }))
            : this.graph && (this.graph = this.graph.destroy());
        }
        drawPoints() {
          const a = this.chart.renderer;
          this.points.forEach(function (c) {
            c.graphic &&
              c.hasNewShapeType() &&
              (c.graphic = c.graphic.destroy());
            c.graphic ||
              ((c.graphic = a[c.shapeType](c.shapeArgs).add(c.series.group)),
              (c.delayedRendering = !0));
          });
        }
        generatePoints() {
          super.generatePoints();
          this.updateTotals();
        }
        getX(a, g, h) {
          const e = this.center,
            m = this.radii ? this.radii[h.index] || 0 : e[2] / 2;
          a = Math.asin(c((a - e[1]) / (m + h.labelDistance), -1, 1));
          return (
            e[0] +
            (g ? -1 : 1) * Math.cos(a) * (m + h.labelDistance) +
            (0 < h.labelDistance
              ? (g ? -1 : 1) * this.options.dataLabels.padding
              : 0)
          );
        }
        hasData() {
          return !!this.processedXData.length;
        }
        redrawPoints() {
          const a = this,
            c = a.chart;
          let g, e, m, h;
          this.drawEmpty();
          a.group && !c.styledMode && a.group.shadow(a.options.shadow);
          a.points.forEach(function (p) {
            const n = {};
            e = p.graphic;
            !p.isNull && e
              ? ((h = p.shapeArgs),
                (g = p.getTranslate()),
                c.styledMode || (m = a.pointAttribs(p, p.selected && "select")),
                p.delayedRendering
                  ? (e.setRadialReference(a.center).attr(h).attr(g),
                    c.styledMode ||
                      e.attr(m).attr({ "stroke-linejoin": "round" }),
                    (p.delayedRendering = !1))
                  : (e.setRadialReference(a.center),
                    c.styledMode || l(!0, n, m),
                    l(!0, n, h, g),
                    e.animate(n)),
                e.attr({ visibility: p.visible ? "inherit" : "hidden" }),
                e.addClass(p.getClassName(), !0))
              : e && (p.graphic = e.destroy());
          });
        }
        sortByAngle(a, c) {
          a.sort(function (a, e) {
            return "undefined" !== typeof a.angle && (e.angle - a.angle) * c;
          });
        }
        translate(a) {
          r(this, "translate");
          this.generatePoints();
          var c = this.options;
          const g = c.slicedOffset,
            e = g + (c.borderWidth || 0);
          var m = v(c.startAngle, c.endAngle);
          const l = (this.startAngleRad = m.start);
          m = (this.endAngleRad = m.end) - l;
          const p = this.points,
            n = c.dataLabels.distance;
          c = c.ignoreHiddenPoint;
          const b = p.length;
          let f,
            d,
            k,
            t = 0;
          a || (this.center = a = this.getCenter());
          for (d = 0; d < b; d++) {
            k = p[d];
            var w = l + t * m;
            !k.isValid() || (c && !k.visible) || (t += k.percentage / 100);
            var x = l + t * m;
            var y = {
              x: a[0],
              y: a[1],
              r: a[2] / 2,
              innerR: a[3] / 2,
              start: Math.round(1e3 * w) / 1e3,
              end: Math.round(1e3 * x) / 1e3,
            };
            k.shapeType = "arc";
            k.shapeArgs = y;
            k.labelDistance = h(
              k.options.dataLabels && k.options.dataLabels.distance,
              n
            );
            k.labelDistance = q(k.labelDistance, y.r);
            this.maxLabelDistance = Math.max(
              this.maxLabelDistance || 0,
              k.labelDistance
            );
            x = (x + w) / 2;
            x > 1.5 * Math.PI
              ? (x -= 2 * Math.PI)
              : x < -Math.PI / 2 && (x += 2 * Math.PI);
            k.slicedTranslation = {
              translateX: Math.round(Math.cos(x) * g),
              translateY: Math.round(Math.sin(x) * g),
            };
            y = (Math.cos(x) * a[2]) / 2;
            f = (Math.sin(x) * a[2]) / 2;
            k.tooltipPos = [a[0] + 0.7 * y, a[1] + 0.7 * f];
            k.half = x < -Math.PI / 2 || x > Math.PI / 2 ? 1 : 0;
            k.angle = x;
            w = Math.min(e, k.labelDistance / 5);
            k.labelPosition = {
              natural: {
                x: a[0] + y + Math.cos(x) * k.labelDistance,
                y: a[1] + f + Math.sin(x) * k.labelDistance,
              },
              computed: {},
              alignment:
                0 > k.labelDistance ? "center" : k.half ? "right" : "left",
              connectorPosition: {
                breakAt: {
                  x: a[0] + y + Math.cos(x) * w,
                  y: a[1] + f + Math.sin(x) * w,
                },
                touchingSliceAt: { x: a[0] + y, y: a[1] + f },
              },
            };
          }
          r(this, "afterTranslate");
        }
        updateTotals() {
          const a = this.points,
            c = a.length,
            g = this.options.ignoreHiddenPoint;
          let e,
            m,
            h = 0;
          for (e = 0; e < c; e++)
            (m = a[e]), !m.isValid() || (g && !m.visible) || (h += m.y);
          this.total = h;
          for (e = 0; e < c; e++)
            (m = a[e]),
              (m.percentage = 0 < h && (m.visible || !g) ? (m.y / h) * 100 : 0),
              (m.total = h);
        }
      }
      g.defaultOptions = l(D.defaultOptions, A);
      n(g.prototype, {
        axisTypes: [],
        directTouch: !0,
        drawGraph: void 0,
        drawTracker: y.prototype.drawTracker,
        getCenter: a.getCenter,
        getSymbol: G,
        isCartesian: !1,
        noSharedTooltip: !0,
        pointAttribs: y.prototype.pointAttribs,
        pointClass: L,
        requireSorting: !1,
        searchPoint: G,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      C.registerSeriesType("pie", g);
      return g;
    }
  );
  M(
    a,
    "Series/Pie/PieDataLabel.js",
    [
      a["Core/Series/DataLabel.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A) {
      const { noop: x } = y,
        { distribute: C } = G,
        { series: z } = L,
        {
          arrayMax: t,
          clamp: v,
          defined: c,
          merge: n,
          pick: r,
          relativeLength: l,
        } = A;
      var h;
      (function (h) {
        function g() {
          const a = this,
            e = a.data,
            g = a.chart,
            h = a.options.dataLabels || {},
            b = h.connectorPadding,
            f = g.plotWidth,
            d = g.plotHeight,
            k = g.plotLeft,
            l = Math.round(g.chartWidth / 3),
            q = a.center,
            w = q[2] / 2,
            v = q[1],
            x = [[], []],
            y = [0, 0, 0, 0],
            F = a.dataLabelPositioners;
          let A, J, D, G, B, L, I, M, R, S, W, ba;
          a.visible &&
            (h.enabled || a._hasPointLabels) &&
            (e.forEach(function (a) {
              a.dataLabel &&
                a.visible &&
                a.dataLabel.shortened &&
                (a.dataLabel
                  .attr({ width: "auto" })
                  .css({ width: "auto", textOverflow: "clip" }),
                (a.dataLabel.shortened = !1));
            }),
            z.prototype.drawDataLabels.apply(a),
            e.forEach(function (a) {
              a.dataLabel &&
                (a.visible
                  ? (x[a.half].push(a),
                    (a.dataLabel._pos = null),
                    !c(h.style.width) &&
                      !c(
                        a.options.dataLabels &&
                          a.options.dataLabels.style &&
                          a.options.dataLabels.style.width
                      ) &&
                      a.dataLabel.getBBox().width > l &&
                      (a.dataLabel.css({ width: Math.round(0.7 * l) + "px" }),
                      (a.dataLabel.shortened = !0)))
                  : ((a.dataLabel = a.dataLabel.destroy()),
                    a.dataLabels &&
                      1 === a.dataLabels.length &&
                      delete a.dataLabels));
            }),
            x.forEach((e, m) => {
              const l = e.length,
                p = [];
              let n,
                u = 0;
              if (l) {
                a.sortByAngle(e, m - 0.5);
                if (0 < a.maxLabelDistance) {
                  var t = Math.max(0, v - w - a.maxLabelDistance);
                  n = Math.min(v + w + a.maxLabelDistance, g.plotHeight);
                  e.forEach(function (a) {
                    0 < a.labelDistance &&
                      a.dataLabel &&
                      ((a.top = Math.max(0, v - w - a.labelDistance)),
                      (a.bottom = Math.min(
                        v + w + a.labelDistance,
                        g.plotHeight
                      )),
                      (u = a.dataLabel.getBBox().height || 21),
                      (a.distributeBox = {
                        target: a.labelPosition.natural.y - a.top + u / 2,
                        size: u,
                        rank: a.y,
                      }),
                      p.push(a.distributeBox));
                  });
                  t = n + u - t;
                  C(p, t, t / 5);
                }
                for (W = 0; W < l; W++) {
                  A = e[W];
                  L = A.labelPosition;
                  G = A.dataLabel;
                  S = !1 === A.visible ? "hidden" : "inherit";
                  R = t = L.natural.y;
                  p &&
                    c(A.distributeBox) &&
                    ("undefined" === typeof A.distributeBox.pos
                      ? (S = "hidden")
                      : ((I = A.distributeBox.size),
                        (R = F.radialDistributionY(A))));
                  delete A.positionIndex;
                  if (h.justify) M = F.justify(A, w, q);
                  else
                    switch (h.alignTo) {
                      case "connectors":
                        M = F.alignToConnectors(e, m, f, k);
                        break;
                      case "plotEdges":
                        M = F.alignToPlotEdges(G, m, f, k);
                        break;
                      default:
                        M = F.radialDistributionX(a, A, R, t);
                    }
                  G._attr = { visibility: S, align: L.alignment };
                  ba = A.options.dataLabels || {};
                  G._pos = {
                    x:
                      M +
                      r(ba.x, h.x) +
                      ({ left: b, right: -b }[L.alignment] || 0),
                    y: R + r(ba.y, h.y) - G.getBBox().height / 2,
                  };
                  L && ((L.computed.x = M), (L.computed.y = R));
                  r(h.crop, !0) &&
                    ((B = G.getBBox().width),
                    (t = null),
                    M - B < b && 1 === m
                      ? ((t = Math.round(B - M + b)),
                        (y[3] = Math.max(t, y[3])))
                      : M + B > f - b &&
                        0 === m &&
                        ((t = Math.round(M + B - f + b)),
                        (y[1] = Math.max(t, y[1]))),
                    0 > R - I / 2
                      ? (y[0] = Math.max(Math.round(-R + I / 2), y[0]))
                      : R + I / 2 > d &&
                        (y[2] = Math.max(Math.round(R + I / 2 - d), y[2])),
                    (G.sideOverflow = t));
                }
              }
            }),
            0 === t(y) || this.verifyDataLabelOverflow(y)) &&
            (this.placeDataLabels(),
            this.points.forEach(function (b) {
              ba = n(h, b.options.dataLabels);
              if ((J = r(ba.connectorWidth, 1))) {
                let d;
                D = b.connector;
                if (
                  (G = b.dataLabel) &&
                  G._pos &&
                  b.visible &&
                  0 < b.labelDistance
                ) {
                  S = G._attr.visibility;
                  if ((d = !D))
                    (b.connector = D =
                      g.renderer
                        .path()
                        .addClass(
                          "highcharts-data-label-connector  highcharts-color-" +
                            b.colorIndex +
                            (b.className ? " " + b.className : "")
                        )
                        .add(a.dataLabelsGroup)),
                      g.styledMode ||
                        D.attr({
                          "stroke-width": J,
                          stroke: ba.connectorColor || b.color || "#666666",
                        });
                  D[d ? "attr" : "animate"]({ d: b.getConnectorPath() });
                  D.attr("visibility", S);
                } else D && (b.connector = D.destroy());
              }
            }));
        }
        function q() {
          this.points.forEach(function (a) {
            let c = a.dataLabel,
              e;
            c &&
              a.visible &&
              ((e = c._pos)
                ? (c.sideOverflow &&
                    ((c._attr.width = Math.max(
                      c.getBBox().width - c.sideOverflow,
                      0
                    )),
                    c.css({
                      width: c._attr.width + "px",
                      textOverflow:
                        (this.options.dataLabels.style || {}).textOverflow ||
                        "ellipsis",
                    }),
                    (c.shortened = !0)),
                  c.attr(c._attr),
                  c[c.moved ? "animate" : "attr"](e),
                  (c.moved = !0))
                : c && c.attr({ y: -9999 }));
            delete a.distributeBox;
          }, this);
        }
        function y(a) {
          let c = this.center,
            e = this.options,
            g = e.center,
            b = e.minSize || 80,
            f,
            d = null !== e.size;
          d ||
            (null !== g[0]
              ? (f = Math.max(c[2] - Math.max(a[1], a[3]), b))
              : ((f = Math.max(c[2] - a[1] - a[3], b)),
                (c[0] += (a[3] - a[1]) / 2)),
            null !== g[1]
              ? (f = v(f, b, c[2] - Math.max(a[0], a[2])))
              : ((f = v(f, b, c[2] - a[0] - a[2])),
                (c[1] += (a[0] - a[2]) / 2)),
            f < c[2]
              ? ((c[2] = f),
                (c[3] = Math.min(
                  e.thickness
                    ? Math.max(0, f - 2 * e.thickness)
                    : Math.max(0, l(e.innerSize || 0, f)),
                  f
                )),
                this.translate(c),
                this.drawDataLabels && this.drawDataLabels())
              : (d = !0));
          return d;
        }
        const F = [],
          e = {
            radialDistributionY: function (a) {
              return a.top + a.distributeBox.pos;
            },
            radialDistributionX: function (a, c, e, g) {
              return a.getX(
                e < c.top + 2 || e > c.bottom - 2 ? g : e,
                c.half,
                c
              );
            },
            justify: function (a, c, e) {
              return e[0] + (a.half ? -1 : 1) * (c + a.labelDistance);
            },
            alignToPlotEdges: function (a, c, e, g) {
              a = a.getBBox().width;
              return c ? a + g : e - a - g;
            },
            alignToConnectors: function (a, c, e, g) {
              let b = 0,
                f;
              a.forEach(function (a) {
                f = a.dataLabel.getBBox().width;
                f > b && (b = f);
              });
              return c ? b + g : e - b - g;
            },
          };
        h.compose = function (c) {
          a.compose(z);
          A.pushUnique(F, c) &&
            ((c = c.prototype),
            (c.dataLabelPositioners = e),
            (c.alignDataLabel = x),
            (c.drawDataLabels = g),
            (c.placeDataLabels = q),
            (c.verifyDataLabelOverflow = y));
        };
      })(h || (h = {}));
      return h;
    }
  );
  M(
    a,
    "Extensions/OverlappingDataLabels.js",
    [a["Core/Chart/Chart.js"], a["Core/Utilities.js"]],
    function (a, y) {
      function x(a, c) {
        let n,
          r = !1;
        a &&
          ((n = a.newOpacity),
          a.oldOpacity !== n &&
            (a.alignAttr && a.placed
              ? (a[n ? "removeClass" : "addClass"](
                  "highcharts-data-label-hidden"
                ),
                (r = !0),
                (a.alignAttr.opacity = n),
                a[a.isOld ? "animate" : "attr"](a.alignAttr, null, function () {
                  c.styledMode || a.css({ pointerEvents: n ? "auto" : "none" });
                }),
                A(c, "afterHideOverlappingLabel"))
              : a.attr({ opacity: n })),
          (a.isOld = !0));
        return r;
      }
      const {
        addEvent: L,
        fireEvent: A,
        isArray: D,
        isNumber: C,
        objectEach: z,
        pick: t,
      } = y;
      L(a, "render", function () {
        let a = this,
          c = [];
        (this.labelCollectors || []).forEach(function (a) {
          c = c.concat(a());
        });
        (this.yAxis || []).forEach(function (a) {
          a.stacking &&
            a.options.stackLabels &&
            !a.options.stackLabels.allowOverlap &&
            z(a.stacking.stacks, function (a) {
              z(a, function (a) {
                a.label && c.push(a.label);
              });
            });
        });
        (this.series || []).forEach(function (n) {
          var r = n.options.dataLabels;
          n.visible &&
            (!1 !== r.enabled || n._hasPointLabels) &&
            ((r = (l) =>
              l.forEach((h) => {
                h.visible &&
                  (D(h.dataLabels)
                    ? h.dataLabels
                    : h.dataLabel
                    ? [h.dataLabel]
                    : []
                  ).forEach(function (l) {
                    const g = l.options;
                    l.labelrank = t(
                      g.labelrank,
                      h.labelrank,
                      h.shapeArgs && h.shapeArgs.height
                    );
                    g.allowOverlap
                      ? ((l.oldOpacity = l.opacity),
                        (l.newOpacity = 1),
                        x(l, a))
                      : c.push(l);
                  });
              })),
            r(n.nodes || []),
            r(n.points));
        });
        this.hideOverlappingLabels(c);
      });
      a.prototype.hideOverlappingLabels = function (a) {
        let c = this,
          n = a.length,
          r = c.renderer;
        var l;
        let h;
        let q,
          g,
          t,
          v = !1;
        var y = function (a) {
          let c, e;
          var g;
          let h = a.box ? 0 : a.padding || 0,
            b = (g = 0),
            f,
            d;
          if (a && (!a.alignAttr || a.placed))
            return (
              (c = a.alignAttr || { x: a.attr("x"), y: a.attr("y") }),
              (e = a.parentGroup),
              a.width ||
                ((g = a.getBBox()),
                (a.width = g.width),
                (a.height = g.height),
                (g = r.fontMetrics(a.element).h)),
              (f = a.width - 2 * h),
              (d = { left: "0", center: "0.5", right: "1" }[a.alignValue])
                ? (b = +d * f)
                : C(a.x) &&
                  Math.round(a.x) !== a.translateX &&
                  (b = a.x - a.translateX),
              {
                x: c.x + (e.translateX || 0) + h - (b || 0),
                y: c.y + (e.translateY || 0) + h - g,
                width: a.width - 2 * h,
                height: a.height - 2 * h,
              }
            );
        };
        for (h = 0; h < n; h++)
          if ((l = a[h]))
            (l.oldOpacity = l.opacity),
              (l.newOpacity = 1),
              (l.absoluteBox = y(l));
        a.sort(function (a, c) {
          return (c.labelrank || 0) - (a.labelrank || 0);
        });
        for (h = 0; h < n; h++)
          for (g = (y = a[h]) && y.absoluteBox, l = h + 1; l < n; ++l)
            (t = (q = a[l]) && q.absoluteBox),
              !g ||
                !t ||
                y === q ||
                0 === y.newOpacity ||
                0 === q.newOpacity ||
                "hidden" === y.visibility ||
                "hidden" === q.visibility ||
                t.x >= g.x + g.width ||
                t.x + t.width <= g.x ||
                t.y >= g.y + g.height ||
                t.y + t.height <= g.y ||
                ((y.labelrank < q.labelrank ? y : q).newOpacity = 0);
        a.forEach(function (a) {
          x(a, c) && (v = !0);
        });
        v && A(c, "afterHideAllOverlappingLabels");
      };
    }
  );
  M(
    a,
    "Extensions/BorderRadius.js",
    [
      a["Core/Defaults.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, G, L, A, D) {
      const { defaultOptions: x } = a;
      ({ seriesTypes: a } = G);
      const {
          addEvent: z,
          extend: t,
          isObject: v,
          merge: c,
          relativeLength: n,
        } = D,
        r = { radius: 0, scope: "stack", where: void 0 },
        l = (a, l) => {
          v(a) || (a = { radius: a || 0 });
          return c(r, l, a);
        };
      if (-1 === L.symbolCustomAttribs.indexOf("borderRadius")) {
        L.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY");
        const c = A.prototype.symbols.arc;
        A.prototype.symbols.arc = function (a, h, l, q, e = {}) {
          a = c(a, h, l, q, e);
          const { innerR: g = 0, r = l, start: p = 0, end: t = 0 } = e;
          if (e.open || !e.borderRadius) return a;
          l = t - p;
          h = Math.sin(l / 2);
          e = Math.max(
            Math.min(
              n(e.borderRadius || 0, r - g),
              (r - g) / 2,
              (r * h) / (1 + h)
            ),
            0
          );
          l = Math.min(e, (l / Math.PI) * 2 * g);
          for (h = a.length - 1; h--; ) {
            {
              let c = void 0,
                g = void 0,
                m = void 0;
              q = a;
              var b = h,
                f = 1 < h ? l : e,
                d = q[b],
                k = q[b + 1];
              "Z" === k[0] && (k = q[0]);
              ("M" !== d[0] && "L" !== d[0]) || "A" !== k[0]
                ? "A" !== d[0] ||
                  ("M" !== k[0] && "L" !== k[0]) ||
                  ((m = k), (g = d))
                : ((m = d), (g = k), (c = !0));
              if (m && g && g.params) {
                d = g[1];
                var x = g[5];
                k = g.params;
                const { start: a, end: e, cx: h, cy: l } = k;
                var w = x ? d - f : d + f;
                const n = w ? Math.asin(f / w) : 0;
                x = x ? n : -n;
                w *= Math.cos(n);
                c
                  ? ((k.start = a + x),
                    (m[1] = h + w * Math.cos(a)),
                    (m[2] = l + w * Math.sin(a)),
                    q.splice(b + 1, 0, [
                      "A",
                      f,
                      f,
                      0,
                      0,
                      1,
                      h + d * Math.cos(k.start),
                      l + d * Math.sin(k.start),
                    ]))
                  : ((k.end = e - x),
                    (g[6] = h + d * Math.cos(k.end)),
                    (g[7] = l + d * Math.sin(k.end)),
                    q.splice(b + 1, 0, [
                      "A",
                      f,
                      f,
                      0,
                      0,
                      1,
                      h + w * Math.cos(e),
                      l + w * Math.sin(e),
                    ]));
                g[4] = Math.abs(k.end - k.start) < Math.PI ? 0 : 1;
              }
            }
          }
          return a;
        };
        const q = A.prototype.symbols.roundedRect;
        A.prototype.symbols.roundedRect = function (a, c, h, l, e = {}) {
          const g = q(a, c, h, l, e),
            { r: n = 0, brBoxHeight: p = l, brBoxY: r = c } = e;
          var b = c - r,
            f = r + p - (c + l);
          e = -0.1 < b - n ? 0 : n;
          const d = -0.1 < f - n ? 0 : n;
          var k = Math.max(e && b, 0);
          const t = Math.max(d && f, 0);
          f = [a + e, c];
          b = [a + h - e, c];
          const x = [a + h, c + e],
            v = [a + h, c + l - d],
            w = [a + h - d, c + l],
            y = [a + d, c + l],
            z = [a, c + l - d],
            A = [a, c + e];
          if (k) {
            const a = Math.sqrt(Math.pow(e, 2) - Math.pow(e - k, 2));
            f[0] -= a;
            b[0] += a;
            x[1] = A[1] = c + e - k;
          }
          l < e - k &&
            ((k = Math.sqrt(Math.pow(e, 2) - Math.pow(e - k - l, 2))),
            (x[0] = v[0] = a + h - e + k),
            (w[0] = Math.min(x[0], w[0])),
            (y[0] = Math.max(v[0], y[0])),
            (z[0] = A[0] = a + e - k),
            (x[1] = A[1] = c + l));
          t &&
            ((k = Math.sqrt(Math.pow(d, 2) - Math.pow(d - t, 2))),
            (w[0] += k),
            (y[0] -= k),
            (v[1] = z[1] = c + l - d + t));
          l < d - t &&
            ((l = Math.sqrt(Math.pow(d, 2) - Math.pow(d - t - l, 2))),
            (x[0] = v[0] = a + h - d + l),
            (b[0] = Math.min(x[0], b[0])),
            (f[0] = Math.max(v[0], f[0])),
            (z[0] = A[0] = a + d - l),
            (v[1] = z[1] = c));
          g.length = 0;
          g.push(
            ["M", ...f],
            ["L", ...b],
            ["A", e, e, 0, 0, 1, ...x],
            ["L", ...v],
            ["A", d, d, 0, 0, 1, ...w],
            ["L", ...y],
            ["A", d, d, 0, 0, 1, ...z],
            ["L", ...A],
            ["A", e, e, 0, 0, 1, ...f],
            ["Z"]
          );
          return g;
        };
        z(a.pie, "afterTranslate", function () {
          const a = l(this.options.borderRadius);
          for (const c of this.points) {
            const g = c.shapeArgs;
            g && (g.borderRadius = n(a.radius, (g.r || 0) - (g.innerR || 0)));
          }
        });
        z(
          y,
          "afterColumnTranslate",
          function () {
            var a, c;
            if (
              this.options.borderRadius &&
              (!this.chart.is3d || !this.chart.is3d())
            ) {
              const { options: g, yAxis: r } = this,
                p = "percent" === g.stacking;
              var h =
                null ===
                  (c =
                    null === (a = x.plotOptions) || void 0 === a
                      ? void 0
                      : a[this.type]) || void 0 === c
                  ? void 0
                  : c.borderRadius;
              a = l(g.borderRadius, v(h) ? h : {});
              c = r.options.reversed;
              for (const l of this.points)
                if (
                  (({ shapeArgs: h } = l), "roundedRect" === l.shapeType && h)
                ) {
                  const { width: b = 0, height: f = 0, y: d = 0 } = h;
                  var q = d,
                    e = f;
                  "stack" === a.scope &&
                    l.stackTotal &&
                    ((q = r.translate(p ? 100 : l.stackTotal, !1, !0, !1, !0)),
                    (e = r.translate(g.threshold || 0, !1, !0, !1, !0)),
                    (e = this.crispCol(0, Math.min(q, e), 0, Math.abs(q - e))),
                    (q = e.y),
                    (e = e.height));
                  const k = -1 === (l.negative ? -1 : 1) * (c ? -1 : 1);
                  let m = a.where;
                  !m &&
                    this.is("waterfall") &&
                    Math.abs(
                      (l.yBottom || 0) - (this.translatedThreshold || 0)
                    ) > this.borderWidth &&
                    (m = "all");
                  m || (m = "end");
                  const u =
                    Math.min(
                      n(a.radius, b),
                      b / 2,
                      "all" === m ? f / 2 : Infinity
                    ) || 0;
                  "end" === m && (k && (q -= u), (e += u));
                  t(h, { brBoxHeight: e, brBoxY: q, r: u });
                }
            }
          },
          { order: 9 }
        );
      }
      y = { optionsToObject: l };
      ("");
      return y;
    }
  );
  M(a, "Core/Responsive.js", [a["Core/Utilities.js"]], function (a) {
    const {
      extend: x,
      find: G,
      isArray: L,
      isObject: A,
      merge: D,
      objectEach: C,
      pick: z,
      splat: t,
      uniqueKey: v,
    } = a;
    var c;
    (function (c) {
      function n(a) {
        function c(a, h, l, n) {
          let e;
          C(a, function (a, f) {
            if (!n && -1 < g.collectionsWithUpdate.indexOf(f) && h[f])
              for (
                a = t(a), l[f] = [], e = 0;
                e < Math.max(a.length, h[f].length);
                e++
              )
                h[f][e] &&
                  (void 0 === a[e]
                    ? (l[f][e] = h[f][e])
                    : ((l[f][e] = {}), c(a[e], h[f][e], l[f][e], n + 1)));
            else
              A(a)
                ? ((l[f] = L(a) ? [] : {}), c(a, h[f] || {}, l[f], n + 1))
                : (l[f] = "undefined" === typeof h[f] ? null : h[f]);
          });
        }
        const g = this,
          h = {};
        c(a, this.options, h, 0);
        return h;
      }
      function l(a, c) {
        const g = a.condition;
        (
          g.callback ||
          function () {
            return (
              this.chartWidth <= z(g.maxWidth, Number.MAX_VALUE) &&
              this.chartHeight <= z(g.maxHeight, Number.MAX_VALUE) &&
              this.chartWidth >= z(g.minWidth, 0) &&
              this.chartHeight >= z(g.minHeight, 0)
            );
          }
        ).call(this) && c.push(a._id);
      }
      function h(a, c) {
        const g = this.options.responsive;
        var h = this.currentResponsive;
        let e = [];
        !c &&
          g &&
          g.rules &&
          g.rules.forEach((a) => {
            "undefined" === typeof a._id && (a._id = v());
            this.matchResponsiveRule(a, e);
          }, this);
        c = D(
          ...e
            .map((a) => G((g || {}).rules || [], (c) => c._id === a))
            .map((a) => a && a.chartOptions)
        );
        c.isResponsiveOptions = !0;
        e = e.toString() || void 0;
        e !== (h && h.ruleIds) &&
          (h && this.update(h.undoOptions, a, !0),
          e
            ? ((h = this.currentOptions(c)),
              (h.isResponsiveOptions = !0),
              (this.currentResponsive = {
                ruleIds: e,
                mergedOptions: c,
                undoOptions: h,
              }),
              this.update(c, a, !0))
            : (this.currentResponsive = void 0));
      }
      const q = [];
      c.compose = function (c) {
        a.pushUnique(q, c) &&
          x(c.prototype, {
            currentOptions: n,
            matchResponsiveRule: l,
            setResponsive: h,
          });
        return c;
      };
    })(c || (c = {}));
    ("");
    ("");
    return c;
  });
  M(
    a,
    "masters/highcharts.src.js",
    [
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
      a["Core/Defaults.js"],
      a["Core/Animation/Fx.js"],
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Renderer/HTML/AST.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Renderer/HTML/HTMLElement.js"],
      a["Core/Renderer/HTML/HTMLRenderer.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Axis/DateTimeAxis.js"],
      a["Core/Axis/LogarithmicAxis.js"],
      a["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
      a["Core/Axis/Tick.js"],
      a["Core/Tooltip.js"],
      a["Core/Series/Point.js"],
      a["Core/Pointer.js"],
      a["Core/Legend/Legend.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Axis/Stacking/StackingAxis.js"],
      a["Core/Axis/Stacking/StackItem.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Series/Column/ColumnSeries.js"],
      a["Series/Column/ColumnDataLabel.js"],
      a["Series/Pie/PieSeries.js"],
      a["Series/Pie/PieDataLabel.js"],
      a["Core/Series/DataLabel.js"],
      a["Core/Responsive.js"],
      a["Core/Color/Color.js"],
      a["Core/Time.js"],
    ],
    function (
      a,
      y,
      G,
      L,
      A,
      D,
      C,
      z,
      t,
      v,
      c,
      n,
      r,
      l,
      h,
      q,
      g,
      w,
      J,
      F,
      e,
      m,
      u,
      p,
      H,
      b,
      f,
      d,
      k,
      M,
      N,
      E,
      S,
      T
    ) {
      a.animate = A.animate;
      a.animObject = A.animObject;
      a.getDeferredAnimation = A.getDeferredAnimation;
      a.setAnimation = A.setAnimation;
      a.stop = A.stop;
      a.timers = L.timers;
      a.AST = D;
      a.Axis = r;
      a.Chart = m;
      a.chart = m.chart;
      a.Fx = L;
      a.Legend = e;
      a.PlotLineOrBand = q;
      a.Point = J;
      a.Pointer = F;
      a.Series = H;
      a.StackItem = p;
      a.SVGElement = t;
      a.SVGRenderer = v;
      a.Tick = g;
      a.Time = T;
      a.Tooltip = w;
      a.Color = S;
      a.color = S.parse;
      n.compose(v);
      c.compose(t);
      F.compose(m);
      e.compose(m);
      a.defaultOptions = G.defaultOptions;
      a.getOptions = G.getOptions;
      a.time = G.defaultTime;
      a.setOptions = G.setOptions;
      a.dateFormat = C.dateFormat;
      a.format = C.format;
      a.numberFormat = C.numberFormat;
      a.addEvent = y.addEvent;
      a.arrayMax = y.arrayMax;
      a.arrayMin = y.arrayMin;
      a.attr = y.attr;
      a.clearTimeout = y.clearTimeout;
      a.correctFloat = y.correctFloat;
      a.createElement = y.createElement;
      a.css = y.css;
      a.defined = y.defined;
      a.destroyObjectProperties = y.destroyObjectProperties;
      a.discardElement = y.discardElement;
      a.distribute = z.distribute;
      a.erase = y.erase;
      a.error = y.error;
      a.extend = y.extend;
      a.extendClass = y.extendClass;
      a.find = y.find;
      a.fireEvent = y.fireEvent;
      a.getMagnitude = y.getMagnitude;
      a.getStyle = y.getStyle;
      a.inArray = y.inArray;
      a.isArray = y.isArray;
      a.isClass = y.isClass;
      a.isDOMElement = y.isDOMElement;
      a.isFunction = y.isFunction;
      a.isNumber = y.isNumber;
      a.isObject = y.isObject;
      a.isString = y.isString;
      a.keys = y.keys;
      a.merge = y.merge;
      a.normalizeTickInterval = y.normalizeTickInterval;
      a.objectEach = y.objectEach;
      a.offset = y.offset;
      a.pad = y.pad;
      a.pick = y.pick;
      a.pInt = y.pInt;
      a.relativeLength = y.relativeLength;
      a.removeEvent = y.removeEvent;
      a.seriesType = b.seriesType;
      a.splat = y.splat;
      a.stableSort = y.stableSort;
      a.syncTimeout = y.syncTimeout;
      a.timeUnits = y.timeUnits;
      a.uniqueKey = y.uniqueKey;
      a.useSerialIds = y.useSerialIds;
      a.wrap = y.wrap;
      d.compose(f);
      N.compose(H);
      l.compose(r);
      h.compose(r);
      M.compose(k);
      q.compose(r);
      E.compose(m);
      u.compose(r, m, H);
      w.compose(F);
      return a;
    }
  );
  a["masters/highcharts.src.js"]._modules = a;
  return a["masters/highcharts.src.js"];
});
//# sourceMappingURL=highcharts.js.map
