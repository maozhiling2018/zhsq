<template>
    <el-dialog
            title="抓拍"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :before-close="handleClose">
        <div class="dialogCon">
                <div class="conBox" style="overflow-x: hidden">
                    <el-row :gutter="20">
                        <el-col :span="2.4" v-for="(item,index) in cropImgList" :key="index" class="marginT10">
                            <div class="cropImg">
                                <img :src="item.url" alt="">
                            </div>
                            <div class="cropText">
                                <span class="color2">{{item.personName}}</span>
                                <span>{{item.days}}</span>
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
                            layout="total, prev, pager, next,sizes">
                    </el-pagination>
                </div>
        </div>
    </el-dialog>
</template>

<script>
    import to from "await-to-js";
    export default {
        data() {
            return {
                cropImgList:[],
                dialogVisible: false,
                pageIndex: 1,
                pageSize: 50,
                totalPage: 0,
                activeName:'',
                dataList:[],
                deptId:''
            }
        },
        methods: {
            // 每页数
           sizeChangeHandle (val) {
               this.pageSize = val
               this.pageIndex = 1
               this.getDataList()
           },
           // 当前页
           currentChangeHandle (val) {
               this.pageIndex = val
               this.getDataList()
           },
            init(id) {
               this.deptId = id
                this.dialogVisible = true;
               this.pageIndex = 1
                this.pageSize = 50
                this.getDataList()
            },
            handleClose() {
                this.dialogVisible = false
            },
            /*获取数据*/
            async getDataList(){
                let data={
                    deptId:this.deptId,
                    pageNum:this.pageIndex,
                    pageSize:this.pageSize,
                }
                let [err, res] = await to(this.$api.Map.getCropImg(data));
                if (err) return;
                this.cropImgList = res.data.rows;
                this.totalPage = res.data.total;
                console.log(res.data.rows,'获取数据');
            },
            // 当前页
            currentChangeHandle1 (val) {
                this.pageIndex = val
                this.getDataList()
            },
        }
    }
</script>

<style lang="scss">
    .cropImg{
        width:120px;
        height:140px;
        border:1px solid #00ffff;
        img{
            width:100% !important;
            height:100% !important;
        }
    }
</style>
