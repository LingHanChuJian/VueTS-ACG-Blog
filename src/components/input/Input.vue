<template lang="pug">
    div(:class="wrapClasses")
        template(v-if="type !=='textarea'")
            div(v-if="prepend" :class="[prefixCls + '-prepend']")
                solt(name="prepend")
            input(
                :class="inputClasses"
                :autocomplete="autocomplete"
                :spellcheck="spellcheck"
            )
            div(v-if="")
        template(v-else)
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

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
    private disabled?: boolean

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

    @Prop({ type: String, default: '' })
    private prefixIcon!: string

    @Prop({ type: String, default: '' })
    private suffixIcon!: string

    private prefixCls: string = 'input'
}
</script>
