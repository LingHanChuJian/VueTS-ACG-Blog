<template lang="pug">
    ul(:class="classes" :style="styles")
        slot
</template>

<script lang="ts">
import SubMenu from '@/components/menu/SubMenu.vue'
import { oneOf, findComponentsDownward } from '@/utils'
import EmitterMixins from '@/components/mixins/emitter'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Mixins, Watch, Vue } from 'vue-property-decorator'

@Component({
    name: 'Menu',
})
export default class Menu extends Mixins(EmitterMixins) {
    @Prop({
        type: String,
        default: 'vertical',
        validator(value: string) {
            return oneOf(value, ['vertical', 'horizontal'])
        },
    })
    public mode!: string

    @Prop({ type: [Number, String], default: 250 })
    private width!: number | string

    @Prop({ type: [Number, String] })
    private activeName?: number | string = undefined

    @Prop({ type: Array, default() { return [] } })
    private openNames!: Array<number | string>

    private prefixCls: string = 'menu'

    private currentActiveName?: number | string = this.activeName

    private openedNames: Array<number | string> = []

    public updateOpenKeys(name: number | string): void {
        const names: Array<number | string> = [...this.openedNames]
        // findComponentsDownward(this, 'SubMenu').forEach((item) => {
        //     if ((item as Vue & { name: number | string }).name === name) {
        //         (item as Vue & { opened: boolean }).opened = names.indexOf(name) === -1
        //     }
        // })
        const openedNames: Array<number | string> = findComponentsDownward(this, 'SubMenu').filter((item) => (item as Vue & { opened: boolean }).opened).map((item) => (item as Vue & { name: number | string }).name)
        this.openedNames = [...openedNames]
        this.$emit('on-open-change', openedNames)
    }

    public updateActiveName(): void {
        this.broadcast('SubMenu', 'on-update-active-name', false)
        this.broadcast('MenuItem', 'on-update-active-name', this.currentActiveName || -1)
    }

    private handleEmitSelectEvent(name: string) {
        this.$emit('on-select', name)
    }

    private updateOpened() {
        (findComponentsDownward(this, 'SubMenu') as SubMenu[]).forEach((item) => { item.opened = this.openedNames.indexOf(item.name) > -1 ? true : false })
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

    @Watch('openNames')
    private onOpenNamesChange(newValue: Array<number | string>) {
        this.openNames = newValue
    }

    @Watch('activeName')
    private onActiveNameChange(newValue: number | string) {
        this.currentActiveName = newValue
    }

    @Watch('currentActiveName')
    private onCurrentActiveNameChange() {
        this.updateActiveName()
    }

    private mounted() {
        this.openedNames = [...this.openNames]
        this.updateOpened()
        this.$nextTick(() => this.updateActiveName())
        this.$on('on-menu-item-select', (name: number | string) => {
            this.currentActiveName = name
            this.$emit('on-select', name)
        })
    }
}
</script>
