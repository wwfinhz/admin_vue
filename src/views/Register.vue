<template>
  

  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
   
      <router-link to="/login"><el-button type="Brand Color" icon="el-icon-arrow-left" round size="mini">返回</el-button></router-link>
      
    <h3 class="title">物业注册</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="工号"></el-input>
    </el-form-item>
    <el-form-item prop="name">
      <el-input type="text" v-model="ruleForm2.name" auto-complete="off" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassagain">
      <el-input type="password" v-model="ruleForm2.checkPassagain" auto-complete="off" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">注册</el-button>
      <!-- <el-button @click.native.prevent="handleRegist2">重置</el-button> -->
    </el-form-item>
  </el-form>
  
</template>

<script>
  import { registerwuye } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPassagain');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.checkPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: '',
          checkPassagain:'',
          name:''
        },
        rules2: {
          account: [
            { required: true, message: '请输入工号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          checkPassagain:[
              { validator: validatePass2, trigger: 'blur' },
          ],
          name:[
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        checked: true
      };
    },
    methods: {
      goBack() {
        console.log('go back');
      },
      
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            // var formData = new FormData()
            // formData.append('hzphone', this.ruleForm2.account)
            // formData.append('hzpassword', this.ruleForm2.checkPass)

            var loginParams = { 
              wynumber: this.ruleForm2.account, 
              wypassword: this.ruleForm2.checkPass,
              wyname : this.ruleForm2.name };
            registerwuye(loginParams).then(res => {
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
              console.log(res.data.data);
              
              this.$router.push({ path: '/user' });
              
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