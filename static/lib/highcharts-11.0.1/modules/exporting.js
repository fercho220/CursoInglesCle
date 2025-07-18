/*
 Highcharts JS v11.0.1 (2023-05-08)

 Exporting module

 (c) 2010-2021 Torstein Honsi
 
 License: www.highcharts.com/license
*/
"use strict";
(function (a) {
  "object" === typeof module && module.exports
    ? ((a["default"] = a), (module.exports = a))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/exporting", ["highcharts"], function (e) {
        a(e);
        a.Highcharts = e;
        return a;
      })
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function e(a, l, y, F) {
    a.hasOwnProperty(l) ||
      ((a[l] = F.apply(null, y)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: l, module: a[l] },
          })
        ));
  }
  a = a ? a._modules : {};
  e(a, "Core/Chart/ChartNavigationComposition.js", [], function () {
    var a;
    (function (a) {
      a.compose = function (a) {
        a.navigation || (a.navigation = new b(a));
        return a;
      };
      class b {
        constructor(a) {
          this.updates = [];
          this.chart = a;
        }
        addUpdate(a) {
          this.chart.navigation.updates.push(a);
        }
        update(a, b) {
          this.updates.forEach((A) => {
            A.call(this.chart, a, b);
          });
        }
      }
      a.Additions = b;
    })(a || (a = {}));
    return a;
  });
  e(
    a,
    "Extensions/Exporting/ExportingDefaults.js",
    [a["Core/Globals.js"]],
    function (a) {
      ({ isTouchDevice: a } = a);
      return {
        exporting: {
          allowTableSorting: !0,
          type: "image/png",
          url: "https://export.highcharts.com/",
          pdfFont: {
            normal: void 0,
            bold: void 0,
            bolditalic: void 0,
            italic: void 0,
          },
          printMaxWidth: 780,
          scale: 2,
          buttons: {
            contextButton: {
              className: "highcharts-contextbutton",
              menuClassName: "highcharts-contextmenu",
              symbol: "menu",
              titleKey: "contextButtonTitle",
              menuItems:
                "viewFullscreen printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(
                  " "
                ),
            },
          },
          menuItemDefinitions: {
            viewFullscreen: {
              textKey: "viewFullscreen",
              onclick: function () {
                this.fullscreen && this.fullscreen.toggle();
              },
            },
            printChart: {
              textKey: "printChart",
              onclick: function () {
                this.print();
              },
            },
            separator: { separator: !0 },
            downloadPNG: {
              textKey: "downloadPNG",
              onclick: function () {
                this.exportChart();
              },
            },
            downloadJPEG: {
              textKey: "downloadJPEG",
              onclick: function () {
                this.exportChart({ type: "image/jpeg" });
              },
            },
            downloadPDF: {
              textKey: "downloadPDF",
              onclick: function () {
                this.exportChart({ type: "application/pdf" });
              },
            },
            downloadSVG: {
              textKey: "downloadSVG",
              onclick: function () {
                this.exportChart({ type: "image/svg+xml" });
              },
            },
          },
        },
        lang: {
          viewFullscreen: "View in full screen",
          exitFullscreen: "Exit from full screen",
          printChart: "Print chart",
          downloadPNG: "Download PNG image",
          downloadJPEG: "Download JPEG image",
          downloadPDF: "Download PDF document",
          downloadSVG: "Download SVG vector image",
          contextButtonTitle: "Chart context menu",
        },
        navigation: {
          buttonOptions: {
            symbolSize: 14,
            symbolX: 14.5,
            symbolY: 13.5,
            align: "right",
            buttonSpacing: 3,
            height: 28,
            verticalAlign: "top",
            width: 28,
            symbolFill: "#666666",
            symbolStroke: "#666666",
            symbolStrokeWidth: 3,
            theme: { padding: 5 },
          },
          menuStyle: {
            border: "none",
            borderRadius: "3px",
            background: "#ffffff",
            padding: "0.5em",
          },
          menuItemStyle: {
            background: "none",
            borderRadius: "3px",
            color: "#333333",
            padding: "0.5em",
            fontSize: a ? "0.9em" : "0.8em",
            transition: "background 250ms, color 250ms",
          },
          menuItemHoverStyle: { background: "#f2f2f2" },
        },
      };
    }
  );
  e(a, "Extensions/Exporting/ExportingSymbols.js", [], function () {
    var a;
    (function (a) {
      function b(a, b, g, c) {
        return [
          ["M", a, b + 2.5],
          ["L", a + g, b + 2.5],
          ["M", a, b + c / 2 + 0.5],
          ["L", a + g, b + c / 2 + 0.5],
          ["M", a, b + c - 1.5],
          ["L", a + g, b + c - 1.5],
        ];
      }
      function l(a, b, g, c) {
        a = c / 3 - 2;
        c = [];
        return (c = c.concat(
          this.circle(g - a, b, a, a),
          this.circle(g - a, b + a + 4, a, a),
          this.circle(g - a, b + 2 * (a + 4), a, a)
        ));
      }
      const p = [];
      a.compose = function (a) {
        -1 === p.indexOf(a) &&
          (p.push(a),
          (a = a.prototype.symbols),
          (a.menu = b),
          (a.menuball = l.bind(a)));
      };
    })(a || (a = {}));
    return a;
  });
  e(
    a,
    "Extensions/Exporting/Fullscreen.js",
    [a["Core/Renderer/HTML/AST.js"], a["Core/Utilities.js"]],
    function (a, l) {
      function b() {
        this.fullscreen = new B(this);
      }
      const { addEvent: e, fireEvent: p } = l,
        A = [];
      class B {
        static compose(a) {
          l.pushUnique(A, a) && e(a, "beforeRender", b);
        }
        constructor(a) {
          this.chart = a;
          this.isOpen = !1;
          a = a.renderTo;
          this.browserProps ||
            ("function" === typeof a.requestFullscreen
              ? (this.browserProps = {
                  fullscreenChange: "fullscreenchange",
                  requestFullscreen: "requestFullscreen",
                  exitFullscreen: "exitFullscreen",
                })
              : a.mozRequestFullScreen
              ? (this.browserProps = {
                  fullscreenChange: "mozfullscreenchange",
                  requestFullscreen: "mozRequestFullScreen",
                  exitFullscreen: "mozCancelFullScreen",
                })
              : a.webkitRequestFullScreen
              ? (this.browserProps = {
                  fullscreenChange: "webkitfullscreenchange",
                  requestFullscreen: "webkitRequestFullScreen",
                  exitFullscreen: "webkitExitFullscreen",
                })
              : a.msRequestFullscreen &&
                (this.browserProps = {
                  fullscreenChange: "MSFullscreenChange",
                  requestFullscreen: "msRequestFullscreen",
                  exitFullscreen: "msExitFullscreen",
                }));
        }
        close() {
          const a = this,
            c = a.chart,
            b = c.options.chart;
          p(c, "fullscreenClose", null, function () {
            if (
              a.isOpen &&
              a.browserProps &&
              c.container.ownerDocument instanceof Document
            )
              c.container.ownerDocument[a.browserProps.exitFullscreen]();
            a.unbindFullscreenEvent &&
              (a.unbindFullscreenEvent = a.unbindFullscreenEvent());
            c.setSize(a.origWidth, a.origHeight, !1);
            a.origWidth = void 0;
            a.origHeight = void 0;
            b.width = a.origWidthOption;
            b.height = a.origHeightOption;
            a.origWidthOption = void 0;
            a.origHeightOption = void 0;
            a.isOpen = !1;
            a.setButtonText();
          });
        }
        open() {
          const a = this,
            c = a.chart,
            b = c.options.chart;
          p(c, "fullscreenOpen", null, function () {
            b &&
              ((a.origWidthOption = b.width), (a.origHeightOption = b.height));
            a.origWidth = c.chartWidth;
            a.origHeight = c.chartHeight;
            if (a.browserProps) {
              const b = e(
                  c.container.ownerDocument,
                  a.browserProps.fullscreenChange,
                  function () {
                    a.isOpen
                      ? ((a.isOpen = !1), a.close())
                      : (c.setSize(null, null, !1),
                        (a.isOpen = !0),
                        a.setButtonText());
                  }
                ),
                g = e(c, "destroy", b);
              a.unbindFullscreenEvent = () => {
                b();
                g();
              };
              const m = c.renderTo[a.browserProps.requestFullscreen]();
              if (m)
                m["catch"](function () {
                  alert("Full screen is not supported inside a frame.");
                });
            }
          });
        }
        setButtonText() {
          var b = this.chart,
            c = b.exportDivElements;
          const m = b.options.exporting,
            M = m && m.buttons && m.buttons.contextButton.menuItems;
          b = b.options.lang;
          m &&
            m.menuItemDefinitions &&
            b &&
            b.exitFullscreen &&
            b.viewFullscreen &&
            M &&
            c &&
            (c = c[M.indexOf("viewFullscreen")]) &&
            a.setElementHTML(
              c,
              this.isOpen
                ? b.exitFullscreen
                : m.menuItemDefinitions.viewFullscreen.text || b.viewFullscreen
            );
        }
        toggle() {
          this.isOpen ? this.close() : this.open();
        }
      }
      ("");
      ("");
      return B;
    }
  );
  e(
    a,
    "Core/HttpUtilities.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, e) {
      const { doc: b } = a,
        { createElement: l, discardElement: p, merge: A, objectEach: B } = e,
        g = {
          ajax: function (a) {
            const b = {
                json: "application/json",
                xml: "application/xml",
                text: "text/plain",
                octet: "application/octet-stream",
              },
              c = new XMLHttpRequest();
            if (!a.url) return !1;
            c.open((a.type || "get").toUpperCase(), a.url, !0);
            (a.headers && a.headers["Content-Type"]) ||
              c.setRequestHeader(
                "Content-Type",
                b[a.dataType || "json"] || b.text
              );
            B(a.headers, function (a, b) {
              c.setRequestHeader(b, a);
            });
            a.responseType && (c.responseType = a.responseType);
            c.onreadystatechange = function () {
              let b;
              if (4 === c.readyState) {
                if (200 === c.status) {
                  if (
                    "blob" !== a.responseType &&
                    ((b = c.responseText), "json" === a.dataType)
                  )
                    try {
                      b = JSON.parse(b);
                    } catch (z) {
                      if (z instanceof Error) {
                        a.error && a.error(c, z);
                        return;
                      }
                    }
                  return a.success && a.success(b, c);
                }
                a.error && a.error(c, c.responseText);
              }
            };
            a.data &&
              "string" !== typeof a.data &&
              (a.data = JSON.stringify(a.data));
            c.send(a.data);
          },
          getJSON: function (a, b) {
            g.ajax({
              url: a,
              success: b,
              dataType: "json",
              headers: { "Content-Type": "text/plain" },
            });
          },
          post: function (a, g, e) {
            const c = l(
              "form",
              A(
                { method: "post", action: a, enctype: "multipart/form-data" },
                e
              ),
              { display: "none" },
              b.body
            );
            B(g, function (a, b) {
              l("input", { type: "hidden", name: b, value: a }, void 0, c);
            });
            c.submit();
            p(c);
          },
        };
      ("");
      return g;
    }
  );
  e(
    a,
    "Extensions/Exporting/Exporting.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Chart/ChartNavigationComposition.js"],
      a["Core/Defaults.js"],
      a["Extensions/Exporting/ExportingDefaults.js"],
      a["Extensions/Exporting/ExportingSymbols.js"],
      a["Extensions/Exporting/Fullscreen.js"],
      a["Core/Globals.js"],
      a["Core/HttpUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, e, y, F, p, A, B, g, c, m) {
      const { defaultOptions: b, setOptions: l } = F,
        { doc: z, SVG_NS: R, win: D } = g,
        {
          addEvent: C,
          css: w,
          createElement: G,
          discardElement: N,
          extend: H,
          find: S,
          fireEvent: I,
          isObject: T,
          merge: k,
          objectEach: U,
          pick: q,
          removeEvent: V,
          uniqueKey: W,
        } = m;
      var J;
      (function (e) {
        function F(a) {
          const f = this,
            d = f.renderer,
            b = k(f.options.navigation.buttonOptions, a),
            c = b.onclick,
            E = b.menuItems,
            n = b.symbolSize || 12;
          let x;
          f.btnCount || (f.btnCount = 0);
          f.exportDivElements ||
            ((f.exportDivElements = []), (f.exportSVGElements = []));
          if (!1 !== b.enabled && b.theme) {
            var v = b.theme,
              e;
            f.styledMode ||
              ((v.fill = q(v.fill, "#ffffff")),
              (v.stroke = q(v.stroke, "none")));
            c
              ? (e = function (a) {
                  a && a.stopPropagation();
                  c.call(f, a);
                })
              : E &&
                (e = function (a) {
                  a && a.stopPropagation();
                  f.contextMenu(
                    r.menuClassName,
                    E,
                    r.translateX,
                    r.translateY,
                    r.width,
                    r.height,
                    r
                  );
                  r.setState(2);
                });
            b.text && b.symbol
              ? (v.paddingLeft = q(v.paddingLeft, 30))
              : b.text ||
                H(v, { width: b.width, height: b.height, padding: 0 });
            f.styledMode ||
              ((v["stroke-linecap"] = "round"),
              (v.fill = q(v.fill, "#ffffff")),
              (v.stroke = q(v.stroke, "none")));
            var r = d
              .button(
                b.text,
                0,
                0,
                e,
                v,
                void 0,
                void 0,
                void 0,
                void 0,
                b.useHTML
              )
              .addClass(a.className)
              .attr({
                title: q(f.options.lang[b._titleKey || b.titleKey], ""),
              });
            r.menuClassName =
              a.menuClassName || "highcharts-menu-" + f.btnCount++;
            b.symbol &&
              ((x = d
                .symbol(b.symbol, b.symbolX - n / 2, b.symbolY - n / 2, n, n, {
                  width: n,
                  height: n,
                })
                .addClass("highcharts-button-symbol")
                .attr({ zIndex: 1 })
                .add(r)),
              f.styledMode ||
                x.attr({
                  stroke: b.symbolStroke,
                  fill: b.symbolFill,
                  "stroke-width": b.symbolStrokeWidth || 1,
                }));
            r.add(f.exportingGroup).align(
              H(b, { width: r.width, x: q(b.x, f.buttonOffset) }),
              !0,
              "spacingBox"
            );
            f.buttonOffset +=
              (r.width + b.buttonSpacing) * ("right" === b.align ? -1 : 1);
            f.exportSVGElements.push(r, x);
          }
        }
        function J() {
          if (this.printReverseInfo) {
            var {
              childNodes: a,
              origDisplay: f,
              resetParams: b,
            } = this.printReverseInfo;
            this.moveContainers(this.renderTo);
            [].forEach.call(a, function (a, b) {
              1 === a.nodeType && (a.style.display = f[b] || "");
            });
            this.isPrinting = !1;
            b && this.setSize.apply(this, b);
            delete this.printReverseInfo;
            L = void 0;
            I(this, "afterPrint");
          }
        }
        function M() {
          const a = z.body,
            b = this.options.exporting.printMaxWidth,
            c = {
              childNodes: a.childNodes,
              origDisplay: [],
              resetParams: void 0,
            };
          this.isPrinting = !0;
          this.pointer.reset(null, 0);
          I(this, "beforePrint");
          b &&
            this.chartWidth > b &&
            ((c.resetParams = [this.options.chart.width, void 0, !1]),
            this.setSize(b, void 0, !1));
          [].forEach.call(c.childNodes, function (a, b) {
            1 === a.nodeType &&
              ((c.origDisplay[b] = a.style.display),
              (a.style.display = "none"));
          });
          this.moveContainers(a);
          this.printReverseInfo = c;
        }
        function X(a) {
          a.renderExporting();
          C(a, "redraw", a.renderExporting);
          C(a, "destroy", a.destroyExport);
        }
        function Y(b, f, c, e, g, E, n) {
          const d = this,
            t = d.options.navigation,
            O = d.chartWidth,
            r = d.chartHeight,
            l = "cache-" + b,
            K = Math.max(g, E);
          let u,
            h = d[l];
          h ||
            ((d.exportContextMenu =
              d[l] =
              h =
                G(
                  "div",
                  { className: b },
                  {
                    position: "absolute",
                    zIndex: 1e3,
                    padding: K + "px",
                    pointerEvents: "auto",
                  },
                  d.fixedDiv || d.container
                )),
            (u = G(
              "ul",
              { className: "highcharts-menu" },
              d.styledMode ? {} : { listStyle: "none", margin: 0, padding: 0 },
              h
            )),
            d.styledMode ||
              w(
                u,
                H(
                  {
                    MozBoxShadow: "3px 3px 10px #888",
                    WebkitBoxShadow: "3px 3px 10px #888",
                    boxShadow: "3px 3px 10px #888",
                  },
                  t.menuStyle
                )
              ),
            (h.hideMenu = function () {
              w(h, { display: "none" });
              n && n.setState(0);
              d.openMenu = !1;
              w(d.renderTo, { overflow: "hidden" });
              w(d.container, { overflow: "hidden" });
              m.clearTimeout(h.hideTimer);
              I(d, "exportMenuHidden");
            }),
            d.exportEvents.push(
              C(h, "mouseleave", function () {
                h.hideTimer = D.setTimeout(h.hideMenu, 500);
              }),
              C(h, "mouseenter", function () {
                m.clearTimeout(h.hideTimer);
              }),
              C(z, "mouseup", function (a) {
                d.pointer.inClass(a.target, b) || h.hideMenu();
              }),
              C(h, "click", function () {
                d.openMenu && h.hideMenu();
              })
            ),
            f.forEach(function (b) {
              "string" === typeof b &&
                (b = d.options.exporting.menuItemDefinitions[b]);
              if (T(b, !0)) {
                let f;
                b.separator
                  ? (f = G("hr", void 0, void 0, u))
                  : ("viewData" === b.textKey &&
                      d.isDataTableVisible &&
                      (b.textKey = "hideData"),
                    (f = G(
                      "li",
                      {
                        className: "highcharts-menu-item",
                        onclick: function (a) {
                          a && a.stopPropagation();
                          h.hideMenu();
                          b.onclick && b.onclick.apply(d, arguments);
                        },
                      },
                      void 0,
                      u
                    )),
                    a.setElementHTML(f, b.text || d.options.lang[b.textKey]),
                    d.styledMode ||
                      ((f.onmouseover = function () {
                        w(this, t.menuItemHoverStyle);
                      }),
                      (f.onmouseout = function () {
                        w(this, t.menuItemStyle);
                      }),
                      w(f, H({ cursor: "pointer" }, t.menuItemStyle || {}))));
                d.exportDivElements.push(f);
              }
            }),
            d.exportDivElements.push(u, h),
            (d.exportMenuWidth = h.offsetWidth),
            (d.exportMenuHeight = h.offsetHeight));
          f = { display: "block" };
          c + d.exportMenuWidth > O
            ? (f.right = O - c - g - K + "px")
            : (f.left = c - K + "px");
          e + E + d.exportMenuHeight > r &&
          "top" !== n.alignOptions.verticalAlign
            ? (f.bottom = r - e - K + "px")
            : (f.top = e + E - K + "px");
          w(h, f);
          w(d.renderTo, { overflow: "" });
          w(d.container, { overflow: "" });
          d.openMenu = !0;
          I(d, "exportMenuShown");
        }
        function Z(a) {
          const b = a ? a.target : this,
            d = b.exportSVGElements,
            c = b.exportDivElements;
          a = b.exportEvents;
          let e;
          d &&
            (d.forEach((a, f) => {
              a &&
                ((a.onclick = a.ontouchstart = null),
                (e = "cache-" + a.menuClassName),
                b[e] && delete b[e],
                (d[f] = a.destroy()));
            }),
            (d.length = 0));
          b.exportingGroup &&
            (b.exportingGroup.destroy(), delete b.exportingGroup);
          c &&
            (c.forEach(function (a, b) {
              a &&
                (m.clearTimeout(a.hideTimer),
                V(a, "mouseleave"),
                (c[b] =
                  a.onmouseout =
                  a.onmouseover =
                  a.ontouchstart =
                  a.onclick =
                    null),
                N(a));
            }),
            (c.length = 0));
          a &&
            (a.forEach(function (a) {
              a();
            }),
            (a.length = 0));
        }
        function aa(a, b) {
          b = this.getSVGForExport(a, b);
          a = k(this.options.exporting, a);
          c.post(
            a.url,
            {
              filename: a.filename
                ? a.filename.replace(/\//g, "-")
                : this.getFilename(),
              type: a.type,
              width: a.width,
              scale: a.scale,
              svg: b,
            },
            a.formAttributes
          );
        }
        function ba() {
          this.styledMode && this.inlineStyles();
          return this.container.innerHTML;
        }
        function ca() {
          const a = this.userOptions.title && this.userOptions.title.text;
          let b = this.options.exporting.filename;
          if (b) return b.replace(/\//g, "-");
          "string" === typeof a &&
            (b = a
              .toLowerCase()
              .replace(/<\/?[^>]+(>|$)/g, "")
              .replace(/[\s_]+/g, "-")
              .replace(/[^a-z0-9\-]/g, "")
              .replace(/^[\-]+/g, "")
              .replace(/[\-]+/g, "-")
              .substr(0, 24)
              .replace(/[\-]+$/g, ""));
          if (!b || 5 > b.length) b = "chart";
          return b;
        }
        function da(a) {
          let b,
            d = k(this.options, a);
          d.plotOptions = k(this.userOptions.plotOptions, a && a.plotOptions);
          d.time = k(this.userOptions.time, a && a.time);
          const c = G(
            "div",
            null,
            {
              position: "absolute",
              top: "-9999em",
              width: this.chartWidth + "px",
              height: this.chartHeight + "px",
            },
            z.body
          );
          var e = this.renderTo.style.width;
          var g = this.renderTo.style.height;
          e =
            d.exporting.sourceWidth ||
            d.chart.width ||
            (/px$/.test(e) && parseInt(e, 10)) ||
            (d.isGantt ? 800 : 600);
          g =
            d.exporting.sourceHeight ||
            d.chart.height ||
            (/px$/.test(g) && parseInt(g, 10)) ||
            400;
          H(d.chart, {
            animation: !1,
            renderTo: c,
            forExport: !0,
            renderer: "SVGRenderer",
            width: e,
            height: g,
          });
          d.exporting.enabled = !1;
          delete d.data;
          d.series = [];
          this.series.forEach(function (a) {
            b = k(a.userOptions, {
              animation: !1,
              enableMouseTracking: !1,
              showCheckbox: !1,
              visible: a.visible,
            });
            b.isInternal || d.series.push(b);
          });
          const n = {};
          this.axes.forEach(function (a) {
            a.userOptions.internalKey || (a.userOptions.internalKey = W());
            a.options.isInternal ||
              (n[a.coll] || ((n[a.coll] = !0), (d[a.coll] = [])),
              d[a.coll].push(k(a.userOptions, { visible: a.visible })));
          });
          const x = new this.constructor(d, this.callback);
          a &&
            ["xAxis", "yAxis", "series"].forEach(function (b) {
              const d = {};
              a[b] && ((d[b] = a[b]), x.update(d));
            });
          this.axes.forEach(function (a) {
            const b = S(x.axes, function (b) {
              return b.options.internalKey === a.userOptions.internalKey;
            });
            var d = a.getExtremes();
            const f = d.userMin;
            d = d.userMax;
            b &&
              (("undefined" !== typeof f && f !== b.min) ||
                ("undefined" !== typeof d && d !== b.max)) &&
              b.setExtremes(f, d, !0, !1);
          });
          g = x.getChartHTML();
          I(this, "getSVG", { chartCopy: x });
          g = this.sanitizeSVG(g, d);
          d = null;
          x.destroy();
          N(c);
          return g;
        }
        function ea(a, b) {
          const d = this.options.exporting;
          return this.getSVG(
            k({ chart: { borderRadius: 0 } }, d.chartOptions, b, {
              exporting: {
                sourceWidth: (a && a.sourceWidth) || d.sourceWidth,
                sourceHeight: (a && a.sourceHeight) || d.sourceHeight,
              },
            })
          );
        }
        function fa(a) {
          return a.replace(/([A-Z])/g, function (a, b) {
            return "-" + b.toLowerCase();
          });
        }
        function ha() {
          function a(d) {
            const f = {};
            let e, k;
            if (n && 1 === d.nodeType && -1 === ia.indexOf(d.nodeName)) {
              e = D.getComputedStyle(d, null);
              k =
                "svg" === d.nodeName
                  ? {}
                  : D.getComputedStyle(d.parentNode, null);
              if (!l[d.nodeName]) {
                m = n.getElementsByTagName("svg")[0];
                var t = n.createElementNS(d.namespaceURI, d.nodeName);
                m.appendChild(t);
                var p = D.getComputedStyle(t, null);
                var u = {};
                for (var h in p)
                  "string" !== typeof p[h] ||
                    /^[0-9]+$/.test(h) ||
                    (u[h] = p[h]);
                l[d.nodeName] = u;
                "text" === d.nodeName && delete l.text.fill;
                m.removeChild(t);
              }
              for (const a in e)
                if (
                  g.isFirefox ||
                  g.isMS ||
                  g.isSafari ||
                  Object.hasOwnProperty.call(e, a)
                ) {
                  h = e[a];
                  var q = a;
                  t = p = !1;
                  if (c.length) {
                    for (u = c.length; u-- && !p; ) p = c[u].test(q);
                    t = !p;
                  }
                  "transform" === q && "none" === h && (t = !0);
                  for (u = b.length; u-- && !t; )
                    t = b[u].test(q) || "function" === typeof h;
                  t ||
                    (k[q] === h && "svg" !== d.nodeName) ||
                    l[d.nodeName][q] === h ||
                    (P && -1 === P.indexOf(q)
                      ? (f[q] = h)
                      : h && d.setAttribute(fa(q), h));
                }
              w(d, f);
              "svg" === d.nodeName && d.setAttribute("stroke-width", "1px");
              "text" !== d.nodeName &&
                [].forEach.call(d.children || d.childNodes, a);
            }
          }
          const b = ja,
            c = e.inlineAllowlist,
            l = {};
          let m;
          const k = z.createElement("iframe");
          w(k, { width: "1px", height: "1px", visibility: "hidden" });
          z.body.appendChild(k);
          const n = k.contentWindow && k.contentWindow.document;
          n && n.body.appendChild(n.createElementNS(R, "svg"));
          a(this.container.querySelector("svg"));
          m.parentNode.removeChild(m);
          k.parentNode.removeChild(k);
        }
        function ka(a) {
          (this.fixedDiv
            ? [this.fixedDiv, this.scrollingContainer]
            : [this.container]
          ).forEach(function (b) {
            a.appendChild(b);
          });
        }
        function la() {
          const a = this;
          a.exporting = {
            update: function (b, d) {
              a.isDirtyExporting = !0;
              k(!0, a.options.exporting, b);
              q(d, !0) && a.redraw();
            },
          };
          y.compose(a).navigation.addUpdate((b, d) => {
            a.isDirtyExporting = !0;
            k(!0, a.options.navigation, b);
            q(d, !0) && a.redraw();
          });
        }
        function ma() {
          const a = this;
          a.isPrinting ||
            ((L = a),
            g.isSafari || a.beforePrint(),
            setTimeout(() => {
              D.focus();
              D.print();
              g.isSafari ||
                setTimeout(() => {
                  a.afterPrint();
                }, 1e3);
            }, 1));
        }
        function na() {
          const a = this,
            b = a.options.exporting,
            c = b.buttons,
            e = a.isDirtyExporting || !a.exportSVGElements;
          a.buttonOffset = 0;
          a.isDirtyExporting && a.destroyExport();
          e &&
            !1 !== b.enabled &&
            ((a.exportEvents = []),
            (a.exportingGroup =
              a.exportingGroup ||
              a.renderer.g("exporting-group").attr({ zIndex: 3 }).add()),
            U(c, function (b) {
              a.addButton(b);
            }),
            (a.isDirtyExporting = !1));
        }
        function oa(a, b) {
          const d = a.indexOf("</svg>") + 6;
          let c = a.substr(d);
          a = a.substr(0, d);
          b &&
            b.exporting &&
            b.exporting.allowHTML &&
            c &&
            ((c =
              '<foreignObject x="0" y="0" width="' +
              b.chart.width +
              '" height="' +
              b.chart.height +
              '"><body xmlns="http://www.w3.org/1999/xhtml">' +
              c.replace(/(<(?:img|br).*?(?=>))>/g, "$1 />") +
              "</body></foreignObject>"),
            (a = a.replace("</svg>", c + "</svg>")));
          return (a = a
            .replace(/zIndex="[^"]+"/g, "")
            .replace(/symbolName="[^"]+"/g, "")
            .replace(/jQuery[0-9]+="[^"]+"/g, "")
            .replace(/url\(("|&quot;)(.*?)("|&quot;);?\)/g, "url($2)")
            .replace(/url\([^#]+#/g, "url(#")
            .replace(
              /<svg /,
              '<svg xmlns:xlink="http://www.w3.org/1999/xlink" '
            )
            .replace(/ (|NS[0-9]+:)href=/g, " xlink:href=")
            .replace(/\n/, " ")
            .replace(
              /(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,
              '$1="rgb($2)" $1-opacity="$3"'
            )
            .replace(/&nbsp;/g, "\u00a0")
            .replace(/&shy;/g, "\u00ad"));
        }
        const Q = [],
          ja = [
            /-/,
            /^(clipPath|cssText|d|height|width)$/,
            /^font$/,
            /[lL]ogical(Width|Height)$/,
            /^parentRule$/,
            /perspective/,
            /TapHighlightColor/,
            /^transition/,
            /^length$/,
            /^[0-9]+$/,
          ],
          P =
            "fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(
              " "
            );
        e.inlineAllowlist = [];
        const ia = ["clipPath", "defs", "desc"];
        let L;
        e.compose = function (a, c) {
          A.compose(c);
          B.compose(a);
          m.pushUnique(Q, a) &&
            ((c = a.prototype),
            (c.afterPrint = J),
            (c.exportChart = aa),
            (c.inlineStyles = ha),
            (c.print = ma),
            (c.sanitizeSVG = oa),
            (c.getChartHTML = ba),
            (c.getSVG = da),
            (c.getSVGForExport = ea),
            (c.getFilename = ca),
            (c.moveContainers = ka),
            (c.beforePrint = M),
            (c.contextMenu = Y),
            (c.addButton = F),
            (c.destroyExport = Z),
            (c.renderExporting = na),
            c.callbacks.push(X),
            C(a, "init", la),
            g.isSafari &&
              g.win.matchMedia("print").addListener(function (a) {
                L && (a.matches ? L.beforePrint() : L.afterPrint());
              }));
          m.pushUnique(Q, l) &&
            ((b.exporting = k(p.exporting, b.exporting)),
            (b.lang = k(p.lang, b.lang)),
            (b.navigation = k(p.navigation, b.navigation)));
        };
      })(J || (J = {}));
      ("");
      ("");
      return J;
    }
  );
  e(
    a,
    "masters/modules/exporting.src.js",
    [
      a["Core/Globals.js"],
      a["Extensions/Exporting/Exporting.js"],
      a["Core/HttpUtilities.js"],
    ],
    function (a, e, y) {
      a.HttpUtilities = y;
      a.ajax = y.ajax;
      a.getJSON = y.getJSON;
      a.post = y.post;
      e.compose(a.Chart, a.Renderer);
    }
  );
});
//# sourceMappingURL=exporting.js.map
