import { CreateElement, RenderContext, VNode } from 'vue'

export type Render = (h: CreateElement, ctx: RenderContext) => VNode

export interface Row {
    [key: string]: number | string | Render
}

export interface Column {
    title: string
    key: string
    width?: number
    align?: string
}
