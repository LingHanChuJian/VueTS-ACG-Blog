<template lang="pug">
    div
        Anchor(title="Poptip 气泡提示")
        Example.simple(title="基础用法")
            template(slot="dome")
            template(slot="description")
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

</style>
