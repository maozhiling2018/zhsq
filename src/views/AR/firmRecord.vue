<template>
    <el-dialog
            title="一企一档"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            class="dialogBox"
            :before-close="handleClose">
        <div class="dialogCon">
            <el-row class="textLeft">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="keyVal" placeholder="关键字"  type="text" size="small" clearable autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getTableList" size="small">查询</el-button>
                    </el-form-item>
                    <el-form-item label="" class="checkItem">
                        <el-popover
                                placement="top-start"
                                title="查看敏感信息需要验证您的密码"
                                width="300"
                                :visible-arrow="true"
                                v-model="visible"
                                trigger="click">
                            <el-input v-model="passwordVal" size="mini" autocomplete="new-password" type="password"></el-input>
                            <div class="marginT10 textCenter">
                                <el-button type="primary" size="mini" @click="getCheck">确定</el-button>
                                <el-button  size="mini" @click="cancelHandle">取消</el-button>
                            </div>
                            <el-checkbox  v-model="switchVal" label="显示敏感信息" border slot="reference"></el-checkbox>
                        </el-popover>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row>
                <div class="listDiv" :v-infinite-scroll="getTableList">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column
                                prop="unitName"
                                label="单位名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="industryCategory"
                                label="行业范围"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="legalPerson"
                                label="法人姓名">
                        </el-table-column>
                        <el-table-column
                                prop="telephone"
                                label="法人手机号">
                        </el-table-column>
                        <el-table-column
                                prop="idNumber"
                                label="法人身份证号">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="单位地址">
                        </el-table-column>
                        <el-table-column
                                prop="equipment"
                                label="消防设施">
                        </el-table-column>
                    </el-table>
                </div>
            </el-row>
        </div>
    </el-dialog>
</template>

<script>
    import to from "await-to-js";
    export default {
        data() {
            return {
                loading: false,
                passwordVal:'',
                dialogVisible: false,
                visible: false,
                keyVal:'',
                aaa:'',
                tableData:[],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                switchVal:false,
                deptId:'',
                searchValue:'',   //校验密码字段
            }
        },
        watch:{
            switchVal(newVal,oldVal){
                console.log(newVal, oldVal,'123');
                if(newVal ==true){
                    this.visible = true;
                }else{
                    this.searchValue =""
                    this.visible = false;
                    this.$nextTick(()=>{
                        this.getTableList()
                    })
                }
            }
        },
        methods: {
            //取消
            cancelHandle(){
                this.visible = false
                this.switchVal = false
                this.getTableList()
            },
            //验证密码
            async getCheck(){
                let data = {
                    plaintext:this.passwordVal
                }
                let [err,res] = await to(this.$api.AR.getCheck(data))
                if(err) return
                if(res.data.data == 1){
                    this.searchValue =1
                    this.visible = false
                    this.getTableList()
                }else{
                    this.$message.error('密码错误')
                    console.log('mmm');
                    this.switchVal = false
                    console.log(this.switchVal,'this.switchVal');
                }
                console.log(res,'ssssssss');
            },
            //获取列表
            async getTableList(){
                this.tableData=[]
                let data={
                    deptId:this.deptId,
                    unitName:this.keyVal,
                    pageNum:this.pageIndex,
                    pageSize:this.pageSize,
                    searchValue:this.searchValue
                }
                let [err, res] = await to(this.$api.AR.getCompanyList(data));
                if (err) return;
                console.log(res,'res');
                this.tableData = res.data.rows;
            },
            init(id) {
                this.deptId = id
                this.dialogVisible = true;
                this.pageIndex = 1
                this.keyVal = ''
                this.getTableList()
            },
            handleClose() {
                this.dialogVisible = false
            },
        }
    }
</script>

<style scoped>
    .chartMap {
        width: 100%;
        height: calc(850px - 150px)
    }

</style>
