<template lang="pug">
    
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Page extends Vue {
    @Prop({ type: Number, default: 1 })
    private value!: number
}
</script>

<style lang="stylus" scoped>

</style>