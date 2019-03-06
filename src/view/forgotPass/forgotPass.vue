<template>
    <div class='login-page'>
        <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">找回密码</h3>
            <el-form-item prop="account">
                <el-input @blur='checkUser' type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <hl-password type="password" v-model="ruleForm.password" auto-complete="off" placeholder="新密码"></hl-password>
            </el-form-item>
            <el-form-item prop="checkPass">
                <hl-password type="password" v-model="checkPass" auto-complete="off" placeholder="再次输入新密码"></hl-password>
            </el-form-item>
            <el-form-item prop="totpCode">
                <el-input type="text" v-model="ruleForm.totpCode" auto-complete="off" placeholder="谷歌验证码"></el-input>
            </el-form-item>
            <!-- 滑块验证 -->
            <el-form-item label="验证" label-width="60px" prop="validate">
                <neccaptch @emitHandler='emitHandler'></neccaptch>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleData" :loading="logining">确定</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
            <a class='register' @click="register">已有账号？去登陆</a>
        </el-form>
        <neccaptch-dialog @emitHandler='_emitHandler' @handleClose='_handleClose' :visible='codeVisible'></neccaptch-dialog>
    </div>
</template>

<script>
import neccaptch from "@/components/m-neccaptch";
import neccaptchDialog from "@/components/neccapthDialog";
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (this.checkPass === "") {
                callback(
                    new Error(
                       "请再次输入密码"
                    )
                );
            } else if (this.checkPass !== this.ruleForm.password) {
                callback(
                    new Error(
                        "两次输入密码不一致!"
                    )
                );
            } else {
                callback();
            }
        };
        return {
            logining: false,
            codeVisible: false,
            ruleForm: {
                password: ""
            },
            checkPass: "",
            rules2: {
                account: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                    //{ validator: validaePass }
                    {
                        min: 6,
                        max: 30,
                        message: "输入长度在6-30位之间",
                        trigger: "blur"
                    }
                ],
                totpCode: [
                    {
                        required: true,
                        message: "请输入谷歌验证码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 30,
                        message: "输入长度在6-30位之间",
                        trigger: "blur"
                    }
                    //{ validator: validaePass2 }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 30,
                        message: "输入长度在6-30位之间",
                        trigger: "blur"
                    }
                ],
                checkPass: [
                    {
                        required: true,
                        validator: validatePass,
                        trigger: "blur"
                    }
                ],
                validate: [
                    {
                        required: true,
                        message: "请通过验证",
                        trigger: "blur"
                    }
                ]
            },
            checked: true
        };
    },
    components: {
        neccaptch,
        neccaptchDialog
    },
    methods: {
        register(){
          this.$router.push('/login')
        },
        handleData() {
            //提交数据
            this.$refs.ruleForm.validate(valid => {
                if (!valid) {
                    return;
                }
                let params = {
                  notice:'密码找回成功'
                };
                Object.assign(params,this.ruleForm);
                console.log(Object.assign(params,this.ruleForm))
                this.$api("/admin/manager/update_manager_pwd", params).then(result => {
                       if(result.code == 0 ){
                         this.$router.push('/login');
                       }
                    // console.log(result)
                });
                this.$refs.ruleForm.resetFields();
                this.ruleForm = {}
            });
        },
        checkUser() {
            if (this.ruleForm.account != "") {
                this.$api("/admin/nointercept/get_account_setting", {
                    account: this.ruleForm.account,
                    errorHandle: true
                }).then(result => {
                    console.log(result)
                    return
                    if (result.code == 0) {
                        if (result.data.isSetTotpAuth) {
                            this.googleShow = true;
                        }else{
                          this.googleShow = false;
                        }
                    } else {
                        this.googleShow = false;
                    }
                });
            }
        },
        _emitHandler(data) {
            console.log(data)
            this.captcha = data.validate;
            this.codeVisible = false;
            let url, params;
            params = {
                phone_prefix: this.form.phone_prefix,
                phone_number: this.form.phone_number,
                validate: this.captcha,
                business: "login"
            };
            url = "api/phone_send_sms_token";
            
        },
        _handleClose() {
            this.codeVisible = false;
        },
        emitHandler(data) {
            this.necCaptch = data.instance;
            console.log(this.ruleForm)
            this.ruleForm.validate = data.validate;
            // console.log(data.instance)
        }
    }
};
</script>

<style lang="scss" scoped>
.register{
  color: #26507B;
  cursor: pointer;
}
.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
}
.login-page {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: #26507b;
    background-size: 100%;
}
</style>
