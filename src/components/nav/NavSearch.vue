<template lang="pug">
    transition(:name="mode + '-elasticity'")
        form(
            v-if="visible"
            :class="[mode + '-' + prefixCls]"
            :autocomplete="autocomplete ? 'on' : 'off'"
        )
            div(:class="[mode + '-' + prefixCls + '-container']")
                input
            div
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { Icon } from '@/components/icon'
import { WrapClasses } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class NavSearch extends Vue {
    @Prop({
        type: String,
        default: 'horizontal',
        validator(value: string) {
            return oneOf(value, ['vertical', 'horizontal'])
        },
    })
    public mode!: string

    @Prop({ type: Boolean, default: true })
    private autocomplete!: boolean

    @Prop({ type: Boolean, default: true })
    private visible!: boolean

    private prefixCls: string = 'search'

}
</script>

<style lang="stylus" scoped>

</style>
