<template>
    <el-dialog
            title="门禁设备"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :before-close="handleClose">
        <div class="dialogCon">
            <div class="leftBox" style="width:32%;">
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
                        <el-button type="primary" size="small" style="border-radius: 0px 4px 4px 0px;height:35px;" @click="getTableList">搜索</el-button>
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
                        </el-table>
                    </el-col>
                </el-row>
            </div>
            <div class="rightBox visitorCon" style="width:calc(100% - 33%)">
                <el-row>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline textLeft padding10">
                        <el-col :span="13">
                            <el-form-item label="">
                                <el-date-picker
                                        v-model="formInline.dateRange"
                                        type="datetimerange"
                                        range-separator="至"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item>
                                <el-button type="primary" @click="getList" size="small">查询</el-button>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
                <el-row :gutter="10">
                    <div class="visitorDeviceBox">
                        <el-col :span="12" v-for="(item,index) in visitorList" :key="index">
                            <div class="itemBox">
                                <div class="leftPhoto">
                                    <div class="photoImg">
                                        <img :src="emptyImg" alt="" v-if="item.url ==null">
                                        <img :src="item.url" alt="" v-else>
                                    </div>
                                    <div class="color1">现场抓拍图片</div>
                                </div>
                                <div class="rightInfo">
                                    <el-form>
                                        <el-form-item label="姓 名："><span class="yellow">{{item.person_name}}</span></el-form-item>
                                        <el-form-item label="楼宇名称：">{{item.remark}}</el-form-item>
                                        <el-form-item label="进出时间：">{{item.createTime}}</el-form-item>
                                        <!--<el-form-item label="进出方式：">进入</el-form-item>
                                        <el-form-item label="开锁方式：">App开门</el-form-item>-->
                                    </el-form>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-row>
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
    </el-dialog>
</template>

<script>
    import to from "await-to-js";
    import emptyImg from '../../assets/images/AR/emptyPhoto.png'
    export default {
        data() {
            return {
                unit:'',//左侧表格点击获取值
                emptyImg,
                deptId:'',
                dialogVisible: false,
                tableData: [],
                chartMapBox: null,
                loading: false,
                options:[],
                searchVal: '',
                mapData:[],
                formInline:{
                    dateRange:[]
                },
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                visitorList:[],
            }
        },
        activated() {
            if (this.chartMapBox) {
                this.chartMapBox.resize()
            }
        },
        created(){
            this.getTreeList()
        },
        methods: {
            // 每页数
            sizeChangeHandle (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getList()
            },
            // 当前页
            currentChangeHandle (val) {
                this.pageIndex = val
                this.getList()
            },
            //获取用户所能管理的部门列表
            async getTreeList(){
                let [err, res] = await to(this.$api.login.getTree());
                if (err) return;
                this.options = res.data.data;
               // this.deptId = this.options[0].deptId
            },
            //搜索
            searchHandle(){

            },
            //获取右侧数据
            async getList(){
                var createTime,updateTime;
                console.log(this.formInline.dateRange,'this.formInline.dateRange');
                if(this.formInline.dateRange&& this.formInline.dateRange.length>0){
                    createTime = this.formInline.dateRange[0]
                    updateTime = this.formInline.dateRange[1]
                }else{
                    createTime=''
                    updateTime=''
                }
                let data = {
                    cid:this.cid,
                    pageNum:this.pageIndex,
                    pageSize:this.pageSize,
                    deptId:this.deptId,
                    unit:this.unit,
                    createTime:createTime,
                    updateTime:updateTime
                }
                let [err, res] = await to(this.$api.AR.doorList(data));
                if (err) return;
                console.log(res.data,'门禁');
                if(res.data.rows.length>0){
                    this.visitorList = res.data.rows;
                    this.totalPage = res.data.total;
                }else{
                    this.visitorList = [];
                    this.totalPage = 0;
                }
            },
            //获取基础信息表格列表
            async getTableList(){
                let data={
                    deptId:this.deptId,
                    pageSize:this.pageSize,
                    pageNum:this.pageIndex
                }
                let [err, res] = await to(this.$api.AR.doorBuildList(data));
                if (err) return;
                this.tableData = res.data.data;
                console.log(this.tableData,'this.tableData');
                if(this.tableData.length>0){
                    this.$nextTick(()=>{
                        this.$refs.singleTable.setCurrentRow(this.tableData[0])
                        this.cid = this.tableData[0].cid
                    })
                }else{
                    this.tableData =[]
                }
            },
            /*左侧表格点击事件*/
            async handleCurrentChange(val){
                if(val){
                    console.log(val,'vvvvvvvvvv');
                    this.cid = val.cid;
                    this.unit = val.unit;
                    this.getList()
                }
            },
            init(id) {
                this.deptId= id
                this.dialogVisible = true;
                this.currentChangeHandle(1)
                this.getTableList()
            },
            handleClose() {
                this.dialogVisible = false
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
