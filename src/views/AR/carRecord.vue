<template>
    <el-dialog
            title="一车一档"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :before-close="handleClose">
        <div class="dialogCon">
            <div  v-if="defaultVisible">
                <div class="leftBox" style="width:40%;">
                    <el-row class="marginT10">
                        <el-col :span="24" class="textLeft marginL10">
                            <el-select v-model="deptId" filterable placeholder="请选择" style="width:80%">
                                <el-option
                                        v-for="item in options"
                                        :key="item.deptId"
                                        :label="item.deptName"
                                        :value="item.deptId">
                                </el-option>
                            </el-select>
                            <el-button type="primary" size="small" style="border-radius: 0px 4px 4px 0px;height:35px;">搜索</el-button>
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
                                        label="车辆数量"
                                        width="100">
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </div>
                <div class="rightBox" style="width:calc(100% - 41%)">
                    <div id="chartMapCar" class="chartMap"></div>
                </div>
            </div>
            <div v-if="listVisible">
                <div class="peopleListBox">
                    <div class="listDiv">
                        <el-row class="textLeft">
                            <el-col :span="12">
                                <el-form :inline="true" class="demo-form-inline">
                                    <el-form-item>
                                        <el-input v-model="keyVal" placeholder="按车牌号搜索"  type="text" size="small" clearable autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="getCarList" size="small">查询</el-button>
                                    </el-form-item>
                                    <el-form-item label="" class="checkItem">
                                        <el-popover
                                                placement="top-start"
                                                title="查看敏感信息需要验证您的密码"
                                                width="300"
                                                :visible-arrow="true"
                                                v-model="visible"
                                                trigger="click">
                                            <el-input v-model="passwordVal" size="mini" autocomplete="new-password" type="password"></el-input>
                                            <div class="marginT10 textCenter">
                                                <el-button type="primary" size="mini" @click="getCheck">确定</el-button>
                                                <el-button  size="mini" @click="visible = false">取消</el-button>
                                            </div>
                                            <el-checkbox  v-model="switchVal" label="显示敏感信息" border slot="reference"></el-checkbox>
                                        </el-popover>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="12" style="float:right;text-align:right;margin-top:10px;">
                                <el-button type="delete" size="small" @click="goBack">返回</el-button>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-table :data="carList" style="width: 100%">
                                <el-table-column
                                        prop="name"
                                        label="车主姓名"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="telephone"
                                        label="车主电话"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="number"
                                        label="车牌号码">
                                </el-table-column>
                                <el-table-column
                                        prop="createTime"
                                        label="登记时间">
                                </el-table-column>
                                <el-table-column
                                        prop="deptName"
                                        label="小区名称">
                                </el-table-column>
                            </el-table>
                        </el-row>

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
                keyVal:'',
                switchVal:false,
                passwordVal:'',
                searchValue:'',   //校验密码字段
                defaultVisible: true,
                listVisible: false,
                dialogVisible: false,
                visible: false,
                tableData: [],
                carList: [],
                chartMapBox: null,
                loading: false,
                options:[],
                deptId: '',
                mapData:[]
            }
        },
        activated() {
            if (this.chartMapBox) {
                this.chartMapBox.resize()
            }
        },
        created(){
            this.getTreeList()
            this.eventbus.$on('changeVal',(val)=>{
                this.deptId = val
                this.$nextTick(() => {
                    this.mapChart()
                    this.getTableList()
                })
            })
        },
        watch:{
            switchVal(newVal,oldVal){
                console.log(newVal, oldVal,'123');
                if(newVal ==true){
                    this.visible = true;
                }else{
                    this.searchValue =""
                    this.visible = false;
                    this.$nextTick(()=>{
                        this.getCarList()
                    })
                }
            }
        },
        methods: {
            init(id) {
                this.deptId = id
                this.dialogVisible = true;
                this.defaultVisible = true;
                this.listVisible = false;
                this.$nextTick(() => {
                    this.mapChart()
                    this.getTableList()
                })
            },
            //返回
            goBack(){
                this.listVisible = false;
                this.defaultVisible = true;
                this.$nextTick(()=>{
                    this.mapChart()
                })

            },
            //验证密码
            async getCheck(){
                let data = {
                    plaintext:this.passwordVal
                }
                let [err,res] = await to(this.$api.AR.getCheck(data))
                if(err) return
                if(res.data.data == 1){
                    this.searchValue =1
                    this.getCarList()
                }else{
                    this.$message.error('密码错误')
                }
                console.log(res,'ssssssss');
            },
            //获取用户所能管理的部门列表
            async getTreeList(){
                let [err, res] = await to(this.$api.login.getTree());
                if (err) return;
                this.options = res.data.data;
                //this.deptId = this.options[0].deptId
            },
            //获取基础信息表格列表
            async getTableList(){
                let data={
                    deptId:this.deptId
                }
                let [err, res] = await to(this.$api.AR.getCarTable(data));
                if (err) return;
                console.log(res,'res');
                this.tableData = res.data.buildingVo;
                if(this.tableData.length>0){
                    this.$nextTick(()=>{
                        this.$refs.singleTable.setCurrentRow(this.tableData[0])
                    })
                }else{
                    this.tableData =[]
                    this.mapData=[]
                    this.mapChart()
                }
                console.log(this.tableData,'this.tableData');
            },
            /*左侧表格点击事件*/
            async handleCurrentChange(val){
                this.mapData=[]
                console.log(val,'val');
                this.tung = val.tung;
                this.unit = val.unit;
                let data = {
                    deptId:this.deptId,
                    tung:this.tung,
                    unit:this.unit,
                }
                let [err, res] = await to(this.$api.AR.getCarArea(data));
                if (err) return;
                console.log(res.data,'车辆分布');
                if(res.data.vehicleVo.length>0){
                    res.data.vehicleVo.map(item=>{
                        this.mapData.push(Object.assign({name:item.ascription,value:item.cout,selected:true}))
                    })
                }else{ this.mapData = []}
                this.mapChart()
            },
            handleClose() {
                this.dialogVisible = false
            },
            /*地图加载*/
            mapChart() {
                this.chartMapBox = this.$echarts.init(document.getElementById('chartMapCar'))
                var options = {
                    tooltip: {
                        show: true,
                        formatter: function (params) {
                            console.log(params.value == NaN, 'mzl');
                            if (isNaN(params.value)) {
                                return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + 0 + '辆&nbsp;&nbsp;';
                            } else {
                                return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value + '辆&nbsp;&nbsp;';
                            }
                        },

                    },
                    backgroundColor: '#000f1e',
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
                                        console.log(params.value == '', 'params')
                                        let arr = []
                                        if (isNaN(params.value)) {
                                            arr = [params.name, +0 + "辆"];
                                        } else {
                                            arr = [params.name, +params.value + "辆"];
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
                    }]
                };
                this.chartMapBox.clear()
                this.chartMapBox.setOption(options)
                window.addEventListener('resize', () => {
                    this.chartMapBox.resize()
                })
                this.chartMapBox.on('click', async(e) => {
                    this.ascription = e.name
                    if (isNaN(e.value)) {
                        this.$message.warning('该区域没有数据，请重新选择')
                    } else {
                        this.defaultVisible = false;
                        this.listVisible = true;
                        this.getCarList()
                    }
                })
            },
            //获取车辆信息
            async getCarList(){
                this.carList=[]
                let data = {
                    deptId:this.deptId,
                    ascription:this.ascription,
                    searchValue:this.searchValue,
                    number:this.keyVal,
                    tung:this.tung,
                    unit:this.unit,
                }
                let [err,res] = await to(this.$api.AR.getCarMapList(data))
                if(err) return
                console.log(res,'车辆信息');
                this.carList = res.data.rows;
            },
        }
    }
</script>

<style scoped>
    .chartMap {
        width: 100%;
        height: calc(850px - 150px)
    }

</style>
