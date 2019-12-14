<template lang="pug">
    Layout
        Drawer(ref="drawer" isCollapsible v-model="isCollapsed")
            NavDrawer
        Layout
            Header
                NavBar
            Content
                keep-alive
                    router-view
            Footer
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue'
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
    },
})
export default class Index extends Vue {
    private isCollapsed: boolean = false

    private setDrawer(): void {
        (this.$refs.drawer as Drawer).toggleCollapse()
    }
}
</script>

<style lang="stylus" scoped>

</style>