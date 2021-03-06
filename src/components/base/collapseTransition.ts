import { addClass, removeClass } from '@/utils'
import { CreateElement, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: 'CollapseTransition',
})
export default class CollapseTransition extends Vue {
    @Prop({ type: Boolean, default: false })
    private appear!: boolean

    private render(h: CreateElement): VNode {
        return h('transition', {
            on: {
                beforeEnter(el: HTMLElement) {
                    addClass(el, 'collapse-transition')

                    el.dataset.oldOverflow = ''
                    el.dataset.oldPaddingTop = el.style.paddingTop || ''
                    el.dataset.oldPaddingBottom = el.style.paddingBottom || ''

                    el.style.height = '0'
                    el.style.paddingTop = '0'
                    el.style.paddingBottom = '0'
                },
                enter(el: HTMLElement) {
                    el.dataset.oldOverflow = el.style.overflow || ''

                    el.style.height = el.scrollHeight !== 0 ? `${el.scrollHeight}px` : ''
                    el.style.paddingTop = (el.dataset.oldPaddingTop as string)
                    el.style.paddingBottom = (el.dataset.oldPaddingBottom as string)
                    el.style.overflow = 'hidden'
                },
                afterEnter(el: HTMLElement) {
                    removeClass(el, 'collapse-transition')
                    el.style.height = ''
                    el.style.overflow = (el.dataset.oldOverflow as string)
                },
                beforeLeave(el: HTMLElement) {
                    el.dataset.oldOverflow = el.style.overflow || ''
                    el.dataset.oldPaddingTop = el.style.paddingTop || ''
                    el.dataset.oldPaddingBottom = el.style.paddingBottom || ''

                    el.style.height = `${el.scrollHeight}px`
                    el.style.overflow = 'hidden'
                },
                leave(el: HTMLElement) {
                    if (el.scrollHeight !== 0) {
                        addClass(el, 'collapse-transition')
                        el.style.height = '0'
                        el.style.paddingTop = '0'
                        el.style.paddingBottom = '0'
                    }
                },
                afterLeave(el: HTMLElement) {
                    removeClass(el, 'collapse-transition')
                    el.style.height = ''
                    el.style.overflow = (el.dataset.oldOverflow as string)
                    el.style.paddingTop = (el.dataset.oldPaddingTop as string)
                    el.style.paddingBottom = (el.dataset.oldPaddingBottom as string)
                },
            },
            props: this.$props,
        }, this.$slots.default)
    }
}
