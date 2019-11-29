import { CreateElement, RenderContext, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CollapseTransition extends Vue {
    @Prop({ default: false, type: Boolean })
    private appear!: boolean

    private render(h: CreateElement, hack: RenderContext<Record<string, any>>): VNode {
        return h('transition', {
            on: {
                // beforeEnter(el: Element) {
                // },
            },
            props: hack.props,
        }, hack.children)
    }
}
