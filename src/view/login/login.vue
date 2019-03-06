
<template>
    <div class='login-page'>
        <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="appId ">
                <el-input @blur='checkUser' type="text" v-model="ruleForm.appId " auto-complete="off" placeholder="应用ID"></el-input>
            </el-form-item>
            <el-form-item prop="appKey ">
                <el-input @blur='checkUser' type="text" v-model="ruleForm.appKey " auto-complete="off" placeholder="应用秘钥"></el-input>
            </el-form-item>
            <el-form-item prop="userName ">
                <el-input @blur='checkUser' type="text" v-model="ruleForm.userName " auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="userPwd ">
                <el-input type="password" v-model="ruleForm.userPwd " auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item v-if='googleShow' prop="google_code">
                <el-input type="text" v-model="ruleForm.google_code" auto-complete="off" placeholder="谷歌验证码"></el-input>
            </el-form-item>
            <el-checkbox v-model="ruleForm.checked"  class="remember">记住密码</el-checkbox>
            <a class='findPassword' @click="forgotPass">找回密码</a>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleData" :loading="logining">登录</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
            <a class='register' @click="register">没有账号？去注册</a>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logining: false,
                googleShow: false,
                ruleForm: {
                    userName: "",
                    userPwd: "",
                    appId: "",
                    appKey:""
                },
                rules2: {
                    userName: [
                        { required: true, message: "请输入账号", trigger: "blur" },
                        //{ validator: validaePass }
                        {
                            min: 6,
                            max: 30,
                            message: "输入长度在6-30位之间",
                            trigger: "blur"
                        }
                    ],
                    userPwd: [
                        { required: true, message: "请输入密码", trigger: "blur" },
                        {
                            min: 6,
                            max: 30,
                            message: "输入长度在6-30位之间",
                            trigger: "blur"
                        }
                        //{ validator: validaePass2 }
                    ],
                    google_code: [
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
                    ]
                },
                checked: false
            };
        },
        methods: {
            forgotPass(){
                this.$router.push("/forgotPass");
            },
            handleData() {
                //提交数据
                this.$router.push("/");
                this.$refs.ruleForm.validate(valid => {
                    if (!valid) {
                    return;
                }
                let params = {
                    notice: "登陆成功！"
                };
                Object.assign(params, this.ruleForm);
                console.log(params)
                this.$api("/security/v1.0/token", params).then(result => {
                    console.log(result)
                    if (result.code == 0) {
                    if (this.ruleForm.checked) {
                        delete this.ruleForm.google_code
                        this.$cookie.set(
                                "ac",
                                JSON.stringify(this.ruleForm),
                                "30"
                        );
                    } else {
                        this.$cookie.remove("ac");
                    }
                    this.$refs.ruleForm.resetFields();
                    this.ruleForm = {};
                    this.$router.push("/");
                }
            });
            });
            },
            register() {
                this.$router.push("/register");
            },
            checkUser() {
            }
        },
        created() {
            if (this.$cookie.get("ac")) {
                this.ruleForm = JSON.parse(this.$cookie.get("ac"));
                // this.checkUser()
            }
        }
    };
</script>

<style lang="scss" scoped>
    .register {
        color: #26507b;
        cursor: pointer;
    }
    .findPassword{
        float: right;
        color: #26507b;
        cursor: pointer;
        margin-right: 10px;
    }
    .findPassword:hover{
        color: #409EFF;
        // text-decoration: underline
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
