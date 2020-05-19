<template lang="pug">
    transition-group(tag="div" apper name="move-up")
        article(v-for="item in archives" :key="item.id" :class="[prefixCls]")
            div(:class="[prefixCls + '-image']")
                router-link(:to="getArticleLink(item)")
                    img(v-lazy="item.image")
            div(:class="[prefixCls + '-info']")
                div(:class="[prefixCls + '-info-date']")
                    Icon(type="clock")
                    | 发布于 {{ item.create | format('YYYY-MM-DD') }}
                div(:class="[prefixCls + '-info-title']")
                    router-link(:to="getArticleLink(item)")
                        h2 {{ item.title }}
                div(:class="[prefixCls + '-info-meta']")
                    span.meta-heat
                        Icon(type="hotjar")
                        | {{ item.pageView }} 热度
                    span.meta-comments(v-if="item.comments !== 0")
                        router-link(:to="getArticleLink(item, '#comments')")
                            Icon(type="comment-dots")
                            | {{ item.comments }} 条评论
                    span.meta-categories
                        router-link(:to="getTagLink(item)")
                            Icon(type="folder")
                            | {{ item.tagName }}
                div(:class="[prefixCls + '-info-introduction']")
                    | {{ item.introduction }}
                div(:class="[prefixCls + '-info-more']")
                    router-link(:to="getArticleLink(item)")
                        Icon(type="ellipsis-h")
</template>

<script lang="ts">
import { RawLocation } from 'vue-router'
import { Icon } from '@/components/icon'
import { UserArchives } from '@/types/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Icon,
    },
})
export default class Archives extends Vue {
    @Prop({
        type: Array,
        default() {
            return []
        },
    })
    private archives!: UserArchives[]

    private prefixCls: string = 'archive'

    private getArticleLink(item: UserArchives, hash: string = ''): RawLocation {
        const [year, month, day]: string[] = Vue.filter('format')(item.create, 'YYYY-MM-DD').split('-')
        return {
            name: 'article',
            params: {
                year,
                month,
                day,
                subtitle: item.subtitle,
            },
            hash,
        }
    }

    private getTagLink(item: UserArchives): RawLocation {
        return {
            name: 'categories',
            params: {
                categories: item.categories,
            },
        }
    }
}
</script>

<style lang="stylus" scoped>
multi-line(line)
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    -webkit-line-clamp line
    -webkit-box-orient vertical

.archive
    margin 20px 0
    width 100%
    height 300px
    display flex
    border-radius 10px
    box-shadow $box-shadow
    transition box-shadow .6s ease
    overflow hidden
    &:hover
        box-shadow $box-shadow-hover
        .archive-image
            img
                transform scale(1.2)


.archive:nth-child(2n)
    flex-direction row-reverse
    .archive-info
        text-align left
        padding 30px 40px 0 30px

.archive-image
    width 420px
    min-width 420px
    max-width 420px
    height 100%
    overflow hidden
    a
        width 100%
        height 100%
        display block
    img
        width 100%
        height 100%
        object-fit cover
        transition transform .6s ease-in-out

.archive-info
    width calc(100% - 420px)
    height 100%
    text-align right
    padding 30px 30px 0 40px
    > div
        margin-bottom 20px

.archive-info-title
    h2
        multi-line(2)

.archive-info-date
.archive-info-meta
    i
        margin-right 5px

.archive-info-meta
    span
        margin-right 10px
        font-size 14px
        &:last-child
            margin-right 0

.archive-info-introduction
    multi-line(3)
</style>