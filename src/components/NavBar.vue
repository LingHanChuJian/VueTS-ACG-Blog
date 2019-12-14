<template lang="pug">
    nav.navbar
        div.logo
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