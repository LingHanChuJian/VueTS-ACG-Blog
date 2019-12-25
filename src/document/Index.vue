<template lang="pug">
    Layout
        Header
        Layout
            Drawer(v-model="isCollapsed" isMatchMediaMaxWidth)
                Menu
                    MenuItem(name="layout" to="layout") Layout 布局
                    SubMenu(name="layout")
                        template(slot="title")
                            Icon(type="archive")
                            | 归档
                        MenuItem(name="layout" to="layout")
                            Icon(type="archive")
                            | Layout 布局
            Content
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

</style>