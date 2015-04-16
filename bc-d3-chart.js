/*
  Javascript for the bc-d3-chart web component

  Broken out for clarity and to support code climate
*/

Polymer({

  /**
   * The `debug` attribute is just a flag to reflect a debugging mode.
   *
   * @attribute debug
   * @type bool
   * @default false
   */
  debug: false,

  /**
   * The `data` attribute is the array of data passed to the chart.
   * data is assumed to be of the format [{xval: , yVal: }...]
   *
   * @attribute data
   * @type array
   */
  data: null,
  /**
   * The `domain` attribute is the data domain to display in the chart.
   *
   * @attribute domain
   * @type array
   */
  domain: null,
  /**
   * The `height` attribute is the height of the chart in pixels.
   *
   * @attribute height
   * @type int
   */
  height: 80,
  /**
   * The `width` attribute is the width of the chart in pixels.
   *
   * @attribute width
   * @type int
   */
  width: 120,
  /**
   * The `centerline` attribute is a flag indicating that the chart should
   * have a line drawn down the center
   *
   * @attribute centerline
   * @type bool
   */
  centerline: false,
  /**
   * The `yAxisWidth` is a property used prepare for a y-axis (pixels)
   *
   * @property yAxisWidth
   * @type int
   */
  yAxisWidth: 0,
  /**
   * The `xAxisWidth` is a property used prepare for a x-axis (pixels)
   *
   * @property xAxisWidth
   * @type int
   */
  xAxisWidth: 0,
  /**
   * The `paddingTop` indicates how many pixels to keep between the chart
   * area and the top boundary of the chart
   *
   * @property paddingTop
   * @type int
   */
  paddingTop: 0,
  /**
   * The `paddingBottom` indicates how many pixels to keep between the chart
   * area and the bottom boundary of the chart
   *
   * @property paddingBottom
   * @type int
   */
  paddingBottom: 0,
  /**
   * The `xScale` propety is a d3 scale calculated from the domain and
   * size of the chart
   *
   * @property xScale
   * @type d3.scale
   */
  xScale: null,
  /**
   * The `xScale` propety is a d3 scale calculated from the domain and
   * size of the chart
   *
   * @property yScale
   * @type d3.scale
   */
  yScale: null,
  /**
   * The `d3SVGChart` provides access to the chart svg
   *
   * @property d3SVGChart
   * @type svg object
   */
   d3SVGChart: null,

  ready: function() {
    this.log("READY!");
    this.style.height = this.height + "px";
    this.d3SVGChart = d3.select(this.$.chart);
  },

  /**
   * The `clearGraph` method does no work at this time. Extend it.
   *
   * @method clearGraph
   * @return {Object} Returns undefined.
   */
  clearGraph: function() {
    this.log("Not implemented: this.clearGraph()");
  },

  /**
   * The `createGraph` method does no work at this time. Extend it.
   *
   * @method createGraph
   * @return {Object} Returns undefined.
   */
  createGraph: function() {
    this.log("Not implemented: this.createGraph()");
  },

  /**
   * The `drawCenterLine` method adds a line down the middle of the chart.
   *
   * @method drawCenterLine
   * @return {Object} Returns undefined.
   */
  drawCenterLine: function() {
    if(this.centerline) {
    this.d3SVGChart.append("svg:line")
      .attr("class", "centerline")
      .attr("x1", (this.width - this.yAxisWidth) / 2 + this.yAxisWidth)
      .attr("y1", 0)
      .attr("x2", (this.width - this.yAxisWidth) / 2 + this.yAxisWidth)
      .attr("y2", this.height);
    }
  },

  /**
   * The `updateCenterLine` method adds a line down the middle of the chart.
   *
   * @method updateCenterLine
   * @return {Object} Returns undefined.
   */
  updateCenterLine: function() {
    if(this.centerline) {
      this.clearCenterLine();
      this.drawCenterLine();
    }
  },

  /**
   * The `clearCenterLine` method removes the centerline from the chart.
   *
   * @method clearCenterLine
   * @return {Object} Returns undefined.
   */
  clearCenterLine: function() {
    this.d3SVGChart.selectAll(".centerline").remove();
  },

  /**
   * The `getXDomain` establishes the x-domain of the data from the data
   * itself, only if the domain attribute is undefined
   *
   * @method getXDomain
   * @return {Object} Returns undefined.
   */
  getXDomain: function() {
    if(this.domain == undefined) {
      return d3.extent(this.data, function(d) { return d.xVal; });
    }
    else {
      return this.domain;
    }
  },

  /**
   * The `getYDomain` establishes the y-domain of the data from the data
   * itself
   *
   * @method getYDomain
   * @return {Object} Returns undefined.
   */
  getYDomain: function() {
    return [
        d3.min(this.data, function(d) { return d.yVal; }),
        d3.max(this.data, function(d) { return d.yVal; })
      ];
  },

  /**
   * The `updateScales` sets x and y scales based on the domain and size
   *
   * @method updateScales
   * @return {Object} Returns undefined.
   */
  updateScales: function() {
    // @todo: memory management (can I avoid recreating?)
    this.updateXScale();
    this.updateYScale();
  },

  /**
   * The `updateXScale` sets xScale property based on the domain and size
   *
   * @method updateXScale
   * @return {Object} Returns undefined.
   */
  updateXScale: function() {
    this.xScale = d3.time.scale()
      .range([this.yAxisWidth, this.width])
      .domain(this.getXDomain());
  },

  /**
   * The `updateYScale` sets yScale property based on the domain and size
   *
   * @method updateYScale
   * @return {Object} Returns undefined.
   */
  updateYScale: function() {
    this.yScale = d3.scale.linear()
      .range([this.height - this.paddingBottom - this.xAxisWidth,0 + this.paddingTop])
      .domain(this.getYDomain());
  },

  /**
   * The `updateGraph` method does no work at this time. Extend it.
   *
   * @method updateGraph
   * @return {Object} Returns undefined.
   */
  updateGraph: function() {
    if(this.debug) {
      this.log("Not implemented: this.updateGraph()");
    }
  },

  /**
   * The `dataChanged` observes the data attribute and updates the chart
   *
   * @method dataChanged
   * @return {Object} Returns undefined.
   */
  dataChanged: function() {
    this.log("data changed!");
    this.log(this.data);
    this.clearGraph();
    // this.updateScales(); you should use this in your children
    this.createGraph();
  },

  /**
   * The `log` method is a handy logging tool for debugging elements.
   * all elements can keep log() methods that will only run when debugging.
   *
   * @method log
   * @return prints to the console (if it exists)
   * @logTxt {String} the string to be sent to the console
   */
  log: function(logTxt) {
    // A quick console.log tool
    if (this.debug && typeof console == "object") {
      console.log("[" + this.tagName + "] " + logTxt);
    }
  },

  /**
   * The `centerlineChanged` observes the centerline attribute and redraws
   *
   * @method centerlineChanged
   * @return {Object} Returns undefined.
   */
  centerlineChanged: function() {
    if(this.centerline) {
      this.updateGraph();
    }
    else {
      this.clearCenterLine();
    }
  },

  /**
   * The `widthChanged` observes the width attribute and updates the chart
   *
   * @method widthChanged
   * @return {Object} Returns undefined.
   */
  widthChanged: function() {
    this.log("WIDTH CHANGED:" + this.width);
    this.updateGraph();
    if(this.centerline) {
      this.d3SVGChart.selectAll(".centerline")
        .attr("x1", this.width / 2)
        .attr("x2", this.width / 2);
    }
  },

  /**
   * The `heightChanged` observes the height attribute and updates the chart
   *
   * @method heightChanged
   * @return {Object} Returns undefined.
   */
  heightChanged: function() {
    this.log("HEIGHT CHANGED: " + this.height);
    this.style.height = this.height + "px";
    this.updateGraph();
    if(this.centerline) {
      this.d3SVGChart.selectAll(".centerline")
        .attr("y2", this.height);
    }
  },

  /**
   * The `domainChanged` observes the domain attribute and updates the chart
   *
   * @method domainChanged
   * @return {Object} Returns undefined.
   */
  domainChanged: function() {
    this.log("Domain Changed: ");
    this.log(this.domain);
    this.updateGraph();
  }
});
