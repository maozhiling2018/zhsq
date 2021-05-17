<template>
    <el-dialog
            title="访客信息"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :before-close="handleClose">
        <div class="dialogCon">
            <!--<div class="leftBox" style="width:32%;">
                <el-row class="marginT10">
                    <el-col :span="24">
                        <el-input v-model="searchVal" placeholder="输入通道名称搜索" style="width:83%;"
                                  size="small"></el-input>
                        <el-button type="primary" size="small">搜索</el-button>
                    </el-col>
                    <el-col :span="24" class="marginT20 treeBox">
                        <div class="l_tree_container">
                            <ew-tree :model="testdata"></ew-tree>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="rightBox visitorCon" style="width:calc(100% - 33%)">
                <el-row>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline textLeft padding10">
                        <el-col :span="6">
                            <el-form-item label="">
                                <el-input v-model="formInline.user" placeholder="关键字搜索" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="">
                                <el-date-picker
                                        v-model="formInline.dateRange"
                                        type="datetimerange"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        size="mini"
                                        style="width:100%;"
                                        :default-time="['12:00:00']">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
                <el-row :gutter="10">
                    <div class="visitorDeviceBox">
                        <el-col :span="12" v-for="(item,index) in visitorList" :key="index">
                            <div class="itemBox">
                                <div class="leftPhoto">
                                    <div class="photoImg"></div>
                                    <div class="color1">现场抓拍图片</div>
                                </div>
                                <div class="rightInfo">
                                    <el-form>
                                        <el-form-item label="开锁住户姓名："><span class="yellow">高阳</span></el-form-item>
                                        <el-form-item label="楼宇名称：">9栋3单元侧门</el-form-item>
                                        <el-form-item label="进出时间：">2020-11-12 12:00:00</el-form-item>
                                        <el-form-item label="进出方式：">进入</el-form-item>
                                        <el-form-item label="开锁方式：">App开门</el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-row>
                <div class="paginationBox">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="1000">
                    </el-pagination>
                </div>
            </div>-->
        </div>
    </el-dialog>
</template>

<script>
    import EwTree from '@/components/myTree'
    import open from '../../assets/images/AR/jk.png'
    import close from '../../assets/images/AR/forbid.png'
    import { getUrlBase64 } from '../../utils/util'
    export default {
        data() {
            return {
                open,
                close,
                dialogVisible: false,
                searchVal: '',
                testdata: [
                    {
                        name: "紫薇城市花园",
                        children: [
                            {
                                name: '高空抛物相机（1个）',
                                children: [
                                    {
                                        name: '紫薇城市花园-高空抛物相机'
                                    }
                                ]
                            },
                            {
                                name: '1单元1-9号楼、2单元1-8号楼（32个）',
                                children: [
                                    {
                                        name: '高空抛物相机',
                                        children: [
                                            {
                                                name: '摄像机一'
                                            },
                                            {
                                                name: '摄像机二'
                                            },
                                            {
                                                name: '摄像机三'
                                            }
                                        ]
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        name: '世家新城',
                        children: [
                            {
                                name: '高空抛物相机（1个）',
                                children: [
                                    {
                                        name: '世家新城-高空抛物相机'
                                    },
                                    {
                                        name: '世家新城-高空抛物相机'
                                    },
                                    {
                                        name: '世家新城-高空抛物相机'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                showLine:true,
                showIcon:true,
                visitorList: [
                    {
                        id: 1,
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        accessType: '进入',
                        lockType: 'App开门',
                    },
                    {
                        id: 2,
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        accessType: '进入',
                        lockType: 'App开门',
                    },
                    {
                        id: 3,
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        accessType: '进入',
                        lockType: 'App开门',
                    },
                    {
                        id: 4,
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        accessType: '进入',
                        lockType: 'App开门',
                    },
                    {
                        id: 5,
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        accessType: '进入',
                        lockType: 'App开门',
                    },{
                        id: 6,
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        accessType: '进入',
                        lockType: 'App开门',
                    },{
                        id: 7,
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        accessType: '进入',
                        lockType: 'App开门',
                    },{
                        id: 8,
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        accessType: '进入',
                        lockType: 'App开门',
                    },{
                        id: 9,
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        accessType: '进入',
                        lockType: 'App开门',
                    },{
                        id: 10,
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        accessType: '进入',
                        lockType: 'App开门',
                    },
                ],
                formInline:{
                    key:''
                },
                activeName:'first,'
            }
        },
        components:{
            EwTree
        },
        methods: {
            init() {
                this.dialogVisible = true;
                this.activeName = 'first'
                this.handleClick(0)
            },
            handleClose() {
                this.dialogVisible = false
            },
            onSelect(selectedKeys, info) {
                console.log('selected', selectedKeys, info);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss">
    .l_tree_container {
        ul{
            list-style: none;
            margin:0px;
            padding:0px;
            text-align:left;
        }
        /*width: 100%;
        height: 100%;
        box-shadow: 0 0 3px #ccc;
        margin: 13px;
        position: relative;*/
    }

</style>
