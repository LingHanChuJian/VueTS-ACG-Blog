// 凌寒初见 机器人
import { addStore, getStore, randomString } from '@/utils'

export const connect = (wsUrl: string) => {
    const socket = new WebSocket(wsUrl)

    let connectEvent: string = 'hello'

    const guid: string | null = getStore('botkit_guid')
    if (guid) {
        connectEvent = 'welcome_back'
    } else {
        let uuid: string = ''
        for (let i = 0, len = 4; i < len; i++) {
            uuid += `${randomString()}-${randomString()}`
        }
        addStore('botkit_guid', randomString() + uuid + randomString())
    }

    return socket
}


// 返送小时
export const send = () => {
    // s
}
