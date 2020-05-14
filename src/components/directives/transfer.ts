/**
 * {@link https://github.com/airyland/vux/blob/v2/src/directives/transfer-dom/index.js}
 * {@link https://github.com/calebroseland/vue-dom-portal}
 */

import { TransferData } from '@/types/utils'
import { DirectiveOptions, VNode } from 'vue'
import { addClass, removeClass } from '@/utils/dom'

/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */

const getTarget = (node: Node | string | boolean = document.body): Node | null => {
    if (node === true) { return document.body }
    return node instanceof Node ? (node as Node) : document.querySelector((node as string))
 }

const directives: DirectiveOptions = {
    inserted(el: HTMLElement, { value }, vnode: VNode) {
        if (el.dataset && el.dataset.transfer !== 'true') { return false }
        addClass(el, 'v-transfer')
        const parentNode: Node & ParentNode | null = el.parentNode
        if (!parentNode) { return }
        // 创建注释节点进行元素替换操作
        const comment: Comment = document.createComment('')
        //  是否移动 dom
        let isMove: boolean = false
        if (value !== false) {
            parentNode.replaceChild(comment, el) // 移出文档
            const target: Node | null = getTarget(value)
            if (target) { target.appendChild(el) }// 移动到新的地方
            isMove = true
        }

        if (!(el as HTMLElement & { transferData: TransferData}).transferData) {
            (el as HTMLElement & { transferData: TransferData}).transferData = {
                target: getTarget(value),
                parentNode,
                comment,
                isMove,
            }
        }
    },
    componentUpdated(el: HTMLElement, { value }) {
        if (el.dataset && el.dataset.transfer !== 'true') { return false }
        const $ref: TransferData = (el as HTMLElement & { transferData: TransferData}).transferData
        if (!$ref) { return }
        const { parentNode, comment, isMove } = $ref
        const target: Node | null = getTarget(value)
        if (!isMove && value) {
            (el as HTMLElement & { transferData: TransferData}).transferData = Object.assign({}, (el as HTMLElement & { transferData: TransferData}).transferData, {
                target: getTarget(value),
                isMove: true,
            })
            parentNode.replaceChild(comment, el) // 移出文档
            if (target) { target.appendChild(el) }// 移动到新的地方
        } else if (isMove && value === false) {
            (el as HTMLElement & { transferData: TransferData}).transferData = Object.assign({}, (el as HTMLElement & { transferData: TransferData}).transferData, {
                target: getTarget(value),
                isMove: false,
            })
            // 替换回来
            parentNode.replaceChild(el, comment)
        } else if (value) {
            // 已经移动到新的地方
            if (target) { target.appendChild(el) }
        }
    },
    unbind(el: HTMLElement) {
        if (el.dataset && el.dataset.transfer !== 'true') { return false }
        removeClass(el, 'v-transfer')
        const $ref: TransferData = (el as HTMLElement & { transferData: TransferData}).transferData
        if (!$ref) { return }
        const { parentNode, isMove } = $ref
        if (isMove === true) {
            parentNode.appendChild(el)
        }
        delete (el as HTMLElement & { transferData: TransferData}).transferData
    },
}

export default directives
