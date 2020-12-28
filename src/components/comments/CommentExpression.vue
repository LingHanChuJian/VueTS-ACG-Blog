<template lang="pug">
    div(:class="[prefixCls + '-wrap']")
        div(:class="[prefixCls + '-toggle-title']" @click="emotionToggle") {{ title }}
        CollapseTransition(appear)
            div(v-show="opened" :class="[prefixCls + '-container']")
                template(v-for="item in expression")
                    div(:class="[prefixCls + '-title', expressionName === item.title ? (prefixCls + '-title-hover') : '']" @click="expressionTitleClick(item.title)") {{ item.title }}
                template(v-for="item in expression")
                    div(v-show="isExpressionShow(item.title)" :class="[prefixCls + '-' + item.type, prefixCls + '-show']")
                        div(v-for="mark, index in item.expression" :key="mark.value + index" @click="expressionMarkClick(item.template, mark.value)") {{ item.type === 'emoticon' ? mark.value : '' }}
                            div(v-if="item.type !== 'emoticon'" :style="styles(item, index)")
</template>

<script lang="ts">
import { expression } from '@/config'
import { stringFormat } from '@/utils'
import { Component, Vue } from 'vue-property-decorator'
import CollapseTransition from '@/components/base/collapseTransition'
import { CSSStyles, ExpressionParam, UserExpression } from '@/types/components'


@Component({
    name: 'CommentExpression',
    components: {
        CollapseTransition,
    },
})
export default class CommentExpression extends Vue {
    private prefixCls: string = 'comments-expression'

    private title: string = '戳我试试 OωO'

    private opened: boolean = false

    private expressionName: string = 'bilibili~'

    private expression: UserExpression[] = expression

    private emotionToggle(): void {
        this.opened = !this.opened
        this.title = this.opened ? '嘿嘿嘿 ヾ(≧∇≦*)ゝ' : '戳我试试 OωO'
    }

    private styles(item: UserExpression, index: number): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration>  = {}
        const expressionParam: ExpressionParam = item.expression[index]
        switch (item.type) {
            case 'sticker':
                style.backgroundImage = `url(${require(`@/assets/images/expression/sticker/${expressionParam.value}.png`)})`
                style.animationDuration = `${expressionParam.delay}s`
                style.animationTimingFunction = `steps(${expressionParam.step})`
                style.transform = expressionParam.transform
                style.height = expressionParam.height
                break
            case 'emoji':
                style.backgroundImage = `url(${require(`@/assets/images/expression/emoji/${expressionParam.value}.gif`)})`
                break
        }
        return style
    }

    private expressionTitleClick(title: string): void {
        this.expressionName = title
    }

    private isExpressionShow(title: string): boolean {
        return this.expressionName === title
    }

    private expressionMarkClick(template: string, value: string): void {
        this.$emit('on-expression-mark-click', stringFormat(template, [value]))
    }
}
</script>

<style lang="stylus" scoped>
.comments-expression-toggle-title
    margin-bottom 10px
    text-align center
    cursor pointer

.comments-expression-title
    display inline-block
    width 242px
    padding 8px
    text-align center
    cursor pointer
    margin-bottom 10px
    &:hover
        background-color rgba(245,245,245,.5)
        color $font-color-hover

.comments-expression-title-hover
    color $font-color-hover

.comments-expression-show
    height 100px
    overflow auto
    margin-bottom 5px
    border-radius 5px

.comments-expression-sticker
    & > div
        margin 12px 12px 0 0
        width 32px
        height 32px
        overflow hidden
        display inline-block
        border-radius 5px
        &:hover
            background-color rgba(245,245,245,.8)
        & > div
            background top/32px no-repeat
            &:hover
                animation emotion-step 1.08s steps(27) infinite

.comments-expression-emoticon
    & > div
        padding 3px 5px
        margin 5px
        display inline-block
        border-radius 4px
        cursor default
        &:hover
            background-color rgba(245,245,245,.8)

.comments-expression-emoji
    & > div
        margin 7px
        width 32px
        height 32px
        display inline-block
        border-radius 4px
        &:hover
            background-color rgba(245,245,245,.8)
        & > div
            width 100%
            height 100%
            background-size cover

@keyframes emotion-step
    0%
        transform translateY(0)
    
    100%
        transform translateY(-100%)
</style>
