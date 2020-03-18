import { VNode, CreateElement, RenderContext } from 'vue'

export type Render = (h: CreateElement, ctx?: RenderContext) => VNode

export declare class Message {
    /**
     * 消息
     * @param config MessageConfig为相关配置,string为待显示的内容
     */
    public info(config?: MessageConfig | string): void
    /**
     * 成功
     * @param config MessageConfig为相关配置,string为待显示的内容
     */
    public success(config?: MessageConfig | string): void
    /**
     * 警告
     * @param config MessageConfig为相关配置,string为待显示的内容
     */
    public warning(config?: MessageConfig | string): void
    /**
     * 错误
     * @param config MessageConfig为相关配置,string为待显示的内容
     */
    public error(config?: MessageConfig | string): void
    /**
     * 配置
     * @param config MessageConfig为相关配置,string为待显示的内容
     */
    public config(options?: MessageConfig): void
    /**
     * 销毁
     */
    public destroy(): void
}

export interface MessageConfig {
    /**
     * 自定义描述内容，使用 Vue 的 Render 函数
     * @param h Render函数
     */
    message: string | Render
    /**
     * 默认自动关闭的延时，单位秒
     * @default 1.5
     */
    duration?: number
    /**
     * 是否显示背景颜色
     * @default true
     */
    isBackground?: boolean
    /**
     * 提是类型
     * @default info
     */
    type?: string
}

declare module 'vue/types/vue' {
    interface Vue {
        /**
         *  全局提是
         */
        $Message: Message
    }
}
