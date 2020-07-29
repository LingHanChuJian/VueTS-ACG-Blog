<template lang="pug">
    div(:class="wrapClasses" :style="wrapStyle")
        template(v-if="type !=='textarea'")
            div(v-if="prepend" ref="prepend" :class="[prefixCls + '-group-prepend']" :style="slotGroupStyle")
                slot(name="prepend")
            input(
                ref="input"
                :class="inputClasses"
                :type="type"
                :style="inputStyles"
                :value="curValue"
                :placeholder="!animationPlaceholder? placeholder : ''"
                :disabled="disabled"
                :autocomplete="autocomplete"
                :spellcheck="spellcheck"
                :readonly="readonly"
                :maxlength="max"
                :name="name"
                :autofocus="autofocus"
                @keyup.enter="handleEnter"
                @keyup="handleKeyup"
                @keypress="handleKeypress"
                @keydown="handleKeydown"
                @focus="handleFocus"
                @blur="handleBlur"
                @compositionstart="handleComposition"
                @compositionupdate="handleComposition"
                @compositionend="handleComposition"
                @input="handleInput"
                @change="handleChange"
            )
            div(v-if="clearable && curValue && !disabled" :class="[prefixCls + '-clearable']" :style="clearableStyle")
                Icon(type="times-circle" @click="clearClick")
            div(v-if="append" ref="append" :class="[prefixCls + '-group-append']" :style="slotGroupStyle")
                slot(name="append")
        template(v-else)
            pre(v-if="auto" :class="[prefixCls + '-pre']" :style="inputStyles")
                span {{ curValue }}
                br
            textarea(
                ref="textarea"
                :class="textareaClasses"
                :wrap="wrap"
                :value="curValue"
                :autocomplete="autocomplete"
                :spellcheck="spellcheck"
                :style="inputStyles"
                :rows="rows"
                :disabled="disabled"
                :placeholder="!animationPlaceholder? placeholder : ''"
                :maxlength="max"
                :name="name"
                :readonly="readonly"
                :autofocus="autofocus"
                @keyup.enter="handleEnter"
                @keyup="handleKeyup"
                @keypress="handleKeypress"
                @keydown="handleKeydown"
                @focus="handleFocus"
                @blur="handleBlur"
                @compositionstart="handleComposition"
                @compositionupdate="handleComposition"
                @compositionend="handleComposition"
                @input="handleInput"
            )
        label(v-if="placeholder && animationPlaceholder" :class="[prefixCls + '-label']" :style="labelStyle") {{ placeholder }}
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { Icon } from '@/components/icon'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class Input extends Vue {
    @Prop({
        type: String,
        default: 'text',
        validator(value: string) {
            return oneOf(value, ['text', 'textarea', 'password', 'email', 'url', 'number', 'search', 'tel'])
        },
    })
    private type!: string

    @Prop({ type: [String, Number], default: '' })
    private value!: string | number

    @Prop({
        type: String,
        default: 'default',
        validator(value: string) {
            return oneOf(value, ['small', 'default', 'large'])
        },
    })
    private size!: string

    @Prop({ type: String, default: '' })
    private placeholder!: string

    @Prop({ type: Number })
    private max?: number

    @Prop({ type: Boolean, default: false })
    private disabled!: boolean

    @Prop({ type: String })
    private icon?: string

    @Prop({ type: Boolean, default: false })
    private auto!: boolean

    @Prop({ type: Number, default: 2 })
    private rows!: number

    @Prop({ type: Boolean, default: false })
    private readonly!: boolean

    @Prop({ type: String })
    private name?: string

    @Prop({ type: Boolean, default: false })
    private spellcheck!: boolean

    @Prop({ type: Boolean, default: false })
    private autofocus!: boolean

    @Prop({
        type: String,
        default: 'off',
        validator(value: string) {
            return oneOf(value, ['on', 'off'])
        },
    })
    private autocomplete!: string

    @Prop({ type: Boolean, default: false })
    private clearable!: boolean

    @Prop({
        type: String,
        default: 'soft',
        validator(value: string) {
            return oneOf(value, ['hard', 'soft'])
        },
    })
    private wrap!: string

    @Prop({
        type: Object,
        default() {
            return {}
        },
    })
    private inputStyles!: CSSStyles<CSSStyleDeclaration>

    @Prop({ type: Boolean, default: true })
    private animationPlaceholder!: boolean

    private prefixCls: string = 'input'

    private prepend: boolean = false

    private append: boolean = false

    private isOnComposition: boolean = false

    private isFocus: boolean = this.autofocus

    private curValue: string | number = this.value

    private curInputStyles: CSSStyleDeclaration | null = null

    private curPrependStyles: CSSStyleDeclaration | null = null

    private curAppendStyles: CSSStyleDeclaration | null = null

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            {
                [`${this.prefixCls}-size-${this.size}`]: !!this.size,
                [`${this.prefixCls}-group`]: this.prepend || this.append,
            },
        ]
    }

    private get inputClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-container`,
            {
                [`${this.prefixCls}-exist-prepend`]: this.prepend,
                [`${this.prefixCls}-exist-append`]: this.append,
                [`${this.prefixCls}-${this.size}`]: !!this.size,
                [`${this.prefixCls}-disabled`]: this.disabled,
            },
        ]
    }

    private get textareaClasses(): Array<string | WrapClasses> {
        return [
            'textarea-container',
            `${this.prefixCls}-container`,
            {
                'auto-textarea': this.auto,
                [`${this.prefixCls}-disabled`]: this.disabled,
            },
        ]
    }

    private get wrapStyle(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration> = {}
        if (this.curInputStyles && this.type === 'textarea') {
            style.minHeight = `${this.handlePixel((this.curInputStyles.fontSize as string)) * this.rows + this.handlePixel((this.curInputStyles.paddingTop as string)) + 15}px`
        }
        return style
    }

    private get clearableStyle(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration> = {}
        if (this.curInputStyles) {
            const height: number = this.handlePixel((this.curInputStyles.height as string)) + this.handlePixel((this.curInputStyles.paddingTop as string)) + this.handlePixel((this.curInputStyles.paddingBottom as string))
            style.height = `${height}px`
            style.lineHeight = `${height}px`
        }

        if (this.curAppendStyles) {
            const appendWidth: number = this.handlePixel((this.curAppendStyles.width as string)) + this.handlePixel((this.curAppendStyles.paddingLeft as string)) + this.handlePixel((this.curAppendStyles.paddingRight as string))
            style.right = `${appendWidth}px`
        }

        return style
    }

    private get slotGroupStyle(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration> = {}
        if (this.curInputStyles) {
            const height: number = this.handlePixel((this.curInputStyles.height as string))
            style.height = `${height}px`
            style.lineHeight = `${height}px`
        }
        return style
    }

    private get labelStyle(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration> = {}
        if (this.curInputStyles) {
            if (this.isFocus || this.value) {
                style.padding = '3px'
                style.color = '#FFFFFF'
                style.backgroundColor = '#29d'
                style.borderRadius = '3px'
                style.transform = `scale(.75) translate(10px, -${Math.round(this.handlePixel((this.curInputStyles.fontSize as string)) / 2) + 3}px)`
            } else {
                style.padding = this.curInputStyles.padding
                if (this.type !== 'textarea') {
                    style.top = `${Math.round((this.handlePixel((this.curInputStyles.height as string)) - this.handlePixel((this.curInputStyles.fontSize as string))) / 2)}px`
                }
            }
        }

        if (this.curPrependStyles) {
            const prependWidth: number = this.handlePixel((this.curPrependStyles.width as string)) + this.handlePixel((this.curPrependStyles.paddingLeft as string)) + this.handlePixel((this.curPrependStyles.paddingRight as string))
            style.left = `${Math.round(prependWidth)}px`
        }

        return style
    }

    @Watch('value')
    private valueChange(newValue: string | number) {
        this.setCurValue(newValue)
    }

    private setCurValue(value: string | number): void {
        if (this.value === this.curValue) { return }
        this.curValue = value
    }

    private focus(): void {
        this.type === 'textarea' ?  (this.$refs.textarea as any).focus() : (this.$refs.input as any).focus()
    }

    private blur(): void {
        this.type === 'textarea' ?  (this.$refs.textarea as any).blur() : (this.$refs.input as any).blur()
    }

    private clearClick(): void {
        this.$emit('input', '')
        this.setCurValue('')
        this.$emit('on-change', { target: { value: '' } })
        this.$emit('on-clear')
    }

    private handlePixel(value: string) {
        return Number(value.replace('px', ''))
    }

    private handleEnter(event: Event): void {
        this.$emit('on-enter', event)
    }

    private handleKeyup(event: Event): void {
        this.$emit('on-keyup', event)
    }

    private handleKeypress(event: Event): void {
        this.$emit('on-keypress', event)
    }

    private handleKeydown(event: Event): void {
        this.$emit('on-keydown', event)
    }

    private handleFocus(event: Event): void {
        this.isFocus = true
        this.$emit('on-focus', event)
    }

    private handleBlur(event: Event): void {
        this.isFocus = false
        this.$emit('on-blur', event)
    }

    private handleComposition(event: Event): void {
        switch (event.type) {
            case 'compositionstart':
                this.isOnComposition = true
                break
            case 'compositionend':
                this.isOnComposition = false
                this.handleInput(event)
                break
        }
    }

    private handleInput(event: Event): void {
        if (this.isOnComposition) { return }
        let value: string | number = (event.target as HTMLInputElement).value
        if (this.type === 'number' && value !== '') {
            value = isNaN(Number(value)) ? value : Number(value)
        }
        this.setCurValue(value)
        this.$emit('input', value)
        this.$emit('on-change', event)
    }

    private handleChange(event: Event): void {
        this.$emit('on-input-change', event)
    }

    private mounted(): void {
        if (this.type !== 'textarea') {
            this.prepend = this.$slots.prepend !== undefined
            this.append = this.$slots.append !== undefined
        } else {
            this.prepend = false
            this.append = false
        }

        this.$nextTick(() => {
            const element: Vue | Element | Vue[] | Element[] = this.type === 'textarea' ? this.$refs.textarea : this.$refs.input
            this.curInputStyles = getComputedStyle((element as Element))
            if (this.prepend) { this.curPrependStyles = getComputedStyle((this.$refs.prepend as Element)) }
            if (this.append) { this.curAppendStyles = getComputedStyle((this.$refs.append as Element)) }
        })
    }

}
</script>
