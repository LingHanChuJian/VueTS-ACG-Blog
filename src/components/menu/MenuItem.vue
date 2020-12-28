<template lang="pug">
    a(
        v-if="to"
        :href="linkUrl"
        :target="target"
        :class="classes"
        :style="liStyle"
        @click.exact="handleClickItem($event, false)"
        @click.ctrl="handleClickItem($event, true)"
        @click.meta="handleClickItem($event, true)"
    )
        slot
    li(
        v-else
        :class="classes"
        :style="liStyle"
        @click.stop="handleClickItem"
    )
        slot
</template>

<script lang="ts">
import { WrapClasses } from '@/types/components'
import MenuMixins from '@/components/mixins/menu'
import { Component, Mixins, Vue } from 'vue-property-decorator'

@Component({
    name: 'MenuItem',
})
export default class MenuItem extends Mixins(MenuMixins) {
    private prefixCls: string = 'menu-item'

    private isActive: boolean = false

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

    private mounted() {
        this.$on('on-update-active-name', (name: number | string) => {
            if (this.name === name) {
                this.isActive = true
                this.dispatch('SubMenu', 'on-update-active-name', name)
            } else {
                this.isActive = false
            }
        })
    }
}
</script>