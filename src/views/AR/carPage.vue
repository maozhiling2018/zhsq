<template>
    <el-dialog
            title="车牌识别"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :before-close="handleClose">
       <div class="dialogCon">
           <div class="leftBox">
               <el-dropdown @command="handleCommand" style="width:100%;">
                   <el-button type="primary">
                       {{chooseType}}<i class="el-icon-arrow-down el-icon--right"></i>
                   </el-button>
                   <el-dropdown-menu slot="dropdown" style="margin-top:0px;width:258px;border-radius:0px 0px 4px 4px;">
                       <el-dropdown-item  command="a">车牌检索</el-dropdown-item>
                       <el-dropdown-item  command="b">数据统计</el-dropdown-item>
                   </el-dropdown-menu>
               </el-dropdown>
               <!--车牌检索-->
               <div class="commandA" v-if="tabIndex=='a'">
                   <div style="width:90%;margin:20px auto 0px auto">
                       <el-form :model="ruleForm"  ref="ruleForm" class="demo-ruleForm">
                           <el-form-item label="" prop="community">
                               <el-select v-model="ruleForm.community" filterable placeholder="请选择" style="width:100%" size="mini" @change="deptChange">
                                   <el-option
                                           v-for="item in options"
                                           :key="item.deptId"
                                           :label="item.deptName"
                                           :value="item.deptId">
                                   </el-option>
                               </el-select>
                           </el-form-item>
                           <el-form-item label="" prop="carNo">
                               <el-input v-model="ruleForm.carNo" placeholder="输入车牌号码"></el-input>
                           </el-form-item>
                           <el-form-item label="" prop="name" >
                               <el-input v-model="ruleForm.name" placeholder="输入车主姓名"></el-input>
                           </el-form-item>
                           <el-form-item label="" prop="startDate">
                               <el-date-picker
                                       v-model="ruleForm.startDate"
                                       type="date"
                                       style="width:100%;"
                                       value-format="yyyy-MM-dd HH:mm:ss"
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
                               <el-button type="primary" v-if="!trackVisible" @click="getCarDataList" style="width:40%;border-radius:4px;float:left;">查询</el-button>
                               <el-button type="primary" v-if="!trackVisible" @click="reSetDataList('ruleForm')" style="width:40%;border-radius:4px;float:left;">重置</el-button>
                               <el-button type="primary" v-if="trackVisible" @click="getCarDataList" style="width:45%;border-radius:4px;float:left;">查询</el-button>
                               <el-button type="delete"  v-if="trackVisible" @click="trackVisible=false" style="width:45%;border-radius:4px;float:left;">返回</el-button>
                           </el-form-item>
                       </el-form>
                   </div>
                   <div class="carShowBox">
                       <div class="carTitle">车辆全身</div>
                       <div class="carImg">
                           <img :src="carSowUrl" alt="">
                       </div>
                   </div>
               </div>
               <!--数据统计-->
               <div class="commandC" v-if="tabIndex=='b'">
                   <div class="menuDiv">数据统计</div>
               </div>
           </div>
           <div class="rightBox">
               <div class="listDiv" v-if="tabIndex=='a'" v-infinite-scroll="getCarDataList">
                   <div v-if="collectVal=='first'">
                       <div v-if="!trackVisible" v-for="(item,index) in dataSearch" :key="index" :class="tableActive==index?'el-row-flex borderBottom padding10 activeRow':'el-row-flex borderBottom padding10'" style="height:auto;cursor:pointer;" @click="rowHandle(item,index)">
                           <div class="carBox" @click="imgClickHandle(item,index)">
                               <img :src="beforeUrl+item.image" alt="" v-if="item.image!==null">
                               <img :src="carSowUrl" alt="" v-else>
                           </div>
                           <!--<div class="carBox" @click="imgClickHandle(item,index)">
                               <canvas :id="'imgId'+index" width="110" height="70"></canvas>
                           </div>-->
                           <div class="photoInfo">
                               <el-form  label-width="80px">
                                   <el-row>
                                       <el-col :span="10" class="textLeft">
                                           <el-form-item label="车牌号">：{{item.plate}}</el-form-item>
                                       </el-col>
                                       <el-col :span="10" class="textLeft">
                                           <el-form-item label="车主">：{{item.personnelName}}</el-form-item>
                                       </el-col>
                                   </el-row>
                                   <el-row>
                                       <el-col :span="10" class="textLeft">
                                           <el-form-item label="卡口名称">：{{item.cameraName}}</el-form-item>
                                       </el-col>
                                       <el-col :span="10" class="textLeft">
                                           <el-form-item label="通卡时间">：{{item.createTime}}</el-form-item>
                                       </el-col>
                                   </el-row>
                                  <!-- <el-row>
                                       <el-col :span="10" class="textLeft">
                                           <el-form-item label="设备名称">：{{item.cameraName}}</el-form-item>
                                       </el-col>

                                   </el-row>-->
                               </el-form>
                           </div>
                           <div class="trackBtn">
                               <el-button class="buttonStyle" @click.native="trackHandle(item)">轨迹分析</el-button>
                           </div>
                       </div>
                       <!--轨迹分析-->
                       <div v-if="trackVisible"  id="allMap">
                           <baidu-map class="bm-view":center="center" :zoom='zoom' :scroll-wheel-zoom='true' @ready="handler">
                               <bml-marker-clusterer :averageCenter="false">
                                   <div v-for="(marker, i) of points" :key="i">
                                       <bm-marker
                                               :dragging="true"
                                               :icon="{url: marker.url, size: { width: 42, height: 42 }}"
                                               :position="{lng: marker.lng, lat: marker.lat}"
                                              >
                                       </bm-marker>
                                       <bm-label :content="marker.number" :position="{lng: marker.lng, lat: marker.lat}" :labelStyle="labelStyle" />
                                   </div>
                               </bml-marker-clusterer>

                           </baidu-map>

                       </div>
                   </div>
               </div>
               <div class="commandRightC" v-if="tabIndex=='b'">
                   <div class="flex-end margin10">
                       <el-select v-model="chartTypeVal" placeholder="请选择" @change="chartTypeChange" style="width:15%;">
                           <el-option
                                   v-for="item in chartType"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                           </el-option>
                       </el-select>
                   </div>
                   <div id="chartShowBox" class="chartBox"></div>
               </div>
           </div>
       </div>
        <!--车辆截图-->
        <car-crop v-if="carCropVisible" ref="carCrop"></car-crop>
    </el-dialog>
</template>

<script>
    import {resizeImage} from '../../utils/util'
    import to from "await-to-js";
    // 按需引入点聚合
    import {BmlMarkerClusterer} from 'vue-baidu-map-v3'
    // 引入marker
    import BmMarker from 'vue-baidu-map-v3/components/overlays/Marker'
    import carImg from '../../assets/images/AR/carImg.jpg'
    import CarCrop from './carCrop'
    export default {
        data(){
            return{
                carCropVisible:false,
                beforeUrl:'',
                options:[],
                tableActive:0,
                carSowUrl:carImg,
                /*轨迹分析*/
                labelStyle:{
                    width:'20px',
                    height:'20px',
                    borderRadius:'50%',
                    backgroundColor:'red',
                    color:'#fff',
                    textAlign:'center',
                    lineHeight:'20px',
                    fontSize:'12px'
                },
                center: {
                    lng: 0,
                    lat: 0
                },
                zoom: 18,
                polygonPath: [
                    {lng: 108.886714376822, lat: 34.16769070250782},
                    {lng: 108.89032556497212, lat: 34.16778030923822},
                    {lng: 108.89030759886191, lat: 34.169975644142646},
                    {lng: 108.88879844560515, lat: 34.1702444567012},
                    {lng: 108.8867503090424, lat: 34.17021458868181},
                ],
                points: [],
                /*其他*/
                dialogVisible:false,
                chooseType:'车牌检索',
                tabIndex:'a',
                collectVal:'first',  //数据采集默认字段取值
                ruleForm:{
                    community:'',
                    carNo:'',
                    name:'',
                    startDate:'',
                    endDate:'',
                },
                dataSearch:[],
                chartType:[
                    {label:'折线统计',value:1,type:'line'},
                    {label:'柱状统计',value:2,type:'pie'},
                    // {label:'柱状统计',value:3},
                ],
                chartTypeVal:1,
                chartShowBox:null,
                trackVisible:false,
                totalPage:0,
                map:null,
                XName:[],
                dataVal:[]
            }
        },
        activated () {
            // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
            if (this.chartShowBox) {
                this.chartShowBox.resize()
            }
        },
        created(){
            this.beforeUrl = 'http://'+this.$global.deviceUrl+'/archive/media/';

            this.getCarDataList()
            this.getTreeList()
        },
        components:{
            BmlMarkerClusterer,
            BmMarker,
            CarCrop,
        },
        methods: {
            /**重置表单*/
            reSetDataList(){
                // this.$refs[formName].resetFields();
                this.ruleForm.carNo='',
                this.ruleForm.name='',
                this.ruleForm.startDate='',
                this.ruleForm.endDate='',
                this.getCarDataList()
            },
            /**小区切换*/
            deptChange(val){
                this.ruleForm.community = val;
            },
            //获取用户所能管理的部门列表
            async getTreeList(){
                let [err, res] = await to(this.$api.login.getTree());
                if (err) return;
                this.options = res.data.data;
                console.log(this.options,'this.options');
                this.ruleForm.community = this.options[0].deptId;
                this.$cookie.set('deptId', this.searchVal)
            },
            /*获取车辆列表*/
            async getCarDataList(){
                let data={
                    community:this.ruleForm.community,
                    pageNum:this.pageIndex,
                    pageSize:this.pageSize,
                    createTime:this.ruleForm.startDate,
                    updateTime:this.ruleForm.endDate,
                    plate:this.ruleForm.carNo,
                    cameraName:this.ruleForm.name,
                }
                let [err, res] = await to(this.$api.AR.getCarList(data));
                if (err) return;
                this.dataSearch = res.data.rows;
                /*/!*对列表图片进行裁切*!/
                this.$nextTick(()=>{
                    this.dataSearch.map((item,index)=>{
                        var url = this.beforeUrl + item.image
                        var position = JSON.parse(item.rectangles)[0]
                        resizeImage(url,position.w,position.h,position.x,position.y,index)
                    })
                })*/
                this.totalPage = res.data.total;
                console.log(res.data,'获取车辆列表');
            },
            /*大图展示*/
            imgClickHandle(item){
                this.carSowUrl=''
                this.carSowUrl = this.beforeUrl + item.image
                console.log(this.carSowUrl,'this.carSowUrl');
                /*this.carCropVisible = true;
                this.$nextTick(()=>{
                    this.$refs.carCrop.init(item)
                })*/
            },
            /*轨迹分析*/
            async getTrack(plate){
                this.points=[]
                let data={
                    community:this.ruleForm.community,
                    plate:plate,
                    createTime:'',
                    updateTime:'',
                }
                let [err, res] = await to(this.$api.AR.getCarTrack(data));
                if (err) return;
                console.log(res,'轨迹分析111');
                res.data.data.map(item=>{
                    this.points.push(Object.assign({
                        lng: Number(item.longtitude),
                        lat: Number(item.latitude),
                        propVisible:false,
                        number:item.cout.toString(),
                        url: require('../../assets/images/AR/car.png')
                    }))
                })
                //this.map.center = [this.points[0].lng,this.points[0].lat]
            },
            init(id) {
                this.dialogVisible = true;
                this.trackVisible = false;
                this.ruleForm.community = id;
                this.$nextTick(()=>{
                    this.getCarDataList()
                })
            },
            /*车辆检索表格点击事件*/
            rowHandle(val,index){
                this.tableActive = index
            },
            handleClose() {
                this.dialogVisible = false;
            },
            /*轨迹分析*/
            trackHandle(val){
                this.trackVisible = true;
                this.getTrack(val.plate)
            },
            // 给地图设置主题色，我设置的是黑夜主题
            handler({map}) {
                let that = this;
                map.setMapStyleV2({styleId: '7ccfd12a0af1fd79733c900012aa4c00'});
                that.center.lng = 108.958116
                that.center.lat = 34.203957
                that.zoom = 17
            },
            /*类型选择*/
            handleCommand(command) {
                this.tabIndex = command;
                if (command == 'a') {
                    this.chooseType = '车牌检索'
                    this.reSetDataList()
                }
                if (command == 'b') {
                    this.chooseType = '数据统计'
                    this.getDataChart()
                }

            },
            /*数据统计*/
            async getDataChart(){
                console.log('999');
                this.XName =[]
                this.dataVal =[]
                let data={
                    community:this.ruleForm.community
                }
                let [err, res] = await to(this.$api.AR.getChart(data));
                if (err) return;
                console.log(res,'res');
                if(res.data && res.data.data.length>0){
                    res.data.data.map(item=>{
                        this.XName.push(item.days)
                        this.dataVal.push(item.cout)
                    })
                    this.$nextTick(()=>{
                        this.chartShow("line")
                    })
                }
            },
            /*数据采集*/
            chartShow(type,XName,dataVal) {
                console.log(XName, dataVal,'XName,dataVal');
                //数据
                var XName = this.XName
                var data1 = [this.dataVal]
                var Line = ["车辆统计"];

                var color = ['#00f15a'];

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
                        data: ["车辆统计"],
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
        }
    }
</script>

<style scoped>
    .bm-view {
        width: 100%;
        height:700px;
    }

</style>
