<template lang="pug">
  div(@click="update")
    gradient-circles(:levels="8" v-model="value" color-start="blue" color-end="red")
    liquid-fill-gauge(:value="50")
</template>
<script>
import GradientCircles from './GradientCircles'
import LiquidFillGauge from './LiquidFillGauge'
import DataMixin from '../../DataMixin'

export default {
  mixins: [DataMixin],
  components: {
    GradientCircles,
    LiquidFillGauge
  },
  data () {
    return {
      value: 3
    }
  }
}
</script>
