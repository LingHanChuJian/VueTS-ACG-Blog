<template lang="pug">
    div(:class="wrapClasses")
        Message(
            v-for="notice in notices"
            :key="notice.name"
        )
</template>

<script lang="ts">
import UUID from '@/components/mixins/uuid'
import Message from '@/components/message/Message.vue'
import { WrapClasses, Options, Render } from '@/types/components'
import { Component, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Message,
    },
})
export default class Notification extends Mixins(UUID) {
    private prefixCls: string = 'notification'

    private notices: Options[] = []

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }
}
</script>
