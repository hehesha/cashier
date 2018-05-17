<template>
    <div>       
        <div class="datagrid-content">
            <table class="ls-table" v-if="datasource" v-loading="loading">
                <thead>
                    <tr>
                        <th v-for="(key,value) in datasource[0][0]" v-if="(!columns[0] || columns.indexOf(value) > -1) && filterColumns.indexOf(value) < 0">{{value}}</th>
                        <th>编辑</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in datasource[0]">
                    <td v-for="(value, key) in item" v-if="(!columns[0] || columns.indexOf(key) > -1) && filterColumns.indexOf(key) < 0">{{filterData(key, value)}}</td>
                    <td>
                        <i class="el-icon-edit"></i>
                        <i class="el-icon-delete"></i>
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
                filterDataConfig:{},
                searchParams:{},
                totalPage:60,
                pageSize:5,
                paginationConfig:null,
                currentPage:1,
                loading:false
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
                http.get(this.api, this.searchParams).then((apiRes) => {
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


                    this.paginationConfig=this.configRes['pagination'] || null;
                    this.pageSize = this.paginationConfig['pageitems'];
                    this.apiRequest();
                });
            }
            /*
            if(this.api){
                http.get(this.api)
                .then(response => {
                    //console.log(response);
                    this.datasource=response.body;
                    //console.log(this.datasource);
                    if(typeof this.datasource.rows == 'string'){
                        this.datasource.rows = JSON.parse(this.datasource.rows);
                    }
                })                
            }
            */
        }
    }
</script>