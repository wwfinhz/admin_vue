<template>
	<div class="fangchancss">
		<!-- <section> -->
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
            prop="fctime"
            label="户主迁入时间"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
                <el-tooltip content="修改户主信息" placement="bottom">
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                </el-tooltip>
                <el-tooltip content="删除户主信息" placement="bottom">
                    <el-button circle type="danger" icon="el-icon-delete" :loading="Loading" @click="delet(scope.row)"></el-button>
                </el-tooltip>
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
		<!-- </section> -->
	</div>
</template>

<script>
import { findallhuzhu ,delhuzhu} from '../../api/api'
	export default {
		data() {
			return {
				// hzname:'',
				// hzphone:'',
				// fcbulid:'',
				// fcunit:'',
				// fcchamber:'',
				currentPage: 1,
            	pagesize:5,
				tableData:[],
				Loading:false,
				hzid:'',
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
			delet(row){
				this.hzid = row.hzid;
				// console.log(row);
				this.$confirm('确认删除住户信息吗？', '提示', {}).then(()=>{
							this.Loading = true;
							var Params = {
								hzid : this.hzid,
							};
							console.log(Params);
							delhuzhu(Params).then((res)=>{
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
								this.getFangchan();
							});
						});
			},
			handleSizeChange : function (size) {
				// console.log('每页 ${val} 条');
				this.pagesize = size;
				console.log(size)
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