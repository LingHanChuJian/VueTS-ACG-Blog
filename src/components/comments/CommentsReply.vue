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
                Input(
                    v-model="comments"
                    ref="input"
                    type="textarea"
                    auto
                    :rows="9"
                    placeholder="你是我一生只会遇见一次的惊喜 ..."
                    @on-change="onInputChange"
                )
            div(:class="[prefixCls + '-expression']")
                CommentExpression(@on-expression-mark-click="onExpressionMarkClick")
            div(:class="[prefixCls + '-submit']")
                div(:class="[prefixCls + '-user']")
                    div(:class="[prefixCls + '-user-avatar']")
                        img(src="")
                    div(:class="[prefixCls + '-user-name']")
                        //- Poptip()
                        //-     Input(v-model="" placeholder="昵称(必须 Name*)")
                    div(:class="[prefixCls + '-user-email']")
                    div(:class="[prefixCls + '-user-site']")
                div(:class="[prefixCls + '-action']")
                    div BiuBiuBiu~
                    div 上传
                    div 预览
                div(:class="[prefixCls + '-login']")
                    div(:class="[prefixCls + '-login-description']") 第三方登录
                    div(:class="[prefixCls + '-login-method']")
                        //- div(v-for="item, index in loginMethod" :key="index")
                        //-     a(:href="item.href")
                                //- Icon(type="")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { Poptip } from '@/components/poptip'
import EmitterMixins from '@/components/mixins/emitter'
import { activatePowerMode } from '@/utils/activatePowerMode'
import CollapseTransition from '@/components/base/collapseTransition'
import CommentExpression from '@/components/comments/CommentExpression.vue'
import { Component, Prop, Inject, Mixins, Vue } from 'vue-property-decorator'

@Component({
    name: 'CommentsReply',
    components: {
        Icon,
        Input,
        Poptip,
        CollapseTransition,
        CommentExpression,
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

    private onInputChange(): void {
        activatePowerMode()
    }

    private onExpressionMarkClick(value: string): void {
        const startPosition: number | null =  (this.$refs.input as Input).getCurElement().selectionStart
        const endPosition: number | null = (this.$refs.input as Input).getCurElement().selectionEnd
        if (typeof startPosition === 'number' && typeof endPosition === 'number') {
            this.comments = this.comments.substring(0, startPosition) + value + this.comments.substring(endPosition, this.comments.length)
        } else {
            this.comments += value
        }
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

.comments-reply-textarea
    min-height 180px
    margin-bottom 20px

.comments-reply-description
    margin-bottom 20px

.comments-reply-user
    display flex

.comments-reply-user-avatar
    margin 0 auto
    width 64px
    height 64px

</style>
