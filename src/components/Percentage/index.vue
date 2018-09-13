<template lang="pug">
  div(@click="update")
    gradient-circles(:levels="8" v-model="value" color-start="blue" color-end="red")
</template>
<script>
import GradientCircles from './GradientCircles'
import DataMixin from '../../DataMixin'

export default {
  mixins: [DataMixin],
  components: {
    GradientCircles
  },
  data () {
    return {
      value: 3
    }
  }
}
</script>
