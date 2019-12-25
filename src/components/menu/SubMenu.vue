<template lang="pug">
    a(
        v-if="to"
        :href="linkUrl"
        :target="target"
        :class="classes"
        @click.exact="handleClickItem(event, false)"
        @click.ctrl="handleClickItem(event, true)"
        @click.meta="handleClickItem(event, true)"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
    )
        div(:class="[parentPrefixCls + '-' + prefixCls + '-title']" ref="reference" :style="liStyle")
            slot(name="title")
            Icon(v-if="mode === 'vertical'" :type="iconPrefixType" :style="iconStyles" @click="submenuIconClick")
        CollapseTransition(v-if="mode === 'vertical'" appear)
            ul(v-show="opened" :class="[parentPrefixCls]")
                slot
        transition(name="slide-up" v-else)
            DropDown.redefine(v-show="opened" placement="bottom" ref="drop")
                ul(:class="[parentPrefixCls + '-' + prefixCls + '-drop-list']")
                    slot
    li(
        v-else
        :class="classes"
        @click.stop="submenuIconClick"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
    )
        div(:class="[parentPrefixCls + '-' + prefixCls + '-title']" ref="reference" :style="liStyle")
            slot(name="title")
            Icon(v-if="mode === 'vertical'" :type="iconPrefixType" :style="iconStyles" @click="submenuIconClick")
        CollapseTransition(v-if="mode === 'vertical'" appear)
            ul(v-show="opened" :class="[parentPrefixCls]")
                slot
        transition(name="slide-up" v-else)
            DropDown.redefine(v-show="opened" placement="bottom" ref="drop")
                ul(:class="[parentPrefixCls + '-' + prefixCls + '-drop-list']")
                    slot
</template>

<script lang="ts">
import Menu from '@/components/menu/Menu.vue'
import Icon from '@/components/icon/Icon.vue'
import MenuMixins from '@/components/mixins/menu'
import DropDown from '@/components/menu/DropDown.vue'
import { WrapClasses, CSSStyles } from '@/types/components'
import { findComponentUpward, findComponentsDownward } from '@/utils'
import CollapseTransition from '@/components/menu/CollapseTransition'
import { Component, Mixins, Watch, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
        CollapseTransition,
        DropDown,
    },
})
export default class SubMenu extends Mixins(MenuMixins) {
    public opened: boolean = false

    public active: boolean = false

    private parentPrefixCls: string = 'menu'

    private prefixCls: string = 'submenu'

    private iconPrefixType: string = 'chevron-down'

    private timeout?: number

    private handleMouseenter(): void {
        if (this.disabled || this.mode === 'vertical') { return }
        if (!!this.timeout) { clearTimeout(this.timeout) }

        this.timeout = setTimeout(() => {
            (this.menu as Menu).updateOpenKeys(this.name)
            this.opened = true
        }, 250)
    }

    private handleMouseleave(): void {
        if (this.disabled || this.mode === 'vertical') { return }
        if (!!this.timeout) { clearTimeout(this.timeout) }

        this.timeout = setTimeout(() => {
            (this.menu as Menu).updateOpenKeys(this.name)
            this.opened = false
        }, 250)
    }

    private submenuIconClick(e: Event): boolean {
        if (this.disabled || this.mode === 'horizontal') { return false }
        if (!!this.timeout) { clearTimeout(this.timeout) }

        (this.menu as Menu).updateOpenKeys(this.name)
        this.opened = !this.opened

        e.preventDefault()
        return false
    }

    private get classes(): Array<string | WrapClasses> {
        return [
            `${this.parentPrefixCls}-${this.prefixCls}`,
            {
                [`${this.parentPrefixCls}-${this.prefixCls}-item-active`] : this.active && !this.hasParentSubMenu,
                [`${this.parentPrefixCls}-${this.prefixCls}-opened`]: this.opened,
                [`${this.parentPrefixCls}-${this.prefixCls}-disabled`]: this.disabled,
            },
        ]
    }

    private get iconStyles(): CSSStyles<CSSStyleDeclaration> {
        const styles: CSSStyles<CSSStyleDeclaration> = {}
        styles.transform = this.opened ? 'rotate(180deg)' : ''
        return styles
    }

    @Watch('opened')
    private onOpenedChange(newValue: boolean) {
        if (this.mode === 'vertical') { return }
        newValue ? (this.$refs.drop as DropDown).update() : (this.$refs.drop as DropDown).destroy()
    }

    @Watch('mode')
    private onModeChange(newValue: string) {
        if (newValue === 'horizontal') { (this.$refs.drop as DropDown).update() }
    }

    private mounted() {
        this.$on('on-menu-item-select', (name: number | string) => {
            if (this.mode === 'horizontal') { this.opened = false }
            this.dispatch('Menu', 'on-menu-item-select', name)
            return true
        })

        this.$on('on-update-active-name', (status: boolean) => {
            if (findComponentUpward(this, 'SubMenu')) { this.dispatch('SubMenu', 'on-update-active-name', status) }
            if (findComponentsDownward(this, 'SubMenu')) { findComponentsDownward(this, 'SubMenu').forEach((item) => { (item as SubMenu).active = false }) }
            this.active = status
        })
    }

}
</script>