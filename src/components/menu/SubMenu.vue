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
        div(:class="[prefixCls + '-title']" ref="reference" :style="liStyle")
            slot(name="title")
            Icon(v-if="mode === 'vertical'" @click="submenuIconClick")
        CollapseTransition(v-if="mode === 'vertical'")
            ul(v-show="opened" :class="[parentPrefixCls]")
                slot
        transition(name="slide-up" v-else)
            DropDown(v-show="opened" placement="bottom" ref="drop")
                ul(:class="[parentPrefixCls + '-drop-list']")
                    solt
    li(
        v-else
        :class="classes"
        @click.stop="handleClickItem()"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
    )
        div(:class="[prefixCls + '-title']" ref="reference" :style="liStyle")
            slot(name="title")
            Icon(v-if="mode === 'vertical'" @click="submenuIconClick")
        CollapseTransition(v-if="mode === 'vertical'")
            ul(v-show="opened" :class="[parentPrefixCls]")
                slot
        transition(name="slide-up" v-else)
            DropDown(v-show="opened" placement="bottom" ref="drop")
                ul(:class="[parentPrefixCls + '-drop-list']")
                    slot
</template>

<script lang="ts">
import { findComponentUpward } from '@/utils'
import Menu from '@/components/menu/Menu.vue'
import Icon from '@/components/icon/Icon.vue'
import MenuMixins from '@/components/mixins/menu'
import DropDown from '@/components/menu/DropDown.vue'
import { WrapClasses, CSSStyles } from '@/types/components'
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
    private parentPrefixCls: string = 'menu'

    private prefixCls: string = 'submenu'

    private timeout?: number

    private opened: boolean = false

    private active: boolean = false

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
            this.prefixCls,
            {
                [`${this.prefixCls}-item-active`] : this.active && !this.hasParentSubMenu,
                [`${this.prefixCls}-opened`]: this.opened,
                [`${this.prefixCls}-disabled`]: this.disabled,
            },
        ]
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
    }

}
</script>