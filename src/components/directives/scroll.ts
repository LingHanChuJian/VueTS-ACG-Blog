/**
 * {@link https://github.com/ElemeFE/vue-infinite-scroll/blob/master/src/directive.js}
 */

import { Route } from 'vue-router'
import { ScrollData } from '@/types/utils'
import Vue, { DirectiveOptions, VNode } from 'vue'
import { addEvent, removeEvent, scrollTop, clientHeight, throttle, getStyle } from '@/utils'

// 获取对应滚动目标
const getScrollEventTarget = (element: HTMLElement): HTMLElement | Window => {
    let curNode: HTMLElement = element
    while (curNode && curNode.tagName !== 'HTML' && curNode.tagName !== 'BODY' && curNode.nodeType === 1) {
        const overflowY: string = getStyle(curNode, 'overflowY')
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return curNode
        }
        curNode = (curNode.parentNode as HTMLElement)
    }

    return window
}

// 获取元素绝对高度
const getElementScrollTop = (element: HTMLElement | Window): number => {
    return element === window ? scrollTop(element) : ((element as HTMLElement).getBoundingClientRect().top + scrollTop(window))
}

// 处理元素滚动到底
const handleScroll = (scrollData: ScrollData): void => {
    // 通过元素 data-disabled 来处理是否进行加载数据
    if (scrollData.el.dataset && scrollData.el.dataset.disabled) { return }

    let isShouldTrigger: boolean = false
    // 获取滚动目标元素
    const scrollElemntTarget: HTMLElement | Window = getScrollEventTarget(scrollData.el)
    // 获取视窗在文档绝对高度
    const viewportScrollTop: number = scrollTop(scrollElemntTarget)
    const viewportScrollBottom: number = viewportScrollTop + clientHeight(scrollElemntTarget)

    if (scrollElemntTarget === window) {
        const elementScrollBottom: number = getElementScrollTop(scrollData.el) - getElementScrollTop(scrollElemntTarget) + scrollData.el.offsetHeight + viewportScrollTop
        isShouldTrigger = viewportScrollBottom + scrollData.distance >= elementScrollBottom
    } else {
        isShouldTrigger = (scrollElemntTarget as HTMLElement).scrollHeight - viewportScrollBottom <= scrollData.distance
    }

    if (isShouldTrigger && scrollData.expression) {
        scrollData.expression()
    }
}

// 判断元素是否在文档流
const isAttached = (element: HTMLElement): boolean => {
    let curNode: (Node & ParentNode) | null = element.parentNode

    while (curNode) {
        if (curNode.nodeName === 'HTML') { return true }
        if (curNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) { return false }
        curNode = curNode.parentNode
    }

    return false
}

const directives: DirectiveOptions = {
    bind(el: HTMLElement, { value, arg }, vnode: VNode) {
        // 滚动目标元素
        const scrollElemntTarget: HTMLElement | Window = getScrollEventTarget(el)

        const scrollData: ScrollData = {
            el,
            vm: vnode.context,
            expression: value,
            distance: el.dataset && el.dataset.distance ? Number(el.dataset.distance) : 100,
            delay: el.dataset && el.dataset.delay ? Number(el.dataset.delay) : 1000,
        }

        //  监听执行函数
        const scrollListener: EventListenerOrEventListenerObject = throttle(handleScroll.bind(window, scrollData), scrollData.delay)

        scrollData.listener = scrollListener

        const vm: Vue | undefined = scrollData.vm

        if (vm) {
            vm.$on('hook:mounted', () => {
                vm.$nextTick(() => { if (isAttached(el)) { addEvent(scrollElemntTarget, 'scroll', scrollListener) } })
            })

            vm.$on('hook:beforeDestroy', () => removeEvent(scrollElemntTarget, 'scroll', scrollListener))

            // 使用 keep-alive 将无法触发 beforeDestroy 导致再其他页面也会监听 srcoll 事件 导致滚动一直加载中
            if (arg && arg === 'router') {
                const name: string | undefined = vm.$route.name
                vm.$watch('$route', (to: Route, from: Route) => {
                    if (to.name === name) {
                        addEvent(scrollElemntTarget, 'scroll', scrollListener)
                    } else {
                        removeEvent(scrollElemntTarget, 'scroll', scrollListener)
                    }
                })
            }
        }

        if (!(el as HTMLElement & { scrollData: ScrollData }).scrollData) {
            (el as HTMLElement & { scrollData: ScrollData }).scrollData = scrollData
        }
    },
    unbind(el: HTMLElement) {
        const scrollData: ScrollData = (el as HTMLElement & { scrollData: ScrollData }).scrollData
        if (el && scrollData && scrollData.listener) {
            const scrollElemntTarget: HTMLElement | Window = getScrollEventTarget(el)
            removeEvent(scrollElemntTarget, 'scroll', scrollData.listener)
        }
    },
}

export default directives
