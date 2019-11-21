import { Component, Vue } from 'vue-property-decorator'
import { findComponentUpward, findComponentsUpward } from '@/utils'

@Component
export default class MenuMixins extends Vue {
    private menu: Vue = findComponentUpward(this, 'Menu')

    public get hasParentSubmenu(): boolean {
        return !!findComponentUpward(this, 'SubMenu')
    }

    public get parentSubmenuNum(): number {
        return findComponentsUpward(this, 'SubMenu').length
    }

    public get mode(): string {
        return (this.menu as Vue & { mode: string }).mode
    }
}
