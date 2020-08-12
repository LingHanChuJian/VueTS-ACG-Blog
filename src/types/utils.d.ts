import Vue from 'vue'
import { StoreOptions } from 'vuex'
import { RawLocation } from 'vue-router'

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

//  router next
export type routerNext = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void

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

export interface BotkitOptions {
    wsUrl: string
    onOpen?: (event: Event) => any
    onError: (this: WebSocket, event: Event) => any
    onClose?: (event: CloseEvent) => any
    onMessage: (this: WebSocket, event: MessageEvent) => any
}

// 机器人
export interface QuickReplies {
    title: string
    payload: string
}

export interface UserDiscuss {
    type: string
    text: string
    options?: QuickReplies[]
}
