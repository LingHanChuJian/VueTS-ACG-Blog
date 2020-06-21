<template lang="pug">
    Layout
        Drawer.drawer(ref="drawer" isCollapsible v-model="isCollapsed")
            NavDrawer(:menuData="menuData")
        Layout(:class="{ 'layout-opened': isCollapsed }" @click.native="layoutClick")
            Header(
                :class="headerClasses"
                @mouseenter.native="handleToggle"
                @mouseleave.native="handleToggle"
            )
                NavBar(:menuData="menuData" :isMenu="isMenu" @search="search")
                NavBarMobile(:isCollapsed="isCollapsed" @on-menu-click="setDrawer")
            Layout.acg-layout(:class="{ 'collapsed-opened': isCollapsed }")
                Header.acg-header(v-show="isHeader")
                    keep-alive(include="AcgHeader")
                        component(:is="activeComponent")
                Content
                    keep-alive
                        router-view
                Footer
                    Acg-Footer
        GoTop
        NavSearch(mode="horizontal" :visible.sync="isSearch")
</template>

<script lang="ts">
import { Route } from 'vue-router'
import { menuData } from '@/config'
import GoTop from '@/components/GoTop.vue'
import AcgFooter from '@/components/AcgFooter.vue'
import ScrollMixins from '@/components/mixins/scroll'
import { AcgHeader, ArticleHeader } from '@/components/acg-header'
import { Component, Mixins, Watch, Vue } from 'vue-property-decorator'
import { NavBar, NavDrawer, NavBarMobile, NavSearch } from '@/components/nav'
import { Layout, Header, Content, Footer, Drawer } from '@/components/layout'
import { WrapClasses, MenuItemData, UserInformation } from '@/types/components'

@Component({
    components: {
        Layout,
        Header,
        Content,
        Footer,
        Drawer,
        NavBar,
        NavDrawer,
        NavSearch,
        NavBarMobile,
        ArticleHeader,
        AcgHeader,
        AcgFooter,
        GoTop,
    },
})
export default class Index extends Mixins(ScrollMixins) {
    // 侧边栏
    private isCollapsed: boolean = false

    // 展示菜单
    private isMenu: boolean = false

    // 显示 search
    private isSearch: boolean = false

    // 显示 header
    private isHeader: boolean = true

    private menuData: MenuItemData[] = menuData

    private setDrawer(): void {
        (this.$refs.drawer as Drawer).toggleCollapse()
    }

    private layoutClick(): void {
        if (!this.isCollapsed) { return }
        this.setDrawer()
    }

    private handleToggle(mouseEvents: Event): void {
        if (this.scrollTop !== 0) { return }
        this.isMenu = mouseEvents.type === 'mouseenter'
    }

    private search(): void {
        this.isSearch = !this.isSearch
    }

    private get headerClasses(): Array<string | WrapClasses> {
        return [
            'header-navbar',
            {
                ['toggle-header-navbar']: this.isMenu,
            },
        ]
    }

    private get activeComponent(): string {
        return this.$route.name === 'home' ?  'AcgHeader' : 'ArticleHeader'
    }

    @Watch('scrollTop')
    private onOffsetTopChange(newValue: number, oldValue: number) {
        this.isMenu = newValue !== 0
    }

    @Watch('$route')
    private onRouteChange(to: Route, from: Route) {
        this.isHeader = to.name !== 'search'
    }
}
</script>

<style lang="stylus" scoped>
toggle-header-navbar()
  background-color rgba(255,255,255,.95)
  box-shadow 0 1px 40px -8px rgba(0,0,0,.5)

.drawer
.acg-layout
    transition all .3s ease-in-out

.acg-header
    position relative
    height auto
    &:before
        content ''
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background-attachment fixed
        background url(./../assets/images/dot.png)
        z-index 10

.layout-opened:after
    content ''
    width 100% 
    height 100%
    position fixed
    background-color rgba(0,0,0,.3)

.collapsed-opened
    transform translateX(250px)
    position fixed
    left 0
    right 0

@media screen and (min-width 860px)
    .header-navbar
        position fixed
        width 100%
        background-color transparent
        transition background .4s ease
        z-index 999
    .toggle-header-navbar
        toggle-header-navbar()

@media screen and (max-width 860px)
    .header-navbar
        position absolute
        width 100%
        z-index 999
    .acg-header:before
        background url(./../assets/images/grid.png)
</style>