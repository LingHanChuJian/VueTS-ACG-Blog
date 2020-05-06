<template lang="pug">
    aside.navdrawer
        div.navdrawer-top
            div.author
        div.navdrawer-middle
            Information
            NavSearch
            Menu
                Nav(v-for="(item, index) in menuData" :key="index" :menuItemData="item")
        div.navdrawer-bottom
            p &copy; 2019 · 凌寒初见
</template>

<script lang="ts">
import { Menu } from '@/components/menu'
import Nav from '@/components/nav/Nav.vue'
import { MenuItemData } from '@/types/components'
import NavSearch from '@/components/nav/NavSearch.vue'
import Information from '@/components/nav/Information.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Menu,
        Nav,
        NavSearch,
        Information,
    },
})
export default class NavDrawer extends Vue {
    @Prop({
        type: Array,
        required: true,
        default() {
            return []
        },
    })
    private menuData!: MenuItemData[]

}
</script>

<style lang="stylus" scoped>
.navdrawer-top
    margin 30px 0 20px 0
    width 100%
    .author
        margin 0 auto
        width 90px
        height 90px
        border-radius 100%
        background url(./../../assets/images/author.jpg) no-repeat
        background-size cover

.navdrawer-bottom
    text-align center
</style>