<template lang="pug">
    transition-group(tag="div" apper name="move-up")
        article(v-for="item in archives" :key="item.id")
            div
            div
</template>

<script lang="ts">
import { UserArchives } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Archives extends Vue {
    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private archives!: UserArchives[]
}
</script>

<style lang="stylus" scoped>

</style>