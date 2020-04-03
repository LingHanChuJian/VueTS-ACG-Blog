<template lang="pug">
    figure(:class="wrapClasses")
        h1(:class="[mode + '-' + prefixCls + '-title']") {{ title }}
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { Poptip } from '@/components/poptip'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserInformation, WrapClasses } from '@/types/components'

@Component
export default class Information extends Vue {
    @Prop({
        type: String,
        default: 'horizontal',
        validator(value: string) {
            return oneOf(value, ['vertical', 'horizontal'])
        },
    })
    public mode!: string

    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private userInformation!: UserInformation[]

    @Prop({ type: String, default: '' })
    private title!: string

    @Prop({ type: String, default: '' })
    private description?: string

    @Prop({ type: String, default: '' })
    private author?: string

    @Prop({ type: [Number, String], default: 4 })
    private maxNum!: number | string

    private prefixCls: string = 'info'

    private get noImageUserInformation(): UserInformation[] {
        return this.userInformation.filter((item) => !item.image)
    }

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.mode + '-' + this.prefixCls,
        ]
    }
}
</script>

<style lang="stylus" scoped>
// .vertical-info-title
    

</style>
