<template lang="pug">
    div
        Anchor(title="Poptip 气泡提示")
        Example.simple(title="基础用法")
            template(slot="dome")
                div.poptip-dome
                    Poptip(trigger="hover")
                        div.poptip-item hover
                        template(slot="content")
                            | 这是 hover 展示
                    Poptip(trigger="click")
                        div.poptip-item click
                        template(slot="content")
                            | 这是 click 展示
                    Poptip(trigger="focus")
                        div.poptip-item focus
                        template(slot="content")
                            | 这是 focus 展示
            template(slot="description")
                p 支持三种触发方式：鼠标悬停、点击、聚焦。默认是点击
            template(slot="code")
        Example.simple(title="位置")
            template(slot="dome")
            template(slot="description")
            template(slot="code")
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
