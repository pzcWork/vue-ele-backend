<template>
    <div class="all_com">
        <div class="title_com">权限管理</div>
        <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
            <div slot="header" class="clearfix">
                <span>后台系统管理人员列表</span>
            </div>
            <el-table :data="tableData" stripe style="width: 100%;height:100%">
                <el-table-column prop="ID" label="Id">
                </el-table-column>
                <el-table-column prop="Account" label="账号">
                </el-table-column>
                <el-table-column prop="Email" label="邮箱">
                </el-table-column>
                <el-table-column prop="Level" label="等级">
                    <template slot-scope="scope">
                        {{Level[scope.row.Level]}}
                    </template>
                </el-table-column>
                <el-table-column prop="TotpAuthKey" label="谷歌验证">
                    <template slot-scope="scope">
                        {{scope.row.TotpAuthKey?'已绑定':'未绑定'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if='scope.row.Level == 101' @click='changeLevel(0,scope.row.ID)'>设置为普通用户</el-button>
                        <el-button v-if='scope.row.Level == 0' @click='changeLevel(101,scope.row.ID)'>设置为管理员</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            tableData: [],
            Level: {
                "0": "普通用户",
                "101": "管理员",
                "111": "超级管理员"
            }
        };
    },
    methods: {
        getList() {
            let params = {};
            this.$api("/admin/manager/get_list", params).then(res => {
                console.log(res)
                if (res.code == 0) {
                    this.tableData = res.data;
                }
            });
        },
        search() {
            this.pageNo = 1;
            this.getList();
        },
        changeLevel(level, id) {
            let msg;
            if (level == 0) {
                msg = "此操作将会把该用户设置为普通用户权限，请确认";
            } else {
                msg = "此操作将会把该用户设置为管理员权限，请确认";
            }
            this.$confirm(msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params = {
                    notice :'设置成功！',
                    manager_id:id,
                    level :level
                }   
                this.$api("/admin/manager/update", params).then(res => {
                    if (res.code == 0) {
                        this.getList();
                    }
                });
            });
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