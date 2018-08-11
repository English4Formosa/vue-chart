<template lang="pug">
  div(@click="update")
    highlightable(:data="data" :width="width" :stroke="strokeColor" :fill="fillColor" :text-color="textColor" :highlights="highlights")
</template>
<script>
import Highlightable from './Highlightable'
import DataMixin from '../../DataMixin'
export default {
  mixins: [DataMixin],
  data () {
    return {
      highlights: new Set(['label 2'])
    }
  },
  components: {
    Highlightable
  }
}
</script>
