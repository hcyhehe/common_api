const tool = require('../../commons/tool');

exports.content = function (data) {
  let Name = data.name;
  let detail = data.detail;

  let params = {};
  let addItem = '';
  let fuImport = '';  //富文本需要引入的插件
  let fuSubmit = '';  //获取富文本内容
  let uploadFun = '';  //图片上传函数
  let mKey = '';  //主键
  let getInfoStr = '';   //还原详情内容
  for(let i=0;i<detail.length;i++){
    let name = detail[i].name;
    let cname = detail[i].cname;
    if(detail[i].is_mkey == 2){
      mKey = name;
      params[name] = '';
    }
    if(detail[i].is_mkey==1 && detail[i].ft_type!=9 && detail[i].ft_type!=10){
      params[name] = '';
      getInfoStr += `
              that.params.${name} = data.${name};`;
      if(detail[i].ft_type == 1){  //input
        addItem += `
          <el-form-item label="${cname}">
            <el-input v-model.trim="params.${name}" placeholder="请输入${cname}" style="width:300px;" clearable></el-input>
          </el-form-item>`;
      }
      if(detail[i].ft_type == 2){  //select
        addItem += `
          <el-form-item label="${cname}">
            <el-select v-model="params.${name}" placeholder="请选择">
              <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>`;
      }
      if(detail[i].ft_type == 3){  //textarea文本框
        addItem += `
          <el-form-item label="${cname}">
            <el-input type="textarea" :rows="2" v-model.trim="params.${name}" placeholder="请输入${cname}" style="width:300px;" clearable></el-input>
          </el-form-item>`;
      }
      if(detail[i].ft_type == 4){  //富文本框
        fuImport = `import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/modern/theme'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/plugins/uploadimage'
    import 'tinymce/plugins/uploadvideo'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/code'`;

        fuSubmit = `this.params.${name} = tinymce.editors[0].getContent();
        `;
        addItem += `
          <el-form-item label="${cname}">
            <editor id="tinymce${i}" v-model="params.${name}" :init="editorInit"></editor>
          </el-form-item>`;
      }
      if(detail[i].ft_type == 5){  //图片上传
        uploadFun = `handleRemove(file, fileList){
          this.params.img_url = '';
        },
        handleExceed(file, fileList){
          this.$message.warning('只能上传一张图片，请删除后再重新上传');
        },
        handleSuccess(res, file, fileList){
          this.params.img_url = res.fileurl;
        },`;
        addItem += `
          <el-form-item label="${cname}">
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
          </el-form-item>`;
        getInfoStr += `
              that.fileList = [];
              let obj = {url: data.${name}};
              that.fileList.push(obj);`;
      }
      if(detail[i].ft_type == 6){  //日期
        addItem += `
          <el-form-item label="${cname}">
            <el-date-picker v-model="params.${name}" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>`;
      }
      if(detail[i].ft_type == 7){  //时间
        addItem += `
          <el-form-item label="${cname}">
            <el-time-select v-model="params.${name}" placeholder="选择时间"></el-time-select>
          </el-form-item>`;
      }
      if(detail[i].ft_type == 8){  //日期时间
        addItem += `
          <el-form-item label="${cname}">
            <el-date-picker v-model="params.${name}" type="datetime" placeholder="请选择日期"></el-date-picker>
          </el-form-item>`;
      }
    }
  }

  const str = `
    <template>
      <div class="ipe">
        <el-form ref="form" label-width="80px">${addItem}
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

    ${fuImport}

    export default {
      components:{
        editor: Editor
      },
      data(){
        return {
          userInfo: {},
          params: ${JSON.stringify(params)},
          editorInit: {
            language_url: './static/tinymce/zh_CN.js',
            language: 'zh_CN',
            skin_url: './static/tinymce/skins/lightgray',
            height: 400,
            plugins: ' uploadimage uploadvideo code colorpicker textcolor ',
            toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist |'+ 
            ' outdent indent blockquote | undo redo | uploadimage uploadvideo | code removeformat',
            branding: false,
            upload_image_url: base.upload,
          },
          upload: base.upload,
          fileList: [],
          limit: 1,
          options: [{label:'否', value:1}, {label:'是', value:2}],
          list: [],
        }
      },

      methods:{
        getInfo(){
          let that = this;
          let ${mKey} = this.params.${mKey};
          aGet(base.${Name}Info, {${mKey}}).then(res=>{
            //console.log('${Name}Info', res.data);
            if(res.data.code==2000000){
              let data = res.data.data;
              ${getInfoStr}
            }
          }).catch(err=>{
            console.log(err);
          })
        },

        onSubmit(){
          let that = this;
          ${fuSubmit}
          console.log('this.params', this.params);
          for(let i in this.params){
            if(!String(this.params[i])){
              return this.$message.warning('填写不完整');
            }
          }
          aPost(base.${Name}Edit, that.params).then(res=>{
            if(res.data.code==2000000){
              that.$message.success('编辑成功');
              that.$router.push({path:'/${Name}/list'});
            } else {
              that.$message.warning(res.data.msg);
            }
          }).catch(err=>{
            console.log(err);
          })
        },

        ${uploadFun}
      },

      created(){
        this.params.${mKey} = this.$route.query.${mKey};
      },

      mounted(){
        this.getInfo();
      },
    }
    </script>
  `;

  return tool.beautyFile(str);
}