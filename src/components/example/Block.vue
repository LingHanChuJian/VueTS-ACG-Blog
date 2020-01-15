<template lang="pug">
    pre(:class="wrapClasses")
        code(:id="uuid" :class="codeWrapClasses" :data-lang="lang.toUpperCase()" v-text="isSlot ? '' : content")
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
export default class Block extends Mixins(UUID) {
    @Prop({ type: String, default: '' })
    private lang!: string

    @Prop({ type: String, default: '' })
    private content!: string

    @Prop({ type: [String, Array], default() { return [] } })
    private custom!: string | string[]

    private prefixCls: string = 'block'

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-pre`,
        ]
    }

    private get codeWrapClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-code`,
            Array.isArray(this.custom) ? this.custom.join(',') : this.custom,
        ]
    }

    private get isSlot(): boolean {
        return !!this.$slots.content
    }
}
</script>

<style lang="stylus" scoped>

</style>