<template lang="pug">
    div
        Anchor(title="Layout 布局")
        Example.simple(title="基本结构")
            template(v-slot:dome)
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
            template(v-slot:description)
                p 经典页面布局
            template(v-slot:code)
                Block(:content="dome1" lang="VUE" :custom="['language-pug']")
        Example.simple(title="自定义触发器")
            template(v-slot:dome)
                div.layout-simple-dome
                    Layout.layout-trigger-dome
                        Drawer.drawer-trigger-dome(v-model="isCollapsed2" ref="drawer" isCollapsible isMatchMediaMaxWidth) Drawer
                        Layout
                            Header.header-trigger-dome
                                div.icon-menu-wrap(@click="menuClick")
                                    div(:class="menuClasses")
                            Content.conent-trigger-dome Content
                            Footer.footer-trigger-dome Footer
            template(v-slot:description)
                p 使用自定义触发器, 通过 
                    code.code-mark Drawer
                    | &nbsp;子类 
                    code.code-mark toggleCollapse
                    | &nbsp;方法触发
            template(v-slot:code)
                Block(:content="dome2" lang="VUE" :custom="['language-pug']")
        div.api
            Anchor(title="API" label="h2")
            Anchor(title="Drawer props" label="h3")
            Table(:column="columns" :data="data")
            Anchor(title="Drawer methods" label="h3")
            Table(:column="columns2" :data="data2")
</template>

<script lang="ts">
import { Table } from '@/components/table'
import { Anchor } from '@/components/anchor'
import { Example, Block } from '@/components/example'
import { Component, Vue } from 'vue-property-decorator'
import { WrapClasses, Column, Row } from '@/types/components'
import { Layout, Header, Drawer, Content, Footer } from '@/components/layout'

@Component({
    name: 'LayoutDoc',
    components: {
        Layout,
        Header,
        Content,
        Footer,
        Example,
        Block,
        Drawer,
        Table,
        Anchor,
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

    private columns: Column[] = [
        {
            key: 'prop',
            title: '属性',
        },
        {
            key: 'description',
            title: '说明',
        },
        {
            key: 'type',
            title: '类型',
        },
        {
            key: 'default',
            title: '默认值',
        },
    ]

    private data: Row[] = [
        {
            prop: 'value',
            description: '侧边栏是否收起，可使用 v-model 双向绑定数据',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'width',
            description: '宽度',
            type: 'Number',
            default: '250',
        },
        {
            prop: 'isCollapsible',
            description: '是否可收起',
            type: 'Boolean',
            default: 'false',
        },
        {
            prop: 'isMatchMediaMaxWidth',
            description: '是否使用媒体适配仅在小于860px时显示',
            type: 'Boolean',
            default: 'ture',
        },
        {
            prop: 'matchMediaMaxWidth',
            description: '媒体适配宽度',
            type: 'Number',
            default: '860',
        },
    ]

    private columns2: Column[] = [
        {
            key: 'methods',
            title: '方法名',
        },
        {
            key: 'description',
            title: '说明',
        },
    ]

    private data2: Row[] = [
        {
            methods: 'toggleCollapse',
            description: '改变Drawer展开-收起状态',
        },
    ]

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
