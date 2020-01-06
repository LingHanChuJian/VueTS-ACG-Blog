<template lang="pug">
    pre(:class="wrapClasses")
        code(:id="uuid" :data-lang="lang.toUpperCase()" v-text="isSlot ? '' : content")
            slot(name="content")
        Icon.amplification-code(type="expand" title="放大")
        Icon.copy-code(type="clone" :data-clipboard-target="'#' + uuid" title="复制代码")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import UUID from '@/components/mixins/uuid'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class Code extends Mixins(UUID) {
    @Prop({ type: String, default: '' })
    private lang!: string

    @Prop({ type: String, default: '' })
    private content!: string

    private prefixCls: string = 'code'

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-pre`,
        ]
    }

    private get isSlot(): boolean {
        return !!this.$slots.content
    }
}
</script>

<style lang="stylus" scoped>

</style>