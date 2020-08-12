// 凌寒初见 机器人
import { Botkit, BotkitMessage, BotkitOptions } from '@/types/utils'
import { addStore, getStore, randomCharacter } from '@/utils'


export default class BotkitHelper implements Botkit {
    public static instance?: BotkitHelper
    public static getInstance(options: BotkitOptions): BotkitHelper {
        if (!this.instance) {
            this.instance = new BotkitHelper(options)
        }
        return this.instance
    }

    public static isSocket(): boolean {
        return typeof WebSocket !== undefined
    }

    private socket: WebSocket
    private options: BotkitOptions
    private maxReconnect: number = 3
    private reconnectCount: number = 0
    private reconnectTimeout: number = 3000
    private connectEvent: string = 'welcome_back'

    constructor(options: BotkitOptions) {
        this.options = options
        this.socket = new WebSocket(options.wsUrl)
        this.monitor()
    }

    public getSocket(): WebSocket {
        return this.socket
    }

    public send(text: string | BotkitMessage): void {
        const message: BotkitMessage = typeof text === 'object' ? text : { type: 'message', text, user: this.UUID, channel: 'socket' }
        this.socket.send(JSON.stringify(message))
    }

    public close(): void {
        this.socket.removeEventListener('open', this.open.bind(this))
        this.socket.removeEventListener('message', this.options.onMessage)
        this.socket.removeEventListener('error', this.options.onError)
        this.socket.removeEventListener('close', this.reconnect.bind(this))
        this.socket.close()
    }

    private monitor(): void {
        this.socket.addEventListener('open', this.open.bind(this))
        this.socket.addEventListener('message', this.options.onMessage)
        this.socket.addEventListener('error', this.options.onError)
        this.socket.addEventListener('close', this.reconnect.bind(this))
    }

    private open(event: Event) {
        this.reconnectCount = 0
        const message: BotkitMessage = {
            type: this.connectEvent,
            channel: 'socket',
            user: this.UUID,
            user_profile: null,
        }
        this.send(message)
        if (this.options.onOpen) { this.options.onOpen(event) }
    }

    // 重新连接
    private reconnect(event: CloseEvent) {
        if (this.reconnectCount < this.maxReconnect) {
            setTimeout(() => {
                this.reconnectCount += 1
                BotkitHelper.instance = new BotkitHelper(this.options)
            }, this.reconnectTimeout)
        }
        if (this.options.onClose) { this.options.onClose(event) }
    }

    private get UUID(): string {
        let botkitUUID: string = ''
        const UUIDStore: string | null = getStore('botkit-uuid')

        if (!UUIDStore) {
            botkitUUID += randomCharacter()
            for (let i = 0, len = 4; i < len; i++) {
                botkitUUID += `${randomCharacter()}-${randomCharacter()}`
            }
            botkitUUID += randomCharacter()
            addStore('botkit-uuid', botkitUUID)

            this.connectEvent = 'hello'
        }

        return UUIDStore ? UUIDStore : botkitUUID
    }
}
