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
