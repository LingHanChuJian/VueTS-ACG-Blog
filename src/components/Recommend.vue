<template lang="pug">
    div(:class="[prefixCls + '-wrap']")
        div(
            v-for="item, index in recommend"
            :key="index"
            :class="[prefixCls]"
        )
            a(:href="item.link" target="_blank")
                div(:class="[prefixCls + '-image']")
                    img(:src="item.image")
                div(:class="[prefixCls + '-info']")
                    h3 {{ item.title }}
                    p  {{ item.description }}
</template>

<script lang="ts">
import { UserRecommend } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Recommend extends Vue {
    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private recommend!: UserRecommend[]

    private prefixCls: string = 'recommend'
}
</script>

<style lang="stylus" scoped>
.recommend-wrap
    display flex
    justify-content space-between

.recommend
    max-width 32.5%
    height 160px
    overflow hidden
    box-shadow 1px 1px 3px rgba(0,0,0,.3)
    border-radius 10px
    position relative
    &:hover
        .recommend-image
            transform scale(1.2)
        .recommend-info
            opacity 1
            h3
            p
                transform translateX(0)

.recommend-image
    transition transform .35s ease-in-out
    img
        width 100%
        height 160px

.recommend-info
    top 0
    left 0
    right 0
    bottom 0
    position absolute
    text-align center
    background-color rgba(0,0,0,.6)
    opacity 0
    transition opacity .35s ease-in-out
    h3
        margin-top 30px
        color #FFFFFF
        padding 10px 0
        background-color #000000
        transition transform .35s ease-in-out
        transform translateX(-100%)
    p
        margin-top 30px
        color #FFFFFF
        font-size 13px
        transition transform .35s ease-in-out
        transform translateX(100%)

@media screen and (max-width 860px)
    .recommend-wrap
        display none
</style>
