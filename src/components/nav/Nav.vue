<template lang="pug">
    SubMenu(
        v-if="menuItemData.children"
        :name="menuItemData.name"
        :to="menuItemData.to"
        :class="[mode + '-' + menuItemData.className]"
    )
        template(v-slot:title)
            NavIcon(:icon="menuItemData.icon" :mode="mode")
            | {{ menuItemData.content }}
        MenuItem(
            v-for="item in menuItemData.children"
            :key="item.name"
            :name="item.name"
            :to="item.to"
        )
            NavIcon(:icon="item.icon" :mode="mode")
            | {{ item.content }}
    MenuItem(
        v-else
        :name="menuItemData.name"
        :to="menuItemData.to"
        :class="[mode + '-' + menuItemData.className]"
    )
        NavIcon(:icon="menuItemData.icon" :mode="mode")
        | {{ menuItemData.content }}
</template>

<script lang="ts">
import { typeOf, oneOf } from '@/utils'
import { MenuItemData } from '@/types/components'
import NavIcon from '@/components/nav/NavIcon.vue'
import { MenuItem, SubMenu } from '@/components/menu'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        MenuItem,
        SubMenu,
        NavIcon,
    },
})
export default class Nav extends Vue {
    @Prop({
        type: String,
        default: 'horizontal',
        validator(value: string) {
            return oneOf(value, ['vertical', 'horizontal'])
        },
    })
    private mode!: string

    @Prop({
        type: Object,
        default() {
            return {}
        },
    })
    private menuItemData!: MenuItemData
}
</script>
