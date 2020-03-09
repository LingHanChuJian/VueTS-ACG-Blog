<template lang="pug">
    tbody
        tr(v-for="(dataItem, index) in data" :key="index")
            td(v-for="columnItem in column" :key="columnItem.key" :style="wrapStyles")
                div(v-if="!isFun(dataItem[columnItem.key])") {{ dataItem[columnItem.key] }}
                Expand(v-else :inRender="dataItem[columnItem.key]")
</template>

<script lang="ts">
import Expand from '@/components/base/expand'
import { typeOf, oneOf } from '@/utils/assist'
import { Row, Column, CSSStyles } from '@/types/components'
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

    @Prop({
        type: String,
        default: 'left',
        validator(value: string) {
            return oneOf(value, ['left', 'center', 'right'])
        },
    })
    private align!: string

    @Prop({ type: Boolean, default: true })
    private border!: boolean

    private get wrapStyles(): CSSStyles<CSSStyleDeclaration> {
        return {
            border: this.border ? `1px solid #e9e9e9` : '',
            textAlign: this.align,
        }
    }

    private isFun(value: any): boolean {
        return typeOf(value) === 'function'
    }
}
</script>