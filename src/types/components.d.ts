import { RawLocation } from 'vue-router'
import { Placement, VirtualElement } from '@popperjs/core'
import { CreateElement, RenderContext, VNode } from 'vue'

// base
export interface WrapClasses {
    [key: string]: boolean
}

export type CSSStyles<T> = {
    [key in keyof T]? : T[key]
}

// Table
export type Render = (h: CreateElement, ctx?: RenderContext) => VNode

export interface Row {
    [key: string]: number | string | Render
}

export interface Column {
    title: string
    key: string
    width?: number
    align?: string
}

// Icon
export interface IconStyles {
    'font-size'?: string
    'color'?: string
}

// Menu
export interface MarkData {
    oldPaddingTop: string | null
    oldPaddingBottom: string | null
    oldOverflow: string | null
}

// Messgae
export interface MessageOptions {
    name?: string | number
    message: string | Render
    duration?: number
    type?: string
    isBackground?: boolean
}

export interface Properties {
    [key: string]: any
}

export interface MessageDefaults {
    top: number
    duration: number
}

// Popper
export interface PopperFnParam {
    placement: Placement
    reference: Element | VirtualElement
    popper: HTMLElement
}

export type PopperOffset = (param: PopperFnParam) => [number, number]

// nav
export interface MenuIcon {
    type?: string
    fixed?: boolean
    size?: number | string
    color?: string
    fixedSize?: 'lg'| 'xs'| 'sm'| '1x'| '2x'| '3x'| '4x'| '5x'| '6x'| '7x'| '8x'| '9x'| '10x'
    custom?: string
    className?: string
}

export interface MenuItemData {
    name: string
    to?: RawLocation
    icon?: MenuIcon
    content: string
    className?: string
    children?: MenuItemData[]
}
