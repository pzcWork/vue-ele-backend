<template>
    <div class="all_com">
        <div class="title_com">部署托管</div>
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>托管信息</span>
            </div>
            <div class="content">
                <span>姓名</span>
                <el-input
                        :placeholder="this.data.Name"
                        :disabled="true">
                </el-input>
                <span>手机区号</span>
                <el-input
                        :placeholder="this.data.Prefix"
                        :disabled="true">
                </el-input>
                <span>手机号码</span>
                <el-input
                        :placeholder="this.data.MobilePhone"
                        :disabled="true">
                </el-input>
                <span>币种</span>
                <el-input
                        :placeholder="this.data.Cryptocurrency"
                        :disabled="true">
                </el-input>
                <span>地址</span>
                <el-input
                        :placeholder="this.data.Address"
                        :disabled="true">
                </el-input>
                <span>矿池</span>
                <el-input
                        :placeholder="this.data.MiningPool"
                        :disabled="true">
                </el-input>
                <div class="submitTime">
                    <span>上线时间</span>
                    <ul>
                        <li>
                            <input type="text" class="time_input" v-model="inputYear"><span class="time">年</span>
                        </li>
                        <li>
                            <input type="text" class="time_input" v-model="inputMonth"><span class="time">月</span>
                        </li>
                        <li>
                            <input type="text" class="time_input" v-model="inputDay"><span class="time">日</span>
                        </li>
                        <li>
                            <input type="text" class="time_input" v-model="inputHour"><span class="time">时</span>
                        </li>
                        <li>
                            <input type="text" class="time_input" v-model="inputMinute"><span class="time">分</span>
                        </li>
                        <li>
                            <input type="text" class="time_input" v-model="inputSencond"><span class="time">秒</span>
                        </li>
                    </ul>
                    <el-button type="primary" @click="submitTimeBtn" style="margin: 15px 0 0 5px;">提交</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                data: '',
                inputYear: '',
                inputMonth: '',
                inputDay: '',
                inputHour: '',
                inputMinute: '',
                inputSencond: ''
            }
        },
        methods: {
            getHostOrderInfo(){
                this.$api('/admin/order/get_host_order_info', {
                    orderId:this.OrderId
                }).then(res => {
                    // console.log(res)
                    this.data = res.data
                this.timestamp  = new Date()
                this.inputYear = this.timestamp.getFullYear()
                this.inputMonth = this.timestamp.getMonth() +1
                this.inputDay = this.timestamp.getDate()
                this.inputHour = this.timestamp.getHours()
                this.inputMinute = this.timestamp.getMinutes()
                this.inputSencond = this.timestamp.getSeconds()
            });
            },
            submitTimeBtn(){
                let h =  this.inputYear+'-'+this.inputMonth+'-'+this.inputDay+'\ '+this.inputHour+':'+this.inputMinute+':'+this.inputSencond
                // console.log(h)
                let hostTime = Date.parse((new Date(h)))/1000
                // console.log(hostTime)
                this.$api('/admin/order/order_completed_deployment', {
                    orderId: this.OrderId,
                    deployTime: hostTime,
                    notice: '操作成功'
                }).then(res => {
                    if( this.isOffine){
                    this.$router.push({path: '/offlinemanager/offline_user'});
                }else{
                    this.$router.push({path: '/ordermanage/order_list'});
                }

            });
            }
        },
        created(){
            this.OrderId = this.$route.query.OrderId
            this.isOffine = this.$route.query.isOffine
            this.getHostOrderInfo()
        }
    }
</script>
<style lang='scss' scoped>
    @import "../../assets/css/titlecom.scss";
    .content > span {
        font-weight: 600;
        display: inline-block;
        margin: 15px 0 5px 5px
    }
    .submitTime > span{
        font-weight: 600;
        display: inline-block;
        margin: 25px 0 15px 5px
    }
    .time_input{
        height: 28px;
        width: 60px;
        padding-left: 12px;
        border: 1px solid #e4e7ed;
        border-top-left-radius:3px;
        border-bottom-left-radius:3px;
    }
    .submitTime li{
        display: inline-block;
        margin-left: 20px;
        width: 105px;
        height: 32px;
        position: relative;
    }
    .time{
        display: inline-block;
        width: 30px;
        height: 28px;
        border: 1px solid #e4e7ed;
        background-color: #F5F7FA;
        border-left: 0;
        text-align: center;
        font-weight: 600;
        line-height: 28px;
        border-top-right-radius:3px;
        border-bottom-right-radius:3px;
        position: absolute;
        top: 0
    }
</style>
