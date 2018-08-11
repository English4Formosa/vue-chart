<template lang="pug">
  div(@click="update")
    horizontal(:data="data" :fill="fillColor" :stroke="strokeColor" :text-color="textColor")
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
