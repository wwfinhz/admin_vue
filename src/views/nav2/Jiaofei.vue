<template>
  <div class="jiaofeicss">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="jftime"
            label="月份"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="hzname"
            label="户主姓名"
            width="100">
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
            prop="jfwater"
            label="水费"
            width="100">
          </el-table-column>
          <el-table-column
            prop="jfelectricity"
            label="电费"
            width="100">
          </el-table-column>
          <el-table-column
            prop="jfgas"
            label="燃气费"
            width="100">
          </el-table-column>
          <el-table-column
            prop="jfstatus"
            label="缴费状态"
            width="100">
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
import { findalljf } from '../../api/api'
export default {
        data() {
            return {
              tableData: [],
              currentPage: 1,
              pagesize:5,
            }
        },

        methods: {
            getjiaofeis(){
              findalljf().then((res)=>{
                    this.tableData = res.data.data;
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
            this.getjiaofeis();
        },
        computed: {
      num: function () {
        return this.tableData.length
      },
    },
}
</script>

<style>
  .jiaofeicss{
    margin-top: 5%;
  }
</style>