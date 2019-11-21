
import { oneOf } from '@/utils'
import VueRouter, { RawLocation, Route } from 'vue-router'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LinkMixins extends Vue {
    @Prop({ type: [Object, String] })
    private to?: RawLocation

    @Prop({ default: false, type: Boolean })
    private replace!: boolean

    @Prop({
        default: 'self',
        type: String,
        validator(value: string) {
            return oneOf(value, ['_blank', '_self', '_parent', '_top'])
        },
    })
    private target!: string

    @Prop({ default: false, type: Boolean, required: false })
    private append!: boolean

    public handleClick(newWindow: boolean = false): void {
        const router: VueRouter = this.$router
        if (newWindow) {
            let to = this.to
            if (router) {
                const current: Route = this.$route
                const route = router.resolve((this.to as RawLocation), current, this.append)
                to = route ? route.href : this.to
            }
            window.open((to as string))
        } else {
            if (router) {
                this.replace ? this.$router.replace((this.to as RawLocation)) : this.$router.push((this.to as RawLocation))
            } else {
                window.location.href = (this.to as string)
            }
        }
    }

    public handleCheckClick(event: Event, newWindow: boolean = false): boolean | void {
        if (this.to) {
            if (this.target === '_blank') {
                return false
            } else {
                event.preventDefault()
                this.handleClick(newWindow)
            }
        }
    }

    public get linkUrl(): object | string | null | undefined {
        const type: string = typeof this.to
        if (type !== 'string') {
            return null
        }
        if ((this.to as string).includes('//')) {
            return this.to
        }
        const router: VueRouter = this.$router
        if (router) {
            const route = this.$router.resolve((this.to as RawLocation), this.$route, this.append)
            return route ? route.href : this.to
        }
        return this.to
    }
}
