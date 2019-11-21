<template lang="pug">
    footer(:class="wrapClasses")
        slot
</template>

<script lang="ts">
import { WrapClasses } from '@/types/components';
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
    private prefixCls: string = 'layout-footer'

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }
}
</script>

<style lang="stylus" scoped>

</style>