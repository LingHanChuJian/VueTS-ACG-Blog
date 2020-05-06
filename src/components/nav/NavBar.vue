<template lang="pug">
    nav.navbar
        div.navbar-left
            Logo
        transition(name="menu")
            div.navbar-middle(v-show="isMenu")
                Menu(mode="horizontal")
                    Nav(v-for="(item, index) in menuData" :key="index" :menuItemData="item" mode="horizontal")
        div.navbar-right
            Icon.search(type="search" size="30" fixed @click="searchClick")
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
    private menuData!: MenuItemData[]

    @Prop({ type: Boolean, default: false })
    private isMenu!: boolean

    private searchClick(): void {
        this.$emit('search')
    }
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

.navbar-middle-animation
    animation animation-right-left .2s ease-in-out

.menu-enter-active
.menu-leave-active
    transition all .5s

.menu-enter
.menu-leave-to
    transform translateX(30px)
    opacity 0

@media screen and (max-width 860px)
    .navbar
        display none
</style>