<template lang="pug">
    div(:class="wrapClasses")
        template(v-if="type !=='textarea'")
            div(v-if="prepend" :class="[prefixCls + '-prepend']")
                solt(name="prepend")
            input(
                ref="input"
                :class="inputClasses"
                :type="type"
                :style="inputStyles"
                :value="curValue"
                :placeholder="placeholder"
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
            div(v-if="clearable && curValue && !disabled" :class="[prefixCls + '-clearable']")
                Icon(type="times-circle" @click="clearClick")
            div(v-if="append" :class="[prefixCls + 'append']")
                solt(name="append")
        template(v-else)
            pre
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
                :placeholder="placeholder"
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
        label(v-if="placeholder" :class="[prefixCls + '-label']" :style="labelStyle") {{ placeholder }}
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { Icon } from '@/components/icon'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

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

    @Prop({ type: [String, Number], default: 'default' })
    private size!: string | number

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

    private prefixCls: string = 'input'

    private prepend: boolean = false

    private append: boolean = false

    private isOnComposition: boolean = false

    private isFocus: boolean = this.autofocus

    private curValue: string | number = this.value

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            {
                [`${this.prefixCls}-${this.size}`]: !!this.size,
                [`${this.prefixCls}-group`]: this.prepend || this.append,
            },
        ]
    }

    private get inputClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-container`,
            {
                [`${this.prefixCls}-disabled`]: this.disabled,
            },
        ]
    }

    private get textareaClasses(): Array<string | WrapClasses> {
        return [
            `${this.prefixCls}-container`,
            {
                [`${this.prefixCls}-disabled`]: this.disabled,
            },
        ]
    }

    private get labelStyle(): CSSStyles<CSSStyleDeclaration> {
        return {}
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
    }

}
</script>
