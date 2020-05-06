<template lang="pug">
    figure(:class="wrapClasses" :style="wrapStyle")
        div(:class="containerClasses")
            Poptip(v-if="mode === 'horizontal'" trigger="show" :disabled="true" placement="bottom")
                h1(v-if="title" :class="titleClasses") {{ handleTitle }}
                router-link(v-else to="/" :style="{ display: 'block' }")
                    img(:class="[mode + '-' + prefixCls + '-author']" :src="author")
                template(v-slot:content)
                    p(:class="[mode + '-' + prefixCls + '-description']")
                        Icon(type="quote-left")
                        span {{ description }}
                        Icon(type="quote-right")
                    Info(:mode="mode" :prefixCls="prefixCls" :handleUserInformation="handleUserInformation")
            div(v-else)
                p(v-if="title" :class="[mode + '-' + prefixCls + '-title']") {{ title }}
                Info(:mode="mode" :prefixCls="prefixCls" :handleUserInformation="handleUserInformation")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { oneOf, deepCopy } from '@/utils'
import Info from '@/components/nav/Info.vue'
import { Poptip } from '@/components/poptip'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserInformation, WrapClasses, CSSStyles } from '@/types/components'
import { title, author, description, userInformation, randomImagesLink } from '@/config'

@Component({
    components: {
        Icon,
        Info,
        Poptip,
    },
})
export default class Information extends Vue {
    @Prop({
        type: String,
        default: 'vertical',
        validator(value: string) {
            return oneOf(value, ['vertical', 'horizontal'])
        },
    })
    private mode!: string

    @Prop({ type: [Number, String], default: 4 })
    private maxNum!: number | string

    @Prop({ type: Boolean, default: false })
    private isPlayer!: boolean

    private prefixCls: string = 'info'

    private handleTitle: string = ''

    private title: string = title

    private author: string = author

    private description: string = description

    private toggleImageLink: string = randomImagesLink

    private userInformation: UserInformation[] = userInformation

    private handleUserInformation: UserInformation[] = []

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.mode + '-' + this.prefixCls,
        ]
    }

    private get wrapStyle(): CSSStyles<CSSStyleDeclaration> {
        // horizontal
        if (this.mode === 'vertical') { return {} }
        const style: CSSStyles<CSSStyleDeclaration> = {}
        style.backgroundImage = `url(${this.toggleImageLink})`
        return style
    }

    private get containerClasses(): Array<string | WrapClasses> {
        return [
            `${this.mode}-${this.prefixCls}-container`,
            this.mode === 'horizontal' && this.isPlayer ? `${this.mode}-${this.prefixCls}-container-move` : '',
        ]
    }

    private get titleClasses(): Array<string | WrapClasses> {
        return [
            `${this.mode}-${this.prefixCls}-title`,
            this.handleTitle === this.title ? `${this.mode}-${this.prefixCls}-title-after` : '',
        ]
    }

    private toggleImage(): void {
        const param: string = `?time=${new Date().getTime()}`
        const toggleImageLink: URL = new URL(this.toggleImageLink)
        this.toggleImageLink = toggleImageLink.search ? this.toggleImageLink.replace(toggleImageLink.search, param) : (this.toggleImageLink + param)
    }

    private typewriter(): void {
        // 打字机效果
        if (!this.title) { return }
        for (let i = 0, len = this.title.length; i < len; i++) {
            setTimeout(() => { this.handleTitle += this.title ? this.title[i] : '' }, i * 100)
        }
    }

    private mounted() {
        if (this.mode === 'horizontal') {
            this.handleUserInformation = deepCopy(this.userInformation)
            this.handleUserInformation.unshift({
                icon: {
                    type: 'angle-left',
                    size: 32,
                    color: '#1296db',
                    fixed: true,
                },
                fn: () => this.toggleImage(),
            })
            this.handleUserInformation.push({
                icon: {
                    type: 'angle-right',
                    size: 32,
                    color: '#1296db',
                    fixed: true,
                },
                fn: () => this.toggleImage(),
            })
        } else {
            this.handleUserInformation = this.userInformation.filter((item) => !item.image)
            if (this.handleUserInformation.length > this.maxNum) { this.handleUserInformation = this.handleUserInformation.splice(0, Number(this.maxNum)) }
        }

        for (let i = 0, len = this.handleUserInformation.length; i < len; i++) {
            const handleItem: UserInformation = this.handleUserInformation[i]
            if (!handleItem.icon) { continue }
            if (!handleItem.icon.type) { continue }
            if (handleItem.icon.type === 'angle-left' || handleItem.icon.type === 'angle-right') { continue }
            handleItem.icon.size = this.mode === 'horizontal' ? 24 : 20
        }

        this.$nextTick(() => this.typewriter())
    }
}
</script>

<style lang="stylus" scoped>
.horizontal-info
    width 100%
    height 100%
    position relative
    background-attachment fixed
    background-repeat no-repeat
    background-size cover
    background-position center center

.vertical-info
    text-align center

.horizontal-info-container
    z-index 15
    text-align center
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    min-width 800px
    min-height 250px
    transition top .4s ease

.horizontal-info-title
    margin 0
    font-size 80px
    color #FFFFFF
    white-space nowrap
    overflow hidden
    &:after
        content '|'
        font-size larger

.vertical-info-title
    font-weight 900
    letter-spacing 1.5px

.horizontal-info-title-after:after
    animation animation-flicker .7s infinite

.horizontal-info-description
    margin 0
    padding 0
    font-weight 700
    span
        margin 0 5px

.horizontal-info-author
    width 130px
    height auto
    box-shadow inset 0 0 10px #000
    padding 5px
    transition transform ease 1s
    border-radius 100%
    &:hover
        transform rotate(360deg)

.horizontal-info-container-move
    top -250px

@keyframes animation-flicker
    50%
        opacity 0

@media screen and (max-width 860px)
    .horizontal-info
         background-attachment scroll

    .horizontal-info-container
        display none
</style>
