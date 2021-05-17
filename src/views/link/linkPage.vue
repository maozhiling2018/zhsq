<template>
    <div class="linkBg">
        <div class="v1" id="drawArear">
            <!--画矩形框-->
            <div class="react-box" id="drawReact"></div>
            <img :src="highPointUrl" alt="" style="width:100%;height:100vh;">
        </div>
            <!--位置点设置-->
        <div>
            <div :class="item.dragBoxPosition" :style="{left:item.x+'px',top:item.y +'px'}" v-drag="false"
                 id="dragBtn"
                 v-for="(item,index) in positionListNew" :key="index"
                 @click.stop.prevent="positionHandle(item.id)" @contextmenu.prevent.stop="rightClick(item,$event)">
                <div class="dialogText">
                    <div class="left"></div>
                    <div class="middle">{{item.name}}</div>
                    <div class="right"></div>
                </div>
            </div>
        </div>
            <!--摄像头位置分布-->
            <div class="cameraVideo">
                <div :style="{left:item.x+'px',top:item.y +'px',position:'absolute',zIndex:'99'}" v-drag
                 id="dragBtn1" v-for="(item,index) in cameraList" :key="index"
                 @click.stop.prevent="cameraHandle(item)" @contextmenu.prevent.stop="rightClick(item,$event)">
                <div class="cameraBox"
                     :style="{backgroundImage: 'url(' + item.sectorType + ')',backgroundRepeat:'no-repeat', backgroundSize:'bottom'}">
                    <div class="img"
                         :style="{backgroundImage: 'url(' + item.position + ')',backgroundRepeat:'no-repeat', backgroundSize:'cover'}"></div>
                </div>
                </div>
            </div>
            <!--弹层-->
            <position-prop v-if="positionPropVisible" ref="positionProp"></position-prop>
            <!--摄像头弹层-->
            <div :style="{left:item.x+'px',top:item.y +'px',position:'absolute',cursor:'pointer'}" v-drag="false"
                 id="dragBtn2" v-for="(item,index) in cameraList" :key="index" v-if="item.cameraPropVisible">
                <div class="contentBox" :id="'contentDiv'+index">
                    <div class="closeIcon"><i class="el-icon-circle-close" @click="handleClose(item)"></i></div>
                    <el-button type="delete" size="mini" class="videoBtn" @click.native="backVideo(item)">
                        {{item.liveShow==true?'回放':'直播'}}
                    </el-button>
                    <div @click="screen(index)" class="screenBox"><img src="../../assets/images/link/fullscreen.png" alt=""></div>
                <div v-if="item.liveShow" style="width:100%;height:100%;">
                    <img :src="item.videoChooseUrl" alt="" class="imgVideo">
                        <div class="ballPtz_small" v-if="item.identification !=='1'">
                            <div class="commandBox">
                                <div class="yLeft" @click="leftHandle_s(JSON.parse(item.ptzs),item)" @mouseleave="item.activeFlagL=false"><img :src="item.activeFlagL?yLeftH:yLeft" alt=""></div>
                                <div class="yRight" @click="rightHandle_s(JSON.parse(item.ptzs),item)" @mouseleave="item.activeFlagR=false"><img :src="item.activeFlagR?yRightH:yRight" alt="">
                                </div>
                                <div class="yCenter"><img src="../../assets/images/link/y_center.png" alt=""></div>
                                <div class="yBottom" @click="bottomHandle_s(JSON.parse(item.ptzs),item)" @mouseleave="item.activeFlagB=false"><img :src="item.activeFlagB?yBottomH:yBottom" alt="">
                                </div>
                                <div class="yTop" @click="topHandle_s(JSON.parse(item.ptzs),item)" @mouseleave="item.activeFlagT=false"><img :src="item.activeFlagT?yTopH:yTop" alt=""></div>
                            </div>
                            <div class="zoomBox">
                                <el-button type="zoomPlus" icon="el-icon-plus" class="zoomBtn" @click="zoomPlusHandle_s(JSON.parse(item.ptzs))"
                                           id="zoomPlus"></el-button>
                                <el-button type="zoomMinus" icon="el-icon-minus" class="zoomBtn" @click="zoomMinusHandle_s(JSON.parse(item.ptzs))"
                                           id="zoomMinus"></el-button>
                            </div>
                        </div>
                    </div>
                <div class="iframeBox"  v-if="!item.liveShow">
                        <div v-if="item.storage ==null" class="emptyText">暂无视频回放</div>
                    <iframe :src="'http://'+$global.deviceUrl+'/embedded.html'" ref="iframe" :id="'iframeA'+item.id" width="100%"
                                height="100%"></iframe>
                    </div>
                </div>
            </div>
            <!--右键菜单模态框-->
            <div v-show="menuVisible">
                <ul id="menu" class="menu">
                    <p>是否保存该设备位置？</p>
                    <el-button type="primary" size="mini" @click="saveDevice" v-if="deviceFlag">保存</el-button>
                    <el-button type="warning" size="mini" @click="menuVisible=false">取消</el-button>
                </ul>
            </div>
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
        <!--其他镜头-->
        <transition name="el-zoom-in-center">
            <div class="lensBox" v-if="lensShow">
                <div class="titleBtn titleFont" @click="lensShow =!lensShow">其他镜头</div>
                <div class="content">
                    <ul>
                        <li v-for="(item,index) in lensList" :key="index" @click="cameraChange(item)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="el-zoom-in-center">
            <div class="lensBoxFold" v-if="!lensShow">
                <div class="titleBtn titleFont" @click="lensShow = !lensShow">其他镜头</div>
            </div>
        </transition>
        <!--左下角地图展示-->
        <transition name="el-fade-in">
            <div class="leftPosition linkMapBox" v-if="linkMapShow">
                <div class="smallMap">
                    <map-page v-if="linkMapShow" ref="mapPage"></map-page>
                </div>
                <img src="../../assets/images/link/foldIcon.png" alt="" class="leftIcon foldIcon"
                     @click="mapPageHandle">
            </div>
        </transition>
        <div class="leftIcon linkFoldMap left" v-if="!linkMapShow">
            <img src="../../assets/images/link/foldIcon.png" alt="" @click="linkMapShow =!linkMapShow">
        </div>
        <!--右下角展示-->
        <transition name="el-fade-in">
            <div class="rightPosition linkMapBoxR" v-if="linkRightShow">
                <div class="yunKbox">
                    <div class="left">
                        <img :src="PTZurl" width="100%" height="100%">
                    </div>
                    <div class="ballPtz_small">
                        <div class="commandBox">
                            <div class="yLeft" @click="leftHandle(ballFile)" @mouseleave="activeFlagL=false"><img :src="activeFlagL?yLeftH:yLeft" alt=""></div>
                            <div class="yRight" @click="rightHandle(ballFile)" @mouseleave="activeFlagR=false"><img :src="activeFlagR?yRightH:yRight" alt="">
                            </div>
                            <div class="yCenter"><img src="../../assets/images/link/y_center.png" alt=""></div>
                            <div class="yBottom" @click="bottomHandle(ballFile)" @mouseleave="activeFlagB=false"><img :src="activeFlagB?yBottomH:yBottom" alt="">
                            </div>
                            <div class="yTop" @click="topHandle(ballFile)" @mouseleave="activeFlagT=false"><img :src="activeFlagT?yTopH:yTop" alt=""></div>
                        </div>
                        <div class="zoomBox">
                            <el-button type="zoomPlus" icon="el-icon-plus" class="zoomBtn" @click="zoomPlusHandle(ballFile)"
                                       id="zoomPlus"></el-button>
                            <el-button type="zoomMinus" icon="el-icon-minus" class="zoomBtn" @click="zoomMinusHandle(ballFile)"
                                       id="zoomMinus"></el-button>
                        </div>
                    </div>
            </div>
                <img src="../../assets/images/link/foldIcon.png" alt="" class="rightIcon foldIcon"
                     @click="linkRightShow =!linkRightShow">
            </div>
        </transition>
        <div class="rightIcon linkFoldMap" style="position:fixed;right:0px;bottom:0px;" v-if="!linkRightShow">
            <img src="../../assets/images/link/foldIcon.png" alt="" @click="linkRightShow =!linkRightShow">
        </div>


    </div>
</template>

<script>
    import to from "await-to-js";
    import axios from 'axios'
    import sectorTop from '../../assets/images/link/sector-top.png'
    import sectorLeft from '../../assets/images/link/sector-left.png'
    import sectorBottom from '../../assets/images/link/sector-bottom.png'
    import sectorRight from '../../assets/images/link/sector-right.png'
    import sectorHalfT from '../../assets/images/link/bq-top.png'
    import sectorHalfB from '../../assets/images/link/bq-bottom.png'
    import sectorHalfL from '../../assets/images/link/bq-left.png'
    import sectorHalfR from '../../assets/images/link/bq-right.png'
    import camerar1 from '../../assets/images/link/camera_1.png'
    import camerar2 from '../../assets/images/link/camera_2.png'
    import camerar3 from '../../assets/images/link/camera_3.png'
    import camerar4 from '../../assets/images/link/camera_4.png'
    import PositionProp from './positionProp'
    import CameraProp from './cameraProp'
    import imgUrl from '../../assets/images/link/testImg.png'
    import MapPage from '../map/mapPage'
    import {getZoom,getDirection} from '../../utils/util'
    //云控
    import yLeft from '../../assets/images/link/y_l.png'
    import yLeftH from '../../assets/images/link/y_l_h.png'
    import yRight from '../../assets/images/link/y_r.png'
    import yRightH from '../../assets/images/link/y_r_h.png'
    import yTop from '../../assets/images/link/y_s.png'
    import yTopH from '../../assets/images/link/y_s_h.png'
    import yBottom from '../../assets/images/link/y_b.png'
    import yBottomH from '../../assets/images/link/y_b_h.png'
    var timer = null
    let positionX = '';   //获取拖拽X
    let positionY = '';   //获取拖拽Y
    export default {
        data() {
            return {
                // iframeUrl:$global.deviceUrl,
                cmaFlag:'',
                PTZfile:'',
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
                mapPageVisible: false,  //左下角地图
                cameraOptions: {
                    videoWidth: '100%',
                    videoHeight: '100%',
                    preload: false,   //预加载
                    cover: '',   //播放器默认封面图片
                    autoplay: true,   //播放器是否自动播放
                    source: '',
                    isLive: true,   //切换为直播流的时候必填
                    format: ''  //切换为直播流的时候必填
                },
                //视频
                options: {
                    height: '100vh',
                    videoWidth: '100%',
                    videoHeight: '100vh',
                    preload: false,   //预加载
                    cover: '',   //播放器默认封面图片
                    autoplay: true,   //播放器是否自动播放
                    source: '',
                    isLive: true,   //切换为直播流的时候必填
                    format: ''  //切换为直播流的时候必填
                },
                deviceFlag: true,  //编辑、保存标识
                draggable: true,  //编辑、保存标识
                menuVisible: false,  //右键层
                deptId: '',
                highPointId: '',
                highPointUrl: '',  //视频背景
                IconShow: false,  //标识设置动画
                deviceShow: false,  //设备在线动画
                linkMapShow: true,  //左下角底图
                linkRightShow: true,  //右下角底图
                lensShow: false,  //其他镜头
                isShowDragTop: false,
                middleWidth: 200,
                positionList: [],
                cameraList: [],
                positionListNew: [], //重组后的定位字段
                lensList: [],
                positionPropVisible: false,  //位置弹层字段
                cameraPropVisible: false,  //摄像头弹层字段
            }
        },
        //自定义指令
        directives: {
            drag: {
                bind: function (el) {
                    let oDiv = el;   //获取当前元素
                    let firstTime = '', lastTime = '';
                    let left, top;
                    oDiv.onmousedown = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if(document.getElementById('dragBtn')){
                            document.getElementById('dragBtn').setAttribute('data-flag', false)
                        }

                        document.getElementById('dragBtn1').setAttribute('data-flag', false)
                        firstTime = new Date().getTime();
                        //算出鼠标相对元素的位置
                        let disX = e.clientX - oDiv.offsetLeft;
                        let disY = e.clientY - oDiv.offsetTop;
                        console.log(disX, disY, '点击');

                        document.onmousemove = (e) => {
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
                            // onmouseup 时的时间，并计算差值
                            lastTime = new Date().getTime();
                            if ((lastTime - firstTime) < 200) {
                                if(document.getElementById('dragBtn')){
                                    document.getElementById('dragBtn').setAttribute('data-flag', true)
                                }

                                document.getElementById('dragBtn1').setAttribute('data-flag', true)
                            }
                            positionX = left;
                            positionY = top;
                            //alert(left+','+ top,'222');
                        };
                    };

                }
            },
            /*阻止拖拽*/
            stopdrag: {
                inserted: function (el, binding, vnode) {
                    let element = el;
                    console.log(element, 'element');
                    element.onmousedown = function (e) {
                        e.stopPropagation()
                    }
                }
            },
        },
        components: {
            PositionProp,
            CameraProp,
            MapPage,
        },
        props: ['searchVal', 'deviceOnNum', 'deviceTotalNum'],
        created() {
            this.getDeviceData();
            this.deptId = this.$cookie.get('deptId')
            /*901框选*/
            /*this.$nextTick(()=>{
                console.log(this.cmaFlag,'今天他')
                let dom = document.getElementById('drawArear')
                if (dom) {
                    console.log(document.getElementById('drawReact'),'dom加载完成');
                    var drawReact = document.getElementById('drawReact'); // 获取矩形框元素

                    var areaInfo = dom.getBoundingClientRect(); // 返回元素的大小及其相对于视口的位置
                    console.log(areaInfo,'areaInfo');
                    var reactWidth, reactHeight, reactTop, reactLeft; // 定义矩形框的宽、高、top、left
                    var drawFlag = true; // 定义矩形框绘制标识
                    var beginPoint = {}; // 标记起点
                    var endPoint = {}; // 标记终点

                    // 绑定鼠标事件--onmousedown
                    dom.onmousedown = function ($event) {
                        drawReact.style.display = 'block'
                        console.log($event,'qidain ');
                        drawReact.style.width = '1px'; // 宽
                        drawReact.style.height = '1px'; // 高
                        drawFlag = true;
                        drawReact.style.visibility = 'visible'; // 进入画布按下鼠标显示默认矩形框
                        // 鼠标按下的位置作为矩形框的顶点
                        beginPoint = {x: $event.clientX - areaInfo.x, y: $event.clientY - areaInfo.y}
                        console.log(beginPoint,'开始点坐标')
                        reactTop = $event.clientY - areaInfo.y;
                        reactLeft = $event.clientX - areaInfo.x;
                        drawReact.style.top = reactTop + 'PX';
                        drawReact.style.left = reactLeft + 'PX';
                    }
                    // 绑定鼠标事件--onmousemove
                    dom.onmousemove = function ($event) {
                        if (!drawFlag) {
                            return;
                        }
                        // 鼠标移动的坐标 - 画布相对视窗的位置 - 矩形相对于画布的偏差（顶点位置） = 矩形框的大小
                        reactWidth = $event.clientX - areaInfo.x + 1; // 宽
                        reactHeight = $event.clientY - areaInfo.y + 1; // 高

                        reactWidth = $event.clientX > areaInfo.right ? areaInfo.width + areaInfo.x - beginPoint.x : $event.clientX - areaInfo.x + 1;
                        reactHeight = $event.clientY > areaInfo.bottom ? areaInfo.height + areaInfo.y - beginPoint.y : $event.clientY - areaInfo.y + 1;

                        drawReact.style.width = reactWidth - reactLeft + 'PX'; // 宽
                        drawReact.style.height = reactHeight - reactTop + 'PX'; // 高
                    }
                    // 绑定鼠标事件--onmousedown
                    dom.onmouseup = function ($event) {
                        var w = document.documentElement.clientWidth
                        var h = document.documentElement.clientHeight
                        drawFlag = false;
                        drawReact.style.display = 'none'
                        // 鼠标弹起的点作为矩形框的终点
                        endPoint = {x: $event.clientX - areaInfo.x, y: $event.clientY - areaInfo.y}
                        console.log(document.body.clientWidth,'clientXclientX')
                        var x1 = beginPoint.x/document.body.clientWidth
                        var y1 = beginPoint.y/document.body.clientHeight
                        var x2 = endPoint.x/document.body.clientWidth
                        var y2 = endPoint.y/document.body.clientHeight
                        console.log(x1,y1,x2,y2,'开始调用');
                        console.log(cmaFlag,'开始调用eeeeeeee');
                        if(x1==x2 && y1==y2){
                            axios.get('/cma/'+cmaFlag+'?value=x1:'+x1+',y1:'+y1).then((res)=>{
                                console.log(res,'33333333');
                            })
                        }else{
                            axios.get('/cma/'+cmaFlag+'?value=x1:'+x1+',y1:'+y1+',x2:'+x2+',y2:'+y2).then((res)=>{
                                console.log(res.statusText,'4444444');
                                if(res.statusText=='OK'){

                                }
                            })
                        }

                    }
                    //  清除定时器
                    if (!timer) {
                        clearTimeout(timer)
                    }
                }
            })*/

        },
        watch: {
            searchVal: function (val) {
                this.deptId = val;
            },
            linkRightShow(newVal,oldVal){
                console.log(newVal,'linkRightShowlinkRightShow');
                if(newVal==false){
                    this.PTZurl = ''
                }else{
                    this.PTZurl = 'http://' + this.$global.deviceUrl + '/live/media/' + this.PTZfile
                }
            },
        },
        methods: {
            get901(cmaFlag){
                let dom = document.getElementById('drawArear')
                if (dom) {
                    console.log(document.getElementById('drawReact'),'dom加载完成');
                    var drawReact = document.getElementById('drawReact'); // 获取矩形框元素

                    var areaInfo = dom.getBoundingClientRect(); // 返回元素的大小及其相对于视口的位置
                    console.log(areaInfo,'areaInfo');
                    var reactWidth, reactHeight, reactTop, reactLeft; // 定义矩形框的宽、高、top、left
                    var drawFlag = true; // 定义矩形框绘制标识
                    var beginPoint = {}; // 标记起点
                    var endPoint = {}; // 标记终点

                    // 绑定鼠标事件--onmousedown
                    dom.onmousedown = function ($event) {
                        drawReact.style.display = 'block'
                        console.log($event,'qidain ');
                        drawReact.style.width = '1px'; // 宽
                        drawReact.style.height = '1px'; // 高
                        drawFlag = true;
                        drawReact.style.visibility = 'visible'; // 进入画布按下鼠标显示默认矩形框
                        // 鼠标按下的位置作为矩形框的顶点
                        beginPoint = {x: $event.clientX - areaInfo.x, y: $event.clientY - areaInfo.y}
                        console.log(beginPoint,'开始点坐标')
                        reactTop = $event.clientY - areaInfo.y;
                        reactLeft = $event.clientX - areaInfo.x;
                        drawReact.style.top = reactTop + 'PX';
                        drawReact.style.left = reactLeft + 'PX';
                    }
                    // 绑定鼠标事件--onmousemove
                    dom.onmousemove = function ($event) {
                        if (!drawFlag) {
                            return;
                        }
                        // 鼠标移动的坐标 - 画布相对视窗的位置 - 矩形相对于画布的偏差（顶点位置） = 矩形框的大小
                        reactWidth = $event.clientX - areaInfo.x + 1; // 宽
                        reactHeight = $event.clientY - areaInfo.y + 1; // 高

                        reactWidth = $event.clientX > areaInfo.right ? areaInfo.width + areaInfo.x - beginPoint.x : $event.clientX - areaInfo.x + 1;
                        reactHeight = $event.clientY > areaInfo.bottom ? areaInfo.height + areaInfo.y - beginPoint.y : $event.clientY - areaInfo.y + 1;

                        drawReact.style.width = reactWidth - reactLeft + 'PX'; // 宽
                        drawReact.style.height = reactHeight - reactTop + 'PX'; // 高
                    }
                    // 绑定鼠标事件--onmousedown
                    dom.onmouseup = function ($event) {
                        var w = document.documentElement.clientWidth
                        var h = document.documentElement.clientHeight
                        drawFlag = false;
                        drawReact.style.display = 'none'
                        // 鼠标弹起的点作为矩形框的终点
                        endPoint = {x: $event.clientX - areaInfo.x, y: $event.clientY - areaInfo.y}
                        console.log(document.body.clientWidth,'clientXclientX')
                        var x1 = beginPoint.x/document.body.clientWidth
                        var y1 = beginPoint.y/document.body.clientHeight
                        var x2 = endPoint.x/document.body.clientWidth
                        var y2 = endPoint.y/document.body.clientHeight
                        console.log(x1,y1,x2,y2,'开始调用');
                        console.log(cmaFlag,'开始调用eeeeeeee');
                        if(x1==x2 && y1==y2){
                            axios.get('/cma/'+cmaFlag+'?value=x1:'+x1+',y1:'+y1).then((res)=>{
                                console.log(res,'33333333');
                            })
                        }else{
                            axios.get('/cma/'+cmaFlag+'?value=x1:'+x1+',y1:'+y1+',x2:'+x2+',y2:'+y2).then((res)=>{
                                console.log(res.statusText,'4444444');
                                if(res.statusText=='OK'){

                                }
                            })
                        }

                    }
                    //  清除定时器
                    if (!timer) {
                        clearTimeout(timer)
                    }
                }
            },
            /**全屏*/
            screen(index){
                // let element = document.documentElement;//设置后就是我们平时的整个页面全屏效果
                let element = document.getElementById('contentDiv'+index);//设置后就是   id==con_lf_top_div 的容器全屏
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

            /**云控*/
            zoomPlusHandle(ballFile) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/zoom/'
                getZoom(url1,url2,url3,this.sessionId,ballFileVal,0.5)
            },
            zoomMinusHandle(ballFile) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/zoom/'
                getZoom(url1,url2,url3,this.sessionId,ballFileVal,-0.5)
            },
            leftHandle(ballFile) {
                console.log(ballFile,'todo');
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                console.log(ballFileVal);
                this.activeFlagL = true;
                this.activeFlagR = false;
                this.activeFlagT = false;
                this.activeFlagB = false;
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/move/'
                getDirection(url1,url2,url3,this.sessionId,ballFileVal,-0.5,0,0,0)
            },
            rightHandle(ballFile) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                this.activeFlagL = false;
                this.activeFlagR = true;
                this.activeFlagT = false;
                this.activeFlagB = false;
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/move/'
                getDirection(url1,url2,url3,this.sessionId,ballFileVal,0.5,0,0,0)
            },
            bottomHandle(ballFile) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                this.activeFlagL = false;
                this.activeFlagR = false;
                this.activeFlagT = false;
                this.activeFlagB = true;
                var url1 = '/xpi/control/telemetry/session/acquire/'
                var url2 = '/xpi/control/telemetry/session/keepalive/'
                var url3 = '/xpi/control/telemetry/move/'
                getDirection(url1,url2,url3,this.sessionId,ballFileVal,0,0,-0.5,0)
            },
            topHandle(ballFile) {
                var ballFileVal = ballFile[0].accessPoint.slice(6)
                this.activeFlagL = false;
                this.activeFlagR = false;
                this.activeFlagT = true;
                this.activeFlagB = false;
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
                    var box = document.getElementById('iframeA'+item.id)
                    if (item.storage !== null) {
                        box.contentWindow.postMessage({
                            type: 'init',
                            mode: 'archive',
                            origin: item.backFile,
                            archive: {
                                time: new Date(),
                                storage: item.storage,
                            },
                            options: {archivePane: true},
                        }, "*")
                    }
                },8000)

            },
            /**左下角地图*/
            mapPageHandle() {
                this.linkMapShow = !this.linkMapShow
                this.$refs.mapPage.statisticsShow =false
            },
            /**摄像头设备列表*/
            async getDeviceList() {
                var screenW = window.screen.width
                var screenH = window.screen.height
                console.log(screenW, screenH,'screenWscreenW')
                this.positionList = []
                this.positionListNew = []
                console.log(this.deptId,this.highPointId,'this.highPointId');
                this.cameraList = []
                let data = {
                    deptId: this.deptId,
                    highPoint: this.highPointId
                }
                let [err, res] = await to(this.$api.Link.getlinkVal(data))
                if (err) return;
                console.log(res.data,'mmmmmmmmmmmmmm');
                var x, y, position, sectorType;
                res.data.data.map(item => {
                    /*判断低码流高码流*/
                    //设备
                    if (item.longitude  == null) {
                        x = 100 + Math.floor(Math.random() * (1000 - 600 + 1) + 1)
                    } else {
                        x = item.longitude
                    }
                    if (item.latitude == null) {
                        y = 100 + Math.floor(Math.random() * (1000 - 500 + 1) + 1)
                    } else {
                        y = item.latitude
                    }
                    if (item.category == 0) {

                        //判断类型
                        if (item.identification == 1) {
                            position = camerar2
                        } //枪机
                        if (item.identification == 2) {
                            position = camerar3
                        } //球机
                        if (item.identification == 3) {
                            position = camerar4
                        } //高点
                        //判断方向
                        if (item.signs == 0) {
                            sectorType = sectorTop
                        } //上
                        if (item.signs == 1) {
                            sectorType = sectorBottom
                        } //下
                        if (item.signs == 2) {
                            sectorType = sectorLeft
                        } //左
                        if (item.signs == 3) {
                            sectorType = sectorRight
                        } //右
                        this.cameraList.push(Object.assign({
                            options: this.cameraOptions,
                            videoChooseUrl: '',
                            cameraPropVisible: false,
                            liveShow: true,
                            id: item.deptStyleId,
                            styleId: item.styleId,
                            x: x,
                            y: y,
                            sectorType: sectorType,
                            position: position,
                            propVisible: false,
                            imgUrl: imgUrl,
                            videoFile : item.list[0].accessPoint.slice(6),
                            backFile:item.list[0].accessPoint,
                            storage: item.storage,
                            ptzs:item.ptzs,
                            identification:item.identification,
                            activeFlagL:false,
                            activeFlagR:false,
                            activeFlagT:false,
                            activeFlagB:false,
                        }))
                    }
                    if (item.category == 1) {
                        this.positionList.push(item)
                    }
                })

                this.positionList.map(item1 => {
                    console.log(item1,'建筑物坐标')
                    this.positionListNew.push({
                        id: item1.deptStyleId,
                        x: item1.longitude,
                        y: item1.latitude,
                        name: item1.name,
                        dragBoxPosition: 'drag-box-left'
                    })
                })
                console.log(this.positionListNew,'this.positionListNew')
                this.positionListNew.map(item2 => {
                    if (item2.x < 1000 || item2.x === 1000 && item2.y > 500) {
                        item2.dragBoxPosition = 'drag-box-left'
                    } //左下
                    if (item2.x > 1000 && item2.y > 500) {
                        item2.dragBoxPosition = 'drag-box-right'
                    }  //右下
                    if (item2.x < 1000 || item2.x === 1000 && item2.y < 500) {
                        item2.dragBoxPosition = 'drag-box-top-left'
                    }  //左上
                    if (1705 > item2.x > 1000 && item2.y < 500) {
                        item2.dragBoxPosition = 'drag-box-top-right'
                    }  //右上
                })
                /*this.cameraList = res.data.data;*/

            },
            /**保存摄像头设备*/
            async saveDevice() {
                let data = {
                    deptStyleId: this.deptStyleId,
                    deptId: this.deptId,
                    highPoint: this.highPointId,
                    longitude: positionX,
                    latitude: positionY,
                }
                let [err, res] = await to(this.$api.Link.getlinkUpdate(data))
                if (err) return
                if (res.data.code == 200) {
                    this.$message.success('保存成功')
                    this.menuVisible = false
                }
            },
            /**鼠标右击事件*/
            rightClick(val, MouseEvent) { // 鼠标右击触发事件
                this.deptStyleId = val.id
                this.menuVisible = true; // 显示模态窗口，跳出自定义菜单栏
                var menu = document.querySelector('#menu');
                menu.style.left = MouseEvent.clientX - 80 + 'px';
                document.addEventListener('click', this.foo); // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
                menu.style.top = MouseEvent.clientY - 185 + 'px'
            },
            /**镜头切换*/
            cameraChange(val) {
                console.log(val, '高点点击');
              console.log("进来了");
                if(val.PTZ){
                this.ballFile = val.PTZ.ptzs
                    //对应球机的路径
                    this.PTZfile = val.PTZ.videoStreams[0].accessPoint.slice(6)
                    this.PTZurl = 'http://' + this.$global.deviceUrl + '/live/media/' + this.PTZfile
                  console.log(this.PTZurl,'球机地址');
                }

                const url = 'http://' + this.$global.deviceUrl + '/live/media/' + val.url;
                if (val.url !== undefined) {
                    this.highPointUrl = url
                    console.log(this.highPointUrl,'this.highPointUrl');
                    this.highPointId = val.id;
                    this.getDeviceList();
                    this.$nextTick(()=>{
                        this.cmaFlag = val.cmaVal;
                        this.get901(this.cmaFlag)
                    })
                }
            },
            /**获取设备列表*/
            getDeviceData() {
                axios.get('/xpi/camera/list', {
                        auth: {
                            username: 'root',
                            password: 'root'
                        }
                    }
                ).then((response) => {
                    if (response.data) {
                        console.log(response.data.cameras, '定位设备')
                        response.data.cameras.map(item => {
                            if (item.comment !== '') {
                                if (JSON.parse(item.comment).type == 3) {
                                    console.log(item,'偷偷偷偷')
                                    this.lensList.push(Object.assign(
                                        {
                                            id: item.displayId,
                                            name: item.displayName,
                                            cmaVal: JSON.parse(item.comment).cma,
                                            url: item.videoStreams[0].accessPoint.slice(6),
                                            highPointUrl: ''
                                        }
                                    ))
                                }
                                if (JSON.parse(item.comment).type == 2) {
                                  console.log(this.lensList,"this.lensList");
                                  console.log(this.lensList.length);
                                    if (this.lensList.length >= 0) {
                                      console.log("测试麦迪");
                                      this.lensList.map(lenItem => {
                                          console.log(lenItem,"lenItem");
                                          console.log(lenItem.id,JSON.parse(item.comment).PTZ);
                                            if (lenItem.id == JSON.parse(item.comment).PTZ) {
                                                lenItem.PTZ = item
                                            }
                                        })
                                    }
                                }
                            }
                        })
                        console.log(this.lensList,'this.lensListAAAAAA');
                        this.highPointId = this.lensList[0].id
                        this.cmaFlag = this.lensList[0].cmaVal
                        this.get901(this.cmaFlag)
                        console.log(this.cmaFlag,'kkkkkkkkkkkkkkkkkkkkkkkmmmm')
                    }
                }).then(() => {
                     this.cameraChange(this.lensList[0])
                })

            },
            /*位置点点击*/
            positionHandle(id) {
                let isClick = document.getElementById('dragBtn').getAttribute('data-flag');
                if (isClick !== 'true') {
                    return false
                }
                this.positionPropVisible = true;
                this.$nextTick(() => {
                    this.$refs.positionProp.init(id)
                })
            },
            /*摄像头点击事件*/
            cameraHandle(val, index) {

                console.log(val,'摄像头点击');
                val.liveShow = true;
                this.deptStyleId = val.id;
                let isClick = document.getElementById('dragBtn1').getAttribute('data-flag');
                if (isClick !== 'true') {
                    return false
                }

                console.log(JSON.parse(val.ptzs),'val.ptzs111')
                console.log(val.identification == '3','999')
                if(val.identification=='3'){
                    this.highPointUrl = ''
                    this.PTZfile = ''
                    this.PTZurl = ''
                    //对应球机的路径
                    this.PTZurl = 'http://' + this.$global.deviceUrl + '/live/media/' + val.videoFile
                    console.log(this.PTZurl,'this.PTZurl')
                    this.highPointUrl = 'http://' + this.$global.deviceUrl + '/live/media/' + val.videoFile;
                    console.log(this.highPointUrl,'this.highPointUrl');
                    this.highPointId = val.styleId;
                    this.getDeviceList();
                }else{
                    val.cameraPropVisible = true
                    val.videoChooseUrl = 'http://' + this.$global.deviceUrl + '/live/media/' + val.videoFile;
                }
            },
            /*摄像头关闭*/
            handleClose(val) {
                console.log(val,'sssssssss');
                val.cameraPropVisible = false;
                val.videoChooseUrl = ''
            }
        }
    }
</script>

<style lang="scss">
    .videoBox {
        width: 100%;
        height: 100vh;
        position: absolute;
        z-index: -1;
        top: 0px;
        left: 0px;
    }

    .linkBg {
        width: 100%;
        height: 1018px;
        left: 0px;
        top: 0px;
        z-index: -1;
        vertical-align: bottom;
        display: block;
        position: absolute;
        .cameraVideo{
            .player-wrapper, .video-wrapper{
                width:100% !important;
                height:100% !important;
            }
        }
        .v1{
            .player-wrapper, .video-wrapper{
                width:100% !important;
                height:100vh !important;
            }
        }

        .v1 {
            width: 100%;
            height: 100vh;
            position: relative;
            backgroundund:red;

        }

        .menu__item {
            display: block;
            line-height: 20px;
            text-align: center;
            /*margin-top: 10px;*/
        }

        .menu {
            height: auto;
            width: 200px;
            background: #085AC3;
            border-radius: 10px;
            border: 1px solid #085AC3;
            padding: 10px;
            color: #1ce1f0;;
            position: absolute;
            z-index: 99999;
            padding-inline-start: 0px;
        }

        /*width:100%;*/
        /*height:1018px;*/
        /*background:url("../../assets/images/link/bg.png") no-repeat;*/
        /*background-size:cover;*/
        .titleFont {
            font-size: 20px;
            color: #16DADE;
            line-height: 22px;
            font-weight: 400;
            text-align: center;
            cursor: pointer;
        }

        .deviceBox {
            position: absolute;
            z-index: 100 !important;
            left: 0px;
            top: 75px;
            width: 363px;
            height: 241px;
            background: url("../../assets/images/AR/popBox1.png") no-repeat;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;

            .titleBtn {
                position: absolute;
                right: 0px;
                top: 53px;
                width: 45px;
                height: 158px;
                background: url("../../assets/images/AR/left-unfold.png") no-repeat;
                background-size: cover;
                writing-mode: horizontal-tb; //默认：水平方向，从上到下
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    display: block;
                    width: 20px;
                }
            }

            .content {
                font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
                font-weight: 400;
                text-align: center;
                color: #16ebf0;
                line-height: 36px;
                width: 200px;
                padding-top: 26px;

                .titleFile {
                    font-size: 18px;
                    color: #16DADE;
                    text-align: right;
                }

                .number {
                    color: #FFDB44;
                    font-size: 22px;
                    text-align: left;
                    line-height: 36px;
                }
            }
        }

        .deviceFoldBox {
            height: 158px;
            width: 45px;
            position: absolute;
            left: 0px;
            top: 75px;
            background: url("../../assets/images/AR/left-fold.png") no-repeat;
            background-size:cover;
            .titleBtn {
                height: 158px;
                writing-mode: horizontal-tb; //默认：水平方向，从上到下
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    display: block;
                    width: 20px;
                }
            }
        }

        .leftPosition {
            left: 0px;
            bottom:10px;
            position: fixed;
        }

        .rightPosition {
            bottom: 10px;
            right: 0px;
            position: fixed;
        }

        .linkMapBox {
            width: 500PX;
            height: 300PX;
            background:rgba(9,37,76,.5);
            .leftIcon {
                left: 475PX;
            }

            .rightIcon {
                right: 500PX;
            }

            .foldIcon {
                position: fixed;
                bottom: 285PX;
            }
        }

        .linkMapBoxR {
            width: 500PX;
            height: 300PX;
            background:rgba(9,37,76,.5);
            .leftIcon {
                left: 500PX;
            }

            .rightIcon {
                right: 475PX;
                cursor: pointer;
            }

            .foldIcon {
                position: fixed;
                bottom: 285PX;
            }
        }

        .linkFoldMap {
            position: fixed;
            bottom: 0px;
            width: 24px;
            height: 24px;
            cursor: pointer;
        }

        .leftIcon {
            left: 0px;
        }

        .rightIcon {
            right: 0px;
        }

        /*其他镜头*/
        .lensBox {
            position: absolute;
            top: 122px;
            right: 0px;
            width: 360px;
            height: 716px;
            background: url("../../assets/images/link/otherBg.png") no-repeat;
            background-size: 100% 100%;
            z-index: 100;

            .titleBtn {
                width: 158px;
                height: 45px;
                background: url("../../assets/images/AR/bottom-fold.png") no-repeat;
                background-size: cover;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                bottom: 0px;
                left: 34%;
            }

            .content {
                width: 92%;
                height: 82%;
                margin: 5% auto;
                padding: 20px 0px;
                overflow-y: auto;

                ul {
                    padding: 0px 20px;

                    li {
                        width: 287px;
                        height: 52px;
                        margin: 5% auto;
                        background: url("../../assets/images/link/lensItem.png") no-repeat;
                        background-size: cover;
                        display: flex;
                        align-items: center;
                        font-size: 18px;
                        color: #16DADE;
                        text-indent: 15px;
                        cursor: pointer;
                    }
                }
            }
        }

        .lensBoxFold {
            position: absolute;
            top: 80px;
            right: 100px;
            width: 158px;
            height: 45px;
            background: url("../../assets/images/AR/topTitleBg.png") no-repeat;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /*镜头分布*/
        .cameraBox {
            width: 80px;
            height: 50px;
            cursor: Move;
            background-size: 70% 70%;
            background-position: 12px 3px;

        .img {
                position: absolute;
                top: -28px;
                width: 31px;
                height: 50px;
                left: 25px;
            }
        }

        /*左下角地图*/
        .smallMap {
            width: 500PX;
            height: 300PX;
            border:10px solid rgba(20,50,140,.3);
            .statisticsFoldBox{
                display: none;
            }
            .searchBox {
                display: none;
            }

            .mapPage, .bm-view {
                height: 285PX;
            }
            .bottomBtn{
                display: none;
            }
        }
    }
</style>
