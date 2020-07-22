const tool = require('../../commons/tool');

exports.content = function (data) {
  let name = data.name;
  let detail = data.detail;
  let searchStr = '';
  let searchParams = {
    pages: 1,
    limit: 10,
  }
  for(let i=0;i<detail.length;i++){
    let itemName = detail[i].name;
    let cname = detail[i].cname;
    if(detail[i].is_search == 2){
      searchStr += `
        <el-input placeholder="${cname}" v-model.trim="params.${itemName}" style="width: 250px;" class="filter-item"/>
      `;
      searchParams[itemName] = '';
    }
  }
  searchStr += `
    <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
  `;
  
  const str = `
    <template>
      <div class="app-container">
        <div class="filter-container">
          ${searchStr}
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="add">添加</el-button>
        </div>

        <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit stripe highlight-current-row style="width: 100%;">
          <el-table-column label="排序" align="center" width="">
            <template slot-scope="scope">
              <span>{{ scope.row.sort }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="" align="center">
            <template slot-scope="scope">
              <img class="swImg" :src="scope.row.img_url">
            </template>
          </el-table-column>
          <el-table-column label="类型" width="" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.href_type | ht }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status==1 ? 'success' : 'warning'">{{ scope.row.status | s }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.create_time | t }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editPage(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="rmPage(scope.row.id)">删除</el-button>
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
      name: 'userList',
      components: { Pagination },
      directives: { waves },
      filters: {
        t(str){
          return moment(str).format('YYYY-MM-DD HH:mm:ss');
        },
        s(int){
          if(int==1) return '上架';
          if(int==2) return '下架';
        },
        ht(int){
          if(int==1) return '内链'
          if(int==2) return '外链'
          if(int==3) return '会员卡'
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
        add(){
          this.$router.push({path:'/home/swipeAdd'});
        },
        getList(){
          let that = this;
          aGet(base.swipeList, this.params).then(res=>{
            //console.log('userList', res.data);
            that.list = res.data.data;
            that.total = res.data.count;
            that.listLoading = false;
          }).catch(err=>{
            that.listLoading = false;
            console.log(err);
          })
        },
        editPage(id){
          this.$router.push({path:'/home/swipeEdit', query:{id:id} });
        },
        rmPage(id){  //swipeDel
          let that = this;
          this.$confirm('此操作将删除该轮播图?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            aPost(base.swipeDel, {id:id}).then(res=>{
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
  `;

  return tool.beautyFile(str);
}