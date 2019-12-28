<template lang="pug">
    div(:class="wrapClasses" :id="uuid")
        div(:class="[prefixCls + '-dome']")
            slot(name="dome")
        div(:class="[prefixCls + '-title']")
            span(v-if="title") {{ title }}
                a(:href="uuid" :data-title="title") #
        div(:class="[prefixCls + '-content']")
            slot(name="content")
        div(:class="[prefixCls + '-code']")
            
            Icon(:class="[prefixCls + '-icon']" :type="iconPrefixType" :style="iconStyles")
            span(v-if="!opened") Show Code
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import UUID from '@/components/mixins/uuid'
import { WrapClasses, CSSStyles } from '@/types/components'
import CollapseTransition from '@/components/base/CollapseTransition'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
        CollapseTransition,
    },
})
export default class Example extends Mixins(UUID) {
    @Prop({ type: String, default: '' })
    private title!: string

    @Prop({ type: Boolean, default: false })
    private isOpened!: boolean

    private prefixCls: string = 'example'

    private opened: boolean = this.isOpened

    private iconPrefixType: string = 'chevron-down'

    private get wrapClasses(): Array<string | WrapClasses> {
        return [
            this.prefixCls,
        ]
    }

    private get iconStyles(): CSSStyles<CSSStyleDeclaration> {
        const styles: CSSStyles<CSSStyleDeclaration> = {}
        styles.transform = this.opened ? 'rotate(180deg)' : ''
        return styles
    }
}
</script>

<style lang="stylus" scoped>

</style>