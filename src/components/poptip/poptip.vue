<template lang="pug">
    div(
        :class="classes"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
        v-click-outside="handleClose"
    )
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { directive as vClickOutside } from 'v-click-outside-x'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    directives: {
        vClickOutside,
    },
})
export default class Poptip extends Vue {
    @Prop({
        type: String,
        default: 'click',
        validator(value: string) {
            return oneOf(value, ['hover', 'click', 'focus'])
        },
    })
    private trigger!: string

    @Prop({
        type: String,
        default: 'top',
        validator(value: string) {
            return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'])
        },
    })
    private placement!: string

    private prefixCls: string = 'poptip'

    private handleMouseenter(): void {
        console.log('handleMouseenter')
    }

    private handleMouseleave(): void {
        console.log('handleMouseleave')
    }

    private handleClose(): void {
        console.log('handleClose')
    }

    private get classes(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}`,
        ]
    }
}
</script>