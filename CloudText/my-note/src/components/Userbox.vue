<template>
    <div class="user-box fr">
        <div class="login-box" v-if="!userInfo.username">
            <div class="input-wrap">
                <input class="input" type="text" placeholder="用户名或邮箱" v-model="formData.email">
                <input class="input" type="password" placeholder="密码" v-model="formData.password" @keyup.enter="handleLogin">
            </div>
            <div class="button-wrap">
                <el-button type="primary" class="button" @click="handleLogin">登录</el-button>
                <el-button class="button" @click="handleRegister">注册</el-button>
            </div>
        </div>
        <div class="user-msg" v-else>
            <div class="img-wrap">
                <img :src="userInfo.avatar">
            </div>
            <div class="username">
                <span class="strong">用户：</span>{{userInfo.username}}
            </div>
            <div class="out-login">
                <el-button type="warning" @click="handleOut">退出登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                formData: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            // getData() {
            //     this.$axios.get('/article').then(res => {
            //         if(userInfo.username) {
            //             this.content = res.data
            //         } else {
            //             this.content = []
            //         }
            //     })
            // },
            handleRegister() {
                this.$router.push('/register')
            },
            handleLogin() {
                this.$axios.post('/login', this.formData).then(res => {
                    console.log(res)
                    if(res.code == 200){
                        this.$message(res.msg)
                        this.$store.commit('CHANGE_userInfo', res.userData)
                    }
                })
                // this.getData()
            },
            handleOut() {
                this.$axios.get('/loginout').then(res => {
                    let userInfo = {
                        avatar: '',
                        email: '',
                        username: ''
                    } 
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        this.$store.commit('CHANGE_userInfo', userInfo)
                        this.$router.push('/index')
                    } else {
                        this.$store.commit('CHANGE_userInfo', userInfo)
                        this.$message.info('登录状态已过期')
                    }
                })
                // this.getData()
            }
        },
        computed: {
            ...mapState(['userInfo'])
        }
    }
</script>

<style scoped lang="scss">
.user-box{
    margin-top: 50px;
    width: 300px;
    height: 340px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-sizing: border-box;
    padding: 50px 40px 20px;

    .input{
        width: 100%;
        box-sizing: border-box;
        padding: 10px 15px;
        font-size: 14px;
        color: #333;
        outline: none;
        border-radius: 6px;
        border: 1px solid #ccc;
        margin-bottom: 30px;
    }

    .button-wrap{
        /deep/ .el-button{
            width: 100%;
            margin-bottom: 30px;
        }
        .el-button+.el-button{
            margin: 0;
        }
    }
    .user-msg{
        .username{
            .strong{
                font-size: 24px;
                font-weight: 500;
                color: #222;
                margin-right: 10px;
            }
            margin-left: 30px;
            font-size: 18px;
            font-weight: 400;
            color: #555;
            padding: 10px 0;
        }
        .img-wrap img{
            display: block;
            width: 150px;
            height: 150px;
            margin: 0 auto 10px;
        }
        /deep/ .el-button{
            margin-top: 20px;
            margin-left: 60px;
        }
    }
}
</style>