type K  = keyof DocumentEventMap

export const addEvent = (element: Document | HTMLElement | Window, event: K, handler: EventListenerOrEventListenerObject): void => {
    if (element && event && handler) {
        element.addEventListener(event, handler, false)
    }
}

export const removeEvent = (element: Document | HTMLElement | Window, event: K, handler: EventListenerOrEventListenerObject): void => {
    if (element && event && handler) {
        element.removeEventListener(event, handler, false)
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
