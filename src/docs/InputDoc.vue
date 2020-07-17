<template lang="pug">
    div
        Anchor(title="input 输入框")
        Example.simple(title="基础用法")
            template(v-slot:dome)
                Input
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

}
</script>

<style lang="stylus" scoped>

</style>