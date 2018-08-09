<template lang="pug">
  svg(ref="svg" :width="width + 'px'" :height="width + 'px'")
</template>
<script>
let d3 = require('d3/dist/d3')

export default {
  props: {
    radius: {
      type: Number,
      default: 200
    },
    width: {
      default: 500
    },
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
      selection: 0
    }
  },
  watch: {
    data () {
      this.update()
    }
  },
  computed: {
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
      this.svg = d3.select(this.$refs.svg)

      this.pie = d3.pie().value(d => {
        return d.value
      })
      this.svg.append('g')
        .attr('class', 'chart')
        .attr('transform', 'translate(' + offset + ',' + offset + ')')
      this.vis = this.svg.select('.chart')
    },
    update () {
      let vis = this.vis
      let offsetArc = this.offsetArc
      let findText = (datum) => {
        // find text with selected datum
        let key = this.key(datum)
        return d3.selectAll('g.text')
          .data(this.pie(this.data))
          .filter(d => this.key(d) === key)
          .node()
      }

      function mouseenter (d) {
        d3.selectAll([this, findText(d)])
          .transition()
          .duration(300)
          .attr('transform', 'translate(' + offsetArc.centroid(d) + ')')
      }
      function mouseout (d) {
        d3.selectAll([this, findText(d)])
          .transition()
          .duration(300)
          .attr('transform', 'translate(0, 0)')
      }

      // exit
      vis.selectAll('g.slice')
        .data(this.pie(this.data), this.key)
        .exit()
        .remove()

      // new
      let enters = vis
        .selectAll('g.slice')
        .data(this.pie(this.data), this.key)
        .enter()
        .insert('g')
        .classed('slice', true)
        .on('mouseenter', mouseenter)
        .on('mouseleave', mouseout)

      // new arcs
      enters
        .append('path')
        .attr('fill', 'white')
        .attr('stroke', 'red')
        .attr('stroke-width', 4)
        .attr('d', this.arc)

      // exit
      vis.selectAll('g.slice')
        .data(this.pie(this.data), this.key)
        .select('path')
        .attr('d', this.arc)

      // text handling
      vis.selectAll('g.text')
        .transition()
        .duration(150)
        .remove()

      setTimeout(() => {
        vis.selectAll('g.text')
          .data(this.pie(this.data), this.key)
          .enter()
          .append('g')
          .classed('text', true)
          .append('text')
          .style('opacity', 0)
          .attr('text-anchor', 'middle')
          .text(d => d.data.label)
          .attr('transform', d => 'translate(' + this.textArc.centroid(d) + ')')
          .transition()
          .duration(150)
          .style('opacity', 1)
      }, 300)
    }
  }
}
</script>
