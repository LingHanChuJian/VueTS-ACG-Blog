import { Render } from '@/types/components'
import { CreateElement, RenderContext, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Expand extends Vue {
    @Prop({ type: Function })
    private inRender!: Render

    private render(createElement: CreateElement, context: RenderContext): VNode {
        return this.inRender(createElement, context)
    }
}
