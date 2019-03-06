<template>
    <div class="all_com">
        <div class="title_com">商品管理</div>
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>商品列表</span>
            </div>
            <div class="search_fun">
                <el-select v-model="status" class='small' style="width:100px" size='small' placeholder="请选择">
                    <el-option v-for="(item,index) in orderStatus" :key="index" :label="item" :value="index">
                    </el-option>
                </el-select>
                <!-- <el-input v-model="input" class='search_input' size='small' placeholder="请输入内容"></el-input> -->
                <el-button type="primary" size='small' @click='search'>搜索</el-button>
            </div>
            <el-table :data="tableData" stripe style="width: 100%;height:100%">
                <el-table-column prop="ID" label="Id" width="60">
                </el-table-column>
                <el-table-column prop="CreateTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="Name" label="商品名">
                </el-table-column>
                <el-table-column prop="SellType" label="类型">
                </el-table-column>
                <el-table-column prop="RegistTime" label="价格">
                </el-table-column>
                <el-table-column prop="UpdateTime" label="状态">
                </el-table-column>
                <el-table-column class='action' label="操作" width="280">
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="请选择下架时间" :visible.sync="dialogVisible" width="30%">
            <el-date-picker v-model="sold_out_time" size='small' placeholder="请选择下架时间" value-format='timestamp' type="date">
            </el-date-picker>
            
                <el-button type="primary" size="mini" @click="comfirm">确 定</el-button>

        </el-dialog>
    </div>
</template>

<script>
import { orderStatus, sellType } from "@/fetch/const";
export default {
    name: "",
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            status: "-1",
            orderStatus: orderStatus,
            sellType: sellType,
            pageNo: 1,
            totalNo: 0,
            sold_out_time: "",
            input: "",
            order_id:''
        };
    },
    methods: {
        saleon(id) {
            this.order_id = id;
            this.dialogVisible = true;
        },
        comfirm() {
            if (!this.sold_out_time) {
                this.$message({
                    type: "error",
                    message: "请选择下架时间!"
                });
                return;
            }
            if(this.sold_out_time <= new Date().getTime()){
                this.$message({
                    type: "error",
                    message: "请选择当前时间之后的下架时间!"
                });
                return;
            }
            let params = {
                product_id: this.order_id,
                sold_out_time: this.sold_out_time/1000,
                notice: "上架成功！"
            };
        },
        saleoff(id) {
            this.$confirm("此操作将下架商品, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = {
                    product_id: id,
                    notice: "下架成功！"
                };
            });
        },
        presell_end(id) {
            this.$confirm("此操作将结束预售, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = {
                    product_id: id,
                    notice: "结束预售成功！"
                };
            });
        },
        tailing(id) {
            this.$confirm("此操作将开启尾款, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = {
                    product_id: id,
                    notice: "开启尾款成功！"
                };
            });
        },
        search() {
            this.pageNo = 1;
        },
        Detail(id) {
            this.$router.push(`/productmanage/product_detail/${id}`);
        }
    },
    created() {
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