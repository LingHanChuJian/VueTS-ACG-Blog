<template lang="pug">
    Icon(
        v-if="icon"
        :class="wrapClasses"
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
import { MenuIcon, WrapClasses } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: 'NavIcon',
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

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.icon && this.icon.className ? `${this.mode}-${this.icon.className}` : '',
        ]
    }
}
</script>