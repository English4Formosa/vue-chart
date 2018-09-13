<template lang="pug">
  div.gradient-circles(row ref="root")
</template>
<script>
let d3 = require('d3/dist/d3')

export default {
  props: {
    colorStart: {
      type: String,
      required: true
    },
    colorEnd: {
      type: String,
      required: true
    },
    colorEmpty: {
      type: String,
      default: 'grey'
    },
    value: {
      type: Number,
      required: true
    },
    levels: {
      type: Number,
      default: 10
    },
    radius: {
      type: Number,
      default: 15
    },
    margin: {
      type: Number,
      default: 10
    }
  },
  mounted () {
    this.update()
  },
  watch: {
    $attrs () {
      this.update()
    }
  },
  computed: {
    color () {
      return d3
        .scaleLinear()
        .domain([1, this.levels])
        .interpolate(d3.interpolateRgb)
        .range([this.colorStart, this.colorEnd])
    },
    progress () {
      if (!this.value) {
        return 1
      } else {
        return Math.floor(this.value)
      }
    }
  },
  methods: {
    getColor (d) {
      if (d > this.progress) {
        return this.colorEmpty
      } else {
        return this.color(d)
      }
    },
    update () {
      let size = (this.radius * 2) + 'px'
      let graph = d3
        .select(this.$refs.root)
      let data = new Array(this.levels)
        .fill(1)
        .map((v, index) => index + 1)
      graph
        .selectAll('.circle')
        .data(data)
        .enter()
        .append('div')
        .classed('circle', true)
        .style('width', size)
        .style('height', size)
        .style('border-radius', this.radius + 'px')
        .style('margin-right', this.margin + 'px')

      graph.selectAll('.circle')
        .data(data)
        .exit()
        .remove()

      graph
        .selectAll('.circle')
        .data(data)
        .style('background-color', this.getColor.bind(this))
    }
  }
}
</script>
<style lang="stylus">
  .gradient-circles
    width: 100%
    .circle
      display: inline-block
</style>
