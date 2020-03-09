<template lang="pug">
    thead
        tr
            th(v-for="(item, index) in column" :key="index" :style="wrapStyles") {{ item.title }}
</template>

<script lang="ts">
import { oneOf } from '@/utils/assist'
import { Column, CSSStyles } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Thead extends Vue {
    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private column!: Column

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
}
</script>