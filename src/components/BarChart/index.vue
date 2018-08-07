<template lang="pug">
  div(@click="update")
    horizontal(:data="data")
</template>
<script>
import Horizontal from './Horizontal'
import DataMixin from '../../DataMixin'

export default {
  mixins: [DataMixin],
  components: {
    Horizontal
  }
}
</script>
<style lang="stylus">
  .horizontal-bar-chart
    .bar
      background-color: black
      height: 30px
      margin-top: 10px
    .label
      line-height: 30px
      margin: 10px 10px 0 0
      text-align: right
</style>
