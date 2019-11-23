<template lang="pug">
    a(
        v-if="to"
        :href="linkUrl"
        :target="target"
        :class="classes"
        @click.exact="handleClickItem(event, false)"
        @click.ctrl="handleClickItem(event, true)"
        @click.meta="handleClickItem(event, true)"
    )
        div(:class="[prefixCls + '-title']" ref="reference" @click.stop="handleClick" :style="liStyle")
            slot(name="title")
            Icon(v-if="mode === 'vertical'")
    li(
        v-else
        :class="classes"
        @click.stop="handleClickItem"
    )
</template>

<script lang="ts">
import Icon from '@/components/icon/Icon.vue'
import MenuMixins from '@/components/mixins/menu'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class SubMenu extends Mixins(MenuMixins) {
    private prefixCls: string = 'sub-menu'

    private get classes(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }
}
</script>