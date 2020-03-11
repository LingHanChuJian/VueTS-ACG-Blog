<template lang="pug">
    div.scroll-image(@click="setScrollTop" :class="wrapClasses")
</template>

<script lang="ts">
import nprogress from 'nprogress'
import { WrapClasses } from '@/types/components'
import Scroll from '@/components/mixins/scroll'
import { Component, Mixins, Watch, Vue } from 'vue-property-decorator'

nprogress.configure({ trickle: false, showSpinner: false })

@Component
export default class GoTop extends Mixins(Scroll) {
    private prefixCls: string = 'go-top'

    private isMove: boolean = true

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            this.isMove ? 'move-scroll-image' : '',
        ]
    }

    private setScrollTop(): void {
        const timer: number = setInterval(() => {
            const curScrollTop: number = document.documentElement.scrollTop || document.body.scrollTop
            scrollTo(0, curScrollTop - 100)
            if (curScrollTop <= 0) {
                nprogress.set(0)
                clearInterval(timer)
            }
        }, 10)
    }

    @Watch('offsetTop')
    private onOffsetTopChange(value: number, newValue: number) {
        const result: number = newValue / (this.scrollHeight - this.windowHeight)
        console.log(newValue, Math.round(result * 100) / 100)
        result >= 1 ? nprogress.set(.99) : nprogress.set(Math.round(result * 100) / 100)
        newValue > 50 ? this.isMove = true : this.isMove = false
    }
}
</script>

<style lang="stylus" scoped>
.go-top
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
        background url(./../assets/images/goTop.png) no-repeat center

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
