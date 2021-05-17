<template>
    <el-dialog
            title=''
            :visible.sync="dialogVisible"
            :modal="false"
            width="30%"
            custom-class="smallDialog publicDialog"
            :before-close="handleClose">

        <div class="paddingT25">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px">
                <el-form-item prop="name" label="布控名称：">
                    <el-input v-model="form.name" placeholder="请输入布控名称"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="选择设备：">
                    <el-select v-model="form.cameraVal" placeholder="请选择">
                        <el-option
                                v-for="(item,index) in cameraList"
                                :key="item.displayId"
                                :label="item.displayName"
                                :value="item.files">
                        </el-option>
                    </el-select>
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
    import {getUUID} from '../../utils/util'
    export default {
        data() {
            return {
                itemId: '',
                controlPersonnelId: '',
                uuid: '',
                dialogVisible: false,
                cameraList: [],
                cameraVal: '',
                form: {
                    name: '',
                    cameraVal:''
                },
                rules: {},

            }
        },
        methods: {
            init(id,controlPersonnelId) {
                console.log(id);
                this.itemId = id
                this.controlPersonnelId = controlPersonnelId
                this.dialogVisible = true
                this.getDeviceData()
            },
            handleClose() {
                this.dialogVisible = false
            },

           submitHandle(formName) {
                console.log(this.form);
                this.uuid = getUUID()
                let data1 = {
                    "method": "axxonsoft.bl.logic.LogicService.ChangeMacros",
                    "data": {
                        "added_macros": {
                            "guid": this.uuid,
                            "name": this.form.name,
                            "mode": {
                                "enabled": "true",
                                "user_role": "",
                                "is_add_to_menu": "false",
                                "common": {}
                            },
                            "conditions": {
                                "0": {
                                    "path": "/C:0",
                                    "recognition": {
                                        "camera": this.form.cameraVal.file,
                                        "list": this.itemId,
                                        "type": "DT_Face",
                                        "objects": []
                                    }
                                }
                            },
                            "rules": {
                                "0": {
                                    "path": "/E:0",
                                    "action": {
                                        "timeout_ms": 60000,
                                        "cancel_conditions": {},
                                        "action": {
                                            "raise_alert": {
                                                "zone": this.form.cameraVal.file,
                                                "archive": this.form.cameraVal.archive,
                                                "offset_ms": 0,
                                                "mode": "RAM_AlwaysIfNoActiveAlert"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http({
                            method: 'post',
                            url: 'xpi/grpc',
                            headers: {
                                'Authorization': 'Basic cm9vdDpyb290',
                                'Content-Type': 'application/json'
                            },
                            data : JSON.stringify(data1)

                        }).then(async response=>{
                            console.log(response,'结果');
                            if(response.status==200){
                                this.$message.success('提交成功')
                                let data = {
                                    identification:1,
                                    controlPersonnelId:this.controlPersonnelId,
                                }
                                let [err,res] = await to(this.$api.AR.blackEdit(data))
                                if(err) return
                                console.log(res,'resresresresresres');
                                this.$emit('refreshControlList')
                                this.dialogVisible = false
                            }
                        })
                        /*this.$message.success('提交成功')
                        this.$emit('refreshAlertList')
                        this.dialogVisible = false*/

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /**获取设备列表*/
            getDeviceData() {
                this.cameraList=[]
                this.$http.get('/xpi/camera/list', {
                        auth: {
                            username: 'root',
                            password: 'root'
                        }
                    }
                ).then((response) => {
                    if (response.data) {
                        console.log(response.data.cameras, 'mzl')
                        response.data.cameras.map(item => {
                            if (item.comment !== '') {
                                if (JSON.parse(item.comment).face == 1) {
                                    console.log(item, '过滤');
                                    var list ={
                                        file: item.videoStreams[0].accessPoint,
                                        archive:item.archives[0].storage
                                    }
                                    this.cameraList.push({...item,files:list})
                                }
                            }
                        })
                        console.log(this.cameraList,'this.cameraList');
                        //this.highPointId = this.lensList[0].id

                    }
                }).then(() => {
                    //this.cameraChange(this.lensList[0])
                })

            },
        }
    }
</script>

<style scoped>

</style>
