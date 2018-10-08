<template>
    <div class="article">
        <div class="author-msg clearfix" v-if="content.author">
            <div class="img-wrap fl">
                <img :src="content.author.avatar" class="img">
            </div>
            <div class="author-details fl">
                <div class="author-name">
                    {{content.author.username}}
                </div>
                <div class="date">
                    <span class="format">
                        <span>发布日期：</span>{{content.updateTime}}
                    </span>
                    <span>
                        <span>阅读数：</span>{{content.readnumber}}
                    </span>
                </div>
            </div>
        </div>
        <h1 class="title">
            {{content.title}}
        </h1>
        <div class="content-html" v-html="content.content"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content: {}
            }
        },
        methods: {
            getData() {
                this.$axios.get(`/article/${this.$route.params.id}`).then(res => {
                    if(res.code == 200) {
                        this.content = res.data
                    }
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped lang="scss">
.article{
    width: 980px;
    margin: 50px 475px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 8px;
    padding: 60px 40px;
}
.author-msg{
    height: 80px;
}
.img-wrap{
    width: 80px;
    height: 80px;
}
.author-details{
    margin-top: 20px;
    margin-left: 16px;
}
.author-name{
    font-size: 16px;
    font-weight: 700;
    color: #333;
}

.date{
    padding: 10px 0;
    color: #555;
    font-size: 12px;

    .format{
        margin-right: 6px;
    }
}

.img{
    display: block;
    width: 100%;
    height: 100%;
}

</style>