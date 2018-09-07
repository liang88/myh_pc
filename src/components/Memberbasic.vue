<template>
    <div id="memberbasic">
      <div class="gr">
      <div class="gr-tit">
        <p>个人信息</p>
      </div>
      <div class="gr-wap">
        <div class="nav-head clear">
          <div class="nav-head-l">上传头像</div>
          <div class="nav-head-m">
            <el-upload
              class="avatar-uploader"
              :action="importFileUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :data="upLoadData"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="nav-head-b">
          </div>
        </div>
        <div class="nav-name">
          <p>昵称</p>
          <p>{{yuname}}</p>
          <a href="javascript:;" @click="edname">修改昵称</a>
        </div>
        <div class="nav-db1">
          <p>手机</p>
          <p>17610276866</p>
        </div>
        <div class="nav-db" >
          <p>邮箱</p>
          <router-link reg="a" to="/Memberindex/MemberEmail">立即绑定</router-link>
        </div>
        <div class="nav-db" >
          <p>密码</p>
          <a href="javascript:;" @click="dbpwd">修改密码</a>
        </div>
        <a href="javascript:;" @click="object_btn" class="object_basic">提交信息</a>
        <div class="message">{{objmessage}}</div>
      </div>
      <!------------弹出层--------- -->
      <div v-show="gai_name" class="gai">
        <div   class="gai-name">
          <a href="javascript:;" @click="gclose" class="gn_close"><img src="../assets/images/closes.png" width="30" /> </a>
          <form class="name-m" action="">
            <div class="m-zi clear">
              <p>设置昵称:</p>
              <input type="text" v-model="gtext" placeholder="请输入您的昵称">
            </div>
            <div class="m-but">
              <input type="submit" @click="gcun" value="保存修改">
            </div>
            <p class="gtshow">{{gtmessage}}</p>
          </form>
        </div>
      </div>
      <div v-show="gai_sub"  class="gai">
        <div class="gai-sub">
          <a href="javascript:;" @click="pwd_close" class="gn_close"><img src="../assets/images/closes.png" width="30" /> </a>
          <div class="sub-m">
            <div class="m-one clear">
              <p>输入旧密码:</p>
              <input type="password" v-model="pass01" placeholder="请输入密码">
            </div>
            <div class="m-one clear">
              <p>设置新密码:</p>
              <input type="password" v-model="pass02" placeholder="请输入新密码">
            </div>
            <div class="m-one clear">
              <p>确认新密码:</p>
              <input  type="password" v-model="pass03" placeholder="请确认新密码">
            </div>
            <div class="xian"></div>
            <input class="m-sub"  @click="pwdconserve" type="submit" value="保存修改">
            <div class="passmessag">{{pwdmessage}}</div>
          </div>
        </div>
      </div>
      <!------------弹出层--------- -->
      </div>
    </div>
</template>

<script>
import md5 from 'js-md5'
import {Upload} from 'element-ui'
import {getCookie} from '../util/cookie'
import 'element-ui/lib/theme-chalk/index.css'
import {mapGetters} from 'vuex'
export default {
  name: 'memberbasic',
  data() {
    return {
      imageUrl: false,
      upLoadData : {
        id : getCookie ('userId')
      },
      importFileUrl : 'http://www.manyihefc.com:8080/myh_web/uploadImage',
      gai_sub: false,
      gai_name: false,
      gtext: '',
      gtmessage: '',
      yuname: '杨洋',
      pass01: '',
      pass02: '',
      pass03: '',
      pwdmessage: '',
      usermy: '',
      gname: '',
      gai_mail: true,
      objmessage: ''
    }
  },
  computed:mapGetters([
    'picUrl'
  ]),
  mounted(){
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      var resdata = res.resultBean
      resdata = resdata.object
      // console.log(resdata)
      this.imageUrl = resdata
    },
    beforeAvatarUpload(file) {
      // console.log(66666)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    edname(){
      this.gai_name = true
    },
    gclose(){
      this.gai_name = false
    },
    gcun(){
      if(!this.gtext){
        this.gtmessage = '亲 请输入昵称!'
      }
      this.gname = getCookie ('userId')
      var cunpd = {
        id: this.gname,
        name: this.gtext
      }
      // console.log(cunpd)
      this.$http.post(myHost+'myh_web/updateUser', cunpd).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var ncode = data.code
        if(ncode=='1'){
          this.gtmessage = data.message
        }else if(ncode=='0'){
          this.yuname = this.gtext
          this.gtmessage ='昵称修改成功!'
          // this.gai_name = false
        }
      })
    },
    dbpwd(){
      this.gai_sub = true
    },
    pwd_close(){
      this.gai_sub = false
    },
    pwdconserve(){
      if(!this.pass01){
        this.pwdmessage = '请输入旧密码!'
        return
      }
      if(!this.pass02){
        this.pwdmessage = '请输入新密码!'
        return
      }
      if(!this.pass03){
        this.pwdmessage = '请输入确认密码!'
        return
      }
      if(!this.pass02.length == this.pass03.length){
        this.pwdmessage = '两次密码不一致!'
        this.clearmessage ()
        return
      }
      this.usermy = getCookie ('userId')
      var pwdinfo= {
        userId : this.usermy,
        oldPass: md5(this.pass01),
        newPass: md5(this.pass02),
        confirmNewPass: md5(this.pass03)
      }
      // console.log(pwdinfo)
      this.$http.post(myHost+'myh_web/editPass', pwdinfo).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var dc = data.code
        if(dc== '1'){
          this.pwdmessage = data.message
        }else if(dc== '0'){
          this.$router.push('/Memberindex/1')
          this.gai_sub = false
        }
      })
    },
    object_btn(){
      if(this.imageUrl == ''){
        this.objmessage = '请上传头像！'
        return
      }
      var obinfo = {
        id: getCookie ('userId'),
        name: this.yuname,
        headUrl: this.imageUrl
      }
      this.$http.post(myHost+'myh_web/updateUser', obinfo).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var mycode = data.code
        if(mycode== '1'){
          this.objmessage = mycode.message
        }else if(mycode== '0'){
          this.objmessage = '提交成功！'
        }
      })
    }
  },
  components: {
    'el-upload': Upload
  }
};
</script>

<style scoped>
  .avatar-uploader .el-upload {
     border: 1px dashed #d9d9d9;

     border-radius: 6px;
     cursor: pointer;
     position: relative;
     overflow: hidden;
   }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader .avatar {
    clear: both;
    overflow: hidden;
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader{
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader div{
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload{
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-icon-plus{
    display: block;
    overflow: hidden;
  }
  .gtshow{
    text-align: center;
    color: #ff0000;
  }
  .pwd_close{
    display: block;
    float: right;
  }
  .passmessag{
    display: block;
    overflow: hidden;
    text-align: center;
    font-size:16px;
    line-height: 30px;
    color: #ff0000;
  }
  .object_basic{
    display: block;
    text-align: center;
    text-decoration: none;
    width: 240px;
    height: 100%;
    border-radius: 5px;
    line-height: 38px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    background: #ff3300;
  }
  .upfiles{
    display: inline-block;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    background: #f5f5f5;
    color: #333333;
    line-height: 40px;
    text-align: center;
    margin-left: 20px;
    margin-top:20px;
    font-size:16px;
  }
  .message {
    display: block;
    overflow: hidden;
    text-align: left;
    font-size: 16px;
    line-height: 40px;
    color: #333333;
  }
</style>
