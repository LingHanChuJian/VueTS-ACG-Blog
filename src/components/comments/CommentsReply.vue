<template lang="pug">
    
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Reply extends Vue {
    @Prop({ type: String, default: ''})
    private name!: string

}
</script>

<style lang="stylus" scoped>

</style>
