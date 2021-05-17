<template>
    <el-dialog
            title="十种力量"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :append-to-body="true"
            :before-close="handleClose">
       <div class="tenBox">
           <div class="menuBox">
               <div class="liItem font20 color1 " @click="tenChangeHandle(item)" v-for="(item,index) in btnList" :key="index">{{item.label}}</div>
           </div>
       </div>
        <!--page1-->
        <ten-page v-if="tenPageVisible" ref="tenPage"></ten-page>
        <!--专职力量-->
        <guard-page v-if="guardPageVisible" ref="guardPage"></guard-page>
        <!--一人一档-->
        <people-record v-if="peopleRecordVisible" ref="peopleRecord"></people-record>
    </el-dialog>
</template>

<script>
    import TenPage from './tenPage'
    import GuardPage from './guardPage'
    import PeopleRecord from './peopleRecord'
    export default {
        data(){
            return{
                peopleRecordVisible:false,  //一人一档
                guardPageVisible:false,
                dialogVisible:false,
                btnList:[
                    {value:1,label:'志愿力量'},
                    {value:2,label:'主导力量'},
                    {value:3,label:'指导力量'},
                    {value:4,label:'支撑力量'},
                    {value:5,label:'协管力量'},
                    {value:6,label:'交管力量'},
                    {value:7,label:'微群力量'},
                    {value:8,label:'消防力量'},
                    {value:9,label:'司法力量'},
                    {value:10,label:'专职力量'},
                ],
                tenPageVisible:false,
                deptId:''
            }
        },
        components:{
            TenPage,GuardPage,PeopleRecord,
        },
        methods: {
            init(id) {
                this.deptId = id
                this.dialogVisible = true;
            },
            handleClose() {
                this.dialogVisible = false;
            },
            /*类型切换*/
            tenChangeHandle(val){
                console.log(val);
                this.tenPageVisible = true;

                if(val.value ==10){
                    this.guardPageVisible = true;
                    this.$nextTick(()=>{
                        this.$refs.guardPage.init()
                    })
                }else if(val.value ==4){
                    this.peopleRecordVisible = true;
                    this.$nextTick(()=>{
                        this.$refs.peopleRecord.init(this.deptId)
                    })
                } else{
                    this.$nextTick(()=>{
                        this.$refs.tenPage.init(val)
                    })
                }
            },

        }
    }
</script>

<style scoped>
    .bm-view {
        width: 100%;
        height:700px;
    }

</style>
