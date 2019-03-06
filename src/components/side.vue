<template>
    <div class='aside'>
               
<el-menu
id='sidebar'
:unique-opened=true
active-text-color="#ffd04b"
background-color = "#0E2D43"
text-color='#fbfbfb'
default-active="1-4-1"
class="el-menu-vertical-demo"
@open="handleOpen"
@close="handleClose"
:collapse="isCollapse"
router>
  <el-menu-item index="/home/index">
    <span slot="title">首页</span>
  </el-menu-item>
  <el-submenu index="2">
    <template slot="title">
      <span slot="title">统计</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="/statistics/statistics_site">站点统计</el-menu-item>
      <el-menu-item index="2-3">资金统计</el-menu-item>
      <el-menu-item index="2-2">订单统计</el-menu-item>
      <el-menu-item index="2-4">中文站点</el-menu-item>
      <el-menu-item index="2-5">英文站点</el-menu-item>
      <el-menu-item index="/statistics/statistics_demo">demo演示</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="3">
    <template slot="title">
      <span slot="title">用户管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="/usermanage/user_list">列表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="4">
    <template slot="title">
      <span slot="title">商品管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="/productmanage/product_list">列表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="5">
    <template slot="title">
      <span slot="title">订单管理</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="/ordermanage/order_list">订单管理</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group>
      <el-menu-item index="/ordermanage/camero">相机</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "side",
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    },
    mounted(){
        
        this.msg.$on("silde",()=>{
            this.isCollapse = !this.isCollapse;
        })
    },
    computed: {
        ...mapState({
            meau: state => state.user.meau,
            isLogin: state => state.user.userInfo
        })
    },
    created() {
       
    }
};
</script>

<style lang='scss' scoped>
.aside{
    float: left;
    height: calc(100% - 61px);
}
#sidebar{
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden
}
</style>
