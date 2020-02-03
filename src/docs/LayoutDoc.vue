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
                    Layout.layout-trigger-dome
                        Drawer.drawer-trigger-dome(v-model="isCollapsed2" ref="drawer" isCollapsible isMatchMediaMaxWidth) Drawer
                        Layout
                            Header.header-trigger-dome
                                div.icon-menu-wrap(@click="menuClick")
                                    div(:class="menuClasses")
                            Content.conent-trigger-dome Content
                            Footer.footer-trigger-dome Footer
            template(slot="description")
                p 使用自定义触发器, 通过 
                    code.code-mark Drawer 
                    | 子类 
                    code.code-mark toggleCollapse 
                    | 方法触发
            template(slot="code")
                Block(:content="dome2" lang="VUE" :custom="['language-pug']")
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { WrapClasses } from '@/types/components'
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
    private isCollapsed2: boolean = true
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

    private dome2: string =
`<template lang="pug">
    Layout.layout-trigger-dome
        Drawer.drawer-trigger-dome(v-model="isCollapsed" ref="drawer" isCollapsible isMatchMediaMaxWidth) Drawer
        Layout
            Header.header-trigger-dome
                div.icon-menu-wrap(@click="menuClick")
                    div(:class="menuClasses")
            Content.conent-trigger-dome Content
            Footer.footer-trigger-dome Footer
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

        private menuClick(): void {
            (this.$refs.drawer as Drawer).toggleCollapse()
        }

        private get menuClasses(): Array<string | WrapClasses> {
            return [
                'icon-menu',
                {
                    ['icon-menu-opened'] : this.isCollapsed,
                },
            ]
        }
    }
<\/script>

<style lang="stylus" scoped>
.layout-trigger-dome
    border 1px solid #d7dde4

.drawer-trigger-dome
    text-align center
    line-height 400px
    color #FFFFFF
    background-color #515a6e

.header-trigger-dome
    line-height 75px
    box-shadow  0 1px 1px rgba(0,0,0,.1)

.conent-trigger-dome
    min-height 260px
    line-height 260px
    text-align center

.footer-trigger-dome
    min-height 64px
    line-height 64px
    box-shadow 0 0 5px rgba(0,0,0,0.1)
    text-align center

menu(n)
    transition all .2s
    background-color #000000
    width 30px
    height 3px
    position n

.icon-menu-wrap
    width 50px
    height 50px
    float left
    cursor pointer
    position relative

.icon-menu
    top 25px
    left 10px
    menu(absolute)
    &:before
        menu(absolute)
        content ''
        top -8px
    &:after
        menu(absolute)
        content ''
        top 8px

.icon-menu-opened
    background-color transparent
    &:before
        top 0
        transform rotate(-45deg)
    &:after
        top 0
        transform rotate(45deg)
</style>`

    private menuClick(): void {
        (this.$refs.drawer as Drawer).toggleCollapse()
    }

    private get menuClasses(): Array<string | WrapClasses> {
        return [
            'icon-menu',
            {
                [`icon-menu-opened`] : this.isCollapsed2,
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

.layout-trigger-dome
    border 1px solid #d7dde4

.drawer-trigger-dome
    text-align center
    line-height 400px
    color #FFFFFF
    background-color #515a6e

.header-trigger-dome
    line-height 75px
    box-shadow  0 1px 1px rgba(0,0,0,.1)

.conent-trigger-dome
    min-height 260px
    line-height 260px
    text-align center

.footer-trigger-dome
    min-height 64px
    line-height 64px
    box-shadow 0 0 5px rgba(0,0,0,0.1)
    text-align center

menu(n)
    transition all .2s
    background-color #000000
    width 30px
    height 3px
    position n

.icon-menu-wrap
    width 50px
    height 50px
    float left
    cursor pointer
    position relative

.icon-menu
    top 25px
    left 10px
    menu(absolute)
    &:before
        menu(absolute)
        content ''
        top -8px
    &:after
        menu(absolute)
        content ''
        top 8px

.icon-menu-opened
    background-color transparent
    &:before
        top 0
        transform rotate(-45deg)
    &:after
        top 0
        transform rotate(45deg)
</style>
