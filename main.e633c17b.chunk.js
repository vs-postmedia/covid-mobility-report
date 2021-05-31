(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__(89);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__(239);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__(241);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(242);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(109);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(25);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(66);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(44);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/d3/index.js + 175 modules
var d3 = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/intersection-observer/intersection-observer.js
var intersection_observer = __webpack_require__(245);

// EXTERNAL MODULE: ./node_modules/scrollama/build/scrollama.js
var scrollama = __webpack_require__(125);
var scrollama_default = /*#__PURE__*/__webpack_require__.n(scrollama);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(114);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(246);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(247);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.parse-int.js
var es_parse_int = __webpack_require__(248);

// EXTERNAL MODULE: ./node_modules/d3-time-format/src/defaultLocale.js
var defaultLocale = __webpack_require__(24);

// EXTERNAL MODULE: ./src/js/TooltipTemplate/tooltip-template.css
var tooltip_template = __webpack_require__(251);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(252);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(257);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(259);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(260);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(122);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__(264);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(266);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__(267);

// CONCATENATED MODULE: ./src/js/helper-functions.js











var helper = {
  getUrlParam: function getUrlParam(param) {
    var defaultResult = null;
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var paramValue = urlParams.get(param); // is there a value?

    paramValue = paramValue ? paramValue.toUpperCase() : defaultResult; // check if the province is a value province code

    if (param === 'prov') {
      paramValue = this.validProvinceCodes.includes(paramValue) ? paramValue : 'BC';
    }

    return paramValue;
  },
  map: function map(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  },
  months: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
  numberWithCommas: function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validProvinceCodes: ['YT', 'NT', 'NU', 'BC', 'AB', 'SK', 'MB', 'ON', 'QC', 'NL', 'NB', 'PE', 'NS', 'CA']
};
/* harmony default export */ var helper_functions = (helper);
// CONCATENATED MODULE: ./src/js/TooltipTemplate/tooltip-template.js




var formatTime = defaultLocale["a" /* timeFormat */]('%B %d, %Y');

function tooltip_template_tooltip(data) {
  var template = "\n\t\t<div class=\"tooltip-content\">\n\t\t\t<p class=\"date\">".concat(formatTime(data.date), "</p>\n\t\t\t<p class=\"active\">").concat(helper_functions.numberWithCommas(data.active_cases), " active cases</p>\n\t\t\t<p class=\"recovered\">").concat(helper_functions.numberWithCommas(data.cumulative_recovered), " recovered</p>\n\t\t\t<p class=\"deaths\">").concat(helper_functions.numberWithCommas(data.cumulative_deaths), " deaths</p>\n\t\t</div>\n\t");
  return template;
}

;
/* harmony default export */ var TooltipTemplate_tooltip_template = (tooltip_template_tooltip);
// EXTERNAL MODULE: ./src/js/Chart/chart.css
var chart = __webpack_require__(276);

// CONCATENATED MODULE: ./src/js/Chart/chart.js












 // THE GOOD STUFF

var svg, height, chart_width, xScale, yScale, yScaleBand, yScaleMetric; // const cache = {};

var yTicks = 3;
var opacity = 0.5;
var margin = {
  top: 10,
  right: 5,
  bottom: 25,
  left: 40
};

function handleMouseMove() {
  var bisectDate = d3["c" /* bisector */](function (dataPoint) {
    return dataPoint.date;
  }).left; // get x-value of current mouse position

  var xValue = x.invert(d3["h" /* pointer */](event)[0]); // Get the index of the xValue relative to the dataSet & the datapoints on the left & right of the index

  var dataIndex = bisectDate(dataCache, xValue, 1);
  var leftData = dataCache[dataIndex - 1];
  var rightData = dataCache[dataIndex]; // i dunno, sometimes rightData doesn't work... <shrug>

  if (rightData) {
    // determine if xPos is closer to the left or right data point
    var dataPoint = xValue - leftData.date > rightData.date - xValue ? leftData : rightData; // because we aren't currently showing recoveries... (there's a better way, I know...)
    // d3.select('.highlight-0')
    // 	.style('display', null)
    // 	.attr('transform', `translate(${x(dataPoint.date)}, ${y(parseInt(dataPoint.cumulative_recovered))})`);

    d3["k" /* select */]('.highlight-0').style('display', null).attr('transform', "translate(".concat(x(dataPoint.date), ", ").concat(y(parseInt(dataPoint.active_cases)), ")"));
    d3["k" /* select */]('.highlight-1').style('display', null).attr('transform', "translate(".concat(x(dataPoint.date), ", ").concat(y(parseInt(dataPoint.cumulative_deaths)), ")")); //

    showTooltip(dataPoint);
  }
}

function showTooltip(data) {
  var pageXpadding = 15;
  var content = TooltipTemplate_tooltip_template(data);
  var tooltip = d3["k" /* select */]('.tooltip-container').html(content);
  var width = d3["k" /* select */]('.tooltip-container').style('width'); // tooltip left/right of pointer to keep from getting pushed off screen

  var left = event.pageX > parseInt(width) ? event.pageX - (parseInt(width) + pageXpadding) : event.pageX + pageXpadding;
  d3["k" /* select */]('.tooltip-container').style('display', null).style('top', "".concat(event.pageY - 15, "px")).style('left', "".concat(left, "px"));
}

function handleMouseOut() {
  d3["l" /* selectAll */]('.highlight').style('display', 'none');
  d3["k" /* select */]('.tooltip-container').style('display', 'none');
} // FUNCTIONS 


var drawData = function drawData(svg, metric, i, data, config) {
  // prep variables for chart
  var variable = data.map(function (d) {
    d.value = parseInt(d[metric]);
    return function (_ref) {
      var date = _ref.date,
          value = _ref.value;
      return {
        date: date,
        value: value
      };
    }(d);
  });

  if (metric === 'work') {
    // bars
    svg.append('g').attr('class', 'bar').selectAll('rect').data(variable).join('rect') // .attr('stroke', config.fill_colours[i])
    // .attr('stroke-width', 1)
    .attr('fill', config.fill_colours[i]).attr('x', function (d) {
      return xScale(d.date);
    }).attr('y', function (d) {
      return yScale(0);
    }).attr('height', function (d) {
      return height - margin.top - margin.bottom - yScale(d.value);
    }).attr('width', chart_width / data.length);
  } else {
    // lines for the rest
    svg.append('path').datum(variable).attr('fill', 'none').attr('stroke', config.fill_colours[i]).attr('stroke-width', 2).attr('d', chart_lineGenerator(variable, xScale));
  } // tooltip highlights


  svg.append('g').append('circle').attr('class', "highlight highlight-".concat(i)).attr('r', 5).attr('fill', config.fill_colours[i]).style('display', 'none');
};

var init = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(data, config, el) {
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // console.log(data)
            // cache.el = el;
            // cache.data = data;
            // set height & width
            height = d3["k" /* select */](el).style('height').slice(0, -2) - margin.top - margin.bottom;
            chart_width = d3["k" /* select */](el).style('width').slice(0, -2); // svg

            svg = d3["k" /* select */](el).append('svg').attr('viewBox', [0, 0, chart_width, height]); // axes & gridlines

            setupAxes(data, config.y_scale_metric); // draw data  

            config.chart_variables.forEach(function (metric, i) {
              drawData(svg, metric, i, data, config);
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var chart_lineGenerator = function lineGenerator(data, x) {
  return d3["f" /* line */]().x(function (d) {
    return xScale(d.date);
  }).y(function (d) {
    return yScale(d.value);
  });
};

var setupAxes = function setupAxes(data, metric) {
  yScaleMetric = metric;
  xScale = chart_xSetup(data);
  yScale = chart_ySetup(data); // yScaleBand = yScaleBandSetup(data);

  svg.append('g').call(chart_xAxis);
  svg.append('g').call(chart_yAxis);
  svg.append('g').call(chart_yAxisGridlines);
};

var chart_xAxis = function xAxis(g) {
  g.attr('transform', "translate(0, ".concat(height - margin.bottom, ")")).attr('class', 'x-axis').call(d3["a" /* axisBottom */](xScale).ticks(5).tickSizeOuter(0).tickFormat(d3["m" /* utcFormat */]('%b.')));
};

var chart_yAxis = function yAxis(g) {
  g.attr('transform', "translate(".concat(margin.left, ",0)")).attr('class', 'y-axis').call(d3["b" /* axisLeft */](yScale).ticks(yTicks).tickFormat(function (d) {
    return "".concat(d, "%");
  })).call(function (g) {
    return g.select('.domain').remove();
  }); // remove the line
};

var chart_yAxisGridlines = function yAxisGridlines(g) {
  g.attr('transform', "translate(".concat(margin.left, ",0)")).attr('class', 'gridline').call(d3["b" /* axisLeft */](yScale).ticks(yTicks).tickSize(-chart_width + margin.left + margin.right).tickFormat('')).call(function (g) {
    return g.select('.domain').remove();
  }); // removed the line
};

var chart_xSetup = function xSetup(data) {
  return d3["j" /* scaleUtc */]() // return d3.scaleOrdinal()
  .domain(d3["e" /* extent */](data, function (d) {
    return d.date;
  })).range([margin.left, chart_width - margin.right]);
};

var chart_ySetup = function ySetup(data) {
  return d3["i" /* scaleLinear */]().domain([-100, d3["g" /* max */](data, function (d) {
    return parseInt(d[yScaleMetric]);
  })]).nice().range([height - margin.bottom, margin.top]);
};


// EXTERNAL MODULE: ./src/css/normalize.css
var normalize = __webpack_require__(277);

// EXTERNAL MODULE: ./src/css/postmedia.css
var postmedia = __webpack_require__(278);

// EXTERNAL MODULE: ./src/css/colors.css
var colors = __webpack_require__(279);

// EXTERNAL MODULE: ./src/css/fonts.css
var fonts = __webpack_require__(280);

// EXTERNAL MODULE: ./src/css/main.css
var main = __webpack_require__(281);

// CONCATENATED MODULE: ./src/index.js











// LIBS



 // CSS





 // VARS

var src_container, src_width;
var dataUrl = 'https://gist.githubusercontent.com/njgriffiths/c0a987372baea607f22506e1cd6b4e1c/raw/086fcbd214433e2e2b648ee3df9616bafef95183/covid-mobility.csv';
var src_config = {
  chart_variables: ['work', 'transit', 'driving'],
  fill_colours: ['#A7A9AB', 'steelblue', 'darkred'],
  y_scale_metric: 'driving'
}; // FUNCTIONS

var parseDate = d3["n" /* utcParse */]('%Y-%m-%d');

var addLabel = function addLabel(d, el, group) {
  var label = document.createElement('p');
  label.innerText = d.key;
  label.className = "label ".concat(group);
  el.prepend(label);
};

var src_buildCharts = function buildCharts(data) {
  data // sort data by region name
  .sort(function (a, b) {
    return a.key.toLowerCase().replace(/\s/g, '') > b.key.toLowerCase().replace(/\s/g, '') ? -1 : 1;
  }).forEach(function (d, i) {
    // create the chart element
    var container = document.createElement('div');
    var group = d.key.toLowerCase().replace(' ', '-');
    container.id = "".concat(group);
    container.className = "chart ".concat(d.class_name);
    charts.prepend(container); // add region name

    addLabel(d, container, 'group'); // get chart with

    src_width = container.offsetWidth; // init chart

    init(d.data, src_config, container);
  });
};

var fadeIn = function fadeIn(selectorString) {
  var elements = document.querySelectorAll(selectorString);
  elements.forEach(function (el) {
    el.style.opacity = 1;
    el.className += ' focus';
  });
};

var fadeOut = function fadeOut(selectorString) {
  var elements = document.querySelectorAll(selectorString);
  elements.forEach(function (el) {
    el.style.opacity = 0.5;
    el.classList.remove('focus');
  });
};

var groupBy = function groupBy(array, key) {
  return array.reduce(function (result, x) {
    (result[x[key]] = result[x[key]] || []).push(x);
    return result;
  }, {});
};

var setupScroller = function setupScroller(scroller) {
  // setup the scroller instance, pass callback functions
  scroller.setup({
    offset: 1,
    step: '.step'
  }).onStepEnter(function (resp) {
    // { element, index, direction }
    var index = resp.index;
    var dir = resp.direction;

    if (index >= 0 && dir === 'down' || index > 0 && dir === 'up') {
      // fade  out
      fadeOut('.scrollyteller .chart'); // refocus selected item

      fadeIn(".scrollyteller .f".concat(index + 1));
    } else if (index === 0 && dir === 'up') {
      // fade in
      fadeIn('.scrollyteller .chart');
    } // console.log(index, dir)

  }).onStepExit(function (resp) {
    // { element, index, direction }
    if (resp.index === 2 && resp.direction === 'down') {
      // fade in
      fadeIn('.scrollyteller .chart'); // disable pointer-events

      var overlay = document.querySelectorAll('#charts .overlay');
      overlay.forEach(function (el) {
        el.className += ' no-events';
      });
    } // console.log(resp.index, resp.direction)

  }); // setup resize event

  window.addEventListener('resize', scroller.resize);
};

var transformData = function transformData(data) {
  // group by region
  var grouped = groupBy(data, 'region');
  return Object.keys(grouped).map(function (d) {
    var className = grouped[d][grouped[d].length - 1].driving > 0 ? 'f1' : 'f2';
    className = d === 'Seoul' ? 'f3' : className;
    return {
      key: d,
      class_name: className,
      data: grouped[d].map(function (_ref) {
        var date = _ref.date,
            driving = _ref.driving,
            transit = _ref.transit,
            work = _ref.work;
        return {
          date: date,
          driving: driving,
          transit: transit,
          work: work
        };
      })
    };
  });
}; // Let's kick this off!


var src_init = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
    var scroller, resp, data;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // scrollama!
            scroller = scrollama_default()(); // wrapper el

            src_container = d3["k" /* select */]('charts'); // grab our data

            _context.next = 4;
            return d3["d" /* csv */](dataUrl, function (d) {
              return {
                date: parseDate(d.date),
                // date: d.date,
                region: d.region,
                driving: Math.round(+d.driving_avg * 10) / 10,
                transit: Math.round(+d.transit_stations_avg * 10) / 10,
                work: Math.round(+d.workplaces_avg * 10) / 10
              };
            });

          case 4:
            resp = _context.sent;
            // draw the chart
            data = transformData(resp);
            src_buildCharts(data, '.chart');
            setupScroller(scroller);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref2.apply(this, arguments);
  };
}();

src_init();

/***/ })

},[[282,1,2]]]);