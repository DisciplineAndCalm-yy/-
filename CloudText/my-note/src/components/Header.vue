<template>
    <div class="box clearfix">
        <div class="w1170 box-top">
            <span class="bt-title fl">
                <router-link to="/">云笔记</router-link>
            </span>
            <div class="bt-right fr">
                <el-button @click="$router.push('/write')">写笔记</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='scss'>
.box{
    width: 1920px;
    height: 50px;
    background: #409eff;

    .box-top{
        margin: 0 auto;
        height: 50px;

        .bt-title a{
            font-size: 32px;
            font-weight: 500;
            color: #fff;
            line-height: 1.5;
            text-decoration: none;
            
            /deep/.el-button{
                margin: 5px 0;
            }
        }
    }
}

.bt-right{
    margin: 5px 0;
}
</style>