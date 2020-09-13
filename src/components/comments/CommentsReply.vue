<template lang="pug">
    div(:class="[prefixCls + '-wrap']")
        |  这是评论
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CommentsReply extends Vue {
    @Prop({ type: String, default: ''})
    private name!: string

    private prefixCls: string = 'comments-reply'

}
</script>

<style lang="stylus" scoped>

</style>
