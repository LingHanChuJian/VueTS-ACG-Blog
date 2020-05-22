<template lang="pug">
    div(:class="[prefixCls + '-wrap']")
        h3 Comments | 
            span(v-if="data.total !== 0") {{ data.total }} 评论数
        div(:class="[prefixCls + '-container']")
            comment-list(v-if="data.total !== 0" :data="data.comment")
            div(v-else) 暂无评论
</template>

<script lang="ts">
import { UserComments } from '@/types/components'
import CommentsList from '@/components/comments/List.vue'
import CommentsReply from '@/components/comments/Reply.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        CommentsList,
        CommentsReply,
    },
})
export default class Comments extends Vue {
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

    private prefixCls: string = 'comment'

}
</script>

<style lang="stylus" scoped>

</style>
