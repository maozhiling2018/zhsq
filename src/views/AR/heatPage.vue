<template>
    <el-dialog
            title="热点采集"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :append-to-body="true"
            class="dialogBox"
            :before-close="handleClose">
       <div class="dialogCon">
           <div class="heatBox">
               <img src="../../assets/images/AR/heatCon.png" alt="">
           </div>


       </div>
    </el-dialog>
</template>

<script>
    export default {
        data(){
            return{
                dialogVisible:false,
            }
        },
        methods: {
            init() {
                this.dialogVisible = true;
            },
            handleClose() {
                this.dialogVisible = false;
            }
        }
    }
</script>

<style>
    .heatBox{
        width:100%;
        height:98%;
        background:#091A5B;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top:-20px;
    }
</style>
