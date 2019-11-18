<template lang="pug">
    header(:class="wrapClasses")
        slot
</template>

<script lang="ts">
import { WrapClasses } from '@/types/components'
import Adaptive from '@/components/mixins/adaptive'
import { Component, Mixins, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Mixins(Adaptive) {
    private prefixCls: string = 'layout-header'

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}`,
            {
                [`${this.prefixCls}-small`]: this.isMediaMatched,
            },
        ]
    }
}
</script>
