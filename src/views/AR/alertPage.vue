<template>
    <el-dialog
            title="实时预警"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :append-to-body="true"
            class="dialogBox"
            :before-close="handleClose">
       <div class="dialogCon">
           <div class="leftBox">
               <el-button type="primary" style="width:100%;text-align:left;">
                   {{chooseType}}
               </el-button>
               <!--车牌检索-->
               <div class="commandA" v-if="tabIndex=='a'">
                   <div style="width:90%;margin:20px auto 0px auto">
                       <el-form :model="ruleForm"  ref="ruleForm" class="demo-ruleForm">
                           <el-form-item label="" prop="type">
                               <el-select v-model="ruleForm.type" placeholder="报警类型" style="width:100%;">
                                   <el-option :label="item.text" :value="item.text" v-for="(item,index) in typeList" :key="index"></el-option>
                               </el-select>
                           </el-form-item>
                           <el-form-item label="" prop="startDate">
                               <el-date-picker
                                       v-model="ruleForm.startDate"
                                       type="date"
                                       value-format="yyyy-MM-dd HH:mm:ss"
                                       style="width:100%;"
                                       placeholder="开始时间">
                               </el-date-picker>
                           </el-form-item>
                           <el-form-item label="" prop="endDate">
                               <el-date-picker
                                       v-model="ruleForm.endDate"
                                       type="date"
                                       style="width:100%;"
                                       value-format="yyyy-MM-dd HH:mm:ss"
                                       placeholder="结束时间">
                               </el-date-picker>
                           </el-form-item>
                           <el-form-item>
                               <el-button type="primary" @click="getAlertList" style="width:40%;border-radius:4px;float:left;">查询</el-button>
                               <el-button type="primary" @click="resetForm('ruleForm')"style="width:40%;border-radius:4px;float:left;">重置</el-button>
                           </el-form-item>
                       </el-form>
                   </div>
                   <div class="alertNumber">
                       <div class="color1 font16 marginT10">今日告警：<span class="font24 red">{{alertNum}}</span> 张</div>
                   </div>
               </div>
           </div>
           <div class="rightBox">
               <div class="commandRightB" v-if="tabIndex=='a'">
                   <div  class="alertTableBox">
                       <el-table
                               v-loading="tableLoading"
                               ref="filterTable"
                               :data="tableData"
                               max-height="630"
                               :highlight-current-row="true"
                               @selection-change="selectionChangeHandle"
                               style="width: 100%;overflow-x: auto">
                           <el-table-column
                                   type="selection"
                                   width="55">
                           </el-table-column>
                           <el-table-column
                                   prop="id"
                                   header-align="center"
                                   align="center"
                                   width="60"
                                   label="序号">
                               <template slot-scope="scope">
                                    <span>{{scope.$index+(pageIndex-1)*pageSize+1}}</span>
                               </template>
                           </el-table-column>
                           <el-table-column
                                   prop="type"
                                   label="报警类型"
                                   header-align="center"
                                   align="center"
                                   :filters="typeList"
                                   :filter-method="filterType"
                                   filter-placement="bottom-end"
                                   width="100">

                           </el-table-column>
                           <el-table-column
                                   prop="cameraName"
                                   label="报警设备"
                                   header-align="center"
                                   align="center"
                                   width="140">
                           </el-table-column>
                           <el-table-column
                                   prop="image"
                                   label="报警图片"
                                   header-align="center"
                                   align="center"
                                   width="100">
                               <template slot-scope="scope">
                                   <img :src="beforeUrl+scope.row.image" alt="" width="60" height="60" @click="imgClickHandle(scope.row)">
<!--                                   <canvas :id="'imgIdA'+scope.$index" width="60" height="60" @click="imgClickHandle(scope.row,index)"></canvas>-->
                               </template>
                           </el-table-column>

                           <el-table-column
                                   prop="createTime"
                                   label="报警时间"
                                   sortable
                                   header-align="center"
                                   align="center"
                                   :show-overflow-tooltip="true"
                                   column-key="date"
                           >
                           </el-table-column>
                           <el-table-column
                                   prop="cameraRef"
                                   label="报警通道"
                                   :show-overflow-tooltip="true"
                                   header-align="center"
                                   align="center">
                               <template slot-scope="scope">
                                   <div>
                                        <div class="playBtn" @click="videoPLayHandle(scope.row)">
                                       <img src="../../assets/images/AR/play.png" alt=""></div>
                                       <LivePlayer :videoUrl="beforeUrl+scope.row.image+'?format=mp4&speed=1'" :autoplay="false"  stretch class="videoBox"/>
                                   </div>

                               </template>
                           </el-table-column>
                           <el-table-column
                                   prop="status"
                                   label="处理状态"
                                   header-align="center"
                                   align="center"
                                   width="100"
                           >
                               <template slot-scope="scope">
                                   <span v-if="scope.row.status==0">未处理</span>
                                   <span v-else class="yellow">已处理</span>
                               </template>
                           </el-table-column>
                           <el-table-column
                                   prop=""
                                   header-align="center"
                                   align="center"
                                   width="100"
                                   label="操作">
                               <template slot-scope="scope">
                                   <el-row v-if="scope.row.status==0">
                                       <el-col :span="24"><el-button class="buttonStyle" size="mini" @click="trueAlert(scope.row)">处&nbsp;&nbsp;&nbsp;&nbsp;理</el-button></el-col>
                                       <el-col :span="24" class="marginT10"><el-button class="buttonStyle" size="mini" @click="undefinedHandle(scope.row.id)">未定义</el-button></el-col>
                                   </el-row>
                                   <el-row v-else>
                                       <el-col :span="24"><span class="font16">{{scope.row.updateBy}}</span></el-col>
<!--                                       <el-col :span="24" class="marginT10"><el-button class="buttonStyle" size="mini" @click="alertDetail">详情</el-button></el-col>-->
                                   </el-row>
                               </template>
                           </el-table-column>
                       </el-table>
                   </div>
                   <el-row>
                       <el-col :span="12">
                           <div class="paginationBox paddingT10">
                               <el-pagination
                                       @size-change="sizeChangeHandle"
                                       @current-change="currentChangeHandle"
                                       :current-page="pageIndex"
                                       :page-sizes="[10, 20, 50, 100]"
                                       :page-size="pageSize"
                                       :total="totalPage"
                                       layout="total, prev, pager, next,sizes">
                               </el-pagination>
                           </div>
                       </el-col>
                       <el-col :span="12">
                           <div  class="bottomOperrate paddingT25" style="text-align:right;padding-right:10px;">
                               <el-button class="buttonStyle marginT10" size="small" @click="trueAlert">批量处理</el-button>
                               <el-button class="buttonStyle marginT10" size="small" @click="undefinedHandle">批量未定义</el-button>
                           </div>
                       </el-col>
                   </el-row>

               </div>
           </div>
       </div>
        <undefined-page v-if="undefinedPageVisible" ref="undefinedPage" @refreshDataList="getAlertList"></undefined-page>
        <!--视频播放-->
        <video-play ref="videoPlay" v-if="videoPlayVisible"></video-play>
        <!--人脸截图-->
        <face-crop v-if="faceCropVisible" ref="faceCrop"></face-crop>
    </el-dialog>
</template>

<script>
    import FaceCrop from './faceCrop'
    import to from "await-to-js";
    // 按需引入点聚合
    import {BmlMarkerClusterer} from 'vue-baidu-map-v3'
    // 引入marker
    import BmMarker from 'vue-baidu-map-v3/components/overlays/Marker'
    import UndefinedPage from './undefined'
    import LivePlayer from '@liveqing/liveplayer'
    import VideoPlay from './videoPlay'
    import {resizeImage} from '../../utils/util'
    export default {
        data(){
            return{
                tableLoading:false,
                videoPlayVisible:false,
                //视频
                options: {
                    skinLayout:false,
                    height:'60px',
                    videoWidth:'60px',
                    videoHeight:'60px',
                    preload:true,   //预加载
                    cover:'',   //播放器默认封面图片
                    autoplay:false,   //播放器是否自动播放
                    source:'',
                    isLive: false,   //切换为直播流的时候必填
                    format: 'mp4'  //切换为直播流的时候必填
                },
                beforeUrl:'',
                undefinedVal:'',
                undefinedPageVisible:false,
                tableActive:0,
                /*其他*/
                dialogVisible:false,
                chooseType:'报警检索',
                tabIndex:'a',
                collectVal:'first',  //数据采集默认字段取值
                ruleForm:{
                    type:'',
                    startDate:'',
                    endDate:'',
                },
                tableData: [],
                tableData1: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                typeList:[],  //报警类型
                alertNum:'',
                deptId:'',
                dataListSelections:[],
                faceCropVisible:false,
            }
        },
        activated () {
            // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
            if (this.chartShowBox) {
                this.chartShowBox.resize()
            }
        },
        mounted(){
           // this.getAlertList()
            this.beforeUrl = 'http://'+this.$global.deviceUrl+'/archive/media/';
        },
        components:{
            BmlMarkerClusterer,
            BmMarker,
            UndefinedPage,
            LivePlayer,
            VideoPlay,
            FaceCrop
        },
        methods: {
            /*大图展示*/
            imgClickHandle(item){
                this.faceCropVisible = true;
                this.$nextTick(()=>{
                    this.$refs.faceCrop.init(item,'alert')
                })
            },
            //报警通道视频播放
            videoPLayHandle(val){
                this.videoPlayVisible = true
                this.$nextTick(()=>{
                    this.$refs.videoPlay.init(val)
                })
            },
            // 多选
            selectionChangeHandle (val) {
                this.dataListSelections = val.map(item => item.id)
            },
            //重置
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.getAlertList()
            },
            //报警列表
            async getAlertList(){
                this.tableLoading = true
                let data={
                    pageNum:this.pageIndex,
                    pageSize:this.pageSize,
                    community:this.deptId,
                    type:this.ruleForm.type,
                    createTime:this.ruleForm.startDate,
                    updateTime:this.ruleForm.endDate,
                }
                let [err, res] = await to(this.$api.AR.getAlert(data));
                if (err) return;
                if(res.data && res.data.code==200){
                    this.tableLoading = false
                    this.tableData = res.data.rows;
                    this.totalPage = res.data.total;
                }else{
                    this.tableData = []
                    this.totalPage = 0
                }
                /*对列表图片进行裁切*/
                /*this.$nextTick(()=>{
                    this.tableData.map((item,index)=>{
                        var url =this.beforeUrl + item.image
                        console.log(url,'人脸路径');
                        var position = JSON.parse(item.rectangles)[0]
                        var oCanvasA = document.querySelector('#imgIdA'+index )
                        resizeImage(url,position.w,position.h,position.x,position.y,oCanvasA)
                    })
                })*/

                console.log(res.data,'报警列表');

            },
            //获取预警事件及预警当日总数
            async getAlertInfo(){
                this.typeList=[]
                let data={
                    deptId:this.deptId,
                }
                let [err, res] = await to(this.$api.AR.getAlertType(data));
                if (err) return;
                //this.typeList = res.data.sysCallPoliceTypeVo;
                res.data.sysCallPoliceTypeVo.map((item,index)=>{
                    this.typeList.push(Object.assign({text:item.type,value:item.type}))
                })
                this.alertNum = res.data.count
                console.log(this.typeList,'this.typeList');

            },
            // 每页数
            sizeChangeHandle (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getAlertList()
            },
            // 当前页
            currentChangeHandle (val) {
                this.pageIndex = val
                this.getAlertList()
            },
            filterType(text, row) {
                console.log(text, row,'ssssss');
                return row.type === text;
            },
            init(id) {
                this.deptId = id;
                this.dialogVisible = true;
                this.$nextTick(()=>{
                    this.getAlertList()
                    this.getAlertInfo()
                })

            },
            /*车辆检索表格点击事件*/
            rowHandle(val,index){
                this.tableActive = index
                this.carSowUrl = val.wholePhoto
            },
            handleClose() {
                this.dialogVisible = false;
            },
            // 给地图设置主题色，我设置的是黑夜主题
            handler({map}) {
                let that = this;
                map.setMapStyleV2({styleId: '7ccfd12a0af1fd79733c900012aa4c00'});
                that.center.lng = 108.88832556497212
                that.center.lat = 34.16898030923822
                that.zoom = 19
            },
            /*类型选择*/
            handleCommand(command) {
                this.tabIndex = command;
                if (command == 'a') {
                    this.chooseType = '处理反馈'
                }
                if (command == 'b') {
                    this.chooseType = '信息发布'
                    this.$nextTick(() => {
                        this.chartShow("line")
                    })
                }

            },
            /*数据采集*/
            chartShow(type) {
                //数据
                var XName = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
                var data1 = [
                    [123, 154, 234, 120, 390, 634, 123, 54, 134, 120, 190, 434, 623, 354, 134, 120, 590, 434, 543, 204, 134, 420, 230],
                    [63, 194, 231, 278, 110, 534, 163, 94, 131, 378, 410, 234, 203, 294, 431, 178, 310, 334, 154, 494, 631, 278, 310],
                    [53, 254, 234, 118, 240, 434, 53, 254, 234, 118, 240, 434, 53, 254, 234, 118, 240, 434, 53, 254, 234, 118, 240],
                    [23, 354, 334, 178, 190, 234, 23, 354, 334, 178, 190, 234, 23, 354, 334, 178, 190, 234, 23, 354, 334, 178, 190],
                ]
                var Line = ["重点车辆", "陌生车辆", "居民车辆"];

                var color = ['#00f15a', '#0696f9', '#dcf776'];

//数据处理
                var datas = [];
                Line.map((item, index) => {
                    datas.push(
                        {
                            symbolSize: 10,
                            symbol: 'circle',
                            name: item,
                            type: type,
                            yAxisIndex: 1,
                            data: data1[index],
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    color: color[index],
                                }
                            }
                        }
                    )
                })

                var option = {
                    grid: {
                        left: '11%',
                        top: '5%',
                        bottom: '15%',
                        right: '10%',
                    },
                    legend: {
                        data: ["重点车辆", "陌生车辆", "居民车辆"],
                        bottom: 0,
                        textStyle: {
                            color: '#16DADE'
                        }
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
                                    width: .5,
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
                            name: '点',
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
                                interval: 0,
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
                                interval: 0,
                            },
                            splitArea: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            //-----
                            // data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                        },
                    ],
                    series: datas,
                };

                this.chartShowBox = this.$echarts.init(document.getElementById('chartShowBox'))
                this.chartShowBox.setOption(option)
                window.addEventListener('resize', () => {
                    this.chartShowBox.resize()
                })
            },
            chartTypeChange(val) {
                if (val == 1) {
                    this.chartShow("line")
                }
                if (val == 2) {
                    this.chartShow("bar")
                }

            },
            /*真告警*/
            trueAlert(val){
                const Ids = val.id || this.dataListSelections.join(',')
                let data={
                    status:2,
                    ids:Ids
                }
                this.$confirm('确定执行假告警?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async()=> {
                    let [err, res] = await to(this.$api.AR.getAlertUpdate(data));
                    if (err) return;
                    console.log(res,'res');
                    if(res.data.code==200){
                        this.getAlertList()
                    }else{
                        this.$message.error(res.data.msg)
                    }

                })
            },
            /*假告警*/
            async falseAlert(val){
                const Ids = val.id || this.dataListSelections.join(',')
                let data={
                    status:1,
                    ids:Ids
                }
                this.$confirm('确定执行假告警?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async()=> {
                    let [err] = await to(this.$api.AR.getAlertUpdate(data));
                    if (err) return;
                    this.getAlertList()
                })
            },
            /*未定义*/
            undefinedHandle(id){
                this.undefinedPageVisible = true;
                this.$nextTick(()=>{
                    this.$refs.undefinedPage.init(id,'alertFlag')
                })
            },
            /*详情*/
            alertDetail(){

            }
        }
    }
</script>

<style scoped>
    .bm-view {
        width: 100%;
        height:700px;
    }
    .videoBox{
        width:60PX;
        height:60PX;
        position:relative;
        top:0px;
        left:0px;
        z-index:0;
    }
    .playBtn{
        position:absolute;
        width:60PX;
        height:60PX;
        top:10PX;
        left:10PX;
        z-index:1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .playBtn img{margin-left:10px;}

</style>
