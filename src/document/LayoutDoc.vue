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
                Code(:content="text1" lang="VUE")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Example, Code } from '@/components/example'
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
        Code,
    },
})
export default class LayoutDoc extends Vue {
    private text1: string = `<template lang="pug"></template>`
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