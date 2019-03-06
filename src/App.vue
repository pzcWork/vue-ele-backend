<template>
    <div id="app">
        <m-header v-if='visible'></m-header>
        <m-side v-if='visible'></m-side>
        <el-main>
            <router-view></router-view>
        </el-main>
        <m-footer v-if='visible'></m-footer>
    </div>
</template>

<script>
import MSide from "./components/side";
import MFooter from "./components/footer";
import MHeader from './components/header';
export default {
    name: "App",
    components: {
        MSide,
        MFooter,
        MHeader,
    },
    data() {
        return {
            visible:true
        };
    },
    watch: {
        //监听路由变化
        $route(to, from) {
            if(to.name == 'login'|| to.name == 'register'|| to.name == 'forgotPass'){
                this.visible = false;
            }else{
                this.visible = true;
            }
        }
    },
    mounted() {
      
    },

    methods: {}
};
</script>

<style lang='scss'>
@import "./assets/css/main.scss";
.el-main{
    height: calc(100% - 61px); // 右侧内容高度等于100%减头部高度
    padding: 20px 20px 20px 0;
    width: 40%;
    position: relative;
}
</style>
