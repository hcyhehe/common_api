const tool = require('../../commons/tool');

exports.content = function (data) {
  
  const str = `
    <template>
      <div class="ipe">
        <el-form ref="form" label-width="80px">
          <el-form-item label="排序">
            <el-input v-model.trim="params.sort" placeholder="请输入排序" style="width:200px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              :limit="limit"
              :action="upload"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="链接类型">
            <el-select v-model="params.href_type" placeholder="请选择">
              <el-option v-for="item in options2" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="params.href_type==1" label="选择商品">
            <el-select v-model="params.goods_id" placeholder="请选择商品">
              <el-option v-for="item in list" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="params.href_type==2" label="链接地址">
            <el-input v-model.trim="params.href" placeholder="请输入链接地址" style="width:400px;" clearable>
            </el-input>
          </el-form-item>
          
          <el-form-item label="状态">
            <el-select v-model="params.status" placeholder="请选择">
              <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>

    <script>
    import base from '@/js/global'
    import { aGet, aPost } from '@/js/request'
    import { judgeNum1 } from '@/js/fun'
    import moment from 'moment'


    export default {
      data(){
        return {
          userInfo: {},
          params: {
            sort: '',
            img_url: '',
            status: 1,
            href_type: '',
            goods_id: '',
            href: '',
          },
          upload: base.upload,
          fileList: [],
          limit: 1,
          options: [{label:'上架', value:1}, {label:'下架', value:2}],
          options2: [{label:'内链', value:1}, {label:'外链', value:2}, {label:'会员卡', value:3}],
          list: [],
        }
      },
      methods:{
        goodsList2(){
          let that = this;
          aGet(base.goodsList2).then(res=>{
            console.log('goodsList2', res.data)
            if(res.data.code==2000000){
              that.list = res.data.data
            } else {
              that.$message.warning(res.data.msg);
            }
          }).catch(err=>{
            console.log(err);
          })
        },
        onSubmit(){
          let that = this;
          console.log('this.params', this.params);
          for(let i in this.params){
            if(this.params[i].length == 0 && i!='href' && i!='goods_id'){
              return this.$message.warning('填写不完整');
            }
          }
          if(!judgeNum1(this.params.sort)){
            return this.$message.warning('排序不是非负整数');
          }
          aPost(base.swipeAdd, that.params).then(res=>{
            if(res.data.code==2000000){
              that.$message.success('提交成功');
              that.$router.push({path:'/home/swipe'});
            } else {
              that.$message.warning(res.data.msg);
            }
          }).catch(err=>{
            console.log(err);
          })
        },
        handleRemove(file, fileList){
          this.params.img_url = '';
        },
        handleExceed(file, fileList){
          this.$message.warning('只能上传一张图片，请删除后再重新上传');
        },
        handleSuccess(res, file, fileList){
          this.params.img_url = res.fileurl;
        },
      },
      created(){
        this.userInfo = JSON.parse(localStorage.getItem('st_userinfo'));
      },
      mounted(){
        this.goodsList2()
      }
    }
    </script>
  `;

  return tool.beautyFile(str);
}