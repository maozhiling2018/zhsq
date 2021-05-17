<template>
  <el-dialog
          title=""
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="激活码" prop="code">
        <el-input type="textarea" v-model="ruleForm.code" :autosize="{ minRows: 4}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import to from "await-to-js";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        code: ''
      },
      rules: {
        code: [
          { required: true, message: '请填写激活码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    init(){
      this.dialogVisible = true
    },
    handleClose(done) {
      this.dialogVisible = false
    },
     submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        //activeCode
        if (valid) {
          let data = {
            'value':this.ruleForm.code
          }
          let [err, res] = await to(this.$api.login.activeCode(data))
          if (err) return
          if(res.data.code==200){
            this.$message.success('激活成功')
            this.dialogVisible = false
          }else{
            this.$message.error(res.data.msg)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>

</style>
