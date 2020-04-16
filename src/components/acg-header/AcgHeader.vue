<template lang="pug">
    div.header-container(:style="headerContainerStyle")
        Information(mode="vertical")
        div.player-container
            Player(ref="dplayer" src="http://img.cdn.myrove.cn/test/video.m3u8" @ended="playerEnded")
            div.player-message {{ playerMessage }}
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

    private playerIconClick(): void {
        this.playerIcon = this.playerIcon === 'play-circle' ? 'pause-circle' : 'play-circle'
        this.playerMessage = this.playerIcon === 'play-circle' ? '已暂停' : ''
        const dp: DPlayer | undefined = (this.$refs.dplayer as Player).getDPlayer()
        if (dp) { dp.toggle() }
    }

    private playerEnded(): void {
        this.playerIcon = 'play-circle'
        const dp: DPlayer | undefined = (this.$refs.dplayer as Player).getDPlayer()
        if (dp) { dp.pause() }
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
