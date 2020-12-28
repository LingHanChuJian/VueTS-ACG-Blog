import { Component, Vue } from 'vue-property-decorator'

let uuid: number = 0

@Component({
    name: 'UUIDMixins',
})
export default class UUIDMixins extends Vue {
    private beforeCreate() {
        uuid += 1
        const vm: Vue = this
        Object.defineProperties(vm, {
            uuid: {
                get() {
                    return `uuid-${(vm.$options.name as string).toLowerCase()}-${uuid}`
                },
            },
        })
    }
}
