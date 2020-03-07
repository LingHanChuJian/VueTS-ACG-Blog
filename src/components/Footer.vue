<template lang="pug">
    div.footer-center
        Icon.snow(type="snowflake" size="24")
        p &copy; 2019 · myrove · 凌寒初见
        p 月影流花花不语，梦入烟水水不兴
        p
            span.countenance (ง •̀_•́)ง
            | 网站存活 {{ liveTime }}
        p 托管于
            a(href='https://developer.qiniu.com' target='_blank') 七牛云
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class FooterCenter extends Vue {
    private timer: number = 0

    private liveTime: string = ''

    private mounted() {
        this.timer = setInterval(() => { this.liveTime = Vue.filter('computeLiveTime')('2019/8/20 00:00:00') })
    }

    private beforeDestroy() {
        if (this.timer) { clearInterval(this.timer) }
    }
}
</script>

<style lang="stylus" scoped>
.footer-center
    text-align center

.snow
    animation csnow 12s infinite linear

.countenance
    margin 0 5px
    display inline-block
    animation countenance 4s infinite ease-in-out

@keyframes csnow
  0%
    transform rotate(0deg)

  100%
    transform rotate(360deg)

@keyframes countenance
  2%, 24%, 80%
    transform translate(0, 1.5px) rotate(1.5deg)

  4%, 68%, 98%
    transform translate(0, -1.5px) rotate(-0.5deg)

  38%, 6%
    transform translate(0, 1.5px) rotate(-1.5deg)

  8%, 86%
    transform translate(0, -1.5px) rotate(-1.5deg)

  10%, 72%
    transform translate(0, 2.5px) rotate(1.5deg)

  12%, 64%, 78%, 96%
    transform translate(0, -0.5px) rotate(1.5deg)

  14%, 54%
    transform translate(0, -1.5px) rotate(1.5deg)

  16%
    transform translate(0, -0.5px) rotate(-1.5deg)

  18%, 22%
    transform translate(0, 0.5px) rotate(-1.5deg)

  20%, 36%, 46%
    transform translate(0, -1.5px) rotate(2.5deg)

  26%, 50%
    transform translate(0, 0.5px) rotate(0.5deg)

  28%
    transform translate(0, 0.5px) rotate(1.5deg)

  30%, 40%, 62%, 76%, 88%
    transform translate(0, -0.5px) rotate(2.5deg)

  32%, 34%, 66%
    transform translate(0, 1.5px) rotate(-0.5deg)

  42%
    transform translate(0, 2.5px) rotate(-1.5deg)

  44%, 70%
    transform translate(0, 1.5px) rotate(0.5deg)

  48%, 74%, 82%
    transform translate(0, -0.5px) rotate(0.5deg)

  52%, 56%, 60%
    transform translate(0, 2.5px) rotate(2.5deg)

  58%
    transform translate(0, 0.5px) rotate(2.5deg)

  84%
    transform translate(0, 1.5px) rotate(2.5deg)

  90%
    transform translate(0, 2.5px) rotate(-0.5deg)

  92%
    transform translate(0, 0.5px) rotate(-0.5deg)

  94%
    transform translate(0, 2.5px) rotate(0.5deg)

  0%, 100%
    transform translate(0, 0) rotate(0)

</style>