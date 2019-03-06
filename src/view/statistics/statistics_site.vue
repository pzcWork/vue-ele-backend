<template>
  <div class="statistics_site_all all_com">
    <div class="statistics_site_title title_com">数据统计</div>
    <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
      <div slot="header" class="clearfix">
        <span>当前数据</span>
      </div>
      <div class="text item">
        <label>总用户注册数：</label> <label id="id_get_all_user_count">{{userRegisterCount}}</label>
      </div>
      <div class="text item">
        <label>有效用户注册数：</label><label id="id_get_checked_user_count">{{userActiveCount}}</label>
      </div>
      <div class="text item">
        <label>有完成订单记录用户数：</label><label id="id_get_already_buy_user_count">{{userCompletedOrderCount}}</label>
      </div>
      <div class="text item">
        <label>有余额用户数：</label><label id="id_get_balance_user_count">{{userHaveBalanceCount}}</label>
      </div>
      <div class="text item">
        <label>美元汇率：</label><label id="get_usd_rate">{{usdRate}}</label>
      </div>
    </el-card>
  </div>
</template>
<script>
  import { mapState } from "vuex"
  export default {
    name: 'statisticsSite',
    data () {
      return {
        usdRate: 6.8888,
        userActiveCount: 80,
        userRegisterCount: 100,
        userCompletedOrderCount: 70,
        userHaveBalanceCount: 80
      }
    },
    methods: {
      getSiteStat(){
        
      }
    },
    created () {
      this.getSiteStat()
    }
  }
</script>
<style lang='scss' scoped>
  @import "../../assets/css/titlecom.scss";
</style>