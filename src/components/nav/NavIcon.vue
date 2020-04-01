<template lang="pug">
    Icon(
        v-if="icon"
        :class="icon.className"
        :type="icon.type"
        :fixed="icon.fixed"
        :size="icon.size"
        :color="icon.color"
        :fixedSize="icon.fixedSize"
        :custom="icon.custom"
    )
    | {{ content }}
</template>

<script lang="ts">
import { MenuIcon } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NavIcon extends Vue {
    @Prop({
        type: Object,
        default() {
            return {}
        },
    })
    private icon?: MenuIcon

    @Prop({ type: String, default: '' })
    private content!: string
}
</script>