<template lang="pug">
    div.header-container(:style="headerContainerStyle")
        Information(mode="horizontal" :isPlayer="isPlayer")
        div.player-container
            VideoPlayer(
                ref="dplayer"
                :style="{ zIndex: isShowPlayer? '5' : '-5'  }"
                :src="videoPlayerLink"
                @ended="videoPlayerEnded"
            )
            transition(name="player-message")
                div.player-message(v-show="playerMessage") {{ playerMessage }}
            Icon.player-icon(:type="playerIcon" size="32" @click="videoPlayerIconClick")
</template>

<script lang="ts">
import DPlayer from 'dplayer'
import { oneOf } from '@/utils'
import { Icon } from '@/components/icon'
import { videoPlayerLink } from '@/config'
import { Information } from '@/components/nav'
import AdaptiveMixins from '@/components/mixins/adaptive'
import { CSSStyles, UserInformation } from '@/types/components'
import VideoPlayer from '@/components/acg-header/VideoPlayer.vue'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
        VideoPlayer,
        Information,
    },
})
export default class AcgHeader extends Mixins(AdaptiveMixins) {
    private videoPlayerLink: string = videoPlayerLink

    private playerIcon: string = 'play-circle'

    private playerMessage: string = ''

    // player是否暂停
    private isPlayer: boolean = false

    // player是否显示
    private isShowPlayer: boolean = false

    private videoPlayerIconClick(): void {
        const dp: DPlayer | undefined = (this.$refs.dplayer as VideoPlayer).getDPlayer()
        if (!dp) { return }
        this.isShowPlayer = true
        this.isPlayer = dp.video.paused
        this.playerIcon = !dp.video.paused ? 'play-circle' : 'pause-circle'
        this.playerMessage = !dp.video.paused ? '已暂停' : ''
        dp.toggle()
    }

    private videoPlayerEnded(): void {
        const dp: DPlayer | undefined = (this.$refs.dplayer as VideoPlayer).getDPlayer()
        if (!dp) { return }
        dp.pause()
        this.isShowPlayer = false
        this.isPlayer = false
        this.playerIcon = 'play-circle'
    }

    private get headerContainerStyle(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration> = {}
        style.height = `${this.clientHeight}px`
        return style
    }

}
</script>

<style lang="stylus" scoped>
.header-container
    position relative
    overflow hidden
    animation animation-header-container 1s ease-in-out

.player-container
    top 0
    position absolute
    overflow hidden
    height 100%
    width 100%

.player-icon
    position absolute
    right 10px
    bottom 10px
    z-index 10
    cursor pointer
    color #FFFFFF
    animation animation-player-icon 0.5s linear infinite alternate

.player-message
    position absolute
    left 0
    right 0
    bottom 0
    height auto
    padding 12px 0
    text-align center
    z-index 5
    color #FFFFFF
    background-color rgba(0, 0, 0, 0.8)
    line-height initial
    font-size 18px

.player-message-enter-active
.player-message-leave-active
    transition bottom .3s

.player-message-enter
.player-message-leave-to
    bottom -30px

@keyframes animation-header-container
    0%
        transform translateY(-50px)
        opacity 0
    100%
        transform translateY(0)
        opacity 1

@keyframes animation-player-icon
    0%
        transform translateY(0)
    50%
        transform translateY(-3px)
    100%
        transform translateY(0)

@media screen and (max-width 860px)
    .player-icon
        display none
</style>
