<template lang="pug">
    div(:class="classes" :style="styles")
</template>

<script lang="ts">
import { WrapClasses, CSSStyles } from '@/types/components'
import { Component, Prop, Vue, Provide } from 'vue-property-decorator'

@Component
export default class DropDown extends Vue {
    @Prop({ type: String })
    private className?: string

    private prefixCls: string = 'drop-down'

    private get classes(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
            this.className ? this.className : '',
        ]
    }

    private get styles(): CSSStyles<CSSStyleDeclaration> {
        const style: CSSStyles<CSSStyleDeclaration> = {}
        return style
    }
}
</script>