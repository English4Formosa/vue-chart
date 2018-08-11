<template lang="pug">
  svg(ref="svg" :width="width + 'px'" :height="width + 'px'")
</template>
<script>
import Coloring from '../../mixins/color/Coloring'
let d3 = require('d3/dist/d3')

export default {
  mixins: [Coloring],
  props: {
    width: {
      default: 500
    },
    data: {
      type: Array,
      required: true
    },
    transition: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      selection: 0
    }
  },
  watch: {
    data () {
      this.update()
    },
    width () {
      this.initialize()
      this.update()
    }
  },
  computed: {
    radius () {
      return this.width * 0.8 / 2
    },
    values () {
      return this.data.map(d => d.value)
    }
  },
  mounted () {
    this.initialize()
    this.update()
  },
  methods: {
    key (d) {
      return d.data.key || d.data.label
    },
    initialize () {
      let offset = this.width / 2
      this.arc = d3.arc()
        .outerRadius(this.radius)
        .innerRadius(0)
      this.offsetArc = d3.arc()
        .outerRadius(50)
        .innerRadius(0)
      this.textArc = d3.arc()
        .outerRadius(this.radius)
        .innerRadius(this.radius / 4)

      this.pie = d3.pie().value(d => {
        return d.value
      })
      if (this.svg) {
        this.svg.select('g.chart')
          .attr('class', 'chart')
          .attr('transform', 'translate(' + offset + ',' + offset + ')')
      } else {
        this.svg = d3.select(this.$refs.svg)
        this.svg.append('g')
          .attr('class', 'chart')
          .attr('transform', 'translate(' + offset + ',' + offset + ')')
        this.vis = this.svg.select('.chart')
        this.slices = this.vis.append('g')
          .attr('class', 'slices')
        this.texts = this.vis.append('g')
          .attr('class', 'texts')
      }
    },
    update () {
      let arc = this.arc
      let slices = this.slices
      let texts = this.texts
      let offsetArc = this.offsetArc
      let find = (selector, datum) => {
        // find text with selected datum
        let key = this.key(datum)
        return d3.selectAll(selector)
          .data(this.pie(this.data), this.key)
          .filter(d => this.key(d) === key)
          .node()
      }

      function mouseenter (d) {
        d3.selectAll([find('g.slice', d), find('g.text', d)])
          .transition()
          .duration(300)
          .attr('transform', 'translate(' + offsetArc.centroid(d) + ')')
      }

      function mouseleave (d) {
        d3.selectAll([find('g.slice', d), find('g.text', d)])
          .transition()
          .duration(this.transition)
          .attr('transform', 'translate(0, 0)')
      }
      function arcTween (d) {
        let data = this._data
        let i
        this._data = d
        if (!data) {
          data = Object.assign({}, d)
          data.endAngle = data.startAngle
        }
        i = d3.interpolate(data, d)
        return function (t) {
          return arc(i(t))
        }
      }

      // exit
      slices.selectAll('g.slice')
        .data(this.pie(this.data), this.key)
        .exit()
        .remove()

      // new
      let enters = slices
        .selectAll('g.slice')
        .data(this.pie(this.data), this.key)
        .enter()
        .insert('g')
        .classed('slice', true)
        .on('mouseenter', mouseenter)
        .on('mouseleave', mouseleave)

      // new arcs
      enters
        .append('path')
        .attr('stroke-width', 4)
        .attr('d', this.arc)
        .attr('fill', 'white')

      // exit
      slices.selectAll('g.slice')
        .data(this.pie(this.data), this.key)
        .select('path')
        .attr('stroke', this.stroke)
        .transition()
        .duration(this.transition / 2)
        .attrTween('d', arcTween)
        .attr('fill', this.fill)

      // text handling
      texts.selectAll('g.text')
        .data(this.pie(this.data), this.key)
        .exit()
        .remove()

      texts.selectAll('g.text')
        .data(this.pie(this.data), this.key)
        .enter()
        .append('g')
        .classed('text', true)
        .append('text')
        .style('opacity', 0)
        .attr('text-anchor', 'middle')
        .text(d => d.data.label)
        .on('mouseenter', mouseenter)
        .on('mouseleave', mouseleave)
      texts.selectAll('g.text')
        .data(this.pie(this.data), this.key)
        .select('text')
        .transition()
        .duration(this.transition)
        .attr('fill', this.textColor)
        .attr('transform', d => 'translate(' + this.textArc.centroid(d) + ')')
        .style('opacity', 1)
    }
  }
}
</script>
