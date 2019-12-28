/**
 * {@link https://github.com/wcoder/highlightjs-line-numbers.js}
 */

const TABLE_NAME: string = 'hljs-ln'

const LINE_NAME: string = 'hljs-ln-line'

const CODE_BLOCK_NAME: string = 'hljs-ln-code'

const NUMBERS_BLOCK_NAME: string = 'hljs-ln-numbers'

const NUMBER_LINE_NAME: string = 'hljs-ln-n'

const DATA_ATTR_NAME: string = 'data-line-number'

const BREAK_LINE_REGEXP: RegExp = /\r\n|\r|\n/g

export const isHljsLnCodeDescendant = (domElt: HTMLElement): boolean => {
    let curElt: HTMLElement | null = domElt
    while (curElt) {
        if (curElt.className && curElt.className.indexOf('hljs-ln-code') > -1) {
            return true
        }
        curElt = curElt.parentElement
    }
    return false
}

export const getHljsLnTable = (domElt: HTMLElement): HTMLElement | null => {
    let curElt: HTMLElement | null = domElt
    while (curElt && curElt.nodeName !== 'TABLE') {
        curElt = curElt.parentElement
    }
    return curElt
}

export const edgeGetSelectedCodeLines = (selection: Selection) => {
    const selectionText: string = selection.toString()

    const tdAnchor: Node | null = selection.anchorNode
}

/**
 * {@link https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript}
 */
export const stringFormat = (format: string, args: any[]): string => {
    return format.replace(/\{(\d+)\}/g, (m, n) => args[n] || m)
}
