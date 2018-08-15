<template lang="pug">
  div.horizontal-bar-chart
    div.labels.text-xs-right(ref="labels")
    div.chart(ref="chart" key="chart" :style="{'border-width': '0 0 ' + this.strokeWidth + 'px ' + this.strokeWidth + 'px'}")
</template>
<script>
/*
  data structure {
    key: Number,String, // key to index data if not specified default to label
    value: Number, // x-axis value
    label: String, // y-axis label
    color: String // color of the bar
  }
*/
import Coloring from '../../mixins/color/Coloring'
let d3 = require('d3/dist/d3')

export default {
  mixins: [Coloring],
  props: {
    data: {
      type: Array,
      required: true
    },
    duration: {
      type: Number,
      default: 1000
    },
    spacing: {
      type: Number,
      default: 10
    },
    height: {
      type: Number,
      default: 30
    }
  },
  data () {
    return {
      initialized: false
    }
  },
  mounted () {
    this.initialize()
    this.update()
    this.initialized = true
  },
  watch: {
    data (to) {
      this.update()
    }
  },
  computed: {
    values () {
      return this.data.map(d => d.value)
    },
    sum () {
      return d3.sum(this.values)
    },
    scale () {
      return d3.scaleLinear().domain([0, this.sum]).range([0, 100])
    }
  },
  methods: {
    width (d) {
      return this.scale(d.value) + '%'
    },
    key (d) {
      return d.key || d.label
    },
    initialize () {
      let labels = d3.select(this.$refs.labels)
        .selectAll('.label')
        .data(this.data, this.key)
      let bars = d3.select(this.$refs.chart)
        .selectAll('.bar')
        .data(this.data, this.key)

      // generate bar
      bars.enter()
        .append('div')
        .attr('class', d => d.class)
        .classed('bar', true)
        .style('background-color', this.fill)
        .style('width', '0')
        .style('height', this.height + 'px')
        .style('margin-top', this.spacing + 'px')
        .transition()
        .duration(this.duration)
        .style('width', this.width.bind(this))

      // generate label
      labels.enter()
        .append('p')
        .attr('class', d => d.class)
        .classed('label', true)
        .text(d => d.label)
        .style('color', this.textColor)
        .style('font-size', this.height * 0.8 + 'px')
        .style('line-height', this.height + 'px')
        .style('margin-top', this.spacing + 'px')
        .style('padding-right', '20px')
    },
    update () {
      let labels = d3.select(this.$refs.labels).selectAll('.label').data(this.data, this.key)
      let bars = d3.select(this.$refs.chart).selectAll('.bar').data(this.data, this.key)

      // chart coloring
      d3.select(this.$refs.chart)
        .transition()
        .duration(this.duration)
        .style('border-color', this.stroke)

      // generate bar
      bars.enter()
        .append('div')
        .classed('bar', true)
        .style('width', '0')
        .style('height', '0')
        .style('margin-top', '0')
      d3.select(this.$refs.chart)
        .selectAll('.bar')
        .data(this.data, this.key)
        .transition()
        .duration(this.duration)
        .style('background-color', this.fill)
        .style('width', this.width.bind(this))
        .style('height', this.height + 'px')
        .style('margin-top', this.spacing + 'px')

      bars.exit()
        .style('height', this.height + 'px')
        .style('margin-top', this.spacing + 'px')
        .transition()
        .duration(this.duration)
        .style('height', '0px')
        .style('margin-top', '0px')
        .style('background-color', 'white')
        .remove()

      // generate label
      labels.enter()
        .append('p')
        .attr('class', this.labelClass)
        .style('line-height', '0')
        .style('font-size', '0')
        .style('line-height', '0')
        .style('color', 'white')
        .classed('label', true)

      d3.select(this.$refs.labels)
        .selectAll('.label')
        .data(this.data, this.key)
        .text(d => d.label)
        .transition()
        .duration(this.duration)
        .style('color', this.textColor)
        .style('font-size', this.height * 0.8 + 'px')
        .style('line-height', this.height + 'px')
        .style('margin-top', this.spacing + 'px')

      labels.exit()
        .style('line-height', this.height + 'px')
        .style('margin-top', this.spacing + 'px')
        .style('font-size', this.height * 0.8 + 'px')
        .transition()
        .duration(this.duration)
        .style('font-size', '0px')
        .style('line-height', '0px')
        .style('margin-top', '0px')
        .style('color', 'white')
        .remove()
    }
  }
}
</script>
<style lang="stylus">
  .horizontal-bar-chart
    position: relative
    width: 100%
    align-items: flex-start
    display: flex
    flex-wrap: nowrap
    flex-direction: row
    padding: 0
    margin: 0
    > *
      display: flex
      position: relative
      flex-direction: column
      > *
        padding: 0
        margin: 0
    .labels
      flex: 0 0 30%
      .label
        display: inline-block
    .chart
      flex: 0 0 70%
      border-style: solid
</style>
