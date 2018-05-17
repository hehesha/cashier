<template>
    <div>
        <div class="le-search">
           <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="200px" class="demo-ruleForm">
              <el-form-item
                label="根据用户名或姓名查询"
                prop="searchgood"
                :rules="[
                  { required: true, message: '不能为空'}
                ]"
              >
                <el-input  v-model.number="numberValidateForm.searchgood" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                <el-button @click="resetForm('numberValidateForm')">重置</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="e-content">
            <template>
              <el-table
                :data="dataset"
                height="350"
                border
                style="width: 100%">
                <el-table-column
                  prop="cid"
                  label="编号"
                  width="30">
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="用户名"
                 >
                </el-table-column>
                <el-table-column
                  prop="nickname"
                  label="姓名"
                  >
                </el-table-column>
                <el-table-column
                  prop="gender"
                  label="姓别"
                  >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="电话"
                   >
                </el-table-column>
                <el-table-column
                  prop="rank"
                  label="等级"
                  >
                </el-table-column>
                <el-table-column
                  prop="role"
                  label="角色"
                  >
                </el-table-column>
               <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
        </div>

        <el-dialog title="商品详情" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="编号" :label-width="formLabelWidth">
              <el-input v-model="form.cid" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.nickname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-input v-model="form.gender" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="等级" :label-width="formLabelWidth">
              <el-input v-model="form.rank" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-input v-model="form.role" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="savechange">保 存</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import router from '../../router'
    import http from '../../utils/HttpService'
    import './employee.scss'

    export default {

        data(){
            return {
                
                numberValidateForm: {
                                      searchgood: ''
                                    },
                dataset:[],
                user:'',
                rank:1,
                form: {
                      cid: '',
                      username: '',
                      nickname: '',
                      gender: '',
                      phone:'',
                      rank:'',
                      role: ''                  
                    },
                dialogFormVisible: false
                
            }
        },
        beforeMount(){
            http.get('getemployee').then(res=>{
                console.log(res.body)
                this.dataset=res.body;
            })
            this.rank=sessionStorage.getItem('rank') ?sessionStorage.getItem("rank"):'1';
            console.log(this.rank,11111);
        },
         methods: {
          handleClick(row) {
            console.log(row);
            // 查看当前用户是否有权限
              // 1代表最低权限，不可编辑
                // 2可以编辑，不能更改其他权限
                  // 3最高权限，可更改其他用户权限
                  if(this.rank<3){
                    alert('您没有操作权限')
                  }else{
                      this.dialogFormVisible=true;
                  }
          },
          submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    alert('submit!');
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
              },
              resetForm(formName) {
                this.$refs[formName].resetFields();
              }
        },
        //保留更改信息
            savechange(){
                console.log(this.form);
               
            }
    }
</script>