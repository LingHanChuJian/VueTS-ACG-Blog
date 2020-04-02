<template lang="pug">
    div.logo
        router-link(to="home")
            span.logo-title
                ruby 凌
                    rt こん
                ruby 寒
                    rt にちは
            ruby 初见
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Logo extends Vue {}
</script>

<style lang="stylus" scoped>
.logo
    font-size 20px
    transition transform .2s ease-in-out
    a
        color $font-color
        &:hover
            color $font-color-hover
            .logo-title
                background-color $font-color-hover
                color #FFFFFF
                rt
                    color $font-color-hover
    .logo-title
        background-color rgba(255,255,255,.5)
        border-radius 5px
</style>