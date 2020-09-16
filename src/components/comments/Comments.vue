<template lang="pug">
    section(:id="prefixCls" :class="[prefixCls + '-wrap']")
        h3 Comments | {{ data.total === 0 ? 'NOTHING' : `${data.total} 评论数` }}
        div(v-if="data.total !== 0" :class="[prefixCls + '-container']")
            comments-list(:data="data.comments")
        div(:class="[prefixCls + '-reply-wrap']")
            comments-reply
</template>

<script lang="ts">
import { UserComments } from '@/types/components'
import EmitterMixins from '@/components/mixins/emitter'
import CommentsList from '@/components/comments/CommentsList.vue'
import CommentsReply from '@/components/comments/CommentsReply.vue'
import { Component, Prop, Provide, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        CommentsList,
        CommentsReply,
    },
})
export default class Comments extends Mixins(EmitterMixins) {
    @Prop({
        type: Object,
        default() {
            return {}
        },
    })
    private data!: UserComments

    // 是否开启回复手风琴效果
    @Prop({ type: Boolean, default: true })
    private accordion!: boolean

    @Provide('accordion')
    private isAccordion: boolean = this.accordion

    private prefixCls: string = 'comments'

    private mounted() {
        this.$on('on-reply', (parent: number | string) => this.broadcast('CommentsReply', 'on-reply-show', parent))
    }
}
</script>

<style lang="stylus" scoped>

</style>
