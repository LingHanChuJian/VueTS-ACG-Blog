<template lang="pug">
    nav.navbar
        div.navbar-left
            Logo
        div.navbar-middle
            Menu(:mode="mode")
                Nav(v-for="(item, index) in menuData" :key="index" :menuItemData="item")
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
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'

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
    private menuData!: MenuItemData[]

    @Provide('mode')
    private mode: string = 'horizontal'
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

.login:hover
    animation animation-counterclockwise-clockwise 2.5s ease infinite

@media screen and (max-width 860px)
    .navbar
        display none
</style>