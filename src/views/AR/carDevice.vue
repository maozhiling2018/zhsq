<template>
    <el-dialog
            title="车辆设备"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :append-to-body="true"
            :before-close="handleClose">
        <div class="dialogCon">

        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                pageTitle:'',
                infoList1:[],
                infoList2:[],
                infoList3:[],
                infoList4:[],
                infoList5:[],
                infoList6:[],
                infoList7:[],
                infoList8:[],
                infoList9:[],
                infoList10:[],
                activeName:'1',
                formInline:{
                    key:''
                },
                pageVal:'',
                activeNameWeiChat:'1',
            }
        },
        methods: {
            init(val) {
                this.dialogVisible = true;
                this.pageTitle = val.label;
                this.pageVal = val.value;
            },
            handleClose() {
                this.dialogVisible = false
            },
            weiChatClick(){},
            handleClick(){},
        }
    }
</script>

<style scoped>
    .chartMap {
        width: 100%;
        height: calc(850px - 150px)
    }

</style>
