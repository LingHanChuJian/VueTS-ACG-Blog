<template lang="pug">
    section(:class="wrapClasses")
        slot
</template>

<script lang="ts">
import { addEvent, removeEvent } from '@/utils'
import { WrapClasses } from '@/types/components'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Layout extends Vue {
    private hasFindDrawer: boolean = false
    private prefixCls: string = 'layout'

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            {
                [`${this.prefixCls}-has-drawer`] : this.hasFindDrawer,
            },
        ]
    }

    private isFindDrawer(): boolean {
        return this.$children.some((child: Vue) => child.$options.name === 'Drawer' && child.$el.nodeName !== '#comment')
    }

    private setHasFindDrawer(): void {
        this.hasFindDrawer = this.isFindDrawer()
    }

    private mounted() {
        this.setHasFindDrawer()
        addEvent(window, 'resize', this.setHasFindDrawer)
    }

    private beforeDestroy() {
        removeEvent(window, 'resize', this.setHasFindDrawer)
    }
}
</script>
