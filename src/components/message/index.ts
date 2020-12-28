import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'
import Notification from '@/components/message/Notification.vue'
import { Properties, MessageDefaults, Render, MessageOptions } from '@/types/components'


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

@Component({
    name: 'Notice',
})
class Notice extends Vue {
    public info(options: string | MessageOptions) {
        return this.message('info', options)
    }

    public success(options: string | MessageOptions) {
        return this.message('success', options)
    }

    public warning(options: string | MessageOptions) {
        return this.message('warning', options);
    }

    public error(options: string | MessageOptions) {
        return this.message('error', options);
    }

    public message(type: string, options: string | MessageOptions) {
        if (typeof options === 'string') {
            options = { message: options }
        }
        return notice(options.message, options.duration, type, options.isBackground)
    }

    public config(options: MessageDefaults) {
        if (options.top || options.top === 0) {
            defaults.top = options.top
        }
        if (options.duration || options.duration === 0) {
            defaults.duration = options.duration
        }
    }

    private destroy() {
        const instance: any = getMessageInstance()
        messageInstance = null
        instance.closeAll()
        setTimeout(() => {
            document.body.removeChild((document.querySelector('.notification') as any))
        }, 500)
    }
}

export default new Notice()
