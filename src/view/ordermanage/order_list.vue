<template>
    <div class="all_com">
        <div class="title_com">
            <span>订单列表</span>
            <el-select
                    v-model="value1"
                    placeholder="请选择"
                    @change="selectStair">
                <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="exportList" style="margin:10px 0 0 20px;">
            <span>共{{this.totalNo}}个</span>
            <el-button size="mini" type="text">导出</el-button>
        </div>
        <!-- 订单列表公共组件 -->
        <orderComponent
                :totalNo = "totalNo"
                :isOffine = "isOffine">
        </orderComponent>
    </div>
</template>
<script>
    import orderComponent from '../../components/orderComponent.vue'
    export default {
        data() {
            return {
                options1: [{
                    value: 'ALL_ORDER',
                    label: '订单列表1'
                }, {
                    value: 'ALL_ORDER2',
                    label: '订单列表2'
                }],
                value1: 'ALL_ORDER',
                orderList: [],
                totalNo: 0,
                pageNo: 1,
                pageSize:50,
                isOffine: false, // 是否为线下订单参数
            }
        },
        components: {
            orderComponent
        },
        methods: {
            selectStair(){
                // console.log(this.value1)
            },
            getList(){
                let orderListMsg = [{
                    date: '2016-05-02',
                    name: '王一虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王二虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王三虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王四虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
                this.msg.$emit('sendOrderList',orderListMsg);
            }
        },
        watch: {
            pageNo: { // 深度监听分页条件变化，并刷新页面
                handler(val, oldVal){
                },
                deep:true
            }
        },
        mounted(){
            // 拿到分页条件
            this.msg.$on('paging',(res)=>{
                this.pageNo = res
            })
        },
        mounted(){
            this.getList()
        }
    }
</script>
<style lang='scss' scoped>
    @import "../../assets/css/titlecom.scss";

</style>