<template lang="pug">
    header(:class="wrapClasses")
        slot
</template>

<script lang="ts">
import { WrapClasses } from '@/types/components'
import AdaptiveMixins from '@/components/mixins/adaptive'
import { Component, Mixins, Vue } from 'vue-property-decorator'

@Component({
    name: 'Header',
})
export default class Header extends Mixins(AdaptiveMixins) {
    private prefixCls: string = 'layout-header'

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            {
                [`${this.prefixCls}-small`]: this.isMediaMatched,
            },
        ]
    }
}
</script>
