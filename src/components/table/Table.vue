<template lang="pug">
    table
        Thead(:column="cloneColumn")
        Tbody(:column="cloneColumn" :data="cloneData")
</template>

<script lang="ts">
import { deepCopy } from '@/utils/assist'
import Tbody from '@/components/table/Tbody.vue'
import Thead from '@/components/table/Thead.vue'
import { Row, Column } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Tbody,
        Thead,
    },
})
export default class Table extends Vue {
    @Prop({
        type: Object,
        default() {
            return []
        },
    })
    private data!: Row[]

    @Prop({
        type: Object,
        default() {
            return []
        },
    })
    private column!: Column[]

    @Prop({ type: Boolean, default: true })
    private border!: boolean

    private cloneColumn: Column[] = deepCopy(this.column)

    private cloneData: Row[] = deepCopy(this.data)
}
</script>
