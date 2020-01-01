/**
 * {@link https://github.com/wcoder/highlightjs-line-numbers.js}
 */

import { LineNumbersOptions } from '@/types/utils'

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
        if (curElt.hasOwnProperty('className') && curElt.className && curElt.className.indexOf('hljs-ln-code') > -1) {
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

export const edgeGetSelectedCodeLines = (selection: Selection): string | null => {
    const selectionText: string = selection.toString()

    let tdAnchor: Node | (Node & ParentNode) | null = selection.anchorNode

    while (tdAnchor && tdAnchor.nodeName !== 'TD') {
        tdAnchor = tdAnchor.parentNode
    }

    let tdFocus: Node | (Node & ParentNode) | null = selection.focusNode

    while (tdFocus && tdFocus.nodeName !== 'TD') {
        tdFocus = tdFocus.parentNode
    }

    const anchorLineNumber: string | undefined = (tdAnchor as HTMLElement).dataset.lineNumber
    const focusLineNumber: string | undefined = (tdFocus as HTMLElement).dataset.lineNumber
    let firstLineNumber: number = parseInt(anchorLineNumber ? anchorLineNumber : '0', 10)
    let lastLineNumber: number = parseInt(focusLineNumber ? focusLineNumber : '0', 10)

    if (firstLineNumber !== lastLineNumber) {
        let firstLineText: string | null = tdAnchor ? tdAnchor.textContent : ''
        let lastLineText: string | null = tdFocus ? tdFocus.textContent : ''

        if (firstLineNumber > lastLineNumber) {
            let tmp: any = firstLineNumber
            firstLineNumber = lastLineNumber
            lastLineNumber = tmp
            tmp = firstLineText
            firstLineText = lastLineText
            lastLineText = tmp
        }

        while (selectionText.indexOf(firstLineText ? firstLineText : '') !== 0) {
            firstLineText = firstLineText ? firstLineText.slice(1) : ''
        }

        while (selectionText.lastIndexOf(lastLineText ? lastLineText : '') === -1) {
            lastLineText = lastLineText ? lastLineText.slice(0, -1) : ''
        }

        let selectedText: string | null = firstLineText
        const hljsLnTable: HTMLElement | null = getHljsLnTable((tdAnchor as HTMLElement))
        for (let i = firstLineNumber + 1; i < lastLineNumber; ++i) {
          const codeLineSel: string = stringFormat('.{0}[{1}="{2}"]', [CODE_BLOCK_NAME, DATA_ATTR_NAME, i])
          const codeLineElt: Element | null = hljsLnTable ? hljsLnTable.querySelector(codeLineSel) : null
          selectedText += '\n' + (codeLineElt ? codeLineElt.textContent : '')
        }
        selectedText += '\n' + lastLineText
        return selectedText
    }

    return selectionText
}

export const addStyles = (): void => {
    const css: HTMLStyleElement = document.createElement('style')
    css.type = 'text/css'
    css.innerHTML = stringFormat(
      '.{0}{border-collapse:collapse}' +
            '.{0} td{padding:0}' +
            '.{1}:before{content:attr({2})}',
      [
        TABLE_NAME,
        NUMBER_LINE_NAME,
        DATA_ATTR_NAME,
      ])
    document.getElementsByTagName('head')[0].appendChild(css)
}

export const initLineNumbersOnLoad = (options: LineNumbersOptions): void => {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        documentReady(options)
    } else {
        window.addEventListener('DOMContentLoaded', () => documentReady(options))
    }
}

export const documentReady = (options: LineNumbersOptions): void => {
    try {
        const blocks = options.el.querySelectorAll('code.hljs,code.nohighlight')
        for (const i in blocks) {
          if (blocks.hasOwnProperty(i)) {
            lineNumbersBlock((blocks[i] as HTMLElement), options)
          }
        }
    } catch (e) {
        console.error('LineNumbers error: ', e)
    }
}

export const lineNumbersBlock = (element: HTMLElement, options: LineNumbersOptions): void => {
    if (typeof element !== 'object') { return }
    setTimeout(() => { element.innerHTML = lineNumbersInternal(element, options) }, 0)
}

export const lineNumbersValue = (value: string, options: LineNumbersOptions): string | void => {
    if (typeof value !== 'string') { return }

    const element: HTMLElement = document.createElement('code')
    element.innerHTML = value

    return lineNumbersInternal(element, options)
}

export const lineNumbersInternal = (element: HTMLElement, options: LineNumbersOptions): string => {
    const firstLineIndex = options.singleLine ? 0 : 1
    duplicateMultilineNodes(element)
    return addLineNumbersBlockFor(element.innerHTML, firstLineIndex)
}

export const addLineNumbersBlockFor = (inputHtml: string, firstLineIndex: number): string => {
    const lines: string[] = getLines(inputHtml)

    if (lines[lines.length - 1].trim() === '') {
        lines.pop()
    }

    if (lines.length > firstLineIndex) {
        let html: string = ''

        for (let i = 0, l = lines.length; i < l; i++) {
          html += stringFormat(
            '<tr>' +
                          '<td class="{0} {1}" {3}="{5}">' +
                              '<div class="{2}" {3}="{5}"></div>' +
                          '</td>' +
                          '<td class="{0} {4}" {3}="{5}">' +
                              '{6}' +
                          '</td>' +
                      '</tr>',
            [
              LINE_NAME,
              NUMBERS_BLOCK_NAME,
              NUMBER_LINE_NAME,
              DATA_ATTR_NAME,
              CODE_BLOCK_NAME,
              i + 1,
              lines[i].length > 0 ? lines[i] : ' ',
            ])
        }

        return stringFormat('<table class="{0}">{1}</table>', [ TABLE_NAME, html ])
    }

    return inputHtml
}

export const duplicateMultilineNodes = (element: HTMLElement | ChildNode): void => {
    const nodes: NodeListOf<ChildNode> = element.childNodes

    for (let i = 0, len = nodes.length; i < len; i++) {
        const child: ChildNode = nodes[i]
        if (getLinesCount(child.textContent ? child.textContent : '') > 0) {
            child.childNodes.length > 0 ? duplicateMultilineNodes(child) : duplicateMultilineNode(child.parentElement)
        }
    }
}


export const duplicateMultilineNode = (element: HTMLElement | null): void => {
    if (!element) { return }

    const className: string = element.className
    let result: string = ''

    if (!/hljs-/.test(className)) { return }

    const lines: string[] = getLines(element.innerHTML)

    for (let i = 0, len = lines.length; i < len; i++) {
        const lineText: string = lines[i].length > 0 ? lines[i] : ' '
        result += stringFormat('<span class="{0}">{1}</span>\n', [ className, lineText ])
    }

    element.innerHTML = result.trim()
}

export const getLines = (text: string): string[] => {
    if (text.length === 0) { return [] }
    return text.split(BREAK_LINE_REGEXP)
}

export const getLinesCount = (text: string): number => {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length
}

/**
 * {@link https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript}
 */
export const stringFormat = (format: string, args: any[]): string => {
    return format.replace(/\{(\d+)\}/g, (m, n) => args[n] || m)
}
