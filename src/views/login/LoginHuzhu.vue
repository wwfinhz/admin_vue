<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12"><el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox></el-col>
      <el-col :span="12"><div class="regist">注册</div></el-col>
    </el-row>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!-- <el-button @click.native.prevent="handleRegist2">重置</el-button> -->
    </el-form-item>
  </el-form>
  
</template>

<script>
  import { getHuzhu } from '../../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var formData = new FormData()
            formData.append('hzphone', this.ruleForm2.account)
            formData.append('hzpassword', this.ruleForm2.checkPass)

            // var loginParams = { hzphone: this.ruleForm2.account, hzpassword: this.ruleForm2.checkPass };
            getHuzhu(formData).then(res => {
              this.logining = false;
              console.log(res);
              if (res.data.code) {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
                return
              }
              sessionStorage.setItem('user', JSON.stringify(res.data.data));
              this.$router.push({ path: '/table' });
              
            }).catch(error =>{
                  console.log(error)
                  this.logining = false;
              }
            );
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
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
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .regist{
      margin: 0px 0px 35px 0px;
      text-align: right;
      width: 80%;
    }
  }
</style>