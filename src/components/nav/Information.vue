<template lang="pug">
    figure(:class="wrapClasses" :style="wrapStyle")
        div(:class="[mode + '-' + prefixCls + '-container']")
            Poptip(v-model="poptipValue" :disabled="true" placement="bottom-end")
                h1(v-if="title" :class="[mode + '-' + prefixCls + '-title']") {{ title }}
                router-link(v-else to="/")
                    img(:src="author")
                template(v-slot:content)
                    p {{ description }}
                    ul(:class="[mode + '-' + prefixCls + '-ul']")
                        li(v-for="(item, index) in userInformation" :key="index" :title="item.title")
                            Poptip(v-if="item.image" trigger="hover" placement="bottom")
                                NavIcon(:icon="item.icon" :mode="mode")
                                template(v-slot:content)
                                    img(:src="item.image")
                            NavIcon(v-else-if="item.fn" :icon="item.icon" :mode="mode" @click="item.fn")
                            a(v-else="item.link" :href="item.link" target="_blank")
                                NavIcon(:icon="item.icon" :mode="mode")
</template>

<script lang="ts">
import { oneOf } from '@/utils'
import { Poptip } from '@/components/poptip'
import NavIcon from '@/components/nav/NavIcon.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserInformation, WrapClasses, CSSStyles } from '@/types/components'

@Component({
    components: {
        NavIcon,
        Poptip,
    },
})
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
    private title?: string

    @Prop({ type: String, default: '' })
    private author?: string

    @Prop({ type: String, default: '' })
    private description?: string

    @Prop({ type: [Number, String], default: 4 })
    private maxNum!: number | string

    private prefixCls: string = 'info'

    private poptipValue: boolean = false

    private get noImageUserInformation(): UserInformation[] {
        const curNoImageUserInformation: UserInformation[] = this.userInformation.filter((item) => !item.image)
        if (curNoImageUserInformation.length > this.maxNum) { return curNoImageUserInformation.splice(0, Number(this.maxNum)) }
        return curNoImageUserInformation
    }

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.mode + '-' + this.prefixCls,
        ]
    }

    private get wrapStyle(): CSSStyles<CSSStyleDeclaration> {
        if (this.mode === 'horizontal') { return {} }
        const style: CSSStyles<CSSStyleDeclaration> = {}
        style.backgroundImage = 'url(http://img.cdn.myrove.cn/media/static/images/summary/003.jpg)'
        return style
    }
}
</script>

<style lang="stylus" scoped>
.vertical-info
    width 100%
    height 100%
    position relative
    background-attachment fixed
    background-repeat no-repeat
    background-size cover
// .vertical-info-title

@media screen and (max-width 860px)
    .vertical-info
         background-attachment scroll
</style>
