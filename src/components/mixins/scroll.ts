import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Scroll extends Vue {
    public scrollTop: number = 0

    public get scrollHeight(): number {
        return document.documentElement.scrollHeight || document.body.scrollHeight
    }

    public get windowHeight(): number {
        return document.documentElement.clientHeight || document.body.clientHeight
    }

    private getScroll(): void {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    }

    private mounted() {
        this.$nextTick(() => {
            addEventListener('scroll', this.getScroll, true)
        })
    }

    private destroyed() {
        removeEventListener('scroll', this.getScroll, true)
    }
}
