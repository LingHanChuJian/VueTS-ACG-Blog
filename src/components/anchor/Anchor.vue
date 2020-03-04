<template lang="pug">
    div(:class="prefixCls") 
        Expand(:inRender="inRender")
        a(:href="'#' + uuid" :data-title="title") #
</template>

<script lang="ts">
import UUID from '@/components/mixins/uuid'
import Expand from '@/components/base/expand'
import { CreateElement, RenderContext, VNode } from 'vue'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Expand,
    },
})
export default class Anchor extends Mixins(UUID) {
    @Prop({ type: String, default: 'h2' })
    private label!: string

    @Prop({ type: String, default: '' })
    private title!: string

    private prefixCls: string = 'anchor'

    private inRender(createElement: CreateElement, context: RenderContext): VNode {
        return createElement(this.label, {
            attrs: {
                id: (this as any).uuid,
            },
        }, this.title)
    }
}
</script>