<template lang="pug">
    main(:class="[prefixCls + '-wrap']")
        Markdown(:content="content")
        div(:class="[prefixCls + '-links']")
            div(v-for="item in userFriends" :key="item.title")
                h2(:class="[prefixCls + '-title']") {{ item.title }}
                p(:class="[prefixCls + '-description']") {{ item.description }}
                ul(v-if="item.children.length" :class="[prefixCls + '-link-items']")
                    li(v-for="link in item.children" :key="link.name" :class="[prefixCls + '-link-item']" :style="{ '--friends-color': item.color ? item.color : '#6c5b7c' }")
                        a(:class="[prefixCls + '-link-url']" :href="link.link" target="_blank")
                            img(:class="[prefixCls + '-link-avatar']" :src="link.avatar" lazy="error")
                            div(:class="[prefixCls + '-link-info']")
                                div(:class="[prefixCls + '-link-name']") {{ link.name }}
                                div(:class="[prefixCls + '-link-description']") {{ link.description }}
                div(v-else :class="[prefixCls + '-empty']")
</template>

<script lang="ts">
import { UserFriends } from '@/types/components'
import Markdown from '@/components/Markdown.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Markdown,
    },
})
export default class Friends extends Vue {
    private prefixCls: string = 'friends'

    private content: string = '<p>欢迎交换友链 ꉂ(ˊᗜˋ)</p><p>请留言告诉我你的：<br> 1、名字<br> 2、一句话介绍 <br> 3、主页地址<br> 4、头像（HTTPS*，可在评论区上传）<br> 5、喜欢的颜色</p><p>For Example：<br> ★ Name: 凌寒初见<br> ★ Description: 月影流花花不语, 梦如烟水水不兴<br> ★ Link: https://myrove.cn<br> ★ Avatar: <a href="https://view.moezx.cc/image/6vRT" target="_blank" rel="nofollow">获取嵌入代码</a><br> ★ Color: 喜欢的颜色 (没有填的话，默认是 主题色(#6c5b7c) !)</p><p style="font-size: 13px">※ 为保证友链质量，今后新申请的友链将经过筛选，请在收到我的回复邮件后再于贵站添加本站链接。原则上过去已添加友链不会轻易删除，如遇死链、改变网站用途（友链主要针对的是同类的博客），将单独移至“神隐”分类中，下次清理时未整改的将移除；如遇盗版、破解、网页植入挖矿脚本、极低质量内容、单方面移除本站链接，将直接移除，恕不另行通知。</p>'

    private userFriends: UserFriends[] = [
        {
            title: '后宫佳丽',
            description: '你们都是我的翅膀',
            children: [
                {
                    name: 'sujian',
                    description: '素笺淡墨染流年',
                    link: 'http://www.white-letter.xyz',
                    avatar: 'http://img.cdn.myrove.cn/media/static/images/friend/sujian.png',
                },
            ],
        },
        {
            title: '神隐',
            description: '挂了的小伙伴们，下次清理时未恢复的将移除哦 (￣o￣)',
            children: [],
        },
    ]

}
</script>

<style lang="stylus" scoped>
.friends-links
    margin 10px 0

.friends-link-items
    display flex
    text-align center
    justify-content center
    flex-wrap wrap

.friends-link-item
    margin 8px
    width 250px
    text-align center
    color var(--friends-color, #6c5b7c)
    border 1px solid var(--friends-color, #6c5b7c)
    transition all .2s
    &:hover
        color #FFFFFF
        background-color var(--friends-color, #6c5b7c)
        box-shadow 0 2px 20px var(--friends-color, #6c5b7c)
        .friends-link-url
            color #FFFFFF

.friends-link-url
    display block
    padding 8px 10px
    width 100%
    height 100%

.friends-link-avatar
    width 65px
    height 65px
    border-radius 50%
    background-color #FFFFFF
    border 1px solid var(--friends-color, #6c5b7c)
    transition all .5s
    display inline-block
    vertical-align middle

.friends-link-info
    display inline-block
    vertical-align middle
    padding-left 10px

.friends-empty
    width 150px
    height 150px
    margin 0 auto
    background url(./../assets/images/empty.png) no-repeat
    background-size 150px

</style>
