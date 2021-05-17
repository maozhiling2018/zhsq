<template>
    <div class="loginMain">
        <div class="left"><img :src="logoBgUrl" alt="" width="100%" height="100%"></div>
        <div class="right">
            <div class="logo">
                <img :src="logoUrl" alt="">
                <span>{{chineseName}}</span>
            </div>
            <div class="loginBox">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" >
                    <el-form-item label="" prop="userName">
                        <el-input v-model="ruleForm.userName" placeholder="输入用户名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="输入密码" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="pass">
                        <span  style="float:left;color:#2FA2F4;cursor:pointer;" @click="activateHandle">激活账号</span>
                        <el-checkbox v-model="ruleForm.checked" style="float:right;" class="rememberPas">记住密码</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" class="loginBtn">登 录</el-button>
                    </el-form-item>
                </el-form>
                <div class="red font16">剩余有效期：<b>{{validate}}</b> 天</div>
            </div>
        </div>
        <activate v-if="activateVisible" ref="activate"></activate>
    </div>
</template>

<script>
    import to from "await-to-js";
    import Activate from './activatePage'
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            return {
                validate:'',
                activateVisible:false,
                chineseName:'',
                englishName:'',
                logoUrl:'',
                logoBgUrl:'',
                ruleForm: {
                    userName: '',
                    password: '',
                    checked:false,
                },
                rules: {
                    userName: [
                        { required: true, message: '输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatePass,required: true, message: '输入密码', trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
            this.getInfo()
            this.getValidityData()
            var _self = this;
            document.onkeydown = function(e){
                var key = window.event.keyCode;
                if(key == 13 || key == 100){
                    _self.submitForm('ruleForm');
                }
            }
        },
        components:{
            Activate
        },
        methods: {
            //获取有效期
            async getValidityData(){
                let [err,res] = await to (this.$api.login.getValidity())
                if(err) return;
                if(res.data.code==200){
                    this.validate = res.data.data
                }
                console.log(res,'rrr')
            },
            activateHandle(){
               this.activateVisible = true;
               this.$nextTick(()=>{
                   this.$refs.activate.init()
               })
            },
            async getInfo(){
                let [err, res] = await to(this.$api.login.getSetting())
                if (err) return
                document.title= res.data.data.chineseName
                this.chineseName= res.data.data.chineseName
                this.logoUrl= res.data.data.logo
                this.logoBgUrl= res.data.data.landingMap
                this.englishName= res.data.data.englishName
            },
            formatFormData() {
                // let password = passwordMd5(this.ruleForm.password)
                // todo  如果是编辑会有id，新增不会有id，如果提取出来的是有案件名称的
                let data = {
                    //deptId:20
                    username:this.ruleForm.userName,
                    password:this.ruleForm.password,
                };
                return data;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let data = this.formatFormData();
                        let [err, res] = await to(
                            this.$api.login.getLogin(data)
                        );
                        if (err) return;
                        console.log(res.data,'www');
                        if(res.data.code == 200){
                            this.$cookie.set('token',res.data.token)
                            this.$router.push({path:'/home',query:{chineseName:'中国'}})
                        }else{
                            this.$message.warning(res.data.msg)
                        }

                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

