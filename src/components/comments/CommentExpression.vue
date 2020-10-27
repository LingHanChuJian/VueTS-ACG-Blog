<template lang="pug">
    div(:class="[prefixCls + '-wrap']")
        div(@click="emotionToggle") {{ title }}
        CollapseTransition(appear)
            div(v-show="opened" :class="[prefixCls + '-container']")
</template>

<script lang="ts">
import { expression } from '@/config'
import { UserExpression } from '@/types/components'
import { Component, Vue } from 'vue-property-decorator'
import CollapseTransition from '@/components/base/collapseTransition'

@Component({
    components: {
        CollapseTransition,
    },
})
export default class CommentExpression extends Vue {
    private prefixCls: string = 'comments-expression'

    private title: string = '戳我试试 OωO'

    private opened: boolean = false

    private expression: UserExpression[] = expression

    private emotionToggle(): void {
        this.title = this.title === '戳我试试 OωO' ? '嘿嘿嘿 ヾ(≧∇≦*)ゝ' : '戳我试试 OωO'
    }
}
</script>
