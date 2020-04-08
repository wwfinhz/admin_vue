<template>
    <div class="tousuxxcss">
        <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="tstitle"
            label="标题"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="tser"
            label="投诉人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="tscontent"
            label="投诉内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="tstime"
            label="日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="tsstatus"
            label="投诉状态"
            width="100">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="updatetousu(scope.row)" >处理</el-button>
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
    </div>
</template>

<script>
import { getallts,tsupdate } from '../../api/api'
export default {
data() {
            return {
              tableData: [],
              currentPage: 1,
              pagesize:5,
            }
        },

        methods: {
            gettousus(){
              getallts().then((res)=>{
                  this.tableData = res.data.data;
              });
            },
            updatetousu(row){
              var Params = {
                tsid:row.tsid,
                tsstatus:'已受理'
              }
              tsupdate(Params).then((res)=>{
                if(res.data.code){
									this.$message({
									message: res.data.msg,
									type: 'error'
								});
								}else{
									this.$message({
									message: '成功',
									type: 'success'
									});
                }
                this.gettousus();
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

        mounted: function () {
            this.gettousus();
        },
        computed: {
      num: function () {
        return this.tableData.length
      },
    },
}
</script>

<style>
    .tousuxxcss{
      margin-top: 5%;
    }
</style>