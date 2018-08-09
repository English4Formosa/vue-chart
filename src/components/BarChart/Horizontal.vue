<template lang="pug">
  div.horizontal-bar-chart
    div.labels(ref="labels")
    div.chart(ref="chart" key="chart")
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
let d3 = require('d3/dist/d3')

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      initialized: false
    }
  },
  mounted () {
    this.initialize()
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
      let labels = d3.select(this.$refs.labels).selectAll('.label').data(this.data, this.key)
      let bars = d3.select(this.$refs.chart).selectAll('.bar').data(this.data, this.key)

      // generate bar
      bars.enter()
        .append('div')
        .attr('class', d => d.class)
        .classed('bar', true)
        .style('width', '0')
        .transition()
        .duration(this.duration)
        .style('width', this.width.bind(this))

      // generate label
      labels.enter()
        .append('p')
        .attr('class', d => d.class)
        .classed('label', true)
        .text(d => d.label)
    },
    update () {
      let labels = d3.select(this.$refs.labels).selectAll('.label').data(this.data, this.key)
      let bars = d3.select(this.$refs.chart).selectAll('.bar').data(this.data, this.key)

      // generate bar
      bars
        .transition()
        .duration(this.duration)
        .style('width', this.width.bind(this))
      bars.enter()
        .append('div')
        .attr('class', this.barClass)
        .classed('bar', true)
        .style('width', '0')
        .transition()
        .duration(this.duration)
        .style('width', this.width.bind(this))
      bars.exit()
        .remove()

      // generate label
      labels.enter()
        .append('p')
        .attr('class', this.labelClass)
        .classed('label', true)
        .text(d => d.label)
        .transition()
        .duration(this.duration / 4)

      labels.exit()
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
    .labels
      flex: 0 0 30%
      .label
        display: inline-block
    .chart
      flex: 0 0 70%
      border-style: solid
      border-width: 0px 0px 3px 3px
      border-color: black
</style>
