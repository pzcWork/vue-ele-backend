<template>
    <div class="all_com">
        <div class="title_com">订单详情</div>
        <!-- 订单信息 -->
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>订单信息</span>
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
                        <span>{{orderInfo | statusFilter}}</span>
                        <!-- <span v-if="orderInfo.Status == 'PRE_AFTER_SALE'">售后订单待确认</span>
                        status
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
                        <span v-else-if="orderInfo.Status == 'EXPIRED'">已过期</span> -->
                    </td>
                </tr>
            </table>
        </el-card>
        <!-- 订单备注信息 -->
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>订单备注信息</span>
            </div>
            <table class="order_detail remark_detail">
                <tr>
                    <td>备注</td>
                    <td>{{orderInfo.Remarks}}</td>
                </tr>
            </table>
        </el-card>
        <!-- 收货信息 -->
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>收货信息</span>
            </div>
            <table class="order_detail reserve_detail" v-if="HostingOrderBool == false">
                <tr>
                    <td>姓名</td>
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
                <tr>
                    <td>物流公司</td>
                    <td>{{orderInfo.Express}}</td>
                </tr>
                <tr>
                    <td>运单编号</td>
                    <td>{{orderInfo.ExpressOrderNumber}}</td>
                </tr>
            </table>
        </el-card>
        <!-- 托管信息 -->
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>托管信息</span>
            </div>
            <table class="order_detail host_detail" v-if="HostingOrderBool">
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
                    <td>托管邮箱</td>
                    <td>{{HostingOrder.Email}}</td>
                </tr>
                <tr>
                    <td>上线时间</td>
                    <td>
                        <span v-if="HostingOrder.StartTime">{{HostingOrder.StartTime | date}}</span>
                        <span v-else></span>
                    </td>
                </tr>
            </table>
        </el-card>
        <!-- 支付信息-人民币 -->
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>支付信息-人民币</span>
            </div>
            <el-table
                    :data="rmbOrderHistory"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="PayType"
                        label="阶段">
                    <template slot-scope="scope">
                        <span v-if="scope.row.PayType == 1">定金</span>
                        <span v-if="scope.row.PayType == 2">尾款</span>
                        <span v-if="scope.row.PayType == 3">全款</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="BankUser"
                        label="收款人">
                </el-table-column>
                <el-table-column
                        prop="BankAccount"
                        label="汇入银行账号">
                </el-table-column>
                <el-table-column
                        prop="BankAddress"
                        label="汇入银行">
                </el-table-column>
                <el-table-column
                        prop="Price"
                        label="汇入金额">
                    <template slot-scope="scope">
                        <div v-if="scope.row.PayType == 1">
                            <span v-if="scope.row.Order.PresellShouldPayPrice">{{scope.row.Order.PresellShouldPayPrice}}</span>
                            <span v-else-if="scope.row.Order.PresellShouldPayUsdPrice">{{scope.row.Order.PresellShouldPayUsdPrice}}</span>
                            <span v-else-if="scope.row.Order.PresellShouldPayBtcPrice">{{scope.row.Order.PresellShouldPayBtcPrice}}</span>
                        </div>
                        <div v-else-if="scope.row.PayType == 2">
                            <span v-if="scope.row.Order.HadPaidPrice">{{scope.row.Order.HadPaidPrice}}</span>
                            <span v-else-if="scope.row.Order.HadPaidUsdPrice">{{scope.row.Order.HadPaidUsdPrice}}</span>
                            <span v-else-if="scope.row.Order.HadPaidBtcPrice">{{scope.row.Order.HadPaidBtcPrice}}</span>
                        </div>
                        <div v-else-if="scope.row.PayType == 3">
                            <span v-if="scope.row.Order.HadPaidPrice">{{scope.row.Order.HadPaidPrice}}</span>
                            <span v-else-if="scope.row.Order.HadPaidUsdPrice">{{scope.row.Order.HadPaidUsdPrice}}</span>
                            <span v-else-if="scope.row.Order.HadPaidBtcPrice">{{scope.row.Order.HadPaidBtcPrice}}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 支付信息-BTC -->
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>支付信息-BTC</span>
            </div>
            <el-table
                    :data="btcOrderHistory"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="PayStep"
                        label="阶段">
                    <template slot-scope="scope">
                        <span v-if="scope.row.PayStep == 1">定金</span>
                        <span v-if="scope.row.PayStep == 2">尾款</span>
                        <span v-if="scope.row.PayStep == 3">全款</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="Time"
                        label="创建时间">
                    <template slot-scope="scope">
                        {{scope.row.Time | date}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="BtcAddress"
                        label="收款地址">
                </el-table-column>
                <el-table-column
                        prop="NeedPay"
                        label="需支付金额（BTC）">
                </el-table-column>
                <el-table-column
                        prop="BtcRate"
                        label="汇率（USD/BTC）">
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 支付记录 -->
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>支付记录</span>
            </div>
            <el-table
                    :data="fundHistory"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="Address"
                        label="地址">
                </el-table-column>
                <el-table-column
                        prop="Amount"
                        label="金额（BTC）">
                </el-table-column>
                <el-table-column
                        prop="BtcRate"
                        label="汇率（USD/BTC）">
                </el-table-column>
                <el-table-column
                        prop="UpdateTime"
                        label="更新时间">
                    <template slot-scope="scope">
                        {{scope.row.UpdateTime | date}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="Confirms"
                        label="确认数">
                </el-table-column>
                <el-table-column
                        prop="Status"
                        label="状态">
                    <template slot-scope="scope">
                        {{scope.row | statusFilter}}
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 余额支付 -->
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>余额支付</span>
            </div>
            <el-table
                    :data="orderHistory"
                    stripe
                    border
                    max-height:330
                    style="width: 100%">
                <el-table-column
                        prop="Address"
                        label="地址">
                    <template slot-scope="scope">
                        <a href="https://btc.com/" target="_Blank" style="color:#409EFF;">{{scope.row.FundHistory?scope.row.FundHistory.Address:'余额付款'}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="HadPaidBtcPriceAfter"
                        label="金额（BTC）">
                    <template slot-scope="scope">
                        {{scope.row.HadPaidBtcPriceAfter - scope.row.HadPaidBtcPriceBefore}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="BTCPrice"
                        label="汇率（USD/BTC）">
                </el-table-column>
                <el-table-column
                        prop="Time"
                        label="更新时间">
                    <template slot-scope="scope">
                        {{scope.row.Time | date}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="Status"
                        label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.FundHistory">
                            <span v-if="scope.row.FundHistory.Status == 'completed'">已完成</span>
                            <span v-else-if="scope.row.FundHistory.Status == 'confirming'">确认中</span>
                        </span>
                        <span v-else>已完成</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 优惠记录 -->
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>优惠记录</span>
            </div>
            <table class="order_detail coupon_detail">
                <tr>
                    <th>ID</th>
                    <th>创建时间</th>
                    <th>活动</th>
                    <th>类型</th>
                    <th>优惠券/优惠码</th>
                    <th>有效时间</th>
                    <th>状态</th>
                </tr>
                <tr v-if="couponHistory">
                    <td>{{couponHistory.ID}}</td>
                    <td>
                        <span v-if="couponHistory.CreateTime">{{couponHistory.CreateTime | date}}</span>   
                    </td>
                    <td>{{couponHistory.Name}}</td>
                    <td>
                        {{couponType[couponHistory.Type]}}
                    </td>
                    <td>{{couponHistory.Name}}</td>
                    <td>
                        <span v-if="couponHistory.StartTime">{{couponHistory.StartTime | date}}---{{couponHistory.EndTime | date}}</span>
                        <span v-else></span>
                    </td>
                    <td>
                        {{couponStatus[couponHistory.Status]}}
                    </td>
                </tr>
                <tr v-else>
                </tr>
            </table>
        </el-card>
        <!-- 操作日志 -->
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>操作日志</span>
            </div>
            <el-table
                    :data="orderUpdateLog"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div v-if="props.row.UpdateType == 'updatePrice'" class="updatePrice">
                            <h4>修改前：</h4>
                            <p>最终需要支付BTC价格：{{JSON.parse(props.row.UpdateBefore).FinalShouldPayBtcPrice}}</p>
                            <p>产品原价（人民币）：{{JSON.parse(props.row.UpdateBefore).ProductOriginPrice}}</p>
                            <p>产品原价（美元）：{{JSON.parse(props.row.UpdateBefore).ProductOriginUsdPrice}}</p>
                            <p>总价（人民币）：{{JSON.parse(props.row.UpdateBefore).TotalShouldPayPrice}}</p>
                            <p>总价（美元）：{{JSON.parse(props.row.UpdateBefore).TotalShouldPayUsdPrice}}</p>
                            <br>
                            <h4>修改后：</h4>
                            <p>最终需要支付BTC价格：{{JSON.parse(props.row.UpdateAfter).FinalShouldPayBtcPrice}}</p>
                            <p>产品原价（人民币）：{{JSON.parse(props.row.UpdateAfter).ProductOriginPrice}}</p>
                            <p>产品原价（美元）：{{JSON.parse(props.row.UpdateAfter).ProductOriginUsdPrice}}</p>
                            <p>总价（人民币）：{{JSON.parse(props.row.UpdateAfter).TotalShouldPayPrice}}</p>
                            <p>总价（美元）：{{JSON.parse(props.row.UpdateAfter).TotalShouldPayUsdPrice}}</p>
                        </div>
                        <div v-else-if="props.row.UpdateType == 'updateAddress'" class="updateAddress">
                            <h4>修改前：</h4>
                            <p>地址：{{JSON.parse(props.row.UpdateBefore).Address}}</p>
                            <p>手机号：{{JSON.parse(props.row.UpdateBefore).MobilePhone}}</p>
                            <p>电话：{{JSON.parse(props.row.UpdateBefore).PhoneNumber}}</p>
                            <p>收货人：{{JSON.parse(props.row.UpdateBefore).Receiver}}</p>
                            <p>邮编：{{JSON.parse(props.row.UpdateBefore).ZipCode}}</p>
                            <br>
                            <h4>修改后：</h4>
                            <p>地址：{{JSON.parse(props.row.UpdateAfter).Address}}</p>
                            <p>手机号：{{JSON.parse(props.row.UpdateAfter).MobilePhone}}</p>
                            <p>电话：{{JSON.parse(props.row.UpdateAfter).PhoneNumber}}</p>
                            <p>收货人：{{JSON.parse(props.row.UpdateAfter).Receiver}}</p>
                            <p>邮编：{{JSON.parse(props.row.UpdateAfter).ZipCode}}</p>
                        </div>
                        <div v-else-if="props.row.UpdateType == 'updateHostOrderInfo'" class="updateHostOrderInfo">
                            <h4>修改前：</h4>
                            <p>地址：{{JSON.parse(props.row.UpdateBefore).Address}}</p>
                            <p>币种：{{JSON.parse(props.row.UpdateBefore).Cryptocurrency}}</p>
                            <p>矿池：{{JSON.parse(props.row.UpdateBefore).MiningPool}}</p>
                            <p>手机号：{{JSON.parse(props.row.UpdateBefore).MobilePhone}}</p>
                            <p>姓名：{{JSON.parse(props.row.UpdateBefore).Name}}</p>
                            <p>手机号前缀：{{JSON.parse(props.row.UpdateBefore).Prefix}}</p>
                            <p>开始时间：{{JSON.parse(props.row.UpdateBefore).StartTime | date}}</p>
                            <br>
                            <h4>修改后：</h4>
                            <p>地址：{{JSON.parse(props.row.UpdateAfter).Address}}</p>
                            <p>币种：{{JSON.parse(props.row.UpdateAfter).Cryptocurrency}}</p>
                            <p>矿池：{{JSON.parse(props.row.UpdateAfter).MiningPool}}</p>
                            <p>手机号：{{JSON.parse(props.row.UpdateAfter).MobilePhone}}</p>
                            <p>姓名：{{JSON.parse(props.row.UpdateAfter).Name}}</p>
                            <p>手机号前缀：{{JSON.parse(props.row.UpdateAfter).Prefix}}</p>
                            <p>开始时间：{{JSON.parse(props.row.UpdateAfter).StartTime | date}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="CreateTime"
                        label="时间">
                    <template slot-scope="scope">
                        {{scope.row.CreateTime | capitalize}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="UpdateType"
                        label="操作类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.UpdateType == 'confirmGatherMoney'">确认收款</span>
                        <span v-if="scope.row.UpdateType == 'orderSending'">发货</span>
                        <span v-if="scope.row.UpdateType == 'overtime'">延长时间</span>
                        <span v-if="scope.row.UpdateType == 'cancelOrder'">取消订单</span>
                        <span v-if="scope.row.UpdateType == 'updatePrice'">修改价格</span>
                        <span v-if="scope.row.UpdateType == 'orderCompletedDeployment'">完成部署</span>
                        <span v-if="scope.row.UpdateType == 'updateAddress'">修改收货地址</span>
                        <span v-if="scope.row.UpdateType == 'updateHostOrderInfo'">修改托管信息</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="AutoBackendUser"
                        label="操作人">
                    <template slot-scope="scope">
                        {{scope.row.AutoBackendUser.Account}}
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
    import {couponType} from '@/fetch/const'
    import {couponStatus} from '@/fetch/const'
    export default {
        name: '',
        data(){
            return{
                couponType:couponType,
                couponStatus:couponStatus,
                OrderId:0,
                orderInfo: '',
                addressDetail:'',
                rmbOrderHistory:[],
                btcOrderHistory:[],
                couponHistory: '',
                HostingOrderBool:false,
                HostingOrder: {},
                orderUpdateLog: [],
                fundHistory: [],
                orderHistory:[]
            }
        },
        methods: {
            getOderDetail(){
                this.$api('/admin/order/get_order_detail', {
                    orderId:this.OrderId
                }).then(res => {
                    let d = res.data
                    // console.log(d)
                    this.orderInfo = d.orderInfo
                this.HostingOrderBool = d.HostingOrderBool
                this.HostingOrder = d.HostingOrder
                d.addressDetail?this.addressDetail = d.addressDetail:this.addressDetail=''
                this.rmbOrderHistory = d.rmbOrderHistory
                this.btcOrderHistory = d.btcOrderHistory
                this.btcOrderHistory.forEach((item, index) => {
                    if(item.NeedPay == 0){
                    this.btcOrderHistory.splice(index, 1)
                }
            })
                // console.log(this.btcOrderHistory)
                this.couponHistory = d.couponHistory
                this.orderUpdateLog = d.orderUpdateLog
                this.orderHistory = d.orderHistory
                // 支付记录
                this.fundHistory = d.fundHistory
                // console.log(this.orderUpdateLog)
            });
            }
        },
        created(){
            //此OrderId为order表的Id,返回信息中的Id
            this.OrderId = this.$route.query.OrderId
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
</style>