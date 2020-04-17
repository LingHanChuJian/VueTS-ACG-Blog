<template lang="pug">
    div.header-container(:style="headerContainerStyle")
        Information(
            mode="vertical"
            :userInformation="userInformation"
            title="Hi,Wanderer!"
            description="心若没有归处, 哪里都时流浪"
        )
        div.player-container
            Player(
                ref="dplayer"
                :style="{ zIndex: isShowPlayer? '5' : '-5'  }"
                src="http://img.cdn.myrove.cn/test/video.m3u8"
                @ended="playerEnded"
            )
            transition(name="player-message")
                div.player-message(v-show="playerMessage") {{ playerMessage }}
            Icon.player-icon(:type="playerIcon" size="32" @click="playerIconClick")
</template>

<script lang="ts">
import DPlayer from 'dplayer'
import { oneOf } from '@/utils'
import { Icon } from '@/components/icon'
import { Information } from '@/components/nav'
import Player from '@/components/acg-header/Player.vue'
import AdaptiveMixins from '@/components/mixins/adaptive'
import { CSSStyles, UserInformation } from '@/types/components'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Player,
        Icon,
        Information,
    },
})
export default class AcgHeader extends Mixins(AdaptiveMixins) {
    @Prop({
        type: String,
        default: 'acg-header',
        validator(value: string) {
            return oneOf(value, ['acg-header', 'blog-header'])
        },
    })
    private name!: string

    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private userInformation!: UserInformation[]

    private playerIcon: string = 'play-circle'

    private playerMessage: string = ''

    private isShowPlayer: boolean = false

    private playerIconClick(): void {
        const dp: DPlayer | undefined = (this.$refs.dplayer as Player).getDPlayer()
        if (!dp) { return }
        this.isShowPlayer = true
        this.playerIcon = !dp.video.paused ? 'play-circle' : 'pause-circle'
        this.playerMessage = !dp.video.paused ? '已暂停' : ''
        dp.toggle()
    }

    private playerEnded(): void {
        const dp: DPlayer | undefined = (this.$refs.dplayer as Player).getDPlayer()
        if (!dp) { return }
        dp.pause()
        this.isShowPlayer = false
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
    line-height unset
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
</style>
