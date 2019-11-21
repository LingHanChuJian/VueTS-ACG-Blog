<template lang="pug">
    ul(:class="classes" :style="styles")
        slot
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { WrapClasses, CSSStyles } from '@/types/components'
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
    public mode!: string

    @Prop({ default: 250, type: [Number, String] })
    private width!: number | string

    @Prop({ type: [Number, String] })
    private activeName?: number | string

    @Prop({ default: [], type: Array })
    private openNames!: any[]

    private prefixCls: string = 'menu'

    private currentActiveName?: number | string = this.activeName

    private openedNames: string[] = []

    private get classes(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}`,
            `${this.prefixCls}-${this.mode}`,
        ]
    }

    private get styles(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration>  = {}
        if (this.mode === 'vertical') {
            style.width =  `${this.width}px`
        }
        return style
    }
}
</script>
