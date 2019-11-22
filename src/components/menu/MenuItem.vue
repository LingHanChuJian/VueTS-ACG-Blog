<template lang="pug">
    a(
        v-if="to"
        :href="linkUrl"
        :target="target"
        :class="classes"
        :style="itemStyle"
        @click.exact="handleClickItem(event, false)"
        @click.ctrl="handleClickItem(event, true)"
        @click.meta="handleClickItem(event, true)"
    )
</template>

<script lang="ts">
import { findComponentUpward } from '@/utils'
import LinkMixins from '@/components/mixins/link'
import MenuMixins from '@/components/mixins/menu'
import EmitterMixins from '@/components/mixins/emitter'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component
export default class MenuItem extends Mixins(EmitterMixins, LinkMixins, MenuMixins) {
    @Prop({ default: false, type: Boolean })
    private disabled!: boolean

    @Prop({ required: true, type: [Number, String] })
    private name?: number | string

    private prefixCls: string = 'menu-item'

    private isActive: boolean = false

    private handleClickItem(event: Event, isNewWindow: boolean = false): void {
        if (this.disabled) { return }

        if (isNewWindow || this.target === '_blank') {
            this.handleCheckClick(event, isNewWindow)

            const parentMenu = findComponentUpward(this, 'Menu')
            if (parentMenu) {
                (parentMenu as Vue & { handleEmitSelectEvent: (name?: number | string) => void }).handleEmitSelectEvent(this.name)
            }
        } else {
            const parent = findComponentUpward(this, 'SubMenu')
            if (parent) {
                this.dispatch('SubMenu', 'on-menu-item-select', this.name)
            } else {
                this.dispatch('Menu', 'on-menu-item-select', this.name)
            }

            this.handleCheckClick(event, isNewWindow)
        }
    }

    private get classes(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            {
                [`${this.prefixCls}-active`]: this.isActive,
                [`${this.prefixCls}-selected`]: this.isActive,
                [`${this.prefixCls}-disabled`]: this.disabled,
            },
        ]
    }

    private get itemStyle(): CSSStyles<CSSStyleDeclaration> {
        return this.hasParentSubMenu && this.mode !== 'horizontal' ? { paddingLeft: 43 + (this.parentSubMenuNum - 1) * 24 + 'px' } : {}
    }
}
</script>