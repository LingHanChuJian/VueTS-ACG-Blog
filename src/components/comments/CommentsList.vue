<template lang="pug">
    ul(:class="[prefixCls + '-wrap', isChildren ? prefixCls + '-children' : '']")
        li(v-for="item in handleData" :key="item.id")
            section(:class="[prefixCls + '-container']")
                div(:class="[prefixCls + '-information']")
                    div(:class="[prefixCls + '-information-avatar']")
                        a(v-if="item.user.site" :href="item.user.site")
                            img(v-lazy="item.user.image")
                        img(v-else v-lazy="item.user.image")
                    div(:class="[prefixCls + '-information-meta']")
                        div(:class="[prefixCls + '-information-author']")
                            span(v-if="item.user.isAuthor" :class="[prefixCls + '-blogger']") 博主
                            span(v-if="item.user.mark" :class="[prefixCls + '-mark']") {{ item.user.mark }}
                            a(v-if="item.user.site" :href="item.user.site" :class="[prefixCls + '-username']") {{ item.user.userName }}
                            span(v-else :class="[prefixCls + '-username']") {{ item.user.userName }}
                        div(:class="[prefixCls + '-information-description']")
                            span(:class="[prefixCls + '-information-description-time']") 发布于 {{ item.create | diff }}
                            span(:class="[prefixCls + '-information-description-useragent']")
                                | (
                                img(:src="item.handleUserAgent.browserIcon")
                                | {{ item.handleUserAgent.browserTitle }} &nbsp;
                                img(:src="item.handleUserAgent.osIcon")
                                | {{ item.handleUserAgent.osTitle }}
                                | )
                            span(:class="[prefixCls + '-information-description-location']") 来自: {{ item.location }}
                    div(:class="[prefixCls + '-information-reply']" @click="replyClick(item.id)") reply
                div(:class="[prefixCls + '-body']")
                    Markdown(:content="item.content")
                comments-reply(:parent="item.id")
            comments-list(v-if="!!item.children" isChildren :data="item.children")
</template>

<script lang="ts">
import { Comments } from '@/types/components'
import { UserAgentParser } from '@/types/utils'
import Markdown from '@/components/Markdown.vue'
import { uaParser } from '@/utils/userAgentParser'
import EmitterMixins from '@/components/mixins/emitter'
import CommentsReply from '@/components/comments/CommentsReply.vue'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component({
    name: 'CommentsList',
    components: {
        Markdown,
        CommentsReply,
    },
})
export default class CommentsList extends Mixins(EmitterMixins) {
    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private data!: Comments[]

    @Prop({
        type: Boolean,
        default: false,
    })
    private isChildren!: boolean

    private prefixCls: string = 'comments-list'

    private handleUserAgent(commentsData: Comments[]): Comments[] {
        for (let i = 0, len = commentsData.length; i < len; i++) {
            const comments: Comments = commentsData[i]
            comments.handleUserAgent = uaParser(comments.userAgent)
            if (comments.children) { comments.children = this.handleUserAgent(comments.children) }
        }
        return commentsData
    }

    private replyClick(parent: number | string): void {
        this.dispatch('Comments', 'on-reply', parent)
    }

    private get handleData(): Comments[] {
        return this.handleUserAgent(this.data)
    }

}
</script>

<style lang="stylus" scoped>
.comments-list-wrap
    position relative
    li
        margin-top 30px
        height auto

.comments-list-children
    padding-left 40px

.comments-list-container:hover
    .comments-list-information-avatar
        img
            transform rotate(360deg)
    .comments-list-information-reply
        visibility visible

.comments-list-information
    display flex
    align-items center
    margin-bottom 15px

.comments-list-information-avatar
    margin-right 10px
    width 40px
    a
        display block
    img
        width 40px
        height 40px
        border-radius 100%
        box-shadow 0 1px 10px -6px rgba(0,0,0,.5)
        transform rotate(0)
        transition transform ease 1s

.comments-list-information-meta
    flex 1

.comments-list-information-author
    span:last-child
        color $font-color-hover
        font-weight 600

.comments-list-blogger
.comments-list-mark
    margin-right 3px
    padding 2px
    background-color $font-color-hover
    border 1px solid $font-color-hover
    color #FFFFFF
    font-size 14px
    vertical-align middle
    border-radius 3px

.comments-list-username
    vertical-align middle

.comments-list-information-description
    margin-top 8px
    font-size 13px
    color #515a6e
    span
        margin-right 5px
        line-height 15px

.comments-list-information-description-useragent
    vertical-align top
    img
        padding 0 2px
        width 14px
        height 14px
        vertical-align top

.comments-list-information-reply
    background-color $font-color-hover
    color #FFFFFF
    padding 3px
    text-transform uppercase
    cursor pointer
    border-radius 3px
    font-size 14px
    visibility hidden
    transition visibility .2s ease-out

.comments-list-body
    position relative
    border-bottom 1px dashed $font-color
    line-height 32px
</style>
