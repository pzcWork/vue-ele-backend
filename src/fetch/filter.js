import Vue from 'vue'
Vue.filter('fiexd', function (value, type) {
    if (typeof value == 'number') {
        return value.toFixed(type);
    } else {
        return '';
    }
})
Vue.filter('capitalize', function (value) {
    if (!value) return ''
    // 时间戳转为普通时间格式2017-10-10，精确到天
    value = new Date(value*1000).toJSON().slice(0,10)
    return value
})
Vue.filter('date',function(value){
    var inputTime = value*1000;
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
})
Vue.filter('statusFilter', function (value) {
    if (!value) return ''
    if(value.Status == 'PRE_AFTER_SALE' || value.Status == 'pre_after_sale'){ // 线下订单无
        return value = '售后订单待确认'
    }else if(value.Status == 'UNPAID' || value.Status == 'unpaid'){
        return value = '待确认支付'
    }else if(value.Status == 'PRESELL_PAID' || value.Status == 'presell_paid'){
        return value = '已支付定金'
    }else if(value.Status == 'BEGIN_FINAL_PAY' || value.Status == 'begin_final_pay'){ // 线下订单无
        return value = '开始支付尾款'
    }else if(value.Status == 'WAIT_FOR_FINAL_PAY' || value.Status == 'wait_for_final_pay'){
        return value = '待支付尾款'
    }else if(value.Status == 'PAID' || value.Status == 'paid'){
        return value = '已完成支付'
    }else if(value.Status == 'UNDELIVERED' || value.Status == 'undelivered'){
        if(value.IsHostingOrder == false && value.ReadyDeliver == 0){
            return value = '待发货（发货）'
        }else if(value.IsHostingOrder == true && value.ReadyDeliver == 0){
            return value = '待发货（托管）'
        }else if(value.ReadyDeliver == 1){
            if(value.IsHostingOrder == false){
                return value = '已安排发货'
            }else if(value.IsHostingOrder == true){
                return value = '已安排部署'
            }

        }
    }else if(value.Status == 'DELIVERED' || value.Status == 'delivered'){
        if(value.IsHostingOrder == false){
            return  value = '已发货（发货）'
        }else if(value.IsHostingOrder == true){
            return  value = '已发货（托管）'
        }
    }else if(value.Status == 'COMPLETED' || value.Status == 'completed'){
        if(value.IsHostingOrder == false){
            return  value = '确认收货'
        }else if(value.IsHostingOrder == true){
            return  value = '完成部署'
        }
    }else if(value.Status == 'CANCELED' || value.Status == 'canceled'){
        return value = '已取消'
    }else if(value.Status == 'EXPIRED' || value.Status == 'expired'){ // 线下订单无
        return value = '已过期'
    }
})
//判断权限
Vue.directive('auth', {
    inserted(el, binding, vnode){
        if(binding.value){
            el.parentNode.removeChild(el);
        }
    }
});