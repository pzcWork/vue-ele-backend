<template>
    <div class="all_com">
        <div class="title_com">批量发货（确认）</div>
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>批量发货（确认）</span>
            </div>
            <div class="files_msg">
                <p class="files_msg_total">共{{uploadCsvData.length}}项，其中<span style="color:red;margin: 0 5px;font-size:17px">{{noCount}}</span>项无匹配订单，请确认以下内容</p>
                <router-link :to="{path:'/ordermanage/batch_deliver'}">
                    <el-button>重新选择</el-button>
                </router-link>
                <el-button type="primary" @click="confirmSend" v-if="sendAble">确认发货</el-button>
                <el-button type="primary" @click="confirmSend" disabled v-if="!sendAble">确认发货</el-button>
            </div>
            <div class="files_table_out">
                <table class="files_table" width=100%>
                    <tr>
                        <td>订单号</td>
                        <td>快递公司</td>
                        <td>快递单号</td>
                        <td>快速查询链接</td>
                    </tr>
                    <tr v-for="(item, index) in uploadCsvData" :key="index" :class="'background'+item.type">
                        <td>{{item.orderId}}</td>
                        <td>{{item.express}}</td>
                        <td>{{item.expressOrderNumber}}</td>
                        <td>{{item.expressLink}}</td>
                    </tr>
                </table>
            </div>
        </el-card>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data (){
            return {
                fileDataAll: '',
                uploadCsvData: [], // files列表
                sendAble: true,
                noCount: 0
            }
        },
        methods: {
            confirmSend(){
                //   console.log(JSON.stringify(this.uploadCsvData))
                this.$api('/admin/file/import_delivered_data', {
                    uploadCsvData: JSON.stringify(this.uploadCsvData)
                }).then(res => {
                    // console.log(res)
                    this.$message({
                    message: res.msg,
                    type: 'success'
                });
                this.$router.push({path: '/ordermanage/batch_deliver'})
            });
            }
        },
        mounted(){
        },
        created(){
            // console.log(this.fileDataAll)
            this.fileDataAll = JSON.parse(sessionStorage.getItem('fileDataAll'))
            this.fileDataAll?this.uploadCsvData = this.fileDataAll.data.uploadCsvData:this.uploadCsvData = []
            // type 0无效，1有效
            // console.log(this.uploadCsvData)
            if(this.uploadCsvData.length == 0){
                this.sendAble = false
            }
            this.uploadCsvData.forEach((item, index) => {
                if(item.type != 1){
                this.noCount = this.noCount - 0 +1
                this.sendAble = false
            }
        })
        }
    }
</script>
<style lang='scss' scoped>
    @import "../../assets/css/titlecom.scss";
    .files_msg{
        height: 150px;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 10px
    }
    .files_msg_total{
        margin: 20px 0 50px 0;
        font-size: 16px;
    }
    .files_table_out{
        margin-top: 30px;
        margin-left: 10px
    }
    .files_table tr:first-child{
        font-size: 16px;
        font-weight: 600
    }
    .files_table td{
        border: 1px solid #e6e6e6;
        padding-left: 20px;
        height: 30px;
    }
    .background0{
        background-color: #F57A71
    }
</style>
