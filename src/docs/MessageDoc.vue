<template lang="pug">
    div
        Anchor(title="Message 全局提示")
        Example.simple(title="基本提示")
            template(v-slot:dome)
                div.message-dome
                    div.message-item(@click="info") 显示 info 提示
                    div.message-item(@click="success") 显示 success 提示
                    div.message-item(@click="warning") 显示 warning 提示
                    div.message-item(@click="error") 显示 error 提示
                    div.message-item(@click="renderFunc") 显示 render 提示
            template(v-slot:description)
                p 基本提示, 默认在1.5s之后消失
            template(v-slot:code)
                Block(:content="dome" lang="VUE" :custom="['language-pug']")
        div.api
            Anchor(title="API" label="h2")
            Anchor(title="Message instance" label="h3")
            p 通过直接调用以下方法来使用组件:
            li this.$Message.info(config)
            li this.$Message.success(config)
            li this.$Message.warning(config)
            li this.$Message.error(config)
            p 参数 config 可以是字符串或对象, 当为字符串时, 直接显示内容, 当为对象时, 具体说明如下:
            Table(:column="columns" :data="data")
            p 另外提供了全局配置和全局销毁的方法:
            li this.$Message.config(options)
            li this.$Message.destroy()
            p options 具体说明如下:
            Table(:column="columns" :data="data2")
</template>

<script lang="ts">
import { CreateElement } from 'vue'
import { Table } from '@/components/table'
import { Anchor } from '@/components/anchor'
import { Column, Row } from '@/types/components'
import { Example, Block } from '@/components/example'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Table,
        Anchor,
        Example,
        Block,
    },
})
export default class MessageDoc extends Vue {
    private dome: string =
`<template lang="pug">
    div.message-dome
        div.message-item(@click="info") 显示 info 提示
        div.message-item(@click="success") 显示 success 提示
        div.message-item(@click="warning") 显示 warning 提示
        div.message-item(@click="error") 显示 error 提示
        div.message-item(@click="renderFunc") 显示 render 提示
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component
    export default class Doc extends Vue {
        private info() {
            this.$Message.info('info 提示')
        }

        private success() {
            this.$Message.success('success 提示')
        }

        private warning() {
            this.$Message.warning('warning 提示')
        }

        private error() {
            this.$Message.error('error 提示')
        }

        private renderFunc() {
            this.$Message.info({
                message: (h: CreateElement) => {
                    return h('span', [
                                'This is created by ',
                                h('a', { style: { color: '#29d' } }, 'render'),
                                ' function',
                            ])
                },
                isBackground: false,
            })
        }
    }
<\/script>

<style lang="stylus" scoped>
.message-dome
    display flex
    .message-item
        margin 0 10px
        border 1px solid red
        height 32px
        line-height 32px
        border-radius 4px
        padding 0 15px
        transition all .2s linear
        border 1px solid #dcdee2
        cursor pointer
        &:hover
            color #29d
            border 1px solid #29d
</style>`

    private columns: Column[] = [
        {
            key: 'prop',
            title: '属性',
        },
        {
            key: 'description',
            title: '说明',
        },
        {
            key: 'type',
            title: '类型',
        },
        {
            key: 'default',
            title: '默认值',
        },
    ]

    private data: Row[] = [
        {
            prop: 'message',
            description: '提示内容 或者 自定义描述内容, 使用 Vue 的 Render 函数',
            type: 'String | Function',
            default: '',
        },
        {
            prop: 'duration',
            description: '自动关闭的延时, 单位秒, 不关闭可以写 0',
            type: 'Number',
            default: '1.5',
        },
        {
            prop: 'isBackground',
            description: '是否显示背景色',
            type: 'Boolean',
            default: 'true',
        },
    ]

    private data2: Row[] = [
        {
            prop: 'top',
            description: '提示组件距离顶端的距离, 单位像素',
            type: 'Number',
            default: '0',
        },
        {
            prop: 'duration',
            description: '默认自动关闭的延时, 单位秒',
            type: 'Number',
            default: '1.5',
        },
    ]

    private info() {
        this.$Message.info('info 提示')
    }

    private success() {
        this.$Message.success('success 提示')
    }

    private warning() {
        this.$Message.warning('warning 提示')
    }

    private error() {
        this.$Message.error('error 提示')
    }

    private renderFunc() {
        this.$Message.info({
            message: (h: CreateElement) => {
                return h('span', [
                            'This is created by ',
                            h('a', { style: { color: '#29d' } }, 'render'),
                            ' function',
                        ])
            },
            isBackground: false,
        })
    }
}
</script>

<style lang="stylus" scoped>
.simple
    margin-bottom 20px

.message-dome
    display flex
    .message-item
        margin 0 10px
        border 1px solid red
        height 32px
        line-height 32px
        border-radius 4px
        padding 0 15px
        transition all .2s linear
        border 1px solid #dcdee2
        cursor pointer
        &:hover
            color $font-color-hover
            border 1px solid $font-color-hover

.api
    li
        margin 5px 0
</style>