<template>
    <div class="statistics_site_all all_com">
        <div class="statistics_site_title title_com">{{title}}</div>
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>订单列表</span>
            </div>
            <el-table
                    :data="tableData1"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="Id"
                        label="ID">
                </el-table-column>
                <el-table-column
                        prop="CreateTime"
                        label="创建时间">
                    <template slot-scope="scope">
                        {{scope.row.CreateTime | date}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="ProductName"
                        label="矿机型号">
                </el-table-column>
                <el-table-column
                        prop="SoldCount"
                        label="总售出数量">
                </el-table-column>
                <el-table-column
                        prop="RefundCount"
                        label="总退款数量">
                </el-table-column>
                <el-table-column
                        prop="BackCount"
                        label="总退货数量">
                </el-table-column>
                <el-table-column
                        prop="Sold"
                        :label="'总销售额'+this.unit">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
    export default {
        name:'',
        data(){
            return{
                unit:'(元)',
                title: '',
                tableData1: [],
                lg: '' // 语言版本，cn中文，en英语
            }
        },
        methods: {
            getStatistics(lg){
                this.tableData1 = []
                this.$api('/admin/stat/get_statistics_cn_en', {
                    lg: lg
                }).then(res => {
                    let d = res.data
                    // console.log(res)
                    d.forEach((item, index) => {
                    if(item.CreateTime != 0){
                    this.tableData1.push(item)
                }
            })
            });
            }
        },
        watch: {
            $route: {
                handler: function(val, oldVal){
                    // 路由变化，获取改变的lg
                    this.lg = val.query.lg
                    // 根据改变的lg，获取最新的table数据
                    this.getStatistics(this.lg)
                    // 改变标题
                    if(this.lg == 'cn'){
                        this.title = '中文站点矿机销售统计'
                        this.unit = '(元)'
                    }else {
                        this.title = '英文站点矿机销售统计'
                        this.unit = '(美元)'
                    }
                },
                // 深度观察监听
                deep: true
            }
        },
        computed:{

        },
        created(){
            // 获取路由上的lg参数
            this.$route.query.lg?this.lg = this.$route.query.lg:this.lg='cn'
            if(this.lg == 'cn'){
                this.title = '中文站点矿机销售统计'
                this.unit = '(元)'
            }else {
                this.title = '英文站点矿机销售统计'
                this.unit = '(美元)'
            }
            // 根据lg参数获取table数据
            this.getStatistics(this.lg)

        }
    }
</script>
<style lang='scss' scoped>
    @import "../../assets/css/titlecom.scss";
</style>