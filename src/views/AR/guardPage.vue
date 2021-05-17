<template>
    <el-dialog
            title="智慧保安"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :append-to-body="true"
            class="dialogBox"
            :before-close="handleClose">
        <div class="dialogCon">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="保安信息" name="1">
                    <el-row class="textLeft">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="">
                                <el-input v-model="formInline.key1" placeholder="关键字" size="small" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="searchHandle1" size="small">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <el-row style="height:calc(850px - 260px)">
                        <el-table
                                ref="filterTable"
                                max-height="530"
                                :highlight-current-row="true"
                                :data="infoList"
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    header-align="center"
                                    align="center"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="phone"
                                    label="手机号"
                                    header-align="center"
                                    align="center"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="post"
                                    header-align="center"
                                    align="center"
                                    label="职务">
                            </el-table-column>
                           <!-- <el-table-column
                                    prop="type"
                                    header-align="center"
                                    align="center"
                                    label="值班类型">
                            </el-table-column>-->
                            <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="deptName"
                                    label="小区">
                            </el-table-column>
                        </el-table>
                        <div class="paginationBox">
                            <el-pagination
                                    background
                                    @size-change="sizeChangeHandle1"
                                    @current-change="currentChangeHandle1"
                                    layout="prev, pager, next"
                                    :total="totalPage1">
                            </el-pagination>
                        </div>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="巡更列表" name="2">
                    <el-row class="textLeft">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="">
                                <el-input v-model="formInline.key2" placeholder="关键字" size="small" clearable></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="searchHandle2" size="small">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <el-row style="height:calc(850px - 260px)">
                        <el-table
                                ref="filterTable"
                                max-height="530"
                                :highlight-current-row="true"
                                :data="patrolList"
                                style="width: 100%">
                            <el-table-column
                                    prop="post"
                                    label="职务"
                                    header-align="center"
                                    align="center"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="securityName"
                                    label="巡更人员"
                                    header-align="center"
                                    align="center"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="startTime"
                                    header-align="center"
                                    align="center"
                                    width="180"
                                    label="开始时间">
                            </el-table-column>
                            <el-table-column
                                    prop="endsTime"
                                    header-align="center"
                                    align="center"
                                    width="180"
                                    label="结束时间">
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="error"
                                    label="允许误差(分钟)">
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="abnormalState"
                                    label="巡检异常">
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="workDay"
                                    label="工作日">
                                <template slot-scope="scope">
                                    {{scope.row.workBegins}} ~ {{scope.row.workEnd}}
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="paginationBox">
                            <el-pagination
                                    background
                                    @size-change="sizeChangeHandle2"
                                    @current-change="currentChangeHandle2"
                                    layout="prev, pager, next"
                                    :total="totalPage2">
                            </el-pagination>
                        </div>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="坐班信息" name="3">
                    <el-row class="textLeft">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="">
                                <el-input v-model="formInline.key3" placeholder="关键字" size="small" clearable></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="searchHandle3" size="small">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <el-row style="height:calc(850px - 260px)">
                        <el-table
                                ref="filterTable"
                                max-height="530"
                                :highlight-current-row="true"
                                :data="dutyList"
                                style="width: 100%">
                            <el-table-column
                                    prop="place"
                                    label="地点"
                                    header-align="center"
                                    align="center"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="securityName"
                                    label="坐班人员"
                                    header-align="center"
                                    align="center"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="startTime"
                                    header-align="center"
                                    align="center"
                                    label="开始时间">
                            </el-table-column>
                            <el-table-column
                                    prop="endsTime"
                                    header-align="center"
                                    align="center"
                                    label="结束时间">
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="error"
                                    label="允许误差">
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop="abnormalState"
                                    label="坐班异常">
                            </el-table-column>
                            <el-table-column
                                    header-align="center"
                                    align="center"
                                    prop=""
                                    label="工作日">
                                <template slot-scope="scope">
                                    {{scope.row.workBegins}} ~ {{scope.row.workEnd}}
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="paginationBox">
                            <el-pagination
                                    background
                                    @size-change="sizeChangeHandle3"
                                    @current-change="currentChangeHandle3"
                                    layout="prev, pager, next"
                                    :total="totalPage3">
                            </el-pagination>
                        </div>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-dialog>
</template>

<script>
    import to from "await-to-js";
    export default {
        data() {
            return {
                deptId:'',
                dialogVisible: false,
                activeName:'1',
                formInline:{
                    key1:'',
                    key2:'',
                    key3:'',
                },
                infoList:[],
                patrolList:[],
                dutyList:[],
                pageIndex1: 1,
                pageSize1: 10,
                totalPage1: 0,
                pageIndex2: 1,
                pageSize2: 10,
                totalPage2: 0,
                pageIndex3: 1,
                pageSize3: 10,
                totalPage3: 0,
            }
        },
        created(){

        },
        methods: {
            // 保安信息--每页数
            sizeChangeHandle1 (val) {
                this.pageSize1 = val
                this.pageIndex1 = 1
                this.getSecurityList()
            },
            // 保安信息--当前页
            currentChangeHandle1 (val) {
                this.pageIndex1 = val
                this.getSecurityList()
            },
            // 巡更列表--每页数
            sizeChangeHandle2 (val) {
                this.pageSize2 = val
                this.pageIndex2 = 1
                this.getWatchList()
            },
            // 巡更列表--当前页
            currentChangeHandle2 (val) {
                this.pageIndex2 = val
                this.getWatchList()
            },
            // 坐班信息--每页数
            sizeChangeHandle3 (val) {
                this.pageSize3 = val
                this.pageIndex3 = 1
                this.getOfficeList()
            },
            // 坐班信息--当前页
            currentChangeHandle3 (val) {
                this.pageIndex3 = val
                this.getOfficeList()
            },
            init(id) {
                this.deptId = id;
                this.dialogVisible = true;
                this.activeName = '1'
                this.getSecurityList()
            },
            handleClose() {
                this.dialogVisible = false
            },
            handleClick(tab){
                console.log(tab,'tab');
                if(tab.name == '1'){
                    this.getSecurityList()
                }
                if(tab.name == '2'){
                    this.getWatchList()
                }
                if(tab.name == '3'){
                    this.getOfficeList()
                }
            },
            /*保安信息*/
            async getSecurityList(){
                console.log(this.deptId,'this.deptId');
                let data={
                    deptId:this.deptId,
                    name:this.formInline.key1,
                    pageNum:this.pageIndex1,
                    pageSize:this.pageSize1,
                }
                let [err, res] = await to(this.$api.AR.getSecurityInfo(data));
                if (err) return;
                console.log(res.data,'保安信息');
                this.infoList = res.data.rows;
                this.totalPage1 = res.data.total;
            },
            /*巡更列表*/
            async getWatchList(){
                let data={
                    deptId:this.deptId,
                    securityName:this.formInline.key2,
                    pageNum:this.pageIndex2,
                    pageSize:this.pageSize2,
                }
                let [err, res] = await to(this.$api.AR.getSecurityGuard(data));
                if (err) return;
                console.log(res.data,'巡更列表');
                this.patrolList = res.data.rows;
                this.totalPage2 = res.data.total;
            },
            /*坐班信息*/
            async getOfficeList(){
                let data={
                    deptId:this.deptId,
                    securityName:this.formInline.key3,
                    pageNum:this.pageIndex3,
                    pageSize:this.pageSize3,
                }
                let [err, res] = await to(this.$api.AR.getSecurityOffice(data));
                if (err) return;
                console.log(res.data.data,'坐班信息');
                this.dutyList = res.data.rows;
                this.totalPage3 = res.data.total;
            },
            searchHandle1(){
                this.getSecurityList()
            },
            searchHandle2(){
                this.getWatchList()
            },
            searchHandle3(){
                this.getOfficeList()
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
