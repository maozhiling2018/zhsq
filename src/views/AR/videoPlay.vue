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
        <div class="content" >
            <iframe  src="http://10.54.2.22/embedded.html" ref="iframe" id="iframe" width="100%"
                    height="100%"></iframe>
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
                beforeUrl:'',
                cameraObj:{},
                videoTime:''
            }
        },
        created(){
            this.beforeUrl = 'http://'+this.$global.deviceUrl+'/archive/media/';
        },
        methods:{
            init(val){
                console.log(val,'val');
                this.dialogVisible = true;
                this.videoTime= val.createTime
                this.cameraName = val.cameraName;
                this.$nextTick(()=>{
                    this.initDeviceData()
                })

            },
            handleClose(){
                this.dialogVisible = false;
            },
            //获取设备数据
            initDeviceData(){
                this.$http.get('/xpi/camera/list',{
                        auth: {
                            username: 'root',
                            password: 'root'
                        }
                    }
                ).then((response) => {
                    if (response.data) {
                        console.log(response.data.cameras,'response.data.cameras');
                        response.data.cameras.map(item=>{
                            if(item.displayName == this.cameraName){
                                this.cameraObj ={
                                    storage: item.archives[0].storage,
                                    videoFile:item.videoStreams[0].accessPoint.slice(6),
                                }

                            }
                        })
                        console.log(this.cameraObj,'this.cameraObj');
                    }
                }).then(()=>{
                    setTimeout(()=>{
                        var box = document.getElementById('iframe')
                        if (this.cameraObj.storage !== null) {
                            box.contentWindow.postMessage({
                                type: 'init',
                                mode: 'archive',
                                time: new Date(this.videoTime),
                                origin: 'hosts/' + this.cameraObj.videoFile,
                                archive: {
                                    time: new Date(this.videoTime),
                                    storage: this.cameraObj.storage,
                                },
                                options: {archivePane: true},
                            }, "*")
                        }
                    },2000)

                })
            },

        }
    }
</script>

<style scoped>
.content{
    height:520px !important;
}
</style>
