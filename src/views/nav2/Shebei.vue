<template>
    <div class="shebeicss">
      <el-button @click="showadd()">添加</el-button>
        <el-table
        :data="tableData"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="sbname"
            label="设备名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="sbcount"
            label="数量"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="show(scope.row)" >详情</el-button>
              <el-button size="small" @click="addcount(scope.row)" >添加数量</el-button>
              <el-button size="small" @click="showbrrow(scope.row)">出借</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--显示详情界面-->
        <el-dialog title="详情" :visible.sync="Visible">
          <el-table
            :data="Data"
            stripe
            style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          
          <el-table-column
            prop="hzname"
            label="借者姓名"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="sbcount"
            label="设备数量"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="sbstatus"
            label="设备状态"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="borrowtime"
            label="出借时间"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="del(scope.row)">已归还</el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-dialog>
        <!--添加设备界面-->
        <el-dialog title="设备界面" :visible.sync="sbVisible">
          <el-form :model="shebei" label-width="80px" :rules="Rules" ref="shebei">
            <el-form-item label="设备名称" prop="sbname">
              <el-input v-model="shebei.sbname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="设备数量" prop="sbcount">
              <el-input v-model="shebei.sbcount" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="sbVisible = false">取消</el-button>
            <el-button type="primary" :loading="Loading" @click="addsb">添加</el-button>
          </div>
        </el-dialog>
        <!--添加设备数量界面-->
        <el-dialog title="设备数量界面" :visible.sync="sbcountVisible">
          <el-form :model="shebeicount" label-width="80px" :rules="countRules" ref="shebeicount">
            
            <el-form-item label="添加数量" prop="sbcount">
              <el-input v-model="shebeicount.sbcount" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="sbcountVisible = false">取消</el-button>
            <el-button type="primary" :loading="countLoading" @click="count" >添加</el-button>
          </div>
        </el-dialog>
        <!--出借界面-->
        <el-dialog title="出借界面" :visible.sync="brrowVisible">
          <el-form :model="brrow" label-width="80px" :rules="brrowRules" ref="brrow">
            <el-form-item label="借者姓名" prop="hzname">
              <el-input v-model="brrow.hzname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="借者手机号" prop="hzphone">
              <el-input v-model="brrow.hzphone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="出借数量" prop="sbcount">
              <el-input v-model="brrow.sbcount" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="brrowVisible = false">取消</el-button>
            <el-button type="primary" :loading="brrowLoading" @click="addbrrow">添加</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { addshebei ,findallsb ,addshebeicount ,addbrrow ,findsbhzbysbid ,del, loginwuye} from '../../api/api'
export default {
data() {
  var countcheck = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请输入出借数量'));
				} else if (value > this.sbcount) {
				callback(new Error('库存不足，剩余'+this.sbcount));
				} else {
				callback();
				}
			};
            return {
              Visible:false,
              tableData: [],
              Data:[],
              sbVisible:false,
              Loading:false,
              sbid:'',
              sbcount:'',
              borrowtime:'',
              shebei:{
                sbname:'',
                sbcount:'',
              },
              Rules:{
                sbname:[
                  { required: true, message: '请输入设备名称', trigger: 'blur' }
                ],
                sbcount:[
                  { required: true, message: '请输入设备数量', trigger: 'blur' }
                ],
              },
              shebeicount:{
                sbcount:'',
              },
              countRules:{
                sbcount:[
                  { required: true, message: '请输入设备数量', trigger: 'blur' }
                ]
              },
              countLoading:false,
              sbcountVisible:false,
              brrow:{
                hzname:'',
                hzphone:'',
                sbcount:'',
              },
              brrowRules:{
                hzname:[
                  { required: true, message: '请输入借者姓名', trigger: 'blur' }
                ],
                hzphone:[
                  { required: true, message: '请输入借者手机号', trigger: 'blur' }
                ],
                sbcount:[
                  { validator: countcheck, trigger: 'blur' }
                ]
              },
              brrowLoading:false,
              brrowVisible:false,
            }
        },

        methods: {
            show(row){
              this.Visible = true;
              var Params = {
                    sbid : row.sbid,
                  };
              this.sbid = row.sbid,
              findsbhzbysbid(Params).then((res)=>{
              if (res.data.code) {
                        this.$message({
                          message: res.data.msg,
                          type: 'error'
                        });
                        return
                }
                console.log(res.data.data);
                
                this.Data = res.data.data;
            });
            },
            addcount(row){
              this.sbid = row.sbid;
              this.sbcountVisible = true;
            },
            showadd(){
              this.sbVisible = true;
            },
            getsbs:function(){
              findallsb().then((res)=>{
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
            addsb(){
              this.$refs.shebei.validate((valid)=>{
              if(valid){
                this.$confirm('确认提交吗？', '提示', {}).then(()=>{
                  this.Loading = true;
                  var Params = {
                    sbcount : this.shebei.sbcount,
                    sbname : this.shebei.sbname,
                  };
                  console.log(Params);
                  addshebei(Params).then((res)=>{
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
                    this.$refs.shebei.resetFields();
                    this.sbVisible = false;
                    this.getsbs();
                  });
                });
              }
              
            });
            },
            count(){
              this.$refs.shebeicount.validate((valid)=>{
              if(valid){
                this.$confirm('确认提交吗？', '提示', {}).then(()=>{
                  this.countLoading = true;
                  var Params = {
                    sbcount : this.shebeicount.sbcount,
                    sbid : this.sbid,
                  };
                  console.log(Params);
                  addshebeicount(Params).then((res)=>{
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
                    this.countLoading = false;
                    this.$refs.shebeicount.resetFields();
                    this.sbcountVisible = false;
                    this.getsbs();
                  });
                });
              }
              
            });
            },
            showbrrow(row){
              this.brrowVisible = true;
              this.sbid = row.sbid;
              this.sbcount = row.sbcount;
            },
            addbrrow(){
              this.$refs.brrow.validate((valid)=>{
              if(valid){
                this.$confirm('确认提交吗？', '提示', {}).then(()=>{
                  this.countLoading = true;
                  var Params = {
                    sbcount : this.brrow.sbcount,
                    sbid : this.sbid,
                    hzphone : this.brrow.hzphone,
                  };
                  console.log(Params);
                  addbrrow(Params).then((res)=>{
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
                    this.brrowLoading = false;
                    this.$refs.brrow.resetFields();
                    this.brrowVisible = false;
                    this.getsbs();
                  });
                });
              }
              
            });
            },
            del(row){
                this.$confirm('确认吗？', '提示', {}).then(()=>{
                  var Params = {
                    sbhzid : row.sbhzid,
                    sbcount : row.sbcount,
                    sbid : this.sbid,
                  };
                  del(Params).then((res)=>{
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
                    this.Visible = false;
                    this.getsbs();
                  });
                });
              
            },
        },

        mounted: function () {
            this.getsbs();
        },
}
</script>

<style>
    .shebeicss{
        margin-top: 5%;
    }
</style>