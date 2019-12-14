<template lang="pug">
  div#app
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>

<style lang="stylus">
#app
  position relative
  height 100%
.scroll
  width 1000px
  height 1000px
  border 1px soild red
</style>
