<template lang="pug">
    div(:class="wrapClasses")
        template(v-if="")
            input
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { Component, Prop, Vue } from 'vue-property-decorator'

export default class Input extends Vue {
    @Prop({
        type: String,
        default: 'text',
        validator(value: string) {
            return oneOf(value, ['text', 'textarea', 'password', 'email', 'url', 'number', 'tel'])
        },
    })
    private type!: string

    @Prop({
        type: [String, Number],
        default: '',
    })
    private value!: string | number

    private prefixCls: string = 'input'
}
</script>
