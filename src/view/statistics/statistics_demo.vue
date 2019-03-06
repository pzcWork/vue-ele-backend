<template>
    <h1>demo演示</h1>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        identify() {
            let params = {
                    // app_id应用标识（AppId） 2110485664   AppKey(os4LEhHMIIXTYzuJ)
                    //time_stamp请求时间戳（秒级）
                    //nonce_str 随机字符串
                    //sign签名信息，详见接口鉴权
                    //image待识别图片
                    //image_url待识别图片url
                    app_id: 2110485664,
                    time_stamp: 0,
                    nonce_str: "a577ce340859f9fe",
                    notice:'腾讯鉴黄接口'
                };
            // 鉴黄接口
            this.$api("/fcgi-bin/vision/vision_porn", {
                // id:this.$route.params.id
            }).then(result => {
                // console.log(result)
                this.homeData = result.Data;
                // console.log(this.homeData)
            });
        }
    },
    created() {
        // this.$api("/security/v1.0/token", {
        //         // id:this.$route.params.id
        //     }).then(result => {
        //         // console.log(result)
        //         this.homeData = result.Data;
        //         // console.log(this.homeData)
        //     });
    }
}
</script>
<style>

</style>


