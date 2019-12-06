<template lang="pug">
    a(
        v-if="to"
        :href="linkUrl"
        :target="target"
        :class="classes"
        @click.exact="handleClickItem(event, false), handleTitleClick()"
        @click.ctrl="handleClickItem(event, true)"
        @click.meta="handleClickItem(event, true)"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
    )
        div(:class="[prefixCls + '-title']" ref="reference" :style="liStyle")
            slot(name="title")
            Icon(v-if="mode === 'vertical'" @click.stop="submenuIconClick")
        CollapseTransition(v-if="mode === 'vertical'")
            ul
                slot
        transition(name="slide-up" v-else)
            DropDown
                solt
    li(
        v-else
        :class="classes"
        @click.stop="handleClickItem(), handleTitleClick()"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
    )
        div(:class="[prefixCls + '-title']" ref="reference" :style="liStyle")
            slot(name="title")
            Icon(v-if="mode === 'vertical'" @click.stop="submenuIconClick")
        CollapseTransition(v-if="mode === 'vertical'")
            ul
                slot
        transition(name="slide-up" v-else)
            DropDown
                slot
</template>

<script lang="ts">
import Icon from '@/components/icon/Icon.vue'
import MenuMixins from '@/components/mixins/menu'
import DropDown from '@/components/menu/DropDown.vue'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Mixins, Vue } from 'vue-property-decorator'
import CollapseTransition from '@/components/menu/CollapseTransition'

@Component({
    components: {
        Icon,
        CollapseTransition,
        DropDown,
    },
})
export default class SubMenu extends Mixins(MenuMixins) {
    private prefixCls: string = 'submenu'
    private timeout?: number

    private handleMouseenter(): void {
        if (this.disabled || this.mode === 'vertical') { return }
        if (!!this.timeout) { clearTimeout(this.timeout) }
    }

    private handleMouseleave(): void {
        if (this.disabled || this.mode === 'vertical') { return }
        if (!!this.timeout) { clearTimeout(this.timeout) }
    }

    private handleTitleClick(): void {
        console.log('handleTitleClick')
    }

    private submenuIconClick(): void {
        console.log('submenuIconClick')
    }

    private get classes(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }

}
</script>