<template lang="pug">
    div(
        :class="wrapClasses"
        ref="dplayer"
    )
</template>

<script lang="ts">
import Hls from 'hls.js'
import { WrapClasses, Properties } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'
import DPlayer, { DPlayerOptions, DPlayerEvents, VideoType } from 'dplayer'

@Component
export default class Player extends Vue {
    @Prop({ type: String, default: '' })
    private src!: string

    @Prop({ type: String, default: 'customHls' })
    private type!: VideoType | string

    @Prop({ type: String, default: '' })
    private poster!: string

    @Prop({ type: String, default: '#282c34' })
    private theme!: string

    @Prop({ type: Boolean, default: false })
    private hotkey!: boolean

    @Prop({
        type: Object,
        default() {
            return {}
        },
    })
    private options!: DPlayerOptions

    private prefixCls: string = 'dplayer-wrap'

    private dp?: DPlayer

    private events: DPlayerEvents[] = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error',
    'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play', 'playing', 'progress', 'ratechange',
    'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting', 'screenshot', 'thumbnails_show',
    'thumbnails_hide', 'danmaku_show', 'danmaku_hide', 'danmaku_clear', 'danmaku_loaded', 'danmaku_send', 'danmaku_opacity',
    'contextmenu_show', 'contextmenu_hide', 'notice_show', 'notice_hide', 'quality_start', 'quality_end', 'destroy', 'resize',
    'fullscreen', 'fullscreen_cancel', 'subtitle_show', 'subtitle_hide', 'subtitle_change']

    public getDPlayer(): DPlayer | undefined {
        return this.dp
    }

    private createDPlayer(): void {
        const options: DPlayerOptions = Object.assign(this.options, {
            container: this.$refs.dplayer,
            theme: this.theme,
            hotkey: this.hotkey,
            video: {
                url: this.src,
                pic: this.poster,
                type: this.type,
                customType: {
                    customHls: (video: HTMLVideoElement) => {
                        const hls: Hls = new Hls()
                        hls.loadSource(video.src)
                        hls.attachMedia(video)
                    },
                },
            },
        })
        this.dp = new DPlayer(options)
    }

    private addDPlayerEventListener(): void {
        for (let i = 0, len = this.events.length; i < len; i++) {
            if (!this.dp) { return }
            this.dp.on(this.events[i], (...args) => this.$emit(this.events[i], ...args))
        }
    }

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }

    private mounted() {
        this.createDPlayer()
        this.addDPlayerEventListener()
    }

    private beforeDestroy() {
        if (this.dp) { this.dp.destroy() }
    }
}
</script>

<style lang="stylus" scoped>
.dplayer-wrap
    width 100%
    height 100%
</style>