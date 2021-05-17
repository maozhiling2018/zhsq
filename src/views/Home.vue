<template>
  <div class="ARPage">
    <LivePlayer :videoUrl="hiddenUrl" live stretch :controls="false" style="overflow: hidden"/>
    <div class="top">
      <div class="weather">
        <ul>
          <li>
            <div class="dateBox"><span class="week">星期{{week}}</span><span class="date">{{year}}年{{month}}月{{day}}日</span></div>
          </li>
          <li>
            <!--<div>
              <span style="margin-right: 20px">
                     {{weatherData.city}}: {{weatherDataInfo}}
                     <img :src="weatherImg" v-bind:style="{width:'20px',height:'20px'}">
               </span>
            </div>-->
            <div class="weatherIcon"><img :src="weatherImg" alt="" v-bind:style="{width:'36px',height:'36px'}"></div>
            <div class="weatherText">
              <span class="temperatureTop">{{weatherDataTem}}</span>
              <span class="temperatureBottom">{{weatherDataInfo}}</span>
            </div>
          </li>
          <li>
            <div class="clock">
              <span class="hour clockBg">{{hour}}</span>
              <span class="separator">:</span>
              <span class="hour clockBg">{{minute}}</span>
              <span class="separator">:</span>
              <span class="hour clockBg">{{second}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="logoBox">
        <div class="chinese">{{chineseName}}</div>
        <div class="english">{{englishName}}</div>
      </div>
      <div class="loginInfo">
        <ul>
          <li>
            <el-select v-model="searchVal" filterable placeholder="请选择" style="width:80%" size="mini" @change="deptChange">
              <el-option
                      v-for="item in options"
                      :key="item.deptId"
                      :label="item.deptName"
                      :value="item.deptId">
              </el-option>
            </el-select>
          </li>
          <li>
            <span><svg-icon name="setting"></svg-icon></span>
            <span><a :href="platUrl" target="_blank">系统设置</a></span>
          </li>
          <li>
            <span><svg-icon name="user"></svg-icon></span>
            <span>{{userName}}</span>
          </li>
          <li><el-button size="mini" @click="logoutHandle">退出</el-button></li>
        </ul>
      </div>
    </div>
    <div class="bottom" :style="{backgroundImage: 'url(' + ARImgUrl + ')', backgroundSize:'cover'}">

      <div class="mainBox">
        <div class="changeMenu">
          <el-carousel :autoplay="false" type="card" height="100px" indicator-position="none" arrow="never" @change="imgChange">
            <el-carousel-item v-for="(item,index) in imgList" :key="index">
              <img :src="item.imgUrl" alt=""  :id="item.id">
            </el-carousel-item>
          </el-carousel>
        </div>
        <router-view :searchVal="searchVal" :deviceOnNum="onNum" :deviceTotalNum = 'totalNum' :deptName="deptNameVal" :defaultDeptName="defaultName"/>
      </div>
    </div>
  </div>


</template>

<script>
  import LivePlayer from '@liveqing/liveplayer'
import to from "await-to-js";
import ARImgUrl from '../assets/images/AR/bg.png'
import ARimg from '../assets/images/AR/AR.png'
import MAPimg from '../assets/images/AR/map.png'
import LINKimg from '../assets/images/AR/link.png'
import ARimgH from '../assets/images/AR/AR-xz.png'
import MAPimgH from '../assets/images/AR/map-xz.png'
import LINKimgH from '../assets/images/AR/link-xz.png'
import {clearLoginInfo} from '@/utils/util'
export default {
  data(){
    return {
      objTitle:{},
      hiddenUrl:'',
      weatherData: [],
      weatherImg:'',
      weatherDataInfo:'',
      weatherDataTem:'',
        platUrl:'',
        userName:'',
        ARImgUrl,
        year:'',
        month:'',
        day:'',
        hour:'',
        minute:'',
        second:'',
        week:'',
      imgList:[
        //{id:0,imgUrl:LINKimg,imgHover:LINKimgH,path:'/linkPage'},
        {id:2,imgUrl:ARimg,imgHover:ARimgH,path:'/ARPage'},
        {id:1,imgUrl:MAPimg,imgHover:MAPimgH,path:'/mapPage'},
        {id:0,imgUrl:LINKimg,imgHover:LINKimgH,path:'/linkPage'}
      ],
      options:[],
      searchVal: '',
      onNum:'',
      totalNum:'',
      deptNameVal:'',
      defaultName:'',
      chineseName:'',
      englishName:'',
    }
  },
  components:{
    LivePlayer
  },
    created() {
      console.log(this.$route.query.chineseName,'mzlmzl')
      this.objTitle = this.$global.objTitle
      console.log(this.objTitle,'this.objTitle')
      this.getWeather()
        this.getDevice()
        this.timer = setInterval(this.getDateTime, 1000);
        this.getUserInfo()
        this.getInfo()
        this.getDeviceData()
        this.getTreeList()      //部门
        this.platUrl = this.$global.platUrl
    },
  mounted(){
    this.objTitle = this.$global.objTitle
    console.log(this.objTitle,'this.objTitle')
    this.getDateTime()
    this.imgChange(0)

  },
  methods:{
    async getInfo(){
      let [err, res] = await to(this.$api.login.getSetting())
      if (err) return
      document.title= res.data.data.chineseName
      this.chineseName= res.data.data.chineseName
      this.englishName= res.data.data.englishName
    },
      //获取天气数据
    async getWeather () {
      var result = await this.$http.get('/weather?version=v1&appid=25612266&appsecret=bgy1eEo6&cityid='+'101110101')
      console.log(result,'result');
      this.weatherDataTem = result.data.data[0].tem;
      this.weatherDataInfo = result.data.data[0].wea;
      // this.weatherImg = 'http://tq.daodaoim.com//tianqiapi/skin/pitaya/' + result.data.data[0].wea_img + '.png';
      this.weatherImg = 'https://xintai.xianguomall.com/skin/pitaya/' + result.data.data[0].wea_img + '.png';
    },
      /**在线设备*/
      getDeviceData(){
        var onNum = [],totalNum = [];
        this.$http.get('/xpi/video-origins',{
                  auth: {
                    username: 'root',
                    password: 'root'
                  }
                }
        ).then((response) => {
          if (response.data) {
            var list = response.data;
            for(var i in list){
              totalNum.push(list[i])
              if(list[i].state !== 'signal_lost'){
                onNum.push(i)
              }
            }
            this.onNum = onNum.length;
            this.totalNum = totalNum.length;
          }
        })
      },
      /**退出登录*/
      async logoutHandle(){
        let data = {};
        let [err, res] = await to( this.$api.login.getLoginOut(data));
        if (err) return;
        clearLoginInfo()
        this.$router.push({name: 'login'})
        console.log(res,'res');
      },
      /**小区切换*/
      deptChange(val){
        this.searchVal = val;
        this.options.map(item=>{
           if(this.searchVal == item.deptId){
             this.deptNameVal = item.deptName
           }
         })
        console.log(this.deptNameVal,'this.deptNameValthis.deptNameVal  q');
      },
      /*获取当前时间*/
      getDateTime(){
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const hour= date.getHours();
          const minute = date.getMinutes();
          const second = date.getSeconds();
          this.week = "日一二三四五六".charAt(date.getDay())
          this.year = year
          this.month=check(month);
          this.day=check(day);
          this.hour=check(hour);
          this.minute=check(minute);
          this.second=check(second);
          function check(i){
              const num = (i<10)?("0"+i) : i;
              return num;
          }
          /*this.nowDate = this.year + "年" + this.month + "月" + this.day+"日";
          this.nowTime = this.hour + ":" + this.minute + ":" + this.second ;*/
      },
      imgChange(val){
        this.imgList.map((item,index)=>{
          let img = document.getElementById(item.id)
           if(val == index){
             img.src = item.imgHover
             this.$router.push(item.path)
           }else{
             img.src= item.imgUrl
           }
        })
      },
      //获取用户信息
      async getUserInfo(){
        let [err, res] = await to(
                this.$api.login.getLoginUser()
        );
        if (err) return;
        console.log(res,'登录信息');
        if(res.data.code == 402){
          this.$router.push({name:'/login'})
        }
        this.userName = res.data.loginUser.user.nickName;
      },
      //获取用户所能管理的部门列表
      async getTreeList(){
        let [err, res] = await to(this.$api.login.getTree());
        if (err) return;
        this.options = res.data.data;
        this.deptChange(this.options[0])
        console.log(this.options,'this.options');
        this.searchVal = this.options[0].deptId;
        this.defaultName = this.options[0].deptName;
        this.$cookie.set('deptId', this.searchVal)
      },
      /**获取设备列表*/
      getDevice() {
      this.$http.get('/xpi/camera/list', {
                auth: {
                  username: 'root',
                  password: 'root'
                }
              }
      ).then((response) => {
        if (response.data) {
          this.hiddenUrl = 'http://' + this.$global.userName + ':' + this.$global.passWord + '@' + this.$global.deviceUrl + '/hosts'
          // var file = response.data.cameras[0].archives[0].accessPoint.slice(6)
          // this.hiddenUrl = 'http://' + this.$global.userName + ':' + this.$global.passWord + '@' + this.$global.deviceUrl + '/live/media/' + file + '?format=mp4'
          console.log(this.hiddenUrl,'ddddddddddddd');
        }
      })
    },
  }
}

</script>
<style>
.mainBox{
  position:relative;
  z-index:0;
  width:100%;
  height:100vh;
  bottom:0px;
  background-size:100%;
  background-color:#000;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

</style>
