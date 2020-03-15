<template lang="pug">
    div(@click="setScrollTop" :class="wrapClasses")
</template>

<script lang="ts">
import nprogress from 'nprogress'
import Scroll from '@/components/mixins/scroll'
import { WrapClasses } from '@/types/components'
import { Component, Mixins, Watch, Vue } from 'vue-property-decorator'

nprogress.configure({ trickle: false, showSpinner: false, minimum: 0 })

@Component
export default class GoTop extends Mixins(Scroll) {
    private prefixCls: string = 'scroll'

    private isMove: boolean = false

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            'scroll-image',
            this.isMove ? 'move-scroll-image' : '',
        ]
    }

    private setScrollTop(): void {
        const timer: number = setInterval(() => {
            const curScrollTop: number = document.documentElement.scrollTop || document.body.scrollTop
            this.scrollTop = curScrollTop
            curScrollTop <= 0 ? clearInterval(timer) : scrollBy(0, -50)
        }, 10)
    }

    @Watch('scrollTop')
    private onOffsetTopChange(value: number, newValue: number) {
        const result: number = Math.round((newValue > 50 ? newValue : 0) / (this.scrollHeight() - this.windowHeight()) * 100) / 100
        result >= 1 ? nprogress.set(.99) : nprogress.set(result)
        newValue > 50 ? this.isMove = true : this.isMove = false
    }
}
</script>

<style lang="stylus" scoped>
.scroll
    position fixed
    cursor pointer
    background-size contain
    transition all .5s ease-in-out

@media screen and (min-width 860px)
    .scroll-image
        top -900px
        right 25px
        height 900px
        width 70px
        background url(./../assets/images/scroll.png) no-repeat center
        animation bounce 2s linear infinite

    .move-scroll-image
        top -200px

@media screen and (max-width 860px)
    .scroll-image
        bottom -100px
        right 0
        width 48px
        height 48px
        background url(./../assets/images/mb_scroll.png) no-repeat center
        background-size 48px

    .move-scroll-image
        bottom 25px

@keyframes bounce
  0%
    transform translateY(0)
  50%
    transform translateY(-6px)
  100%
    transform translateY(0)

</style>
