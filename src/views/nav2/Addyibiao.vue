<template>
  <div class="addyibiaocss">
      <el-table
        :data="tableData"
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
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="showadd(scope.row)">添加本月仪表数据</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--添加仪表界面-->
        <el-dialog title="添加仪表" :visible.sync="Visible">
          <el-form :model="yibiao" label-width="120px" :rules="Rules" ref="yibiao">
            <el-form-item label="水表" prop="ybwater">
              <el-input v-model="yibiao.ybwater" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电表" prop="ybelectricity">
              <el-input v-model="yibiao.ybelectricity" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="燃气表" prop="ybgas">
              <el-input v-model="yibiao.ybgas" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="Visible = false">取消</el-button>
            <el-button type="primary" :loading="Loading" @click="addyibiao">提交</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import { findallhuzhu ,addyibiao} from '../../api/api'
export default {
  data() {
    return {
      Visible:false,
      tableData:[],
      Loading:false,
      hzid:'',
      yibiao:{
        ybwater:'',
        ybelectricity:'',
        ybgas:''
      },
      Rules:{
        ybwater:[
          { required: true, message: '请输入水表数据', trigger: 'blur' }
        ],
        ybelectricity:[
          { required: true, message: '请输入水表数据', trigger: 'blur' }
        ],
        ybgas:[
          { required: true, message: '请输入水表数据', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    getusers(){
      findallhuzhu().then((res)=>{
        this.tableData = res.data.data;
      });
    },
    showadd(row){
      if(row.fcid!=0){
        this.Visible = true;
        this.hzid = row.hzid;
      }else{
        this.$message({
              type: 'error',
              message: "住户无在住房产！"
            });
      }
    },
    addyibiao(){
      this.$refs.yibiao.validate((valid)=>{
        if(valid){
          this.$confirm('确认提交吗？', '提示', {}).then(()=>{
            this.Loading = true;
							var Params = {
								hzid : this.hzid,
                ybwater : this.yibiao.ybwater,
                ybelectricity : this.yibiao.ybelectricity,
                ybgas : this.yibiao.ybgas,
							};
							console.log(Params);
							addyibiao(Params).then((res)=>{
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
								this.$refs.yibiao.resetFields();
								this.Visible = false;
							});
          });
        }
      });
    }
  },
  mounted() {
    this.getusers();
  },
}
</script>

<style>
  .addyibiaocss{
    margin-top: 5%;
  }
</style>