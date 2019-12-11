import { CSSStyles } from '@/types/components'
import LinkMixins from '@/components/mixins/link'
import EmitterMixins from '@/components/mixins/emitter'
import { findComponentUpward, findComponentsUpward } from '@/utils'
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MenuMixins extends Mixins(LinkMixins, EmitterMixins) {
    @Prop({ default: false, type: Boolean })
    public disabled!: boolean

    @Prop({ required: true, type: [Number, String] })
    public name!: number | string

    public menu: Vue = findComponentUpward(this, 'Menu')

    public get hasParentSubMenu(): boolean {
        return !!findComponentUpward(this, 'SubMenu')
    }

    public get parentSubMenuNum(): number {
        return findComponentsUpward(this, 'SubMenu').length
    }

    public get mode(): string {
        return (this.menu as Vue & { mode: string }).mode
    }

    public get liStyle(): CSSStyles<CSSStyleDeclaration> {
        return this.hasParentSubMenu && this.mode !== 'horizontal' ? { paddingLeft: 43 + (this.parentSubMenuNum - 1) * 24 + 'px' } : {}
    }

    public handleClickItem(event: Event, isNewWindow: boolean = false): void {
        if (this.disabled) { return }

        if (isNewWindow || this.target === '_blank') {
            this.handleCheckClick(event, isNewWindow)
            const parentMenu = findComponentUpward(this, 'Menu')
            if (parentMenu) {
                (parentMenu as Vue & { handleEmitSelectEvent: (name?: number | string) => void }).handleEmitSelectEvent(this.name)
            }
        } else {
            const parent = findComponentUpward(this, 'SubMenu')
            parent ? this.dispatch('SubMenu', 'on-menu-item-select', this.name) : this.dispatch('Menu', 'on-menu-item-select', this.name)
            this.handleCheckClick(event, isNewWindow)
        }
    }
}
