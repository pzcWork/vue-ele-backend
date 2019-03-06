<template>
    <div>      
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "MFooter",
    data() {
        return {
           
            homeData: []
        };
    },
    computed: {
        ...mapState({
            meau: state => state.user.meau,
            isLogin: state => state.user.userInfo
        })
    },
    methods: {
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
    },
    created() {
       
    }
};
</script>

<style lang='scss' scoped>

</style>
