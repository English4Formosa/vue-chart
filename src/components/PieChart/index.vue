<template lang="pug">
  div(@click="update")
    highlightable(:data="data" :width="width" :stroke-color="strokeColor" :fill-color="fillColor" :text-color="textColor")
</template>
<script>
import Highlightable from './Highlightable'
import DataMixin from '../../DataMixin'
export default {
  mixins: [DataMixin],
  components: {
    Highlightable
  }
}
</script>
