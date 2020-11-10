/**
 * {@link https://github.com/component/textarea-caret-position/blob/master/index.js}
 */

import { InputCoordinates } from '@/types/utils'

const properties: string[] = [
    'direction',  // RTL support
    'boxSizing',
    'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
    'height',
    'overflowX',
    'overflowY',  // copy the scrollbar for IE

    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',

    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',

    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',

    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration',  // might not make a difference, but better be safe

    'letterSpacing',
    'wordSpacing',

    'tabSize',
    'MozTabSize',
]

const isFirefox: boolean = navigator.userAgent.indexOf('Firefox') > -1

export const getCaretCoordinates = (element: HTMLElement, position: number): InputCoordinates => {

    const div: HTMLDivElement = document.createElement('div')
    div.id = 'input-textarea-caret-position-mirror-div'
    document.documentElement.appendChild(div)

    const style: CSSStyleDeclaration = div.style
    const computed: CSSStyleDeclaration = getComputedStyle(element)

    const isInput: boolean = element.nodeName === 'INPUT'

    style.whiteSpace = 'pre-wrap'

    if (!isInput) { style.wordWrap = 'break-word' }

    style.position = 'absolute'

    for (let i = 0, len = properties.length; i < len; i++) {
        const prop = properties[i]
        if (isInput && prop === 'lineHeight') {
            if (computed.boxSizing === 'border-box') {
                const height: number = parseInt(computed.height as string, 10)

                const outerHeight: number =
                    parseInt(computed.paddingTop as string, 10) +
                    parseInt(computed.paddingBottom as string, 10) +
                    parseInt(computed.borderTopWidth as string, 10) +
                    parseInt(computed.borderBottomWidth as string, 10)

                const targetHeight: number = outerHeight + parseInt(computed.lineHeight as string, 10)
                if (height > targetHeight) {
                    style.lineHeight = height - outerHeight + 'px'
                } else if (height < targetHeight) {
                    style.lineHeight = '0'
                } else {
                    style.lineHeight = computed.lineHeight
                }
            } else {
                style.lineHeight = computed.height
            }
        } else {
            style[prop as any] = computed[prop as any]
        }
    }

    if (isFirefox) {
        if (element.scrollHeight > parseInt(computed.height as string, 10)) { style.overflowY = 'scroll' }
    } else {
        style.overflow = 'hidden'
    }

    div.textContent = (element as HTMLTextAreaElement | HTMLInputElement).value.substring(0, position)

    if (isInput) { div.textContent = div.textContent.replace(/\s/g, '\u00a0') }

    const span: HTMLSpanElement = document.createElement('span')

    span.textContent = (element as HTMLTextAreaElement | HTMLInputElement).value.substring(position) || '.'

    div.appendChild(span)

    const coordinates: InputCoordinates = {
        top: span.offsetTop + parseInt(computed.borderTopWidth as string, 10),
        left: span.offsetLeft + parseInt(computed.borderLeftWidth as string, 10),
        height: parseInt(computed.lineHeight as string, 10),
    }

    document.documentElement.removeChild(div)

    return coordinates
}
