<template lang="pug">
    div
        Anchor(title="input 输入框")
        Example.simple(title="基础用法")
            template(v-slot:dome)
                div.row
                    div.column
                        Input(v-model="inputValue" placeholder="这是一个提示")
                    div.column
                        Input(v-model="inputValue2" placeholder="这是一个textarea自适应栗子" type="textarea" :auto="true")
                    div.column
                        Input(v-model="inputValue3" placeholder="这是一个普通 textarea" type="textarea")
            template(v-slot:description)
                p 基本用法, 可以使用 v-model 实现数据的双向绑定.
            template(v-slot:code)
                Block(:content="dome1" lang="VUE" :custom="['language-pug']")
        Example.simple(title="尺寸 (只对 input 有效)")
            template(v-slot:dome)
                div.row
                    div.column
                        Input(v-model="inputValue4" placeholder="尺寸为 small" size="small")
                    div.column
                        Input(v-model="inputValue5" placeholder="尺寸为 default")
                    div.column
                        Input(v-model="inputValue6" placeholder="尺寸为 large" size="large")
            template(v-slot:description)
                p 输入框有三种尺寸: 大、默认（中）、小
                p 通过设置 size 为 large 和 small 设置为大和小尺寸, 不设置为默认(中)尺寸.
            template(v-slot:code)
                Block(:content="dome2" lang="VUE" :custom="['language-pug']")
        Example.simple(title="可清空")
            template(v-slot:dome)
                div.column
                    Input(v-model="inputValue7" placeholder="可清空" clearable)
            template(v-slot:description)
                p 开启属性 clearable 可显示清空按钮.
            template(v-slot:code)
                Block(:content="dome3" lang="VUE" :custom="['language-pug']")
        Example.simple(title="禁用状态")
            template(v-slot:dome)
                div.row
                    div.column
                        Input(v-model="inputValue8" placeholder="已禁用" disabled)
                    div.column
                        Input(v-model="inputValue9" type="textarea" placeholder="已禁用" disabled)
            template(v-slot:description)
                p 通过添加disabled属性可设置为不可用状态.
            template(v-slot:code)
                Block(:content="dome4" lang="VUE" :custom="['language-pug']")
        Example.simple(title="复合型输入框")
            template(v-slot:dome)
                div.row
                    div.column2
                        Input(v-model="inputValue10" placeholder="复合型输入框")
                            span(slot="prepend") https://
                            span(slot="append") .com
                    br
                    div.column2
                        Input(v-model="inputValue11" placeholder="复合型输入框")
                            Icon(type="dollar-sign" slot="prepend")
                    br
                    div.column2
                        Input(v-model="inputValue12" placeholder="复合型输入框")
                            Icon(type="dollar-sign" slot="append")
            template(v-slot:description)
                p 通过前置和后置的 slot 可以实现复合型的输入框.
            template(v-slot:code)
                Block(:content="dome5" lang="VUE" :custom="['language-pug']")
        div.api
            Anchor(title="API" label="h2")
            Anchor(title="Input props" label="h3")
            Table(:column="columns" :data="data")
            Anchor(title="Input events" label="h3")
            Table(:column="columns2" :data="data2")
            Anchor(title="Input slot" label="h3")
            Table(:column="columns3" :data="data3")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { Table } from '@/components/table'
import { Anchor } from '@/components/anchor'
import { Column, Row } from '@/types/components'
import { Example, Block } from '@/components/example'
import { Component, Vue } from 'vue-property-decorator'


@Component({
    name: 'InputDoc',
    components: {
        Icon,
        Input,
        Table,
        Anchor,
        Example,
        Block,
    },
})
export default class InputDoc extends Vue {
    private inputValue: string = ''

    private inputValue2: string = ''

    private inputValue3: string = ''

    private inputValue4: string = ''

    private inputValue5: string = ''

    private inputValue6: string = ''

    private inputValue7: string = '凌寒初见'

    private inputValue8: string = ''

    private inputValue9: string = ''

    private inputValue10: string = ''

    private inputValue11: string = ''

    private inputValue12: string = ''

    private dome1: string =
`<template lang="pug">
    div.row
        div.column
            Input(v-model="inputValue" placeholder="这是一个提示")
        div.column
            Input(v-model="inputValue2" placeholder="这是一个textarea自适应栗子" type="textarea" :auto="true")
        div.column
            Input(v-model="inputValue3" placeholder="这是一个普通 textarea" type="textarea")
</template>

<script lang="ts">
import { Input } from '@/components/input'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Input,
    },
})
export default class InputDoc extends Vue {
    private inputValue: string = ''

    private inputValue2: string = ''

    private inputValue3: string = ''
}
<\/script>

<style lang="stylus" scoped>
.row
    margin-bottom 20px

.column
    margin 0 20px
    width 350px
    display inline-block
    vertical-align top
</style>
`

    private dome2: string =
`
<template lang="pug">
    div.row
        div.column
            Input(v-model="inputValue4" placeholder="尺寸为 small" size="small")
        div.column
            Input(v-model="inputValue5" placeholder="尺寸为 default")
        div.column
            Input(v-model="inputValue6" placeholder="尺寸为 large" size="large")
</template>

<script lang="ts">
import { Input } from '@/components/input'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Input,
    },
})
export default class InputDoc extends Vue {
    private inputValue4: string = ''

    private inputValue5: string = ''

    private inputValue6: string = ''
}
<\/script>

<style lang="stylus" scoped>
.row
    margin-bottom 20px

.column
    margin 0 20px
    width 350px
    display inline-block
    vertical-align top
</style>
`

    private dome3: string =
`
<template lang="pug">
    div.column
        Input(v-model="inputValue7" placeholder="可清空" clearable)
</template>

<script lang="ts">
import { Input } from '@/components/input'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Input,
    },
})
export default class InputDoc extends Vue {
    private inputValue7: string = ''
}
<\/script>

<style lang="stylus" scoped>
.column
    margin 0 20px
    width 350px
    display inline-block
    vertical-align top
</style>
`

    private dome4: string =
`<template lang="pug">
    div.row
        div.column
            Input(v-model="inputValue8" placeholder="已禁用" disabled)
        div.column
            Input(v-model="inputValue9" type="textarea" placeholder="已禁用" disabled)
</template>

<script lang="ts">
import { Input } from '@/components/input'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Input,
    },
})
export default class InputDoc extends Vue {
    private inputValue8: string = ''

    private inputValue9: string = ''
}
<\/script>

<style lang="stylus" scoped>
.row
    margin-bottom 20px

.column
    margin 0 20px
    width 350px
    display inline-block
    vertical-align top
</style>
`

    private dome5: string =
`<template lang="pug">
    div.row
        div.column2
            Input(v-model="inputValue10" placeholder="复合型输入框")
                span(slot="prepend") https://
                span(slot="append") .com
        br
        div.column2
            Input(v-model="inputValue11" placeholder="复合型输入框")
                Icon(type="dollar-sign" slot="prepend")
        br
        div.column2
            Input(v-model="inputValue12" placeholder="复合型输入框")
                Icon(type="dollar-sign" slot="append")
</template>

<script lang="ts">
import { Input } from '@/components/input'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Input,
    },
})
export default class InputDoc extends Vue {
    private inputValue10: string = ''

    private inputValue11: string = ''

    private inputValue12: string = ''
}
<\/script>

<style lang="stylus" scoped>
.row
    margin-bottom 20px

.column2
    margin 0 20px
    width 500px
</style>
`

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
            prop: 'type',
            description: '输入框类型, 可选值为 text、password、textarea、url、email、date、tel',
            type: 'String',
            default: 'text',
        },
        {
            prop: 'value',
            description: '绑定的值，可使用 v-model 双向绑定',
            type: 'String | Number',
            default: '',
        },
        {
            prop: 'size',
            description: '输入框尺寸, 可选值为small、default、large',
            type: 'String',
            default: 'default',
        },
        {
            prop: 'placeholder',
            description: '占位文本',
            type: 'String',
            default: '',
        },
        {
            prop: 'clearable',
            description: '是否显示清空按钮',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'disabled',
            description: '设置输入框为禁用状态',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'readonly',
            description: '设置输入框为只读',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'max',
            description: '最大输入长度',
            type: 'Number',
            default: '',
        },
        {
            prop: 'auto',
            description: '自适应内容高度, 仅在 textarea 类型下有效',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'rows',
            description: '文本域默认行数，仅在 textarea 类型下有效',
            type: 'Number',
            default: '2',
        },
        {
            prop: 'spellcheck',
            description: '原生的 spellcheck 属性',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'autofocus',
            description: '自动获取焦点',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'autocomplete',
            description: '原生的自动完成功能',
            type: 'String',
            default: 'off',
        },
        {
            prop: 'wrap',
            description: '原生的 wrap 属性, 可选值为 hard 和 soft, 仅在 textarea 下生效',
            type: 'String',
            default: 'soft',
        },
        {
            prop: 'inputStyles',
            description: 'input style',
            type: 'CSSStyleDeclaration',
            default: '{}',
        },
        {
            prop: 'animationPlaceholder',
            description: '是否显示动画 placeholder',
            type: 'Boolean',
            default: 'false',
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
            eventsName: 'on-change',
            description: '数据改变时触发',
            returnValue: 'event',
        },
        {
            eventsName: 'on-clear',
            description: '开启 clearable 时可用, 点击清空按钮时触发',
            returnValue: 'event',
        },
        {
            eventsName: 'on-enter',
            description: '按下回车键时触发',
            returnValue: '',
        },
        {
            eventsName: 'on-keyup',
            description: '原生的 keyup 事件',
            returnValue: 'event',
        },
        {
            eventsName: 'on-keypress',
            description: '原生的 keypress 事件',
            returnValue: 'event',
        },
        {
            eventsName: 'on-keydown',
            description: '原生的 on-keydown 事件',
            returnValue: 'event',
        },
        {
            eventsName: 'on-keyup',
            description: '原生的 keyup 事件',
            returnValue: 'event',
        },
        {
            eventsName: 'on-focus',
            description: '输入框聚焦时触发',
            returnValue: '',
        },
        {
            eventsName: 'on-blur',
            description: '输入框失去焦点时触发',
            returnValue: 'event',
        },
        {
            eventsName: 'on-input-change',
            description: '原生的 change 事件',
            returnValue: 'event',
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
            name: 'prepend',
            description: '前置内容, 仅在 text 类型下有效',
        },
        {
            name: 'append',
            description: '后置内容, 仅在 text 类型下有效',
        },
    ]

}
</script>

<style lang="stylus" scoped>
.simple
.row
    margin-bottom 20px

.column
    margin 0 20px
    width 350px
    display inline-block
    vertical-align top

.column2
    margin 0 20px
    width 500px
</style>