<template>
    <div class="all_com">
        <div class="title_com">托管信息</div>
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>托管订单</span>
            </div>
             <div class="search_fun">
                 <el-select v-model="key" class='small' style="width:100px" size='small' placeholder="请选择">
                    <el-option v-for="(item,index) in list" :key="index" :label="item" :value="index">
                    </el-option>
                </el-select>
                <el-input v-model="keyword" class='search_input' size='small' placeholder="id、订单id、姓名、手机号码"></el-input>
                <el-button type="primary" size='small' @click='search'>搜索</el-button>
            </div>
            <el-table :data="tableData" stripe style="width: 100%;height:100%">
                <el-table-column prop="Id" label="Id" width="60">
                </el-table-column>
                <el-table-column prop="Order.OrderId" label="OrderId">
                    <template slot-scope="scope">
                        <router-link class='color-a' :to="'/ordermanage/order_detail?OrderId='+scope.row.Order.Id">
                        {{scope.row.Order.OrderId}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="Name" label="名字">
                </el-table-column>
                <el-table-column prop="Prefix" label="手机区号">
                    
                 
                </el-table-column>
                <el-table-column prop="MobilePhone" label="手机号码">
                   
                </el-table-column>
                <el-table-column prop="Cryptocurrency" label="币种">
                   
                </el-table-column>
                <el-table-column prop="Address" label="地址">
                    <!-- <template slot-scope="scope">
                        <a v-if="scope.row.Cryptocurrency == 'ETH'" class="BTC_address" :href="'https://eth.pandaminer.com/miner/'+scope.row.Address" target="_Blank" style="color:#409EFF;">{{scope.row.Address}}</a>
                        <a v-else-if="scope.row.Cryptocurrency == 'ETC'" class="BTC_address" :href="'https://eth.pandaminer.com/miner/'+scope.row.Address" target="_Blank" style="color:#409EFF;">{{scope.row.Address}}</a>
                        <a v-else class="BTC_address" :href="'https://'+scope.row.MiningPool+'/miners/'+scope.row.Address" target="_Blank" style="color:#409EFF;">{{scope.row.Address}}</a>    
                    </template> -->
                </el-table-column>
                <el-table-column prop="MiningPool" label="矿池">
                   
                </el-table-column>
            </el-table>
            <el-pagination class='page' :current-page.sync="pageNo" @current-change='getList' background layout="prev, pager, next" :total="totalNo">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import {  couponType } from "@/fetch/const";
export default {
    name: "",
    data() {
        return {
            tableData: [],
            pageNo: 1,
            list:{
                "id":"ID",
                "name":"姓名",
                "mobilePhone":"手机号码",
                "orderNo":"订单ID",
            },
            totalNo: 0,
            key:'orderNo',
            keyword:'',
            input: ""
        };
    },
    methods: {
        getList() {
            let params = {
                pageNo: this.pageNo,
                pageSize: 10
            };
            params[this.key] = this.keyword;
            this.$api("/admin/host/get_host_order_list", params).then(res => {
                this.tableData = res.data.orderList;
                this.totalNo = res.data.page.totalNum;
            });
        },
        search() {
            this.pageNo = 1;
            this.getList();
        },
        Detail(id) {
            this.$router.push(`/productmanage/product_detail/${id}`);
        }
    },
    created() {
        this.getList();
    }
};
</script>
<style lang='scss' scoped>
@import "../../assets/css/titlecom.scss";
.detaila:hover {
    color: #409eff;
    text-decoration: underline;
}
.search_fun {
    height: 60px;
    position: relative;
    top: 10px;
    float: right;
}
.search_input {
    width: 200px;
}
</style>