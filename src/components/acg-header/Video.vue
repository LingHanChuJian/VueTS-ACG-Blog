<template lang="pug">
    video(
        :class="wrapClasses"
        :style="videoStyles"
        ref="video"
        :width="width"
        :height="height"
        :poster="poster"
    ) 浏览器不支持 video 标签
</template>

<script lang="ts">
import Hls from 'hls.js'
import { addEvent, removeEvent } from '@/utils'
import { CSSStyles, WrapClasses } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Video extends Vue {
    @Prop({ type: String, default: '' })
    private src!: string

    @Prop({ type: String, default: '' })
    private poster!: string

    @Prop({ type: [Number, String], default: 'auto' })
    private width!: number | string

    @Prop({ type: [Number, String], default: 'auto' })
    private height!: number | string

    private prefixCls: string = 'video'

    private hls?: Hls

    /**
     * @var status  当前状态 init 初始化  finished 初始化完成  error hls 不支持
     */
    private status: string = 'init'

    public play(): void {
        if (this.status === 'init') { this.handleVideo(this.play2) }
        if (this.status === 'finished') { this.play2() }
    }

    public pause(): void {
        (this.$refs.video as HTMLVideoElement).pause()
    }

    private play2(): void {
        (this.$refs.video as HTMLVideoElement).play()
    }

    private handleVideo(callback: () => void): void {
        this.status = 'finished'
        const video: HTMLVideoElement = (this.$refs.video as HTMLVideoElement)
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = this.src
            addEvent(video, 'loadedmetadata', callback)
            return
        }
        if (Hls.isSupported()) {
            this.hls = new Hls()
            this.hls.attachMedia(video)
            this.hls.loadSource(this.src)
            this.hls.on(Hls.Events.MANIFEST_PARSED, callback)
        } else {
            this.$emit('hls-error')
            this.status = 'error'
        }
    }

    private ended(): void {
        this.$emit('ended')
    }

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }

    private get videoStyles(): CSSStyles<CSSStyleDeclaration> {
        const styles: CSSStyles<CSSStyleDeclaration> = {}
        styles.width = '100%'
        return styles
    }

    private mounted() {
        addEvent((this.$refs.video as HTMLVideoElement), 'ended', this.ended)
    }

    private beforeDestroy() {
        const video: HTMLVideoElement = (this.$refs.video as HTMLVideoElement)
        if (this.hls) { this.hls.destroy() }
        if (video.canPlayType('application/vnd.apple.mpegurl')) { removeEvent(video, 'loadedmetadata', this.play2) }
        removeEvent(video, 'ended', this.ended)
    }
}
</script>
