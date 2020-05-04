<template lang="pug">
    nav.navbar-mobile
        div.icon-menu-wrap(@click.stop="menuClick")
            div(:class="menuClasses")
        Logo(:class="logoClasses")
        Information(
            mode="horizontal"
            :userInformation="userInformation"
            title="Hi,Wanderer!"
        )
</template>

<script lang="ts">
import Index from '@/views/Index.vue'
import { findComponentUpward } from '@/utils'
import { Nav, Logo, Information } from '@/components/nav'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { WrapClasses, UserInformation } from '@/types/components'

@Component({
    components: {
        Nav,
        Logo,
        Information,
    },
})
export default class NavBarMobile extends Vue {
    @Prop({ type: Boolean, default: false })
    private isCollapsed!: boolean

    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private userInformation!: UserInformation[]

    private menuClick(): void {
        this.$emit('on-menu-click')
    }

    private get logoClasses(): Array<string | WrapClasses> {
        return [
            {
                [`logo-opened`] : this.isCollapsed,
            },
        ]
    }

    private get menuClasses(): Array<string | WrapClasses> {
        return [
            'icon-menu',
            {
                [`icon-menu-opened`] : this.isCollapsed,
            },
        ]
    }
}
</script>

<style lang="stylus" scoped>
.navbar-mobile
    display none
    justify-content space-between
    padding-right 10px

.logo-opened
    transform translateX(250px)

menu(n)
    transition all .2s
    background-color $font-color
    width 30px
    height 3px
    position n

.icon-menu-wrap
    position relative
    width 50px
    height 50px
    cursor pointer

.icon-menu
    top 25px
    left 10px
    menu(absolute)
    &:before
        menu(absolute)
        content ''
        top -8px
    &:after
        menu(absolute)
        content ''
        top 8px

.icon-menu-opened
    background-color transparent
    &:before
        top 0
        transform rotate(-45deg)
        background-color #FFFFFF
    &:after
        top 0
        transform rotate(45deg)
        background-color #FFFFFF

@media screen and (max-width 860px)
    .navbar-mobile
        display flex
</style>