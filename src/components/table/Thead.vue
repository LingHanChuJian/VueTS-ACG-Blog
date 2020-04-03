<template lang="pug">
    thead
        tr
            th(v-for="(item, index) in column" :key="index" :style="wrapStyles(item)") {{ item.title }}
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
    private column!: Column[]

    @Prop({ type: Boolean, default: true })
    private border!: boolean

    private wrapStyles(item: Column): CSSStyles<CSSStyleDeclaration> {
        return {
            border: this.border ? `1px solid #e9e9e9` : '',
            textAlign: item.align || 'left',
            width: item.width ? `${item.width}px` : 'auto',
        }
    }
}
</script>