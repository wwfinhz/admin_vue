<template>
  <div class="baoxiucss">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="bxtime"
            label="报修时间"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="bxcontent"
            label="报修内容"
            width="100">
          </el-table-column>
          <el-table-column
            prop="hzname"
            label="报修人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="fcbulid"
            label="楼号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="fcunit"
            label="单元"
            width="60">
          </el-table-column>
          <el-table-column
            prop="fcchamber"
            label="房间"
            width="60">
          </el-table-column>
          <el-table-column
            prop="bxcler"
            label="维修人"
            width="80">
          </el-table-column>
          <el-table-column
            prop="bxclphone"
            label="维修人电话"
            width="110">
          </el-table-column>
          <el-table-column
            prop="bxstatus"
            label="报修状态"
            width="100">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="showadd(scope.row)">处理</el-button>
              <el-button size="small" @click="showupdate(scope.row)">完成</el-button>
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
        <!--添加处理界面-->
        <el-dialog title="添加处理信息" :visible.sync="addVisible">
          <el-form :model="cl" label-width="80px" :rules="Rules" ref="cl">
            <el-form-item label="处理人" prop="bxcler">
              <el-input v-model="cl.bxcler" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="bxclphone">
              <el-input v-model="cl.bxclphone" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addVisible = false">取消</el-button>
            <el-button type="primary" :loading="addLoading" @click="addcl">提交</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import { findallbx ,bxupdate} from '../../api/api'
export default {
  data() {
            return {
              currentPage: 1,
              pagesize:5,
              tableData: [],
              addVisible:false,
              updateView:false,
              addLoading:false,
              bxid:'',
              cl:{
                bxcler:'',
                bxclphone:'',
              },
              Rules:{
                bxcler:[
                  { required: true, message: '请输入处理人姓名', trigger: 'blur' }
                ],
                bxclphone:[
                  { required: true, message: '请输入处理人电话', trigger: 'blur' }
                ],
              },
            }
        },

        methods: {
            getbaoxius(){
              findallbx().then((res)=>{
                  this.tableData = res.data.data;
              });
            },
            showadd(row){
              this.addVisible = true;
              this.bxid = row.bxid;
            },
            showupdate(row){
              var Params = {
                bxid:row.bxid,
                bxstatus:'完成'
              }
              bxupdate(Params).then((res)=>{
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
                this.getbaoxius();
              });
            },
            addcl(){
              this.$refs.cl.validate((valid)=>{
                if(valid){
                  this.$confirm('确认提交吗？', '提示', {}).then(()=>{
                  this.Loading = true;
                  var Params = {
                    bxid:this.bxid,
                    bxcler:this.cl.bxcler,
                    bxclphone:this.cl.bxclphone,
                  };
                  console.log(Params);
                  bxupdate(Params).then((res)=>{
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
                    this.addLoading = false;
                    this.$refs.cl.resetFields();
                    this.addVisible = false;
                    this.getbaoxius();
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

        mounted: function () {
            this.getbaoxius();
        },
        computed: {
      num: function () {
        return this.tableData.length
      },
    },
}
</script>

<style>
  .baoxiucss{
    margin-top: 5%;
  }
</style>