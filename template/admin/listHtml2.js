//订单类

const tool = require('../../commons/tool');

exports.content = function (data) {
  let name = data.name;
  let CName = data.cname;
  let detail = data.detail;
  let searchStr = '';  //搜索项
  let listStr = '';   //列表项
  let searchParams = {
    pages: 1,
    limit: 10,
  }
  let mKey = '';  //主键
  for(let i=0;i<detail.length;i++){
    let itemName = detail[i].name;
    let cname = detail[i].cname;
    if(detail[i].is_mkey == 2){
      mKey = detail[i].name;
    }
    if(detail[i].is_search == 2){
      searchStr += `
          <el-input placeholder="${cname}" v-model.trim="params.${itemName}" style="width: 250px;" class="filter-item"/>`;
      searchParams[itemName] = '';
    }
    if(detail[i].ft_type != 4 && detail[i].ft_type != 5){  //非富文本、图片
      listStr += `
          <el-table-column label="${cname}" align="center" width="">
            <template slot-scope="scope">
              <span>{{ scope.row.${itemName} }}</span>
            </template>
          </el-table-column>`;
    }
    if(detail[i].ft_type == 5){  //图片
      listStr += `
          <el-table-column label="${cname}" width="" align="center">
            <template slot-scope="scope">
              <img class="goodsListImg" :src="scope.row.${itemName}.split(',')[0]">
            </template>
          </el-table-column>`;
    }
    if(detail[i].ft_type == 9){  //非表单时间记录
      listStr += `
          <el-table-column label="${cname}" align="center" width="">
            <template slot-scope="scope">
              <span>{{ scope.row.${itemName} | t }}</span>
            </template>
          </el-table-column>`;
    }
  }
  searchStr += `
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">搜索</el-button>`;
  
  
  const str = `
    <template>
      <div class="app-container">
        <div class="filter-container">${searchStr}
        </div>

        <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit stripe highlight-current-row style="width: 100%;">
          ${listStr}
          <el-table-column label="操作" align="center" width="" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="infoPage(scope.row.${mKey})">审核</el-button>
              <el-button type="danger" size="mini" @click="rmPage(scope.row.${mKey})">删除</el-button>
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
    import { aGet, aPost } from '@/js/request'
    import moment from 'moment'

    export default {
      components: { Pagination },
      directives: { waves },
      filters: {
        t(str){
          if(str){
            return moment(str).format('YYYY-MM-DD HH:mm:ss');
          } else {
            return '';
          }
        }
      },
      data(){
        return {
          tableKey: 0,
          list: [],
          total: 0,
          listLoading: true,
          params: ${JSON.stringify(searchParams)},
        }
      },
      methods:{
        search(){
          this.getList();
        },
        getList(){
          let that = this;
          aGet(base.${name}List, this.params).then(res=>{
            //console.log('userList', res.data);
            that.list = res.data.data;
            that.total = res.data.count;
            that.listLoading = false;
          }).catch(err=>{
            that.listLoading = false;
            console.log(err);
          })
        },
        infoPage(${mKey}){
          let that = this;
          this.$confirm('这里是提示消息', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
          }).then(() => {
            
          }).catch(() => {});
        },
        rmPage(${mKey}){
          let that = this;
          this.$confirm('此操作将删除该${CName}?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            aPost(base.${name}Del, {${mKey}}).then(res=>{
              if(res.data.code==2000000){
                that.$message.success('删除成功');
                that.getList();
              } else {
                that.$message.warning(res.data.msg);
              }
            }).catch(err=>{
              console.log(err);
            });
          }).catch(() => {});
        }
      },
      created(){
        
      },
      mounted(){
        this.getList();
      }
    }
    </script>
  `;

  return tool.beautyFile(str);
}

