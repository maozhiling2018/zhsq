<template>
    <el-dialog
            :title="detailFlag?'库详情':'编辑库'"
            :visible.sync="dialogVisible"
            width="30%"
            :modal="false"
            :modal-append-to-body="false"
            custom-class="addDialog publicDialog"
            style="height:520px;"
            :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:80%;margin:0 auto;">
            <el-form-item label="库名称：" prop="libraryName">
                <el-input v-model="ruleForm.libraryName" v-if="!detailFlag"></el-input>
                <div v-if="detailFlag">{{ruleForm.libraryName}}</div>
            </el-form-item>
           <!-- <el-form-item label="布控阀值" prop="bkVal">
                <el-input v-model="ruleForm.bkVal" style="width:30%;"> </el-input> <span class="color1 paddingL5">%</span>
            </el-form-item>-->
            <el-form-item label="布控级别：">
                <el-select v-model="ruleForm.category" placeholder="请选择布控级别" v-if="!detailFlag">
                    <el-option label="普通布控" value="普通布控"></el-option>
                    <el-option label="告警布控" value="告警布控"></el-option>
                </el-select>
                <div v-if="detailFlag">{{ruleForm.category}}</div>
            </el-form-item>
           <el-form-item label="告警共享：">
                <el-radio-group v-model="ruleForm.identification" v-if="!detailFlag">
                    <el-radio :label="0">开</el-radio>
                    <el-radio :label="1">关</el-radio>
                </el-radio-group>
               <div v-if="detailFlag && ruleForm.identification ==0">开</div>
               <div v-if="detailFlag && ruleForm.identification ==1">关</div>
            </el-form-item>

            <el-form-item label="备注：">
                <el-input type="textarea" v-model="ruleForm.remark" v-if="!detailFlag"></el-input>
                <div v-if="detailFlag">{{ruleForm.remark}}</div>
            </el-form-item>
            <el-form-item v-if="!detailFlag">
                <el-button type="primary" @click="submitForm('ruleForm')" style="width:40%;">确定</el-button>
                <el-button type="delete" @click="resetForm('ruleForm')" style="width:40%;">取消</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>
<script>
    import to from "await-to-js";
    export default {
        data(){
            return{
                detailFlag:false,   //编辑，查看详情标识
                dialogVisible:false,
                photoDialogVisible:false,
                ruleForm: {
                    id:'',
                    libraryName: '',
                    category: '',
                    identification: '',
                    remark: '',
                },
                rules: {
                    libraryName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    category: [
                        { required: true, message: '请选择类别', trigger: 'change' }
                    ],
                    identification: [
                        { required: true, message: '请选择告警共享', trigger: 'change' },
                    ]
                },
                dialogImageUrl: '',
            }
        },
        methods:{
            init(row,flag){
                console.log(row,flag,'row');
                this.detailFlag = flag;
                this.dialogVisible = true;
                this.ruleForm = row;
                this.ruleForm.id = row.controlId;
                this.ruleForm.identification = Number(row.identification)
            },
            handleClose(){
                this.dialogVisible = false;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {//saveKu
                        let data={
                            controlId:this.ruleForm.id,
                            libraryName:this.ruleForm.libraryName,
                            category:this.ruleForm.category,
                            identification:this.ruleForm.identification,
                            remark:this.ruleForm.remark,
                        }
                        let [err, res] = await to(this.$api.AR.editKu(data));
                        if (err) return;
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.dialogVisible = false
                                this.$emit('refreshDataList')
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /*上传照片*/
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.photoDialogVisible = true;
            }
        }
    }
</script>

<style scoped>

</style>
