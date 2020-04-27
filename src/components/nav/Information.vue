<template lang="pug">
    figure(:class="wrapClasses" :style="wrapStyle")
        transition(:name="mode + '-move'")
            div(:class="[mode + '-' + prefixCls + '-container']")
                Poptip(trigger="show" :disabled="true" placement="bottom-start" :offset="[-60, 0]")
                    h1(v-if="title" :class="titleClasses") {{ handleTitle }}
                    router-link(v-else to="/")
                        img(:src="author")
                    template(v-slot:content)
                        p(:class="[mode + '-' + prefixCls + '-description']")
                            Icon(type="quote-left")
                            span {{ description }}
                            Icon(type="quote-right")
                        ul(:class="[mode + '-' + prefixCls + '-ul']")
                            li(v-for="(item, index) in handleUserInformation" :key="index" :title="item.title")
                                Poptip(v-if="item.image" trigger="hover" placement="bottom")
                                    NavIcon(:icon="item.icon" :mode="mode")
                                    template(v-slot:content)
                                        img(:src="item.image")
                                NavIcon(v-else-if="item.fn" :icon="item.icon" :mode="mode" @click.native="item.fn")
                                a(v-else="item.link" :href="item.link" target="_blank")
                                    NavIcon(:icon="item.icon" :mode="mode")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Poptip } from '@/components/poptip'
import NavIcon from '@/components/nav/NavIcon.vue'
import { oneOf, deepCopy, getStyle } from '@/utils'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserInformation, WrapClasses, CSSStyles } from '@/types/components'

@Component({
    components: {
        Icon,
        NavIcon,
        Poptip,
    },
})
export default class Information extends Vue {
    @Prop({
        type: String,
        default: 'horizontal',
        validator(value: string) {
            return oneOf(value, ['vertical', 'horizontal'])
        },
    })
    public mode!: string

    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private userInformation!: UserInformation[]

    @Prop({ type: String, default: '' })
    private title?: string

    @Prop({ type: String, default: '' })
    private author?: string

    @Prop({ type: String, default: '' })
    private description?: string

    @Prop({ type: [Number, String], default: 4 })
    private maxNum!: number | string

    private prefixCls: string = 'info'

    private handleTitle: string = ''

    private toggleImageLink: string = 'https://api.2heng.xin/cover'

    private handleUserInformation: UserInformation[] = []

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.mode + '-' + this.prefixCls,
        ]
    }

    private get wrapStyle(): CSSStyles<CSSStyleDeclaration> {
        if (this.mode === 'horizontal') { return {} }
        const style: CSSStyles<CSSStyleDeclaration> = {}
        style.backgroundImage = `url(${this.toggleImageLink})`
        return style
    }

    private get titleClasses(): Array<string | WrapClasses> {
        return [
            `${this.mode}-${this.prefixCls}-title`,
            this.handleTitle === this.title ?  `${this.mode}-${this.prefixCls}-title-after` : '',
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
        if (this.mode === 'vertical') {
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

        this.$nextTick(() => this.typewriter())
    }
}
</script>

<style lang="stylus" scoped>
.vertical-info
    width 100%
    height 100%
    position relative
    background-attachment fixed
    background-repeat no-repeat
    background-size cover
    background-position center center

.vertical-info-container
    z-index 15
    text-align center
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    min-width 800px
    min-height 250px

.vertical-info-title
    margin 0
    font-size 80px
    color #FFFFFF
    white-space nowrap
    overflow hidden
    &:after
        content '|'
        font-size larger

.vertical-info-title-after:after
    animation animation-flicker .7s infinite

.vertical-info-description
    margin 0
    padding 0
    font-weight 700
    span
        margin 0 5px

.vertical-info-ul
    margin-top 20px
    li
        display inline-block
        margin-right 20px

@keyframes animation-flicker
    50%
        opacity 0

@media screen and (max-width 860px)
    .vertical-info
         background-attachment scroll
</style>
