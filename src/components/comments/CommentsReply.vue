<template lang="pug">
    CollapseTransition(appear)
        div(v-show="opened" :class="[prefixCls + '-wrap']")
            div(v-if="!!parent" :class="[prefixCls + 'cancel']" @click="cancelReplyClick") Cancel Reply
            p(:class="[prefixCls + '-description']")
                Icon(type="markdown")
                | Markdown Supported while
                Icon(type="code")
                | Forbidden
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import EmitterMixins from '@/components/mixins/emitter'
import CollapseTransition from '@/components/base/collapseTransition'
import { Component, Prop, Inject, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
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

</style>
