<template>
    <el-dialog
            title="租客信息"
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
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="租客信息" name="first">
                        <div class="peopleListBox visitorBox">
                            <el-row class="textLeft paddingL10">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="">
                                        <el-input v-model="formInline.key" placeholder="关键字" size="small" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary"  size="small">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-row>
                            <div class="listDiv">
                                <el-row :gutter="30" v-for="(item,index) in peopleList" :key="index" class="listBox margin0">
                                    <el-col :span="4" class="padding0">
                                        <div class="photoSmall">
                                            <div class="photoBg">
                                                <img :src="item.idPhoto" alt="" v-if="item.idPhoto !==''">
                                            </div>
                                        </div>
                                        <div class="font14 color1  textCenter" style="text-indent:20px;">身份证照片</div>
                                    </el-col>
                                    <el-col :span="4" class="padding0">
                                        <div class="photoSmall padding0 marginL20">
                                            <div class="photoBg">
                                                <img :src="item.cropPhoto" alt="" v-if="item.cropPhoto !==''">
                                            </div>
                                        </div>
                                        <div class="font14 color1 textCenter" style="text-indent:50px;">采集照片</div>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-row>
                                            <el-form label-width="120px">
                                                <el-col :span="10">
                                                    <el-form-item label="姓名：">{{item.name}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="身份证号：">{{item.idNo}}</el-form-item>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-form-item label="联系电话：">{{item.phone}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="住户类型：">{{item.type}}</el-form-item>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-form-item label="是否外籍：">{{item.isForeign}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="小区名称：">{{item.buildingNname}}</el-form-item>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-form-item label="楼宇名称：">{{item.idNo}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="登记时间：">{{item.checkDate}}</el-form-item>
                                                </el-col>
                                                <el-col :span="24">
                                                    <el-form-item label="民族：">{{item.nation}}</el-form-item>
                                                </el-col>
                                                <el-col :span="24">
                                                    <el-form-item label="户籍地址：">{{item.address}}</el-form-item>
                                                </el-col>
                                            </el-form>
                                        </el-row>

                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="paginationBox">
                            <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total="1000">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="已过期租客" name="second">
                        <div class="peopleListBox visitorBox">
                            <el-row class="textLeft paddingL10">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="">
                                        <el-input v-model="formInline.key" placeholder="已过期租客信息" size="small" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary"  size="small">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-row>
                            <div class="listDiv">
                                <el-row :gutter="30" v-for="(item,index) in peopleList" :key="index" class="listBox margin0">
                                    <el-col :span="4" class="padding0">
                                        <div class="photoSmall">
                                            <div class="photoBg">
                                                <img :src="item.idPhoto" alt="" v-if="item.idPhoto !==''">
                                            </div>
                                        </div>
                                        <div class="font14 color1  textCenter" style="text-indent:20px;">身份证照片</div>
                                    </el-col>
                                    <el-col :span="4" class="padding0">
                                        <div class="photoSmall padding0 marginL20">
                                            <div class="photoBg">
                                                <img :src="item.cropPhoto" alt="" v-if="item.cropPhoto !==''">
                                            </div>
                                        </div>
                                        <div class="font14 color1 textCenter" style="text-indent:50px;">采集照片</div>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-row>
                                            <el-form label-width="120px">
                                                <el-col :span="10">
                                                    <el-form-item label="姓名：">{{item.name}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="身份证号：">{{item.idNo}}</el-form-item>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-form-item label="联系电话：">{{item.phone}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="住户类型：">{{item.type}}</el-form-item>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-form-item label="是否外籍：">{{item.isForeign}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="小区名称：">{{item.buildingNname}}</el-form-item>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-form-item label="楼宇名称：">{{item.idNo}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="登记时间：">{{item.checkDate}}</el-form-item>
                                                </el-col>
                                                <el-col :span="24">
                                                    <el-form-item label="民族：">{{item.nation}}</el-form-item>
                                                </el-col>
                                                <el-col :span="24">
                                                    <el-form-item label="户籍地址：">{{item.address}}</el-form-item>
                                                </el-col>
                                            </el-form>
                                        </el-row>

                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="paginationBox">
                            <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total="1000">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="已注销租客" name="third">
                        <div class="peopleListBox visitorBox">
                            <el-row class="textLeft paddingL10">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="">
                                        <el-input v-model="formInline.key" placeholder="已注销租客信息" size="small" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary"  size="small">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-row>
                            <div class="listDiv">
                                <el-row :gutter="30" v-for="(item,index) in peopleList" :key="index" class="listBox margin0">
                                    <el-col :span="4" class="padding0">
                                        <div class="photoSmall">
                                            <div class="photoBg">
                                                <img :src="item.idPhoto" alt="" v-if="item.idPhoto !==''">
                                            </div>
                                        </div>
                                        <div class="font14 color1  textCenter" style="text-indent:20px;">身份证照片</div>
                                    </el-col>
                                    <el-col :span="4" class="padding0">
                                        <div class="photoSmall padding0 marginL20">
                                            <div class="photoBg">
                                                <img :src="item.cropPhoto" alt="" v-if="item.cropPhoto !==''">
                                            </div>
                                        </div>
                                        <div class="font14 color1 textCenter" style="text-indent:50px;">采集照片</div>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-row>
                                            <el-form label-width="120px">
                                                <el-col :span="10">
                                                    <el-form-item label="姓名：">{{item.name}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="身份证号：">{{item.idNo}}</el-form-item>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-form-item label="联系电话：">{{item.phone}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="住户类型：">{{item.type}}</el-form-item>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-form-item label="是否外籍：">{{item.isForeign}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="小区名称：">{{item.buildingNname}}</el-form-item>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-form-item label="楼宇名称：">{{item.idNo}}</el-form-item>
                                                </el-col>
                                                <el-col :span="14">
                                                    <el-form-item label="登记时间：">{{item.checkDate}}</el-form-item>
                                                </el-col>
                                                <el-col :span="24">
                                                    <el-form-item label="民族：">{{item.nation}}</el-form-item>
                                                </el-col>
                                                <el-col :span="24">
                                                    <el-form-item label="户籍地址：">{{item.address}}</el-form-item>
                                                </el-col>
                                            </el-form>
                                        </el-row>

                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="paginationBox">
                            <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total="1000">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
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
                peopleList: [
                    {
                        id: 1,
                        idPhoto: '',
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        idNo: '******',
                        phone: '*****0',
                        type: '业主',
                        isForeign: '否',
                        communityName: '朱各庄村',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        nation: '汉',
                        address: '陕西省西安市长安区文苑北路99号',
                    },
                    {
                        id: 2,
                        idPhoto: '',
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        idNo: '******',
                        phone: '*****0',
                        type: '业主',
                        isForeign: '否',
                        communityName: '朱各庄村',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        nation: '汉',
                        address: '陕西省西安市长安区文苑北路99号',
                    },
                    {
                        id: 3,
                        idPhoto: '',
                        cropPhoto: require('../../assets/images/AR/face.png'),
                        name: '张三',
                        idNo: '******',
                        phone: '*****0',
                        type: '业主',
                        isForeign: '否',
                        communityName: '朱各庄村',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        nation: '汉',
                        address: '陕西省西安市长安区文苑北路99号',
                    },
                    {
                        id: 4,
                        idPhoto: '',
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        idNo: '******',
                        phone: '*****0',
                        type: '业主',
                        isForeign: '否',
                        communityName: '朱各庄村',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        nation: '汉',
                        address: '陕西省西安市长安区文苑北路99号',
                    },
                    {
                        id: 5,
                        idPhoto: '',
                        cropPhoto: require('../../assets/images/AR/faceImg.png'),
                        name: '张三',
                        idNo: '******',
                        phone: '*****0',
                        type: '业主',
                        isForeign: '否',
                        communityName: '朱各庄村',
                        buildingNname: '1916户1301房',
                        checkDate: '2020-10-20 12:00:00',
                        nation: '汉',
                        address: '陕西省西安市长安区文苑北路99号',
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
