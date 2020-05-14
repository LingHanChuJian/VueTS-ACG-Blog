import Vue from 'vue'
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

export interface Coordinate {
    x: number
    y: number
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
