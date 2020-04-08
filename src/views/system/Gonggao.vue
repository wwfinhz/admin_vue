<template>
    <div class="ggcss">
      <el-button @click="add()">发布公告</el-button>
        <el-table
        :data="tableData"
        stripe
        style="width: 100%">
          <el-table-column type="index" width="60">
	        </el-table-column>
          <el-table-column
            prop="ggtitle"
            label="标题"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="ggtime"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="show(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--详情界面-->
		<el-dialog title="公告详情" :visible.sync="gonggaoVisible">
			<el-card class="box-card">
  				<h5>公告标题：{{ ggtitle }}</h5>
				  <h5>公告发布时间：{{ ggtime }}</h5>
				  <h5>公告内容：{{ ggcontent }}</h5>
			</el-card>
		</el-dialog>
    <!--发布界面-->
    <el-dialog title="发布公告" :visible.sync="addVisible">
			<el-card class="box-card">
        <el-form ref="gonggao" :model="gonggao" :rules="Rules" label-width="80px">
          <el-form-item label="公告标题" prop="ggtitle">
    			  <el-input v-model="gonggao.ggtitle" auto-complete="off"></el-input>
  			  </el-form-item>
  			  <el-form-item label="发布时间" prop="ggtime">
            <el-date-picker
              v-model="gonggao.ggtime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
    			  <!-- <el-input v-model="gonggao.ggtime" auto-complete="off"></el-input> -->
  			  </el-form-item>
  			  <el-form-item label="公告内容" prop="ggcontent">
    		  	<el-input type="textarea" v-model="gonggao.ggcontent" auto-complete="off"></el-input>
  			  </el-form-item>
  			  <el-form-item style="text-align:center">
				    <el-button type="primary" :loading="logining" @click="addGonggao">提交</el-button>
    		    <el-button @click="addVisible = false">取消</el-button>
  			  </el-form-item>
		    </el-form>
			</el-card>
		</el-dialog>
    </div>
</template>

<script>
import { findallgg,addgonggao } from '../../api/api'
    export default {
        data() {
            return {
                tableData: [],
                gonggaoVisible:false,
                addVisible:false,
                logining:false,
                ggtime:'',
                ggtitle:'',
                ggcontent:'',
                gonggao:{
                  ggtime:'',
                  ggtitle:'',
                  ggcontent:'',
                },
                Rules:{
                  ggtime:[
                    {required: true, message: '请输入发布时间', trigger: 'blur'}
                  ],
                  ggtitle:[
                    {required: true, message: '请输入公告标题', trigger: 'blur'}
                  ],
                  ggcontent:[
                    {required: true, message: '请输入公告内容', trigger: 'blur'}
                  ],
                }
            }
        },

        methods: {
            getgonggaos(){
              // var Params = { index : 1 };
              findallgg().then((res)=>{
                
                this.tableData = res.data.data;
              });
            },
            show(row){
                this.gonggaoVisible = true;
                this.ggtitle = row.ggtitle;
                this.ggtime = row.ggtime;
                this.ggcontent = row.ggcontent;
            },
            add(){
              this.addVisible = true;
            },
            addGonggao(){
              this.$refs.gonggao.validate((valid)=>{
                    if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.logining = true;
                    
                    var Params = { 
                      ggtitle : this.gonggao.ggtitle ,
                      ggcontent : this.gonggao.ggcontent,
                      ggtime : this.gonggao.ggtime,};
                    
                     console.log(Params);
                    addgonggao(Params).then((res)=>{
                      this.logining = false;
                      this.$message({
                        message: '提交成功',
                        type: 'success'
                      });
                      console.log(res.data.data);
                      this.addVisible = false;
                      this.getgonggaos();
                    });
                  });
                }
              });
            }
        },

        mounted: function () {
            this.getgonggaos();
        },
        
    }
</script>

<style scoped>
    .ggcss{
        margin-top: 5%;
        
    }
</style>
