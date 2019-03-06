export const ETHpool = [ //矿池种类
    {
        id:0,
        name:"eth.pandaminer.com:81"
    }
]
export const ETCpool = [ //矿池种类 
    {
        id:0,
        name:'waterhole.io'
    },
    {
        id:1,
        name:'f2pool.com'
    }
]
export const ZECpool = [ //矿池种类
    {
        id:0,
        name:'waterhole.io'
    },
    {
        id:1,
        name:'f2pool.com'
    }
]

export const cryptocurrency = [//币种
    {
        id:0,
        name:'ETH'
    },
    {
        id:1,
        name:'ETC'
    },
    {
        id:2,
        name:"ZEC"
    }
]
export const withStatus = {
    "canceled":"已取消",
    "all":"所有",
    "sending":"发送中",
    "processing":"进行中",
    "ready":"待确认",
    "completed":"完成"
}
export const moneyStatus = {
    "all":"所有",
    "processing":"进行中",
    "confirming":"确认中",
    "completed":"完成",
    "invalid":"已取消"
}
export const orderStatus = {
    '-1':'全部',
    0:'下架',
    1:'上架',
    2:'预售中',
    3:'预售结束',
    4:'尚未开启',
    5:'尾款中',
}

export const withdrawStatus = {
    "all":"",
    "sending":"sending",
    "processing":"processing",
    "ready":"ready",
    "completed":"completed"
}

export const fundStatus = {
    "all":"",
    "processing":"processing",
    "confirming":"confirming",
    "completed":"completed",
    "invalid":"invalid"
}

export const sellType = {
    '1':'只发货',
    '2':'只托管',
    '3':'可发货和托管'
}

export const couponType = {
    '1':'代金券',
    '2':'满减券',
    '3':'BTC优惠券',
    '4':'指定商品券'
}
export const couponStatus = {
    '0':'过期',
    '1':'可使用',
    '2':'已使用',
    '3':'不可用'
}