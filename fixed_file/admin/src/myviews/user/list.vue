<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入用户姓名" v-model.trim="params.username" style="width: 250px;" class="filter-item"/>
      <el-input placeholder="请输入手机号" v-model.trim="params.phone" style="width: 250px;" class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit stripe highlight-current-row style="width: 100%;">
      <!-- <el-table-column label="openid" align="center" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.openid}}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="昵称" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="" align="center">
        <template slot-scope="scope">
          <img class="aImg" :src="scope.row.avatar">
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="create_time" label="注册时间" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" style="width:80px;">操作</el-button>  
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="params.pages" :limit.sync="params.limit" @pagination="getList" />

  </div>
</template>

<script>
import waves from '@/directive/waves' //波纹效果
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import base from '@/js/global'
import { judgeNum2, judgeNum3 } from '@/js/fun'
import { aGet, aPost } from '@/js/request'
import moment from 'moment'

export default {
  name: 'userList',
  components: { Pagination },
  directives: { waves },
  filters: {
    t(str){
      return moment(str).format('YYYY-MM-DD HH:mm:ss');
    },
    g(int){
      if(int==1){
        return '男'
      } else {
        return '女'
      }
    }
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
        username: '',
        phone: '',
      },
      money: '',
      dialogVisible2: false,
      params2:{
        openid: '',
        name: '',
        idcard: '',
      },
    }
  },
  methods:{
    add(){
      this.$router.push({path:'/user/add'})
    },
    search(){
      this.params.pages = 1;
      this.getList();
    },
    getList(){
      let that = this;
      aGet(base.userList, this.params).then(res=>{
        console.log('userList', res.data);
        that.list = res.data.data;
        that.total = res.data.count;
        that.listLoading = false;
      }).catch(err=>{
        that.listLoading = false;
        console.log(err);
      })
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

