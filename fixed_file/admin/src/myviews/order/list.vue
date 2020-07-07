<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="订单编号" v-model.trim="params.order_id" style="width: 250px;" class="filter-item" />
      <el-input placeholder="用户名" v-model.trim="params.username" style="width: 250px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button v-waves v-if="userInfo.token=='admin'" class="filter-item" type="primary" icon="el-icon-upload" @click="Export">
        导出
      </el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit stripe highlight-current-row 
      style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column label="订单编号" align="center" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.order_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="" align="center">
        <template slot-scope="scope">
          <img class="qnImg" :src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column label="电话" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="" align="center">
        <template slot-scope="scope">
          <span>￥{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status | s }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | t }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220" class-name="small-padding fixed-width orderBtn">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="cancel(scope.row.order_id)">取消</el-button>
          <el-button size="mini" type="danger" @click="rmPage(scope.row.order_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="params.pages" :limit.sync="params.limit" @pagination="getList" />

    <a id="download" :href="link" :download="linkName" style="display:none;"></a>
  </div>
</template>

<script>
import waves from '@/directive/waves' //波纹效果
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import base from '@/js/global'
import { aGet, aPost } from '@/js/request'
import moment from 'moment'
import $ from 'jquery'

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    t(str){
      if(str){  
        return moment(str).format('YYYY-MM-DD HH:mm');
      } else {
        return '';
      }
    },
    s(int){
      if(int==1) return '已锁定';
      if(int==2) return '已失效';
      if(int==3) return '成功办理';
      if(int==4) return '已完成';
      if(int==5) return '已取消';
    },
  },
  data(){
    return {
      userInfo: {},
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      params: {
        pages: 1,
        limit: 10,
        order_id: '',
        username: '',
      },
      idArr: [],
      link: '',
      linkName: '',
    }
  },
  methods:{
    search(){
      this.getList();
    },
    
    getList(){
      let that = this;
      that.listLoading = false;

      // aGet(base.orderList, this.params).then(res=>{
      //   console.log('orderList', res.data);
      //   that.list = res.data.data;
      //   that.total = res.data.count;
      //   that.listLoading = false;
      // }).catch(err=>{
      //   that.listLoading = false;
      //   console.log(err);
      // })
    },

    cancel(order_id){
      let that = this;
      this.$confirm('确定取消此订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
      }).catch(() => {});
    },

    rmPage(order_id){
      let that = this;
      this.$confirm('确定删除此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        
      }).catch(() => {});
    },

    handleSelectionChange(val){
      let that = this;
      this.idArr = [];
      val.map(item=>{
        that.idArr.push({order_id:item.order_id});
      })
    },

    Export(){
      let that = this;
      if(this.idArr.length==0){
        return that.$message.warning('请先勾选需要导出的订单');
      }
      that.$confirm('确定导出此订单的excel?', '提示', { 
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' 
      }).then(() => {
        
      }).catch(err=>{
        console.log(err);
      });
    },

  },

  created(){
    this.userInfo = JSON.parse(localStorage.getItem('st_userinfo'));
  },

  mounted(){
    this.getList();
  }
}
</script>

<style lang="scss">
.qnImg{
  width: 30px;
}
.orderBtn{
  .small-padding .cell{
    display: flex;
  }
}
</style>
