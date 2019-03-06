<template>
    <div class="all_com">
        <div class="title_com">用户管理</div>
        <div class="exportList" style="margin:10px 0 0 20px;">
            <span>共{{this.totalNo}}个</span>
            <el-button size="mini" type="text" @click="exportList">导出</el-button>
        </div>
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>用户列表</span>
            </div>
            <div class="search_fun">
                <el-dropdown @command="handleCommand" size="mini" split-button type="primary">
                    {{this.selectSearch}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="用户名">用户名</el-dropdown-item>
                        <el-dropdown-item command="邮箱">邮箱</el-dropdown-item>
                        <el-dropdown-item command="来源">来源</el-dropdown-item>
                        <el-dropdown-item command="手机号">手机号</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-input
                        placeholder="用户名/邮箱/来源"
                        v-model="input1"
                        clearable
                        size="small"
                        class="search_input">
                </el-input>
                <el-button type="primary" @click="searchBtn()">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%;height:100%">
                <el-table-column
                        prop="Id"
                        label="Id">
                </el-table-column>
                <el-table-column
                        prop="Account"
                        label="账号">
                </el-table-column>
                <el-table-column
                        prop="Email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="RegistTime"
                        label="注册时间">
                    <template slot-scope="scope">
                        {{scope.row.RegistTime}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="UpdateTime"
                        label="最后登录时间">
                    <template slot-scope="scope">
                        {{scope.row.UpdateTime}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{path:'/usermanage/user_list',query:{uid:scope.row.Id}}" class="detaila">
                            详细
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class='page'
                    background
                    :current-page="currentPage1"
                    @current-change="handleCurrentChange"
                    :page-size="50"
                    layout="total, prev, pager, next, jumper"
                    :total="totalNo">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
    export default {
        name:'',
        data(){
            return{
                tableData: [
                    {'Id': 10082, 'Account': '2967792741@qq.com', 'Email': '2967792741@qq.com', 'EmailVerified': 'true', 'RegistTime': '2018/5/30 下午 6:35:36', 'UpdateTime': '2018/5/30 下午 18:35:36'},
                    {'Id': 10083, 'Account': '3967792741@qq.com', 'Email': '3967792741@qq.com', 'EmailVerified': 'false', 'RegistTime': '2018/5/30 下午 6:35:36', 'UpdateTime': '2018/5/30 下午 18:35:36'},
                    {'Id': 10084, 'Account': '4967792741@qq.com', 'Email': '4967792741@qq.com', 'EmailVerified': 'false', 'RegistTime': '2018/5/30 下午 6:35:36', 'UpdateTime': '2018/5/30 下午 18:35:36'},
                    {'Id': 10085, 'Account': '5967792741@qq.com', 'Email': '5967792741@qq.com', 'EmailVerified': 'true', 'RegistTime': '2018/5/30 下午 6:35:36', 'UpdateTime': '2018/5/30 下午 18:35:36'}
                ],
                EmailVerified:'',
                selectSearch: '用户名',
                userName: '',
                email: '',
                source: '',
                input1:'',
                currentPage1: 1,
                totalNo: 0
            }
        },
        methods: {
            exportList(){
                this.$confirm('是否确认导出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.userName = ''
                this.email = ''
                this.source = ''
                this.phoneNumber = ''
                switch(this.selectSearch){
                    case '用户名':
                        this.userName = this.input1
                        break;
                    case '邮箱':
                        this.email = this.input1
                        break;
                    case '来源':
                        this.source = this.input1
                        break;
                    case '手机号':
                        this.phoneNumber = this.input1
                        break;
                    default:
                }
            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '取消操作'
                });
            });
            },
            handleCommand(command){
                this.selectSearch = command
            },
            getUserList(){
                
            },
            searchBtn(){
                // console.log(this.input1)
                // if(this.selectSearch == '用户名'){
                //     this.userName = this.input1
                //     this.email = ''
                //     this.source = ''
                //     this.phoneNumber = ''
                // }else if(this.selectSearch == '邮箱'){
                //     this.userName = ''
                //     this.email = this.input1
                //     this.source = ''
                //     this.phoneNumber = ''
                // }else if(this.selectSearch == '来源'){
                //     this.userName = ''
                //     this.email = ''
                //     this.source = this.input1
                //     this.phoneNumber = ''
                // }else{
                //     this.userName = ''
                //     this.email = ''
                //     this.source = ''
                //     this.phoneNumber = this.input1
                // }
            },
            handleCurrentChange(val){
                
            }
        },
        created () {
            // axios.get('/admin/user/logout')
            console.log(this.tableData)
            if(this.tableData.length == 0){
                this.getUserList();
            }
        }
    }
</script>
<style lang='scss' scoped>
    @import "../../assets/css/titlecom.scss";
    .detaila:hover{
        color: #409EFF;
        text-decoration: underline
    }
    .search_fun{
        width: 400px;
        height: 60px;
        position: relative;
        top: 10px;
        float: right
    }
    .search_input{
        width: 200px
    }
    .search_fun button{
        position: absolute;
        right: 0;
        top: -4px
    }
</style>