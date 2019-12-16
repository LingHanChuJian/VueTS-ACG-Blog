<template lang="pug">
    nav.navbar
        div.navbar-left
            div.icon-menu
            div.logo
        div.navbar-right
</template>

<script lang="ts">
import { Menu, SubMenu, MenuItem } from '@/components/menu'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Menu,
        SubMenu,
        MenuItem,
    },
})
export default class NavBar extends Vue {
}
</script>

<style lang="stylus" scoped>
menu()
    transition all .2s
    background-color #000000
    width 50px
    height 3px  

@media screen and (max-width 860px)
    .navbar
        width 100%
        height 100%
        .icon-menu
            menu()
            position relative
            &:before
                menu()
                content ''
                position absolute
                top -8px
            &:after
                menu()
                content ''
                position absolute
                bottom 8px
        .icon-menu-opened
            menu()
            position relative
            background-color transparent
            &:before
                menu()
                content ''
                position absolute
                transform rotate(-45deg)
                top 0
            &:after
                menu()
                content ''
                position absolute
                transform rotate(45deg)
                bottom 0
</style>