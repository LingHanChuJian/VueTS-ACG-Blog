<template lang="pug">
    aside.navdrawer
        div.navdrawer-top
            div.author
        div.navdrawer-middle
        div.navdrawer-bottom
</template>

<script lang="ts">
import { MenuItemData } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
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
</style>