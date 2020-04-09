<template lang="pug">
    div(
        :class="wrapClasses"
        :style="wrapStyles"
        v-if="isMediaMatched"
        )
        div(:class="childClasses" :style="childStyles")
            slot
</template>

<script lang="ts">
import { addEvent, removeEvent } from '@/utils'
import AdaptiveMixins from '@/components/mixins/adaptive'
import { CSSStyles, WrapClasses } from '@/types/components'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component
export default class Drawer extends Mixins(AdaptiveMixins) {
    @Prop({ type: Boolean, default: false })
    private value!: boolean

    @Prop({ type: Boolean, default: false })
    private isCollapsible!: boolean

    @Prop({ type: [Number, String], default: 250 })
    private width!: number | string

    @Prop({ type: [Number, String], default: 0 })
    private collapsedWidth!: number | string

    private prefixCls: string = 'layout-drawer'

    public toggleCollapse(): void {
        const value: boolean = this.isCollapsible ? !this.value : false
        this.$emit('input', value)
    }

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }

    private get wrapStyles(): CSSStyles<CSSStyleDeclaration> {
        return {
            flex: `0 0 ${this.drawerWidth}px`,
        }
    }

    private get childStyles(): CSSStyles<CSSStyleDeclaration> {
        return {
            transform: `translateX(-${this.contraryDrawerWidth}px)`,
            opacity: !this.value ? '0' : '1',
        }
    }

    private get childClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-children`,
        ]
    }

    private get drawerWidth(): number | string {
        return this.isCollapsible ? (this.value ? this.width : this.collapsedWidth) : this.width
    }

    private get contraryDrawerWidth(): number | string {
        return this.isCollapsible ? (this.value ? this.collapsedWidth : this.width) : this.collapsedWidth
    }

}
</script>
