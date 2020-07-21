<template lang="pug">
    div
        Anchor(title="input 输入框")
        Example.simple(title="基础用法")
            template(v-slot:dome)
                div(style="width: 350px; margin-bottom: 20px;")
                    Input(v-model="inputValue" placeholder="我是提示语句" type="textarea" :auto="true")
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
}
</script>

<style lang="stylus" scoped>

</style>