<template lang="pug">
    div
        h2 Layout 布局
        Example(title="基本结构")
            template(slot="dome")
                div.layout-simple-dome
                    Layout
                        Header.header-dome Header
                        Content.conent-dome Content
                        Footer.footer-dome Footer
            template(slot="description")
                p 经典页面布局
            template(slot="code")
                Block(:content="text1" lang="VUE" :custom="['language-pug', 'language-stylus', 'language-ts']")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Example, Block } from '@/components/example'
import { Component, Vue } from 'vue-property-decorator'
import { Layout, Header, Content, Footer } from '@/components/layout'

@Component({
    components: {
        Layout,
        Header,
        Content,
        Footer,
        Example,
        Icon,
        Block,
    },
})
export default class LayoutDoc extends Vue {
    private text1: string = `<template lang="pug">
    //- 说明
    a she
    Layout
        Header.header-dome(href="sb") Header
        Content.conent-dome Content
        Footer.footer-dome Footer
</template>

<script lang="ts">
//- 说明
<\/script>

<style lang="stylus" scoped>
.header-dome
.footer-dome
    background-color #7cbce9
    text-align center
    height 64px
    line-height 64px

.conent-dome
    background-color #0f8de9
    text-align center
    min-height 120px
    line-height 120px
    animation none
</style>`
    // private mounted() {
    // }
}
</script>

<style lang="stylus" scoped>
.header-dome
.footer-dome
    background-color #7cbce9
    text-align center
    height 64px
    line-height 64px

.conent-dome
    background-color #0f8de9
    text-align center
    min-height 120px
    line-height 120px
    animation none
</style>
