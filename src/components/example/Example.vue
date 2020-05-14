<template lang="pug">
    div(:class="wrapClasses" :id="uuid")
        div(:class="[prefixCls + '-dome']")
            slot(name="dome")
        div(:class="[prefixCls + '-title']")
            span(v-if="title") {{ title }}
                a(:href="'#' + uuid" :data-title="title") #
        div(:class="[prefixCls + '-description']")
            slot(name="description")
        div(:class="[prefixCls + '-code']")
            CollapseTransition(appear)
                div(v-show="opened" ref="code" :class="[prefixCls + '-content-code', 'markdown']")
                    slot(name="code")
            div(:class="[prefixCls + '-code-more']" @click.exact="handleClick")
                Icon(:class="[prefixCls + '-icon']" :type="iconPrefixType" :style="iconStyles")
                span(v-if="!opened") Show Code
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { hljsCode } from '@/utils/markdown'
import UUIDMixins from '@/components/mixins/uuid'
import { WrapClasses, CSSStyles } from '@/types/components'
import CollapseTransition from '@/components/base/collapseTransition'
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator'

import 'highlight.js/styles/atom-one-light.css'

@Component({
    components: {
        Icon,
        CollapseTransition,
    },
})
export default class Example extends Mixins(UUIDMixins) {
    @Prop({ type: String, default: '' })
    private title!: string

    @Prop({ type: Boolean, default: false })
    private isOpened!: boolean

    private prefixCls: string = 'example'

    private opened: boolean = this.isOpened

    private iconPrefixType: string = 'chevron-down'

    private handleClick(): void {
        this.opened = !this.opened
    }

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

    private mounted() {
        this.$nextTick(() => { hljsCode((this.$refs.code as HTMLElement)) })
    }
}
</script>
