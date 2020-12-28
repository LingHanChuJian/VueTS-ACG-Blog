<template lang="pug">
    article(:class="[prefixCls, prefixCls + '-article']" ref="article" v-html="content")
</template>

<script lang="ts">
import APlayer from 'aplayer'
import DPlayer from 'dplayer'
import { hljsCode } from '@/utils/markdown'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { handleAPlayer, destroyAPlayer } from '@/utils/aplayer'
import { handleDPlayer, destroyDPlayer } from '@/utils/dplayer'

import 'aplayer/dist/APlayer.min.css'
import 'highlight.js/styles/atom-one-light.css'

@Component({
    name: 'Markdown',
})
export default class Markdown extends Vue {
    @Prop({ type: String, default: ''})
    private content!: string

    private prefixCls: string = 'markdown'

    private musicPlayer: APlayer[] = []

    private videoPlayer: DPlayer[] = []

    private mounted() {
        this.$nextTick(async () => {
            hljsCode((this.$refs.article as HTMLElement))
            this.musicPlayer = await handleAPlayer((this.$refs.article as HTMLElement))
            this.videoPlayer = await handleDPlayer((this.$refs.article as HTMLElement))
        })
    }

    private beforeDestroy() {
        destroyAPlayer(this.musicPlayer)
        destroyDPlayer(this.videoPlayer)
    }
}
</script>

<style lang="stylus" scoped>
.markdown-article
    position relative
</style>
