<template lang="pug">
    div(
        :class="classes"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
        v-click-outside="handleClose"
    )
        div(
            :class="[prefixCls + '-rel']"
            ref="reference"
            @click="handleClick"
            @mousedown="handleFocus"
            @mouseup="handleBlur"
        )
            slot
        transition(name="fade")
            div(
                :class="popperClasses"
                :style="styles"
                ref="popper"
                v-show="visible"
                @click="popperClick"
                @mouseenter="handleMouseenter"
                @mouseleave="handleMouseleave"
            )
                slot(name="content")
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import Popper, { PopperOptions } from 'popper.js'
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
    private placement!: PopperOptions['placement']

    @Prop({
        type: Object,
        default(): PopperOptions {
            return {
                modifiers: {
                    computeStyle: {
                        gpuAcceleration: false,
                    },
                    preventOverflow: {
                        boundariesElement: 'window',
                    },
                },
            }
        },
    })
    private options!: PopperOptions

    @Prop({ type: Boolean, default: false })
    private visible!: boolean

    @Prop({ type: [String, Number], default: 0 })
    private offset!: string | number

    @Prop({ type: [String, Number] })
    private width?: string | number

    @Prop({ type: [String, Number], default: '' })
    private content!: string

    @Prop({ type: String, default: '' })
    private popperClass!: string

    @Prop({ type: Boolean, default: false })
    private wordWrap!: boolean

    @Prop({ type: Boolean, default: false })
    private disabled!: boolean

    private prefixCls: string = 'poptip'

    private popper?: Popper | null

    private createPopper(): void {
        this.options.placement = this.placement
    }

    private handleMouseenter(): void {
        console.log('handleMouseenter')
    }

    private handleMouseleave(): void {
        console.log('handleMouseleave')
    }

    private handleClose(): void {
        console.log('handleClose')
    }

    private handleClick(): void {
        console.log('handleClick')
    }

    private handleFocus(): void {
        console.log('handleFocus')
    }

    private handleBlur(): void {
        console.log('handleBlur')
    }

    private popperClick(): void {
        console.log('popperClick')
    }

    private get classes(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}`,
        ]
    }

    private get popperClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-popper`,
        ]
    }

    private get styles(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration> = {}

        if (!!this.width) {
            style.width = `${this.width}px`
        }

        return style
    }
}
</script>