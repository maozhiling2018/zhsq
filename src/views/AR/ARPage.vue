<template>
    <div class="ARPage"  @click="touchstart">
       <div class="bottom" :style="{backgroundImage: 'url(' + ARBgUrl + ')', backgroundSize:'cover'}">
           <div class="alertBox">
               <ul>
                   <li @click="faceHandle"><span class="imgBox"><img src="../../assets/images/AR/face.png" alt=""></span><span class="text">人脸识别</span></li>
                   <li @click="carHandle"><span class="imgBox"><img src="../../assets/images/AR/plate.png" alt=""></span><span class="text">车牌识别</span></li>
                   <li @click="alertHandle"><span class="imgBox"><img src="../../assets/images/AR/warning.png" alt=""></span><span class="text">实时预警</span><span class="alertNum">{{homeData.totalPolice}}</span></li>
                   <li @click="heatHandle"><span class="imgBox"><img src="../../assets/images/AR/heatPoint.png" alt=""></span><span class="text">热点采集</span></li>
               </ul>
           </div>
           <div class="ARleft">
               <!--设备在线-->
               <transition name="el-zoom-in-center">
                   <div class="deviceBox" v-if="deviceShow">
                       <div class="titleBtn titleFont" @click="deviceShow =!deviceShow"><span>设备在线</span></div>
                       <div class="content">
                           <el-row :gutter="10">
                               <el-col :span="12" class="titleFile">总数</el-col>
                               <el-col :span="12" class="number">{{deviceTotalNum}}</el-col>
                           </el-row>
                           <el-row :gutter="10">
                               <el-col :span="12" class="titleFile">在线</el-col>
                               <el-col :span="12" class="number">{{deviceOnNum}}</el-col>
                           </el-row>
                       </div>
                   </div>
               </transition>
               <transition name="el-zoom-in-center">
                   <div class="deviceFoldBox" v-if="!deviceShow">
                       <div class="titleBtn titleFont" @click="deviceShow =!deviceShow"><span>设备在线</span></div>
                   </div>
               </transition>
               <!--档案-->
               <transition name="el-zoom-in-center">
                   <div class="recordBox" v-if="recordShow">
                       <div class="titleBtn titleFont" @click="recordShow =!recordShow"><span>档案</span></div>
                       <div class="content">
                           <ul>
                               <li @click="peopleRecordHandle">
                                   <div class="leftImg"><img src="../../assets/images/AR/recordIcon1.png" alt=""></div>
                                   <div class="rightNum">
                                       <span class="number">{{homeData.totalPopulation}}</span>
                                       <span class="text">一人一档</span>
                                   </div>
                               </li>
                               <li @click="carRecordHandle">
                                   <div class="leftImg"><img src="../../assets/images/AR/recordIcon2.png" alt=""></div>
                                   <div class="rightNum">
                                       <span class="number">{{homeData.totalVehicles}}</span>
                                       <span class="text">一车一档</span>
                                   </div>
                               </li>
                               <li @click="firmRecordHandle">
                                   <div class="leftImg"><img src="../../assets/images/AR/recordIcon3.png" alt=""></div>
                                   <div class="rightNum">
                                       <span class="number">{{homeData.totalEnterprises}}</span>
                                       <span class="text">一企一档</span>
                                   </div>
                               </li>
                           </ul>
                       </div>
                   </div>
               </transition>
               <transition name="el-zoom-in-center">
                   <div class="recordFoldBox" v-if="!recordShow">
                       <div class="titleBtn titleFont" @click="recordShow =!recordShow"><span>档案</span></div>
                   </div>
               </transition>
               <!--智慧服务-->
               <transition name="el-zoom-in-center">
                   <div class="serviceBox" v-if="serviceShow">
                           <div class="titleBtn titleFont" @click="serviceShow =!serviceShow">智慧服务</div>
                           <div class="content">
                           <ul>
                               <li @click="guardHandle">
                                   <div class="leftIcon"><img src="../../assets/images/AR/serviceIcon1.png" alt=""></div>
                                   <div class="rightText">
                                       <span class="chinese">智慧保安</span>
                                       <span class="english">INTELLIGENT SECURITY</span>
                                   </div>
                               </li>
                               <li @click="contingencyHandle">
                                   <div class="leftIcon"><img src="../../assets/images/AR/serviceIcon2.png" alt=""></div>
                                   <div class="rightText">
                                       <span class="chinese">应急预案</span>
                                       <span class="english">INTELLIGENT SECURITY</span>
                                   </div>
                               </li>
                               <li @click="tenantHandle">
                                   <div class="leftIcon"><img src="../../assets/images/AR/serviceIcon3.png" alt=""></div>
                                   <div class="rightText">
                                       <span class="chinese">租客信息</span>
                                       <span class="english">INTELLIGENT SECURITY</span>
                                   </div>
                               </li>
                               <li @click="visitorHandle">
                                   <div class="leftIcon"><img src="../../assets/images/AR/serviceIcon4.png" alt=""></div>
                                   <div class="rightText">
                                       <span class="chinese">访客信息</span>
                                       <span class="english">INTELLIGENT SECURITY</span>
                                   </div>
                               </li>
                               <li @click="tenPowerHandle">
                                   <div class="leftIcon"><img src="../../assets/images/AR/serviceIcon5.png" alt=""></div>
                                   <div class="rightText">
                                       <span class="chinese">十种力量</span>
                                       <span class="english">INTELLIGENT SECURITY</span>
                                   </div>
                               </li>
                           </ul>
                       </div> </div>
               </transition>
               <transition name="el-zoom-in-center">
                   <div class="serviceFoldBox" v-if="!serviceShow">
                       <div class="titleBtn titleFont" @click="serviceShow = !serviceShow">智慧服务</div>
                   </div>
               </transition>
           </div>
           <div class="ARright">
               <!--统计-->
               <transition name="el-zoom-in-center">
                   <div class="statisticsBox" v-if="statisticsShow" >
                       <div class="titleBtn titleFont" @click="statisticsShow = !statisticsShow"><span>统计</span></div>
                       <div class="chartItemBox">
                           <div class="statisticTitle">
                               <ul>
                                   <li><img src="../../assets/images/AR/left-icon.png" alt=""></li>
                                   <li class="titleText">车辆通行统计</li>
                                   <li><img src="../../assets/images/AR/right-icon.png" alt=""></li>
                               </ul>
                           </div>
                           <div class="statisticCon">
                               <div id="chartBar" class="chartBox"></div>
                           </div>
                       </div>
                       <div class="chartItemBox">
                           <div class="statisticTitle">
                               <ul>
                                   <li><img src="../../assets/images/AR/left-icon.png" alt=""></li>
                                   <li class="titleText">人脸抓拍统计</li>
                                   <li><img src="../../assets/images/AR/right-icon.png" alt=""></li>
                               </ul>
                           </div>
                           <div class="statisticCon">
                               <div id="chartLine" class="chartBox"></div>
                           </div>
                       </div>
                       <div class="chartItemBox">
                           <div class="statisticTitle">
                               <ul>
                                   <li><img src="../../assets/images/AR/left-icon.png" alt=""></li>
                                   <li class="titleText">报警统计</li>
                                   <li><img src="../../assets/images/AR/right-icon.png" alt=""></li>
                               </ul>
                           </div>
                           <div class="statisticCon">
                               <div id="chartLine1" class="chartBox"></div>
                           </div>
                       </div>
                   </div>
               </transition>
               <transition name="el-zoom-in-center">
                   <div class="statisticsFoldBox" v-if="!statisticsShow">
                       <div class="titleBtn titleFont" @click="statisticsShow = !statisticsShow"><span>统计</span></div>
                   </div>
               </transition>
               <!--设备管理-->
               <transition name="el-zoom-in-center">
                   <div class="deviceManage" v-if="deviceManageShow">
                       <div class="titleBtn titleFont" @click="deviceManageShow = !deviceManageShow"><span>设备管理</span></div>
                       <div class="content">
                           <ul>
                               <li @click="faceDeviceHandle">
                                   <div class="leftIcon"><img src="../../assets/images/AR/deviceManager1.png" alt=""></div>
                                   <div class="rightText">
                                       <span class="chinese">人脸设备</span>
                                       <span class="english">INTELLIGENT SECURITY</span>
                                   </div>
                               </li>
                               <li @click="carDeviceHandle">
                                   <div class="leftIcon"><img src="../../assets/images/AR/deviceManager2.png" alt=""></div>
                                   <div class="rightText">
                                       <span class="chinese">车牌设备</span>
                                       <span class="english">INTELLIGENT SECURITY</span>
                                   </div>
                               </li>
                               <li @click="doorDeviceHandle">
                                   <div class="leftIcon"><img src="../../assets/images/AR/deviceManager3.png" alt=""></div>
                                   <div class="rightText">
                                       <span class="chinese">门禁设备</span>
                                       <span class="english">INTELLIGENT SECURITY</span>
                                   </div>
                               </li>
                               <li @click="monitorDeviceHandle">
                                   <div class="leftIcon"><img src="../../assets/images/AR/deviceManager4.png" alt=""></div>
                                   <div class="rightText">
                                       <span class="chinese">监控设备</span>
                                       <span class="english">INTELLIGENT SECURITY</span>
                                   </div>
                               </li>
                           </ul>
                       </div>
                   </div>
               </transition>
               <transition name="el-zoom-in-center">
                   <div class="deviceManageFold" v-if="!deviceManageShow">
                       <div class="titleBtn titleFont" @click="deviceManageShow = !deviceManageShow"><span>设备管理</span></div>
                   </div>
               </transition>
           </div>
       </div>
        <!--人脸识别-->
        <face-page v-show="facePageVisible" ref="facePage" :key="timer"></face-page>
        <!--热点采集-->
        <heat-page v-if="heatPageVisible" ref="heatPage" :key="timer"></heat-page>
        <!--车牌识别-->
        <car-page v-if="carPageVisible" ref="carPage"></car-page>
        <!--实时预警-->
        <alert-page v-if="alertPageVisible" ref="alertPage"></alert-page>
        <!--一人一档-->
        <people-record v-if="peopleRecordVisible" ref="peopleRecord"></people-record>
        <!--一车一档-->
        <car-record v-if="carRecordVisible" ref="carRecord"></car-record>
        <!--一企一档-->
        <firm-record v-if="firmRecordVisible" ref="firmRecord"></firm-record>
        <!--十种力量-->
        <ten-power v-if="tenPowerVisible" ref="tenPower"></ten-power>
        <!--智慧保安-->
        <guard-page v-if="guardPageVisible" ref="guardPage"></guard-page>
        <!--访客信息-->
        <visitor-device v-if="visitorDeviceVisible" ref="visitorDevice"></visitor-device>
        <!--租客信息-->
        <tenant-device v-if="tenantDeviceVisible" ref="tenantDevice"></tenant-device>
        <!--应急预案-->
        <contingency-device v-if="contingencyDeviceVisible" ref="contingencyDevice"></contingency-device>
        <!--监控设备-->
        <monitor-device v-if="monitorDeviceVisible" ref="monitorDevice"></monitor-device>
        <!--门禁设备-->
        <door-device v-if="doorDeviceVisible" ref="doorDevice"></door-device>
        <!--人脸设备-->
        <face-device v-if="faceDeviceVisible" ref="faceDevice"></face-device>
        <!--车辆设备-->
        <car-device v-if="carDeviceVisible" ref="carDevice"></car-device>
    </div>
</template>

<script>
    import ARImgUrl from '../../assets/images/AR/bg.png'
    import FacePage from './facePage'
    import HeatPage from './heatPage'
    import CarPage from './carPage'
    import AlertPage from './alertPage'
    import PeopleRecord from './peopleRecord'
    import CarRecord from './carRecord'
    import FirmRecord from './firmRecord'
    import MonitorDevice from './monitorDevice'
    import TenPower from './tenPowerPage'
    import VisitorDevice from './visitorDevicePage'
    import TenantDevice from './tenantDevicePage'
    import GuardPage from './guardPage'
    import ContingencyDevice from './contingencyPage'
    import DoorDevice from './doorDevice'
    import CarDevice from './carDevice'
    import FaceDevice from './faceDevice'
    import to from "await-to-js";
    export default {
        data(){
           return{
               token:'',
               ARBgUrl:'',
               ARImgUrl,
               deviceShow:false,  //设备在线动画
               serviceShow:false,  //智慧服务动画
               deviceManageShow:false,  //设备管理动画
               statisticsShow:true,  //统计动画
               recordShow:true,  //档案动画
               chartBar: null,  //车辆通行统计
               chartLine: null,  //住户通行统计
               chartLine1: null,  //报警预案统计
               year:'',
               month:'',
               day:'',
               hour:'',
               minute:'',
               second:'',
               week:'',
               nowDate:null,    //存放年月日变量
               nowTime:null,   //存放时分秒变量
               timer: "",           //定义一个定时器的变量
               currentTime: new Date(),       // 获取当前时间
               facePageVisible:false,   //人脸识别
               heatPageVisible:false,   //人脸识别
               carPageVisible:false,   //车牌识别
               alertPageVisible:false,   //实时预警
               peopleRecordVisible:false,  //一人一档
               carRecordVisible:false,  //一车一档
               firmRecordVisible:false,  //一企一档
               monitorDeviceVisible:false, //监控设备
               tenPowerVisible:false, //十种力量
               visitorDeviceVisible:false, //访客信息
               tenantDeviceVisible:false, //租客信息
               guardPageVisible:false, //智慧保安
               contingencyDeviceVisible:false, //应急预案
               doorDeviceVisible:false, //门禁设备
               carDeviceVisible:false, //车辆设备
               faceDeviceVisible:false, //人脸设备
               homeData:{
                   totalPopulation:'',  //人员总数
                   totalVehicles:'',  //车辆总数
                   totalEnterprises:'',  //企业总数
                   totalOwners:'',  //业主总数
                   totalTenants:'',  //租户总数
                   totalPlans:'',  //预案总数
                   totalPolice:'',  //预警总数
               },
               deptId:'',
               deptText:'',
               defaultName:'',

           }
       },
        created() {
            this.getDeviceData()
            this.token = this.$cookie.get('token')
            this.deptId = this.$cookie.get('deptId')
            if(this.deptId && this.deptId !==null){
                this.getCommuniteInfo()
                this.getCarData()
                this.getResidentData()
                this.getAlertData()
                this.getIndexData()
                this.$nextTick(()=>{
                    this.initChartBar()
                    this.initChartLine()
                    this.initChartLine1()
                })

            }
        },
        components:{
            FacePage,
            CarPage,
            AlertPage,
            PeopleRecord,
            CarRecord,
            FirmRecord,
            MonitorDevice,
            TenPower,
            VisitorDevice,
            TenantDevice,
            GuardPage,
            ContingencyDevice,
            DoorDevice,
            CarDevice,
            FaceDevice,
            HeatPage
        },
        props: ['searchVal','deviceOnNum','deviceTotalNum','deptName','defaultDeptName'],
        watch:{
            statisticsShow(newVal,oldVal){
                console.log(newVal, oldVal,'newVal,oldVal');
                if(newVal !==oldVal){
                    this.$nextTick(()=>{
                        this.getCarData()
                        this.getResidentData()
                        this.getAlertData()
                    })
                }
            },
            searchVal(newVal,oldVal){
                if(newVal!==oldVal){
                    this.deptId = newVal;
                    this.getCommuniteInfo()
                    this.getCarData()
                    this.getResidentData()
                    this.getAlertData()
                    this.getIndexData()
                    this.eventbus.$emit('changeVal',this.deptId)
                }
               // this.peopleRecordHandle()
            },
            deptName(newVal,oldVal){
               if(newVal !==oldVal){
                   console.log(newVal,'newVal');
                   this.defaultName = newVal
                   this.eventbus.$emit('deptNameText',newVal)
               }
            },
            defaultDeptName(newVal,oldVal){
               if(newVal !==oldVal){
                   console.log(newVal,'newVal');
                   this.defaultName = newVal
                   this.eventbus.$emit('defaultDeptName',newVal)
               }
            },
        },
        activated () {
            // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
            if (this.chartBar) {
                this.chartBar.resize()
            }
            if (this.chartLine) {
                this.chartLine.resize()
            }
            if (this.chartLine1) {
                this.chartLine1.resize()
            }
        },
        methods:{
            // 当鼠标点击时触发，类似onclick事件
            touchstart(e) {
                console.log(e,'touchstart')
            },
            /**在线设备*/
            getDeviceData(){
                this.$http.get('/xpi/video-origins',{
                        auth: {
                            username: 'root',
                            password: 'root'
                        }
                    }
                ).then((response) => {
                    if (response.data) {}
                })
            },
            /*AR背景图*/
            async getCommuniteInfo(){
                let data = {deptId:this.deptId};
                let [err, res] = await to(
                    this.$api.AR.getCommuniteInfo(data)
                );
                if (err) return;
                if(res.data.code == 200){
                    if(res.data.data.background !==null){
                        this.ARBgUrl = res.data.data.background
                    }else{
                        this.ARBgUrl = this.ARImgUrl;
                    }

                }else{
                    this.$message.warning(res.data.msg)
                }
            },
            /*获取车辆通行数据*/
            async getCarData(){
                let data = {community:this.deptId};
                let [err, res] = await to(
                    this.$api.AR.getVehicleData(data)
                );
                if (err) return;
                if(res.data.code == 200){
                    var nameArr = [],dataArr = []
                    res.data.data.map(item=>{
                        nameArr.push(item.cameraName)
                        dataArr.push(item.cout)
                    })
                    this.initChartBar(nameArr,dataArr)
                }else{
                    this.$message.warning(res.data.msg)
                }
            },
            /*获取住户通行数据*/
            async getResidentData(){
                let data = {
                    deptId:this.deptId
                };
                let [err, res] = await to(
                    this.$api.AR.getpeopleData(data)
                );
                if (err) return;
                if(res.data.code == 200){
                   var chartData = [];
                   for(var i in res.data.data){
                       chartData.push(res.data.data[i])
                   }
                   this.initChartLine(chartData)
                }else{
                    this.$message.warning(res.data.msg)
                }
            },
            /*获取报警预案数据*/
            async getAlertData(){
                let data = {community:this.deptId};
                let [err, res] = await to(
                    this.$api.AR.getAlertData(data)
                );
                if (err) return;
                if(res.data.code == 200){
                    var chartData = [];
                    for(var i in res.data.data){
                        chartData.push(res.data.data[i])
                    }
                    this.initChartLine1(chartData)
                }else{
                    this.$message.warning(res.data.msg)
                }
            },
            //获取首页数据
            async getIndexData(){
                let data = {
                    deptId:this.deptId
                }
                let [err, res] = await to(this.$api.AR.getIndexData(data));
                if (err) return;
                if(res.data.code == 200){
                     this.homeData = res.data.HomePageStatistics;
                }else{
                    this.$message.warning(res.data.msg)
                }
            },
            /*一人一档*/
            peopleRecordHandle(){
              // this.timer = new Date().getTime()
               this.peopleRecordVisible = true;
               this.$nextTick(()=>{
                   this.$refs.peopleRecord.init(this.deptId)
               })
            },
            /*一车一档*/
            carRecordHandle(){
                this.carRecordVisible = true;
                this.$nextTick(()=>{
                    this.$refs.carRecord.init(this.deptId)
                })
            },
            /*一企一档*/
           firmRecordHandle(){
               this.firmRecordVisible = true;
               this.$nextTick(()=>{
                   this.$refs.firmRecord.init(this.deptId)
               })
           },
            /*车辆通行统计*/
            initChartBar(name,data) {
                var option = {
                    color: ['#0263FF'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top:'5%',
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            height: 10,
                            left: '10%',
                            right: '10%',
                            bottom: '5%',
                            start: 20,
                            end: 80,
                            textStyle: {
                                color: '#16DADE',
                                fontSize: 11,
                            },
                            backgroundColor:'rgba(2,96,171,0.5)',
                            dataBackground:{
                                lineStyle:{
                                    color:'#fff9c1',
                                    width:1
                                }
                            },
                            fillerColor:'rgba(22,218,222,0.7)',
                            borderColor: 'rgba(53,204,251,0.9)',
                            //handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                            handleSize: '80%',
                            handleStyle: {
                                color: '#a0f1fb',
                                shadowBlur: 3,
                                shadowColor: 'rgba(0, 0, 0, 0.6)',
                                shadowOffsetX: 2,
                                shadowOffsetY: 2
                            },
                        },
                        {type: 'inside'}
                    ],
                    xAxis: [
                        {
                            type: 'category',
                            // data: ['设备一', '设备二', '设备三', '设备四', '设备五', '设备六'],
                            data: name,
                            axisTick: {
                                alignWithLabel: true,
                                lineStyle:{
                                    type:'dashed',
                                    color:'#16DADE'
                                }
                            },
                            axisLabel:{
                                color:'#16DADE',
                                interval:0
                            },
                            axisLine:{
                                lineStyle:{
                                    width:.5,
                                    type:'dashed',
                                    color:'#16DADE'
                                }
                            },
                            splitLine:{
                                lineStyle:{
                                    type:'dashed',
                                    color:'#16DADE'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel:{
                                color:'#16DADE'
                            },
                            splitLine:{
                                lineStyle:{
                                    width:.5,
                                    type:'dashed',
                                    color:'#16DADE'
                                }
                            },
                            axisLine:{
                                show:false
                            }
                        },

                    ],
                    series: [
                        {
                            name: '车流量抓拍数量',
                            type: 'bar',
                            barWidth: '17px',
                            // data: [10, 52, 200, 334, 590, 330]
                            data:data
                        }
                    ]
                };
                this.chartBar = this.$echarts.init(document.getElementById('chartBar'))
                this.chartBar.setOption(option)
                window.addEventListener('resize', () => {
                    this.chartBar.resize()
                })
            },
            /*住户通行统计*/
            initChartLine (data) {
                var xData = ["0~4", "4~8", "8~12", "12~16", "16~20", "20~24"];
                var yData1 = data;
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        top:'5%',
                        left: '3%',
                        right: '10%',
                        bottom: '20%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: xData,
                        name: '点',
                        nameTextStyle: {
                            color: '#16DADE'
                        },
                        axisLine: {
                            show:false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#16DADE",
                                fontSize: 12,
                            },
                             interval:0,
                             //rotate:45
                        },
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '点',
                        nameTextStyle: {
                            color: '#16DADE'
                        },
                        position: 'left',
                        axisLine: {
                            show:false
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#16DADE",
                                type:'dashed',
                                width:'.5'
                            }

                        },
                        axisLabel: {
                            color: '#16DADE',
                            fontSize: 12,
                        }
                    }, ],
                    series: [{
                        name: '抓拍数量',
                        type: 'line',
                        yAxisIndex: 0,
                        symbolSize: 6,
                        itemStyle: {
                            normal: {
                                color: '#0e9cff',
                            }
                        },
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(2, 99, 255,.4)'
                            }, {
                                offset: 1,
                                color: 'rgb(14, 156, 256,.4)'
                            }])
                        },
                        data: yData1
                    }

                    ]
                };

                this.chartLine = this.$echarts.init(document.getElementById('chartLine'))
                this.chartLine.setOption(option)
                window.addEventListener('resize', () => {
                    this.chartLine.resize()
                })
            },
            /*报警预案统计*/
            initChartLine1(data) {
                console.log(data,'报警预案统计')
                //数据
                var XName= ["0~4","4~8","8~12","12~16","16~20","20~24"]
                var data1 = [data]
                var Line = ["报警数量"];

                var color =['#00f15a','#0696f9','#dcf776'];

//数据处理
                var datas = [];
                Line.map((item,index)=>{
                    datas.push(
                        {
                            symbolSize: 10,
                            symbol: 'circle',
                            name: item,
                            type: "line",
                            yAxisIndex: 1,
                            data: data1[index] ,
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    color: color[index],
                                }
                            }
                        }
                    )
                })
                var option1 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        left: '11%',
                        top: '5%',
                        bottom: '15%',
                        right: '10%',
                    },

                    yAxis: [
                        {
                            type: 'value',
                            position: 'right',
                            splitLine: {
                                show: false
                            }
                            ,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            }
                        },
                        {
                            type: 'value',
                            position: 'left',
                            nameTextStyle: {
                                color: '#00FFFF'
                            },
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                    width:.5,
                                    color: '#16DADE'
                                }
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                formatter: '{value}',
                                color: '#16DADE',
                                fontSize: 12
                            }
                        },
                    ],
                    xAxis: [
                        {
                            type: 'category',
                            name:'点',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#16DADE',
                                }
                            },
                            axisLabel: {
                                inside: false,
                                interval:0,
                                textStyle: {
                                    color: '#16DADE',// x轴颜色
                                    fontWeight: 'normal',
                                    fontSize: '11',
                                    lineHeight: 22
                                }

                            },
                            data: XName,
                        },
                        {
                            type: 'category',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                interval:0,
                            },
                            splitArea: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            //-----
                            data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                        },
                    ],
                    series: datas,
                };

                this.chartLine1 = this.$echarts.init(document.getElementById('chartLine1'))
                this.chartLine1.setOption(option1)
                window.addEventListener('resize', () => {
                    this.chartLine1.resize()
                })
            },
            /*人脸识别*/
            faceHandle(){
                this.facePageVisible = true;
                this.$nextTick(()=>{
                    this.$refs.facePage.init(this.deptId)
                })
            },
            /*热点采集*/
            heatHandle(){
                this.heatPageVisible = true;
                this.$nextTick(()=>{
                    this.$refs.heatPage.init(this.deptId)
                })
            },
            /*车辆识别*/
            carHandle(){
                this.carPageVisible = true;
                this.$nextTick(()=>{
                    this.$refs.carPage.init(this.deptId)
                })
            },
            /*实时预警*/
            alertHandle(){
                this.alertPageVisible = true;
                this.$nextTick(()=>{
                    this.$refs.alertPage.init(this.deptId)
                })
            },
            /*监控设备*/
            monitorDeviceHandle(){
                this.monitorDeviceVisible = true;
                this.$nextTick(()=>{
                    this.$refs.monitorDevice.init(this.deptId, this.defaultName)
                })
            },
            /*十种力量*/
            tenPowerHandle(){
                this.tenPowerVisible = true;
                this.$nextTick(()=>{
                    this.$refs.tenPower.init(this.deptId)
                })
            },
            /*访客信息*/
            visitorHandle(){
                this.visitorDeviceVisible = true;
                this.$nextTick(()=>{
                    this.$refs.visitorDevice.init(this.deptId)
                })
            },
            /*租客信息*/
            tenantHandle(){
                this.tenantDeviceVisible = true;
                this.$nextTick(()=>{
                    this.$refs.tenantDevice.init(this.deptId)
                })
            },
            /*应急预案*/
            contingencyHandle(){
                this.contingencyDeviceVisible = true;
                this.$nextTick(()=>{
                    this.$refs.contingencyDevice.init(this.deptId)
                })
            },
            /*智慧保安*/
            guardHandle(){
                this.guardPageVisible = true;
                this.$nextTick(()=>{
                    this.$refs.guardPage.init(this.deptId)
                })
            },
            /*人脸设备*/
            faceDeviceHandle(){
                this.faceDeviceVisible = true;
                this.$nextTick(()=>{
                    this.$refs.faceDevice.init(this.deptId)
                })
            },
            /*车辆设备*/
            carDeviceHandle(){
                this.carDeviceVisible = true;
                this.$nextTick(()=>{
                    this.$refs.carDevice.init(this.deptId)
                })
            },
            /*门禁设备*/
            doorDeviceHandle(){
                this.doorDeviceVisible = true;
                this.$nextTick(()=>{
                    this.$refs.doorDevice.init(this.deptId)
                })
            },
        }
    }
</script>

<style lang="scss">
.alertNum{
    position: absolute;
    top:10px;
    color:#333;
    background:#FFDB44;
    width:30px;
    height:30px;
    border-radius:50%;
    text-align: center;
    line-height:30px;
}
</style>
