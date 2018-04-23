<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="商品条码" prop="proid">
    <el-input v-model="ruleForm.proid"></el-input>
  </el-form-item>
  <el-form-item label="商品名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="商品价格" prop="price">
    <el-input v-model="ruleForm.price"></el-input>
  </el-form-item>
  <el-form-item label="商品数量" prop="num">
    <el-input v-model="ruleForm.num"></el-input>
  </el-form-item>
  <el-form-item label="单位" prop="unit">
    <el-input v-model="ruleForm.unit"></el-input>
  </el-form-item>
  <el-form-item label="尺寸" prop="size">
    <el-input v-model="ruleForm.size"></el-input>
  </el-form-item>  
    <el-form-item label="描述信息" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  import http from '../../utils/HttpClient'
  export default {
    data() {
      return {
        ruleForm: {
          proid:'',
          name: '',
          price: '',
          num: '',
          unit: '',
          size: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          
          proid: [
            { required: true, message: '请输入商品条码', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '请输入商品数量', trigger: 'blur' }
          ],
          unit: [
            { trigger: 'blur' }
          ],
          size:[
            {trigger:'blur'}
          ],
          desc: [
            {  trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
           
            //http.post('addgoods',{}).then((res)=>{
             //   console.log(res);
            //})
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
    }
  }
</script>