<template lang="pug">
    i(:class="wrapClasses" :style="styles" @click="handleClick")
</template>

<script lang="ts">
import { Styles } from '@/types/icon'
import { WrapClasses } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Icon extends Vue {
    @Prop({ type: String })
    private type!: string

    @Prop({ type: [Number, String] })
    private size!: number | string

    @Prop({ type: String })
    private color!: string

    private prefixCls: string = 'icon'

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}`,
            {
                [`${this.prefixCls}-${this.type}`]: this.type !== '',
            },
        ]
    }

    private get styles(): Styles {
        const style: Styles = {}

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