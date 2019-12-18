import { MarkData } from '@/types/components'
import { addClass, removeClass } from '@/utils'
import { CreateElement, RenderContext, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CollapseTransition extends Vue {
    @Prop({ type: Boolean, default: false })
    private appear!: boolean

    private render(h: CreateElement, hack: RenderContext<Record<string, any>>): VNode {
        return h('transition', {
            on: {
                beforeEnter(el: HTMLElement & { markData: MarkData }) {
                    addClass(el, 'collapse-transition')
                    if (!el.markData) {
                        el.markData = { oldOverflow: '', oldPaddingTop: null, oldPaddingBottom: null }
                    }
                    el.markData.oldPaddingTop = el.style.paddingTop
                    el.markData.oldPaddingBottom = el.style.paddingBottom

                    el.style.height = '0'
                    el.style.paddingTop = '0'
                    el.style.paddingBottom = '0'
                },
                enter(el: HTMLElement & { markData: MarkData }) {
                    el.markData.oldOverflow = el.style.overflow
                    if (el.scrollHeight !== 0) {
                        el.style.height = `${el.scrollHeight}px`
                    } else {
                        el.style.height = ''
                    }
                    el.style.paddingTop = (el.markData.oldPaddingTop as string)
                    el.style.paddingBottom = (el.markData.oldPaddingBottom as string)
                    el.style.overflow = 'hidden'
                },
                afterEnter(el: HTMLElement & { markData: MarkData }) {
                    removeClass(el, 'collapse-transition')
                    el.style.height = ''
                    el.style.overflow = (el.markData.oldOverflow as string)
                },
                beforeLeave(el: HTMLElement & { markData: MarkData }) {
                    if (!el.markData) {
                        el.markData = { oldOverflow: '', oldPaddingTop: null, oldPaddingBottom: null }
                    }
                    el.markData.oldOverflow = el.style.overflow
                    el.markData.oldPaddingTop = el.style.paddingTop
                    el.markData.oldPaddingBottom = el.style.paddingBottom

                    el.style.height = `${el.scrollHeight}px`
                    el.style.overflow = 'hidden'
                },
                leave(el: HTMLElement & { markData: MarkData }) {
                    if (el.scrollHeight !== 0) {
                        addClass(el, 'collapse-transition')
                        el.style.height = '0'
                        el.style.paddingTop = '0'
                        el.style.paddingBottom = '0'
                    }
                },
                afterLeave(el: HTMLElement & { markData: MarkData }) {
                    removeClass(el, 'collapse-transition')
                    el.style.height = ''
                    el.style.overflow = (el.markData.oldOverflow as string)
                    el.style.paddingTop = (el.markData.oldPaddingTop as string)
                    el.style.paddingBottom = (el.markData.oldPaddingBottom as string)
                },
            },
            props: hack.props,
        }, hack.children)
    }
}
