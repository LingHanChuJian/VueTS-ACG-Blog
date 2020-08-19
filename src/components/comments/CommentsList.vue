<template lang="pug">
    ul(:class="[prefixCls + '-wrap', isChildren ? prefixCls + '-children' : '']")
        li(v-for="item in data" :key="item.id")
            section(:class="[prefixCls + '-container']")
                div(:class="[prefixCls + '-information']")
                    div(:class="[prefixCls + '-information-avatar']")
                        a(v-if="item.user.site" :href="item.user.site")
                            img(v-lazy="item.user.image")
                        img(v-else v-lazy="item.user.image")
                    div(:class="[prefixCls + '-information-meta']")
                        div(:class="[prefixCls + '-information-author']")
                            span(v-if="item.user.isAuthor") 博主
                            span {{ item.user.userName }}
                        div(:class="[prefixCls + '-information-description']")
                            span(:class="[prefixCls + '-information-description-time']") {{ item.create | diff }}
                            span(:class="[prefixCls + '-information-description-useragent']")
                            span(:class="[prefixCls + '-information-description-location']") 来自: {{ item.location }}
                    div(:class="[prefixCls + '-information-reply']") reply
                div(:class="[prefixCls + '-body']")
                    Markdown(:content="item.content")
                comments-reply(:parent="item.user.id")
                tree-comments-list(v-if="!!item.children" isChildren :data="item.children")
</template>

<script lang="ts">
import { Comments } from '@/types/components'
import Markdown from '@/components/Markdown.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import CommentsReply from '@/components/comments/CommentsReply.vue'

@Component({
    components: {
        Markdown,
    },
})
export default class CommentsList extends Vue {
    @Prop({
        type: Object,
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
}
</script>

<style lang="stylus" scoped>
.comments-list-wrap
    position relative
</style>
