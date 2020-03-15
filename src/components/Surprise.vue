<template lang="pug">
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Surprise extends Vue {}
</script>

<style lang="stylus" scoped>
.cat
    width 128px
    height 162px
    position absolute
    display blok
    overflow hidden
    animation cat-action 1.2s steps(6) infinite

@keyframes cat-action
    0%
        background-position 0 0
    
    100%
        background-position 0 -972px
</style>
