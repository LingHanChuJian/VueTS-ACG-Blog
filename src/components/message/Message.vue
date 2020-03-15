<template lang="pug">
    transition(name="move-up" apper)
        div(:class="wrapClasses" :style="styles")
            div(:class="[prefixCls + '-content']")
                div(v-if="!isFun(message)" v-html="message")
                Expand(v-else :inRender="message")
</template>

<script lang="ts">
import Expand from '@/components/base/expand'
import { typeOf, oneOf } from '@/utils/assist'
import { WrapClasses, Options, Render, CSSStyles } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Expand,
    },
})
export default class Message extends Vue {
    @Prop({ type: String })
    private transitionName!: string

    @Prop({ type: [String, Function], default: '' })
    private message!: string | Render

    @Prop({ type: Number, default: 1.5 })
    private duration!: number

    @Prop({ type: Boolean, default: true })
    private isBackground!: boolean

    @Prop({
        type: String,
        default: 'info',
        validator(value: string) {
            return oneOf(value, ['info', 'success', 'warning', 'error'])
        },
    })
    private type!: string

    @Prop({
        type: Object,
        default() {
            return {
                right: '50%',
            }
        },
    })
    private styles!: CSSStyles<CSSStyleDeclaration>

    private prefixCls: string = 'message'

    private closeTimer: number | null = null

    private isFun(value: any): boolean {
        return typeOf(value) === 'function'
    }

    private clearCloseTimer(): void {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer)
            this.closeTimer = null
        }
    }

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            this.isBackground ? this.prefixCls + '-' + this.type : '',
        ]
    }

    private mounted() {
        if (this.duration !== 0) {
            this.closeTimer = setTimeout(() => {
                this.clearCloseTimer()
            }, this.duration * 1000)
        }
    }

    private beforeDestroy() {
        this.clearCloseTimer()
    }
}
</script>
