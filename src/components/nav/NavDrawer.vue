<template lang="pug">
    aside.navdrawer
        div.navdrawer-top
            div.avatar
        div.navdrawer-middle
        div.navdrawer-bottom
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NavDrawer extends Vue {

}
</script>

<style lang="stylus" scoped>
.navdrawer-top
    width 100%
</style>