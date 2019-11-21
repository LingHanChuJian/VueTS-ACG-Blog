import { addEvent, removeEvent } from '@/utils'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AdaptiveMixins extends Vue {
    public isMediaMatched: boolean = this.matchMedia()

    @Prop({ default: true, type: Boolean })
    private isMatchMediaMaxWidth!: boolean

    @Prop({ default: 860, type: [Number, String] })
    private matchMediaMaxWidth!: number | string

    private matchMedia(): boolean {
        return this.isMatchMediaMaxWidth ? matchMedia(`(max-width: ${this.matchMediaMaxWidth}px)`).matches : false
    }

    private setIsMediaMatched(): void {
        this.isMediaMatched = this.matchMedia()
    }

    private mounted() {
        addEvent(window, 'resize', this.setIsMediaMatched)
    }

    private beforeDestroy() {
        removeEvent(window, 'resize', this.setIsMediaMatched)
    }
}
