<template>
    <div>
        <div class="le-search">
           <el-form label-width="200px" class="demo-ruleForm">
              <el-form-item
                label="根据用户名或姓名查询"
                >
                <el-input  v-model="searchgood"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
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
                    <el-button @click="deletee(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
        </div>
        <div class="block ls-pagination" @click="pagination($event)">
            <el-pagination
              :current-page.sync="currentPage"
              :page-size=pageSize
              layout="prev, pager, next, jumper"
              :total=totalPage>
            </el-pagination>
       </div>
        <el-dialog title="员工详情" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="编号" :label-width="formLabelWidth">
              <el-input v-model="form.cid" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth" disabled>
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
                searchgood: '',             
                dataset:[],
                user:'',
                rank:1,
                currentPage:1,
                totalPage:60,
                pageSize:5,
                searchParams:{},
                api:'getemployee',
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
            this.apiRequest();
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
                      http.get('getempdetails',{name:row.username}).then(res=>{
                        console.log(res.body[0]);
                        var resdata=res.body[0];
                        for(let key in resdata){
                              this.form[key] = resdata[key];
                        }
                      this.dialogFormVisible=true;
                      })
                  }

          },
          pagination(e){
                var self=this;
                window.setTimeout(function(){
                    console.log(self.currentPage);
                    self.apiRequest(self.currentPage);
                },30);
            },
          submitForm() {
                console.log(this.searchgood);
                this.apiRequest();
              },
          resetForm() {
            this.searchgood="";
          },
          apiRequest(_page = 1){
                this.searchParams['pageitems'] = this.pageSize;
                this.searchParams['page'] = _page; 
                this.searchParams['data'] =this.searchgood;
                //配置信息中的 api
                http.get(this.api, this.searchParams).then((apiRes) => {
                    console.log(apiRes.body);
                    this.dataset = apiRes.body[0];
                    this.totalPage=apiRes.body[1][0].rowscount;

                })
            },
            savechange(){
                console.log(this.form);
                http.post('updatecashier',this.form).then(res=>{
                  console.log(res);
                  if(res.ok){
                    alert('修改成功！');
                    this.dialogFormVisible=false;
                    this.apiRequest();
                  }
                })
               
            },
            deletee(row){
                console.log(row);
                if(this.rank>2){
                
                http.post('deleteuser',{user:row.username}).then(res=>{
                    console.log(res);
                    if(res.ok){
                      alert('删除成功');
                      this.apiRequest();
                    }
                })
              
                }else{
                    alert('您没有操作权限！')
                }
            }
        }
       
    }
</script>