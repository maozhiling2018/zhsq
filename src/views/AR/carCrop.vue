<template>
    <el-dialog
            title=""
            :visible.sync="dialogVisible"
            :append-to-body="true"
            :modal-append-to-body="false"
            class="linkProp"
            :show-close="false"
            :close-on-click-modal="false"
            :before-close="handleClose">
        <div class="content">
            <div id="cropImg">
                <div class="react-box" id="drawReact"></div>
                <img src="../../assets/images/AR/faceCrop.png" alt="" class="imgDiv" id="imgCropId"> </div>
        </div>
        <div class="closeBox">
            <img src="../../assets/images/link/close.png" alt="" @click="handleClose">
        </div>
    </el-dialog>
</template>

<script>
    import testImg from '../../assets/images/AR/faceCrop.png'
    import {drawDashLine} from '../../utils/util'
    export default {
       data(){
           return{
               dialogVisible:false,
               tabVal:'first',
               testImg,
           }
       },
        methods:{
           init(item){
               console.log(JSON.parse(item.rectangles),'ddd');
               var reactFile= JSON.parse(item.rectangles)[0]
               var url =this.beforeUrl + item.image
               this.dialogVisible = true;
               this.$nextTick(()=>{
                   var dom = document.getElementById('imgCropId')
                   var drawReact = document.getElementById('drawReact'); // 获取矩形框元素
                   var areaInfo = dom.getBoundingClientRect(); // 返回元素的大小及其相对于视口的位置
                   console.log(areaInfo,'areaInfo');
                   console.log(reactFile,'reactFile');
                   drawReact.style.width = reactFile.w*1920+'px'; // 宽
                   drawReact.style.height = reactFile.w*1072+'px'; // 高
                   drawReact.style.visibility = 'visible'; // 进入画布按下鼠标显示默认矩形框
                   drawReact.style.top = reactFile.y*1072 + 'px';
                   drawReact.style.left = reactFile.x*1920 + 'px';
               })
              // var box = document.getElementById('myCanvas')

               /*img.onload = function(){
                   ctx.drawImage(img,0,0)
                   ctx.strokeStyle="blue";
                   ctx.rect(0,0,100,100)
                   ctx.stroke()
               }*/
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
 .imgDiv{
     position: relative;
     top:0px;
     left:0px;
 }
</style>
