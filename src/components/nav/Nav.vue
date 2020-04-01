<template lang="pug">
    Menu(:mode="mode")
        SubMenu(v-if="")
</template>

<script lang="ts">
import { MenuItemData } from '@/types/components'
import { Menu, MenuItem, SubMenu } from '@/components/menu'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Menu,
        MenuItem,
        SubMenu,
    },
})
export default class Nav extends Vue {
    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private data!: MenuItemData[]

    @Prop({ type: String, default: 'horizontal' })
    private mode!: string

}
</script>
