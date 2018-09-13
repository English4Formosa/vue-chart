<template lang="pug">
  svg(:id="id")
</template>
<script>
import { getId } from '../../../utils/id'
import { loadLiquidFillGauge, liquidFillGaugeDefaultSettings } from './libs'

export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      id: getId(),
      gauge: false
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      var config1 = liquidFillGaugeDefaultSettings()
      config1.circleColor = '#FF7777'
      config1.textColor = '#FF4444'
      config1.waveTextColor = '#FFAAAA'
      config1.waveColor = '#FFDDDD'
      config1.circleThickness = 0.2
      config1.textVertPosition = 0.2
      config1.waveAnimateTime = 1000
      Object.assign(config1, this.$attrs)
      this.gauge = loadLiquidFillGauge(this.id, this.value, config1)
    },
    update () {}
  }
}
</script>
