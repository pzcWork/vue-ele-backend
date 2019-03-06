
<template>
    <div class='login-page'>
        <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">账号注册</h3>
            <el-form-item prop="org ">
                <el-input type="text" v-model="ruleForm.org " auto-complete="off" placeholder="org"></el-input>
            </el-form-item>
            <el-form-item prop="contactsName">
                <el-input type="text" v-model="ruleForm.contactsName" auto-complete="off" placeholder="联系人姓名"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input type="text" v-model="ruleForm.phone" auto-complete="off" placeholder="联系人电话"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="userName">
                <el-input type="text" v-model="ruleForm.userName" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="userPwd">
                <hl-password type="userPwd" v-model="ruleForm.userPwd" auto-complete="off" placeholder="密码"></hl-password>
            </el-form-item>
            <el-form-item prop="checkPass">
                <hl-password type="password" v-model="checkPass" auto-complete="off" placeholder="确认密码"></hl-password>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleData" :loading="logining">注册</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
            <a class='register' @click="register">已有账号？去登陆</a>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (this.checkPass === "") {
                callback(
                    new Error(
                       "请再次输入密码"
                    )
                );
            } else if (this.checkPass !== this.ruleForm.userPwd) {
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
            ruleForm: {
                email: "",
                userPwd: "",
                org: ""
            },
            checkPass: "",
            rules2: {
                email: [
                    { required: true, message: "请输入账号", trigger: "blur" },
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
                ],
                contactsName: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                phone: [
                    { required: true, message: "请输入phone", trigger: "blur" },
                    {
                        min: 6,
                        max: 30,
                        message: "输入长度在6-30位之间",
                        trigger: "blur"
                    }
                ],
                username: [
                    { required: true, message: "userName", trigger: "blur" }
                ],
                org: [
                    { required: true, message: "请输入org", trigger: "blur" }
                ],
                checkPass: [
                    {
                        required: true,
                        validator: validatePass,
                        trigger: "blur"
                    }
                ]
            },
            checked: true
        };
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
                  notice:'注册成功'
                };
                console.log(this.ruleForm)
                Object.assign(params,this.ruleForm);
                this.$api("/security/v1.0/register", params).then(result => {
                        console.log(result)
                       if(result.code == 100000 ){
                         this.$router.push('/login');
                       }
                });
                this.$refs.ruleForm.resetFields();
                this.ruleForm = {}
            });
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
