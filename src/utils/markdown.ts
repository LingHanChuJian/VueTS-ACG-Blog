import hljs from 'highlight.js'
import ClipboardJS from 'clipboard'
import { addStyles, initLineNumbersOnLoad, isHljsLnCodeDescendant, edgeGetSelectedCodeLines } from '@/utils/lineNumber'

export const hljsCode = (el: HTMLElement) => {
    const blocks: Element[] = []
    const codes: NodeListOf<Element> = el.querySelectorAll('pre code')

    for (let i = 0, len = codes.length; i < len; i++) {
        if (!codes[i].querySelector('table')) {
            blocks.push(codes[i])
        }
    }

    if (blocks.length > 0) {
        Array.prototype.forEach.call(blocks, hljs.highlightBlock)
        addStyles()
        initLineNumbersOnLoad({ singleLine: true, el })
        el.addEventListener('copy', (e: ClipboardEvent) => copySelection(e))
        codeListener(el)
    }
}

export const copySelection = (e: ClipboardEvent) => {
    const selection: Selection | null = window.getSelection()
    if (selection && isHljsLnCodeDescendant((selection.anchorNode as HTMLElement))) {
        let selectionText: string | null | undefined
        if (selection && window.navigator.userAgent.indexOf('Edge') !== -1) {
          selectionText = edgeGetSelectedCodeLines(selection)
        } else {
          selectionText = selection.toString()
        }
        if (e.clipboardData) { e.clipboardData.setData('text/plain', selectionText ? selectionText : '') }
        e.preventDefault()
    }
}

export const codeListener = (el: HTMLElement) => {
    const copyElement: NodeListOf<HTMLElement> = el.querySelectorAll('.copy-code')
    for (let i = 0, len = copyElement.length; i < len; i++) {
        copyElement[i].removeEventListener('click', copyCode)
        copyElement[i].addEventListener('click', copyCode)
    }
}


export const copyCode = (e: MouseEvent) => {
    for (let i = 0, len = (e as MouseEvent & { path: HTMLElement[] }).path.length; i < len; i++) {
        if ((e as MouseEvent & { path: HTMLElement[] }).path[i].className.indexOf('copy-code') > -1) {
          const tag: string | null = (e as MouseEvent & { path: HTMLElement[] }).path[i].getAttribute('data-clipboard-target')
          if (!tag) { break }
          const code: Element | null = document.querySelector(tag)
          if (!code) { break }
          const clipboard: ClipboardJS = new ClipboardJS('.copy-code', { container: code })
          clipboard.on('error', (error: ClipboardJS.Event) => {
            console.error(`Action: ${error.action}`)
            console.error(`Trigger: ${error.trigger}`)
          })
          break
        }
    }
}