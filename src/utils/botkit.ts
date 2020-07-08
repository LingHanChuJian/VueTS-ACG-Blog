// 凌寒初见 机器人
import { Botkit, BotkitMessage } from '@/types/utils'
import { addStore, getStore, randomCharacter } from '@/utils'


export default class BotkitHelper implements Botkit {

    public static instance?: BotkitHelper
    public static getInstance(wsUrl: string) {
        if (!this.instance) {
            this.instance = new BotkitHelper(wsUrl)
        }
        return this.instance
    }

    private wsUrl: string
    private socket: WebSocket
    private maxReconnect: number = 3
    private reconnectCount: number = 0
    private reconnectTimeout: number = 3000
    private connectEvent: string = 'welcome_back'

    constructor(wsUrl: string) {
        this.wsUrl = wsUrl
        this.socket = new WebSocket(wsUrl)
        this.monitor()
    }

    public getSocket(): WebSocket {
        return this.socket
    }

    public send(text: string): void {
        const message: BotkitMessage = {
            type: 'message',
            text,
            user: this.UUID,
            channel: 'websocket',
        }

        this.socket.send(JSON.stringify(message))
    }

    public close(): void {
        this.socket.removeEventListener('close', this.reconnect)
        this.socket.close()
    }

    private monitor(): void {
        this.socket.addEventListener('open', this.open)

        this.socket.addEventListener('close', this.reconnect)
    }

    private open() {
        this.reconnectCount = 0
        const message: BotkitMessage = {
            type: this.connectEvent,
            channel: 'socket',
            user: this.UUID,
            user_profile: null,
        }
        this.send(JSON.stringify(message))
    }

    // 重新连接
    private reconnect() {
        if (this.reconnectCount < this.maxReconnect) {
            setTimeout(() => {
                this.reconnectCount += 1
                BotkitHelper.instance = new BotkitHelper(this.wsUrl)
            }, this.reconnectTimeout)
        }
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
