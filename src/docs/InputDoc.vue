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
</template>

<script lang="ts">
import { Input } from '@/components/input'
import { Table } from '@/components/table'
import { Anchor } from '@/components/anchor'
import { Column, Row } from '@/types/components'
import { Example, Block } from '@/components/example'
import { Component, Vue } from 'vue-property-decorator'


@Component({
    components: {
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
</style>