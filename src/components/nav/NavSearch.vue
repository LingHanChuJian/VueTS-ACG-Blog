<template lang="pug">
    transition(:name="mode + '-' + prefixCls + '-elasticity'")
        form(
            v-if="visible"
            :class="[mode + '-' + prefixCls]"
            :autocomplete="autocomplete ? 'on' : 'off'"
            @submit="searchSubmit"
        )
            div(:class="[mode + '-' + prefixCls + '-container']")
                p(v-if="mode === 'horizontal'") 遇事不决, 量子力学. 双叶一下, 你就知道.
                div(:class="[prefixCls + '-' + mode]")
                    Icon.search-icon(v-if="mode === 'horizontal'" type="search" size="32")
                    input(v-model="keywords" placeholder="想要找点什么呢?")
            div(v-if="mode === 'horizontal'" :class="[mode + '-' + prefixCls + '-close']" @click="closeClick")
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { Icon } from '@/components/icon'
import { WrapClasses } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class NavSearch extends Vue {
    @Prop({
        type: String,
        default: 'vertical',
        validator(value: string) {
            return oneOf(value, ['vertical', 'horizontal'])
        },
    })
    public mode!: string

    @Prop({ type: Boolean, default: true })
    private autocomplete!: boolean

    @Prop({ type: Boolean, default: true })
    private visible!: boolean

    private prefixCls: string = 'search'

    private keywords: string = ''

    private closeClick(): void {
        this.$emit('update:visible', !this.visible)
    }

    private searchSubmit(event: Event): void {
        event.preventDefault()
        this.$router.push({ name: 'search', query: { k: encodeURI(this.keywords) } })
        this.closeClick()
    }

}
</script>

<style lang="stylus" scoped>
.horizontal-search
    top 0
    left 0
    right 0
    bottom 0
    opacity .99
    background url(./../../assets/images/loli.gif) no-repeat
    background-position bottom right
    background-color #FFFFFF
    position fixed
    z-index 9999

.vertical-search
    margin 20px 0
    padding 8px 15px
    background-color #fafafa

.horizontal-search-container
    top 0
    left 0
    right 0
    bottom 0
    margin auto
    position absolute
    max-width 600px
    height 200px
    p
        padding-left 24px

.search-horizontal
    border 1px solid $font-color
    border-radius 65px
    height 65px
    display flex
    align-items center
    .search-icon
        flex 0
        margin-left 16px
    input
        border none
        outline none
        margin 12px 24px 12px 16px
        flex 1
        height 60px
        font-size 24px

.search-vertical
    width 220px
    input
        border 0
        padding 5px
        text-align center
        border-radius 3px
        outline none
        font-size 18px

.horizontal-search-close
    position absolute
    width 35px
    height 35px
    top 20px
    right 15px
    cursor pointer
    &:before
    &:after
        background-color #222
        position absolute
        content ''
        width 30px
        height 2px
        top 17px
        left 2px
    &:before
        transform rotate(-45deg)
    &:after
        transform rotate(45deg)

.horizontal-search-elasticity-enter-active
.horizontal-search-elasticity-leave-active
	animation-duration .5s
	animation-fill-mode both
	animation-play-state paused
    animation-timing-function ease-in-out

.horizontal-search-elasticity-enter
.horizontal-search-elasticity-enter-to
	animation-name elasticity-in
	animation-play-state running

.horizontal-search-elasticity-leave
.horizontal-search-elasticity-leave-to
	animation-name elasticity-out
	animation-play-state running

@keyframes elasticity-in 
    0%
        transform scale(0)

    55%
        transform scale(1)

    70%
        transform scale(.98)

    100%
        transform scale(1)

@keyframes elasticity-out 
    0%
        transform scale(1)
    
    55%
        transform scale(.98)

    70%
        transform  scale(1)
    
    100%
        transform scale(0)
</style>
