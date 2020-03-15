<template lang="pug">
    div(:class="wrapClasses")
        Message(
            v-for="notice in notices"
            :key="notice.name"
            :messgae="notice.message"
            :duration="notice.duration"
            :type="notice.type"
            :isBackground="notice.isBackground"
        )
</template>

<script lang="ts">
import UUID from '@/components/mixins/uuid'
import Message from '@/components/message/Message.vue'
import { WrapClasses, Options, Render } from '@/types/components'
import { Component, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Message,
    },
})
export default class Notification extends Mixins(UUID) {
    private prefixCls: string = 'notification'

    private notices: Options[] = []

    private add(notice: Options) {
        const name = notice.name || (this as any).uuid
        const curNotice: Options = Object.assign({ message: '', name, duration: 1.5, type: 'info', isBackground: true }, notice)
        this.notices.push(curNotice)
    }

    private close(name: string) {
        const notices: Options[] = this.notices
        for (let i = 0; i < notices.length; i++) {
            if (notices[i].name === name) {
                this.notices.splice(i, 1)
                break
            }
        }
    }

    private closeAll() {
        this.notices = []
    }

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }
}
</script>
