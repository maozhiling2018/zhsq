<template>
    <div class="mapPage">
        <baidu-map class="bm-view" :center="center" :zoom='zoom' :scroll-wheel-zoom='true' @ready="handler">
            <bm-polygon :path="polygonPath" stroke-color="#FFDB44" fillColor="" :stroke-opacity="1" :stroke-weight="2"
                        :editing="false" @lineupdate="updatePolygonPath"/>
            <bm-marker :position="searchPosition" :dragging="true" @click="centerHandle">
            </bm-marker>
<!--            <bm-label v-for="(marker, i) of points" :key="i" @mousemove="bmLabel(marker)" :content="marker.content" :position="{lng: marker.lng, lat: marker.lat}" :labelStyle="{color: 'red', fontSize : '24px'}" title="Hover me"/>-->

            <bml-marker-clusterer :averageCenter="true" @draw="draw" >
                <div v-for="(marker, i) of points" :key="i">
                    <bm-marker
                            :dragging="false"
                            :icon="{url: marker.url, size: { width: 80, height: 73 }}"
                            :position="{lng: marker.lng, lat: marker.lat}"
                            @click="infoWindowOpen(marker)">
                    </bm-marker>
                </div>
            </bml-marker-clusterer>
            <bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false" :location="location"></bm-local-search>
        </baidu-map>
        <!--统计-->
        <transition name="el-zoom-in-center">
            <div class="statisticsBox" v-if="statisticsShow">
                <div class="titleBtn titleFont" @click="statisticsShow = !statisticsShow"><span>统计</span></div>
                <div class="content">
                    <ul>
                        <li v-for="(item,index) in dataList" :key="index">
                            <div class="leftIcon"><img :src="item.iconUrl" alt=""></div>
                            <div class="rightData">
                                <span class="number">{{item.number}}</span>
                                <span class="name">{{item.name}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="el-zoom-in-center">
            <div class="statisticsFoldBox" v-if="!statisticsShow">
                <div class="titleBtn titleFont" @click="statisticsShow = !statisticsShow"><span>统计</span></div>
            </div>
        </transition>
        <!--底部按钮-->
        <div class="bottomBtn">
            <i class="el-icon-arrow-down" v-if="bottomUnfoldShow" @click="bottomUnfoldShow = !bottomUnfoldShow"></i>
            <i class="el-icon-arrow-up" v-if="!bottomUnfoldShow" @click="bottomUnfoldShow= !bottomUnfoldShow"></i>
        </div>
        <transition name="el-collapse-transition" v-if="!bottomUnfoldShow">
            <div class="bottomTab">
                <ul>
                    <li  @click="alertHandle"><span><img src="../../assets/images/map/bjIcon.png" alt=""></span><span>报警</span></li>
                    <li @click="cropImgHandle"><span><img src="../../assets/images/map/zpIcon.png" alt=""></span><span>抓拍</span></li>
                    <li @click="contingencyHandle"><span><img src="../../assets/images/map/yaIcon.png" alt=""></span><span>预案</span></li>
                </ul>
            </div>
        </transition>
        <!--搜索框-->
        <div class="searchBox">
            <el-input v-model="keyword" size="small"></el-input>
            <el-button class="mapSearch" size="small">关键字搜索</el-button>
        </div>
        <!--摄像头弹层-->
        <div  :style="{left:item.lng+'px',top:100+item.lat +'px',position:'absolute',cursor:'pointer'}" v-drag="false"
             id="dragBtn1"  v-for="(item,index) in points" :key="index"  v-show="item.propVisible">
            <div class="contentBox"  :id="'contentDivA'+index">
                <div class="closeIcon"><i class="el-icon-circle-close" @click="handleClose(item)"></i></div>
                <el-button type="delete" size="mini" class="videoBtn" @click="backVideo(item)">
                    {{item.liveShow==false?'回放':'直播'}}
                </el-button>
                <div @click="screen(index)" class="screenBox"><img src="../../assets/images/link/fullscreen.png" alt=""></div>
                <div v-if="!item.liveShow" style="width:100%;height:100%;">
                    <img :src="beforeUrl+item.videoUrl" class="imgVideo">
                    <div class="ballPtz_small" v-if="item.identification !='1'">
                        <div class="commandBox">
                            <div class="yLeft" @click="leftHandle_s(item.ptzs,item)" @mouseleave="item.activeFlagL=false"><img :src="item.activeFlagL?yLeftH:yLeft" alt=""></div>
                            <div class="yRight" @click="rightHandle_s(item.ptzs,item)" @mouseleave="item.activeFlagR=false"><img :src="item.activeFlagR?yRightH:yRight" alt="">
                            </div>
                            <div class="yCenter"><img src="../../assets/images/link/y_center.png" alt=""></div>
                            <div class="yBottom" @click="bottomHandle_s(item.ptzs,item)" @mouseleave="item.activeFlagB=false"><img :src="item.activeFlagB?yBottomH:yBottom" alt="">
                            </div>
                            <div class="yTop" @click="topHandle_s(item.ptzs,item)" @mouseleave="item.activeFlagT=false"><img :src="item.activeFlagT?yTopH:yTop" alt=""></div>
                        </div>
                        <div class="zoomBox">
                            <el-button type="zoomPlus" icon="el-icon-plus" class="zoomBtn" @click="zoomPlusHandle_s(item.ptzs)"
                                       id="zoomPlus"></el-button>
                            <el-button type="zoomMinus" icon="el-icon-minus" class="zoomBtn" @click="zoomMinusHandle_s(item.ptzs)"
                                       id="zoomMinus"></el-button>
                        </div>
                    </div>
                </div>
                <div class="iframeBox" v-else>
                    <div v-if="item.storage ==null" class="emptyText">暂无视频回放</div>
                    <iframe v-else src="http://10.54.2.22/embedded.html" ref="iframe" :id="'iframe'+item.id" width="100%"
                            height="100%"></iframe>
                </div>
            </div>
        </div>
        <!--中心点弹层-->
        <position-prop v-if="positionPropVisible" ref="positionProp"></position-prop>
        <!--应急预案-->
        <contingency-device v-if="contingencyDeviceVisible" ref="contingencyDevice"></contingency-device>
        <!--实时预警-->
        <alert-page v-if="alertPageVisible" ref="alertPage"></alert-page>
        <!--抓拍-->
        <crop-img v-if="cropImgVisible" ref="cropImg"></crop-img>
    </div>
</template>
<script>
    import to from "await-to-js";
    // 按需引入点聚合
    import {BmlMarkerClusterer} from 'vue-baidu-map-v3'
    // 引入marker
    import BmMarker from 'vue-baidu-map-v3/components/overlays/Marker'
    import imgUrl from '../../assets/images/link/testImg.png'
    import PositionProp from './positionProp'
   // import serveBaseUrl from './config'
    import ContingencyDevice from '../AR/contingencyPage'
    import AlertPage from '../AR/alertPage'
    import CropImg from './cropImg'
    import {getCameraType} from '../../utils/util'
    //球机
    import ballTop from '../../assets/images/AR/ball_top.png'
    import ballRight from '../../assets/images/AR/ball_right.png'
    import ballBottom from '../../assets/images/AR/ball_bottom.png'
    import ballLeft from '../../assets/images/AR/ball_left.png'
    //枪机
    import boltTop from '../../assets/images/AR/bolt_top.png'
    import boltRight from '../../assets/images/AR/bolt_right.png'
    import boltBottom from '../../assets/images/AR/bolt_bottom.png'
    import boltLeft from '../../assets/images/AR/bolt_left.png'
    //高点
    import heightTop from '../../assets/images/AR/height_top.png'
    import heightRight from '../../assets/images/AR/height_right.png'
    import heightBottom from '../../assets/images/AR/height_bottom.png'
    import heightLeft from '../../assets/images/AR/height_left.png'
    //云控
    import yLeft from '../../assets/images/link/y_l.png'
    import yLeftH from '../../assets/images/link/y_l_h.png'
    import yRight from '../../assets/images/link/y_r.png'
    import yRightH from '../../assets/images/link/y_r_h.png'
    import yTop from '../../assets/images/link/y_s.png'
    import yTopH from '../../assets/images/link/y_s_h.png'
    import yBottom from '../../assets/images/link/y_b.png'
    import yBottomH from '../../assets/images/link/y_b_h.png'
    import { getZoom,getDirection } from '../../utils/util'
    export default {
        data() {
            return {
                beforeUrl:'',
                fullscreen:false,
                sessionId: '',
                PTZurl: '',   //云控球机
                yLeft,
                yLeftH,
                yRight,
                yRightH,
                yTop,
                yTopH,
                yBottom,
                yBottomH,
                activeFlagL: false,    //云控点击状态
                activeFlagR: false,    //云控点击状态
                activeFlagT: false,    //云控点击状态
                activeFlagB: false,    //云控点击状态
                //搜索
                location: '西安',
                keyword: '',
                contingencyDeviceVisible:false,
                alertPageVisible:false,
                cropImgVisible:false,
                videoUrl:'',
                center: {
                    lng: 0,
                    lat: 0
                },
                zoom: 19,
                polygonPath: [],
                statisticsShow: false,  //统计动画
                bottomUnfoldShow: true,  //底部内容动画
                dataList: [
                    {
                        iconUrl: require('../../assets/images/map/people.png'),
                        number: null,
                        name: '实有人口'
                    }, {
                        iconUrl: require('../../assets/images/map/car.png'),
                        number: null,
                        name: '实有车辆'
                    }, {
                        iconUrl: require('../../assets/images/map/unit.png'),
                        number: null,
                        name: '实有单位'
                    }, {
                        iconUrl: require('../../assets/images/map/owner.png'),
                        number: null,
                        name: '小区业主'
                    }, {
                        iconUrl: require('../../assets/images/map/lessee.png'),
                        number: null,
                        name: '小区租户'
                    }, {
                        iconUrl: require('../../assets/images/map/yjyaIcon.png'),
                        number: null,
                        name: '应急预案'
                    }
                ],
                searchPosition: {lng: 0, lat: 0},  //搜索定位
                points: [],
                positionPropVisible:false,  //中心点弹层初始化
                people:'',
                car:'',
                firm:'',
                owner:'',
                zuhu:'',
                yuan:'',
                cameraList:[],  //摄像头列表
                mapData:[],  //小区详情
                optionsData:[]
            }
        },
        created(){
            this.deptId = this.$cookie.get('deptId')
            this.getTreeList()
            this.getMapInfo()
            this.getIndexData()
            this.initDeviceData()
            this.beforeUrl = 'http://'+this.$global.deviceUrl+'/live/media/'

        },
        props: ['searchVal'],
        watch: {
            searchVal: function (val) {
                this.deptId = val;
                console.log(this.deptId,'22222222222222');
                this.getIndexData()
                this.getMapInfo()
            },


        },
        components: {
            BmlMarkerClusterer,
            BmMarker,
            PositionProp,
            ContingencyDevice,
            AlertPage,
            CropImg,
        },
        //自定义指令
        directives: {
            drag:{
                bind: function (el) {
                    let oDiv = el;   //获取当前元素
                    let left,top;
                    oDiv.onmousedown = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        //算出鼠标相对元素的位置
                        let disX = e.clientX - oDiv.offsetLeft;
                        let disY = e.clientY - oDiv.offsetTop;

                        document.onmousemove = (e)=>{
                            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                            left = e.clientX - disX;
                            top = e.clientY - disY;

                            //移动当前元素
                            oDiv.style.left = left + 'px';
                            oDiv.style.top = top + 'px';
                        };
                        document.onmouseup = () => {
                            document.onmousemove = null;
                            document.onmouseup = null;
                            // alert(left+','+ top,'222');
                        };
                    };
                    oDiv.oncontextmenu =(e)=>{
                        console.log(e,'监听');
                        e.preventDefault();
                    }
                    oDiv.onmouseup=(oEvent)=> {
                        console.log(oEvent,'oEvent');
                        /*if (!oEvent) oEvent=window.event;
                        if (oEvent.button==2) {
                            console.log('鼠标右击了')
                        }*/
                    }
                }
            }
        },
        methods: {
            bmLabel(val){
                console.log('mzl');
                this.content = val
            },
            /**全屏*/
            screen(index){
                console.log(this.fullscreen,'this.fullscreen');
                // let element = document.documentElement;//设置后就是我们平时的整个页面全屏效果
                let element = document.getElementById('contentDivA'+index);//设置后就是   id==con_lf_top_div 的容器全屏
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;

            },
            /**普通球机云控*/
            zoomPlusHandle_s(ballFile) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/zoom/'
                getZoom(url1,url2,url3,this.sessionId,ballFileVal,0.5)
            },
            zoomMinusHandle_s(ballFile) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/zoom/'
                getZoom(url1,url2,url3,this.sessionId,ballFileVal,-0.5)
            },
            leftHandle_s(ballFile,item) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                item.activeFlagL = true;
                item.activeFlagR = false;
                item.activeFlagT = false;
                item.activeFlagB = false;
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/move/'
                getDirection(url1,url2,url3,this.sessionId,ballFileVal,-0.5,0,0,0)
            },
            rightHandle_s(ballFile,item) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                item.activeFlagL = false;
                item.activeFlagR = true;
                item.activeFlagT = false;
                item.activeFlagB = false;
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/move/'
                getDirection(url1,url2,url3,this.sessionId,ballFileVal,0.5,0,0,0)
            },
            bottomHandle_s(ballFile,item) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                item.activeFlagL = false;
                item.activeFlagR = false;
                item.activeFlagT = false;
                item.activeFlagB = true;
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/move/'
                getDirection(url1,url2,url3,this.sessionId,ballFileVal,0,0,-0.5,0)
            },
            topHandle_s(ballFile,item) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                item.activeFlagL = false;
                item.activeFlagR = false;
                item.activeFlagT = true;
                item.activeFlagB = false;
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/move/'
                getDirection(url1,url2,url3,this.sessionId,ballFileVal,0,0,0.5,0)
            },
            /**回放视频*/
            backVideo(item) {
                console.log(item, '回放');
                item.liveShow = !item.liveShow
                setTimeout(()=>{
                    var box = document.getElementById('iframe'+item.id)
                    if (item.storage !== null) {
                        box.contentWindow.postMessage({
                            type: 'init',
                            mode: 'archive',
                            origin: 'hosts/' + item.backFile,
                            archive: {
                                time: new Date(),
                                storage: item.storage,
                            },
                            options: {archivePane: true},
                        }, "*")
                    }
                },3000)
            },
            // 这是百度地图的重绘函数,用于维持覆盖物的位置（这里的值貌似会影响拖拉时的偏移度）
            draw ({ el, BMap, map }) {
                const { lng, lat } = this.position
                const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
                el.style.left = pixel.x - 16 + 'px'
                el.style.top = pixel.y - 16 + 'px'
            },
            //获取首页数据
            async getIndexData(){
                let data = {
                    deptId:this.deptId
                }
                let [err, res] = await to(this.$api.AR.getIndexData(data));
                if (err) return;
                console.log(res,'首页数据');
                if(res.data.code == 200){
                    var stasticData = res.data.HomePageStatistics;
                    this.dataList.map(item=>{
                        if(item.name=='实有人口'){item.number=stasticData.totalPopulation}
                        if(item.name=='实有车辆'){item.number=stasticData.totalVehicles}
                        if(item.name=='实有单位'){item.number=stasticData.totalEnterprises}
                        if(item.name=='小区业主'){item.number=stasticData.totalOwners}
                        if(item.name=='小区租户'){item.number=stasticData.totalTenants}
                        if(item.name=='应急预案'){item.number=stasticData.totalPlans}
                    })
                }else{
                    this.$message.warning(res.data.msg)
                }
            },
            /*小区详情*/
            async getMapInfo(){
                this.polygonPath=[]
                let data = {
                    deptId:this.deptId
                }
                let [err,res] = await to(this.$api.AR.getCommuniteInfo(data))
                if(err) return
                console.log(res.data.data,'小区详情');
                this.mapData = res.data.data;
                var coor = JSON.parse(this.mapData.core)
                console.log(coor,'coor');
                this.center.lng = coor.lng
                this.center.lat = coor.lat
                console.log(this.center,'中心坐标点');
                 this.searchPosition = this.center
                this.polygonPath = JSON.parse(this.mapData.coordinate);
            },
            /*抓拍*/
            cropImgHandle(){
                this.cropImgVisible = true;
                this.$nextTick(()=>{
                    this.$refs.cropImg.init(this.deptId)
                })
            },
            /*实时预警*/
            alertHandle(){
                this.alertPageVisible = true;
                this.$nextTick(()=>{
                    this.$refs.alertPage.init(this.deptId)
                })
            },
            /*应急预案*/
            contingencyHandle(){
                console.log(this.deptId,'deptId');
                this.contingencyDeviceVisible = true;
                this.$nextTick(()=>{
                    this.$refs.contingencyDevice.init(this.deptId)
                })
            },
            //获取用户所能管理的部门列表
            async getTreeList(){
                this.polygonPath=[]
                this.optionsData= []
                let [err, res] = await to(this.$api.login.getTree());
                if (err) return;
                this.optionsData = res.data.data;
                var coordinate = []
                this.optionsData.map(item=>{
                    if(item.deptId == this.deptId){
                        console.log(item,'999999999');
                        coordinate = eval("(" + item.coordinate + ")");
                    }
                })
                /*console.log(coordinate,'coordinate');
                coordinate.map(subItem=>{
                    this.polygonPath.push(Object.assign({lng:Number(subItem.longitude),lat:Number(subItem.latitude)}))
                })*/

            },
            //获取设备数据
            initDeviceData(){
                this.points=[]
                var videoFile=''
                //var url = 'http://'+this.$global.userName+':'+this.$global.passWord+'@'+this.$global.deviceUrl+'/video-origins';
                this.$http.get('/xpi/camera/list',{
                        auth: {
                            username: 'root',
                            password: 'root'
                        }
                    }
                    ).then((response) => {
                    if (response.data) {
                        console.log(response.data.cameras,'response.data.cameras');
                        response.data.cameras.map(item=>{
                            if(item.comment!==''){
                               var cameraObj = JSON.parse(item.comment)
                                var cameraImg = ''
                                //枪机
                                if(cameraObj.type==1 && cameraObj.direction ==1){cameraImg = boltTop}
                                if(cameraObj.type==1 && cameraObj.direction ==2){cameraImg = boltRight}
                                if(cameraObj.type==1 && cameraObj.direction ==3){cameraImg = boltBottom}
                                if(cameraObj.type==1 && cameraObj.direction ==4){cameraImg = boltLeft}
                                //球机
                                if(cameraObj.type==2 && cameraObj.direction ==1){cameraImg = ballTop}
                                if(cameraObj.type==2 && cameraObj.direction ==2){cameraImg = ballRight}
                                if(cameraObj.type==2 && cameraObj.direction ==3){cameraImg = ballBottom}
                                if(cameraObj.type==2 && cameraObj.direction ==4){cameraImg = ballLeft}
                                //枪机
                                if(cameraObj.type==3 && cameraObj.direction ==1){cameraImg = heightTop}
                                if(cameraObj.type==3 && cameraObj.direction ==2){cameraImg = heightRight}
                                if(cameraObj.type==3 && cameraObj.direction ==3){cameraImg = heightBottom}
                                if(cameraObj.type==3 && cameraObj.direction ==4){cameraImg = heightLeft}
                                this.points.push(Object.assign(
                                    {
                                        id:item.displayId,
                                        name:item.displayName,
                                        propVisible:false,
                                        liveShow: true,
                                        identification:cameraObj.type,
                                        lng: Number(item.longitude),
                                        lat: Number(item.latitude),
                                        url: cameraImg,
                                        videoUrl:item.videoStreams[0].accessPoint.slice(6),
                                        videoFile:item.videoStreams[0].accessPoint.slice(6),
                                        backFile:item.videoStreams[0].accessPoint.slice(6),
                                        storage: item.archives[0].storage,
                                        ptzs:item.ptzs,
                                        content:'',
                                        activeFlagL:false,
                                        activeFlagR:false,
                                        activeFlagT:false,
                                        activeFlagB:false,
                                    }
                                ))
                                    console.log(this.points,'111111111111');
                                }
                        })
                        console.log(this.points,'设备坐标');

                    }
                })
            },
            // 给地图设置主题色，我设置的是黑夜主题
            handler({BMap,map}) {
                let that = this;
                this.map = map
                this.BMap = BMap
                map.setMapStyleV2({styleId: '7ccfd12a0af1fd79733c900012aa4c00'});
                that.zoom = 19
            },
            /*多边形*/
            updatePolygonPath(e) {
                //this.polygonPath = e.target.getPath()
            },
            infoWindowOpen(marker) {
                console.log(marker,'marker');
                marker.liveShow = !marker.liveShow;
                marker.showFlag = false
                marker.propVisible = true
                console.log(marker.videoUrl,'视频路径');
            },
            /*点击中心点*/
            centerHandle(){
                console.log('mzl');
                this.positionPropVisible = true;
                this.$nextTick(()=>{
                    this.$refs.positionProp.init(this.mapData)
                })
            },
            /*关闭摄像头*/
            handleClose(item){
                item.propVisible = false;
                this.screen()
                item.videoUrl = ''
            },
        }
    }

</script>
<style>
    .bm-view {
        width: 100%;
        height:100vh;
    }
</style>
