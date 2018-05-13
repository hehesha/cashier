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
            <tbody></tbody>
          </table>
          </div>
      </div>
      <div class="s-footer">
        <div class="f-left fl">
        <span>商品名</span>
        <span>价格</span>
        <span>数量</span><el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </div>
        <div class="f-right fr"></div>
      </div>
    </div>
</template>

<script type="text/javascript">
import './sell.scss'
export default {
  data () {
    return {
        num1: 1
    }
  }

}
</script>
