<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username" >
    <el-input v-model="ruleForm.username" autofocus=true disabled></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="nickname">
    <el-input v-model="ruleForm.nickname"></el-input>
    </el-form-item>
  <el-form-item label="性别" prop="gender">
    <el-select v-model="ruleForm.gender">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="电话" prop="phone">
    <el-input v-model="ruleForm.phone"></el-input>
  </el-form-item>
    <el-form-item label="权限等级" prop="rank">
    <el-input v-model="ruleForm.rank" disabled></el-input>
  </el-form-item>
    <el-form-item label="角色" prop="role">
    <el-input v-model="ruleForm.role" disabled></el-input>
  </el-form-item>
      <el-form-item label="密码" prop="password">
    <el-input v-model="ruleForm.password"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
  
  </el-form-item>
</el-form>
</template>

<script type="text/javascript">
import './update.scss'
import http from '../../utils/HttpService'
// import $ from 'jquery'

export default {
    beforeMount(){
            this.username = sessionStorage.getItem("user");
              var nickname = sessionStorage.getItem("Nickname");
              this.user=nickname? nickname : this.username;
              this.apiRequest();
         
          },
          data(){
            return {
                user:'',
                username:'',
                ruleForm: {
                  username:'',
                  nickname: '',
                  phone: '',
                  gender:'男',
                  rank:'',
                  role:'',
                  password:'*******'
                },
                password:''
            }
          },
          methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                      this.ruleForm.password = this.password;
                      http.post('updatecashier',this.ruleForm).then(res=>{
                        console.log(res);
                        if(res.ok){
                          alert('修改成功！');
                          this.apiRequest();
                          this.ruleForm.password='*********'
                        }
                      })
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
              },
              apiRequest(){
                 http.get('getempdetails',{name:this.username}).then(res=>{
                  console.log(res.body[0]);
                  var resdata=res.body[0];
                  this.ruleForm.username=resdata.username;
                  this.ruleForm.nickname=resdata.nickname;
                  this.ruleForm.phone=resdata.phone;
                  this.ruleForm.gender=resdata.gender;
                  this.ruleForm.rank=resdata.rank;
                  this.ruleForm.role=resdata.role;
                  this.password = resdata.password;
                
                })
              }

          }
}
</script>
