<template lang="pug">
    ul(:class="classes" :style="styles")
        slot
</template>

<script lang="ts">
import { oneOf, findComponentsDownward } from '@/utils'
import EmitterMixins from '@/components/mixins/emitter'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component
export default class Menu extends Mixins(EmitterMixins) {
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

    @Prop({ default() { return [] }, type: Array })
    private openNames!: Array<number | string>

    private prefixCls: string = 'menu'

    private currentActiveName?: number | string = this.activeName

    private openedNames: Array<number | string> = []

    public updateOpenKeys(name: number | string): void {
        const names: Array<number | string> = [...this.openedNames]
        findComponentsDownward(this, 'SubMenu').forEach((item) => {
            if ((item as Vue & { name: number | string }).name === name) { (item as Vue & { opened: boolean }).opened = names.indexOf(name) > -1 ? false : true }
        })
        const openedNames: Array<number | string> = findComponentsDownward(this, 'SubMenu').filter((item) => (item as Vue & { opened: boolean }).opened).map((item) => (item as Vue & { name: number | string }).name)
        this.openedNames = [...openedNames]
        this.$emit('on-open-change', openedNames)
    }

    private handleEmitSelectEvent(name: string) {
        this.$emit('on-select', name)
    }

    private updateActiveName(): void {
        if (this.currentActiveName === undefined) {
            this.currentActiveName = -1
        }

        this.broadcast('SubMenu', 'on-update-active-name', false)
        this.broadcast('MenuItem', 'on-update-active-name', this.currentActiveName)
    }

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

    private mounted() {
        this.$on('on-menu-item-select', (name: number | string) => {
            this.currentActiveName = name
            this.$emit('on-select', name)
        })
    }
}
</script>
