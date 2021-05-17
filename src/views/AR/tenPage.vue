<template>
    <el-dialog
            :title="pageTitle"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :append-to-body="true"
            :before-close="handleClose">
        <div class="dialogCon">
            <!--志愿力量-->
            <div v-if="pageVal==1">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="党员信息" name="1">
                        <el-row class="textLeft">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  size="small">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row style="height:calc(850px - 260px)">
                            <div class="tableScrollBox">
                                <el-table
                                        ref="filterTable"
                                        max-height="530"
                                        :highlight-current-row="true"
                                        :data="infoList1"
                                        style="width: 100%;overflow-x: auto">
                                    <el-table-column
                                            prop="name"
                                            label="姓名"
                                            fixed="left"
                                            header-align="center"
                                            align="center"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="phone"
                                            label="性别"
                                            header-align="center"
                                            align="center"
                                            width="80">
                                    </el-table-column>
                                    <el-table-column
                                            prop="position"
                                            header-align="center"
                                            align="center"
                                            label="出生年月">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="年龄">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="民族">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="文化程度">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="入党时间">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            width="200"
                                            label="工作单位及职务">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="家庭住址">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="家庭成员">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="爱好特长">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            width="120"
                                            label="困难和需求">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            fixed="right"
                                            prop="community"
                                            label="联系电话">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationBox">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--主导力量-->
            <div v-if="pageVal==2">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="警务人员信息" name="1">
                        <el-row class="textLeft">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  size="small">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row style="height:calc(850px - 260px)">
                            <div class="tableScrollBox">
                                <el-table
                                        ref="filterTable"
                                        max-height="530"
                                        :highlight-current-row="true"
                                        :data="infoList2"
                                        style="width: 100%;overflow-x: auto">
                                    <el-table-column
                                            prop="name"
                                            label="姓名"
                                            fixed="left"
                                            header-align="center"
                                            align="center"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="position"
                                            header-align="center"
                                            align="center"
                                            label="手机号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="职务">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="警号">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="所属机构">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationBox">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--指导力量-->
            <div v-if="pageVal==3">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="知名人士信息" name="1">
                        <el-row class="textLeft">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  size="small">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row style="height:calc(850px - 260px)">
                            <div class="tableScrollBox">
                                <el-table
                                        ref="filterTable"
                                        max-height="530"
                                        :highlight-current-row="true"
                                        :data="infoList3"
                                        style="width: 100%;overflow-x: auto">
                                    <el-table-column
                                            prop="name"
                                            label="姓名"
                                            fixed="left"
                                            header-align="center"
                                            align="center"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="position"
                                            header-align="center"
                                            align="center"
                                            label="手机号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="荣誉头衔">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationBox">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--&lt;!&ndash;支撑力量&ndash;&gt;
            <div v-if="pageVal==4">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="实有单位" name="1">
                        <el-row class="textLeft">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  size="small">查询</el-button>
                                    <el-button type="save"  size="small">新增</el-button>
                                    <el-button type="primary"  size="small">导入</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row style="height:calc(850px - 260px)">
                            <div class="tableScrollBox">
                                <el-table
                                        ref="filterTable"
                                        max-height="530"
                                        :highlight-current-row="true"
                                        :data="infoList4"
                                        style="width: 100%;overflow-x: auto">
                                    <el-table-column
                                            prop="name"
                                            label="单位名称"
                                            fixed="left"
                                            header-align="center"
                                            align="center"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="position"
                                            header-align="center"
                                            align="center"
                                            label="行业范围">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="法人姓名">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="法人手机号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="单位地址">
                                    </el-table-column>
                                    <el-table-column
                                            prop=""
                                            header-align="center"
                                            align="center"
                                            label="操作">
                                        <span>编辑</span>
                                        <span>删除</span>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationBox">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>-->
            <!--协管力量-->
            <div v-if="pageVal==5">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="协勤人员信息" name="1">
                        <el-row class="textLeft">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  size="small">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row style="height:calc(850px - 260px)">
                            <div class="tableScrollBox">
                                <el-table
                                        ref="filterTable"
                                        max-height="530"
                                        :highlight-current-row="true"
                                        :data="infoList5"
                                        style="width: 100%;overflow-x: auto">
                                    <el-table-column
                                            prop="name"
                                            label="姓名"
                                            fixed="left"
                                            header-align="center"
                                            align="center"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="position"
                                            header-align="center"
                                            align="center"
                                            label="手机号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="职务">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="所属机构">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationBox">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--交管力量-->
            <div v-if="pageVal==6">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="交通管理人员信息" name="1">
                        <el-row class="textLeft">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  size="small">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row style="height:calc(850px - 260px)">
                            <div class="tableScrollBox">
                                <el-table
                                        ref="filterTable"
                                        max-height="530"
                                        :highlight-current-row="true"
                                        :data="infoList6"
                                        style="width: 100%;overflow-x: auto">
                                    <el-table-column
                                            prop="name"
                                            label="姓名"
                                            fixed="left"
                                            header-align="center"
                                            align="center"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="position"
                                            header-align="center"
                                            align="center"
                                            label="手机号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="性别">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="年龄">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="出生日期">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationBox">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--微群力量-->
            <div v-if="pageVal==7">
                <el-tabs v-model="activeNameWeiChat" @tab-click="weiChatClick">
                    <el-tab-pane label="微信群信息" name="1">
                        <el-row class="textLeft">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  size="small">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row style="height:calc(850px - 260px)">
                            <div class="tableScrollBox">
                                <el-table
                                        ref="filterTable"
                                        max-height="530"
                                        :highlight-current-row="true"
                                        :data="infoList7"
                                        style="width: 100%;overflow-x: auto">
                                    <el-table-column
                                            prop="name"
                                            label="群名"
                                            fixed="left"
                                            header-align="center"
                                            align="center"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="position"
                                            header-align="center"
                                            align="center"
                                            label="群主">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="群主联系方式">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="群功能">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="群人数">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop=""
                                            label="操作">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationBox">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="微博信息" name="2">
                        <el-row class="textLeft">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  size="small">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row style="height:calc(850px - 260px)">
                            <div class="tableScrollBox">
                                <el-table
                                        ref="filterTable"
                                        max-height="530"
                                        :highlight-current-row="true"
                                        :data="infoList7"
                                        style="width: 100%;overflow-x: auto">
                                    <el-table-column
                                            prop="position"
                                            header-align="center"
                                            align="center"
                                            label="博主">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="博主联系方式">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="微博功能">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="微博人数">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop=""
                                            label="操作">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationBox">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--消防力量-->
            <div v-if="pageVal==8">
                <!--<el-tabs v-model="activeName">
                    <el-tab-pane label="消防员信息" name="1">
                        <el-row class="textLeft">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  size="small">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row style="height:calc(850px - 260px)">
                            <div class="tableScrollBox">
                                <el-table
                                        ref="filterTable"
                                        max-height="530"
                                        :highlight-current-row="true"
                                        :data="infoList8"
                                        style="width: 100%;overflow-x: auto">
                                    <el-table-column
                                            prop="name"
                                            label="楼栋"
                                            fixed="left"
                                            header-align="center"
                                            align="center"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="position"
                                            header-align="center"
                                            align="center"
                                            label="灭火器数量(组)">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="白班负责人">
                                    </el-table-column>
                                    <el-table-column
                                            header-align="center"
                                            align="center"
                                            prop="community"
                                            label="夜班负责人">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationBox">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>-->
                <div class="fireBox">
                    <img src="../../assets/images/AR/fire.jpg" alt="">
                </div>

            </div>
            <!--司法力量-->
            <div v-if="pageVal==9">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="司法工作人员信息" name="1">
                        <el-row class="textLeft">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="">
                                    <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  size="small">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row style="height:calc(850px - 260px)">
                            <div class="tableScrollBox">
                                <el-table
                                        ref="filterTable"
                                        max-height="530"
                                        :highlight-current-row="true"
                                        :data="infoList9"
                                        style="width: 100%;overflow-x: auto">
                                    <el-table-column
                                            prop="name"
                                            label="姓名"
                                            fixed="left"
                                            header-align="center"
                                            align="center"
                                            width="100">
                                    </el-table-column>
                                    <el-table-column
                                            prop="position"
                                            header-align="center"
                                            align="center"
                                            label="手机号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            header-align="center"
                                            align="center"
                                            label="职务">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="paginationBox">
                                <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                </el-pagination>
                            </div>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
    </el-dialog>
</template>

<script>

    export default {
        data() {
            return {
                dialogVisible: false,
                pageTitle:'',
                infoList1:[],
                infoList2:[],
                infoList3:[],
                infoList4:[],
                infoList5:[],
                infoList6:[],
                infoList7:[],
                infoList8:[],
                infoList9:[],
                activeName:'1',
                formInline:{
                    key:''
                },
                pageVal:'',
                activeNameWeiChat:'1',
            }
        },
        methods: {
            init(val) {
                console.log(val,'33');

                this.dialogVisible = true;
                this.pageTitle = val.label;
                this.pageVal = val.value;
                if(val.value==8){
                    this.pageTitle = ''
                }
            },
            handleClose() {
                this.dialogVisible = false
            },
            weiChatClick(){},
        }
    }
</script>

<style scoped>
    .fireBox {
        width: 1200px;
        height:700px;
        margin-left:-20px;
        margin-top:-50px;
    }
    .fireBox img{
        width:100%;
        height:100%;
        border-radius:30px;
    }

</style>
