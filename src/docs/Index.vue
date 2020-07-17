<template lang="pug">
    Layout.layout-doc
        Header.header-doc
            div.header-left 
                router-link(to="layout")
                    span.logo-title
                        ruby 凌
                            rt こん
                        ruby 寒
                            rt にちは
                    ruby 初见
        Layout
            Drawer.drawer-doc(v-model="isCollapsed" isMatchMediaMaxWidth)
                Menu(:activeName="getActiveName")
                    MenuItem(name="layout" to="layout")
                        Icon(type="clone" fixed)
                        | Layout 布局
                    MenuItem(name="menu" to="menu")
                        Icon(type="bars" fixed)
                        | Menu 菜单
                    MenuItem(name="poptip" to="poptip")
                        Icon(type="comments" fixed)
                        | Poptip 气泡
                    MenuItem(name="icon" to="icon")
                        Icon(type="heart" fixed)
                        | Icon 图标
                    MenuItem(name="message" to="message")
                        Icon(type="exclamation-circle" fixed)
                        | Message 消息
                    MenuItem(name="input" to="input")
                        Icon(type="edit" fixed)
                        | Input 输入
            Content.content-doc
                keep-alive
                    router-view
        Footer
            Acg-Footer
        GoTop
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import GoTop from '@/components/GoTop.vue'
import AcgFooter from '@/components/AcgFooter.vue'
import { Menu, MenuItem, SubMenu } from '@/components/menu'
import { Layout, Header, Drawer, Content, Footer } from '@/components/layout'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Layout,
        Header,
        Drawer,
        Content,
        Footer,
        AcgFooter,
        Menu,
        MenuItem,
        SubMenu,
        Icon,
        GoTop,
    },
})
export default class Document extends Vue {
    private isCollapsed: boolean = true

    private get getActiveName(): string {
        const name: string | undefined = this.$route.name
        return name ? name : 'layout'
    }
}
</script>

<style lang="stylus" scoped>
.layout-doc
    min-width 860px

.header-doc
    padding 0 20px
    border-bottom 1px solid #eaecef
    .header-left
        font-size 20px
        a
            color $font-color
            &:hover
                color $font-color-hover
                .logo-title
                    background-color $font-color-hover
                    color #FFFFFF
                    rt
                        color $font-color-hover
        .logo-title
            background-color rgba(255,255,255,.5)
            border-radius 5px

.drawer-doc
    padding 20px 0
    border-right 1px solid #eaecef

.content-doc
    padding 0 20px
    min-height calc(100vh - 76px)
</style>