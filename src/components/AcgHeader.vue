<template lang="pug">
    div
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AcgHeader extends Vue {
    @Prop({ type: String, default: '' })
    private video!: string
}
</script>