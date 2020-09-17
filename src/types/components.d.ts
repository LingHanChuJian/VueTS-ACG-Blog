import { RawLocation } from 'vue-router'
import { UserAgentParser } from './utils'
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

export interface UserInformation {
    icon?: MenuIcon
    name?: string
    link?: string
    image?: string
    title?: string
    fn?: () => void
}

// Comments
export interface User {
    id: number | string
    image: string
    userName: string
    site?: string
    email: string
    mark?: string
    isAuthor: boolean
}

export interface Comments {
    id: number | string
    parent?: User
    user: User
    content: string
    create: number
    userAgent: string
    location: string
    handleUserAgent?: UserAgentParser
    children?: Comments[]
}

export interface UserComments {
    total: number
    comments: Comments[]
}

// components
export interface UserRecommend {
    link: string
    title: string
    description: string
    image: string
}

export interface UserArchives {
    id: number | string
    title: string
    subtitle: string
    tag: string[]
    categories: string
    tagName: string
    image: string
    pageView: number
    comments: number
    introduction?: string
    content?: string
    m3u8?: string
    create: number
    previous?: UserArchives
    next?: UserArchives
}

// 赞赏
export type UserDonate = Omit<UserInformation, 'icon'>

// 友链
export interface Friends {
    name: string
    description: string
    link: string
    avatar: string
    color?: string
}

export interface UserFriends {
    title: string
    description: string
    children: Friends[]
}

//  type emoticon 颜文字  emoji 表情符号  sticker 贴图
export interface ExpressionParam {
    image?: string
    value: string
    step?: number
    width?: string
    height?: string
    transform?: string
    delay?: number
}

export interface UserExpression {
    type: 'sticker' | 'emoticon' | 'emoji'
    template?: string
    titile: string
    description?: string
    expression: ExpressionParam[]
}

