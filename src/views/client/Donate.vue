<template lang="pug">
    main(:class="[prefixCls + '-wrap']")
        Markdown(:content="content")
        div(:class="[prefixCls + '-coffee']")
            a(:class="[prefixCls + '-github']" href="https://github.com/LingHanChuJian" target="_blank" title="github" :style="donateGithubStyles")
            div(:class="[prefixCls + '-icon']" :style="donateIconStyles") Donate
            ul(:class="[prefixCls + '-container']" :style="donateContainerStyles")
                li(v-for="item, index in donate" :key="index" :data-name="item.name.toLocaleLowerCase()" @click="item.fn ? item.fn(item) : handleDonateCoffee(item)")
            div(v-show="isDonateCoffee" :class="[prefixCls + '-image-container']" @click="donateCoffeeClick")
                div(:class="donateImageClasses" :style="donateImageStyles" ref="donateImage")
</template>

<script lang="ts">
import { donate } from '@/config'
import { addEvent, removeEvent } from '@/utils'
import { UserDonate } from '@/types/components'
import Markdown from '@/components/Markdown.vue'
import { Component, Vue } from 'vue-property-decorator'
import { WrapClasses, CSSStyles } from '@/types/components'

@Component({
    name: 'Donate',
    components: {
        Markdown,
    },
})
export default class Donate extends Vue {
    private prefixCls: string = 'donate'

    private isDonateCoffee: boolean = false

    private isAnimationDonateCoffee: boolean = this.isDonateCoffee

    private donateCoffeeImage: string = ''

    private content: string = '<p>如果喜欢我的博客，可以考虑请我喝杯咖啡~非常感激！<br> 网站所需的服务器和 CDN 都是不小的开支、日常维护也需要大量精力。 (,,• ₃ •,,)</p>'

    private donate: UserDonate[] = donate

    private handleDonateCoffee(item: UserDonate): void {
        if (item.link) { window.open(item.link, '_blank') }
        if (item.image) {
            this.donateCoffeeImage = item.image
            this.isDonateCoffee = true
            this.isAnimationDonateCoffee = true
        }
    }

    private handleAnimationend(): void {
        this.isDonateCoffee = this.isAnimationDonateCoffee
    }

    private donateCoffeeClick(): void {
        this.isAnimationDonateCoffee = false
        addEvent((this.$refs.donateImage as HTMLElement), 'animationend', this.handleAnimationend)
    }

    private get donateGithubStyles(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration>  = {}
        style.left = `calc(50% + ${Math.floor(this.donate.length * 75 / 2 - 10)}px)`
        return style
    }

    private get donateIconStyles(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration>  = {}
        style.left = `calc(50% - ${Math.floor(this.donate.length * 75 / 2 - 20)}px)`
        return style
    }

    private get donateContainerStyles(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration>  = {}
        style.left = `calc(50% - ${Math.floor(this.donate.length * 75 / 2)}px)`
        return style
    }

    private get donateImageClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-image`,
            this.isAnimationDonateCoffee ? `${this.prefixCls}-show` : `${this.prefixCls}-hide`,
        ]
    }

    private get donateImageStyles(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration>  = {}
        style.backgroundImage = `url(${this.donateCoffeeImage})`
        return style
    }

    private beforeDestroy() {
        removeEvent((this.$refs.donateImage as HTMLElement), 'animationend', this.handleAnimationend)
    }
}
</script>

<style lang="stylus" scoped>
.donate-coffee
    position relative
    height 240px
    margin 5px 0

.donate-blur
    filter blur(3px)

.donate-github
.donate-icon
.donate-container
.donate-container li
    transition all .3s

.donate-github
    width 30px
    height 30px
    background  url(./../../assets/images/donate/github.svg) no-repeat center center
    background-size contain
    transform rotatez(15deg)
    display block
    position absolute
    top calc(50% - 33px)

.donate-icon
    width 70px
    height 70px
    line-height 70px
    color #FFFFFF
    background #FFD886 url(./../../assets/images/donate/like.svg) no-repeat center 10px
    background-size 20px
    border-radius 35px
    text-align center
    transform rotatez(-15deg)
    position absolute
    top calc(50% - 60px)

.donate-container
    border 1px solid #DDDDDD
    border-radius 6px
    width auto
    height 28px
    display inline-block
    position absolute
    background-color #FFFFFF
    top calc(50% - 14px)
    li
        width 75px
        height 28px
        cursor pointer
        overflow hidden
        display inline-block
        background no-repeat center center
        background-color rgba(204, 217, 220, 0.1)
        background-size 45px
        filter grayscale(1)
        opacity 0.5
        border-left 1px solid #ddd
        &:hover
            background-color rgba(204, 217, 220,0.3)
            filter grayscale(0)
            opacity 1
        for name in "alipay" "wechat" "paypal" "bitcoin"
            &[data-name={name}]
                background-image url('./../../assets/images/donate/' + name + '.svg')

.donate-image-container
    width 100%
    height 100%
    background-color rgba(255,255,255,0.3)
    perspective 400px

.donate-image
    cursor pointer
    position absolute
    text-align center
    width 200px
    height 200px
    left calc(50% - 100px)
    top calc(50% - 100px)
    background #FFFFFF no-repeat center center
    background-size 190px
    border-radius 6px
    box-shadow 0px 2px 7px rgba(0,0,0,0.3)
    transition all 1s ease-in-out
    transform-style preserve-3d
    transform-origin center center
    overflow hidden

.donate-show
    animation animation-donate-show 3s ease-in-out

.donate-hide
    animation animation-donate-hide .5s ease-in-out

@keyframes animation-donate-show
    0% 
        transform rotateX(90deg)
    8% 
        opacity 1
        transform rotateX(-60deg)
    18% 
        opacity 1
        transform rotateX(40deg)
    34% 
        opacity 1
        transform rotateX(-28deg)
    44% 
        opacity 1
        transform rotateX(18deg)
    58% 
        opacity 1
        transform rotateX(-12deg)
    72% 
        opacity 1
        transform rotateX(9deg)
    88% 
        opacity 1
        transform rotateX(-5deg)
    96%
        opacity 1
        transform rotateX(2deg)
    100%
        opacity 1

@keyframes animation-donate-hide
    20%
    50%
        transform scale(1.08,1.08)
        opacity 1
    100%
        opacity 0
        transform rotateZ(40deg) scale(0.6,0.6)
</style>
