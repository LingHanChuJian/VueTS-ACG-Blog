import { K, S } from '@/types/utils'

export const addEvent = (element: Document | HTMLElement | Window, event: K, handler: EventListenerOrEventListenerObject, useCapture: boolean = false): void => {
    if (element && event && handler) {
        element.addEventListener(event, handler, useCapture)
    }
}

export const removeEvent = (element: Document | HTMLElement | Window, event: K, handler: EventListenerOrEventListenerObject, useCapture: boolean = false): void => {
    if (element && event && handler) {
        element.removeEventListener(event, handler, useCapture)
    }
}

export const hasClass = (el: HTMLElement, cls: string): boolean => {
    return el.classList.contains(cls)
}

export const addClass = (el: HTMLElement, cls: string): void  => {
    if (!hasClass(el, cls)) { el.classList.add(cls) }
}

export const removeClass = (el: HTMLElement, cls: string): void => {
    if (hasClass(el, cls)) { el.classList.remove(cls) }
}

export const toggleClass = (el: HTMLElement, cls: string): void => {
    hasClass(el, cls) ? removeClass(el, cls) : addClass(el, cls)
}

const SPECIAL_CHARS_REGEXP: RegExp = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP: RegExp = /^moz([A-Z])/

export const camelCase = (name: S | 'float'): S | 'float' => {
    return typeof name === 'number' ? name : (name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
        return offset ? letter.toUpperCase() : letter
    }).replace(MOZ_HACK_REGEXP, 'Moz$1') as S)
}

export const getStyle = (element: HTMLElement, styleName: S | 'float'): any | null => {
    //  获取style
    if (!element || !styleName) { return null }

    styleName = camelCase(styleName)

    if (styleName === 'float') {
        styleName = 'cssFloat'
    }

    try {
        const computed: CSSStyleDeclaration | null = document.defaultView ? document.defaultView.getComputedStyle(element, '') : null
        return element.style[styleName] || computed ? (computed as CSSStyleDeclaration)[styleName] : null
    } catch (e) {
        return element.style[styleName]
    }
}

// 文档高度
export const scrollHeight = (): number => {
    return document.documentElement.scrollHeight || document.body.scrollHeight
}

//  可见高度
export const clientHeight = (): number => {
    return document.documentElement.clientHeight || document.body.clientHeight
}

// 当前滚动条位置
export const scrollTop = (): number => {
    return document.documentElement.scrollTop || document.body.scrollTop
}
