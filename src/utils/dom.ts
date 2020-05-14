import { K, S, Coordinate } from '@/types/utils'

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

// 内容高度
export const scrollHeight = (element: HTMLElement | Window = window): number => {
    return element === window ? document.documentElement.scrollHeight : (element as HTMLElement).scrollHeight
}

//  元素可见高度
export const clientHeight = (element: HTMLElement | Window = window): number => {
    return element === window ? document.documentElement.clientHeight : (element as HTMLElement).clientHeight
}

// 当前滚动条位置
export const scrollTop = (element: HTMLElement | Window = window): number => {
    return element === window ? Math.max(window.pageYOffset || 0, document.documentElement.scrollTop) : (element as HTMLElement).scrollTop
}

// 获取元素绝对位置坐标
export const getCoordinate = (element: HTMLElement): Coordinate => {
    let x: number = element.offsetLeft
    let y: number = element.offsetTop

    let curElemnet: any = element.offsetParent

    while (curElemnet !== null) {
        x += curElemnet.offsetLeft
        y += curElemnet.offsetTop
        curElemnet = curElemnet.offsetParent
    }

    return { x, y }
}

