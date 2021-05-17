<template>
    <el-dialog
            title="新增黑名单"
            :visible.sync="dialogVisibleBk"
            :modal-append-to-body="false"
            :append-to-body="true"
            :before-close="handleCloseBk"
            width="30%"
            custom-class="addDialog publicDialog height740"
            >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:80%;margin:0 auto;">
            <el-form-item label="上传照片"  >
                <el-upload
                        class="avatar-uploader"
                        :action="$global.baseUrl+'/common/upload'"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        >
                    <img v-if="ruleForm.picture" :src="ruleForm.picture" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="姓名" >
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号">
                <el-input v-model="ruleForm.certificateNumber"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="ruleForm.telephone"></el-input>
            </el-form-item>
            <el-form-item label="布控阀值" prop="threshold">
                <el-input-number v-model="ruleForm.threshold" :precision="2" :step="0.01" :min='0' :max="1" size="small"></el-input-number>
<!--               // <el-input v-model="ruleForm.threshold" style="width:30%;"> </el-input> <span class="color1">%</span>-->
            </el-form-item>
            <el-form-item label="布控类型" prop="dictName">
                <el-cascader
                        v-model="ruleForm.dictName"
                        :options="typeList"
                        :show-all-levels="false"
                        :props="defaultProps">
                </el-cascader>
            </el-form-item>
            <el-form-item label="布控库" prop="libraryName">
                <el-select v-model="ruleForm.libraryName" placeholder="请选择布控库">
                    <el-option :label="item.libraryName" :value="item.controlId" v-for="(item,index) in kuList" :key="index"></el-option>
                </el-select>
            </el-form-item>
           <!-- <el-form-item label="布控周期" prop="period">
                <el-select v-model="ruleForm.period" placeholder="请选择性别">
                    <el-option label="男" value="man"></el-option>
                    <el-option label="女" value="woman"></el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item label="备注">
                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveForm('ruleForm')" style="width:40%;" :disabled="sureLoading">确定</el-button>
                <el-button type="delete" @click="handleCloseBk" style="width:40%;">取消</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>

<script>
    import to from "await-to-js";
    export default {
        data(){
            return{
                sureLoading:false,
                kuList:[],
                dialogVisibleBk:false,
                typeList:[],  //布控类型
                ruleForm: {
                    picture:'',
                    name: '',
                    sex: '',
                    certificateNumber: '',
                    telephone: '',
                    threshold: '',
                    dictName: '',
                    libraryName:'',
                    remark: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    picture: [
                        { required: true, message: '请上传照片', trigger: 'change' }
                    ],
                    bkVal: [
                        { required: true, message: '请输入布控阀值', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择布控类型', trigger: 'change' },
                    ],
                    bkk: [
                        { required: true, message: '请选择布控库', trigger: 'change' },
                    ],
                    period: [
                        { required: true, message: '请选择布控周期', trigger: 'change' }
                    ],
                },
                defaultProps: {
                    children: 'children',
                    label: 'dictName',
                    value:'dictName'
                },
                deptId:''
            }
        },
        methods:{
            //获取布控库
            async getKuData(){
                let data ={}
                let [err, res] = await to(this.$api.AR.getkuAll(data));
                if (err) return;
                this.kuList = res.data.data;
            },
            init(id,flag){
                console.log(id, flag,'id,flag');

                this.deptId = id || undefined;
                this.getBkType()
                this.getKuData()
                this.dialogVisibleBk = true;
                this.$nextTick(() => {
                   this.ruleForm = {}
                    //this.ruleForm.threshold = '0.90'
                })
            },
            //布控类型
            async getBkType(){
                let data={
                    typePid:0,
                    dictName:''
                }
                let [err, res] = await to(this.$api.AR.bkType(data));
                if (err) return;
                this.typeList = res.data.data;
            },
            handleCloseBk(){
                this.dialogVisibleBk = false;
            },
            formatFormData(){
                console.log(String(this.ruleForm.threshold),'fazhi');
                let data = {
                    name: this.ruleForm.name,
                    picture: this.ruleForm.picture,
                    sex: this.ruleForm.sex,
                    certificateNumber: this.ruleForm.certificateNumber,
                    telephone: this.ruleForm.telephone,
                    threshold: String(this.ruleForm.threshold),
                    dictCode: this.ruleForm.dictCode,
                    dictName: this.ruleForm.dictName[0] + '-' + this.ruleForm.dictName[1],
                   // personnelId: this.ruleForm.personnelId,
                    personnelId: this.ruleForm.libraryName,
                }
                return data;
            },
             saveForm() {
                this.$refs['ruleForm'].validate(async (valid) => {
                    if (valid) {
                        let data = this.formatFormData();
                        let [err, res] = await to(
                            this.$api.AR.blackSave(data)
                        );
                        if (err) return;
                        console.log(res,'www');
                        if(res.data.code == 200){
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {
                                    this.dialogVisibleBk = false
                                    this.$emit('refreshDataList')
                                }
                            })
                        }else{
                            this.$message.warning(res.data.msg)
                        }
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /*上传照片*/
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleAvatarSuccess(res) {
                this.ruleForm.picture = res.url;
            },
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #16ECF0 !important;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #16ECF0;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }
</style>
