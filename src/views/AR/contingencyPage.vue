<template>
    <el-dialog
            title="应急预案"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :before-close="handleClose">
        <div class="dialogCon">
                <div class="conBox" v-loading="loading">
                    <el-collapse v-model="activeName" accordion>
                          <el-collapse-item :title="item.title" :name="index" v-for="(item,index) in dataList" :key="index">
                              <p v-html="item.details"></p>
<!--                              <el-image  :src="item.picture"   alt="" v-if="item.picture !=''"></el-image>-->
                          </el-collapse-item>
                      </el-collapse>
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
                loading:false,
                dialogVisible: false,
                pageIndex: 1,
                pageSize: 10,
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
                this.getDataList()
            },
            handleClose() {
                this.dialogVisible = false
            },
            /*获取数据*/
            async getDataList(){
                this.loading = true;
                let data={
                    deptId:this.deptId,
                    pageNum:this.pageIndex,
                    pageSize:this.pageSize,
                }
                let [err, res] = await to(this.$api.AR.getPlanList(data));
                if (err) return;
                this.loading = false
                this.dataList = res.data.rows;
                this.totalPage = res.data.total;
                console.log(res.data.rows,'获取卡口名称');
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

</style>
