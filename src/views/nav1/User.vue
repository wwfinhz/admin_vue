<template>
<div class="updatehz">
	<section>
		<el-form ref="form" :model="form" label-width="80px">
  			<el-form-item label="姓名">
    			<el-input v-model="form.name" :readonly="readonly"></el-input>
  			</el-form-item>
  			<el-form-item label="工号">
    			<el-input v-model="form.number" :readonly="readonly"></el-input>
  			</el-form-item>
  			<el-form-item>
    			<el-button type="primary" @click="handlepwdEdit()">更改密码</el-button>
    			<el-button>取消</el-button>
  			</el-form-item>
		</el-form>
		
		<!--修改密码界面-->
		<el-dialog title="修改密码" :visible.sync="editpwdFormVisible">
			<el-form :model="editpwdForm" label-width="80px" :rules="editpwdFormRules" ref="editpwdForm">
				<el-form-item label="原密码" prop="password">
					<el-input v-model="editpwdForm.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newpassword">
					<el-input type="password" v-model="editpwdForm.newpassword" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="confirmpassword">
					<el-input type="password" v-model="editpwdForm.confirmpassword" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editpwdFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editpwdSubmit" :loading="editpwdLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
	</div>
</template>

<script>
	import { updatewuye,findbywyid } from '../../api/api'
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if(value !== this.password){
					callback(new Error('原密码不正确'));
				} else {
					if (this.editpwdForm.password !== '') {
						this.$refs.editpwdForm.validateField('checkPassagain');
					}
					callback();
				}
			};
			var validatePass1 = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请输入新密码'));
				} else {
				if (this.editpwdForm.newpassword !== '') {
					this.$refs.editpwdForm.validateField('checkPassagain');
				}
				callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请再次输入密码'));
				} else if (value !== this.editpwdForm.newpassword) {
				callback(new Error('两次输入密码不一致!'));
				} else {
				callback();
				}
			};
			return {
				
        		form: {
          		name: '',
				number:'',
				},
				password:'',
				readonly: true,
				
				editpwdFormVisible: false,//修改密码界面是否显示
				
				editpwdLoading: false,
				
				editpwdFormRules: {
					password:[
						{validator: validatePass, trigger: 'blur'}
					],
					newpassword:[
						{validator: validatePass1, trigger: 'blur'}
					],
					confirmpassword:[
						{validator: validatePass2, trigger: 'blur'}
					],
				},
				//修改密码界面数据
				editpwdForm:{
					password:'',
					newpassword:'',
					confirmpassword:'',
				},
      		}
		},
		methods: {
			getWuye(){
				let user = JSON.parse(sessionStorage.getItem('user'));
				// findhuzhu(user.hzid).then((res) => {
				// 	console.log(res);
					
				// 	this.total = res.data.total;
				// 	this.users = res.data.users;
				// 	this.listLoading = false;
				// 	//NProgress.done();
				// });
				console.log("前-自动获取user:"+user.wynumber);
				var Params = { wyid : user.wyid };
				findbywyid(Params).then((res)=>{
					if (res.data.code) {
                		this.$message({
                 			message: res.data.msg,
                			type: 'error'
                		});
                		return
					  }
					  sessionStorage.setItem('user', JSON.stringify(res.data.data));
					  let user = JSON.parse(sessionStorage.getItem('user'));
					  console.log("后-自动获取user:"+user.wynumber);
					  this.form.name = user.wyname || '点击更改信息更新';
					  this.form.number = user.wynumber || '点击更改信息更新';
				});
				
			},
			onSubmit() {
        	console.log('submit!');
			},
			//显示修改密码界面
			handlepwdEdit: function (){
				this.editpwdFormVisible = true;
				let user = JSON.parse(sessionStorage.getItem('user'));
				this.password = user.wypassword;
			},
			//修改
			editpwdSubmit: function (){
				let user = JSON.parse(sessionStorage.getItem('user'));
				this.$refs.editpwdForm.validate((valid) =>{
					if (valid) {
				 		this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editpwdLoading = true;
							var Params = { 
								wyid: user.wyid, 
								wypassword: this.editpwdForm.newpassword 
							};
							console.log(Params);
							
							updatewuye(Params).then((res)=>{
								this.editpwdLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.editpwdFormVisible = false;
								this.getWuye();
							});

						 });
					}
				});
			},
			
		},
		mounted() {
			this.getWuye();
		},
		
	
}
</script>

<style scoped>
	.updatehz{
		margin-top: 5%;
		margin-right: 30%;
		margin-left: 10%;
	}
</style>