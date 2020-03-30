<template lang="pug">
    table(:class="wrapClasses")
        Thead(:column="cloneColumn" :border="border")
        Tbody(:column="cloneColumn" :data="cloneData" :border="border")
</template>

<script lang="ts">
import { deepCopy, oneOf } from '@/utils/assist'
import Tbody from '@/components/table/Tbody.vue'
import Thead from '@/components/table/Thead.vue'
import { Row, Column, WrapClasses } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Tbody,
        Thead,
    },
})
export default class Table extends Vue {
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

    @Prop({ type: Boolean, default: true })
    private border!: boolean

    private prefixCls: string = 'table'

    private cloneColumn: Column[] = deepCopy(this.column)

    private cloneData: Row[] = deepCopy(this.data)

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }
}
</script>
