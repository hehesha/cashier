<template>
    <div>   
        <div class="le-search" v-if="searchConfig">
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
                <el-button type="primary" @click="submitSearch('numberValidateForm')">提交</el-button>
                <el-button @click="resetForm('numberValidateForm')">重置</el-button>
              </el-form-item>
            </el-form>
        </div> 

        <div class="datagrid-content">
            <table class="ls-table" v-if="datasource" v-loading="loading">
                <thead>
                    <tr>
                        <th v-for="(key,value) in datasource[0][0]" v-if="(!columns[0] || columns.indexOf(value) > -1) && filterColumns.indexOf(value) < 0">{{value}}</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in datasource[0]" >
                    <td v-for="(value, key) in item" v-if="(!columns[0] || columns.indexOf(key) > -1) && filterColumns.indexOf(key) < 0">{{filterData(key, value)}}</td>
                    <td>
                        <i class="el-icon-edit" style="color:#409EFF" @click="edit(item.productNo)"></i>
                        <i class="el-icon-delete" style="color:#F56C6C" @click="deleteg(item.productNo)"></i>
                    </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div class="block ls-pagination" @click="pagination($event)">
            <el-pagination
              :current-page.sync="currentPage"
              :page-size=pageSize
              layout="prev, pager, next, jumper"
              :total=totalPage>
            </el-pagination>
       </div>
     
       <el-dialog title="商品详情" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="商品条码" :label-width="formLabelWidth">
              <el-input v-model="form.productNo" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="商品名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="进货价格" :label-width="formLabelWidth">
              <el-input v-model="form.price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注信息" :label-width="formLabelWidth">
              <el-input v-model="form.remarks" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="单位" :label-width="formLabelWidth">
              <el-input v-model="form.unit" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" :label-width="formLabelWidth">
              <el-input v-model="form.num" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="尺寸" :label-width="formLabelWidth">
              <el-input v-model="form.size" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="售价" :label-width="formLabelWidth">
              <el-input v-model="form.sellprice" auto-complete="off"></el-input>
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
    import './datagrid.scss'
    import http from '../../utils/HttpService'
    import Utils from '../../utils/utils'
    //import $ from 'jquery'

    export default {
        name: 'datagrid',
        props: ['api', 'config', 'toolbar'],
        components: {
            
        },
        data(){
            return {
                datasource: null,
                configRes:{},
                columns:[],
                filterColumns:null,
                privateDic:{},
                multiple:false,
                searchConfig:false,
                searchapi:null,
                filterDataConfig:{},
                searchParams:{},
                totalPage:60,
                pageSize:5,
                gapi:this.api,
                paginationConfig:null,
                currentPage:1,
                loading:false,
                form: {
                      name: '',
                      price: '',
                      productNo: '',
                      remarks: '',
                      unit:'',
                      num:'',
                      size: '',
                      sellprice: ''
                    },
                dialogFormVisible: false,
                rank:1,
                numberValidateForm: {
                                      searchgood: ''
                                    }
            }
        },
        methods: {

            filterData(_key, _val){
                let _config = this.filterDataConfig[_key];
                console.log('_config')
                if(!_config){
                    return _val;
                } else if(_config.type == "DateFormat"){
                    return Utils.dateFormat(new Date(_val), _config.format); 
                } else if(_config.type == "Replace"){
                    let reg = new RegExp(_config.reg);
                    return _val.replace(reg, _config.replaceVal);
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
              },
              apiRequest(_page = 1){
                let pageParams = {};
                console.log(this.paginationConfig,111);
                if(this.paginationConfig){
                    
                    this.searchParams['pageitems'] = this.paginationConfig['pageitems'];
                    this.searchParams['page'] = _page;
                }       
                this.loading=true;
                //配置信息中的 api
                http.get(this.gapi, this.searchParams).then((apiRes) => {
                    console.log(apiRes);
                    this.datasource=apiRes.body;
                    console.log(apiRes.body[1][0]['rowscount']);
                    this.totalPage=apiRes.body[1][0]['rowscount'];
                    console.log(this.totalPage);
                    this.loading=false;
                    /*
                    this.dataset = apiRes[0];
                    let rowsCount = apiRes[1][0]['rowscount'];
                    let pageItems = this.paginationConfig['pageitems'];
                    console.log(apiRes[1][0]['rowscount']);
                    console.log(pageItems,rowsCount);
                    this.pageCount = Math.ceil(rowsCount / pageItems);
                    */
                })
            },
            pagination(e){
                var self=this;
                window.setTimeout(function(){
                    console.log(self.currentPage);
                    self.apiRequest(self.currentPage);
                },30);
            },
            edit(_index){
                console.log(_index);
                if(this.rank>1){

                    http.get('getdetails',{proid:_index}).then((res)=>{
                        console.log(res.body[0]);
                        var fres=res.body[0];
                        this.form.name=fres.name;
                        this.form.price=fres.price;
                        this.form.productNo=fres.productNo;
                        this.form.remarks=fres.remerks;
                        this.form.unit=fres.unit;
                        this.form.num=fres.num;
                        this.form.size=fres.size;
                        this.form.sellprice=fres.sellprice;
                    })
                    this.dialogFormVisible = true;
                }else{
                    alert('您没有操作权限！')
                }

            },
            deleteg(_index){
                console.log(_index);
                if(this.rank>2){
                http.post('deletegoods',{proNo:_index}).then(res=>{
                    console.log(res);
                    this.apiRequest();
                })
                }else{
                    alert('您没有操作权限！')
                }
            },
            //保留更改信息
            savechange(){
                console.log(this.form);
                http.post('updategoods',this.form).then(res=>{
                    console.log(res);
                    if(res.ok){
                        alert('success');
                        this.dialogFormVisible = false;
                        //重新请求数据
                        this.apiRequest();
                    }
                })
            },
            submitSearch(formName){
                console.log(this.numberValidateForm.searchgood);
                this.searchParams.data=this.numberValidateForm.searchgood;
                this.gapi = this.searchapi;
                this.apiRequest();
            }

            
            
        },
        beforeMount(){
            if(this.config){
                http.get(this.config).then((res)=>{
                    this.configRes=JSON.parse(res.text);
                    console.log(this.configRes,666);

                    let cols = this.configRes['cols'];
                    this.columns = !cols || cols == '*' ? [] : cols.split(',');

                    let filterCols = this.configRes['filterCols'];
                    this.filterColumns = !filterCols ? [] : filterCols.split(',');

                    this.filterDataConfig = this.configRes['filterData'] || {};

                    this.searchConfig = this.configRes['search']['show'] || false;

                    this.searchapi = this.configRes['searchapi'] || null;

                    this.paginationConfig=this.configRes['pagination'] || null;
                    this.pageSize = this.paginationConfig['pageitems'];
                    this.apiRequest();
                });
            }
            this.rank=sessionStorage.getItem("rank") || 1;
            
        }
    }
</script>