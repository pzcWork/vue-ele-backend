<template>
    <div class="all_com">
        <div class="title_com">发货管理</div>
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>批量发货</span>
            </div>
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="uploadURL()"
                    name="files"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success = "upsuccess"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                <el-button size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">
                    <span>请上传发货列表excel文件，如果你还没有模板，请先</span>
                    <span class="download" @click="downloadModel">下载模板</span>
                </div>
            </el-upload>
            <!-- 浏览按钮 -->
            <router-link :to="{path:'/ordermanage/review_batch'}">
                <el-button type="primary" size="small" style="margin-top:30px">浏览</el-button>
            </router-link>
        </el-card>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data(){
            return {
                fileList:[],
                fileDataAll: ''
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            downloadModel(){
                this.$api('/admin/file/export_temp', {
                    tempName:'deliver'
                }).then(res => {
                        console.log(res)
                    location.href = res.data.csvFilePath
            });
            },
            upsuccess(res, file, fileList){
                console.log(res)
                // console.log(file)
                // console.log(fileList)
                this.fileDataAll = res
                sessionStorage.setItem('fileDataAll', JSON.stringify(this.fileDataAll))
            },
            uploadURL(){
                return '/api/admin/file/order_delivered'
            }
        },
        created(){
            // 刷新sessionStorage数据状态
            sessionStorage.setItem('fileDataAll', JSON.stringify(this.fileDataAll))
        }
    }
</script>
<style lang='scss' scoped>
    @import "../../assets/css/titlecom.scss";
    .upload-demo{
        width: 500px
    }
    .download{
        display: inline-block;
        font-size: 14px;
        color: #26507B;
        cursor: pointer;
        border-bottom: 1px solid #ffffff
    }
    .download:hover{
        border-bottom: 1px solid #26507B
    }
</style>