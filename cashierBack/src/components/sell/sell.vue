<template>
    <div class="ls-sell">
      <div class="s-header">
        <h1>超市收银系统</h1>
        <span><b>操作员：</b></span>
      </div>
      <div class="s-content">
        <div class="s-table">
          <table>
            <thead>
                <tr>
                    <th>序号</th>
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
          <input type="text" @keyup.enter="getDetails($event)" />
        </label></br>
        商品名：<span v-if="dataset.length>0">{{dataset[currentL].name}}</span></br>
        价格：<span v-if="dataset.length>0">{{dataset[currentL].price}}</span></br>
        <span>数量</span><el-input-number v-model="num1" :step="1" @change="changeNumber"></el-input-number>
        </div>
        <div class="f-right fr">
          <div>商品总数：<span>{{dataset.length}}</span></div>
          <div>总金额：<span>{{total}}</span></div> 
            
        </div>
      </div>
    </div>
</template>

<script type="text/javascript">
import './sell.scss'
export default {
  data () {
    return {
        
        dataset:[],
        currentL:0,
        num1: 1,
        total:0
    }
  },
  methods:{
      getDetails(e){
          console.log(e.target.value);
          // 发起请求
         this.num1=1;
         var res={"name":"写字笔","price":"59","num":"1","unit":"支","descount":"1"};
         this.dataset.push(res);
         this.currentL=this.dataset.length-1;
         e.target.value="";

      },
      changeNumber(){
        console.log(this.num1);
        this.dataset[this.currentL].num=this.num1;
      },
      getTotals(arr){
        
      }
     
  }

}
</script>
