<template lang="pug">
    div()
</template>

<script lang="ts">
import { WrapClasses } from '@/types/components'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Message extends Vue {
    private prefixCls: string = 'message'

    private options: string = ''

    private visible: boolean = false

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }
}
</script>
