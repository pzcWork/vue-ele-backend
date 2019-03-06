<template>
    <div class="order_list">
        <el-table
        :data="orderList"
        style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        name:'orderComponent',
        data(){
            return{
                orderList:[]
            }
        },
        // 获取从父组件传入的数据
        props: ['totalNo', 'isOffine'],
        methods: {},
        mounted(){
            this.msg.$on('sendOrderList',(res)=>{
                this.orderList = res
                // console.log(this.orderList)
            })
        }
    }
</script>
<style lang='scss' scoped>
    @import "../assets/css/titlecom.scss";
</style>