<template lang="pug">
    div
        Anchor(title="Poptip 气泡提示")
        Example.simple(title="基础用法")
            template(v-slot:dome)
                div.poptip-dome
                    Poptip(trigger="hover")
                        div.poptip-item hover
                        template(v-slot:content)
                            | 这是 hover 展示
                    Poptip(trigger="click")
                        div.poptip-item click
                        template(v-slot:content)
                            | 这是 click 展示
                    Poptip(trigger="focus")
                        div.poptip-item focus
                        template(v-slot:content)
                            | 这是 focus 展示
                    Poptip(transfer)
                        div.poptip-item 脱离文档流
                        template(v-slot:content)
                            | 这是 脱离文档流 展示
            template(v-slot:description)
                p 支持三种触发方式：鼠标悬停、点击、聚焦。默认是点击
            template(v-slot:code)
                Block(:content="dome" lang="VUE" :custom="['language-pug']")
        Example.simple(title="位置")
            template(v-slot:dome)
                div.poptip-dome2
                    Poptip
            template(v-slot:description)
            template(v-slot:code)
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
                | 这是 hover 展示
        Poptip(trigger="click")
            div.poptip-item click
            template(v-slot:content)
                | 这是 click 展示
        Poptip(trigger="focus")
            div.poptip-item focus
            template(v-slot:content)
                | 这是 focus 展示
        Poptip(transfer)
            div.poptip-item 脱离文档流
            template(v-slot:content)
                | 这是 脱离文档流 展示
</template>

<style lang="stylus" scoped>
.poptip-dome
    .poptip-item
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
            color #6c5b7c
            border 1px solid #29d
</style>`
}
</script>

<style lang="stylus" scoped>
.simple
    margin-bottom 20px

.poptip-dome
    .poptip-item
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
</style>
