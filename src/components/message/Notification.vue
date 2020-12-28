<template lang="pug">
    transition-group(
        tag="div"
        name="move-up"
        apper
        :class="prefixCls"
        :style="styles"
        @enter="handleEnter"
        @leave="handleLeave"
    )
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
import UUIDMixins from '@/components/mixins/uuid'
import Message from '@/components/message/Message.vue'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'
import { WrapClasses, MessageOptions, Render, CSSStyles } from '@/types/components'

@Component({
    name: 'Notification',
    components: {
        Message,
    },
})
export default class Notification extends Mixins(UUIDMixins) {
    @Prop({
        type: Object,
        default() {
            return {}
        },
    })
    private styles!: CSSStyles<CSSStyleDeclaration>

    private prefixCls: string = 'notification'

    private notices: MessageOptions[] = []

    public add(notice: MessageOptions): void {
        const name = notice.name || (this as any).uuid
        const curNotice: MessageOptions = Object.assign({ message: '', name, duration: 1.5, type: 'info', isBackground: true }, notice)
        this.notices.push(curNotice)
    }

    public close(name: string): void {
        const notices: MessageOptions[] = this.notices
        for (let i = 0; i < notices.length; i++) {
            if (notices[i].name === name) {
                this.notices.splice(i, 1)
                break
            }
        }
    }

    public closeAll(): void {
        this.notices = []
    }

    private handleEnter(el: HTMLElement): void {
        el.style.height = `${el.scrollHeight}px`
    }

    private handleLeave(el: HTMLElement): void {
        el.style.height = '0'
        el.style.paddingTop = '0'
        el.style.paddingBottom = '0'
    }
}
</script>
