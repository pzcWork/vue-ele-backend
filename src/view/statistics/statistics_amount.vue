<template>
  <div class="statistics_site_all all_com">
    <div class="statistics_site_title title_com">资金统计</div>
    <el-card class="box-card" :body-style="{'background-color': '#ffffff'}">
      <div slot="header" class="clearfix">
        <span>当前数据</span>
      </div>
      <div class="text item">
        <label>总充值：</label> <label>{{allBTCFund}}<span>BTC</span></label>
      </div>
      <div class="text item">
        <label>总提现：</label><label>{{allWithdrawAmount}}<span>BTC</span></label>
      </div>
      <div class="text item">
        <label>等待提现：</label><label>{{allProWithdrawAmount}}<span>BTC</span></label>
      </div>
      <div class="text item">
        <label>钱包余额：</label><label>{{walletBalance}}</label>
      </div>
      <div class="text item">
        <label>提现缺口：</label><label>{{withdrawGap}}<span>BTC</span></label>
      </div>
      <div class="text item">
        <label>热钱包：</label><label>{{hotWalletAddr}}</label>
      </div>
    </el-card>
  </div>
</template>
<script>
  import { mapState } from "vuex"
  export default {
    name: 'statisticsAmount',
    data () {
      return {
        allBTCFund:this.allBTCFund,
        allProWithdrawAmount: this.allProWithdrawAmount,
        allWithdrawAmount:this.allWithdrawAmount,
        hotWalletAddr: this.hotWalletAddr,
        walletBalance:this.walletBalance,
        withdrawGap: this.withdrawGap
      }
    },
    methods: {
      getCashStat(){
        this.$api('/admin/stat/get_cash_stat', {
        }).then(res => {
          let d = res.data
          console.log(d)
        this.allBTCFund = d.allBTCFund
        this.allProWithdrawAmount = d.allProWithdrawAmount
        this.allWithdrawAmount = d.allWithdrawAmount
        this.hotWalletAddr = d.hotWalletAddr
        this.walletBalance = d.walletBalance
        this.withdrawGap = d.withdrawGap
      });
      }
    },
    created () {
      this.getCashStat()
    }
  }
</script>
<style lang='scss' scoped>
  @import "../../assets/css/titlecom.scss";
  .text span{
    font-weight: 100
  }
</style>