<template lang="pug">
    div(
        :class="classes"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
        click-outside="handleClose"
    )
        div(
            :class="[prefixCls + '-rel']"
            ref="reference"
            @click="handleClick"
            @mousedown="handleFocus(false)"
            @mouseup="handleBlur(false)"
        )
            slot
        transition(name="fade")
            div(
                :class="popperClasses"
                :style="styles"
                ref="popper"
                v-show="visible"
                @mouseenter="handleMouseenter"
                @mouseleave="handleMouseleave"
            )
                div(:class="[prefixCls + '-content']")
                    slot(name="content")
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import Popper, { PopperOptions } from 'popper.js'
import { directive as vClickOutside } from 'v-click-outside-x'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Watch, Prop, Vue } from 'vue-property-decorator'

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
    private value!: boolean

    @Prop({ type: [String, Number], default: 0 })
    private offset!: string | number

    @Prop({ type: [String, Number] })
    private width?: string | number

    @Prop({ type: String, default: '' })
    private popperClass!: string

    @Prop({ type: Boolean, default: false })
    private wordWrap!: boolean

    @Prop({ type: String, default: '' })
    private padding!: string

    @Prop({ type: Boolean, default: false })
    private disabled!: boolean

    private prefixCls: string = 'poptip'

    private popper?: Popper | null

    private visible: boolean = this.value

    private enterTimer?: number | null

    private isInput: boolean = false

    private createPopper(): void {
        if (this.popper) { this.popper.destroy() }
        const options: PopperOptions = Object.assign({}, this.options)
        options.placement = this.placement
        if (!(options.modifiers as Popper.Modifiers).offset) {
            (options.modifiers as Popper.Modifiers).offset = {}
        }
        ((options.modifiers as Popper.Modifiers).offset as (Popper.BaseModifier & { offset?: string | number })).offset = this.offset
        options.onCreate = () => {
            this.$nextTick(this.updatePopper)
            this.$emit('created', this)
        }
        this.popper = new Popper((this.$refs.reference as HTMLElement), (this.$refs.popper as HTMLElement), options)
    }

    private updatePopper(): void {
        this.popper ? this.popper.update() : this.createPopper()
    }

    private doDestroy(isVisible: boolean = false): void {
        if (!isVisible && this.value) { return }
        if (this.popper) {
            this.popper.destroy()
            this.popper = null
        }
    }

    private handleMouseenter(): boolean | void  {
        if (this.disabled) { return }
        if (this.trigger !== 'hover') { return false }
        if (this.enterTimer) { clearTimeout(this.enterTimer) }
        this.enterTimer = setTimeout(() => { this.visible = true }, 100)
    }

    private handleMouseleave(): boolean | void {
        if (this.trigger !== 'hover') { return false }
        if (this.enterTimer) { clearTimeout(this.enterTimer) }
        this.enterTimer = setTimeout(() => { this.visible = false }, 100)
    }

    private handleClose(): boolean | void {
        if (this.trigger !== 'click') { return false }
        this.visible = false
    }

    private handleClick(): boolean | void {
        if (this.disabled) { return }
        if (this.trigger !== 'click') { return false }
        this.visible = !this.visible
    }

    private handleFocus(fromInput: boolean = true): boolean | void {
        if (this.disabled) { return }
        if (this.trigger !== 'focus' || (fromInput && this.isInput)) { return false }
        this.visible = true
    }

    private handleBlur(fromInput: boolean = true): boolean | void {
        if (this.trigger !== 'focus' || (fromInput && this.isInput)) { return false }
        this.visible = false
    }

    private getInputChildren(): HTMLElement | null {
        return (this.$refs.reference as HTMLElement).querySelector('input') || (this.$refs.reference as HTMLElement).querySelector('textarea')
    }

    private get classes(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}`,
        ]
    }

    private get popperClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-popper`,
            this.popperClass ? this.popperClass : '',
            this.wordWrap ? `${this.prefixCls}-popper-word-wrap` : '',
        ]
    }

    private get styles(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration> = {}

        if (!!this.width) {
            style.width = `${this.width}px`
        }

        if (!!this.padding) {
            style.padding = this.padding
        }

        return style
    }

    @Watch('value')
    private onValueChange(newValue: boolean) {
        this.visible = newValue
        this.$emit('input', newValue)
    }

    @Watch('visible')
    private onVisibleChange(newValue: boolean) {
        if (newValue) {
            this.updatePopper()
            this.$emit('on-popper-show')
        } else {
            this.$emit('on-popper-hide')
        }
        this.$emit('input', newValue)
    }

    private mounted() {
        if (this.trigger === 'focus') {
            this.$nextTick(() => {
                const children: HTMLElement | null = this.getInputChildren()
                if (children) {
                    this.isInput = true
                    children.addEventListener('focus', () => this.handleFocus(), false)
                    children.addEventListener('blur', () => this.handleBlur(), false)
                }
            })
        }
    }

    private updated() {
        this.$nextTick(() => this.updatePopper())
    }

    private beforeDestroy() {
        this.doDestroy(true)
        const children: HTMLElement | null = this.getInputChildren()
        if (children) {
            children.removeEventListener('focus', () => this.handleFocus(), false)
            children.removeEventListener('blur', () => this.handleBlur(), false)
        }
    }
}
</script>