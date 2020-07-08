import Vue from 'vue'
import { StoreOptions } from 'vuex'

export interface ObjectBase {
    [key: string]: any
    [key: number]: any
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

export type Func = (...arg: IArguments[]) => void

export interface ScrollData {
    el: HTMLElement
    vm?: Vue
    expression: any
    distance: number
    delay: number
    listener?: EventListenerOrEventListenerObject
}

export interface Botkit {
    getSocket(): WebSocket
}

export interface BotkitMessage {
    type: string
    text?: string
    user: string
    channel: string
    user_profile?: string | null
}
