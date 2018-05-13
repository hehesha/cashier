<template>
    <div>
        <div class="le-search">
           <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="200px" class="demo-ruleForm">
              <el-form-item
                label="根据商品名或条形码搜索"
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
        <datagrid api="getgoods" config="goods.txt"></datagrid>
    </div>
</template>

<script type="text/javascript">
    import datagrid from '../datagrid/datagrid.vue'
    import router from '../../router'

    export default {
        components: {
            datagrid
        },
        data(){
            return {
                
                numberValidateForm: {
                                      searchgood: ''
                                    }              
                
            }
        }
    }
</script>