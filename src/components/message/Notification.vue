<template lang="pug">
    transition-group(name="move-up" @leave="handleLeave" apper :class="wrapClasses" :style="styles" tag="div")
        Message(
            v-for="notice in notices"
            :key="notice.name"
            :name="notice.name"
            :message="notice.message"
            :duration="notice.duration"
            :type="notice.type"
            :styles="notice.styles"
            :isBackground="notice.isBackground"
        )
</template>

<script lang="ts">
import UUID from '@/components/mixins/uuid'
import Message from '@/components/message/Message.vue'
import { WrapClasses, Options, Render, CSSStyles } from '@/types/components'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Message,
    },
})
export default class Notification extends Mixins(UUID) {
    @Prop({
        type: Object,
        default() {
            return {}
        },
    })
    private styles!: CSSStyles<CSSStyleDeclaration>

    private prefixCls: string = 'notification'

    private notices: Options[] = []

    public add(notice: Options) {
        const name = notice.name || (this as any).uuid
        const curNotice: Options = Object.assign({ message: '', name, duration: 1.5, type: 'info', isBackground: true }, notice)
        this.notices.push(curNotice)
    }

    public close(name: string) {
        const notices: Options[] = this.notices
        for (let i = 0; i < notices.length; i++) {
            if (notices[i].name === name) {
                this.notices.splice(i, 1)
                break
            }
        }
    }

    public closeAll() {
        this.notices = []
    }

    private handleLeave(el: HTMLElement): void {
        console.log('handleLeave')
    }

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }
}
</script>
