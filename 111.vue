<template>
    <!--应急措施-->
    <div class="conBox">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item :title="item.title" :name="index" v-for="(item,index) in dataList" :key="index">
                <p v-html="item.details"></p>
                <img :src="item.picture" alt="" v-if="item.picture !=''">
            </el-collapse-item>
            <el-collapse-item title="设备突发事故处置应急预案" name="2">
                <ul>
                    <h3 class="yellow">A、 停电处置 </h3>
                    <li>1. 有停电通知的停电。</li>
                    <li>2. 接到上级或供电部门的停电通知，立即以书面的形式告知此次停电范围内受影响的师生。</li>
                    <li>3.安保领班、巡逻岗安保员立即赶赴现场，查看人员的伤亡情况，拨打120急救电话。</li>
                    <li>4.安排安保岗位维护事故现场秩序，对进入事故现场的道路、通道进行封锁，劝离围观的业主；对事故现场进行保护，禁止无关人员进入事故现场。</li>
                    <li>5.派专人至门岗接引120急救车辆。</li>
                    <li>6.监控中心对各类突发事件的现场录像资料予以保存。</li>
                    <li>7. 对此次停电可能产生影响的设施、设备进行统计，并做好处置措施。 </li>
                    <h3 class="yellow marginT10">B、 突发停电</h3>
                    <li>1. 发现或接到突发停电的报告，立即向管理处报告，并通知当值工程人员。 </li>
                    <li>2. 安保领班、巡逻岗安保员立即赶赴现场，利用看、闻、问等手段了解断电情况。 </li>
                    <li>3. 查看电梯内是否关人，如电梯内关人的立即启动电梯困人应急处置预案。  </li>
                    <li>4. 查看当事人伤势情况，并拨打120急救电话，派专人至门岗接应120急救车辆。 </li>
                    <li>5. 加强辖区内的安全巡逻，防止偷盗事件的发生。 </li>
                    <li>6. 配合工程人员查清停电原因，做好工作记录。 </li>
                    <h3 class="yellow marginT10">C、 煤气泄漏事故处置</h3>
                    <li>1. 发现煤气泄漏或接到煤气泄漏的报告，应立即向管理处及资产处报告。</li>
                    <li>2. 设法寻找漏气源，并对气味较浓的区域进行封锁，防止无关人员进入。</li>
                    <li>3. 安保领班、巡逻岗安保员、工程人员赶往事发现场。  </li>
                    <li>4. 如煤气达到一定浓度而又无法找到泄漏源的，应根据指令拨到119求援。  </li>
                    <li>5. 安排安保岗位，对区域进行警戒，直到煤气味散去。  </li>
                    <li>6. 禁止区域内使用明火或对电气设备进行操作。 </li>
                    <li>7. 封闭通往现场的通道，禁止无关人员进入现场，并对事故现场进行保护</li>
                    <li>8. 配合公安机关或安监工作人员做好调查工作。 </li>
                    <li>9. 监控中心对各类突发事件的现场录像资料予以保存</li>
                    <h3 class="yellow marginT10">D、 水淹事件处置 </h3>
                    <li>1. 发现水淹事件或接到水淹事件的报告，应立即向管理处及资产处报告。</li>
                    <li>2. 查找泄漏水源，设法进行关闭或控制。 </li>
                    <li>3. 安保领班、巡逻岗安保员、工程人员赶往事发现场。  </li>
                    <li>4. 一组对水淹现场的财物进行抢救，立即搬离现场。  </li>
                    <li>5. 二组用潜水泵或其它工具进行排水。  </li>
                    <li>6. 禁止区域内使用明火或对电气设备进行操作。 </li>
                    <li>7. 封闭通往现场的通道，禁止无关人员进入现场，并对事故现场进行保护</li>
                    <li>8. 配合公安机关或安监工作人员做好调查工作。 </li>
                    <li>9. 监控中心对各类突发事件的现场录像资料予以保存</li>
                </ul>
            </el-collapse-item>
            <el-collapse-item title="火警处置应急预案" name="3">
                <ul>
                    <h3 class="yellow">A、 处置要求 </h3>
                    <li>1. 管理处应组织人员对事件进行及时、有效的处置，控制事态的发展及影响。 </li>
                    <li>2. 参加人员全力进行火灾的扑救工作，把损失控制在最小的范围，</li>
                    <h3 class="yellow marginT10">B、 处置程序 </h3>
                    <li>1. 救援工作小组  </li>
                    <li>2. 通讯联络组 </li>
                    <li>3. 疏散引导组  </li>
                    <li>4. 安全救护组 </li>
                    <h3 class="yellow marginT10">C、 应急处置  </h3>
                    <li>1. 人员的召集 </li>
                    <li>2. 疏散</li>
                    <li>3. 灭火</li>
                    <li>4. 安全警戒</li>
                    <h3 class="yellow marginT10">D、 水淹事件处置 </h3>
                    <li>1. 发现水淹事件或接到水淹事件的报告，应立即向管理处及资产处报告。</li>
                    <li>2. 查找泄漏水源，设法进行关闭或控制。 </li>
                    <li>3. 安保领班、巡逻岗安保员、工程人员赶往事发现场。  </li>
                    <li>4. 一组对水淹现场的财物进行抢救，立即搬离现场。  </li>
                    <li>5. 二组用潜水泵或其它工具进行排水。  </li>
                    <li>6. 禁止区域内使用明火或对电气设备进行操作。 </li>
                    <li>7. 封闭通往现场的通道，禁止无关人员进入现场，并对事故现场进行保护</li>
                    <li>8. 配合公安机关或安监工作人员做好调查工作。 </li>
                    <li>9. 监控中心对各类突发事件的现场录像资料予以保存</li>
                </ul>
            </el-collapse-item>
            <el-collapse-item title="治安事件处置应急预案" name="4">
                <ul>
                    <h3 class="yellow">A、 偷盗事件处置  </h3>
                    <li>1. 发现偷盗人员或接到偷盗事件报告，人员立即向管理处、资产处报告。 </li>
                    <li>2. 有摄像机的，监控值班人员立即将现场摄像机切换至大屏幕，仔细观察现场情，及时向上级报告。</li>
                    <h3 class="yellow marginT10">B.打架斗殴处置  </h3>
                    <li>1. 发现打架、斗殴或接到打架、斗殴的事件报告，立即向资产处、管理处报告。  </li>
                    <li>2. 监控值班人员将摄像机调至打架、斗殴现场，对现场进行录像记录。  </li>
                    <li>3. 安保领班、巡逻岗安保员立即赶赴现场，对发生冲突的当事人双方进行劝阻。 </li>
                    <li>4. 造成物品损坏的应及时予以记录，对围观人员进行劝离。 </li>
                    <h3 class="yellow marginT10">C、 应急处置  </h3>
                    <li>1. 人员的召集 </li>
                    <li>2. 疏散</li>
                    <li>3. 灭火</li>
                    <li>4. 安全警戒</li>
                    <h3 class="yellow marginT10">D、 水淹事件处置 </h3>
                    <li>1. 发现水淹事件或接到水淹事件的报告，应立即向管理处及资产处报告。</li>
                    <li>2. 查找泄漏水源，设法进行关闭或控制。 </li>
                    <li>3. 安保领班、巡逻岗安保员、工程人员赶往事发现场。  </li>
                    <li>4. 一组对水淹现场的财物进行抢救，立即搬离现场。  </li>
                    <li>5. 二组用潜水泵或其它工具进行排水。  </li>
                    <li>6. 禁止区域内使用明火或对电气设备进行操作。 </li>
                    <li>7. 封闭通往现场的通道，禁止无关人员进入现场，并对事故现场进行保护</li>
                    <li>8. 配合公安机关或安监工作人员做好调查工作。 </li>
                    <li>9. 监控中心对各类突发事件的现场录像资料予以保存</li>
                </ul>
            </el-collapse-item>
            <el-collapse-item title="灾害性天气处置应急预案" name="5">
                <ul>
                    <h3 class="yellow">A、 灾害性天气的定义 灾害性是指暴风、暴雨、暴雪、冰雹、高温等恶劣性天气。 </h3>
                    <h3 class="yellow marginT10">B、 灾害性天气的防范 </h3>
                    <li>1. 收听、收集天气气象信息，提前知晓天气情况。   </li>
                    <li>2. 得知灾害性天气后，及时通报资产处，并根据灾害天气的类别提前做好预防措施。 </li>
                    <li>3. 成立抢险小组，备齐应急器材，机动待命。 </li>
                    <h3 class="yellow marginT10">C、 应急处置  </h3>
                    <li>1. 发生灾害性天气时，加强对管辖区域的安全巡视，及时发现不安全隐患。  </li>
                    <li>2. 保持通信畅通，随时做好突发事件的处置工作。 </li>
                    <li>3. 协助师生把财物转移到安全地带。 </li>
                    <li>4. 安全警戒</li>
                    <h3 class="yellow marginT10">D、 协助地方政府对人、财、物进行转移。 </h3>
                    <h3 class="yellow marginT10">E、 配合救护机构做好伤、病员的救护工作</h3>
                </ul>
            </el-collapse-item>
            <el-collapse-item title="可疑物处置应急预案" name="6">
                <ul>
                    <h3 class="yellow">A、 处理程序   </h3>
                    <li>1.发现可以物品或接到可疑物品的报告，应立即向资产处、管理处报告。</li>
                    <li>2.监控值班人员将摄像机调至事发现场，将可疑物品的特征向上级报告。</li>
                    <li>3.安保领班、巡逻岗安保员赶赴现场，维护现场秩序，用警戒绳将周边进行封闭，禁止人员向可疑物品靠近。   </li>
                    <li>4. 警方介入处置的，安保做好配合工作。  </li>
                    <li>5. 做好工作记录，监控复制现场录像进行备案。 </li>
                </ul>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
       data(){
           return{
               dataSearch:[
                   {
                       id:1,
                       name:'张立红',
                       sex:'男',
                       temperature:'36.7',
                       age:'38',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       similarity:'95',
                   },
                   {
                       id:2,
                       name:'张立红',
                       sex:'男',
                       temperature:'36.7',
                       age:'38',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       similarity:'95',
                   },
                   {
                       id:3,
                       name:'张立红',
                       sex:'男',
                       temperature:'36.7',
                       age:'38',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       similarity:'95',
                   },
                   {
                       id:4,
                       name:'张立红',
                       sex:'男',
                       temperature:'36.7',
                       age:'38',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       similarity:'95',
                   },
                   {
                       id:5,
                       name:'张立红',
                       sex:'男',
                       temperature:'36.7',
                       age:'38',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       similarity:'95',
                   }

               ],
               faceSearch:[
                   {
                       name:'张立红',
                       sex:'男',
                       temperature:'36.7',
                       age:'38',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       similarity:'95',
                   },
                   {
                       name:'张立红',
                       sex:'男',
                       temperature:'36.7',
                       age:'38',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       similarity:'95',
                   }
               ],
               chartType:[
                   {label:'折线统计',value:1,type:'line'},
                   {label:'柱状统计',value:2,type:'pie'},
                   // {label:'柱状统计',value:3},
               ],
               polygonPath: [
                   {lng: 108.886714376822, lat: 34.16769070250782},
                   {lng: 108.89032556497212, lat: 34.16778030923822},
                   {lng: 108.89030759886191, lat: 34.169975644142646},
                   {lng: 108.88879844560515, lat: 34.1702444567012},
                   {lng: 108.8867503090424, lat: 34.17021458868181},
               ],
               points: [
                   {
                       lng: 108.88799844560515,
                       lat: 34.1682444567012,
                       propVisible:false,
                       number:'2',
                       imgUrl:imgUrl,
                       url: require('../../assets/images/AR/run.png')
                   },
                   {
                       lng: 108.88730759886191,
                       lat: 34.16898564414264,
                       propVisible:false,
                       number:'5',
                       imgUrl:imgUrl,
                       url: require('../../assets/images/AR/run.png')
                   },
                   {
                       lng: 108.88800759886191,
                       lat: 34.169875644142265,
                       propVisible:false,
                       number:'3',
                       imgUrl:require('../../assets/images/link/testImg.png'),
                       url: require('../../assets/images/AR/run.png')
                   },
                   {
                       lng: 108.88909844560515,
                       lat: 34.1686444567012,
                       propVisible:false,
                       number:'1',
                       imgUrl:require('../../assets/images/link/testImg.png'),
                       url: require('../../assets/images/AR/run.png')
                   },
                   {
                       lng: 108.8889503090424,
                       lat: 34.16992458868181,
                       propVisible:false,
                       number:'4',
                       imgUrl:require('../../assets/images/link/testImg.png'),
                       url: require('../../assets/images/AR/run.png')
                   },
               ],
               infoList:[
                   {id:1,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:2,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:3,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:4,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:5,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:6,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:7,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:8,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:9,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:10,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:11,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:12,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:13,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
                   {id:14,name:'张立红',phone:'158****2546',position:'领班',type:'白班',community:'雅居乐花园'},
               ],
               patrolList:[
                   {id:1,position:'领班',user:'郭小达',startTime:'08:30',endTime:'20:30',error:'20',inspection:'正常',workDay:'周一至周五'},
                   {id:2,position:'领班',user:'郭小达',startTime:'08:30',endTime:'20:30',error:'20',inspection:'正常',workDay:'周一至周五'},
                   {id:3,position:'领班',user:'郭小达',startTime:'08:30',endTime:'20:30',error:'20',inspection:'正常',workDay:'周一至周五'},
                   {id:4,position:'领班',user:'郭小达',startTime:'08:30',endTime:'20:30',error:'20',inspection:'正常',workDay:'周一至周五'},
                   {id:5,position:'领班',user:'郭小达',startTime:'08:30',endTime:'20:30',error:'20',inspection:'正常',workDay:'周一至周五'},
                   {id:6,position:'领班',user:'郭小达',startTime:'08:30',endTime:'20:30',error:'20',inspection:'正常',workDay:'周一至周五'},
               ],
               dutyList:[
                   {id:1,place:'雅居乐花园',user:'郭亚明 135****2546',startTime:'08:00,18:00',endTime:'18:00,24:00',error:20,inspection:'无',workDay:'周一至周五'},
                   {id:2,place:'雅居乐花园',user:'郭亚明 135****2546',startTime:'08:00,18:00',endTime:'18:00,24:00',error:20,inspection:'无',workDay:'周一至周五'},
                   {id:3,place:'雅居乐花园',user:'郭亚明 135****2546',startTime:'08:00,18:00',endTime:'18:00,24:00',error:20,inspection:'无',workDay:'周一至周五'},
                   {id:4,place:'雅居乐花园',user:'郭亚明 135****2546',startTime:'08:00,18:00',endTime:'18:00,24:00',error:20,inspection:'无',workDay:'周一至周五'},
                   {id:5,place:'雅居乐花园',user:'郭亚明 135****2546',startTime:'08:00,18:00',endTime:'18:00,24:00',error:20,inspection:'无',workDay:'周一至周五'},
                   {id:6,place:'雅居乐花园',user:'郭亚明 135****2546',startTime:'08:00,18:00',endTime:'18:00,24:00',error:20,inspection:'无',workDay:'周一至周五'},
                   {id:7,place:'雅居乐花园',user:'郭亚明 135****2546',startTime:'08:00,18:00',endTime:'18:00,24:00',error:20,inspection:'无',workDay:'周一至周五'},
                   {id:8,place:'雅居乐花园',user:'郭亚明 135****2546',startTime:'08:00,18:00',endTime:'18:00,24:00',error:20,inspection:'无',workDay:'周一至周五'},
                   {id:9,place:'雅居乐花园',user:'郭亚明 135****2546',startTime:'08:00,18:00',endTime:'18:00,24:00',error:20,inspection:'无',workDay:'周一至周五'},
                   {id:10,place:'雅居乐花园',user:'郭亚明 135****2546',startTime:'08:00,18:00',endTime:'18:00,24:00',error:20,inspection:'无',workDay:'周一至周五'},
               ],
           //    车辆
               dataSearch:[
                   {
                       id:1,
                       name:'张立红',
                       carNo:'陕AM2L99',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       partPhoto:require('../../assets/images/AR/carTest.png'),
                       wholePhoto:require('../../assets/images/AR/carShow.png')
                   },
                   {
                       id:2,
                       name:'张立红',
                       carNo:'陕AM2L99',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       partPhoto:require('../../assets/images/AR/carTest.png'),
                       wholePhoto:require('../../assets/images/AR/carShow.png')
                   },
                   {
                       id:3,
                       name:'张立红',
                       carNo:'陕AM2L99',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       partPhoto:require('../../assets/images/AR/carTest.png'),
                       wholePhoto:require('../../assets/images/AR/carShow.png')
                   },
                   {
                       id:4,
                       name:'张立红',
                       carNo:'陕AM2L99',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       partPhoto:require('../../assets/images/AR/carTest.png'),
                       wholePhoto:require('../../assets/images/AR/carShow.png')
                   },
                   {
                       id:5,
                       name:'张立红',
                       carNo:'陕AM2L99',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       partPhoto:require('../../assets/images/AR/carTest.png'),
                       wholePhoto:require('../../assets/images/AR/carShow.png')
                   },{
                       id:6,
                       name:'张立红',
                       carNo:'陕AM2L99',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       partPhoto:require('../../assets/images/AR/carTest.png'),
                       wholePhoto:require('../../assets/images/AR/carShow.png')
                   },
                   {
                       id:7,
                       name:'张立红',
                       carNo:'陕AM2L99',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       partPhoto:require('../../assets/images/AR/carTest.png'),
                       wholePhoto:require('../../assets/images/AR/carShow.png')
                   },
                   {
                       id:8,
                       name:'张立红',
                       carNo:'陕AM2L99',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       partPhoto:require('../../assets/images/AR/carTest.png'),
                       wholePhoto:require('../../assets/images/AR/carShow.png')
                   },
                   {
                       id:9,
                       name:'张立红',
                       carNo:'陕AM2L99',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       partPhoto:require('../../assets/images/AR/carTest.png'),
                       wholePhoto:require('../../assets/images/AR/carShow.png')
                   },
                   {
                       id:10,
                       name:'张立红',
                       carNo:'陕AM2L99',
                       hakarName:'北门车辆出口',
                       passTime:'2020-10-12 12:22:10',
                       partPhoto:require('../../assets/images/AR/carTest.png'),
                       wholePhoto:require('../../assets/images/AR/carShow.png')
                   }

               ],

               libraryData:[
                   {
                       name:'库名称',
                       blackListNum:22,
                       errorNum:5,
                       user:'王丽丽',
                       thresholdVal:0.998,
                       level:'一级',
                       alertShare:'',
                       shareDepart:'',
                       status:'',
                       remark:'备注',

                   },{
                       name:'库名称',
                       blackListNum:22,
                       errorNum:5,
                       user:'王丽丽',
                       thresholdVal:0.998,
                       level:'一级',
                       alertShare:'',
                       shareDepart:'',
                       status:'',
                       remark:'备注',
                   },{
                       name:'库名称',
                       blackListNum:22,
                       errorNum:5,
                       user:'王丽丽',
                       thresholdVal:0.998,
                       level:'一级',
                       alertShare:'',
                       shareDepart:'',
                       status:'',
                       remark:'备注',
                   },{
                       name:'库名称',
                       blackListNum:22,
                       errorNum:5,
                       user:'王丽丽',
                       thresholdVal:0.998,
                       level:'一级',
                       alertShare:'',
                       shareDepart:'',
                       status:'',
                       remark:'备注',
                   },{
                       name:'库名称',
                       blackListNum:22,
                       errorNum:5,
                       user:'王丽丽',
                       thresholdVal:0.998,
                       level:'一级',
                       alertShare:'',
                       shareDepart:'',
                       status:'',
                       remark:'备注',
                   },{
                       name:'库名称',
                       blackListNum:22,
                       errorNum:5,
                       user:'王丽丽',
                       thresholdVal:0.998,
                       level:'一级',
                       alertShare:'',
                       shareDepart:'',
                       status:'',
                       remark:'备注',
                   },{
                       name:'库名称',
                       blackListNum:22,
                       errorNum:5,
                       user:'王丽丽',
                       thresholdVal:0.998,
                       level:'一级',
                       alertShare:'',
                       shareDepart:'',
                       status:'',
                       remark:'备注',
                   },{
                       name:'库名称',
                       blackListNum:22,
                       errorNum:5,
                       user:'王丽丽',
                       thresholdVal:0.998,
                       level:'一级',
                       alertShare:'',
                       shareDepart:'',
                       status:'',
                       remark:'备注',
                   },{
                       name:'库名称',
                       blackListNum:22,
                       errorNum:5,
                       user:'王丽丽',
                       thresholdVal:0.998,
                       level:'一级',
                       alertShare:'',
                       shareDepart:'',
                       status:'',
                       remark:'备注',
                   },{
                       name:'库名称',
                       blackListNum:22,
                       errorNum:5,
                       user:'王丽丽',
                       thresholdVal:0.998,
                       level:'一级',
                       alertShare:'',
                       shareDepart:'',
                       status:'',
                       remark:'备注',
                   }
               ],
               blackListData:[
                   {
                       photo:require('../../assets/images/AR/faceImg.png'),
                       name:'王丽丽',
                       belong:1,
                       sex:1,
                       startTime:'2020-11-15 12:00:00',
                       endTime:'2020-11-20 12:00:00',
                       status:1, //1：开 2：关
                       user:'王丽丽',
                       thresholdVal:0.998,
                       createTime:'2020-11-15 12:00:00'
                   },{
                       photo:require('../../assets/images/AR/faceImg.png'),
                       name:'王丽丽',
                       belong:1,
                       sex:1,
                       startTime:'2020-11-15 12:00:00',
                       endTime:'2020-11-20 12:00:00',
                       status:1, //1：开 2：关
                       user:'王丽丽',
                       thresholdVal:0.998,
                       createTime:'2020-11-15 12:00:00'
                   },{
                       photo:require('../../assets/images/AR/faceImg.png'),
                       name:'王丽丽',
                       belong:1,
                       sex:1,
                       startTime:'2020-11-15 12:00:00',
                       endTime:'2020-11-20 12:00:00',
                       status:1, //1：开 2：关
                       user:'王丽丽',
                       thresholdVal:0.998,
                       createTime:'2020-11-15 12:00:00'
                   },{
                       photo:require('../../assets/images/AR/faceImg.png'),
                       name:'王丽丽',
                       belong:1,
                       sex:1,
                       startTime:'2020-11-15 12:00:00',
                       endTime:'2020-11-20 12:00:00',
                       status:1, //1：开 2：关
                       user:'王丽丽',
                       thresholdVal:0.998,
                       createTime:'2020-11-15 12:00:00'
                   },{
                       photo:require('../../assets/images/AR/faceImg.png'),
                       name:'王丽丽',
                       belong:1,
                       sex:1,
                       startTime:'2020-11-15 12:00:00',
                       endTime:'2020-11-20 12:00:00',
                       status:1, //1：开 2：关
                       user:'王丽丽',
                       thresholdVal:0.998,
                       createTime:'2020-11-15 12:00:00'
                   },{
                       photo:require('../../assets/images/AR/faceImg.png'),
                       name:'王丽丽',
                       belong:1,
                       sex:1,
                       startTime:'2020-11-15 12:00:00',
                       endTime:'2020-11-20 12:00:00',
                       status:1, //1：开 2：关
                       user:'王丽丽',
                       thresholdVal:0.998,
                       createTime:'2020-11-15 12:00:00'
                   },{
                       photo:require('../../assets/images/AR/faceImg.png'),
                       name:'王丽丽',
                       belong:1,
                       sex:1,
                       startTime:'2020-11-15 12:00:00',
                       endTime:'2020-11-20 12:00:00',
                       status:1, //1：开 2：关
                       user:'王丽丽',
                       thresholdVal:0.998,
                       createTime:'2020-11-15 12:00:00'
                   },{
                       photo:require('../../assets/images/AR/faceImg.png'),
                       name:'王丽丽',
                       belong:1,
                       sex:1,
                       startTime:'2020-11-15 12:00:00',
                       endTime:'2020-11-20 12:00:00',
                       status:1, //1：开 2：关
                       user:'王丽丽',
                       thresholdVal:0.998,
                       createTime:'2020-11-15 12:00:00'
                   },{
                       photo:require('../../assets/images/AR/faceImg.png'),
                       name:'王丽丽',
                       belong:1,
                       sex:1,
                       startTime:'2020-11-15 12:00:00',
                       endTime:'2020-11-20 12:00:00',
                       status:1, //1：开 2：关
                       user:'王丽丽',
                       thresholdVal:0.998,
                       createTime:'2020-11-15 12:00:00'
                   },{
                       photo:require('../../assets/images/AR/faceImg.png'),
                       name:'王丽丽',
                       belong:1,
                       sex:1,
                       startTime:'2020-11-15 12:00:00',
                       endTime:'2020-11-20 12:00:00',
                       status:1, //1：开 2：关
                       user:'王丽丽',
                       thresholdVal:0.998,
                       createTime:'2020-11-15 12:00:00'
                   }
               ],
               tableTreeData: [
                   {
                       id: 1,
                       type: '治安案件',
                       isEdit:true,
                       children: [{
                           id: 11,
                           type: '扰乱公共秩序',
                           isEdit:true,
                       }, {
                           id: 12,
                           type: '扰乱公共安全',
                           isEdit:true,
                       }]
                   }, {
                       id: 2,
                       type: '刑事案件',
                       isEdit:true,
                       children: [{
                           id: 21,
                           type: '一般刑事案件',
                           isEdit:true,
                       }, {
                           id: 22,
                           type: '重大刑事案件',
                           isEdit:true,
                       }]
                   }],
               testdata: [
                   {
                       Id:1,
                       bbb: "紫薇城市花园",
                       groups: [
                           {
                               Id:11,
                               bbb: '高空抛物相机（1个）',
                               groups: [
                                   {
                                       Id:111,
                                       bbb: '紫薇城市花园-高空抛物相机'
                                   }
                               ]
                           },
                           {
                               Id:12,
                               bbb: '1单元1-9号楼、2单元1-8号楼（32个）',
                               groups: [
                                   {
                                       Id:121,
                                       bbb: '高空抛物相机',
                                       groups: [
                                           {
                                               Id:1211,
                                               bbb: '摄像机一'
                                           },
                                           {
                                               Id:1212,
                                               bbb: '摄像机二'
                                           },
                                           {
                                               Id:1213,
                                               bbb: '摄像机三'
                                           }
                                       ]
                                   }
                               ]
                           },
                       ]
                   },
                   {
                       Id:2,
                       bbb: '世家新城',
                       groups: [
                           {
                               Id:21,
                               bbb: '高空抛物相机（1个）',
                               groups: [
                                   {
                                       Id:211,
                                       bbb: '世家新城-高空抛物相机'
                                   },
                                   {
                                       Id:212,
                                       bbb: '世家新城-高空抛物相机'
                                   },
                                   {
                                       Id:213,
                                       bbb: '世家新城-高空抛物相机'
                                   }
                               ]
                           }
                       ]
                   }
               ],
               lensList:[
                   {id:1,name:'镜头一'},
                   {id:2,name:'镜头二'},
                   {id:3,name:'镜头三'},
                   {id:4,name:'镜头四'},
                   {id:5,name:'镜头五'},
                   {id:6,name:'镜头六'},
                   {id:7,name:'镜头七'},
                   {id:8,name:'镜头八'},
                   {id:9,name:'镜头九'},
                   {id:10,name:'镜头十'},
                   {id:11,name:'镜头十一'},
                   {id:12,name:'镜头十二'},
                   {id:13,name:'镜头十三'},
                   {id:14,name:'镜头十四'},
               ],
           }
       }
    }
</script>

<style scoped>

</style>
