<template>
    <el-dialog
            title=""
            :modal="false"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            class="linkProp"
            :show-close="false"
            :close-on-click-modal="false"
            :before-close="handleClose">
        <div class="content">
            <el-tabs v-model="tabVal" @tab-click="tabHandleClick" >
                <el-tab-pane label="图片" name="first">
                    <div class="showBox"><img :src="mapData.picture" alt=""></div>
                </el-tab-pane>
               <!-- <el-tab-pane label="实时监控" name="third">
                    <div class="showBox"><img src="../../assets/images/link/testImg.png" alt=""></div>
                </el-tab-pane>-->
                <el-tab-pane label="介绍" name="fourth">
                    <div class="textBox" v-html="mapData.synopsis">
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="closeBox">
            <img src="../../assets/images/link/close.png" alt="" @click="handleClose">
        </div>
    </el-dialog>
</template>

<script>
    import to from "await-to-js";
    export default {
       data(){
           return{
               dialogVisible:false,
               tabVal:'first',
               mapData:{}
           }
       },
        methods:{
           async init(id){
               this.dialogVisible = true;
               let data = {
                   deptStyleId:id
               }
               let [err,res] = await to(this.$api.Link.getdeviceDetail(data))
               if(err) return
               console.log(res.data.data,'小区详情');
               this.mapData = res.data.data;
           },
            handleClose(){
               this.dialogVisible = false;
            },
            /*tab切换事件*/
            tabHandleClick(){

            },
        }
    }
</script>

<style scoped>

</style>
