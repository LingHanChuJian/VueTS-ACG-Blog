<template lang="pug">
    SubMenu(
        v-if="menuItemData.children"
        :name="menuItemData.name"
        :to="menuItemData.to"
        :class="[mode + '-' + menuItemData.className]"
    )
        template(v-slot:title)
            NavIcon(:icon="menuItemData.icon")
            | {{ menuItemData.content }}
        MenuItem(
            v-for="item in menuItemData.children"
            :key="item.name"
            :name="item.name"
            :to="item.to"
        )
            NavIcon(:icon="item.icon")
            | {{ item.content }}
    MenuItem(
        v-else
        :name="menuItemData.name"
        :to="menuItemData.to"
        :class="[mode + '-' + menuItemData.className]"
    )
        NavIcon(:icon="menuItemData.icon")
        | {{ menuItemData.content }}
</template>

<script lang="ts">
import { typeOf } from '@/utils'
import NavIcon from '@/components/nav/NavIcon.vue'
import { MenuItem, SubMenu } from '@/components/menu'
import { MenuItemData } from '@/types/components'
import { Component, Prop, Inject, Provide, Vue } from 'vue-property-decorator'

@Component({
    components: {
        MenuItem,
        SubMenu,
        NavIcon,
    },
})
export default class Nav extends Vue {
    @Prop({
        type: Object,
        default() {
            return {}
        },
    })
    private menuItemData!: MenuItemData

    @Inject('mode')
    private readonly mode!: string
}
</script>
