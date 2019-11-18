<template lang="pug">
    ul(:class="classes")
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Menu extends Vue {
    @Prop({
        default: 'vertical',
        type: String,
        validator(value: string) {
            return oneOf(value, ['vertical', 'horizontal'])
        },
    })
    private mode!: string

    private prefixCls: string = 'menu'
}
</script>

<style lang="stylus" scoped>

</style>