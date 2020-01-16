<template lang="pug">
    div
        h2 Layout 布局
        Example.simple(title="基本结构")
            template(slot="dome")
                div.layout-simple-dome
                    Layout
                        Header.header-dome Header
                        Content.conent-dome Content
                        Footer.footer-dome Footer
                div.layout-simple-dome
                    Layout
                        Header.header-dome Header
                        Layout
                            Drawer.drawer-dome(v-model="isCollapsed" isMatchMediaMaxWidth) Drawer
                            Content.conent-dome Content
                        Footer.footer-dome Footer
                div.layout-simple-dome
                    Layout
                        Header.header-dome Header
                        Layout
                            Content.conent-dome Content
                            Drawer.drawer-dome(v-model="isCollapsed" isMatchMediaMaxWidth) Drawer
                        Footer.footer-dome Footer
                div.layout-simple-dome
                    Layout
                        Drawer.drawer-dome2(v-model="isCollapsed" isMatchMediaMaxWidth) Drawer
                        Layout
                            Header.header-dome Header
                            Content.conent-dome Content
                            Footer.footer-dome Footer
            template(slot="description")
                p 经典页面布局
            template(slot="code")
                Block(:content="dome1" lang="VUE" :custom="['language-pug']")
        Example.simple(title="自定义触发器")
            template(slot="dome")
                div.layout-simple-dome
                    Layout
                        Drawer.drawer-trigger-dome(v-model="isCollapsed" isMatchMediaMaxWidth) Drawer
                        Layout
                            Header.header-trigger-dome
                                div(:class="menuClasses" @click="menuClick")
                            Content.conent-trigger-dome Content
                            Footer.footer-trigger-dome Footer
            template(slot="description")
            template(slot="code")
</template>

<script lang="ts">
import { WrapClasses } from '@/types/components'
import { Icon } from '@/components/icon'
import { Example, Block } from '@/components/example'
import { Component, Vue } from 'vue-property-decorator'
import { Layout, Header, Drawer, Content, Footer } from '@/components/layout'

@Component({
    components: {
        Layout,
        Header,
        Content,
        Footer,
        Example,
        Icon,
        Block,
        Drawer,
    },
})
export default class LayoutDoc extends Vue {
    private isCollapsed: boolean = true
    private dome1: string =
`<template lang="pug">
    Layout
        Header.header-dome Header
        Content.conent-dome Content
        Footer.footer-dome Footer

    Layout
        Header.header-dome Header
        Layout
            Drawer.drawer-dome(v-model="isCollapsed" isMatchMediaMaxWidth) Drawer
            Content.conent-dome Content
        Footer.footer-dome Footer

    div.layout-simple-dome
        Layout
            Header.header-dome Header
            Layout
                Content.conent-dome Content
                Drawer.drawer-dome(v-model="isCollapsed" isMatchMediaMaxWidth) Drawer
            Footer.footer-dome Footer

    div.layout-simple-dome
        Layout
            Drawer.drawer-dome2(v-model="isCollapsed" isMatchMediaMaxWidth) Drawer
            Layout
                Header.header-dome Header
                Content.conent-dome Content
                Footer.footer-dome Footer
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { Layout, Header, Drawer, Content, Footer } from '@/components/layout'

    @Component({
        components: {
            Layout,
            Header,
            Drawer,
            Content,
            Footer,
        },
    })
    export default class Doc extends Vue {
        private isCollapsed: boolean = true
    }
<\/script>

<style lang="stylus" scoped>
.header-dome
.footer-dome
    background-color #7cbce9
    text-align center
    height 64px
    line-height 64px

.drawer-dome
.drawer-dome2
    background-color #3a9fe8
    text-align center
    min-height 120px
    line-height 120px

.drawer-dome2
    line-height 248px

.conent-dome
    background-color #0f8de9
    text-align center
    min-height 120px
    line-height 120px
    animation none
</style>`

    private get menuClasses(): Array<string | WrapClasses> {
        return [
            'icon-menu',
            {
                [`icon-menu-opened`] : this.isCollapsed,
            },
        ]
    }
    // private mounted() {
    // }
}
</script>

<style lang="stylus" scoped>
.layout-simple-dome
    margin-bottom 48px

.header-dome
.footer-dome
    background-color #7cbce9
    text-align center
    height 64px
    line-height 64px

.drawer-dome
.drawer-dome2
    background-color #3a9fe8
    text-align center
    min-height 120px
    line-height 120px

.drawer-dome2
    line-height 248px

.conent-dome
    background-color #0f8de9
    text-align center
    min-height 120px
    line-height 120px
    animation none

.simple
    margin-bottom 20px

menu(n)
    transition all .2s
    background-color #000000
    width 50px
    height 3px
    position n

.icon-menu
    menu(relative)
    &:before
        menu(absolute)
        content ''
        top -8px
    &:after
        menu(absolute)
        content ''
        bottom 8px

.icon-menu-opened
    background-color transparent
    &:before
        top 0
        transform rotate(-45deg)
    &:after
        bottom 0
        transform rotate(45deg)
</style>
