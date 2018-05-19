<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="user" >
    <el-input v-model="ruleForm.user" autofocus=true id="pid"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="psd">
    <el-input v-model="ruleForm.psd"></el-input>
  </el-form-item>
  <el-form-item label="姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
    <el-form-item label="性别" prop="gender">
    <el-input v-model="ruleForm.gender"></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="phone">
    <el-input v-model="ruleForm.phone"></el-input>
  </el-form-item>
  <el-form-item label="等级" prop="rank">
    <el-input v-model="ruleForm.rank"></el-input>
  </el-form-item>
  <el-form-item label="角色" prop="role">
    <el-input v-model="ruleForm.role"></el-input>
  </el-form-item>   
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  import http from '../../utils/httpService'
  export default {
    data() {
      return {
        ruleForm: {
          user:'',
          psd: '',
          name: '',
          phone: '',
          role:'',
          rank: '',
          size: '',
          gender:''
        },
        rules: {
          psd: [
            { required: true, message: '请输入初始密码', trigger: 'blur' }
          ],
          
          user: [
            { required: true, message: '请输入用户名', trigger: 'blur' ,autofocus:true}
          ],
          name: [
            {  trigger: 'blur' }
          ],
          gender: [
            {  trigger: 'blur' }
          ],
          phone: [
            {trigger: 'blur' }
          ],
          rank: [
            { trigger: 'blur' }
          ],
          role: [
            {  trigger: 'blur' }
          ],
        }
      };
    },
    mounted(){
      var pid=document.getElementById('pid');
      console.log(pid);
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            http.post('addgoods',{proid:this.ruleForm.proid,num:this.ruleForm.num,name:this.ruleForm.name,price:this.ruleForm.price,unit:this.ruleForm.unit,size:this.ruleForm.size,desc:this.ruleForm.desc,prov:this.ruleForm.provide,sell:this.ruleForm.sellprice}).then((res)=>{
                console.log(res);
                if(res.ok){
                  alert('success!');
                  this.resetForm('ruleForm');
                  pid.focus();
                }
            })
            
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>