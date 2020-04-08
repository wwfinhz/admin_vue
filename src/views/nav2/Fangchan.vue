<template>
	<div class="fangchancss">
		<section>
			<el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="hzname"
            label="户主姓名"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="hzphone"
            label="户主手机号"
            width="180">
          </el-table-column>
		  <el-table-column
            prop="fcbulid"
            label="户主楼号"
            width="100">
          </el-table-column>
		  <el-table-column
            prop="fcunit"
            label="户主单元号"
            width="100">
          </el-table-column>
		  <el-table-column
            prop="fcchamber"
            label="户主房间号"
            width="100">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="show(scope.row)">添加</el-button>
			  <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
		<div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="num">
          </el-pagination>
        </div>
		<!--添加房产界面-->
		<el-dialog title="添加房产" :visible.sync="Visible">
			<el-form :model="fangchan" label-width="80px" :rules="Rules" ref="fangchan">
				<el-form-item label="楼号" prop="fcbulid">
					<el-input v-model="fangchan.fcbulid" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="单元号" prop="fcunit">
					<el-input v-model="fangchan.fcunit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="房间号" prop="fcchamber">
					<el-input v-model="fangchan.fcchamber" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="Visible = false">取消</el-button>
				<el-button type="primary" :loading="Loading" @click="adduserfc">提交</el-button>
			</div>
		</el-dialog>
		</section>
	</div>
</template>

<script>
import { findallhuzhu ,addfangchan, delfc} from '../../api/api'
	export default {
		data() {
			return {
				currentPage: 1,
            	pagesize:5,
				// hzname:'',
				// hzphone:'',
				// fcbulid:'',
				// fcunit:'',
				// fcchamber:'',
				tableData:[],
				Visible:false,
				Loading:false,
				fangchan:{
					fcbulid:'',
					fcunit:'',
					fcchamber:'',
				},
				Rules:{
					fcbulid:[
						{ required: true, message: '请输入户主楼号', trigger: 'blur' }
					],
					fcunit:[
						{ required: true, message: '请输入户主单元号', trigger: 'blur' }
					],
					fcchamber:[
						{ required: true, message: '请输入户主房间号', trigger: 'blur' }
					],
				},
				hzid:'',
				fcid:'',
			}
		},
		methods: {
			// onSubmit() {
			// 	console.log('submit!');
			// }
			getFangchan: function(){
				
				findallhuzhu().then((res)=>{
					if (res.data.code) {
                		this.$message({
                 			message: res.data.msg,
                			type: 'error'
                		});
                		return
					  }
					  this.tableData = res.data.data;
					  console.log(res.data.data);
					  
				});
			},
			show(row){
				this.Visible = true;
				this.hzid = row.hzid;
				// console.log(row);
				if(row.fcid!==0){
					this.$notify.info({
          				title: '提示',
						  message: '已有房产信息无需重复添加'
					});
					this.Visible = false;
				}
			},
			del(row){
				if(row.fcid==0){
					this.$notify.info({
          				title: '提示',
						  message: '无房产信息可供删除'
					});
					this.Visible = false;
				}else{
					this.fcid = row.fcid;
					// console.log(row);
					this.$confirm('确认删除住户房产信息吗？', '提示', {}).then(()=>{
							var Params = {
								fcid : row.fcid,
							};
							console.log(Params);
							delfc(Params).then((res)=>{
								if(res.data.code){
									this.$message({
									message: res.data.msg,
									type: 'error'
								});
								}else{
									this.$message({
									message: '提交成功',
									type: 'success'
									});
								}
								this.getFangchan();
							});
						});
				}
			},
			adduserfc(){
				this.$refs.fangchan.validate((valid)=>{
					if(valid){
						this.$confirm('确认提交吗？', '提示', {}).then(()=>{
							this.Loading = true;
							var Params = {
								hzid : this.hzid,
								fcbulid : this.fangchan.fcbulid,
								fcunit : this.fangchan.fcunit,
								fcchamber : this.fangchan.fcchamber,
							};
							console.log(Params);
							addfangchan(Params).then((res)=>{
								if(res.data.code){
									this.$message({
									message: res.data.msg,
									type: 'error'
								});
								}else{
									this.$message({
									message: '提交成功',
									type: 'success'
									});
								}
								this.Loading = false;
								this.$refs.fangchan.resetFields();
								this.Visible = false;
								this.getFangchan();
							});
						});
					}
					
				});
			},
		handleSizeChange : function (size) {
          // console.log('每页 ${val} 条');
          this.pagesize = size;
          console.log(this.pagesize) //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage) {
          // console.log('当前页: ${val}');
          this.currentPage = currentPage;
          console.log(this.currentPage)  //点击第几页
        },
		},
		mounted() {
			this.getFangchan();
		},
		computed: {
      num: function () {
        return this.tableData.length
      },
    },
	}

</script>
<style scoped>
	.fangchancss{
        margin-top: 5%;
	}
	.text {
    	font-size: 14px;
  	}

  	.item {
    	padding: 18px 0;
  	}

  	.box-card {
    	width: 100%;
  	}
</style>