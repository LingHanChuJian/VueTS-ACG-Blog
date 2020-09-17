<template lang="pug">
    CollapseTransition(appear)
        div(v-show="opened" :class="[prefixCls + '-wrap']")
            div(v-if="!!parent" :class="[prefixCls + '-cancel']" @click="cancelReplyClick") Cancel Reply
            p(:class="[prefixCls + '-description']")
                Icon(type="markdown")
                | &nbsp;Markdown Supported while&nbsp;
                Icon(type="code")
                | &nbsp;Forbidden
            div(:class="[prefixCls + '-textarea']")
                Input(v-model="comments" type="textarea" :rows="6" auto placeholder="你是我一生只会遇见一次的惊喜 ...")
            div(:class="[prefixCls + '-expression']")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import EmitterMixins from '@/components/mixins/emitter'
import CollapseTransition from '@/components/base/collapseTransition'
import { Component, Prop, Inject, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
        Input,
        CollapseTransition,
    },
})
export default class CommentsReply extends Mixins(EmitterMixins) {
    @Inject('accordion')
    private readonly accordion!: boolean

    @Prop({ type: [Number, String], default: ''})
    private parent!: number | string

    private opened: boolean = false

    private prefixCls: string = 'comments-reply'

    private comments: string = ''

    private show(parent: number | string = ''): void {
        const isCurCommentsReply: boolean = this.parent === parent
        this.opened = this.accordion ? isCurCommentsReply : isCurCommentsReply ? isCurCommentsReply : this.opened
    }

    private cancelReplyClick(): void {
        this.opened = false
        this.dispatch('Comments', 'on-reply', '')
    }

    private mounted() {
        this.$on('on-reply-show', (parent: number | string) => this.show(parent))
        this.opened = this.parent === ''
    }
}
</script>

<style lang="stylus" scoped>
.comments-reply-wrap
    margin 20px 0
    position relative

.comments-reply-cancel
    margin-bottom 15px
    background-color #f4f6f8
    border-radius 3px
    padding 12px 20px
    color #454545
    display inline-block
    cursor pointer

.comments-reply-description
    margin-bottom 20px  
</style>
