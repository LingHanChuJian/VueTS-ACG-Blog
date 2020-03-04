<template lang="pug">
    thead
        tr
            th(v-for="(item, index) in column" :key="index") {{ item.title }}
</template>

<script lang="ts">
import { Column } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Thead extends Vue {
    @Prop({
        type: Object,
        default() {
            return []
        },
    })
    private column!: Column
}
</script>