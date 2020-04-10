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
import { oneOf } from '@/utils'
import { Icon } from '@/components/icon'
import { MenuIcon } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class NavIcon extends Vue {
    @Prop({
        type: String,
        default: 'horizontal',
        validator(value: string) {
            return oneOf(value, ['vertical', 'horizontal'])
        },
    })
    private mode!: string

    @Prop({
        type: Object,
        default() {
            return {}
        },
    })
    private icon?: MenuIcon
}
</script>