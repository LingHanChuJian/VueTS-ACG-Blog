<template lang="pug">
    Layout
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
                Menu(activeName="layout")
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
            Content.content-doc
                keep-alive
                    router-view
        Footer
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Menu, MenuItem, SubMenu } from '@/components/menu'
import { Layout, Header, Drawer, Content } from '@/components/layout'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Layout,
        Header,
        Drawer,
        Content,
        Menu,
        MenuItem,
        SubMenu,
        Icon,
    },
})
export default class Document extends Vue {
    private isCollapsed: boolean = true
}
</script>

<style lang="stylus" scoped>
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