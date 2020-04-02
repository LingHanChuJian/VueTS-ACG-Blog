<template lang="pug">
    Icon(
        v-if="icon"
        :class="[mode + '-' + icon.className]"
        :type="icon.type"
        :fixed="icon.fixed"
        :size="icon.size"
        :color="icon.color"
        :fixedSize="icon.fixedSize"
        :custom="icon.custom"
    )
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { MenuIcon } from '@/types/components'
import { Component, Prop, Inject, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class NavIcon extends Vue {
    @Prop({
        type: Object,
        default() {
            return {}
        },
    })
    private icon?: MenuIcon

    @Inject('mode')
    private readonly mode!: string
}
</script>