<template>
    <div class="index w1170 clearfix">
        <banner></banner>
        <userbox></userbox>
        <div class="article-wrap fl">
            <router-link :to="{name: 'article', params: {id: item._id}}" class="article-item" v-for="item in content">
                <div class="article-msg clearfix">
                    <div class="avatar fl">
                        <img :src="item.author.avatar">
                    </div>
                    <div class="author-msg fl">
                        <span class="author-name" v-text="item.author.username">莫言</span>
                        <span class="divide">|</span>
                        <span class="title" v-text="item.title">丰乳肥臀</span>
                    </div>
                    <div class="comment fl">
                        <span class="comment-font">
                            浏览: <span v-text="item.readnumber">998</span>
                        </span>
                        <span class="comment-font">
                            回复: <span v-text="item.commonnum">2</span>
                        </span>
                        <span class="comment-font">
                            分类: <span v-text="item.category.name">知性文章</span>
                        </span>
                    </div>
                    <div class="desc fl" v-text="item.contentText">讲述母亲的书籍</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import banner from '@/components/Banner'
    import userbox from '@/components/Userbox'

    export default {
        data() {
            return {
                content: []
            }
        },
        components: {
            banner,
            userbox
        },
        methods: {
            getData() {
                this.$axios.get('/article').then(res => {
                        this.content = res.data
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped lang="scss">
.index{
    margin: 0 380px;
}
.article-wrap{
    margin-top: 30px;
    background: #fff;

    .article-item{
        width: 750px;
        margin-top: 20px;
    }
}
.article-msg{
    margin-bottom: 20px;
    height: 180px;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;

    .avatar{
        img{
            width: 140px;
            height: 140px;
            border-radius: 6px;
            margin: 20px 20px;
        }
    }
    .author-msg{
        margin-left: 50px;
        margin-top: 20px;
        display: block;
        width: 600px;

        .author-name{
            color: #409eff;
            font-size: 18px;
        }
        .divide{
            margin: 0 10px;
        }
        .title{
            font-size: 18px;
            font-weight: bold;
        }
    }
    .comment{
        margin-left: 50px;
        width: 600px;
        margin-top: 20px;
        padding: 20px 0;
        border-radius: 10px;
        background: rgba(0, 0, 0, .1);
        color: #333;

        .comment-font{
            margin: 0 40px;
        }
    }
    .desc{
        margin-top: 20px;
        margin-left: 50px;
        margin-bottom: 10px;
        width: 750px;
        color: #666;
        font-size: 16px;
    }
}
</style>