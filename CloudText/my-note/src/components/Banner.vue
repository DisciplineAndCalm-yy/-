<template>
    <div class="clearfix">
        <div class="wrap-img fl">
            <div class="title">十三亿人都会用的云笔记</div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="scss">
.wrap-img{
    position: relative;
    margin-top: 50px;
    width: 750px;
    height: 340px;
    background: url('../../static/imgs/banner.jpg') no-repeat;
    -webkit-box-sizing: 100% 100%;
    background-size: 100% 100%;
    border-radius: 6px;
    overflow: hidden;

    .title{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 20px;
        color: #fff;
        padding: 14px 20px;
        background: rgba(0, 0, 0, .5);
        text-align: center;
    }
}
</style>