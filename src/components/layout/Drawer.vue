<template lang="pug">
    div(
        :class="wrapClasses"
        :style="wrapStyles"
        v-if="isMediaMatched"
        )
        div(:class="childClasses")
            slot
</template>

<script lang="ts">
import { addEvent, removeEvent } from '@/utils'
import Adaptive from '@/components/mixins/adaptive'
import { CSSStyles, WrapClasses } from '@/types/components'
import { Component, Prop, Mixins, Watch, Vue } from 'vue-property-decorator'

@Component
export default class Drawer extends Mixins(Adaptive) {
    @Prop({ default: false, type: Boolean })
    private value!: boolean

    @Prop({ default: false, type: Boolean })
    private isCollapsible!: boolean

    @Prop({ default: 250, type: [Number, String] })
    private width!: number | string

    @Prop({ default: 0, type: [Number, String] })
    private collapsedWidth!: number | string

    private prefixCls: string = 'layout-drawer'

    public toggleCollapse(): void {
        const value: boolean = this.isCollapsible ? !this.value : false
        this.$emit('input', value)
    }

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}`,
        ]
    }

    private get wrapStyles(): CSSStyles<CSSStyleDeclaration> {
        return {
            flex: `0 0 ${this.drawerWidth}px`,
        }
    }

    private get childClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-children`,
            {
                [`${this.prefixCls}-children-collapsed`]: !this.value,
            },
        ]
    }

    private get drawerWidth(): number | string {
        return this.isCollapsible ? (this.value ? this.width : this.collapsedWidth) : this.width
    }

}
</script>
