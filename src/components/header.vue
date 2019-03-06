<template>
    <div id='header'>
        <span :class='[visible?"title":"hide-title"]'>
            <template v-if='visible'>
                <i class='icon-img'></i>
                数据操作后台
            </template>
            <template v-else>
            </template>
        </span>
        <i class='side-ico icon iconfont icon-category' @click='silde'></i>

        <el-dropdown id='drop'>
            <span class="el-dropdown-link">
                {{USER.Account}}
                <i class="icon-account icon iconfont"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <router-link to='/account/google_code'>
                    <el-dropdown-item>谷歌验证</el-dropdown-item>
                </router-link>
                <router-link to='/account/set_account'>
                    <el-dropdown-item v-if='this.USER.Level == 111'>管理员设置</el-dropdown-item>
                </router-link>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>

            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "MHeader",
        data() {
            return {
                visible: true,
                homeData: []
            };
        },
        computed: {
                ...mapState({
                            USER: state => state.user.userInfo
    })
    },
    methods: {
        silde() {
            this.msg.$emit("silde");
            this.visible = !this.visible;
        },
        getHomeDataList() {
            // 首页接口
            this.$api("/default/index", {
                // id:this.$route.params.id
            }).then(result => {
                // console.log(result)
                this.homeData = result.Data;
            // console.log(this.homeData)
        });
        },
        logout(){
            this.$store.dispatch('loginOut').then(()=>{
                this.$message({
                type:'success',
                message:'退出成功！'
            })
            this.$router.push('/login');
        });

        }
    },
    created() {

    }
    };
</script>

<style lang='scss' scoped>
    #drop {
        float: right;
        /* margin-right: 40px; */
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        margin: 15px 40px 15px 0;
    }
    #header {
        height: 60px;
        width: 100%;
        box-shadow: 0 0 5px rgba(28, 33, 40, 0);
        position: relative;
        z-index: 100;
        color: #000;
        border-bottom: 1px solid #ddd;
    }
    .icon-img {
        float: left;
        background: url("../assets/image/panda-mine.png") no-repeat;
        background-size: 100%;
        width: 30px;
        height: 30px;
        margin-top: 20px;
        margin-left: 10px;
    }
    .side-ico {
        padding: 0 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        font-size: 24px;
        cursor: pointer;
    }
    .hide-title {
    }
    .title {
        font-size: 18px;
        line-height: 60px;
        /* margin-left: 20px; */
        width: 200px;
        text-align: center;
        float: left;
        border-color: hsla(62, 77%, 76%, 0.3);
        border-right-width: 1px;
        border-right-style: solid;
    }
</style>
