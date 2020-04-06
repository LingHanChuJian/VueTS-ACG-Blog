<template lang="pug">
    div
        Anchor(title="Poptip 气泡提示")
        Example.simple(title="基础用法")
            template(v-slot:dome)
                div.poptip-dome
                    Poptip(trigger="hover")
                        div.poptip-item hover
                        template(v-slot:content)
                            | 这是 hover 展示内容
                    Poptip(trigger="click")
                        div.poptip-item click
                        template(v-slot:content)
                            | 这是 click 展示内容
                    Poptip(trigger="focus")
                        div.poptip-item focus
                        template(v-slot:content)
                            | 这是 focus 展示内容
                    Poptip(placement="top" wordWrap width="200")
                        div.poptip-item 多行文本
                        template(v-slot:content)
                            | 雪之下平乃, 正如她的名字一样, 雪下面的雪. 要说她是何等美貌, 是让人无法触碰更无法得到的, 只能让人为之惊叹其美丽的存在. 我老婆.
                    Poptip(transfer)
                        div.poptip-item 脱离文档流
                        template(v-slot:content)
                            | 这是 脱离文档流 展示内容
            template(v-slot:description)
                p 支持三种触发方式：鼠标悬停、点击、聚焦。默认是点击
            template(v-slot:code)
                Block(:content="dome" lang="VUE" :custom="['language-pug']")
        Example.simple(title="位置")
            template(v-slot:dome)
                div.poptip-dome2
                    div.top
                        Poptip(content="这是上左内容" placement="top-start")
                            div.top-item 上左
                        Poptip(content="这是上边内容" placement="top")
                            div.top-item 上边
                        Poptip(content="这是上右内容" placement="top-end")
                            div.top-item 上右
                    div.center
                        div
                            Poptip(content="这是上左内容" placement="left-start")
                                div.left-item 左上
                            Poptip(content="这是上左内容" placement="right-start")
                                div.right-item 右上
                        div
                            Poptip(content="这是上边内容" placement="left")
                                div.left-item 左边
                            Poptip(content="这是上边内容" placement="right")
                                div.right-item 右边
                        div
                            Poptip(content="这是上右内容" placement="left-end")
                                div.left-item 左下
                            Poptip(content="这是上右内容" placement="right-end")
                                div.right-item 右下
                    div.bottom
                        Poptip(content="这是下左内容" placement="bottom-start")
                            div.bottom-item 下左
                        Poptip(content="这是下边内容" placement="bottom")
                            div.bottom-item 下边
                        Poptip(content="这是下右内容" placement="bottom-end")
                            div.bottom-item 下右
            template(v-slot:description)
                p 组件提供了12个不同的方向显示Poptip
            template(v-slot:code)
                Block(:content="dome2" lang="VUE" :custom="['language-pug']")
        div.api
            Anchor(title="API" label="h2")
            Anchor(title="Poptip props" label="h3")
            Table(:column="columns" :data="data")
            Anchor(title="Poptip events" label="h3")
            Table(:column="columns2" :data="data2")
            Anchor(title="Poptip slot" label="h3")
            Table(:column="columns3" :data="data3")
</template>

<script lang="ts">
import { Table } from '@/components/table'
import { Anchor } from '@/components/anchor'
import { Poptip } from '@/components/poptip'
import { Column, Row } from '@/types/components'
import { Example, Block } from '@/components/example'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Table,
        Anchor,
        Example,
        Block,
        Poptip,
    },
})
export default class PoptipDoc extends Vue {
    private dome: string =
`<template lang="pug">
    div.poptip-dome
        Poptip(trigger="hover")
            div.poptip-item hover
            template(v-slot:content)
                | 这是 hover 展示内容
        Poptip(trigger="click")
            div.poptip-item click
            template(v-slot:content)
                | 这是 click 展示内容
        Poptip(trigger="focus")
            div.poptip-item focus
            template(v-slot:content)
                | 这是 focus 展示内容
        Poptip(placement="top" wordWrap width="200")
            div.poptip-item 多行文本
            template(v-slot:content)
                | 雪之下平乃, 正如她的名字一样, 雪下面的雪. 要说她是何等美貌, 是让人无法触碰更无法得到的, 只能让人为之惊叹其美丽的存在. 我老婆.
        Poptip(transfer)
            div.poptip-item 脱离文档流
            template(v-slot:content)
                | 这是 脱离文档流 展示内容
</template>

<style lang="stylus" scoped>
.poptip-item
    margin 0 5px
    line-height 32px
    border-radius 4px
    padding 0 15px
    transition all .2s linear
    border 1px solid #dcdee2
    cursor pointer
    &:hover
        color #6c5b7c
        border 1px solid #29d
</style>`

    private dome2: string =
`<template lang="pug">
    div.poptip-dome2
        div.top
            Poptip(content="这是上左内容" placement="top-start")
                div.top-item 上左
            Poptip(content="这是上边内容" placement="top")
                div.top-item 上边
            Poptip(content="这是上右内容" placement="top-end")
                div.top-item 上右
        div.center
            div
                Poptip(content="这是上左内容" placement="left-start")
                    div.left-item 左上
                Poptip(content="这是上左内容" placement="right-start")
                    div.right-item 右上
            div
                Poptip(content="这是上边内容" placement="left")
                    div.left-item 左边
                Poptip(content="这是上边内容" placement="right")
                    div.right-item 右边
            div
                Poptip(content="这是上右内容" placement="left-end")
                    div.left-item 左下
                Poptip(content="这是上右内容" placement="right-end")
                    div.right-item 右下
        div.bottom
            Poptip(content="这是下左内容" placement="bottom-start")
                div.bottom-item 下左
            Poptip(content="这是下边内容" placement="bottom")
                div.bottom-item 下边
            Poptip(content="这是下右内容" placement="bottom-end")
                div.bottom-item 下右
</template>

<style lang="stylus" scoped>
.top-item
.bottom-item
.left-item
.right-item
    margin 0 5px
    line-height 32px
    border-radius 4px
    padding 0 15px
    transition all .2s linear
    border 1px solid #dcdee2
    cursor pointer
    &:hover
        color #6c5b7c
        border 1px solid #29d

.top
.bottom
    text-align center

.center
    margin 0 auto
    width 300px
    & > div
        margin 10px 0
        display flex
        justify-content space-between

.left-item
.right-item
    margin 0
</style>`

    private columns: Column[] = [
        {
            key: 'prop',
            title: '属性',
        },
        {
            key: 'description',
            title: '说明',
            width: 600,
        },
        {
            key: 'type',
            title: '类型',
            width: 250,
        },
        {
            key: 'default',
            title: '默认值',
        },
    ]

    private data: Row[] = [
        {
            prop: 'value',
            description: 'v-model 使用',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'trigger',
            description: '触发方式, 可选值为hover (悬停) click (点击) focus(聚焦)',
            type: 'String',
            default: 'click',
        },
        {
            prop: 'content',
            description: '显示内容, 当然slot下无效',
            type: 'String',
            default: '',
        },
        {
            prop: 'placement',
            description: '提示框出现的位置, 可选值为 auto auto-start auto-end toptop-start top-end bottom bottom-start bottom-end left left-start left-end right right-start right-end',
            type: 'String',
            default: 'auto',
        },
        {
            prop: 'width',
            description: '宽度',
            type: 'Number | String',
            default: '',
        },
        {
            prop: 'wordWrap',
            description: '多行文本',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'offset',
            description: '出现位置的偏移量',
            type: '[Number, Number] | Function',
            default: '[0, 0]',
        },
        {
            prop: 'popperClass',
            description: 'popper class',
            type: 'String',
            default: '',
        },
        {
            prop: 'disabled',
            description: '是否禁用',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'transfer',
            description: '是否脱离文档流',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'options',
            description: (h, params) => {
                return h('span', [
                    h('span', '自定义 popper.js 的配置项，具体配置见 '),
                    h('a', { attrs: { href: 'https://popper.js.org/docs/v2/', target: '_blank' }, style: { color: '#29d' } }, 'popper.js 文档'),
                ])
            },
            type: 'Object',
            default: `{
                modifiers: [
                    {
                        name: 'computeStyle',
                        options: {
                            gpuAcceleration: false,
                        },
                    },
                ],
            }`,
        },
    ]

    private columns2: Column[] = [
        {
            key: 'eventsName',
            title: '事件名',
        },
        {
            key: 'description',
            title: '说明',
        },
        {
            key: 'returnValue',
            title: '返回值',
        },
    ]

    private data2: Row[] = [
        {
            eventsName: 'on-popper-show',
            description: 'popper显示时触发',
            returnValue: '',
        },
        {
            eventsName: 'on-popper-hide',
            description: 'popper隐藏时触发',
            returnValue: '',
        },
    ]

    private columns3: Column[] = [
        {
            key: 'name',
            title: '名称',
        },
        {
            key: 'description',
            title: '说明',
        },
    ]

    private data3: Row[] = [
        {
            name: 'default',
            description: '内容',
        },
        {
            name: 'content',
            description: '提示内容',
        },
    ]
}
</script>

<style lang="stylus" scoped>
.simple
    margin-bottom 20px

.poptip-item
.top-item
.bottom-item
.left-item
.right-item
    margin 0 5px
    line-height 32px
    border-radius 4px
    padding 0 15px
    transition all .2s linear
    border 1px solid #dcdee2
    cursor pointer
    &:hover
        color $font-color-hover
        border 1px solid $font-color-hover
.top
.bottom
    text-align center

.center
    margin 0 auto
    width 300px
    & > div
        margin 10px 0
        display flex
        justify-content space-between

.left-item
.right-item
    margin 0
</style>
