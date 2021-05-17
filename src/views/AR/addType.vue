<template>
    <el-dialog
            title="新增类型"
            :visible.sync="dialogVisible"
            :modal="false"
            custom-class="smallDialog publicDialog"
            :before-close="handleClose">

        <div>
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item prop="dictName">
                    <el-input
                            type="input"
                            placeholder="请输入类型名称"
                            v-model="form.dictName">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" size="small" style="width:100%;" @click="submitHandle('form')">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import to from "await-to-js";
    export default {
        data(){
            return{
                dialogVisible:false,
                form:{
                    dictName:''
                },
                rules:{
                    dictName: [
                        { required: true, message: '请输入类型名称', trigger: 'blur' },
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
                this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                        let data={
                            typePid:'',
                            dictName:this.form.dictName
                        }
                        let [err,res] = await to(this.$api.AR.bkAdd(data))
                        if(err) return
                        this.$message.success('提交成功')
                        this.$emit('refreshDataList')
                        this.dialogVisible = false
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
