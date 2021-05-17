<template>
    <el-dialog
            title="人脸识别"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :append-to-body="true"
            class="dialogBox"
            :before-close="handleClose">
       <div class="dialogCon">
           <div class="leftBox">
               <el-dropdown @command="handleCommand" style="width:100%;">
                   <el-button type="primary">
                       {{chooseType}}<i class="el-icon-arrow-down el-icon--right"></i>
                   </el-button>
                   <el-dropdown-menu slot="dropdown" style="margin-top:0px;width:258px;border-radius:0px 0px 4px 4px;">
                       <el-dropdown-item  command="a">采集</el-dropdown-item>
                       <el-dropdown-item  command="b">布控</el-dropdown-item>
                       <el-dropdown-item  command="c">数据统计</el-dropdown-item>
                   </el-dropdown-menu>
               </el-dropdown>
               <!--采集-->
               <div class="commandA" v-if="tabIndex=='a'">
                   <el-tabs v-model="collectVal" @tab-click="handleClick" :stretch="true" class="commandTabs" v-if="!trackVisible">
                       <el-tab-pane label="数据检索" name="first">
                           <el-form :model="ruleForm"  ref="ruleForm" class="demo-ruleForm">
                               <el-form-item label="" prop="sex">
                                   <el-select v-model="ruleForm.sex" placeholder="选择性别">
                                       <el-option label="男" value="0"></el-option>
                                       <el-option label="女" value="1"></el-option>
                                   </el-select>
                               </el-form-item>
                               <el-form-item label="" prop="name">
                                   <el-input v-model="ruleForm.name" placeholder="输入姓名"></el-input>
                               </el-form-item>
                               <el-form-item label="" prop="age">
                                   <el-input v-model="ruleForm.age" placeholder="输入年龄"></el-input>
                               </el-form-item>
                               <el-form-item label="" prop="mount">
                                   <el-select v-model="ruleForm.mount" placeholder="选择卡口">
                                       <el-option :label="item.cameraName" :value="item.cameraName" v-for="(item,index) in bayonetList" :key="index"></el-option>
                                   </el-select>
                               </el-form-item>
                               <!--<el-form-item label="" prop="mount">
                                   <el-select v-model="ruleForm.mask" placeholder="口罩">
                                       <el-option label="有" value="0"></el-option>
                                       <el-option label="无" value="1"></el-option>
                                   </el-select>
                               </el-form-item>
                               <el-form-item label="" prop="glass">
                                   <el-select v-model="ruleForm.glass" placeholder="眼镜">
                                       <el-option label="有" value="0"></el-option>
                                       <el-option label="无" value="1"></el-option>
                                   </el-select>
                               </el-form-item>
                               <el-form-item label="" prop="hat" class="templateItem">
                                   <el-input placeholder="输入温度" v-model="ruleForm.hat">
                                       <template slot="append">℃</template>
                                   </el-input>
                                   &lt;!&ndash;<el-select v-model="ruleForm.hat" placeholder="温度">
                                       <el-option label="高温" value="0"></el-option>
                                       <el-option label="低温" value="1"></el-option>
                                       <el-option label="正常" value="1"></el-option>
                                   </el-select>&ndash;&gt;
                               </el-form-item>-->
                               <el-form-item label="" prop="startDate">
                                   <el-date-picker
                                           v-model="ruleForm.startDate"
                                           type="datetime"
                                           style="width:100%;"
                                           value-format="yyyy-MM-dd HH:mm:ss"
                                           placeholder="开始时间">
                                   </el-date-picker>
                               </el-form-item>
                               <el-form-item label="" prop="endDate">
                                   <el-date-picker
                                           v-model="ruleForm.endDate"
                                           type="datetime"
                                           style="width:100%;"
                                           value-format="yyyy-MM-dd HH:mm:ss"
                                           placeholder="结束时间">
                                   </el-date-picker>
                               </el-form-item>
                               <el-form-item>
                                   <el-button type="primary" @click="getDataList" style="width:40%;border-radius:4px;">查询</el-button>
                                   <el-button type="primary" @click="resetForm('ruleForm')" style="width:40%;border-radius:4px;">重置</el-button>
                               </el-form-item>
                           </el-form>
                       </el-tab-pane>
                       <el-tab-pane label="人脸检索" name="second">
                           <div class="adatar">
                               <img :src="adatar?adatar:require('../../assets/images/AR/faceBg.png')" alt="" >
                               <input type="file" name="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="fileChange">
                               <div class="leftDateRange">
                                       <el-row>
                                           <el-col :span="24">
                                                   <el-date-picker
                                                           style="width:200px;"
                                                           v-model="startTime"
                                                           type="datetime"
                                                           :picker-options="pickerOptions"
                                                           value-format="yyyy-MM-dd HH:mm:ss"
                                                           format="yyyy-MM-dd HH:mm:ss"
                                                           placeholder="选择开始时间">
                                                   </el-date-picker>
                                           </el-col>
                                           <el-col :span="24">
                                               <el-date-picker
                                                       style="width:200px;"
                                                       v-model="endTime"
                                                       type="datetime"
                                                       :picker-options="pickerOptionsEnd"
                                                       value-format="yyyy-MM-dd HH:mm:ss"
                                                       format="yyyy-MM-dd HH:mm:ss"
                                                       placeholder="选择结束日期">
                                               </el-date-picker>
                                           </el-col>
                                       </el-row>
                               </div>
                               <div class="faceText">
                                   <span>相似度</span>
                                   <span>{{sliderVal*100}}%</span>
                               </div>
                               <el-slider v-model="sliderVal" :format-tooltip="formatTooltip" :min='0' :max='1' :step="0.01"></el-slider>
                           </div>
                           <el-button @click="submit" type="primary" size="small" class="searchBtn" style="width:100%;">开始检索</el-button>
                           <el-button @click="trackHandle" type="primary" size="small"  style="width:100%;margin-left:0px;margin-top:10px;" v-if="faceResultVisible==true" :disabled="faceSearch==0">轨迹分析</el-button>
                           <el-button @click="faceResultVisible=!faceResultVisible" type="primary" size="small"  style="width:100%;margin-left:0px;margin-top:10px;" v-else>返回检索</el-button>
                          <!-- <el-button class="buttonStyle" @click="trackHandle(item)">轨迹分析</el-button>-->
                       </el-tab-pane>
                   </el-tabs>
                   <div v-if="trackVisible"  style="width:90%;margin:20px auto 0px auto">
                       <el-form :model="ruleForm"  ref="ruleForm" class="demo-ruleForm">
                           <el-form-item label="" prop="name">
                               <el-input v-model="ruleForm.name" placeholder="输入姓名"></el-input>
                           </el-form-item>
                           <el-form-item label="" prop="age">
                               <el-input v-model="ruleForm.age" placeholder="输入年龄"></el-input>
                           </el-form-item>
                           <el-form-item label="" prop="desc">
                               <el-date-picker
                                       v-model="ruleForm.startDate"
                                       type="date"
                                       value-format="yyyy-MM-dd HH:mm:ss"
                                       style="width:100%;"
                                       placeholder="开始时间">
                               </el-date-picker>
                           </el-form-item>
                           <el-form-item label="" prop="desc">
                               <el-date-picker
                                       v-model="ruleForm.endDate"
                                       type="date"
                                       value-format="yyyy-MM-dd HH:mm:ss"
                                       style="width:100%;"
                                       placeholder="结束时间">
                               </el-date-picker>
                           </el-form-item>
                           <el-form-item>
                               <el-button type="primary" @click="submitForm('ruleForm')" style="width:45%;border-radius:4px;float:left;">查询</el-button>
                               <el-button type="delete" @click="trackVisible=false" style="width:45%;">返回</el-button>
                           </el-form-item>
                       </el-form>
                   </div>
               </div>
               <!--布控-->
               <div class="commandB" v-if="tabIndex=='b'">
                   <el-menu
                           default-active="1"
                           class="el-menu-vertical-demo"
                           @select="menuChoose"
                           active-text-color="#fff">
                       <el-menu-item index="1" :class="menuActiveKey=='1'?'active':''">
                           <span slot="title">告警管理</span>
                       </el-menu-item>
                       <el-submenu index="2">
                           <template slot="title">
                               <span>黑名单库</span>
                           </template>
                           <el-menu-item-group>
                               <el-menu-item index="2-1" :class="menuActiveKey=='2-1'?'active':''">我的布控库</el-menu-item>
                               <el-menu-item index="2-2" :class="menuActiveKey=='2-2'?'active':''">公共布控库</el-menu-item>
                           </el-menu-item-group>
                       </el-submenu>
                   </el-menu>
                   <div class="alertNumber">
                       <div class="color1 font16">今日抓拍：<span class="font24 color2">{{captureCout}}</span> 张</div>
                       <div class="color1 font16 marginT10">今日告警：<span class="font24 red">{{alarmCout}}</span> 张</div>
                   </div>
               </div>
               <!--数据统计-->
               <div class="commandC" v-if="tabIndex=='c'">
                   <div class="menuDiv">数据统计</div>
               </div>
           </div>
           <div class="rightBox"  v-loading="loading">
               <div v-if="tabIndex=='a'">
                   <div v-if="collectVal=='first'">
                       <div  v-if="!trackVisible">
                           <div   class="publicScroll">
                               <div   v-for="(item,index) in dataSearch" :key="index" class="el-row-flex borderBottom padding10" style="height:auto">
                                   <div class="photoBox" @click="imgClickHandle(item,'faceSB')">
                                       <canvas :id="'imgId'+index" width="120" height="100"></canvas>
                                   </div>
                                   <div class="photoInfo">
                                       <el-form  label-width="80px">
                                           <el-row>
                                               <el-col :span="10" class="textLeft">
                                                   <el-form-item label="姓名">：{{item.name}}</el-form-item>
                                               </el-col>
                                               <el-col :span="10" class="textLeft">
                                                   <el-form-item label="性别">：{{item.gender}}</el-form-item>
                                               </el-col>
                                           </el-row>
                                           <el-row >
                                               <el-col :span="10" class="textLeft">
<!--                                                   <el-form-item label="温度">：{{item.temperature}}℃</el-form-item>-->
                                                   <el-form-item label="温度">：36.2℃</el-form-item>
                                               </el-col>
                                               <el-col :span="10" class="textLeft">
                                                   <el-form-item label="年龄">：{{item.age}}</el-form-item>
                                               </el-col>
                                           </el-row>
                                           <el-row>
                                               <el-col :span="10" class="textLeft">
                                                   <el-form-item label="卡口名称">：{{item.cameraName}}</el-form-item>
                                               </el-col>
                                               <el-col :span="10" class="textLeft">
                                                   <el-form-item label="通卡时间">：{{item.createTime}}</el-form-item>
                                               </el-col>
                                           </el-row>
                                           <!--<el-row>
                                               <el-col :span="10" class="textLeft">
                                                   <el-form-item label="相似度">：{{item.similarity}}%</el-form-item>
                                               </el-col>
                                           </el-row>-->
                                       </el-form>
                                   </div>
                               </div>
                           </div>
                           <div class="paginationBox">
                               <el-pagination
                                       @size-change="sizeChangeHandle"
                                       @current-change="currentChangeHandle"
                                       :current-page="pageIndex"
                                       :page-sizes="[10, 20, 50, 100]"
                                       :page-size="pageSize"
                                       :total="totalPage"
                                       layout="total, prev, pager, next,sizes">
                               </el-pagination>
                           </div>
                       </div>

                       <!--轨迹分析-->
                      <!-- <div v-if="trackVisible">
                           <baidu-map class="bm-view" :center="center" :zoom='zoom' :scroll-wheel-zoom='true' @ready="handler">
                               <bml-marker-clusterer :averageCenter="false">
                                   <div v-for="(marker, i) of points" :key="i">
                                       <bm-marker
                                               :dragging="true"
                                               :icon="{url: marker.url, size: { width: 42, height: 42 }}"
                                               :position="{lng: marker.lng, lat: marker.lat}"
                                               @click="infoWindowOpen(marker)">
                                       </bm-marker>
                                       <bm-label :content="marker.number" :position="{lng: marker.lng, lat: marker.lat}" :labelStyle="labelStyle" />
                                   </div>
                               </bml-marker-clusterer>

                           </baidu-map>

                       </div>-->
                   </div>
                   <div v-if="collectVal=='second'" >
                       <!--人脸检索展示-->
                       <div v-if="faceResultVisible">
                           <el-row :gutter="20" class="marginT10">
                               <div class="publicScroll" style="height:calc(850px - 200px);">
                                   <el-col :span="12"  v-for="(item,index) in currentPageData" :key="index"  class="el-row-flex borderBottom padding10" style="height:auto;">
                                       <div class="photoBox" @click="imgClickHandle(item,'faceSearch')"><img :src="beforeUrl + item.imageUrl" alt=""></div>
                                       <div class="photoInfo">
                                           <el-form  label-width="78px">
                                               <el-row>
                                                   <el-col :span="24" class="textLeft">
                                                       <el-form-item label="卡口名称">：{{item.name}}</el-form-item>
                                                   </el-col>
                                                   <el-col :span="24" class="textLeft marginT10">
                                                       <el-form-item label="通卡时间">：{{item.time}}</el-form-item>
                                                   </el-col>
                                                   <el-col :span="24" class="textLeft marginT10">
                                                       <el-form-item label="相似度">：{{item.accuracy}}</el-form-item>
                                                   </el-col>
                                               </el-row>
                                           </el-form>
                                       </div>
                                       <!-- <div class="trackBtn">
                                            <el-button class="buttonStyle" size="mini">轨迹分析</el-button>
                                        </div>-->
                                   </el-col>
                               </div>
                               <div class="paginationBox" style="padding-right:20px;">
                                   <el-button @click="prevPage()" type="delete" size="mini">
                                       上一页
                                   </el-button>
                                   <span style="color:#16ECF0;padding:0px 10px;">第 <b class="yellow">{{currentPage}}</b> 页/共 <b class="yellow">{{totalPage5}}</b> 页</span>
                                   <el-button @click="nextPage()" type="delete" size="mini">
                                       下一页
                                   </el-button>
                               </div>
                           </el-row>
                       </div>
                       <div v-else>
                           <baidu-map class="bm-view" :center="center" :zoom='zoom' :scroll-wheel-zoom='true' @ready="handler">
                               <bml-marker-clusterer :averageCenter="false">
                                   <div v-for="(marker, i) of faceCameraList" :key="i">
                                       <bm-marker
                                               :dragging="true"
                                               :icon="{url:Ball, size: { width: 30, height: 40 }}"
                                               :position="{lng: marker.lng, lat: marker.lat}"
                                               @click="infoWindowOpen(marker)">
                                       </bm-marker>
                                       <bm-label :content="marker.text" :position="{lng: marker.lng, lat: marker.lat}" :labelStyle="labelStyle1" />
                                       <bm-label :content="marker.list.length" :position="{lng: marker.lng, lat: marker.lat}" :labelStyle="labelStyle" />
                                   </div>
                               </bml-marker-clusterer>

                           </baidu-map>
                       </div>
                   </div>
               </div>
               <div class="commandRightB" v-if="tabIndex=='b'">
                   <div v-if="menuActiveKey=='1'" class="alertDiv">
                       <div  class="alertTableBox">
                           <!--告警管理-->
                           <el-table
                                   ref="filterTable"
                                   :data="tableData"
                                   max-height="650"
                                   :highlight-current-row="true"
                                   @selection-change="selectionChangeHandle"
                                   style="width: 100%;overflow-x: auto">
                               <el-table-column
                                       type="selection"
                                       width="55">
                               </el-table-column>
                               <el-table-column
                                       prop="photo"
                                       label="照片"
                                       width="150">
                                   <template slot-scope="scope">
                                       <div class="photoBox">
                                           <canvas :id="'faceId'+scope.$index" width="120" height="100"></canvas>
                                       </div>

                                   </template>
                               </el-table-column>
                               <!--<el-table-column
                                       prop="alertType"
                                       label="告警类型"
                                       header-align="center"
                                       align="center"
                                       :filters="[{ text: '在逃人员', value: '1' }, { text: '疑似在逃人员', value: '2' }]"
                                       :filter-method="filterType"
                                       filter-placement="bottom-end"
                                       width="130">
                                   <template slot-scope="scope">
                                       <span v-if="scope.row.alertType ==1">在逃人员</span>
                                       <span v-if="scope.row.alertType ==2">疑似在逃人员</span>
                                   </template>
                               </el-table-column>-->
                               <el-table-column
                                       prop="cameraName"
                                       label="设备名称"
                                       header-align="center"
                                       align="center"
                                       :filters="cameraTableList"
                                       :filter-method="filterDevice"
                                       filter-placement="bottom-end"
                                       >
                                  <!-- <template slot-scope="scope">
                                       <span v-if="scope.row.deviceName ==1">摄像头一</span>
                                       <span v-if="scope.row.deviceName ==2">摄像头二</span>
                                       <span v-if="scope.row.deviceName ==3">摄像头三</span>
                                       <span v-if="scope.row.deviceName ==4">摄像头四</span>
                                   </template>-->
                               </el-table-column>
                               <el-table-column
                                       prop="createTime"
                                       label="发生时间"
                                       sortable
                                       header-align="center"
                                       align="center"
                                       :show-overflow-tooltip="true"
                                       column-key="date"
                                       width="200"
                               >

                               </el-table-column>

                               <el-table-column
                                       prop="status"
                                       label="处理状态"
                                       header-align="center"
                                       align="center"
                                       width="120"
                               >
                                   <template slot-scope="scope">
                                       <span v-if="scope.row.status==1">真警告</span>
                                       <span v-if="scope.row.status==0" class="yellow">未处理</span>
                                       <span v-if="scope.row.status==2" class="yellow">假警告</span>
                                       <span v-if="scope.row.status==3" class="yellow">未定义</span>
                                   </template>
                               </el-table-column>
                               <el-table-column
                                       prop=""
                                       header-align="center"
                                       align="center"
                                       width="100"
                                       label="操作">
                                   <template slot-scope="scope">
                                       <el-row v-if="scope.row.status==0">
                                           <el-col :span="24"><el-button class="buttonStyle" size="mini" @click="trueAlert(scope.row)">真告警</el-button></el-col>
                                           <el-col :span="24" class=" margin5"><el-button class="buttonStyle" size="mini" @click="falseAlert(scope.row)">假告警</el-button></el-col>
                                           <el-col :span="24"><el-button class="buttonStyle" size="mini" @click="undefinedHandle(scope.row)">未定义</el-button></el-col>
                                       </el-row>
                                       <el-row v-else>
                                           <el-col :span="24"><span class="font16">{{scope.row.updateBy}}</span></el-col>
                                           <el-col :span="24" class="marginT10"><el-button class="buttonStyle" size="mini" @click="alertDetail">详情</el-button></el-col>
                                       </el-row>
                                   </template>
                               </el-table-column>
                           </el-table>
                           <div class="paginationBox">
                               <el-pagination
                                       @size-change="sizeChangeHandle4"
                                       @current-change="currentChangeHandle4"
                                       :current-page="pageIndex4"
                                       :page-sizes="[10, 20, 50, 100]"
                                       :page-size="pageSize4"
                                       :total="totalPage4"
                                       layout="total, prev, pager, next,sizes">
                               </el-pagination>
                           </div>
                       </div>
                       <div  class="bottomOperrate" style="width:100%;">
                           <el-button class="buttonStyle marginT10" size="small" @click="trueAlert" :disabled="dataListSelections.length <= 0">批量真告警</el-button>
                           <el-button class="buttonStyle marginT10" size="small" @click="falseAlert" :disabled="dataListSelections.length <= 0">批量假告警</el-button>
                           <el-button class="buttonStyle marginT10" size="small" @click="undefinedHandle" :disabled="dataListSelections.length <= 0">批量未定义</el-button>
                       </div>

                   </div>
                   <div v-if="menuActiveKey=='2-1'">
                       <div class="searchDiv">
                           <el-row :gutter="20">
                               <el-col :span="6" v-if="myLibraryVal=='myLibraryA'"><el-button size="small" type="primary" icon="el-icon-plus" @click="addLibraryHandle" style="width:110px;">新增库</el-button></el-col>
                               <el-col :span="6" v-if="myLibraryVal=='myLibraryC'"><el-button size="small" type="primary" icon="el-icon-plus" @click="addTypeHandle" style="width:110px;">新增类型</el-button></el-col>
                               <el-col :span="6" v-if="myLibraryVal=='myLibraryB'"><el-button size="small" type="primary" icon="el-icon-plus" @click="addBkHandle(undefined,true)" style="width:110px;">新增黑名单</el-button></el-col>
                               <el-col :span="18" v-if="myLibraryVal=='myLibraryA'">
                                   <el-input v-model="searchValA" placeholder="请输入底库名称" size="small" style="width:180px;margin-left:10px;">
                                        <i slot="suffix" class="el-input__icon el-icon-search" @click="searchHandleKu"></i>
                                   </el-input>
                                   <el-button type="delete" @click="resetKuForm" size="small"style="margin-left:10px;">重置</el-button>
                               </el-col>
                               <el-col :span="18" v-if="myLibraryVal=='myLibraryC'">
                                   <el-input v-model="searchValC" placeholder="请输入布控类型" size="small" style="width:180px;margin-left:10px;">
                                       <i slot="suffix" class="el-input__icon el-icon-search" @click="searchHandleType"></i>
                                   </el-input>
                                   <el-button type="delete" @click="resetTypeForm" size="small" style="margin-left:10px;">重置</el-button>
                               </el-col>
                               <el-col :span="18" v-if="myLibraryVal=='myLibraryB'">
                                   <el-input v-model="searchValB" placeholder="姓名" size="small"   style="width:180px;margin-left:20px;">
                                   <i slot="suffix" class="el-input__icon el-icon-search" @click="searchHandleBlack"></i>
                               </el-input>
                                   <el-button type="delete" @click="resetBlackForm" size="small" style="margin-left:10px;">重置</el-button>
                               </el-col>
                           </el-row>
                       </div>
                       <el-tabs v-model="myLibraryVal" @tab-click="myLibraryhClick">
                           <el-tab-pane label="库管理" name="myLibraryA">
                               <div class="libraryBox">
                                   <el-table
                                           ref="filterTable"
                                           max-height="600"
                                           :data="libraryData"
                                           :highlight-current-row="true"
                                           @selection-change="handleSelectionChange"
                                           style="width: 100%;overflow-x: auto;">
                                       <el-table-column
                                               type="selection"
                                               width="55">
                                       </el-table-column>
                                       <el-table-column
                                               prop="libraryName"
                                               fixed
                                               label="底库名称"
                                               width="150">
                                       </el-table-column>
                                       <el-table-column
                                               prop="cout"
                                               label="黑名单数量"
                                               header-align="center"
                                               align="center"
                                               width="130">
                                       </el-table-column>
                                       <el-table-column
                                               prop="createBy"
                                               label="创建人员"
                                               width="120"
                                               header-align="center"
                                               align="center" >
                                       </el-table-column>
                                       <el-table-column
                                               prop="category"
                                               label="布控级别"
                                               width="120"
                                               header-align="center"
                                               align="center" >
                                       </el-table-column>
                                       <el-table-column
                                               prop="remark"
                                               label="备注"
                                               header-align="center"
                                               align="center" >
                                       </el-table-column>
                                       <el-table-column
                                               prop=""
                                               header-align="center"
                                               align="center"
                                               width="120"
                                               fixed="right"
                                               label="操作">
                                           <template slot-scope="scope">
                                               <el-row>
                                                   <el-col :span="24"><el-button class="buttonStyle textCenter" size="mini" @click="editKu(scope.row,false)">修改</el-button></el-col>
                                                   <el-col :span="24"><el-button class="buttonStyle textCenter" size="mini" @click="editKu(scope.row,true)">查看</el-button></el-col>
                                                   <el-col :span="24" class=" margin5"><el-button class="buttonStyle" size="mini" @click="deleteKu(scope.row)">删除</el-button></el-col>
                                               </el-row>
                                           </template>
                                       </el-table-column>
                                   </el-table>
                               </div>
                               <div class="bottomCon">
                                   <div>
                                       <el-button class="buttonStyle marginT10" size="small">批量布控</el-button>
                                   </div>
                                   <div>
                                       <el-pagination
                                               @size-change="sizeChangeHandle1"
                                               @current-change="currentChangeHandle1"
                                               :current-page="pageIndex1"
                                               :page-sizes="[10, 20, 50, 100]"
                                               :page-size="pageSize1"
                                               :total="totalPage1"
                                               layout="total, prev, pager, next,sizes">
                                       </el-pagination>
                                   </div>

                               </div>
                           </el-tab-pane>
                           <el-tab-pane label="黑名单管理" name="myLibraryB">
                               <div class="libraryBox">
                                   <el-table
                                           ref="filterTable"
                                           max-height="600"
                                           :data="blackListData"
                                           :highlight-current-row="true"
                                           :cell-class-name="tableRowClassName"
                                           @selection-change="handleSelectionChangeBlack"
                                           style="width: 100%;overflow-x: auto;">
                                       <el-table-column
                                               type="selection"
                                               width="55">
                                       </el-table-column>
                                       <el-table-column
                                               prop="picture"
                                               fixed
                                               label="入库照片"
                                               width="130">
                                           <template slot-scope="scope">
                                               <img :src="scope.row.picture" alt="" class="blackImg">
                                           </template>
                                       </el-table-column>
                                       <el-table-column
                                               prop="name"
                                               fixed
                                               header-align="center"
                                               align="center"
                                               label="姓名"
                                               width="100">
                                       </el-table-column>
                                       <el-table-column
                                               prop="libraryName"
                                               label="所属布控库"
                                               header-align="center"
                                               align="center"
                                               width="130">
                                       </el-table-column>
                                       <el-table-column
                                               prop="sex"
                                               label="性别"
                                               width="80"
                                               header-align="center"
                                               align="center" >
                                           <template slot-scope="scope">
                                               <span v-if="scope.row.sex==1">男</span>
                                               <span v-if="scope.row.sex==2">女</span>
                                           </template>
                                       </el-table-column>
                                       <el-table-column
                                               prop="startTime"
                                               label="开始时间"
                                               width="100"
                                               header-align="center"
                                               align="center" >
                                       </el-table-column>
                                       <el-table-column
                                               prop="endsTime"
                                               label="结束时间"
                                               width="100"
                                               header-align="center"
                                               align="center" >
                                       </el-table-column>
                                       <el-table-column
                                               prop="identification"
                                               label="布控状态"
                                               width="120"
                                               header-align="center"
                                               align="center" >
                                           <template slot-scope="scope">
                                               <span v-if="scope.row.identification==0" class="yellow">停止布控</span>
                                               <span v-if="scope.row.identification==1" >开始布控</span>
                                           </template>
                                       </el-table-column>
                                       <el-table-column
                                               prop="createBy"
                                               label="创建人员"
                                               width="120"
                                               header-align="center"
                                               align="center" >
                                       </el-table-column>
                                       <el-table-column
                                               prop="threshold"
                                               label="布控阀值"
                                               width="120"
                                               header-align="center"
                                               align="center" >
                                       </el-table-column>
                                       <el-table-column
                                               prop="createTime"
                                               label="创建时间"
                                               width="120"
                                               header-align="center"
                                               align="center" >
                                       </el-table-column>
                                       <el-table-column
                                               prop=""
                                               header-align="center"
                                               align="center"
                                               width="120"
                                               fixed="right"
                                               label="操作">
                                           <template slot-scope="scope">
                                               <el-row>
                                                   <el-col :span="24"><el-button style="width:80px" class="buttonStyle textCenter" size="mini" @click="checkBkHandle(scope.row.controlPersonnelId,false)">查看</el-button></el-col>
                                                   <el-col :span="24"><el-button style="width:80px" class="buttonStyle textCenter" size="mini" @click="checkBkHandle(scope.row.controlPersonnelId,true)">修改</el-button></el-col>
                                                   <el-col :span="24"><el-button style="width:80px" class="buttonStyle textCenter" size="mini" @click="deleteLibrary(scope.row.controlPersonnelId)">删除</el-button></el-col>
                                                   <el-col :span="24" class=" margin5"><el-button class="buttonStyle" size="mini" v-if="scope.row.identification==1" @click="stopControl">停止布控</el-button></el-col>
                                                   <el-col :span="24" class=" margin5"><el-button class="buttonStyle" size="mini" v-if="scope.row.identification==0" @click="startControl(scope.row.id,scope.row.controlPersonnelId)">开始布控</el-button></el-col>
                                               </el-row>
                                           </template>
                                       </el-table-column>
                                   </el-table>
                               </div>
                               <div class="bottomCon">
                                   <div>
<!--                                       <el-button class="buttonStyle marginT10" size="small" @click.stop="deleteLibrary">批量删除</el-button>-->
                                   </div>
                                   <div>
                                       <el-pagination
                                               @size-change="sizeChangeHandle2"
                                               @current-change="currentChangeHandle2"
                                               :current-page="pageIndex2"
                                               :page-sizes="[10, 20, 50, 100]"
                                               :page-size="pageSize2"
                                               :total="totalPage2"
                                               layout="total, prev, pager, next,sizes">
                                       </el-pagination>
                                   </div>

                               </div>
                           </el-tab-pane>
                           <el-tab-pane label="布控类型" name="myLibraryC">
                               <div class="bkTypeDiv">
                                   <el-table
                                           :data="tableTreeData"
                                           style="width: 100%;margin-bottom: 20px;"
                                           row-key="typeId"
                                           default-expand-all
                                           :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                                       <el-table-column
                                               prop="dictName"
                                               label="布控类型"
                                       >
                                           <template slot-scope="scope">
                                               <template v-if="!scope.row.isEdit">
                                                   <el-input
                                                           size="mini"
                                                           v-model="scope.row.dictName"
                                                           placeholder="请输入布控类型"
                                                   ></el-input>
                                               </template>
                                               <template v-else>{{ scope.row.dictName }}</template>
                                           </template>
                                       </el-table-column>
                                       <el-table-column
                                               prop=""
                                               header-align="center"
                                               align="right"
                                               width="240"
                                               label="">
                                           <template slot-scope="scope">
                                               <el-button type="primary" size="mini" v-if="scope.row.children"  @click="goAddContact(scope.row)">新增</el-button>
                                               <el-button type="edit" size="mini" v-if="scope.row.isEdit" @click="goEdit(scope.row)">编辑</el-button>
                                               <el-button type="save" size="mini" v-if="!scope.row.isEdit" @click="isSave(scope.row)">保存</el-button>
                                               <el-button type="delete" size="mini" v-if="!scope.row.children" @click="deleteRow(scope.row)">删除</el-button>
                                           </template>
                                       </el-table-column>
                                   </el-table>
                               </div>
                           </el-tab-pane>
                       </el-tabs>
                   </div>
                   <div v-if="menuActiveKey=='2-2'">
                       公共布控库
                   </div>
               </div>
               <div class="commandRightC" v-if="tabIndex=='c'">
                   <div class="flex-end margin10">
                       <el-select v-model="chartTypeVal" placeholder="请选择" @change="chartTypeChange" style="width:15%;">
                           <el-option
                                   v-for="item in chartType"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                           </el-option>
                       </el-select>
                   </div>
                   <div id="chartShowBox" class="chartBox"></div>
               </div>
           </div>

       </div>
        <!--新增类型-->
        <add-type v-if="addTypeVisible" ref="addType" @refreshDataList="getBkType"></add-type>
        <!--未定义弹层-->
        <undefined v-if="undefinedVisible" ref="undefined" @refreshAlertList="getFaceAlertData"></undefined>
        <!--详情-->
        <detail v-if="detailVisible" ref="detail"></detail>
        <!--新增布控-->
        <add-bk v-if="addBkVisible" ref="addBk" @refreshDataList="getBlackData"></add-bk>
        <!--查看修改黑名单布控-->
        <edit-bk v-if="editBkVisible" ref="editBk"  @refreshDataList="getBlackData"></edit-bk>
        <!--新增库-->
        <add-k v-if="addKVisible" ref="addK" @refreshDataList="getKuData"></add-k>
        <!--编辑库-->
        <edit-k v-if="editKVisible" ref="editK" @refreshDataList="getKuData"></edit-k>
        <!--人脸截图-->
        <face-crop v-if="faceCropVisible" ref="faceCrop"></face-crop>
        <!--开始布控-->
        <control-page v-if="controlPageVisible" ref="controlPage" @refreshControlList="getBlackData"></control-page>
    </el-dialog>
</template>

<script>
    import ControlPage from './controlPage'
    import axios from 'axios'
    import to from "await-to-js";
    // 按需引入点聚合
    import {BmlMarkerClusterer} from 'vue-baidu-map-v3'
    // 引入marker
    import BmMarker from 'vue-baidu-map-v3/components/overlays/Marker'
    import Undefined from './undefined'
    import Detail from './detail'
    import AddBk from './bkPage'
    import AddK from './addK'
    import EditK from './editK'
    import FaceCrop from './faceCrop'
    import EditBk from './editPage'   //查看修改黑名单
    import AddType from './addType'   //查看修改黑名单
    import faceImgShow from '../../assets/images/AR/faceImg.png'
    import {resizeImage,dataURLtoBlob,formatTime,utc2beijing,changeTime,msToDate} from '../../utils/util'
    import Ball from '../../assets/images/AR/ball.png'
    export default {
        data(){
            return{
                Ball,
                faceResultVisible:true,   //人脸搜索结果
                alarmCout:'',
                captureCout:'',
                pickerOptions:{},
                pickerOptionsEnd:{},
                loading:false,
                locationVal:'', //人脸搜索拼接字段
                faceImgShow,
                beforeUrl:'',
                startTime:'',
                endTime:'',
                endDateTime:'',
                typePid:'',
                deviceUrl:'',
                deptId:'',
                editKVisible:false,//编辑库
                faceCropVisible:false,
                /*轨迹分析*/
                labelStyle:{
                    width:'20px',
                    height:'20px',
                    borderRadius:'50%',
                    backgroundColor:'red',
                    color:'#fff',
                    textAlign:'center',
                    lineHeight:'20px',
                    fontSize:'12px',
                    marginTop:'-24px'
                },
                labelStyle1:{
                    width:'auto',
                    height:'20px',
                    borderRadius:'4px',
                    backgroundColor:'unset',
                    border:'0',
                    color:'#FFDB44',
                    textAlign:'center',
                    lineHeight:'20px',
                    fontSize:'14px',
                    marginTop:'20px',
                    marginLeft:'-10px'
                },
                center: {
                    lng: 0,
                    lat: 0
                },
                zoom: 18,
                polygonPath: [
                    {lng: 108.886714376822, lat: 34.16769070250782},
                    {lng: 108.89032556497212, lat: 34.16778030923822},
                    {lng: 108.89030759886191, lat: 34.169975644142646},
                    {lng: 108.88879844560515, lat: 34.1702444567012},
                    {lng: 108.8867503090424, lat: 34.17021458868181},
                ],
                points:[],
                bayonetList:[], //卡口名称
                /*其他*/
                dialogVisible:false,
                chooseType:'采集',
                tabIndex:'a',
                collectVal:'first',  //数据采集默认字段取值
                ruleForm:{
                    sex:'',
                    name:'',
                    age:'',
                    mount:'',
                    mask:'',
                    glass:'',
                    hat:'',
                    startDate:'',
                    endDate:'',
                },
                imageUrl: '',   //人脸照片
                dialogImageUrl: '',
                imgDialogVisible: true,
                adatar: '',
                sliderVal:0.9,
                dataSearch:[],
                faceSearch:[],
                chartType:[
                    {label:'折线统计',value:1,type:'line'},
                    {label:'柱状统计',value:2,type:'pie'},
                    // {label:'柱状统计',value:3},
                ],
                chartTypeVal:1,
                chartShowBox:null,
                /*布控*/
                menuActiveKey:"1",
                tableData: [],
                multipleSelection: [],
                blackOptions: [],
                cameraTableList:[],
                faceCameraList:[],
                undefinedVisible:false,
                detailVisible:false,
                controlPageVisible:false,
                myLibraryVal:'myLibraryA',
                searchValA:'',
                searchValC:'',
                searchValB:'',
                libraryData:[],
                blackListData:[],
                tableTreeData: [],
                addBkVisible:false,
                editBkVisible:false,
                addKVisible:false,
                trackVisible:false,
                dataName:[], //数据统计XName
                dataValList:[], //数据统计
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                pageIndex1: 1,
                pageSize1: 10,
                totalPage1: 0,
                pageIndex2: 1,
                pageSize2: 10,
                totalPage2: 0,
                pageIndex4: 1,
                pageSize4: 10,
                totalPage4: 0,
                dataListSelections:[],
                addTypeVisible:false,
                serverName:'',  //服务名称

                totalPage5: 1, // 统共页数，默认为1
                currentPage: 1, //当前页数 ，默认为1
                pageSize5: 10, // 每页显示数量
                currentPageData: [] //当前页显示内容
            }
        },
        activated () {
            // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
            if (this.chartShowBox) {
                this.chartShowBox.resize()
            }
        },
        components:{
            Undefined,
            Detail,
            AddBk,
            AddK,
            EditK,
            BmlMarkerClusterer,
            BmMarker,
            FaceCrop,
            EditBk,
            AddType,
            ControlPage
        },
        created(){
            this.beforeUrl = 'http://'+this.$global.deviceUrl+'/archive/media/';
            this.getBkType()
            this.initDeviceData()
            this.deviceUrl = this.$global.deviceUrl
            this.handleCommand('a')
            this.tabIndex = 'a'
            this.getServerName()

        },
        methods: {
            setCurrentPageData() {
                let begin = (this.currentPage - 1) * this.pageSize5;
                let end = this.currentPage * this.pageSize5;
                this.currentPageData = this.faceSearch.slice(
                        begin,
                        end
                );
            },
            //上一页
            prevPage() {
                console.log(this.currentPage);
                if (this.currentPage == 1) return;

                this.currentPage--;
                this.setCurrentPageData();

            },
            // 下一页
            nextPage() {
                console.log(this.totalPage5,'this.totalPage5')
                if (this.currentPage == this.totalPage5)return ;

                this.currentPage++;
                this.setCurrentPageData();

            },
            init(id) {
                this.dialogVisible = true;
                this.deptId = id
                this.collectVal = 'first'
                this.$nextTick(()=>{
                    this.getDataList()
                    this.getBayonet()
                    this.getChartData()
                })
            },
            /*预警抓拍数量查询*/
            async getCount(){
                let data={
                    deptId:this.deptId
                }
                let [err, res] = await to(this.$api.AR.faceCount(data));
                if (err) return;
                console.log(res,'预警抓拍数量查询');
                this.alarmCout = res.data.data.alarmCout;
                this.captureCout = res.data.data.captureCout;
            },
            /*人脸检索时间限制*/
            getDateRange(){

                this.$http.get('/xpi/archive/statistics/depth/'+this.faceCameraList[0].video).then(res=>{
                    console.log(res.data.start,res.data.end,'ddddddddd');
                    var startTime = changeTime(res.data.start)
                    var endTime = changeTime(res.data.end)
                    var newStartTime = Date.parse(startTime.replace(/-/g,"/"))
                    var newEndTime = Date.parse(endTime.replace(/-/g,"/"))
                    this.pickerOptions= {
                        disabledDate(date){return date.getTime()<newStartTime}
                    }
                    this.pickerOptionsEnd= {
                        disabledDate(date){ return date.getTime()>newEndTime }
                    }
                })
            },
            /*格式化相似度*/
            formatTooltip(val) {
                return val*100;
            },
            tableRowClassName({row,column, rowIndex,columnIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            // 多选
            selectionChangeHandle (val) {
                this.dataListSelections = val.map(item => item.id)
            },
            //获取设备数据
            initDeviceData(){
                this.cameraTableList=[]
                this.faceSearch = []
                this.faceCameraList=[]
                //var url = 'http://'+this.$global.userName+':'+this.$global.passWord+'@'+this.$global.deviceUrl+'/video-origins';
                axios.get('/xpi/camera/list',{
                        auth: {
                            username: 'root',
                            password: 'root'
                        }
                    }
                ).then((response) => {
                    if (response.data) {
                        console.log(response.data.cameras,'response.data.cameras毛');
                        response.data.cameras.map(item=>{
                            if(item.comment!==''){
                                if(JSON.parse(item.comment).type==3){
                                    this.cameraTableList.push(Object.assign(
                                        {
                                            value:item.displayId,
                                            text:item.displayName,
                                            propVisible:false,
                                            lng: item.longitude,
                                            lat: item.latitude,
                                            url: require('../../assets/images/AR/height_bottom.png'),
                                            video:item.videoStreams[0].accessPoint.slice(6)
                                        }
                                    ))
                                }
                                if(JSON.parse(item.comment).face==1){
                                    this.faceCameraList.push(Object.assign(
                                        {
                                            list:[],
                                            value:item.displayId,
                                            text:item.displayName,
                                            propVisible:false,
                                            lng: item.longitude,
                                            lat: item.latitude,
                                            url: require('../../assets/images/AR/height_bottom.png'),
                                            video:item.videoStreams[0].accessPoint.slice(6)
                                        }
                                    ))
                                }
                            }
                        })
                        console.log(this.faceCameraList,'this.wwowowowoowow');
                    }
                })
            },
            //库名称搜索
            searchHandleKu(){
                this.getKuData()
            },
            //黑名单搜索
            searchHandleBlack(){
                this.getBlackData()
            },
            //布控类型搜索
            searchHandleType(){
                this.getBkType()
            },
            //重置库搜索
            resetKuForm(){
                this.searchValA = ''
                this.getKuData()
            },
            //黑名单搜索
            resetBlackForm(){
                this.searchValB = ''
                this.getBlackData()
            },
            //重置布控类型搜索
            resetTypeForm(){
                this.searchValC = ''
                this.getBkType()
            },
            //获取布控库列表
            async getKuData(){
                let data={
                    pageNum:this.pageIndex,
                    pageSize:this.pageSize,
                    libraryName:this.searchValA,
                }
                let [err, res] = await to(this.$api.AR.getkuList(data));
                if (err) return;
                this.libraryData = res.data.rows;
                this.totalPage1 = res.data.total;
                console.log(res.data,'获取布控库列表');
            },
            //新增库
            addLibraryHandle(){
                this.addKVisible = true;
                this.$nextTick(()=>{
                    this.$refs.addK.init()
                })
            },
            //编辑--详情
            editKu(row,flag){
                this.editKVisible = true;
                this.$nextTick(()=>{
                    this.$refs.editK.init(row,flag)
                })
            },
            //删除
            async deleteKu(row) {
                var deleteId = []
                deleteId.push(row.controlId)
                console.log(deleteId,'deleteId');
                let data = {
                    ids:deleteId.join(',')
                }
                console.log(data,'data');

                let [err, res] = await to(this.$api.AR.deleteKu(data));
                if (err) return;
                if(res.data.code==200){
                    this.$message.success('删除成功')
                    this.$nextTick(()=>{
                        this.getKuData()
                    })
                }
            },

            //黑名单列表
            async getBlackData(){
                let data={
                    pageNum:this.pageIndex2,
                    pageSize:this.pageSize2,
                    name:this.searchValB,
                }
                let [err, res] = await to(this.$api.AR.blackList(data));
                if (err) return;
                this.blackListData = res.data.rows;
                this.totalPage2 = res.data.total;
                console.log(res.data,'黑名单列表');
            },
            //布控类型
            async getBkType(){
                let data={
                    typePid:0,
                    dictName:this.searchValC
                }
                let [err, res] = await to(this.$api.AR.bkType(data));
                if (err) return;
                this.tableTreeData = res.data.data;
                console.log(this.tableTreeData,'布控类型');
            },


            // 每页数
            sizeChangeHandle (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle (val) {
                this.pageIndex = val
                this.getDataList()
            },
            // 每页数
            sizeChangeHandle1 (val) {
                this.pageSize1 = val
                this.pageIndex1 = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle1 (val) {
                this.pageIndex1 = val
                this.getDataList()
            },
            // 每页数
            sizeChangeHandle2 (val) {
                this.pageSize2 = val
                this.pageIndex2 = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle2 (val) {
                this.pageIndex2 = val
                this.getDataList()
            },
            // 每页数
            sizeChangeHandle4 (val) {
                this.pageSize4 = val
                this.pageIndex4 = 1
                this.getFaceAlertData()
            },
            // 当前页
            currentChangeHandle4 (val) {
                this.pageIndex4 = val
                this.getFaceAlertData()
            },
            // 每页数
            sizeChangeHandle5 (val) {
                this.pageSize5 = val
                this.pageIndex5 = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle5 (val) {
                this.pageIndex5 = val
                this.getDataList()
            },
            //查看黑名单
            checkLibrary(id,flag){

            },
            //删除黑名单
            async deleteLibrary(id){
               let data = {
                   ids:id
               }
                let [err, res] = await to(this.$api.AR.blackDelete(data));
                if (err) return;
                if(res.data.code==200){
                    this.$message.success('删除成功')
                    this.$nextTick(()=>{
                        this.getBlackData()
                    })
                }
            },
            //停止布控
            stopControl(){},
            //开始布控
            startControl(id,controlPersonnelId){
                this.controlPageVisible = true;
                this.$nextTick(() => {
                    this.$refs.controlPage.init(id,controlPersonnelId)
                })
            },
            //数据统计
            async getChartData(){
                let data={
                    community:this.deptId,
                }
                let [err, res] = await to(this.$api.AR.getDataAnalysis(data));
                if (err) return;
                console.log(res.data.data,'res111');
                res.data.data.map(item=>{
                    this.dataName.push(item.days)
                    this.dataValList.push(item.cout)
                })
            },
            //重置查询
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.getDataList()
            },
            //采集--数据搜索
            async getDataList(){
                this.dataSearch=[]
                let data={
                    pageNum:this.pageIndex,
                    pageSize:this.pageSize,
                    community:this.deptId,
                    name:this.ruleForm.name,
                    gender:this.ruleForm.gender,
                    age:this.ruleForm.age,
                    cameraName:this.ruleForm.mount,
                    createTime:this.ruleForm.startDate,
                    updateTime:this.ruleForm.endDate,
                }
                let [err, res] = await to(this.$api.AR.getSelAll(data));
                if (err) return;
                console.log(res.data,'数据搜索');
                this.dataSearch = res.data.rows;
                this.totalPage = res.data.total;
                /*对列表图片进行裁切*/
                this.$nextTick(()=>{
                    this.dataSearch.map((item,index)=>{
                        var url =this.beforeUrl + item.image
                        console.log(url,'人脸路径');
                        var position = JSON.parse(item.rectangles)[0]
                        var oCanvas = document.querySelector('#imgId'+index )
                        resizeImage(url,position.w,position.h,position.x,position.y,oCanvas)
                    })
                })


            },
            //采集--轨迹分析
            async getTrack(val,startTime,endTime){
                console.log(val,this.deptId,'cccccccccccc');
                let data={
                    community:this.deptId,
                    name:val.name,
                    gender:'',
                    age:'',
                    createTime:startTime,
                    updateTime:endTime,
                }
                let [err, res] = await to(this.$api.AR.getTrajectory(data));
                if (err) return;
                console.log(res.data,'res.datares.data');
                res.data.data.map(item=>{
                    this.points.push(Object.assign({
                        lng: item.longtitude,
                        lat: item.latitude,
                        propVisible:false,
                        number:item.cout,
                        url: require('../../assets/images/AR/run.png')
                    }))
                })
                if(this.points.length>0){
                    this.center.lng = this.points[0].lng
                    this.center.lat = this.points[0].lat
                }

                console.log(this.center,'this.deptId');
                console.log(this.points,'轨迹分析');
            },
            //获取卡口名称
            async getBayonet(){
                let data={
                    deptId:this.deptId,
                }
                let [err, res] = await to(this.$api.AR.getCameraName(data));
                if (err) return;
                console.log(res.data.data,'获取卡口名称');
                this.bayonetList = res.data.data;
            },


            handleClose() {
                this.dialogVisible = false;
            },
            /*大图展示*/
            imgClickHandle(item,flag){
                this.faceCropVisible = true;
                this.$nextTick(()=>{
                    this.$refs.faceCrop.init(item,flag)
                })
            },
            /*轨迹分析*/
            trackHandle(val){
                this.faceResultVisible = false;
                console.log(this.faceCameraList,'faceCameraList')
                console.log(this.faceSearch,'faceSearch222222222')
                this.faceCameraList.map(came=>{
                    this.faceSearch.map(item=>{
                        if(item.name == came.text){
                            came.list.push(item)
                        }
                    })

                })
                this.$nextTick(()=>{
                    this.setCurrentPageData();
                })

                /*this.trackVisible = true;
                this.$nextTick(()=>{
                    this.getTrack(val,this.ruleForm.startDate,this.ruleForm.endDate)
                })*/
            },
            // 给地图设置主题色，我设置的是黑夜主题
            handler({map}) {
                console.log(this.faceCameraList,'faceCameraList');
                let that = this;
                map.setMapStyleV2({styleId: '7ccfd12a0af1fd79733c900012aa4c00'});
                that.center.lng = this.faceCameraList[0].lng
                that.center.lat = this.faceCameraList[0].lat
                that.zoom = 19
            },
            /*类型选择*/
            handleCommand(command) {
                this.tabIndex = command;
                if (command == 'a') {
                    this.chooseType = '采集'
                }
                if (command == 'b') {
                    this.chooseType = '布控'
                    this.$nextTick(()=>{
                        this.getFaceAlertData()
                        this.getCount()
                    })
                }
                if (command == 'c') {
                    this.chooseType = '数据统计'
                    this.$nextTick(() => {
                        this.chartTypeChange(1)
                    })
                }

            },
            /*tabClick*/
            handleClick(tab, event) {
                console.log(tab,'tab');
                if(tab.name=='second'){
                    this.dataSearch=[]
                    this.faceResultVisible = true
                   this.getDateRange()
               }
            },
            /*人脸上传*/
            //头像选择
            async fileChange(e) {

                console.log(e.target.result,'mzl');
                var that = this;
                var file = e.target.files[0];
                var reader = new FileReader();
                console.log(reader,'444444444444');
                reader.onload = function (e) {
                     that.adatar = e.target.result;
                    console.log(that.adatar,'人脸');

                 }
                 reader.readAsDataURL(file);

            },
            /*获取服务器名称*/
            getServerName(){
                this.$http.get('/xpi/hosts').then((res)=>{
                    console.log(res,'ddddddddddd')
                    this.serverName = res.data[0]
                })
            },
            submit() {
                this.faceSearch = []
                console.log(this.serverName,'sssssssssssss')
                console.log(this.startTime, this.endTime, this.adatar,'3333333');
                this.loading = true
                if(!this.adatar){
                    this.$message.error('请上传头像')
                }else{
                    var blobFile = dataURLtoBlob(this.adatar)
                    let data = blobFile
                    if(this.startTime=='' || this.endTime==''){
                        this.$message.error('请选择时间')
                    }else{
                        var startTime =formatTime(this.startTime)
                        var endTime =formatTime(this.endTime)
                        this.$http({
                            method: 'post',
                            url: '/xpi/search/face/'+this.serverName+'/'+startTime+'/'+endTime+'?accuracy='+this.sliderVal,
                            headers: {
                                'Authorization': 'Basic cm9vdDpyb290',
                                'Content-Type': 'image/jpeg'
                            },
                            data : data
                        }).then((response) => {
                            this.locationVal = response.headers.location

                            console.log(this.locationVal,'mzlmlz');
                        }).then(()=>{
                            setTimeout(()=>{
                                this.getResultData()
                            },1000)
                        })
                    }
                }
            },
            //获取结果
            getResultData(){
                this.$http.get('/xpi/'+this.locationVal+'/result').then(({data})=>{
                    console.log(data,this.faceCameraList,'搜索结果');
                    if(data.events.length>0){
                        this.loading = false
                        this.faceResultVisible = true
                        data.events.map(item=>{
                            console.log(item.origin.slice(6),'item');
                            console.log(item ,'itemeeeeeeeeee');
                            this.faceCameraList.map(faceItem=>{
                                console.log(faceItem,'faceItem');
                                if(item.origin.slice(6) == faceItem.video){
                                    item.name = faceItem.text
                                }
                            })
                            var timeA = item.timestamp.split('.')[0]
                            var changeTime = timeA.substring(0,4)+'-'+timeA.substring(4,6)+'-'+timeA.substring(6,8)+timeA.substring(8,11)+':'+timeA.substring(11,13)+':'+timeA.substring(13,15)+'Z'
                            console.log(utc2beijing(changeTime),'changeTime')
                            //var newDdate =  utc2beijing(changeTime).split(' ')[0] +' '+ utc2beijing(changeTime).split(' ')[1].replace('下午', 'PM ')
                            var newDdate =  utc2beijing(changeTime)
                            this.faceSearch.push(Object.assign(
                                    {imageUrl: item.origin.slice(6)+'/'+item.timestamp,
                                        accuracy:item.accuracy.toFixed(2)*100+'%',
                                        name:item.name,
                                        position:item.position,
                                        time:newDdate
                                    })
                            )
                            this.totalPage5 = parseInt(this.faceSearch.length/this.pageSize5)
                            this.$nextTick(()=>{
                                this.setCurrentPageData();
                            })
                            console.log(this.faceSearch,)
                        })
                    }else{
                        this.$message.error('没有匹配结果')
                        this.loading = false
                    }

                })
            },
            /*数据采集*/
            chartShow(type) {
                //数据
                //var XName = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
                var XName = this.dataName
                var option = {
                    grid: {
                        left: '11%',
                        top: '5%',
                        bottom: '15%',
                        right: '10%',
                    },
                    legend: {
                        data: ["昕博朗学校路线", "新华小学路线", "云锦五路路线"],
                        bottom: 0,
                        textStyle: {
                            color: '#16DADE'
                        }
                    },
                    yAxis: [
                        {
                            type: 'value',
                            position: 'right',
                            splitLine: {
                                show: false
                            }
                            ,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            }
                        },
                        {
                            type: 'value',
                            position: 'left',
                            nameTextStyle: {
                                color: '#00FFFF'
                            },
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                    width: .5,
                                    color: '#16DADE'
                                }
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                formatter: '{value}',
                                color: '#16DADE',
                                fontSize: 12
                            }
                        },
                    ],
                    xAxis: [
                        {
                            type: 'category',
                            name: '点',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#16DADE',
                                }
                            },
                            axisLabel: {
                                inside: false,
                                interval: 0,
                                textStyle: {
                                    color: '#16DADE',// x轴颜色
                                    fontWeight: 'normal',
                                    fontSize: '11',
                                    lineHeight: 22
                                }

                            },
                            data: XName,
                        },
                        {
                            type: 'category',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                interval: 0,
                            },
                            splitArea: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            //-----
                            // data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                        },
                    ],
                    series: [
                        {
                            symbolSize: 10,
                            symbol: 'circle',
                            name: '',
                            type: type,
                            yAxisIndex: 1,
                            data: this.dataValList,
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    color: '#00f15a',
                                }
                            }
                        }
                        ]
                }

                this.chartShowBox = this.$echarts.init(document.getElementById('chartShowBox'))
                this.chartShowBox.setOption(option)
                window.addEventListener('resize', () => {
                    this.chartShowBox.resize()
                })
            },
            chartTypeChange(val) {
                if (val == 1) {
                    this.chartShow("line")
                }
                if (val == 2) {
                    this.chartShow("bar")
                }

            },
            /*左侧菜单*/
            menuChoose(key) {
                this.menuActiveKey = key
                if(this.menuActiveKey=='1'){this.getFaceAlertData()}
                if(this.menuActiveKey=='2-1'){this.getKuData()}
                if(this.menuActiveKey=='2-2'){}
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSelectionChangeBlack(val){
                console.log(val,'valval');
                this.blackOptions = val;
            },
            /*告警类型*/
            /*filterType(value, row) {
                return row.alertType == value;
            },*/
            /*设备名称*/
            filterDevice(value, row) {
                console.log(value,row,'rrrrrrrr');
                return row.name == row.cameraName;
            },
            /*告警管理列表*/
            async getFaceAlertData(){
                let data ={
                    community:this.deptId,
                    pageNum:this.pageIndex,
                    pageSize:this.pageSize,
                };
                let [err,res] = await to(this.$api.AR.getFaceAlertList(data))
                if(err) return
                console.log(res,'告警管理列表');
                this.tableData = res.data.rows;
                this.totalPage4 = res.data.total;
                /*对列表图片进行裁切*/
                this.$nextTick(()=>{
                    this.tableData.map((item,index)=>{
                        console.log(item,'itemitem');
                        var url =this.beforeUrl + item.image
                        console.log(url,'人脸路径');
                        var position = JSON.parse(item.rectangles)[0]
                        console.log(position,'position');
                        var oCanvas = document.querySelector('#faceId'+index)
                        resizeImage(url,position.w,position.h,position.x,position.y,oCanvas)
                    })
                })

            },
            /*告警管理表格事件*/
            trueAlert(val) {
                const Ids = val.id || this.dataListSelections.join(',')
                let data={
                    status:2,
                    ids:Ids
                }
                this.$confirm('确定执行真告警?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async()=> {
                    let [err, res] = await to(this.$api.AR.getFaceAlertUpdate(data));
                    if (err) return;
                    console.log(res,'res');
                    if(res.data.code==200){
                        this.getFaceAlertData()
                    }else{
                        this.$message.error(res.data.msg)
                    }

                })
            },
            falseAlert(val) {
                const Ids = val.id || this.dataListSelections.join(',')
                let data={
                    status:2,
                    ids:Ids
                }
                this.$confirm('确定执行假告警?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async()=> {
                    let [err, res] = await to(this.$api.AR.getFaceAlertUpdate(data));
                    if (err) return;
                    this.getFaceAlertData()
                })
            },
            undefinedHandle(val) {
                this.undefinedVisible = true;
                this.$nextTick(() => {
                    this.$refs.undefined.init(val.id,'faceFlag')
                })

            },
            alertDetail() {
                this.detailVisible = true;
                this.$nextTick(() => {
                    this.$refs.detail.init()
                })
            },
            /*我的布控库*/
            myLibraryhClick(tab, event) {
               if(tab.name == 'myLibraryA'){this.getKuData()}
               if(tab.name == 'myLibraryB'){this.getBlackData()}
               if(tab.name == 'myLibraryC'){this.getBkType()}
            },

            /*新增布控类型*/
            async goAddContact(row) {
                console.log(row,'mzl');
                this.typePid = row.typeId
                let data = []
                console.log(this.typePid,'this.typePid');
                for (let item of this.tableTreeData) {
                    if (item.typeId === row.typeId) {
                        item.children.push({
                            typeId: "",
                            type: "",
                        });
                    }
                    data.push(item);
                }
                this.tableTreeData = [...data];
            },
            /*删除布控类型*/
            async deleteRow(row) {
                let data = {
                    typeId:row.typeId
                }
                let [err,res] = await to(this.$api.AR.bkTypeDel(data))
                if(err) return;
                this.$message.success('删除成功')
                this.getBkType()
            },
            /*编辑布控类型*/
            goEdit(row) {
                row.isEdit = false;
            },
            /*保存*/
            async isSave(row) {
                console.log(row.typeId,this.typePid,'row');
                row.isEdit = true;
                if(row.typeId){
                    let data = {
                        typeId:row.typeId,
                        dictName:row.dictName
                    }
                    let [err,res] = await to(this.$api.AR.bkEdit(data))
                    if(err) return;
                }else{
                    let data = {
                        typePid:this.typePid,
                        dictName:row.dictName
                    }
                    let [err,res] = await to(this.$api.AR.bkAdd(data))
                    if(err) return;
                    row.isEdit = false
                    this.getBkType()
                }


                console.log(res,'res');
                /*let data = [];
                for (let item of this.tableTreeData) {
                    if (item.typeId === row.typeId) {
                        item.children.push({
                            typeId: "",
                            type: "",
                        });
                    }
                    if (item.typeId == '') {
                        item.children.push(Object.assign({...item}, {
                            typeId: item.children.length + 1,
                            type: "",
                        }));
                    }
                    data.push(item);
                }
                this.tableTreeData = [...data];*/
            },

            /*新增类型*/
            addTypeHandle(){
                this.addTypeVisible = true;
                this.$nextTick(()=>{
                    this.$refs.addType.init()
                })
            },
            /*新增库*/
            addBkHandle(id,flag){
                this.addBkVisible =true;
                this.$nextTick(()=>{
                    this.$refs.addBk.init(id,flag)
                })
            },
            /*查看修改库*/
            checkBkHandle(id,flag){
                this.editBkVisible =true;
                this.$nextTick(()=>{
                    this.$refs.editBk.init(id,flag)
                })
            },

        }
    }
</script>

<style scoped>
    .bm-view {
        width: 100%;
        height:700px;
    }

</style>
