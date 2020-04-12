<template lang="pug">
    div.header-container(:style="headerContainerStyle")
        Information(mode="vertical")
        div.video-container
            Video(ref="video" src="http://img.cdn.myrove.cn/test/video.m3u8" @ended="videoEnded" @hls-error="hlsError")
            div.video-message {{ videoMessage }}
            Icon.video-icon(:type="videoIcon" size="32" @click="videoIconClick")
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { Icon } from '@/components/icon'
import { Information } from '@/components/nav'
import Video from '@/components/acg-header/Video.vue'
import AdaptiveMixins from '@/components/mixins/adaptive'
import { CSSStyles, UserInformation } from '@/types/components'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Video,
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

    private videoIcon: string = 'play-circle'

    private videoMessage: string = ''

    private videoIconClick(): void {
        if (this.videoIcon === 'play-circle') {
            (this.$refs.video as Video).play()
            this.videoIcon = 'pause-circle'
        } else {
            (this.$refs.video as Video).pause()
            this.videoIcon = 'play-circle'
        }
    }

    private videoEnded(): void {
        console.log('videoEnded')
    }

    private hlsError(): void {
        console.log('hlsError')
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

.video-container
    top 0
    position absolute
    overflow hidden
    height 100%
    width 100%

.video-icon
    position absolute
    right 10px
    bottom 10px
    z-index 10
    cursor pointer
    animation animation-video-icon 0.5s linear infinite alternate

@keyframes animation-header-container
    0%
        transform translateY(-50px)
        opacity 0
    100%
        transform translateY(0)
        opacity 1

@keyframes animation-video-icon
    0%
        transform translateY(0)
    50%
        transform translateY(-3px)
    100%
        transform translateY(0)
</style>
