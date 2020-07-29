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