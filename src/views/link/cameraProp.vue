<template>
    <el-dialog
            title=""
            :modal="false"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            class="cameraProp"
            :show-close="false"
            :before-close="handleClose">
        <div class="contentBox">
            <div class="closeIcon"><i class="el-icon-circle-close" @click="handleClose"></i></div>
            <img :src="videoUrl" class="imgVideo">
        </div>
    </el-dialog>
</template>

<script>
    export default {
       data(){
           return{
               //视频
               options: {
                   videoWidth:'100%',
                   videoHeight:'100%',
                   preload:false,   //预加载
                   cover:'',   //播放器默认封面图片
                   autoplay:true,   //播放器是否自动播放
                   source:'',
                   isLive: true,   //切换为直播流的时候必填
                   format: ''  //切换为直播流的时候必填
               },
               videoUrl:'',
               dialogVisible:false,
               tabVal:'first'
           }
       },
        methods:{
           init(url){
               this.dialogVisible = true;
               console.log('999');
                this.videoUrl = 'http://'+this.$global.deviceUrl+'/live/media/'+url;

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
