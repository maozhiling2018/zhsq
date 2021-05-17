<template>
    <el-dialog
            :title="title+'黑名单'"
            :visible.sync="dialogVisibleBk"
            :modal-append-to-body="false"
            :append-to-body="true"
            :before-close="handleCloseBk"
            width="30%"
            custom-class="addDialog publicDialog height740"
            >
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:80%;margin:0 auto;">
            <el-form-item label="上传照片"  >
                <el-upload
                        v-if="flag==true"
                        class="avatar-uploader"
                        :action="$global.baseUrl+'/common/upload'"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        >
                    <img v-if="ruleForm.picture" :src="ruleForm.picture" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div  v-if="flag==false">
                    <img v-if="ruleForm.picture" :src="ruleForm.picture" class="avatar">
                </div>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" v-if="flag==true"></el-input>
                <span v-else class="color1">{{ruleForm.name}}</span>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别" v-if="flag==true" >
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                </el-select>
                <span v-else class="color1" >{{ruleForm.sex}}</span>
            </el-form-item>
            <el-form-item label="证件号">
                <el-input v-model="ruleForm.certificateNumber" v-if="flag==true"></el-input>
                <span v-else class="color1">{{ruleForm.certificateNumber}}</span>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="ruleForm.telephone" v-if="flag==true"></el-input>
                <span v-else class="color1">{{ruleForm.telephone}}</span>
            </el-form-item>
            <el-form-item label="布控阀值" prop="threshold">
                <el-input v-model="ruleForm.threshold" style="width:30%;" v-if="flag==true"> </el-input> <span class="color1" v-if="flag==true">%</span>
                <span v-if="flag==false" class="color1">{{ruleForm.telephone}}</span>
            </el-form-item>
            <el-form-item label="布控类型" prop="dictName">
                <el-cascader
                        v-if="flag==true"
                        v-model="ruleForm.dictName"
                        :options="typeList"
                        :show-all-levels="false"
                        :props="defaultProps"
                        @change="handleNodeClick">
                </el-cascader>
                <span v-else class="color1">{{ruleForm.dictName}}</span>
            </el-form-item>
            <el-form-item label="布控库" prop="libraryName">
                <el-select v-model="ruleForm.libraryName" placeholder="请选择布控库" v-if="flag==true">
                    <el-option :label="item.libraryName" :value="item.controlId" v-for="(item,index) in kuList" :key="index"></el-option>
                </el-select>
                <span v-else class="color1">{{ruleForm.libraryName}}</span>
            </el-form-item>

           <!-- <el-form-item label="布控周期" prop="period">
                <el-select v-model="ruleForm.period" placeholder="请选择性别">
                    <el-option label="男" value="man"></el-option>
                    <el-option label="女" value="woman"></el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item label="备注">
                <el-input type="textarea" v-model="ruleForm.remark" v-if="flag==true"></el-input>
                <span v-else class="color1">{{ruleForm.remark}}</span>
            </el-form-item>
            <el-form-item v-if="flag==true">
                <el-button type="primary" @click="submitForm('ruleForm')" style="width:40%;">确定</el-button>
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
                title:'',
                flag:'',
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
                controlPersonnelId:'',
            }
        },
        methods:{
            //获取布控库
            async getKuData(){
                let data ={}
                let [err, res] = await to(this.$api.AR.getkuAll(data));
                if (err) return;
                console.log(res,'buk');
                this.kuList = res.data.data;
                console.log(this.kuList,'this.kuList');
            },
            //布控类型选择
            handleNodeClick(data) {
                console.log(data);
            },
            init(id,flag){
                this.controlPersonnelId = id
                this.flag = flag;
                if(this.flag==true){
                    this.title='修改'
                }else{
                    this.title = '查看'
                }
                this.getBkType()
                this.getKuData()
                this.dialogVisibleBk = true;
                this.getDetail(id)
            },
            //根据ID查询详情
            async getDetail(id){
                let data ={
                    controlPersonnelId:id
                }
                let [err,res] = await to(this.$api.AR.blackDetail(data))
                if(err) return
                console.log(res,'详情');
                this.ruleForm = res.data.data;
            },
            //布控类型
            async getBkType(){
                let data={
                    typePid:0,
                    dictName:''
                }
                let [err, res] = await to(this.$api.AR.bkType(data));
                if (err) return;
                console.log(res.data,'布控类型');
                this.typeList = res.data.data;
            },
            handleCloseBk(){
                //this.$refs['ruleForm'].resetFields()
                this.$nextTick(()=>{
                    this.dialogVisibleBk = false;
                })

            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        console.log(formName,'formName');
                        let data = {
                            controlPersonnelId:this.controlPersonnelId,
                            name:this.ruleForm.name,
                            picture:this.ruleForm.picture,
                            sex:this.ruleForm.sex,
                            certificateNumber:this.ruleForm.certificateNumber,
                            telephone:this.ruleForm.telephone,
                            threshold:this.ruleForm.threshold,
                            dictCode:this.ruleForm.dictCode,
                            dictName:this.ruleForm.dictName[0]+'-'+this.ruleForm.dictName[1],
                            personnelId:this.ruleForm.personnelId,
                            libraryName:this.ruleForm.libraryName,
                        }
                        let [err,res] = await to(this.$api.AR.blackEdit(data))
                        if(err) return
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                        })
                        this.$nextTick(()=>{
                            this.dialogVisibleBk = false
                            this.$emit('refreshDataList')
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
