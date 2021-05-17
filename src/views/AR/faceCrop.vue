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
            <div class="cropDiv" id="cropImg">
                <div class="react-box" :id="'drawReact'+flag" style="width:0px;height:0px;"></div>
                <img :src="imgPath" alt="" class="imgDiv" id="face">
            </div>
        </div>
        <div class="closeBox">
            <img src="../../assets/images/link/close.png" alt="" @click="handleClose">
        </div>
    </el-dialog>
</template>

<script>
    import {cropImgBox} from "../../utils/util";

    export default {
       data(){
           return{
               dialogVisible:false,
               imgPath:false,
               tabVal:'first',
               flag:''
           }
       },
        created(){
            this.beforeUrl = 'http://'+this.$global.deviceUrl+'/archive/media/';
        },
        methods:{
           init(val,flag){
               console.log(val,flag,'val');
               this.flag = flag
               this.dialogVisible = true;
               this.imgPath=''
               if(this.flag =='faceSB'){
                   this.imgPath = this.beforeUrl + val.image
                   var reactFile= JSON.parse(val.rectangles)[0]
                   console.log(reactFile,'reactFile')
                   this.$nextTick(()=>{
                       var dom = document.getElementById('face')
                       var drawReact = document.getElementById('drawReact'+this.flag); // 获取矩形框元素
                       var areaInfo = dom.getBoundingClientRect(); // 返回元素的大小及其相对于视口的位置
                       drawReact.style.width = reactFile.w*800+'px'; // 宽
                       drawReact.style.height = reactFile.h*500+'px'; // 高
                       drawReact.style.visibility = 'visible'; // 进入画布按下鼠标显示默认矩形框
                       drawReact.style.top = reactFile.y*500 + 'px';
                       drawReact.style.left = reactFile.x*800 + 'px';
                   })
               }else if(this.flag == 'faceSearch'){
                   this.imgPath = this.beforeUrl + val.imageUrl

                   var position = val.position;
                   this.$nextTick(()=>{
                       var x = parseInt(800*position.left)
                       var y = parseInt(500*position.top)
                       var w = parseInt(800*position.right)
                       var h = parseInt(500*position.bottom)
                       console.log(x, y, w, h,'123456')
                       var wVal = w- x
                       var hVal = h- y
                       var dom = document.getElementById('face')
                       var drawReact = document.getElementById('drawReact'+this.flag); // 获取矩形框元素
                       console.log(dom.getBoundingClientRect,'毛志玲')
                       drawReact.style.width =wVal+'px'; // 宽
                       drawReact.style.height =hVal+'px'; // 高
                       drawReact.style.visibility = 'visible'; // 进入画布按下鼠标显示默认矩形框
                       drawReact.style.top = y + 'px';
                       drawReact.style.left = x + 'px';
                   })
               }else{
                   this.imgPath = this.beforeUrl + val.image
                   var reactFile= JSON.parse(val.rectangles)[0]
                   this.$nextTick(()=>{
                       var dom = document.getElementById('face')
                       var drawReact = document.getElementById('drawReact'+this.flag); // 获取矩形框元素
                       var areaInfo = dom.getBoundingClientRect(); // 返回元素的大小及其相对于视口的位置
                       drawReact.style.width = reactFile.w*800+'px'; // 宽
                       drawReact.style.height = reactFile.h*500+'px'; // 高
                       drawReact.style.visibility = 'visible'; // 进入画布按下鼠标显示默认矩形框
                       drawReact.style.top = reactFile.y*500 + 'px';
                       drawReact.style.left = reactFile.x*800 + 'px';
                       console.log(drawReact,'drawReactdrawReact')
                   })
               }


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
    .cropDiv{
        width:800PX;
        height:500PX;
        position:relative;
        BACKGROUND:RED;
    }
    .cropDiv img{
        width:100% !important;
        height:100% !important;
    }
    /*.imgDiv{
        position:absolute;
        top:0px;
        left:0px;
        z-index: 0;
    }*/
</style>
