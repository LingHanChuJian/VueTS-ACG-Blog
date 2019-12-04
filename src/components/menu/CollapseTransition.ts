import { Data } from '@/types/components'
import { addClass, removeClass } from '@/utils'
import { CreateElement, RenderContext, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CollapseTransition extends Vue {
    @Prop({ default: false, type: Boolean })
    private appear!: boolean

    private render(h: CreateElement, hack: RenderContext<Record<string, any>>): VNode {
        return h('transition', {
            on: {
                beforeEnter(el: HTMLElement & { data: Data }) {
                    addClass(el, 'collapse-transition')
                    if (!el.dataset) {
                        el.data = { oldOverflow: '', oldPaddingTop: null, oldPaddingBottom: null }
                    }
                    el.data.oldPaddingTop = el.style.paddingTop
                    el.data.oldPaddingBottom = el.style.paddingBottom

                    el.style.height = '0'
                    el.style.paddingTop = '0'
                    el.style.paddingBottom = '0'
                },
                enter(el: HTMLElement & { data: Data }) {
                    el.data.oldOverflow = el.style.overflow
                    if (el.scrollHeight !== 0) {
                        el.style.height = `${el.scrollHeight}px`
                    } else {
                        el.style.height = ''
                    }
                    el.style.paddingTop = el.data.oldPaddingTop
                    el.style.paddingBottom = el.data.oldPaddingBottom
                    el.style.overflow = 'hidden'
                },
                afterEnter(el: HTMLElement & { data: Data }) {
                    removeClass(el, 'collapse-transition')
                    el.style.height = ''
                    el.style.overflow = el.data.oldOverflow
                },
                beforeLeave(el: HTMLElement & { data: Data }) {
                    if (!el.dataset) {
                        el.data = { oldOverflow: '', oldPaddingTop: null, oldPaddingBottom: null }
                    }
                    el.data.oldOverflow = el.style.overflow
                    el.data.oldPaddingTop = el.style.paddingTop
                    el.data.oldPaddingBottom = el.style.paddingBottom

                    el.style.height = `${el.scrollHeight}px`
                    el.style.overflow = 'hidden'
                },
                leave(el: HTMLElement & { data: Data }) {
                    if (el.scrollHeight !== 0) {
                        addClass(el, 'collapse-transition')
                        el.style.height = '0'
                        el.style.paddingTop = '0'
                        el.style.paddingBottom = '0'
                    }
                },
                afterLeave(el: HTMLElement & { data: Data }) {
                    removeClass(el, 'collapse-transition')
                    el.style.height = ''
                    el.style.overflow = el.data.oldOverflow
                    el.style.paddingTop = el.data.oldPaddingTop
                    el.style.paddingBottom = el.data.oldPaddingBottom
                },
            },
            props: hack.props,
        }, hack.children)
    }
}
