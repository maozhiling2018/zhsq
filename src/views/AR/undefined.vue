<template>
    <el-dialog
            title="未定义原因"
            :visible.sync="dialogVisible"
            :modal="false"
            custom-class="smallDialog publicDialog"
            :before-close="handleClose">

        <div>
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item prop="reason">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 4}"
                            placeholder="请输入为定义的原因"
                            v-model="form.reason">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="small" style="width:100%;" @click="submitHandleFace('form')" v-if="flag=='faceFlag'">确 定</el-button>
    <el-button type="primary" size="small" style="width:100%;" @click="submitHandleAlart('form')" v-if="flag=='alertFlag'">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import to from "await-to-js";
    export default {
        data(){
            return{
                itemId:'',
                flag:'',
                dialogVisible:false,
                form:{
                    reason:''
                },
                rules:{
                    reason: [
                        { required: true, message: '请输入未定义原因', trigger: 'blur' },
                    ],
                },

            }
        },
        methods:{
            init(id,flag){
                console.log(id,flag,'id');
                this.itemId = id;
                this.flag = flag
                this.dialogVisible = true
            },
            handleClose(){
                this.dialogVisible = false
            },
            submitHandleFace(formName){
                this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                        let data={
                            status:3,
                            remark:this.form.reason,
                            ids:this.itemId
                        }
                        let [err,res] = await to(this.$api.AR.getFaceAlertUpdate(data))
                        if(err) return
                        console.log(res,'face');
                        this.$message.success('提交成功')
                        this.$nextTick(()=>{
                            this.$emit('refreshDataList')
                            this.dialogVisible = false
                        })


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitHandleAlart(formName){
                this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                        let data={
                            status:3,
                            remark:this.form.reason,
                            ids:this.itemId
                        }
                        let [err,res] = await to(this.$api.AR.getAlertUpdate(data))
                        if(err) return
                        console.log(res,'alert');
                        this.$message.success('提交成功')
                        this.dialogVisible = false

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
