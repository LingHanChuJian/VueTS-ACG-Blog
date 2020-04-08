<template lang="pug">
    header
        Video(ref="video" src="http://img.cdn.myrove.cn/test/video.m3u8" @ended="videoEnded" @hls-error="hlsError")
        Icon(type="play-circle" size="32" @click="videoClick")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import Video from '@/components/acg-header/Video.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Video,
        Icon,
    },
})
export default class AcgHeader extends Vue {
    private videoClick(): void {
        (this.$refs.video as Video).play()
    }

    private videoEnded(): void {
        console.log('videoEnded')
    }

    private hlsError(): void {
        console.log('hlsError')
    }

}
</script>