<template>
    <div class="ls-sell">
      <div class="s-header">
        <h1>超市收银系统</h1>
        <span><b>操作员：{{user}}</b></span>
        <span>日期：{{date}}</span>
        <button>转到后台</button>
      </div>
      <div class="s-content">
        <div class="s-table">
          <table>
            <thead>
                <tr>
                    <th>序号</th>
                    <th>商品条码</th>
                    <th>商品名称</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>单位</th>
                    <th>折扣率</th>
                    <th>金额</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in dataset">
                    <td>{{index+1}}</td>
                    <td v-for="(value,key) in item">{{value}}</td>
                    <td>{{item.price*item.num}}</td>
                </tr>
            </tbody>
          </table>
          </div>
           
      </div>
      <div class="s-footer">
        <div class="f-left fl">
        <label>商品条码
          <input type="text" @keyup.enter="getDetails($event)" id="proNo"/>
        </label></br>
        商品名：<span v-if="dataset.length>0">{{dataset[currentL].name}}</span></br>
        价格：<span v-if="dataset.length>0">{{dataset[currentL].price}}</span></br>
        <span>数量</span><el-input-number v-model="num1" :step="1" @change="changeNumber"></el-input-number>
        </div>
        <div class="f-right fr">
          <div>商品记录数：<span>{{dataset.length}}</span></div>
          <div>总金额：<span>{{total}}</span></div> 
          <el-button type="text" @click="open(total)">结算</el-button>
        </div>
      </div>
    </div>
</template>

<script type="text/javascript">
import './sell.scss'
import http from '../../utils/HttpService'
import router from 'vue-router'
export default {
  data () {
    return {
        
        dataset:[],
        currentL:0,
        num1: 1,
        total:0,
        user:'',
        date:''
    }
  },
  methods:{
      getDetails(e){
          console.log(e.target.value);
          // 发起请求
         this.num1=1;
         
         http.get('getdetails',{proid:e.target.value}).then((res)=>{
             var cres=res.body[0];
             console.log(cres.name);
             var names=cres.name;
             var newres={"proNo":cres['productNo'],"name":names,"price":cres['sellprice'],"num":1,"unit":cres.unit,"descount":"1"};
             console.log(newres);
             this.dataset.push(newres);
            this.currentL=this.dataset.length-1;
            this.total=this.getTotals(this.dataset);
         })
         e.target.value="";

      },
      changeNumber(){
        console.log(this.num1);
        this.dataset[this.currentL].num=this.num1;
        this.total=this.getTotals(this.dataset);
      },
      
      getTotals(arr){
        var sum = 0;
        console.log(JSON.parse(JSON.stringify(arr)));
        for(var i=0;i<arr.length;i++){
            sum+=arr[i].price*arr[i].num;
        }
        console.log(sum);
        return sum;
      },
      open(total) {
      this.$alert(`总金额：${total}`, '支付方式', {
          confirmButtonText: '已支付',
          callback: action => {
            console.log(`${action}`);
            if(action==='confirm'){
                //生成订单
                console.log(this.dataset);
                JSON.parse(JSON.stringify(this.dataset));
                var param={
                  data:JSON.stringify(this.dataset),
                  operate:sessionStorage.getItem("user"),
                  num:this.dataset.length,
                  total:this.total
                };
                console.log(param);
                if(this.dataset.length>0){

                  http.post('createorders',param).then(res=>{
                    console.log(res)
                    if(res.ok){
                        //添加成功则生成打印小票界面
                        //window.print();
                        //获取当前生成的订单号
                        console.log(res.body[2]);
                        var orderId = res.body[2].currenRow;
                        console.log(orderId);
                        this.$router.push({
                          name: 'print',
                          params: {
                            id:orderId
                          }
                        })
                    }
                  })
                }
                // 重置
                 //this.dataset=[];
            }
          }
        });
      },
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
     
     
  },
  beforeMount(){
      var username = sessionStorage.getItem("user") || '未登录';
      var nickname = sessionStorage.getItem("Nickname");
      console.log(username,nickname);
      this.user=nickname? nickname : username;
      this.date=this.getNowFormatDate();
      },
      mounted(){
      var proid=document.getElementById('proNo');
        proid.focus();
      }

}
</script>
