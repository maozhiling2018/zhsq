<template>
    <el-dialog
            title="监控设备"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :before-close="handleClose">
        <div class="dialogCon">
            <div class="leftBox" style="width:32%;">
                <el-row class="marginT10">
                    <el-col :span="24">
                        <el-input
                                placeholder="输入通道名称搜索"
                                prefix-icon="el-icon-search"
                                clearable
                                v-model="treeVal">
                        </el-input>
                    </el-col>
                    <el-col :span="24" class="marginT20 treeBox">
                        <div class="l_tree_container">
                            <ew-tree :model="testdata"  v-loading="treeLoading"></ew-tree>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="rightBox" style="width:calc(100% - 33%)">
                <div>
                    <el-row class="conBox">
                        <el-col :span="rowNumber"
                                :id="'contentDiv'+index"
                                class="borderCamera  bgCamera flexCamera"
                                style="position:relative;"
                                v-for="(item,index) in videoList" :key="index" :style="{height:videoItemHeight}">
                            <div>
                                <el-button type="delete" size="mini" class="videoBtn" @click="backVideo(item)">
                                    {{item.liveShow==false?'直播':'回放'}}
                                </el-button>
                                <div @click="screen(index)" class="screenBox"><img src="../../assets/images/link/fullscreen.png" alt=""></div>
                            </div>
                            <div v-if="item.liveShow" style="position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:0;">
<!--                                <img :src="videoList[index].cameraUrl" class="imgVideo" v-if="item.videoPlayVisible" style="width:100% !important;height:100% !important;" id="videoSrc">-->
                              <LivePlayer :videoUrl="videoList[index].cameraUrl"  stretch :controls="false" class="imgVideo"  v-if="item.videoPlayVisible" id="videoSrc"/>
                                <div class="ballPtz_small" v-if="item.commentType=='2'">

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
                                <iframe src="http://10.54.2.22/embedded.html" ref="iframe" id="iframeMonitor" width="100%"
                                        height="100%"></iframe>
                            </div>
                            <div style="position:absolute;left:45%;top:45%;width:44px;height:52px;z-index:1;">
                                <img :src="spanIndex.indexOf(index)>-1?open:close" alt="" @click="cameraHandle(item,index)"
                                     :id="item" v-if="!item.videoPlayVisible" class="imgVideo">
                            </div>


                        </el-col>
                    </el-row>
                    <el-row class="marginT20">
                        <el-button :type="btnActive==index?'primary':'delete'" @click="tabRow(item.row,index)"
                                   v-for="(item,index) in btnList" :key="index">{{item.label}}
                        </el-button>
                        <!--                        <el-button :type="closeStatus?'primary':'delete'" @click="allClose"><span v-if="!closeStatus">全部关闭</span><span v-if="closeStatus">全部打开</span></el-button>-->
                    </el-row>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import LivePlayer from '@liveqing/liveplayer'
    import EwTree from '@/components/myTree'
    import to from "await-to-js";
    import open from '../../assets/images/AR/jk.png'
    import close from '../../assets/images/AR/forbid.png'
    import axios from 'axios'
    import { getCameraUrl,getZoom,getDirection} from '../../utils/util'
    //云控
    import yLeft from '../../assets/images/link/y_l.png'
    import yLeftH from '../../assets/images/link/y_l_h.png'
    import yRight from '../../assets/images/link/y_r.png'
    import yRightH from '../../assets/images/link/y_r_h.png'
    import yTop from '../../assets/images/link/y_s.png'
    import yTopH from '../../assets/images/link/y_s_h.png'
    import yBottom from '../../assets/images/link/y_b.png'
    import yBottomH from '../../assets/images/link/y_b_h.png'
    export default {
        data() {
            return {
                iframeUrl:'',
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
                fullscreen:false,
                deptNameValue:'', //'小区名称'
                deptNameText:'', //'小区名称'
                treeLoading:false,
                videoUrl:'',
                nodeId: '',
                open,
                close,
                dialogVisible: false,
                treeVal: '',
                testdata: [],
                showLine: true,
                showIcon: true,
                btnActive: 0,
                listNum: '',
                videoList: [],
                btnList: [
                    {row: 1, label: '一分屏'},
                    {row: 2, label: '四分屏'},
                    {row: 3, label: '九分屏'}
                ],
                closeStatus: false,
                cameraStatus: '',
                imgUrl: open,
                spanIndex: [],
                cameraList: [], //摄像头
                // 总宽度为24份，默认的四个框的时候
                videoItemHeight: '50%',
                rowNumber: 12,
                cameraFile: '',
                cameraUrl: ''
            }
        },
        activated() {
            if (this.chartMapBox) {
                this.chartMapBox.resize()
            }
        },
        created() {
            this.addVideo(4)
            this.tabRow(1, 0)
            this.eventbus.$on('deptNameText',(val)=>{
                this.deptNameText = val
                console.log(this.deptNameText,'this.deptNameText');
            })
            this.eventbus.$on('nodeId',(val)=>{
                this.nodeId = val
            })
        },
        components: {
            EwTree,
          LivePlayer
        },
        watch:{
            treeVal(newVal,oldVal){
                if(newVal !==oldVal){
                    this.getTreeData()
                }
            },
            nodeId(newVal,oldVal){
                if(newVal !==oldVal){
                    console.log(this.spanIndex,'this.spanIndex');
                    if(this.spanIndex && this.spanIndex.length > 0){
                        var activeIndex = this.spanIndex[this.spanIndex.length-1]
                        var videoPath = getCameraUrl(this.nodeId, this.cameraList, this.cameraFile).url
                        var backPath = getCameraUrl(this.nodeId, this.cameraList, this.cameraFile).backUrl   //回放所需字段
                        var storage = getCameraUrl(this.nodeId, this.cameraList, this.cameraFile).storage
                        var ptzs = getCameraUrl(this.nodeId, this.cameraList, this.cameraFile).ptzs
                        var commentType = getCameraUrl(this.nodeId, this.cameraList, this.cameraFile).comment.type
                        console.log(videoPath,storage,'videoPath');
                        console.log(backPath,'backPath');
                        this.videoList[activeIndex].cameraUrl = 'http://' + this.$global.deviceUrl + '/live/media/' + videoPath +'?format=mp4';
                        this.videoList[activeIndex].videoPlayVisible = true
                        this.videoList[activeIndex].storage = storage
                        this.videoList[activeIndex].ptzs = ptzs
                        this.videoList[activeIndex].videoFile = backPath
                        this.videoList[activeIndex].commentType = commentType
                        console.log(this.videoList,newVal,'节点id')
                    }else{
                        this.$message.warning('请先选择播放窗口')
                    }
                }
            },
            deptNameText(newVal,oldVal){
                if(newVal !==oldVal){
                    this.deptNameValue = newVal;
                    this.testdata[0].displayName = this.deptNameValue;
                    console.log(newVal,'this.deptNameValuewwwwwwwwwwwwwwwwwwwwwwwwwwwww');
                }
            },
            defaultDeptName(newVal,oldVal){
                if(newVal !==oldVal){
                    this.testdata[0].displayName = newVal
                    console.log(newVal,'this.deptNameValuewwwwwwwwwwwwwwwwwwwwwwwwwwwww');
                }
            }
        },
        methods: {
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
                console.log(ballFile,'ballFile');
                if(ballFile.length>0){
                    var ballFileVal = ballFile[0].accessPoint.slice(6)
                    var url1 = '/xpi/control/telemetry/session/acquire/'
                    var url2 = '/xpi/control/telemetry/session/keepalive/'
                    var url3 = '/xpi/control/telemetry/zoom/'
                    getZoom(url1,url2,url3,this.sessionId,ballFileVal,0.5)
                }
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
                //item.videoPlayVisible = !item.videoPlayVisible
                this.loading = true;
                item.liveShow = !item.liveShow
               setTimeout(()=>{
                   var box = document.getElementById('iframeMonitor')
                   console.log(box,'box');
                   this.iframeUrl = 'http://'+this.$global.deviceUrl+'/embedded.html'
                   console.log(this.iframeUrl,'this.iframeUrl');
                   console.log(item.storage,'item.storage');
                   if (item.storage !== null) {
                       box.contentWindow.postMessage({
                           type: 'init',
                           mode: 'archive',
                           origin: 'hosts/' + item.videoFile,
                           archive: {
                               time: new Date(),
                               storage: item.storage,
                           },
                           options: {archivePane: true},
                       }, '*')
                   }
               },1000)


            },
            // 切换不同的窗口
            tabRow(rowNum, i) {
                this.btnActive = i
                // 1*1 ，2*2，3*2,4*4，因为矩阵的 排 和 列 的个数都是一样的
                this.rowNumber = 24 / rowNum // 宽度
                this.videoItemHeight = (100 / rowNum) + '%' // 高度
                this.addVideo(rowNum * rowNum) // 个数

            },
            // 添加视频布局的公共函数
            addVideo(forNum) {
                this.videoList = []
                for (let key = 0; key < forNum; key++) {
                    this.videoList.push({
                        index: key,
                        cameraUrl:null,
                        videoFile:'',
                        liveShow:true,
                        storage:'',
                        ptzs:null,
                        commentType:null,
                        activeFlagL:false,
                        activeFlagR:false,
                        activeFlagT:false,
                        activeFlagB:false,
                        videoPlayVisible: false
                    })
                }

            },
            init(id,name) {
                console.log(id, name,'变化');
                this.deptNameValue = name;
                this.testdata = []
                this.dialogVisible = true;
                this.collectVal = 'first';
                this.initDeviceData();
                this.getTreeData()
            },
            //获取摄像头设备
            initDeviceData() {
                //var url = 'http://'+this.$global.userName+':'+this.$global.passWord+'@'+this.$global.deviceUrl+'/video-origins';
                axios.get('/xpi/camera/list', {
                        auth: {
                            username: 'root',
                            password: 'root'
                        }
                    }
                ).then((response) => {
                    if (response.data) {
                        this.cameraList = response.data.cameras;
                    }
                })
            },
            async getTreeData() {
                this.treeLoading = true;
                this.testdata= []
                let data = {
                    filter:this.treeVal
                }
                let [err, res] = await to(this.$api.AR.monitorList(data));
                if (err) return;
                console.log(res.data.data,'树结构');
                this.testdata = res.data.data
                this.testdata[0].displayName = this.deptNameValue

                this.treeLoading = false
            },
            handleClose() {
                this.dialogVisible = false
            },

            /*摄像头点击*/
            cameraHandle(item, index) {
                let arrIndex = this.spanIndex.indexOf(index);
                if (arrIndex > -1) {
                    this.spanIndex.splice(arrIndex, 1);
                } else {
                    this.spanIndex.push(index);
                }

            }
        }
    }
</script>

<style scoped>
    .video{
        position: relative;
        width:500px;
        height:300px;
    }
    img{
        width:100%;
        height:100%;
    }
    .time1{
        position: absolute;
        top:13px;
        right:150px;
    }
</style>
<style lang="scss">
    .l_tree_container {
        ul {
            list-style: none;
            margin: 0px;
            padding: 0px;
            text-align: left;
        }

        /*width: 100%;
        height: 100%;
        box-shadow: 0 0 3px #ccc;
        margin: 13px;
        position: relative;*/
    }
    /*.dialogBox{
        img{
            width:unset !important;
            height:unset !important;
        }
    }*/
    .conBox{
        .player-wrapper, .video-wrapper{
            width:100%;
            height:100%;
            position:absolute;
            top:0px;
            left:0px;
        }
        /*img{
            width:100% !important;
            height:100% !important;
        }*/
    }
</style>
