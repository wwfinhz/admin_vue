<template>
	<div class="tcwcss">
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
            width="100"
          >
          </el-table-column>
		  <el-table-column
            prop="fcbulid"
            label="户主楼号"
            width="100"
          >
          </el-table-column>
		  <el-table-column
            prop="fcunit"
            label="户主单元"
            width="100"
          >
          </el-table-column>
		  <el-table-column
            prop="fcchamber"
            label="户主房间"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="tcspace"
            label="户主停车位地点"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="show(scope.row)">添加</el-button>
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
		<!--添加停车位界面-->
		<el-dialog title="添加停车位" :visible.sync="Visible">
			<el-form :model="tingchewei" label-width="120px" :rules="Rules" ref="tingchewei">
				<el-form-item label="户主停车位地点" prop="tcspace">
					<el-input v-model="tingchewei.tcspace" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="Visible = false">取消</el-button>
				<el-button type="primary" :loading="Loading" @click="addtcw">提交</el-button>
			</div>
		</el-dialog>
		</section>
	</div>
	
</template>
<script>
	import { findalltcw ,addtingchewei} from '../../api/api'
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				currentPage: 1,
            	pagesize:5,
				tableData:[],
				Visible:false,
				Loading:false,
				tingchewei:{
					tcspace:'',
				},
				Rules:{
					tcspace:[
						{ required: true, message: '请输入户主停车位地点', trigger: 'blur' }
					],
				},
				hzid:'',
			}
		},
		methods: {
			gettcws:function(){
				findalltcw().then((res)=>{
					if (res.data.code) {
                		this.$message({
                 			message: res.data.msg,
                			type: 'error'
                		});
                		return
					  }
					  this.tableData = res.data.data;
				});
			},
			show(row){
				this.Visible = true;
				this.hzid = row.hzid;
				if(row.tcid!==0){
					this.$notify.info({
          				title: '提示',
						  message: '已有停车位信息无需重复添加'
					});
					this.Visible = false;
				}
			},
			addtcw(){
				this.$refs.tingchewei.validate((valid)=>{
					if(valid){
						this.$confirm('确认提交吗？', '提示', {}).then(()=>{
							this.Loading = true;
							var Params = {
								hzid : this.hzid,
								tcspace : this.tingchewei.tcspace,
							};
							console.log(Params);
							addtingchewei(Params).then((res)=>{
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
								this.$refs.tingchewei.resetFields();
								this.Visible = false;
								this.gettcws();
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
			this.gettcws();
		},
		computed: {
      num: function () {
        return this.tableData.length
      },
    },
	};

</script>

<style scoped>
	.tcwcss{
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