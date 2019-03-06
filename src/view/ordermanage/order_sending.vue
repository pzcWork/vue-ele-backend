<template>
    <div class="all_com">
        <div class="title_com">发货管理</div>
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>当前订单<span v-if="isOffine">（线下订单）</span></span>
            </div>
            <table class="order_detail">
                <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>商品ID</th>
                    <th>商品名</th>
                    <th>类型</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>优惠金额</th>
                    <th>总价</th>
                    <th>支付方式</th>
                    <th>状态</th>
                </tr>
                <tr>
                    <td>{{orderInfo.Id}}</td>
                    <td>{{orderInfo.User?orderInfo.User.Account:''}}</td>
                    <td>{{orderInfo.Product?orderInfo.Product.ID:''}}</td>
                    <td>{{orderInfo.Product?orderInfo.Product.Name:''}}</td>
                    <td>{{orderInfo.IsPresell?'预售':'全款'}}</td>
                    <td>{{orderInfo.ProductOriginPrice}}</td>
                    <td>{{orderInfo.Amount}}</td>
                    <td>{{orderInfo.Discount}}</td>
                    <td>{{orderInfo.TotalShouldPayPrice}}</td>
                    <td>
                        <span v-if="orderInfo.Payment == 'UnionPay'">人民币</span>
                        <span v-else-if="orderInfo.Payment == 'BTC'">BTC</span>
                        <span v-else>{{orderInfo.Payment}}</span>
                    </td>
                    <td>
                        <span v-if="orderInfo.Status == 'PRE_AFTER_SALE'">售后订单待确认</span>
                        <!-- status -->
                        <span v-else-if="orderInfo.Status == 'UNPAID'">待确认支付</span>
                        <span v-else-if="orderInfo.Status == 'PRESELL_PAID'">已支付定金</span>
                        <span v-else-if="orderInfo.Status == 'BEGIN_FINAL_PAY'">开始支付尾款</span>
                        <span v-else-if="orderInfo.Status == 'WAIT_FOR_FINAL_PAY'">待支付尾款</span>
                        <span v-else-if="orderInfo.Status == 'PAID'">已完成支付</span>
                        <span v-else-if="orderInfo.Status == 'UNDELIVERED' && orderInfo.IsHostingOrder == false && orderInfo.ReadyDeliver == 0">待发货（发货）</span>
                        <span v-else-if="orderInfo.Status == 'UNDELIVERED' && orderInfo.IsHostingOrder == true && orderInfo.ReadyDeliver == 0">待发货（托管）</span>
                        <span v-else-if="orderInfo.Status == 'UNDELIVERED' && orderInfo.ReadyDeliver == 1">已安排发货</span>
                        <span v-else-if="orderInfo.Status == 'DELIVERED'  && orderInfo.IsHostingOrder == false">已发货（发货）</span>
                        <span v-else-if="orderInfo.Status == 'DELIVERED'  && orderInfo.IsHostingOrder == true">已发货（托管）</span>
                        <span v-else-if="orderInfo.Status == 'COMPLETED'">已确认收货</span>
                        <span v-else-if="orderInfo.Status == 'CANCELED'">已取消</span>
                        <span v-else-if="orderInfo.Status == 'EXPIRED'">已过期</span>
                    </td>
                </tr>
            </table>
        </el-card>
        <div v-if="HostingOrderBool == true">
            <!-- 托管信息 -->
            <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
                <div slot="header" class="clearfix">
                    <span>托管信息</span>
                </div>
                <table class="order_detail host_detail">
                    <tr>
                        <td>姓名</td>
                        <td>{{HostingOrder.Name}}</td>
                    </tr>
                    <tr>
                        <td>手机</td>
                        <td>{{HostingOrder.MobilePhone}}</td>
                    </tr>
                    <tr>
                        <td>币种</td>
                        <td>{{HostingOrder.Cryptocurrency}}</td>
                    </tr>
                    <tr>
                        <td>钱包地址</td>
                        <td>
                            <a v-if="HostingOrder.Cryptocurrency == 'ETH'" :href="'https://eth.pandaminer.com/miner/'+HostingOrder.Address" target="_Blank" style="color:#409EFF;">{{HostingOrder.Address}}</a>
                            <a v-else-if="HostingOrder.Cryptocurrency == 'BTC'" :href="'https://btc.com/'+HostingOrder.Address" target="_Blank" style="color:#409EFF;">{{HostingOrder.Address}}</a>
                            <div v-else-if="HostingOrder.Cryptocurrency == 'ETC'">
                                <a v-if="HostingOrder.MiningPool == 'f2pool.com'" :href="'https://www.f2pool.com/etc/'+HostingOrder.Address" target="_Blank" style="color:#409EFF;">{{HostingOrder.Address}}</a>
                                <a v-if="HostingOrder.MiningPool == 'waterhole.io'" :href="'https://etc.waterhole.io/miner/'+HostingOrder.Address" target="_Blank" style="color:#409EFF;">{{HostingOrder.Address}}</a>
                            </div>
                            <div v-else-if="HostingOrder.Cryptocurrency == 'ZEC'">
                                <a v-if="HostingOrder.MiningPool == 'f2pool.com'" :href="'https://www.f2pool.com/zec/'+HostingOrder.Address" target="_Blank" style="color:#409EFF;">{{HostingOrder.Address}}</a>
                                <a v-if="HostingOrder.MiningPool == 'waterhole.io'" :href="'https://zec.waterhole.io/miner/'+HostingOrder.Address" target="_Blank" style="color:#409EFF;">{{HostingOrder.Address}}</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>矿池</td>
                        <td>{{HostingOrder.MiningPool}}</td>
                    </tr>
                    <tr>
                        <td>上线时间</td>
                        <td>{{HostingOrder.StartTime}}</td>
                    </tr>
                </table>
            </el-card>
            <!-- 发货信息填写 -->
            <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
                <div slot="header" class="clearfix">
                    <span>发货信息填写</span>
                </div>
                <el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <div class="expressCompany">
                        <h4>快递公司</h4>
                        <el-form-item label="" prop="expressCompany">
                            <el-input
                                    placeholder="请输入内容"
                                    v-model="ruleForm.expressCompany"
                                    clearable>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="expressNumber">
                        <h4>快递订单号</h4>
                        <el-form-item label="" prop="expressNumber">
                            <el-input
                                    placeholder="请输入内容"
                                    v-model="ruleForm.expressNumber"
                                    clearable>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="expressLink">
                        <h4>快递查询链接</h4>
                        <el-form-item label="" prop="expressLink">
                            <el-input
                                    placeholder="请输入内容"
                                    v-model="ruleForm.expressLink"
                                    clearable>
                            </el-input>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="sending('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
        <div v-else-if="HostingOrderBool == false">
            <!-- 用户地址信息 -->
            <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
                <div slot="header" class="clearfix">
                    <span>用户地址信息</span>
                </div>
                <table class="order_detail reserve_detail">
                    <tr>
                        <td>收货人</td>
                        <td>{{addressDetail.Receiver}}</td>
                    </tr>
                    <tr>
                        <td>手机</td>
                        <td>{{addressDetail.MobilePhone}}</td>
                    </tr>
                    <tr>
                        <td>电话</td>
                        <td>{{addressDetail.PhoneNumber}}</td>
                    </tr>
                    <tr>
                        <td>地址</td>
                        <td>{{addressDetail.Address}}</td>
                    </tr>
                    <tr>
                        <td>邮编</td>
                        <td>{{addressDetail.ZipCode}}</td>
                    </tr>
                </table>
            </el-card>
            <!-- 发货信息填写 -->
            <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
                <div slot="header" class="clearfix">
                    <span>发货信息填写</span>
                </div>
                <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <div class="expressCompany">
                        <h4>快递公司</h4>
                        <el-form-item label="" prop="expressCompany">
                            <el-input
                                    placeholder="请输入内容"
                                    v-model="ruleForm.expressCompany"
                                    clearable>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="expressNumber">
                        <h4>快递订单号</h4>
                        <el-form-item label="" prop="expressNumber">
                            <el-input
                                    placeholder="请输入内容"
                                    v-model="ruleForm.expressNumber"
                                    clearable>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="expressLink">
                        <h4>快递查询链接</h4>
                        <el-form-item label="" prop="expressLink">
                            <el-input
                                    placeholder="请输入内容"
                                    v-model="ruleForm.expressLink"
                                    clearable>
                            </el-input>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="sending('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script>
    export default {
        name:'',
        data(){
            return{
                orderInfo: '',
                addressDetail: '',
                HostingOrderBool:'',
                HostingOrder:'',
                ruleForm: {
                    expressCompany:'',
                    expressNumber:'',
                    expressLink:''
                },
                rules: {
                    expressCompany: [
                        { required: true, message: '请输入快递公司', trigger: 'change' }
                    ],
                    expressNumber: [
                        { required: true, message: '请输入快递订单号', trigger: 'change' }
                    ],
                    expressLink: [
                        { required: true, message: '请输入快速查询链接', trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            getOderDetail(){
                this.$api('/admin/order/get_order_detail', {
                    orderId:this.OrderId
                }).then(res => {
                    console.log(res)
                let d = res.data
                // console.log(d)
                this.orderInfo = d.orderInfo
                d.addressDetail?this.addressDetail = d.addressDetail:this.addressDetail=''
                this.HostingOrderBool = d.HostingOrderBool
                this.HostingOrder = d.HostingOrder
            });
            },
            sending(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.OrderId, this.expressCompany, this.expressNumber, this.expressLink)
                        this.$api('/admin/order/order_sending', {
                            orderId:this.OrderId,
                            express: this.ruleForm.expressCompany,
                            expressNumber: this.ruleForm.expressNumber,
                            expressLink: this.ruleForm.expressLink,
                            notice: '提交成功',
                        }).then(res => {
                            if(this.isOffine){
                            this.$router.push({path: '/offlinemanager/offline_user'})
                        }else{
                            this.$router.push({path: '/ordermanage/order_list'})
                        }
                    });
                    } else {
                        console.log('error submit!!');
                return false;
            }
            });
            }
        },
        created(){
            //此OrderId为order表的Id,返回信息中的Id
            this.OrderId = this.$route.query.OrderId
            this.isOffine = this.$route.query.isOffine
            // console.log(this.OrderId)
            this.getOderDetail()
        }
    }
</script>
<style lang='scss' scoped>
    @import "../../assets/css/titlecom.scss";
    .order_detail{
        width: 100%;
        border-radius: 3px
    }
    .order_detail td{
        text-align: left;
        padding-left: 12px;
        height: 50px;
        border: 1px solid #ebeef5
    }
    .order_detail th{
        text-align: left;
        padding-left: 12px;
        color: #909399
    }
    .order_detail th{
        height: 35px;
        border: 1px solid #ebeef5
    }
    .remark_detail tr td:first-child, .reserve_detail tr td:first-child, .host_detail tr td:first-child{
        width: 15%
    }
    h4{
        margin: 10px 0 10px 10px
    }
    .submitBtn{
        width: 110px;
        margin: 20px 0 0 50px
    }
</style>