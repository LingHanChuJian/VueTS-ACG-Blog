<template lang="pug">
    div(:class="[prefixCls + '-wrap']")
        
</template>

<script lang="ts">
import { reward } from '@/config'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Feed extends Vue {
    private prefixCls: string = 'feed'
}
</script>

<style lang="stylus" scoped>

</style>
