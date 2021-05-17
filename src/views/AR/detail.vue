<template>
    <el-dialog
            title="详情"
            :visible.sync="dialogVisible"
            :modal="false"
            width="40%"
            custom-class="smallDialog publicDialog"
            :before-close="handleClose">

        <div>
            <el-form :model="form"  label-width="120px" :label-position="labelPosition">
                <el-form-item label="处理人：" >
                    <span>张立红</span>
                </el-form-item>
                <el-form-item label="处理时间：">
                    <span>2020-10-20 12:00:00</span>
                </el-form-item>
                <el-form-item label="未定义备注：">
                    <span>备注的信息</span>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data(){
            return{
                dialogVisible:false,
                labelPosition:'right',
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
            init(){
                this.dialogVisible = true
            },
            handleClose(){
                this.dialogVisible = false
            },
            submitHandle(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
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
