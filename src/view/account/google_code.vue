<template>
    <div>
        <el-card shadow='never'>
            <div slot="header" class="clearfix">
                <span>{{show == 2?'谷歌验证':'重置谷歌验证'}}</span>

            </div>
            <div v-if='show == 1'>
                请输入谷歌验证码：
                <el-input v-model='googleform.resetCode'>
                    
                </el-input>
                <el-button type="primary" @click='resetGoggle()'>下一步</el-button>
            </div>
                
            <div v-else>
                <ul class="authSteps">
                        <li class="authStep_1">
                            <span class="stepTitle">第一步</span>
                            <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" class="btnDownload btn btn_downAndroid b_btn" target="_blank">Android版下载</a>
                            <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605" class="btnDownload btn_downiOS btn b_btn" target="_blank">iOS版下载</a>
                        </li>
                        <li class="authStep_2">
                            <span class="stepTitle">第二步</span>
                            <p class="tips">
                                <strong>请保存您的安全密钥或打印的QR码（只显示一次)</strong></p>
                            <span class="qrcodeTopupTitle">扫二维码</span>

                            <div id="j-qrcode-google-auth" class="qrcodeImg">
                                <div id='qrcode'>

                                </div>
                            </div>
                            <span class="or">或</span>
                            <div class="inputWrap inputWrap_code">
                                <span class="title">输入密钥：</span>
                                <div class="m_inputBox">
                                    <el-input type="text" readonly placeholder="" :value="token"></el-input>
                                </div>
                            </div>

                        </li>
                        <li class="authStep_3">
                            <span class="stepTitle">第三步</span>
                            <div class="inputWrap inputWrap_authCode">

                                <el-form class='dialog-form googleForm' ref='google' :model="googleform"  >

                                    <el-form-item label="谷歌验证码:"  prop="code">
                                        <el-input size="medium" v-model="googleform.code" clearable>

                                        </el-input>

                                    </el-form-item>
                                    <div class="p_popBtns">
                                         <el-button type="primary" @click='sendGoggle()'>确定</el-button>
                                    </div>
                                </el-form>
                            </div>
                        </li>

                    </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapState } from "vuex";
import QRCode from "qrcodejs2";
export default {
    name: "Home",
    data() {
        return {
            user:{},
            googleform:{},
            token:'',
            show:2
        };
    },
    
    computed: {
        ...mapState({
            USER: state => state.user.userInfo
        })
    },
    methods: {
        getUser(){
            this.$api("/admin/manager/setting").then(result => {
                    if(result.code == 0 ){
                        this.user = result.data;
                        this.token = result.data.totpKey
                            this.qrcode(
                                `otpauth://totp/${
                                    this.USER.Account
                                }@pandaminer?secret=${this.token}`
                            );
                    }
            });
        },
        qrcode(url) {
            let qrcode = new QRCode("qrcode", {
                width: 120,
                height: 120, // 高度
                text: url // 二维码内容
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                // background: '#f0f'
                // foreground: '#ff0'
            });
        },
        sendGoggle(){
            if(!this.googleform.code){
                    this.$message({
                        type: 'error',
                        message: '请输入谷歌验证!'
                    });
                    return;
            }
            let params = {
                notice:'设置谷歌验证成功！',
                code:this.googleform.code
            }
            this.$api("/admin/manager/set_totp_auth",params).then(result => {
                if(result.code == 0){
                    this.$router.push('/home')
                }
            })
        },
        resetGoggle(){
            if(!this.googleform.resetCode){
                    this.$message({
                        type: 'error',
                        message: '请输入谷歌验证!'
                    });
                    return;
            }
            let params = {
                code:this.googleform.resetCode
            }
            this.$api("/admin/manager/reset_totp",params).then(result => {
                if(result.code == 0){
                   this.show = 2;
                   this.token = result.data.totpKey
                   setTimeout(()=>{
                       this.qrcode(
                                `otpauth://totp/${
                                    this.USER.Account
                                }@pandaminer?secret=${this.token}`
                            );
                   },500)
                   
                }
            })
        }
    },
    created() {
        if(!this.USER.TotpAuthKey){
            this.getUser();
        }else{
            this.show =1;
        }
        
        // this.getFacilityDetail(16)
    }
};
</script>

<style lang='scss' scoped>
.stepTitle{
        display: block;
    font-weight: bold;
    font-size: 18px;
    color: red;
        margin: 5px 0;
}
.btnDownload{
        border: 1px solid #ddd;
    padding: 5px;
    margin: 5px 0;
    margin-right: 10px;
    /* float: left; */
    background: #26507B;
    border-radius: 5px;
    color: #fff;
    display: inline-block;
}
.el-input{
    width: 250px;
}
</style>
