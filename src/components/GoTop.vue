<template lang="pug">
    div(@click="setScrollTop" :class="wrapClasses")
</template>

<script lang="ts">
import nprogress, { NProgress } from 'nprogress'
import { WrapClasses } from '@/types/components'
import ScrollMixins from '@/components/mixins/scroll'
import { scrollTop, clientHeight, scrollHeight } from '@/utils'
import { Component, Mixins, Watch, Vue } from 'vue-property-decorator'

/**
 *  @bug 刷新bug  依然会自增长 试过三种方案 无法解决
 */
nprogress.configure({ trickle: false, showSpinner: false, minimum: 0 })

@Component
export default class GoTop extends Mixins(ScrollMixins) {
    private prefixCls: string = 'scroll'

    private isMove: boolean = false

    private setScrollTop(): void {
        const timer: number = setInterval(() => {
            this.scrollTop = scrollTop()
            scrollTop() <= 0 ? clearInterval(timer) : scrollBy(0, -50)
        }, 10)
    }

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            'scroll-image',
            this.isMove ? 'move-scroll-image' : '',
        ]
    }

    @Watch('scrollTop')
    private onOffsetTopChange(newValue: number, oldValue: number) {
        const result: number = Math.round((newValue > 50 ? newValue : 0) / (scrollHeight() - clientHeight()) * 100) / 100
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
    transition bottom .5s ease-in-out
    z-index 99

@media screen and (min-width 860px)
    .scroll-image
        bottom 950px
        right 25px
        height 900px
        width 70px
        background url(./../assets/images/scroll.png) no-repeat center
        animation bounce 2s linear infinite

    .move-scroll-image
        bottom 50px

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
