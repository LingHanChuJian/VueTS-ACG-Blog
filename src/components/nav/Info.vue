<template lang="pug">
    ul(:class="[mode + '-' + prefixCls + '-ul']")
        li(v-for="(item, index) in handleUserInformation" :key="index" :title="item.title")
            Poptip(v-if="item.image" trigger="hover" placement="bottom")
                NavIcon(:icon="item.icon" :mode="mode")
                template(v-slot:content)
                    img(:src="item.image")
            NavIcon(v-else-if="item.fn" :icon="item.icon" :mode="mode" :style="{ cursor: 'pointer' }"  @click.native="item.fn")
            a(v-else="item.link" :href="item.link" target="_blank")
                NavIcon(:icon="item.icon" :mode="mode")
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { Poptip } from '@/components/poptip'
import NavIcon from '@/components/nav/NavIcon.vue'
import { UserInformation } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        NavIcon,
        Poptip,
    },
})
export default class Info extends Vue {
    @Prop({
        type: String,
        default: 'vertical',
        validator(value: string) {
            return oneOf(value, ['vertical', 'horizontal'])
        },
    })
    private mode!: string

    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private handleUserInformation!: UserInformation[]

    @Prop({ type: String, default: '' })
    private prefixCls!: string
}
</script>

<style lang="stylus" scoped>
.vertical-info-ul
.horizontal-info-ul
    margin-top 20px
    li
        display inline-block
        margin 0 10px
        img 
            width 115px
            height auto
</style>