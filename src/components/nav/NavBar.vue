<template lang="pug">
    nav.navbar
        div.navbar-left
            Logo
        div.navbar-middle
            Menu(mode="horizontal")
                Nav(v-for="(item, index) in menuItemDataArr" :key="index" :menuItemData="item")
        div.navbar-right
            Icon.search(type="search" size="30" fixed)
            Poptip.login-poptip(trigger="hover" placement="bottom-end" width="110")
                Icon.login(type="user-circle" size="30" fixed)
                template(v-slot:content)
                    | Whether to 
                    a(href="/login" target="_blank" style="color:#29d") login in 
                    | now?
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Menu } from '@/components/menu'
import Nav from '@/components/nav/Nav.vue'
import { Poptip } from '@/components/poptip'
import Logo from '@/components/nav/Logo.vue'
import { MenuItemData } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Nav,
        Icon,
        Menu,
        Logo,
        Poptip,
    },
})
export default class NavBar extends Vue {
    @Prop({
        type: Array,
        required: true,
        default() {
            return []
        },
    })
    private menuItemDataArr!: MenuItemData[]
}
</script>

<style lang="stylus" scoped>
.navbar
    display flex
    justify-content space-between
    padding 0 20px

.search
.login
    margin 0 5px
    cursor pointer
    transition color .5s
    &:hover
        color $font-color-hover

@media screen and (max-width 860px)
    .navbar
        width 100%
        height 100%
        display block
        padding 0
        .navbar-middle
        .navbar-right
            display none
</style>