<template>
  <div class="statistics_site_all all_com">
    <div class="statistics_site_title title_com">订单统计</div>
    <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
      <div slot="header" class="clearfix">
        <span>当前数据</span>
      </div>
      <div class="text item">
        <label>总订单数：</label> <label id="id_get_all_user_count">{{allList}}</label>
      </div>
      <div class="text item">
        <label>售后订单待确认：</label><label id="id_get_checked_user_count">{{PRE_AFTER_SALE}}</label>
      </div>
      <div class="text item">
        <label>待确认支付订单数：</label><label id="id_get_checked_user_count">{{UNPAID}}</label>
      </div>
      <div class="text item">
        <label>已支付订金订单数：</label><label id="id_get_already_buy_user_count">{{PRESELL_PAID}}</label>
      </div>
      <div class="text item">
        <label>开始支付尾款订单数：</label><label id="id_get_site_config_btc_usd">{{BEGIN_FINAL_PAY}}</label>
      </div>
      <div class="text item">
        <label>待支付尾款订单数：</label><label id="id_get_balance_user_count">{{WAIT_FOR_FINAL_PAY}}</label>
      </div>
      <div class="text item">
        <label>已完成支付订单数：</label><label id="id_get_site_config_btc_usd">{{PAIDCount}}</label>
      </div>
      <div class="text item">
        <label>待发货订单数：</label><label id="id_get_site_config_btc_usd">{{UNDELIVERED}}</label>
      </div>
      <div class="text item">
        <label>已发货订单数：</label><label id="id_get_site_config_btc_usd">{{DELIVERED}}</label>
      </div>
      <div class="text item">
        <label>完成订单订单数：</label><label id="id_get_site_config_btc_usd">{{COMPLETED}}</label>
      </div>
      <div class="text item">
        <label>已取消订单数：</label><label id="id_get_site_config_btc_usd">{{CANCELED}}</label>
      </div>
      <div class="text item">
        <label>已过期订单数：</label><label id="id_get_site_config_btc_usd">{{EXPIRED}}</label>
      </div>
    </el-card>
  </div>
</template>
<script>
  import { mapState } from "vuex"
  export default {
    name: 'statisticsOrder',
    data () {
      return {
        allList: 0,
        UNPAID: this.UNPAID,
        EXPIRED: this.EXPIRED,
        COMPLETED: this.COMPLETED,
        CANCELED: this.CANCELED,
        UNDELIVERED: this.UNDELIVERED,
        BEGIN_FINAL_PAY: this.BEGIN_FINAL_PAY,
        WAIT_FOR_FINAL_PAY: this.WAIT_FOR_FINAL_PAY,
        PRESELL_PAID: this.PRESELL_PAID,
        PRE_AFTER_SALE: this.PRE_AFTER_SALE,
        DELIVERED:0,
        PAIDCount:0
      }
    },
    methods: {
      getOrderStatus(){
        this.$api('/admin/order/stat_all_order_status_list', {
        }).then(res => {
          let d = res.data
          // console.log(res)
        d.forEach((item, index) => {
          if(item.Status == 'UNPAID'){
          // console.log(item.Count)
          this.UNPAID = item.Count
        }else if(item.Status == 'EXPIRED'){
          this.EXPIRED = item.Count
        }else if(item.Status == 'COMPLETED'){
          this.COMPLETED = item.Count
        }else if(item.Status == 'CANCELED'){
          this.CANCELED = item.Count
        }else if(item.Status == 'UNDELIVERED'){
          this.UNDELIVERED = item.Count
        }else if(item.Status == 'BEGIN_FINAL_PAY'){
          this.BEGIN_FINAL_PAY = item.Count
        }else if(item.Status == 'WAIT_FOR_FINAL_PAY'){
          this.WAIT_FOR_FINAL_PAY = item.Count
        }else if(item.Status == 'PRESELL_PAID'){
          this.PRESELL_PAID = item.Count
        }else if(item.Status == 'PRE_AFTER_SALE'){
          this.PRE_AFTER_SALE = item.Count
        }else if(item.Status == 'DELIVERED'){
          this.DELIVERED = item.Count
        }else if(item.Status == 'PAID'){
          this.PAIDCount = item.Count
        }else if(item.Status == 'totalCount'){
          this.allList = item.Count
        }
      });

      });
      }
    },
    created () {
      this.getOrderStatus()
    }
  }
</script>
<style lang='scss' scoped>
  @import "../../assets/css/titlecom.scss";
</style>