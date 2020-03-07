<template lang="pug">
    tbody
        tr(v-for="(dataItem, index) in data" :key="index")
            td(v-for="columnItem in column" :key="columnItem.key")
                div(v-if="!isFun(dataItem[columnItem.key])") {{ dataItem[columnItem.key] }}
                Expand(v-else :inRender="dataItem[columnItem.key]")
</template>

<script lang="ts">
import { typeOf } from '@/utils/assist'
import Expand from '@/components/base/expand'
import { Row, Column } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Expand,
    },
})
export default class Tbody extends Vue {
    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private data!: Row[]

    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private column!: Column[]

    private isFun(value: any): boolean {
        return typeOf(value) === 'function'
    }
}
</script>