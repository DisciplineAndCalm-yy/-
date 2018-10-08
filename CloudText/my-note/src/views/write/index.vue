<template>
    <div class="write">
        <div class="quill-wrap w1170">
            <div class="title">标题</div>
            <div class="input-wrap">
                <el-input v-model="formData.title"></el-input>
            </div>
            <div class="title">内容</div>
            <quill-editor
                v-model="formData.content"
                ref="myQuillEditor"
                :options="editorOption"
                @change="handleChange"
                >
            </quill-editor>
            <div class="category clearfix">
                <span class="fl">分类 : </span>
                <div class="fl clearfix">
                    <Radios :options="categories" v-model="formData.category"></Radios>
                </div>
            </div>
            <el-button type="primary" @click="handleSubmit">发布笔记</el-button>
         </div>
    </div>
</template>

<script>
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import Radios from '@/components/Radios'

    Quill.register('modules/ImageExtend', ImageExtend)

    export default {
        components: {quillEditor, Radios},
        data() {
            return {
                formData: {
                    title: '',
                    content: '',
                    contentText: '',
                    category: ''
                },
                categories: [],
                // 富文本框参数设置
                editorOption: {  
                    modules: {
                        ImageExtend: {
                            loading: true,
                            name: 'img',
                            action: 'https://www.qiniu.com',
                            response: (res) => {
                                return res.info
                            }
                        },
                        toolbar: {
                            container: container,
                            handlers: {
                                'image': function () {
                                QuillWatch.emit(this.quill.id)
                                }
                            }
                        }
                    }
                }
            }
        },
        methods: {
            handleChange({ quoll, html, text }) {
                this.formData.contentText = text
                this.formData.contentText = this.formData.contentText.substring(0, 200) + '...'
            },
            getCategory() {
                this.$axios.get('/category').then(res => {
                    this.categories = res.data
                })
            },
            handleSubmit() {
                this.$axios.post('/article', this.formData).then(res => {
                    if(res.code == 200) {
                        this.$message.success(res.msg)
                        this.$router.push('/index')
                    } else if(res.code == 403) {
                        this.$router.push('/index')
                    }
                })
            }
        },
        created() {
            this.getCategory()
        }
    }
</script>

<style scoped lang="scss">
.quill-wrap{
    margin: 30px 380px 0;
    background: #fff;
    border-radius: 6px;
    padding: 30px;
    box-sizing: border-box;

    .title{
        line-height: 2;
        font-size: 20px;
        font-weight: 700;
        color: #444;
    }
    
    .category{
        span{
            margin-top: 10px;
            margin-right: 20px;
        }
        color: #409eff;
        margin: 20px 0;
        font-size: 14px;
    }
    /deep/ .el-button{
        margin: 50px auto;
    }
}
</style>
<style>
.ql-container{
    min-height: 300px;
}
</style>
