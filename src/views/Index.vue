<template lang="pug">
    Layout
        Drawer(ref="drawer" isCollapsible v-model="isCollapsed")
            NavDrawer
        Layout(:class="collapsedClasses")
            Header
                NavBar
            Content
                keep-alive
                    router-view
            Footer
                FooterCenter
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterCenter from '@/views/Footer.vue'
import { WrapClasses } from '@/types/components'
import NavDrawer from '@/components/NavDrawer.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Layout, Header, Content, Footer, Drawer } from '@/components/layout'

@Component({
    components: {
        Layout,
        Header,
        Content,
        Footer,
        Drawer,
        NavBar,
        NavDrawer,
        FooterCenter,
    },
})
export default class Index extends Vue {
    private isCollapsed: boolean = false

    public setDrawer(): void {
        (this.$refs.drawer as Drawer).toggleCollapse()
    }

    private get collapsedClasses(): Array<string | WrapClasses> {
        return [
            {
                [`collapsed-opened`] : this.isCollapsed,
            },
        ]
    }
}
</script>

<style lang="stylus" scoped>
.collapsed-opened
    transform translateX(250px)
</style>