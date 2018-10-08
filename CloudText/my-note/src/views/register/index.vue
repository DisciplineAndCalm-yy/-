<template>
    <div class="wrap w1170">
        <span class="title">新用户注册</span>
        <div class="input-wrap">
            <div class="item-input"><span class="item-font">邮箱：</span><input type="text" placeholder="请输入邮箱" v-model="formData.email"></div>
            <div class="item-input"><span class="item-font">用户名：</span><input type="text" placeholder="请输入用户名" v-model="formData.username"></div>
            <div class="item-input"><span class="item-font" @keyup.enter.native="getRegister">密码：</span><input type="password" placeholder="请输入密码" v-model="formData.password"></div>
        </div>
        <div class="item-btn">
            <el-button class="btn" type="primary" @click="getRegister">注册</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                formData: {
                    email: '',
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            getRegister() {
                this.$axios.post('/user', this.formData).then(res => {
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/index')
                        }, 500)
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.wrap{
    margin: 50px 380px;
    height: 500px;
    background: #fff;
    border: 1px solid #f1f1f1;
    border-radius: 20px;
    overflow: hidden;

    .title{
        margin-top: 20px;
        margin-bottom: 50px;
        display: block;
        font-size: 28px;
        text-align: center;
        color: #777;
    }
}
.input-wrap{
    .item-input{
        color: #777;
        width: 600px;
        margin: 30px auto 0;
        font-size: 20px;

        input{
            display: block;
            width: 50%;
            margin: 0 auto;
            padding: 10px 20px;
            border: 1px solid #e1e1e1;
            border-radius: 10px;
            box-sizing: border-box;
            overflow: hidden;
            font-size: 16px;
        }
    }
}
.item-btn{
    width: 600px;
    margin: 70px auto 0;

    .btn{
        width: 50%;
        margin: 0 150px;
    }
}
</style>