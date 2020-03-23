import { StoreOptions } from 'vuex'

export interface ObjectBase {
    [key: string]: string
    [key: number]: string
}

export interface Details {
    [propName: string]: Details
}

export interface Modules {
    [key: string]: StoreOptions<Details>
}

export type K = keyof DocumentEventMap

export type S = keyof CSSStyleDeclaration

export interface LineNumbersOptions {
    singleLine: boolean
    el: HTMLElement
}

export interface TransferData {
    parentNode: Node & ParentNode
    comment: Comment
    target: Node | null
    isMove: boolean
}
