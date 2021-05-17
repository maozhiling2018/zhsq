<template>
    <el-dialog
            title=""
            :modal="false"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            class="mapProp"
            :show-close="false"
            :close-on-click-modal="false"
            :before-close="handleClose">
        <div class="content">
            <el-tabs v-model="tabVal" @tab-click="tabHandleClick" >
                <el-tab-pane label="图片" name="first">
                    <div class="showBox">
                        <el-carousel trigger="click" height="450px;width:90%;">
                            <el-carousel-item v-for="item,index in imgList" :key="index">
                                <img :src="item" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="介绍" name="fourth">
                    <div class="textBox" v-html="detail">
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
    export default {
       data(){
           return{
               dialogVisible:false,
               tabVal:'first',
               imgList:[
                   {imgUrl:require('../../assets/images/link/testImg.png')},
                   {imgUrl:require('../../assets/images/link/testImg.png')},
                   {imgUrl:require('../../assets/images/link/testImg.png')},
               ],
               detail:''
           }
       },
        methods:{
           init(data){
               this.dialogVisible = true;
               this.imgList = data.pictures.split(',')
               this.detail = data.details
               console.log(data,'pictures');
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
