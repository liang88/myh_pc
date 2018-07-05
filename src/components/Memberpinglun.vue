<template>
    <div id="memberpinglun">
      <div class="comment">
        <div class="comment-tit">
          <p>我的评论</p>
        </div>
        <div class="comment-wap">
          <div class="comment-con-tit clear">
            <div @click="mbpls(1)"  :class="this.mbshows==1?'tit-lou':'tit-jingji'">一手房</div>
            <div @click="mbpls(0)" :class="this.mbshows==0?'tit-lou':'tit-jingji'">楼盘</div>
            <div @click="mbpls(2)"   :class="this.mbshows==2?'tit-lou':'tit-jingji'">经纪人</div>
          </div>
          <div v-show="this.mbshows==0" class="member_contens">
            <div v-for="pinglun in pinglundatabase" >
              <div class="nav-ones clear">
                <div class="con-pic">
                  <img :src="pinglun.mainImg" alt="">
                </div>
                <div class="con-tit">
                  <p>{{pinglun.subTitle}}</p>
                  <p>{{pinglun.address}}</p>
                  <p>户型：{{pinglun.layout}}</p>
                  <p>建筑面积：{{pinglun.measure}}㎡ </p>
                  <p>最新更新时间：{{pinglun.createTime}}</p>
                  <p>
                    <span v-for="plfea in pinglun.myfealing">{{plfea}}</span>
                  </p>
                </div>
                <div class="con-right">
                  <p><img src="images/pone.png" alt="">400-1133-233</p>
                  <p><span>{{pinglun.price}}万</span></p>
                </div>
              </div>
              <!-- 评论 -->
              <div v-for="plcomms in pinglun.commList" class="con-one clear">
                <div class="con-one-l">
                  {{plcomms.hcCommentTime|timeFormat}}
                </div>
                <div class="con-one-m">
                  <div class="m-tit"></div>
                  <div class="m-name">{{plcomms.hcMobile}}</div>
                  <div class="m-nav">{{plcomms.hcComment}}</div>
                  <!--<div class="m-pic clear">-->
                  <!--<div>+</div>-->
                  <!--<div>+</div>-->
                  <!--<div>+</div>-->
                  <!--<div>+</div>-->
                  <!--</div>-->
                  <!--<div class="con-one-r">-->
                  <!--<p>查看</p>-->
                  <!--<p>删除评论</p>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
            <div class="plmessages" v-show="plstartshow">{{plmsg}}</div>
          </div>
          <div v-show="this.mbshows==1"  class="member_contens">
            <!-- 楼盘 -->
            <div v-for="pinglun in pinglundatabase" >
              <div class="nav-ones clear">
                <div class="con-pic">
                  <img :src="pinglun.mainImg" alt="">
                </div>
                <div class="con-tit">
                  <p>{{pinglun.subTitle}}</p>
                  <p>{{pinglun.address}}</p>
                  <p>户型：{{pinglun.layout}}</p>
                  <p>建筑面积：{{pinglun.measure}}㎡ </p>
                  <p>最新更新时间：{{pinglun.createTime}}</p>
                  <p>
                    <span v-for="plfea in pinglun.myfealing">{{plfea}}</span>
                  </p>
                </div>
                <div class="con-right">
                  <p><img src="images/pone.png" alt="">400-1133-233</p>
                  <p><span>{{pinglun.price}}万</span></p>
                </div>
              </div>
              <!-- 评论 -->
              <div v-for="plcomms in pinglun.commList" class="con-one clear">
                <div class="con-one-l">
                  {{plcomms.hcCommentTime|timeFormat}}
                </div>
                <div class="con-one-m">
                  <div class="m-tit"></div>
                  <div class="m-name">{{plcomms.hcMobile}}</div>
                  <div class="m-nav">{{plcomms.hcComment}}</div>
                  <!--<div class="m-pic clear">-->
                    <!--<div>+</div>-->
                    <!--<div>+</div>-->
                    <!--<div>+</div>-->
                    <!--<div>+</div>-->
                  <!--</div>-->
                  <!--<div class="con-one-r">-->
                    <!--<p>查看</p>-->
                    <!--<p>删除评论</p>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
            <div class="plmessages" v-show="plstartshow">{{plmsg}}</div>
          </div>
          <div v-show="this.mbshows==2"  class="member_contens">
            <div v-for="pljingji in pinglundatabase1">
              <div class="nav-ones clear">
                <div class="con-pic plimgwid">
                  <img :src="pljingji.agentImg" class="pljingimg"  alt="">
                </div>
                <div class="con-tit">
                  <p>{{pljingji.name}}</p>
                  <p>{{pljingji.detailArea}}</p>
                  <p>{{pljingji.store}}</p>
                  <p>最新更新时间：{{pljingji.createTime}}</p>
                </div>
                <div class="con-right">
                  <p><img  src="../assets/images/call.png" alt="">400-1133-233</p>
                </div>
              </div>
              <!-- 评论 -->
              <div v-for="jingjicom in pljingji.commList" class="con-one clear">
                <div class="con-one-l">
                  {{jingjicom.timeStr}}
                </div>
                <div class="con-one-m">
                  <div class="m-tit">{{jingjicom.comment}}</div>
                  <!--<div class="m-pic clear">-->
                    <!--<div>+</div>-->
                    <!--<div>+</div>-->
                    <!--<div>+</div>-->
                    <!--<div>+</div>-->
                  <!--</div>-->
                  <!--<div class="con-one-r">-->
                    <!--<p>查看</p>-->
                    <!--<p>删除评论</p>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
            <div class="plmessages" v-show="plstartshow">{{plmsg}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {getCookie} from "../util/cookie";
export default {
  name: 'memberpinglun',
  data(){
    return{
      mbplsdate: '',
      mbshows: 1,
      pinglundatabase:{},
      pinglundatabase1:{},
      plstartshow:false,
      plmsg: ''
    }
  },
  mounted(){
    this.loadpinglun()
  },
  methods:{
    mbpls(e){
      this.mbshows = e
      if(this.mbshows==2){
        this.pljianji()
        return
      }
      this.loadpinglun()
    },
    loadpinglun(){
      var mbplinfo = {
        userId: getCookie('userId'),
        houseType: this.mbshows,
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+'myh_web/viewAllMyComm', mbplinfo).then((response)=>{
        console.log(response)
        var data = response.data
        data = data.resultBean
        var mycodes = data.code
        if(mycodes==1){
          this.pinglundatabase =false
          this.plstartshow = true
          this.plmsg = data.message
        }else if(mycodes==0){
          this.pinglundatabase =true
          this.plstartshow = false
          data = data.object
          data = data.list
          for(var i=0; i<data.length; i++){
            data[i].myfealing = data[i].feature.split(',').slice(0,3)
          }
          this.pinglundatabase = data
        }
      })
    },
    pljianji(){
      var pltrans = {
        userId: getCookie('userId'),
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+'myh_web/viewMyCommOfAgent', pltrans).then((response)=> {
        console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.pinglundatabase1 = data
      })
    }
  }
}
</script>

<style scoped>
  .comment .comment-wap .nav-ones .con-pic .pljingimg{
  display: block;
  width: 150px;
  height: 150px;
 }
  .comment .comment-wap .nav-ones .plimgwid{
    width: 158px;
    height: 158px;
  }
</style>
