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
        div(
            :class="popperClasses"
            :style="styles"
            ref="popper"
            v-show="isShow"
            @mouseenter="handleMouseenter"
            @mouseleave="handleMouseleave"
            :data-transfer="transfer"
            v-transfer
        )
            div(
                :class="[prefixCls + '-box']"
                ref="box"
                :data-state="visible ? 'visible' : 'hidden'"
            )
                div(
                    :class="[prefixCls + '-arrow']"
                    ref="arrow"
                    data-popper-arrow
                )
                div(:class="[prefixCls + '-content']")
                    slot(name="content") {{ content }}
</template>

<script lang="ts">
import { oneOf, addEvent, removeEvent } from '@/utils'
import transfer from '@/components/directives/transfer'
import { directive as clickOutside } from 'v-click-outside-x'
import { Component, Watch, Prop, Vue } from 'vue-property-decorator'
import { WrapClasses, CSSStyles, PopperOffset } from '@/types/components'
import { createPopper, Options as PopperOptions, Placement, Instance as Popper } from '@popperjs/core'

@Component({
    directives: {
        clickOutside,
        transfer,
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
        default: 'auto',
        validator(value: string) {
            return oneOf(value, ['auto', 'auto-start', 'auto-end', 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'])
        },
    })
    private placement!: Placement

    @Prop({
        type: Object,
        default() {
            return {
                modifiers: [
                    {
                        name: 'computeStyle',
                        options: {
                            gpuAcceleration: false,
                        },
                    },
                ],
            }
        },
    })
    private options!: Partial<PopperOptions>

    @Prop({
        type: [Array, Object],
        default() {
            return [0, 0]
        },
    })
    private offset!: [number, number] | PopperOffset

    @Prop({ type: Boolean, default: false })
    private value!: boolean

    @Prop({ type: [String, Number] })
    private width?: string | number

    @Prop({ type: [String, Number] })
    private content?: string | number

    @Prop({ type: String, default: '' })
    private popperClass!: string

    @Prop({ type: Boolean, default: false })
    private wordWrap!: boolean

    @Prop({ type: Boolean, default: false })
    private disabled!: boolean

    @Prop({ type: Boolean, default: false })
    private transfer!: boolean

    private prefixCls: string = 'poptip'

    private popper?: Popper | null

    private visible: boolean = this.value

    // display none 导致 animation 失效 维护一个 isShow 控制动画
    private isShow: boolean = this.value

    private enterTimer?: number | null

    private isInput: boolean = false

    private createPopper(): void {
        if (this.popper) { this.popper.destroy() }
        const options: Partial<PopperOptions> = Object.assign({}, this.options)
        options.placement = this.placement
        if (!options.modifiers) { options.modifiers = [] }
        // 添加偏移位置
        options.modifiers.push({ name: 'offset', options: { offset: this.offset } })
        // 添加小三角形
        options.modifiers.push({ name: 'arrow', options: { element: this.$refs.arrow, padding: 5 } })
        // 对 box 进行处理
        options.modifiers.push({
            enabled: true,
            phase: 'beforeWrite',
            fn: ({ state }) => {
                ['placement', 'reference-hidden', 'escaped'].forEach((attr) => {
                    if (attr === 'placement') {
                        (this.$refs.box as HTMLElement).setAttribute('data-placement', state.placement)
                    } else {
                        if (state.attributes.popper[`data-popper-${attr}`]) {
                            (this.$refs.box as HTMLElement).setAttribute(`data-${attr}`, '')
                        } else {
                            (this.$refs.box as HTMLElement).removeAttribute(`data-${attr}`)
                        }
                    }
                })
                state.attributes.popper = {}
            },
        })
        // 生命周期
        options.onFirstUpdate = () => {
            this.$nextTick(this.updatePopper)
            this.$emit('created', this)
        }
        this.popper = createPopper((this.$refs.reference as HTMLElement), (this.$refs.popper as HTMLElement), options)
    }

    private updatePopper(): void {
        this.popper ? this.popper.forceUpdate() : this.createPopper()
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
        this.enterTimer = setTimeout(() => { this.visible = true }, 300)
    }

    private handleMouseleave(): boolean | void {
        if (this.trigger !== 'hover') { return false }
        if (this.enterTimer) { clearTimeout(this.enterTimer) }
        this.enterTimer = setTimeout(() => { this.visible = false }, 300)
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

    private handleFocus(event: Event): boolean | void {
        if (this.disabled) { return }
        if (this.trigger !== 'focus' || (event instanceof MouseEvent && this.isInput)) { return false }
        this.visible = true
    }

    private handleBlur(event: Event): boolean | void {
        if (this.trigger !== 'focus' || (event instanceof MouseEvent && this.isInput)) { return false }
        this.visible = false
    }

    private handleAnimationend(): void {
        if (!this.visible) { this.isShow = false }
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
            this.popperClass,
            `${this.prefixCls}-popper`,
            this.wordWrap ? `${this.prefixCls}-popper-word-wrap` : '',
        ]
    }

    private get styles(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration> = {}

        if (!!this.width) {
            style.width = `${this.width}px`
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
            this.isShow = newValue
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
                    addEvent(children, 'focus', this.handleFocus, false)
                    addEvent(children, 'blur', this.handleBlur, false)
                }
            })
        }
        addEvent((this.$refs.box as HTMLElement), 'animationend', this.handleAnimationend)
    }

    private updated() {
        this.$nextTick(() => this.updatePopper())
    }

    private beforeDestroy() {
        this.doDestroy(true)
        const children: HTMLElement | null = this.getInputChildren()
        if (children) {
            removeEvent(children, 'focus', this.handleFocus, false)
            removeEvent(children, 'blur', this.handleBlur, false)
        }
        removeEvent((this.$refs.box as HTMLElement), 'animationend', this.handleAnimationend)
    }
}
</script>