import Vue, { CreateElement } from 'vue'
import Notification from '@/components/message/Notification.vue'
import { Properties, MessageDefaults, Render, Options } from '@/types/components'


let name: number = 1

let messageInstance: Notification | null = null

const prefixKey: string = 'message_key_'

const defaults: MessageDefaults = {
    top: 0,
    duration: 1.5,
}

const newInstance = (properties: Properties = {}): Notification => {
    const Instance: Vue = new Vue({
        render(h: CreateElement) {
            return h(Notification, { props: properties })
        },
    })

    const component: Vue = Instance.$mount()
    document.body.appendChild(component.$el)
    return (Instance.$children[0] as Notification)
}


const getMessageInstance = (): Notification => {
    messageInstance = messageInstance || newInstance({ styles: { top: `${defaults.top}px` } })
    return messageInstance
}


const notice = (message: string | Render, duration: number = defaults.duration, type: string = 'info', isBackground: boolean = true): void => {
    const instance: any = getMessageInstance()
    instance.add({
        name: `${prefixKey}${name}`,
        styles: {},
        duration,
        message,
        type,
        isBackground,
    })
    name ++
}

export default {
    info(options: string | Options) {
        return this.message('info', options)
    },
    success(options: string | Options) {
        return this.message('success', options)
    },
    warning(options: string | Options) {
        return this.message('warning', options);
    },
    error(options: string | Options) {
        return this.message('error', options);
    },
    message(type: string, options: string | Options) {
        if (typeof options === 'string') {
            options = { message: options }
        }
        return notice(options.message, options.duration, type, options.isBackground)
    },
    config(options: MessageDefaults) {
        if (options.top || options.top === 0) {
            defaults.top = options.top
        }
        if (options.duration || options.duration === 0) {
            defaults.duration = options.duration
        }
    },
    destroy() {
        const instance: any = getMessageInstance()
        messageInstance = null
        instance.closeAll()
    },
}
