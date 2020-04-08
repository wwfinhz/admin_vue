<template>
    <div class="yibiaocss">
      <el-form :model="inputs" :rules="inputRules" ref="inputs">
        <el-form-item prop="chamber">
          <el-input clearable type="text" v-model="inputs.chamber" placeholder="请输入房号，如1-1-101" class="input"></el-input>
          <el-button icon="el-icon-search" @click="findbychamber()">搜索</el-button>
        </el-form-item>
        
      </el-form>
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
            :filters="[{ text: '1', value: '1' }, 
                       { text: '2', value: '2' },
                       { text: '3', value: '3' }, 
                       { text: '4', value: '4' },
                       { text: '5', value: '5' }, 
                       { text: '6', value: '6' },
                       { text: '7', value: '7' }, 
                       { text: '8', value: '8' },
                       { text: '9', value: '9' }]"
            :filter-method="filterFcbulid"
          >
          </el-table-column>
		      <el-table-column
            prop="fcunit"
            label="户主单元"
            width="100"
            :filters="[{ text: '1', value: 1 }, 
                       { text: '2', value: 2 },
                       { text: '3', value: 3 }, 
                       { text: '4', value: 4 }]"
            :filter-method="filterFcunit"
          >
          </el-table-column>
		   <el-table-column
            prop="fcchamber"
            label="户主房间"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="ybwater"
            label="水表"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="ybelectricity"
            label="电表"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="ybgas"
            label="燃气表"
            width="100"
          >
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
import { findallyibiao ,selectyibiao} from '../../api/api'
export default {
    data() {
        return {
            tableData:[],
            currentPage: 1,
            pagesize:5,
            inputs:{
              chamber:'',
            },
            inputRules:{
              chamber:[
                {validator:function(rule,value,callback){
                  if(value==''){
                    callback();
                  }
                  if(/^[1-9]-[1-3]-[1-9]0[1-4]$/.test(value) == false){
                    callback(new Error("请输入正确的房号格式，如“1-1-101”(其中单元号<=3，房间号<=4)"));
                  }else{
                    callback();
                  }
                }, trigger: 'blur'},
              ]
            }
        }
    },
    methods: {
      filterFcbulid(value, row) {
        return row.fcbulid === value;
      },
      filterFcunit(value, row) {
        return row.fcunit === value;
      },
      findbychamber:function(){
        var _this=this;
        this.$refs.inputs.validate((valid) => {
          if (valid) {
            if(this.inputs.chamber!=null&&this.inputs.chamber!=""){
              console.log(true);
              
              var chambers = this.inputs.chamber;
            
              var array=chambers.split('-');
            
              var loginParams = { fcbulid:array[0],fcunit:array[1],fcchamber:array[2]};
              
              selectyibiao(loginParams).then(res => {
                console.log("查询数据："+res.data.data);
                this.tableData = res.data.data;
              });
            }else{
              console.log(false);
              this.getyibiaos();
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        getyibiaos:function(){
            findallyibiao().then((res)=>{
              console.log("查询数据："+res.data.data);
                this.tableData = res.data.data;
                console.log(this.tableData);
                
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
        this.getyibiaos();
    },
    computed: {
      num: function () {
        return this.tableData.length
      },
    },
}
</script>

<style>
    .yibiaocss{
        margin-top: 5%;
        height: 100%;
    }
    .input{
      width: 200px;
    }
</style>