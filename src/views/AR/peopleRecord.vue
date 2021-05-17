<template>
    <el-dialog
            :title="defaultVisible?'一人一档':'人员列表'"
            :visible.sync="dialogVisible"
            v-if="dialogVisible"
            :modal-append-to-body="false"
            :append-to-body="true"
            class="dialogBox"
            :before-close="handleClose">
        <div class="backBtn" @click="backHandle" v-if="listVisible || listVisiblePeople">
            <el-button type="delete"  icon="el-icon-back">返回</el-button>
        </div>
        <div class="dialogCon">
            <div v-if="defaultVisible">
                <div class="leftBox" style="width:40%;">
                    <el-tabs v-model="collectVal" @tab-click="handleClick" class="commandTabs" style="width:96%;">
                        <el-tab-pane label="基础信息" name="first">
                            <el-row class="marginT10">
                                <el-col :span="24">
                                    <el-select v-model="deptId" filterable placeholder="请选择" style="width:80%" @change="deptChange">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.deptId"
                                                :label="item.deptName"
                                                :value="item.deptId">
                                        </el-option>
                                    </el-select>
                                    <el-button type="primary" size="small" style="border-radius: 0px 4px 4px 0px;height:36px;" @click="getTableList">搜索</el-button>
                                </el-col>
                                <el-col :span="24" class="marginT20">
                                    <el-table
                                            :data="tableData"
                                            row-key="id"
                                            stripe
                                            ref="singleTable"
                                            :tree-props="{children: 'children', hasChildren: 'hasChildren',}"
                                            :highlight-current-row="true"
                                            @current-change="handleCurrentChange"
                                            style="width: 100%">
                                        <el-table-column
                                                prop="tung"
                                                header-align="center"
                                                align="center"
                                                label="楼号"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="unit"
                                                header-align="center"
                                                align="center"
                                                label="单元"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="cont"
                                                header-align="center"
                                                align="center"
                                                label="人口数量"
                                                width="100">
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="重点人口" name="second">
                            <el-row class="marginT10">
                                <el-col :span="24" class="marginT20">
                                    <el-table
                                            :data="tableDataPeople"
                                            row-key="id"
                                            stripe
                                            ref="singleTablePeople"
                                            :tree-props="{children: 'children', hasChildren: 'hasChildren',}"
                                            :highlight-current-row="true"
                                            @current-change="handleCurrentChangeKeyPeople"
                                            style="width: 100%">
                                        <el-table-column
                                                prop="deptName"
                                                header-align="center"
                                                align="center"
                                                label="小区"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="cout"
                                                header-align="center"
                                                align="center"
                                                label="人口数量"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="cont"
                                                header-align="center"
                                                align="center"
                                                label="操作"
                                                width="100">
                                            <template slot-scope="scope">
                                                <el-button type="delete" size="mini" style="border:unset;" @click="handleClickRow(scope.row)">查看</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="rightBox" style="width:calc(100% - 41%)">
                    <div v-if="collectVal=='first'" class="tabChartBox">
                        <el-tabs v-model="chartType" @tab-click="chartClick" :lazy="true">
                            <el-tab-pane label="小区人口户籍统计" name="1">
                                <div id="chartMapDiv" class="chartMap"></div>
                            </el-tab-pane>
                            <el-tab-pane label="小区人口年龄性别统计" name="2">
                                <div class="changeBtn">
                                    <el-button :type="changeActive=='age'?'primary':'delete'" @click="changeAge('age')" size="mini">年龄</el-button>
                                    <el-button :type="changeActive=='sex'?'primary':'delete'" @click="changeSex('sex')" size="mini">性别</el-button>
                                </div>
                                <div id="chartPieDiv" class="chartMap" v-if="changeActive=='age'"></div>
                                <div id="chartSexDiv" class="chartMap" v-if="changeActive=='sex'"></div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="tabChartBox" v-else>
                        <div class="flex-end margin10">
                            <el-select v-model="chartTypeVal" placeholder="请选择" @change="chartTypeChange" style="width:20%;">
                                <el-option
                                        v-for="item in chartTypeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div id="chartShowBoxPeople" class="chartBox"></div>
                    </div>
                </div>
            </div>
            <div v-if="listVisible">
                <div class="peopleListBox">
                    <div class="listDiv photoInfo">
                        <el-row :gutter="30" v-for="(item,index) in peopleList" :key="index" class="listBox">
                            <el-col :span="4">
                                <div class="photo padding0">
                                    <div class="photoBg">
                                        <img :src="item.picture" alt="" v-if="item.picture !==''">
                                    </div>
                                </div>
                                <div class="font16 color1">采集照片</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="photo padding0">
                                    <div class="photoBg">
                                        <img :src="item.idPositive" alt="" v-if="item.idPositive !==''">
                                    </div>
                                </div>
                                <div class="font16 color1">身份证照片</div>
                            </el-col>
                            <el-col :span="16">
                                <div class="peopleBug">
                                    <el-form label-width="80px">
                                        <el-col :span="12">
                                            <el-form-item label="姓名">：{{item.name}}</el-form-item>
                                        </el-col>
                                        <el-col :span="12" >
                                            <el-form-item label="身份证号">：{{item.idNumber}}</el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="联系电话">：{{item.telephone}}</el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="住户类型">：
                                                <span v-if="item.dictCode==0">业主</span>
                                                <span v-if="item.dictCode==1">租户</span>
                                                <span v-if="item.dictCode==2">访客</span>
                                            </el-form-item>
                                        </el-col>
                                       <!-- <el-col :span="12">
                                            <el-form-item label="是否外籍：">{{item.isForeign}}</el-form-item>
                                        </el-col>-->
                                        <el-col :span="12">
                                            <el-form-item label="小区名称">：{{item.deptName}}</el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="楼宇名称">：{{item.tung}}栋{{item.unit}}单元</el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="登记时间">：{{item.createTime}}</el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="民族">：{{item.nation}}</el-form-item>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-form-item label="户籍地址">：{{item.address}}</el-form-item>
                                        </el-col>
                                    </el-form>
                                </div>

                            </el-col>
                        </el-row>
                    </div>
                    <div class="paginationBox">
                        <el-pagination
                                @size-change="sizeChangeHandle"
                                @current-change="currentChangeHandle"
                                :current-page="pageIndex"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size="pageSize"
                                :total="totalPage"
                                 layout="total, sizes, prev, pager, next">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div v-if="listVisiblePeople">
                <div class="peopleListBox">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left:20px;">
                        <el-form-item label="">
                            <el-input v-model="formInline.key" placeholder="请输入关键字"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select v-model="formInline.typeVal" placeholder="全部类型">
                                <el-option :label="item.categoryName" :value="item.categoryId" v-for="(item,index) in typeList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="delete" @click="getKeyPeopleTableList" size="small">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="listDiv photoInfo">
                        <el-row :gutter="30" v-for="(item,index) in peopleList" :key="index" class="listBox">
                            <el-col :span="4">
                                <div class="photo padding0">
                                    <div class="photoBg">
                                        <img :src="item.picture" alt="" v-if="item.picture !==''">
                                    </div>
                                </div>
                                <div class="font16 color1">采集照片</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="photo padding0">
                                    <div class="photoBg">
                                        <img :src="item.idPositive" alt="" v-if="item.idPositive !==''">
                                    </div>
                                </div>
                                <div class="font16 color1">身份证照片</div>
                            </el-col>
                            <el-col :span="16">
                                <div class="peopleBug">
                                    <el-form label-width="80px">
                                        <el-col :span="12">
                                            <el-form-item label="姓名">：{{item.name}}</el-form-item>
                                        </el-col>
                                        <el-col :span="12" >
                                            <el-form-item label="身份证号">：{{item.idNumber}}</el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="联系电话">：{{item.telephone}}</el-form-item>
                                        </el-col>
                                        <!--<el-col :span="12">
                                            <el-form-item label="住户类型">：
                                                <span v-if="item.dictCode==0">业主</span>
                                                <span v-if="item.dictCode==1">租户</span>
                                                <span v-if="item.dictCode==2">访客</span>
                                            </el-form-item>
                                        </el-col>-->
                                        <!-- <el-col :span="12">
                                             <el-form-item label="是否外籍：">{{item.isForeign}}</el-form-item>
                                         </el-col>-->
                                        <el-col :span="12">
                                            <el-form-item label="小区名称">：{{item.deptName}}</el-form-item>
                                        </el-col>
                                       <!-- <el-col :span="12">
                                            <el-form-item label="楼宇名称">：{{item.tung}}栋{{item.unit}}单元</el-form-item>
                                        </el-col>-->
                                        <el-col :span="12">
                                            <el-form-item label="登记时间">：{{item.createTime}}</el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="民族">：{{item.nation}}</el-form-item>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-form-item label="户籍地址">：{{item.address}}</el-form-item>
                                        </el-col>
                                    </el-form>
                                </div>

                            </el-col>
                        </el-row>
                    </div>
                    <div class="paginationBox">
                        <el-pagination
                                @size-change="sizeChangeHandle"
                                @current-change="currentChangeHandle"
                                :current-page="pageIndex"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size="pageSize"
                                :total="totalPage"
                                layout="total, sizes, prev, pager, next">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import to from "await-to-js";
    export default {
        data() {
            return {
                typeList:[],
                formInline:{
                   typeVal:'',
                   key:''
                },
                pageIndex: 1,
                pageSize: 10,
                chartShowBox:null,
                deptId:'',
                totalPage:0,
                dialogVisible: false,
                defaultVisible: true,
                listVisible: false,
                listVisiblePeople: false,
                collectVal: 'first',
                tableData: [],
                tableDataPeople: [],
                options:[],
                peopleList: [],
                chartType:'1',  //默认小区人口户籍统计
                chartMapBox:null,
                chartPieBox:null,
                chartSexBox:null,
                changeActive:'age', //默认设置年龄图表
                mapData:[],  //人口分布字段
                sexData:[]   ,  //性别接收字段
                ageData:[],  //年龄接收字段
                totalNum:'',  //年龄总数
                tung:'',  //栋
                unit:'',  //单元
                ascription:'',
                XName:[],
                seriesDataList:[],
                chartTypeList:[
                    {label:'折线统计',value:1,type:'line'},
                    {label:'柱状统计',value:2,type:'pie'},
                    // {label:'柱状统计',value:3},
                ],
                chartTypeVal:2,
            }
        },
        activated() {
            if (this.chartMapBox) {
                this.chartMapBox.resize()
            }
            if (this.chartPieBox) {
                this.chartPieBox.resize()
            }
            if (this.chartSexBox) {
                this.chartSexBox.resize()
            }
        },
        created(){
            this.handleClick('first')
            this.eventbus.$on('changeVal',(val)=>{
                this.deptId = val
                this.$nextTick(() => {
                    this.mapChart()
                    this.getTableList()
                    this.getTreeList()
                })
            })
        },
        methods: {
            //重点人口类型数据获取
            async getKeyPeopleTypeData(){
                let [err,res] = await to(this.$api.AR.getKeyPeopType())
                if(err) return
                if(res.data.code==200){
                    var addObj = [{categoryName:'请选择',categoryId:''}]
                    this.typeList = [...addObj,...res.data.data];
                }
                console.log(this.typeList,'重点人口类型数据获取')
            },
            // 每页数
            sizeChangeHandle (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.handleClickRow()
            },
            // 当前页
            currentChangeHandle (val) {
                this.pageIndex = val
                this.handleClickRow()
            },
            handleClickRow(row){
                this.deptId = row.deptId
                this.peopleList =[]
                this.listVisible = false;
                this.defaultVisible = false
                this.listVisiblePeople = true
                this.$nextTick(()=>{
                    this.getKeyPeopleTableList()
                    this.getKeyPeopleTypeData()
                })
            },
            async getKeyPeopleTableList(){
                let data = {
                    pageNum:this.pageIndex,
                    pageSize:this.pageSize,
                    deptId:this.deptId,
                    categoryId:this.formInline.typeVal,
                    name:this.formInline.key,
                }
                let [err, res] = await to(this.$api.AR.getFocalPersonnel(data));
                if (err) return;
                console.log(res.data,'resres22222222222222');
                this.peopleList = res.data.rows;
                this.totalPage = res.data.total;
            },
            chartTypeChange(val) {
                console.log(val,'valval')
                if (val == 1) {
                    this.keyPeopleChartShow("line")
                }
                if (val == 2) {
                    this.keyPeopleChartShow("bar")
                }

            },
            //重点人口图表展示
            keyPeopleChartShow(type) {
                console.log(this.XName,'this.XName')
                var XName = []
                XName = this.XName
                var option = {
                    grid: {
                        left: '11%',
                        top: '5%',
                        bottom: '15%',
                        right: '10%',
                    },
                    legend: {
                        data: ["昕博朗学校路线", "新华小学路线", "云锦五路路线"],
                        bottom: 0,
                        textStyle: {
                            color: '#16DADE'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function (params) {
                            console.log(params,'mzl')
                            var tar = params[0];
                            return tar.name + ' : '+ tar.value;
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
                    series: [
                        {
                            symbolSize: 10,
                            symbol: 'circle',
                            name: '',
                            type: type,
                            yAxisIndex: 1,
                            data: this.seriesDataList,
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    color: '#00f15a',
                                }
                            }
                        }
                    ]
                }
                this.chartShowBox = this.$echarts.init(document.getElementById('chartShowBoxPeople'))
                this.chartShowBox.clear()
                this.chartShowBox.setOption(option)
                window.addEventListener('resize', () => {
                    this.chartShowBox.resize()
                })
            },
            //获取重点人口数据
            async getKeyPeopleData(){
                this.tableDataPeople=[]
                let [err, res] = await to(this.$api.AR.getKeyPeopleMenu());
                if (err) return;
                if(res.data.code==200){
                    this.tableDataPeople = res.data.data;
                    this.$nextTick(()=>{
                        this.tableDataPeople.map((item,index)=>{
                            console.log(item,'55555')
                            if(item.deptId ==this.deptId){
                                this.$refs.singleTablePeople.setCurrentRow(this.tableDataPeople[index])
                            }
                        })

                    })
                }
                console.log(res,'获取重点人口数据')
            },
            init(id) {
                console.log(id,'22');
                this.deptId = id
                this.dialogVisible = true;
                this.defaultVisible = true,
                this.listVisible = false,
                this.listVisiblePeople = false,
                this.collectVal = 'first'
                this.chartType = '1'
                this.$nextTick(() => {
                    this.mapChart()
                    this.getTableList()
                    this.getTreeList()
                })
            },
            //小区切换
            deptChange(value){
                this.getTableList()
            },
            //获取用户所能管理的部门列表
            async getTreeList(){
                let [err, res] = await to(this.$api.login.getTree());
                if (err) return;
                this.options = res.data.data;
            },
            //获取基础信息表格列表
            async getTableList(){
                let data={
                    deptId:this.deptId
                }
                let [err, res] = await to(this.$api.AR.getTableData(data));
                if (err) return;
                console.log(res.data,'xinxi ');
                if(res.data.buildingVo.length>0){
                    this.tableData = res.data.buildingVo
                    this.$nextTick(()=>{
                        this.$refs.singleTable.setCurrentRow(this.tableData[0])
                    })
                    console.log(this.tableData,'his.tableData');
                }else{
                    this.tableData =[]
                    this.sexData=[]
                    this.mapData=[]
                    this.ageData=[]
                    this.totalNum = 0
                    this.mapChart()
                }

                console.log(this.tableData,'this.tableData');

            },
            /*左侧表格点击事件*/
            async handleCurrentChange(val){
                this.sexData=[]
                this.mapData=[]
                this.ageData=[]
                if(val !==null){
                    this.tung = val.tung;
                    this.unit = val.unit;
                    let data = {
                        deptId:this.deptId,
                        tung:this.tung,
                        unit:this.unit,
                    }
                    let [err, res] = await to(this.$api.AR.getPeopleMap(data));
                    let [err1, res1] = await to(this.$api.AR.getSexData(data));
                    let [err2, res2] = await to(this.$api.AR.getAgeData(data));
                    if (err) return;
                    if (err1) return;
                    if (err2) return;
                    if(res.data.vehicleVo.length>0){
                        res.data.vehicleVo.map(item=>{
                            this.mapData.push(Object.assign({name:item.ascription,value:item.cout,selected:true}))
                        })
                    }else{
                        this.mapData = []
                    }
                    this.mapChart()
                    //性别
                    if(res1.data.vehicleVo.length>0){
                        console.log(res1.data.vehicleVo,'性别长度')
                        res1.data.vehicleVo.map(item=>{
                            this.sexData.push(Object.assign({name:item.sex==1?'男':'女',value:item.cout}))
                        })
                    }else{ this.sexData = []}
                    //年龄
                    if(res2.data.personnelAgeVo !==null){
                        console.log(res2.data.personnelAgeVo,'1111111111');
                        this.ageData=[
                            {name:'0-18岁',value:res2.data.personnelAgeVo.cout18},
                            {name:'18-40岁',value:res2.data.personnelAgeVo.cout40},
                            {name:'40-60岁',value:res2.data.personnelAgeVo.cout60},
                            {name:'60-80岁',value:res2.data.personnelAgeVo.cout80},
                            {name:'80岁以上',value:res2.data.personnelAgeVo.cout90}
                        ]
                        this.totalNum = res2.data.personnelAgeVo.cout
                        /* this.$nextTick(()=>{
                             this.initPieChart()
                         })*/
                    }else{
                        this.ageData = []
                    }
                    if(document.getElementById('chartPieDiv') !==null){
                        this.initPieChart()
                    }
                    if(document.getElementById('chartSexDiv') !==null){
                        console.log(this.sexData,'cesi')
                        //this.initSexChart()
                    }
                }
            },
            /*左侧表格点击事件--重点人口*/
            async handleCurrentChangeKeyPeople(val){
                this.seriesDataList=[]
                var dataListA = []
                if(val !==null){
                    let data = {
                        deptId:val.deptId,
                    }
                    let [err, res] = await to(this.$api.AR.getKeyPeopChart(data));
                    if (err) return;
                    console.log(res,'点击事件')
                    if(res.data.code==200){
                        dataListA = res.data.data
                        console.log(dataListA,'dataListA')
                        this.XName = []
                        dataListA.map(item=>{
                            this.XName.push(item.categoryName)
                            this.seriesDataList.push(item.cout)
                        })
                        console.log(this.XName,'99888')
                        this.$nextTick(()=>{
                            this.keyPeopleChartShow('bar')
                        })
                    }
                    console.log(res,'重点人口')
                }
            },

            handleClose() {
                this.dialogVisible = false
            },
            /*基础信息，重点人口切换*/
            handleClick(tab) {
                if (tab.name == 'first') {
                    setTimeout(()=>{this.mapChart()},100)
                }
                if(tab.name=='second'){
                     setTimeout(()=>{
                        this.getKeyPeopleData()
                        this.chartTypeChange(1)
                    },100)
                }
            },
            /*户籍，年龄、性别切换*/
            chartClick(tab) {
                if (tab.name == '1') {
                    this.mapChart()
                }
                if (tab.name == '2') {
                    this.$nextTick(()=>{
                        this.initPieChart()
                    })

                }
            },
            /*地图加载*/
            mapChart() {
                this.chartMapBox = this.$echarts.init(document.getElementById('chartMapDiv'))
                var options = {
                    tooltip: {
                        show: true,
                        formatter: function (params) {
                            if (isNaN(params.value)) {
                                return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + 0 + '人&nbsp;&nbsp;';
                            } else {
                                return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value + '人&nbsp;&nbsp;';
                            }
                        },

                    },

                    geo: {
                        map: 'china',
                        aspectScale: 0.85,
                        layoutCenter: ["50%", "50%"], //地图位置
                        layoutSize: '100%',
                        itemStyle: {
                            normal: {
                                shadowColor: '#276fce',
                                shadowOffsetX: 0,
                                shadowOffsetY: 15,
                                opacity: 0.5,
                            },
                            emphasis: {
                                areaColor: '#276fce',
                            }
                        },
                        regions: [{
                            name: '南海诸岛',
                            itemStyle: {
                                areaColor: 'rgba(0, 10, 52, 1)',

                                borderColor: 'rgba(0, 10, 52, 1)',
                                normal: {
                                    opacity: 0,
                                    label: {
                                        show: false,
                                        color: "#009cc9",
                                    }
                                },


                            },
                            label: {
                                show: false,
                                color: '#FFFFFF',
                                fontSize: 12,
                            },


                        }],

                    },
                    series: [{
                        type: 'map',
                        mapType: 'china',
                        aspectScale: 0.85,
                        layoutCenter: ["50%", "50%"], //地图位置
                        layoutSize: '100%',
                        zoom: 1, //当前视角的缩放比例
                        //roam: true, //是否开启平游或缩放
                        scaleLimit: { //滚轮缩放的极限控制
                            min: 1,
                            max: 2
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#0c274b',
                                borderColor: '#1cccff',
                                borderWidth: 1.5


                            },
                            emphasis: {
                                borderWidth: 1,
                                borderColor: '#16DADE',
                                areaColor: '#086EF0',
                                label: {
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: '14',
                                        lineHeight: 20,
                                    },
                                    formatter(params) {
                                        let arr = []
                                        if (isNaN(params.value)) {
                                            arr = [params.name, +0 + "人"];
                                        } else {
                                            arr = [params.name, +params.value + "人"];
                                        }

                                        return arr.join("\n")

                                    }
                                },


                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: '12'
                                },
                            },

                        },

                        data: this.mapData,
                        /*data: [
                            {
                                name:'澳门',
                                value:221,
                                selected:true
                            }
                        ],*/

                    }]
                };
                this.chartMapBox.setOption(options)
                window.addEventListener('resize', () => {
                    this.chartMapBox.resize()
                })
                this.chartMapBox.off('click')
                this.chartMapBox.on('click', async(e) => {
                    this.ascription = e.name
                    if (isNaN(e.value)) {
                        this.$message.warning('该区域没有数据，请重新选择')
                    } else {
                       this.getPeopleData()
                    }
                })
            },
            //获取人员列表
            async getPeopleData(e){
                this.peopleList=[]
                let data = {
                    deptId:this.deptId,
                    tung:this.tung,
                    unit:this.unit,
                    ascription:this.ascription,
                    searchValue:this.formInline.key
                }
                let [err, res] = await to(this.$api.AR.getPeopleList(data));
                if (err) return;
                console.log(res.data,'resres');
                this.peopleList = res.data.rows;
                this.totalPage = res.data.total;
                this.listVisible = true;
                this.defaultVisible = false
                this.listVisiblePeople = false
            },
            /*返回列表*/
            backHandle(){
                this.listVisible = false;
                this.listVisiblePeople = false;
                this.defaultVisible = true;
                this.$nextTick(() => {
                    if(this.collectVal =='first'){
                        this.mapChart()
                    }else{
                        this.handleCurrentChangeKeyPeople(this.tableDataPeople[0])
                        this.$refs.singleTablePeople.setCurrentRow(this.tableDataPeople[0])
                    }
                })
            },
            /*人口年龄图*/
            initPieChart(){
                this.chartPieBox = this.$echarts.init(document.getElementById('chartPieDiv'))
                var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAADGCAYAAACJm/9dAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAE/9JREFUeJztnXmQVeWZxn/dIA2UgsriGmNNrEQNTqSio0IEFXeFkqi4kpngEhXjqMm4MIldkrE1bnGIMmPcUkOiIi6gJIragLKI0Songo5ZJlHGFTADaoRuhZ4/nnPmnO4+l+7bfc85d3l+VV18373n3Ptyvve53/5+da1L6jDdYjgwBhgNHALMBn6Sq0VdcxlwGvACsAx4HliTq0VlRlNzY+LrfTO2o5LoDxwOHAmMA/4WiP+KzM3DqCJpAA4K/i4F2oBXgWbgWWAxsDEv48oZC6M9Q4EJwInAMcDAfM0pOXXA14K/y4FPgQXAfOBxYF1+ppUXFgYMBiYCp6PaoU+B694HFqEmyVJgVSbW9Y6bgCeBb6Am4GHALrH3B6L/+0RgM6pFHgQeAzZkaWi5UVejfYx64AjgXOAk1OToSCtqajyFHGZlVsalzH7oB+BYJJR+Cde0oKbi3cBCYEtWxmVNoT5GrQljGHAecD7wxYT3P0bNirlIEB9lZ1ouDEICOQk1H7dLuOYt4C7gZ8Da7EzLhloXxv7AJcCZdK4dWpAIHkDt7FrtjA5A/aszkFiSntP9wAzgP7M1LT0KCaM+YzuyZixy+leAb9O+sN9AHdDd0S/mbGpXFKD/+2z0LHZHz+aN2PsN6Bm+gjrsY7M2MEuqVRhHoU7yYjS6FPI5MAc4FNgHzUN4JKYz69Cz2Qc9qzno2YUcjZ7t8iBddVSbMEYDzwFPA6Nir28Afgx8CZiERpVM91iKntnfoGcYH606BNUez6GRr6qhWoSxF/AoKsQxsdfXAj9AHe2rgNXZm1Y1/A96hl8E/pn2HfExwBJUBntlb1rpqXRhbA/cDLyGxuJDPgSuBPYErqPGx+RLzAagCT3bK9GzDpmIyuJmVDYVS6UKow74e+APwPeIxuI/AX6Emkw3opldkw6fome8F3rmnwSv90Nl8gdURhU57FmJwtgHdfx+jpZwgCag7gW+DFyDa4gsWY+e+ZdRGYSTgUNRGS1GZVZRVJIwtgF+iMbQ4/2IF4ADgHOA93Kwy4j3UBkcgMokZAwqsx+iMqwIKkUYI4AXgelEzab1wAVoNOSVnOwynXkFlckFqIxAZTYdleGInOwqinIXRh1wMfASMDL2+hxgb+BOqngdTwWzBZXN3qisQkaisryYMu97lLMwhgHzgJ+ivRGgIcJJwd8HOdllus8HROUVDu/2R2U6D5VxWVKuwjgEVcnjY689jqrhOYl3mHJmDiq7x2OvjUdlfEguFnVBOQrju2gmdbcgvwmYitbweFtm5bIGleFUVKagMn4OlXlZUU7C6A/MQqs3w9GLN4ADgZloW6apbNpQWR5ItEBxG1Tms4iazLlTLsLYCW2IOTv22iNor3Il7JQzxbEKle0jsdfORj6wUy4WdaAchDEC+A1RW3MzcAVwKtW/UaiW+QiV8RWozEE+8Bu0yzBX8hbGwaiNuUeQ/xi1Q2/CTadaoA2V9Umo7EG+8Dw57/fIUxhHAs8AOwb5t9Cy8fm5WWTyYj4q+7eC/PZoOfspeRmUlzBOBn4FbBvkX0XVaLUEHDDFsxL5wG+DfAOKWHJOHsbkIYwpaAtluLRjEdol5nVO5j20tmpRkO+DAjFclLUhWQvjUhSSJYzdNA84DneyTcRHyCfmBfk64HYUbjQzshTGVOBWojUys9GoREuGNpjKoAX5xuwgXwfcQoY1R1bCmILWx4SimAWcBXyW0febyuMz5COzgnxYc0zJ4suzEMZEFKwrFMVDKAzL5oJ3GCM2I195KMjXIV86Ke0vTlsYR6CRhbBPMReYjEVhus9mNCseRpfvg5pYR6T5pWkKYz8UNSIcfVqIzmpoTfE7TXXyGfKdhUG+H/Kt1GbI0xLGMODXKJI4aIz6m1gUpue0Ih8Kw4MORj6Wyp6ONITRADyBwjyC4hEdjwMUmN6zAUU+fDPI7458LSlafa9IQxh3oZWToP/ICcDbKXyPqU3WouDT4Q/tQcjnSkqphXEJ6lyDOk2T8TIPU3pW0n4QZzLyvZJRSmGMQislQ65C1ZwxafAEioQYchPt4xX3ilIJYygaaw5HoB5BM5XGpMmtwMNBuh/ywaGFL+8+pRBGHYpAF+7R/h2anfR+CpM2bWj1bbhNdjfki70OzVMKYVxEFM1jE955Z7Il3AkYHvoznhKsqeqtML6KIluHfB93tk32rEK+F3Iz8s0e0xth9EXVVhjZ4QkUAcKYPPg3orhV/YH76MVx3b0RxhXA3wXpdehoYPcrTF60oRN5w6PjDkQ+2iN6Kox9UOj3kAtxMDSTP2uQL4ZcA+zbkw/qiTDqULUVTsM/RDRkZkzePEy0TL0B+WrRo1Q9Eca3iEKbrKfEM47GlIBLgP8N0mPQyU5FUawwdqDz7Lajjpty4wPg6lj+RqIwTd2iWGE0Ei3zXUEKi7eMKRF3IR8F+ew1W7m2E8UI4ytEEydbUIRqH9piypWOPnoR8uFuUYwwbiKKQj4LeLmIe43Jg5eJgilsQ/tuwFbprjBGEy37+IT27TdjypmriY5aHo/OB+yS7grjulj6JzhqoKkc3gNui+X/pTs3dUcYRxMNz/4FLyc3lcfNyHdBvnxMVzd0RxiNsfQNeO+2qTw2IN8N6XKEqithjCXaFbUWuKNndhmTOzOJ1lGNoovzN7oSxrRY+jbg057bZUyu/BX1j0OmFboQti6Mkah/AVr64SXlptKZiXwZ5NsjC124NWFcGkvfHftAYyqV9bRfrXFpoQvrWpckLjwcigKl9Qc+B74ErC6hgcbkxR7Af6NNTK3Abk3Njes6XlSoxvgO0c68R7EoTPWwGvk0KLLIBUkXJQmjHu3GC5lRWruMyZ24T58zbdy1nXSQJIxxwJ5B+nVgWentMiZXliHfBvn6kR0vSBJG/JTMu0tvkzFlQdy3O53S1LHzPRht8mhA56DtTjQpYkw1MQR4h8jXd25qbvz/kdeONcZEor3cT2FRmOrlQ3S+Bsjn2x1f1lEYZ8TSD6RolDHlwP2x9JnxN+JNqWHAu2h892NgZ7wExFQ3A4H3ge3QkQK7NjU3roH2NcaJRJHb5mNRmOrnU+TroEMvw8147YQxIZaeizG1QdzXTwwTYVNqAOpoD0Q99GGoOWVMtTMIRTBsQBHThzQ1N24Ma4zDkCgAFmNRmBqhqbnxI+C5IDsAOByiplR85m9BhnYZUw48FUsfCcnCeCYzc4wpD+I+Pw7UxxiOhqzq0HDtbgk3GlOVNDUrpMG0cde+A+yKjhPYuR7F2QknM57PxTpj8ifsZ9QBh9ajYGohS7O3x5iyIL6KfFQ9cHDsBQvD1Cpx3z+4LzAHnV3Whg75M6YWWQVciZpSrYX2fBtTE4Sd746U4pxvY6oOC8OYBCwMYxKwMIxJwMIwJgELw5gELAxjErAwjEnAwjAmAQvDmAQsDGMSsDCMScDCMCYBC8OYBCwMYxKwMIxJwMIwJgELw5gELAxjErAwjEnAwjAmAQvDmAQsDGMSsDCMScDCMCYBC8OYBCwMYxKwMIxJwMIwJgELw5gELAxjErAwjEnAwjAmAQvDmAQsDGMSsDCMScDCMCYBC8OYBCwMYxLoC1wKNABtwC3A5lwtMiYHpo27tg/wPaAOaO0LnAqMCt5fAPw2J9uMyZMRwI+D9PJ6YEXszW9kb48xZUHc91fUA8sKvGlMLTE6ll5eDyxF/QuAMdnbY0xZMDb4tw1YUg+sAVYGL+6K2lrG1AzTxl07Avk+wMqm5sY14XBtc+y6o7I1y5jcift8M0TzGM/E3jgmM3OMKQ+OjaWfBahrXVIHMABYBwwEWoBhwMdZW2dMDgxC3YkGYCMwpKm5cWNYY2wEng7SDcBx2dtnTC4ci3weYEFTc+NGaL8k5IlY+qSsrDImZ+K+/qsw0VEYnwfpE1GzyphqZgDyddBSqMfDN+LCWAssCtLbAeMzMc2Y/DgB+TrAwqbmxjXhGx1X194fS5+WtlXG5MyZsfQD8Tc6CmMuGpUCOB4YkqJRxuTJEOTjIJ9/LP5mR2GsR+IA9dS/lappxuTHZKLRqLlNzY3r428mbVS6N5Y+Ny2rjMmZuG/f2/HNJGE8C7wZpPel/apDY6qB0cBXg/SbBLPdcZKEsQW4J5a/pORmGZMvcZ++p6m5cUvHCwrt+f53ok74N4E9SmyYMXmxB/JpgFbk650oJIx1wOwg3Rf4bklNMyY/LkY+DfBgU3PjuqSLthYl5LZY+lxg+xIZZkxeDAbOi+VvK3Th1oTxCtHCwu2BC3tvlzG5chHRD/wzyMcT6SquVFMsfRleP2Uql4HIh0Ou39rFXQnjOWB5kB4GTO25XcbkylTkwyCfXrSVa7sViXB6LH0VaqcZU0kMRr4b8qOubuiOMBagmgNgR+Dy4u0yJle+j3wX5MtPdXVDd2PX/iCWvhzYpTi7jMmNXVAY2pAfFLowTneFsZRoh9+2dNFxMaaMuB75LMiHl3bnpmKinf8T8FmQngwcUMS9xuTBAchXQb57RXdvLEYYvwNmxu77aZH3G5MlHX10JvBGMTcXw3S0BRbgYNrPIhpTTpyHfBS0xGn6Vq7tRLHC+AtqUoVcD+xU5GcYkzbDad8PvgL5brfpSVPoP4iGb3cA/rUHn2FMmsxAvgnwPPDzYj+gJ8JoQ+umwmXppwGn9OBzjEmDU4gCebQgX20rfHkyPe08/xft22wzUfVlTJ4MB+6I5acDr/fkg3ozqnQj8FKQHgbchc4vMyYP6pAPhj/QLyMf7RG9EcbnwLeBTUF+Al6abvLjQuSDoCbUPxBF1iya3s5DvEb7SZNbgP16+ZnGFMsI4OZY/irkmz2mFBN0twPzg3R/YA4KrW5MFgxCPjcgyD9JCUZKSyGMNmAK8E6Q/wqK0+P+hkmbOhTRZu8g/w5qQhU9CtWRUi3pWIuGyFqD/MnoMHFj0uRyoqmCVuSDawpf3n1KudZpGe1nxW/AEdNNeownOrAe5HvLClxbNKVeBDgD+EWQ7gPMwp1xU3r2Q77VJ8j/AvleyUhjdex5wItBejA6pWb3FL7H1CbD0AEv4RbrF0lhMWsawtiExpPfDvJfAH6N94qb3jMYhXTaM8i/jXxtU6Ebekpa+ynWoLMHNgT5/YBHgX4pfZ+pfvohH9o/yG9APlaSznZH0txotBLFCA1Hqo5AYT8tDlMs2yDfOSLItyLfWpnWF6a9A28hcBY6+A90Qma802RMV/RBnevwdNXN6IiwhWl+aRZbUx8GvkM06TIJuA+Lw3RNH+Qrk4J8G3A+8EjaX5zVnu170JkEoTgmA79EVaQxSWyDaoowmEEb8qFOpx+lQZbBDG5HM5WhOE4DHsJ9DtOZfsg3Tg/ybSho2u1ZGZB1lI/bUFUY73M8hRcdmohBaCFg2KdoQ+ez3JqlEXmEv7mb9uuqDkd7yB3d0OyMfCEcfdqMfkjvKHhHSuQVF+oR4ETgr0F+fxSB2stHapcRwAtE8xQtwBnohzRz8gyY9gxwJFFYkz3RIrAT8jLI5MYJ6IdxzyC/HjgO7bPIhbwjCa4ADgNWB/ntgHlopaT3c1Q/dahTPQ+VPcgXxtLF+RVpk7cwQLOXB6FqFDR2fSPeCVjthDvvbiKa01qBfOHVvIwKKQdhALyPOly/jL12Mlo5OSIXi0yajEBle3LstfvRQMz7uVjUgXIRBmiF5NnAPxJFVd8bhei5CDetqoE6VJYvEW1H/QyV+VmksEq2p5STMEJmoF+OcA95fzRcNxcHdatkhqMyvAOVKaiMD6PEm4xKQTkKAzQ6NRJtcgqZgPojp+ZikekNp6CymxB7bT4q4+WJd+RMuQoDFGBhPKpmwyp2OFoqMBtHWa8EhgMPok52WNtvQjPZE4iOlCg7ylkYoOUAM4ADaX9Y+SQUP/d8yv//UIvUo7J5gyjAMqgMD0Rrnnod4iZNKsWpVqFhvEaipSQ7AHcCS1CVbMqDkahM7iQKxd+Kyu4gVJZlT6UIAzR6MZ3owYeMQgF878HrrfJkF1QGL6MyCQl/uKYTjTaWPZUkjJDX0czoFHSEFOj/MQX4PXAtDryQJYPRM/89KoPQp9YF+bH0MBR/nlSiMEDt0/vQWPhMoqjW2wLXAH9Ey0oG5mJdbTAQPeM/omceHhn8OSqTfVAZlXVfohCVKoyQD4GpwNdQiJ6QoWhZyZ+BaXhpSSkZhJ7pn9EzHhp770lUFlOJavOKpNKFEfI6WqF5KO37H8OB69DCtBtQjCvTM76ADnxcjZ5pfLJ1CXr2x1OBzaYkqkUYIUuBMcAxRIsSQe3gK4E/oTmQ0dmbVrGMRs/sT+jciXj/bQVwLHrmS7M3LT2qTRghT6ORkcODdEhfNAeyFB0schmwY+bWlT9D0LN5DT2rSejZhTyNnu0hwILMrcuAahVGyGJUe3wdHWnbEntvX7SP+F3gMbTUZAC1ywAkgMfQGqZb0TMKaUHP8OvomS7O1rxsqWtdUlOLVoejGdnzgD0S3v8IreGZi4I0fJydabmwHWoKTUR9tKRBitXo0MefkVI4zDxpam5MfL3WhBFSj/Z/nI/W7DQkXNOCdpE9jbbhVsSMbTcYARwFHI2aQ4X+748jQTQDWzKzLmMKCaNv4qvVzxbg2eBve/SLeTowjmg3WQP6NT02yL+Lmg/Lgr9VRGGAypU+SAijg7/DgF0LXLsZiWA2Cp68PgP7ypZarTEKMQzVIOPRr+rWJgivRkPA5cxVaIi1EJ+i2vAJVEOU7WrXtHCN0T3WovU+96DO6OEoksk4FNqn0n9F2tC+iGZUWy4CNuZqUZliYRRmI5pND2fUd0JDwKPRMGVLgfvKiRa0EegF1PxbDnyQq0UVwv8BNYmwIpIWBvwAAAAASUVORK5CYII=';

                // var trafficWay = [{name: '0-18岁', value: 8},{ name: '18-40岁',value: 30 },{name: '40-60岁',value: 12},{name: '60-70岁',value: 35},{ name: '70-80岁',value: 10},{name: '80岁以上', value: 5}];
                console.log(this.ageData,'this.ageDatathis.ageData');
                var trafficWay = this.ageData;

                var data = [];
                var color=['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000']
                for (var i = 0; i < trafficWay.length; i++) {
                    data.push({
                        value: trafficWay[i].value,
                        name: trafficWay[i].name,
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                shadowBlur: 20,
                                borderColor:color[i],
                                shadowColor: color[i]
                            }
                        }
                    }, {
                        value: 2,
                        name: '',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                color: 'rgba(0, 0, 0, 0)',
                                borderColor: 'rgba(0, 0, 0, 0)',
                                borderWidth: 0
                            }
                        }
                    });
                }
                var seriesOption = [{
                    name: '',
                    type: 'pie',
                    clockWise: false,
                    radius: [80, 80],
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'outside',
                                lineHeight:16,
                                color: '#ddd',
                                formatter: function(params) {
                                    var percent = 0;
                                    var total = 0;
                                    for (var i = 0; i < trafficWay.length; i++) {
                                        total += trafficWay[i].value;
                                    }
                                    percent = ((params.value / total) * 100).toFixed(0);
                                    if(params.name !== '') {
                                        return  params.name + '\n' +  '占比：' + percent + '%';
                                    }else {
                                        return '';
                                    }
                                },
                            },
                            labelLine: {
                                length:30,
                                length2:50,
                                show: true,
                                color:'#00ffff'
                            }
                        }
                    },
                    data: data
                }];
                var options = {
                    color : color,
                    title: {
                        text: '总数'+'\n\n'+this.totalNum,
                        top: '46%',
                        textAlign: "center",
                        left: "49%",
                        textStyle: {
                            color: '#fff',
                            fontSize: 22,
                            fontWeight: '400'
                        }
                    },
                    graphic: {
                        elements: [{
                            type: "image",
                            z: 3,
                            style: {
                                image: img,
                                width: 178,
                                height: 178
                            },
                            left: 'center',
                            top:  'center',
                            position: [100, 100]
                        }]
                    },
                    tooltip: {
                        show: false
                    },
                    legend: {
                        icon: "circle",
                        orient: 'horizontal',
                        // x: 'left',
                        data:['0-18岁','18-40岁','40-60岁','60-70岁','70-80岁','80岁以上'],
                        right: 40,
                        bottom: 50,
                        align: 'right',
                        textStyle: {
                            color: "#fff"
                        },
                        itemGap: 10
                    },
                    toolbox: {
                        show: false
                    },
                    series: seriesOption
                }
                this.chartPieBox.clear()
                this.chartPieBox.setOption(options)
                window.addEventListener('resize', () => {
                    this.chartPieBox.resize()
                })
            },
            /*性别比例图*/
            initSexChart(){
                console.log(this.sexData,'this.sexData22222222222')
                this.chartSexBox = this.$echarts.init(document.getElementById('chartSexDiv'))
                var img = 'data:image/png;base64,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';
                const man =
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAByCAMAAADzq6aiAAABpFBMVEUAAAAA//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A//8A///ZqXRjAAAAi3RSTlMAAQIDBAYICQoMDQ4RExQWGBkaGxweHyAmJyksLTU4OTo7PD5AQkZHTk9QUVJTVFVYWVpgZGhqa21ucXJzdHZ5fX+AgYKDhoeIi5CRk5WWmZqbn6ChoqOlpqeoqaqsrrW2t7i5uru8vcPFx8jQ0tTX293e4OHi4+Tl5+jr7e7v8PHy8/T2+fr7/P3+d8xxFQAAAmtJREFUaN7t2vlb0zAYB/AAm1zeyKGIByKiQ9zwxgMRhifMCYooh4qgzrMw2awKKhZs80+7jbqkkGzpm/mDz/N+f1rfJZ9nT9ulTVNCiqfu0nTSspJPL9eRUmTnyBp1s/Zgt753/BvlshzS9c7a1BP7nJ53coOXEbt0vPoluinfGzTAJ1SQCbi31xaB9j4weJMKcwsMvhODH6BetS0GnRog2Ewl2Q8ED8vAQ0CwRQa2AMFdMnAP9Kh8EXtLZVBwQgxOgc/DTjF4CgwGDJE3H4D/mbtEoNb4NbbZG9MaYCtfbfQSVXpDdvW013tWq3tRKe/5wbifV8pLcB3dfv3jOmf07wBdRyIDsdH4bZZYLPZ8cXU1NZP5cIeV46P3Brrri2ll4YRDfcR5Eym4ExpeU99JNMq9ps8UELNZ5m01KCjJbRJwhALzUDJA21DQOSgE71Na2p9owMGUELRYA2u2qG7Mcu0dIcifCaSvGNhHTG4LQQQRRBBBBBFEEEG/4C/2/aIKuMDd/gnBt6zBSxXwBdt4LwSjrEGPCniBbdwQPxtdzu/CWhWwJp2fU0qepHb+dvdIO1EBSZt7U2xHZDOfjtxMauEoUQNJW+64mCcKTODDg9FQkKiCJBiKDobVpvhqoI/8Y3AlnclKCcHhbGkYQQQRRBBBBBFEEMH/Brzm6T2ULd3VAs97ekezpX5P6aJP8ICnd+79iw5PqdXvYtk8v1ybu9Gv/MqVPlX4Xes6zfXuXS9d5Upn/K+ePc53nnNXVwNz+dIkYDmuYshdPxvf8rdU5b6Z4cSDoBXC1kcpy5w6xpfaJ00rPX6kQKc/RsXweS7aQLIAAAAASUVORK5CYII=';
                const woman =
                    'data:image/png;base64,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';
                var sexData = [];
                sexData = this.sexData

                var data = [];
                var color = ['#00FFFF', "#C424FF", '#ffa800', '#ff5b00', '#ff3000']
                for (var i = 0; i < sexData.length; i++) {
                    data.push({
                        value: sexData[i].value,
                        name: sexData[i].name,
                        itemStyle: {
                            normal: {
                                borderWidth: 5,
                                shadowBlur: 20,
                                borderColor: color[i],
                                shadowColor: color[i]
                            }
                        }
                    }, {
                        value: 2,
                        name: '',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                color: 'rgba(0, 0, 0, 0)',
                                borderColor: 'rgba(0, 0, 0, 0)',
                                borderWidth: 0
                            }
                        }
                    });
                }
                var seriesOption = [{
                    name: '',
                    type: 'pie',
                    clockWise: false,
                    radius: [105, 109],
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: [0, -20],
                                color: '#ddd',
                                formatter: function(params) {
                                    var percent = 0;
                                    var total = 0;
                                    for (var i = 0; i < sexData.length; i++) {
                                        total += sexData[i].value;
                                    }
                                    percent = ((params.value / total) * 100).toFixed(0);
                                    if (params.name !== '') {
                                        return params.name + '：' + percent + '%';
                                    } else {
                                        return '';
                                    }
                                },
                            },
                            labelLine: {
                                length: 30,
                                length2: 50,
                                show: true,
                                color: '#00ffff'
                            }
                        }
                    },
                    data: data
                }];
                var options = {
                    color: color,
                    graphic: {
                        elements: [{
                            type: "image",
                            z: 3,
                            style: {
                                image: img,
                                width: 178,
                                height: 178
                            },
                            left: 'center',
                            top: 'center',
                            position: [100, 100]
                        }, {
                            type: 'image',
                            z: 3,
                            style: {
                                image: woman,
                                width: 65,
                                height: 100
                            },
                            left: '50%',
                            top: 'center'
                        },
                            {
                                type: 'image',
                                z: 3,
                                style: {
                                    image: man,
                                    width: 65,
                                    height: 100
                                },
                                right: '50%',
                                top: 'center'
                            }
                        ]
                    },
                    tooltip: {
                        show: false
                    },
                    legend: {
                        icon: "circle",
                        orient: 'horizontal',
                        // x: 'left',
                        data:['男性','女性'],
                        right: 40,
                        bottom: 50,
                        align: 'right',
                        textStyle: {
                            color: "#fff"
                        },
                        itemGap: 10
                    },
                    toolbox: {
                        show: false
                    },
                    series: seriesOption
                }
                this.chartSexBox.clear()
                this.chartSexBox.setOption(options)
                window.addEventListener('resize', () => {
                    this.chartSexBox.resize()
                })
            },
            /*年龄按钮点击事件*/
            changeAge(val){
                this.changeActive = val
                this.$nextTick(()=>{
                    this.initPieChart()
                })

            },
            /*性别按钮点击事件*/
            changeSex(val){
                this.changeActive = val
                this.$nextTick(()=>{
                    this.initSexChart()
                })
            },
        }
    }
</script>

<style scoped>
    .chartMap {
        width: 600px;
        height: calc(850px - 250px)
    }

</style>
