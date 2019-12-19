<template lang="pug">
    i(:class="wrapClasses" :style="styles" @click="handleClick")
        slot
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { WrapClasses, IconStyles } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Icon extends Vue {
    @Prop({ type: String })
    private type?: string

    @Prop({ type: [Number, String] })
    private size!: number | string

    @Prop({ type: String })
    private color!: string

    @Prop({ type: String })
    private custom?: string

    @Prop({
        type: String,
        validator(value: string) {
            return oneOf(value, ['lg', 'xs', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'])
        },
    })
    private fixedSize?: string

    @Prop({ type: Boolean, default: false})
    private fixed!: boolean

    private prefixCls: string = 'icon'

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            this.custom ? this.custom : '',
            {
                [`${this.prefixCls}-${this.type}`]: !!this.type,
                [`${this.prefixCls}-${this.fixedSize}`]: !!this.fixedSize,
                [`${this.prefixCls}-fw`]: this.fixed,
            },
        ]
    }

    private get styles(): IconStyles {
        const style: IconStyles = {}

        if (this.size) {
            style['font-size'] = `${this.size}px`
        }

        if (this.color) {
            style.color = this.color
        }

        return style
    }

    private handleClick(event: MouseEvent): void {
        this.$emit('click', event)
    }
}
</script>