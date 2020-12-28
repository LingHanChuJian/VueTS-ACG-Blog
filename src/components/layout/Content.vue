<template lang="pug">
    div(:class="wrapClasses")
        slot
</template>

<script lang="ts">
import { WrapClasses } from '@/types/components';
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'Content',
})
export default class Content extends Vue {
    private prefixCls: string = 'layout-content'

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }
}
</script>
