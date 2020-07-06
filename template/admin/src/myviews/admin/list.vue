<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入姓名" v-model.trim="params.username" style="width: 250px;" class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="addPage">创建账号</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit stripe highlight-current-row style="width: 100%;">
      <!-- <el-table-column label="序号" type="index" width="" align="center"></el-table-column> -->
      <el-table-column label="账号ID" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号名" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号类型" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role | r }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | t }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登录时间" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.last_login_time | t }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登录ip" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.last_login_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editPage(scope.row.username, scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="rmPage(scope.row.id, scope.row.role)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="params.pages" :limit.sync="params.limit" @pagination="getList" />
    
    <el-dialog title="创建平台账号" :visible.sync="addHide">
      <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 400px; margin-left:40px;">
        <el-form-item label="账户名" prop="title">
          <el-input v-model.trim="params2.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="title">
          <el-input type="password" v-model.trim="params2.password"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addHide=false">取消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑平台账号" :visible.sync="editHide">
      <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 400px; margin-left:40px;">
        <el-form-item label="账户名" prop="title">
          <el-input v-model.trim="params3.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="title">
          <el-input type="password" placeholder="若不修改密码，则可以不传" v-model.trim="params3.password"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editHide=false">取消</el-button>
        <el-button type="primary" @click="edit">确定</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
import waves from '@/directive/waves' //波纹效果
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import base from '@/js/global'
import { aGet, aPost } from '@/js/request'
import moment from 'moment'

export default {
  name: 'userList',
  components: { Pagination },
  directives: { waves },
  data(){
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      params: {
        pages: 1,
        limit: 10,
        username: '',
      },
      addHide: false,
      params2:{
        username: '',
        password: '',
      },
      editHide: false,
      params3:{
        id: '',
        username: '',
        password: '',
      },
    }
  },
  filters: {
    t(str){
      if(str == 'Invalid date'){ 
        return '无';
      } else {
        return moment(str).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    r(int){
      if(int==0){
        return '游客'
      } else if(int==1){
        return '普通管理员'
      } else if(int==2){
        return '超级管理员'
      } 
    }
  },
  methods:{
    search(){
      this.params.pages = 1;
      this.getList();
    },
    getList(){
      let that = this;
      aGet(base.adminList, this.params).then(res=>{
        //console.log('userList', res.data);
        that.list = res.data.data;
        that.total = res.data.count;
        that.listLoading = false;
      }).catch(err=>{
        that.listLoading = false;
        console.log(err);
      })
    },
    addPage(){
      this.params2.username = '';
      this.params2.password = '';
      this.addHide = true;
    },
    add(){
      let that = this;
      for(let i in this.params2){
        if(this.params2[i].length===0){
          this.$message.warning('请填写账号或密码');
          return false;
        }
      }
      aPost(base.adminAdd, that.params2).then(res=>{
        if(res.data.code == 2000000){
          that.$message.success('创建成功');
          that.addHide = false;
          that.getList();
        } else {
          that.$message.warning(res.data.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    editPage(username, id){
      let that = this;
      this.params3.id = id;
      this.params3.username = username;
      this.editHide = true;
    },
    edit(){
      let that = this;
      if(this.params3.username.length===0){
        this.$message.warning('请输入账户名');
        return false;
      }
      aPost(base.adminMod, that.params3).then(res=>{
        if(res.data.code==2000000){
          that.$message.success('修改成功');
          that.editHide = false;
          that.getList();
        } else {
          that.$message.warning(res.data.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    rmPage(id, role){
      let that = this;
      if(role==2){
        return this.$message.warning('超级管理员暂不可删除！');
      }
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        aPost(base.adminDel, {id:id}).then(res=>{
          if(res.data.code==2000000){
            that.$message.success('删除成功');
            that.getList();
          } else {
            that.$message.warning(res.data.msg);
          }
        }).catch(err=>{
          console.log(err);
        })
      }).catch(() => {});
    }
  },
  created(){
    
  },
  mounted(){
    this.getList()
  }
}
</script>

<style lang="scss">
.aImg{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
