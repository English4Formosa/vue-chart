<template lang="pug">
  div(@click="update")
    highlightable(:data="data")
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
