/**
 * AR模块
 */
import api from '../request'
const Intelligent_com="/api"
//上传
export const upLaod = (data) => api.post(Intelligent_com+'/common/upload',data);
//校验是否明文
export const getCheck = (data) => api.get(Intelligent_com+'/check',data);
//首页统计数据
export const getIndexData = (data) => api.get(Intelligent_com+'/homePage/statistics',data);
//车辆通行统计数据
export const getVehicleData = (data) => api.post(Intelligent_com+'/vehicle/dataAnalysis',data);
//报警预案统计数据
export const getAlertData = (data) => api.post(Intelligent_com+'/callPolice/statisticalAnalysis',data);
//住户通行统计数据
export const getpeopleData = (data) => api.get(Intelligent_com+'/controlPersonnel/statisticalAnalysis',data);
//api根据小区id小区详情
export const getCommuniteInfo = (data) => api.get(Intelligent_com+'/selByDeptId',data);

//一人一档--左侧列表
export const getTableData = (data) => api.get(Intelligent_com+'/personnel/selByTungCont',data);
//一人一档--根据小区、单元、楼栋查询人员区域分布
export const getPeopleMap = (data) => api.post(Intelligent_com+'/personnel/selByTungUnitDeptId',data);
//一人一档--根据小区、单元楼栋、区域查询人员列表
export const getPeopleList = (data) => api.post(Intelligent_com+'/personnel/selAll',data);
//一人一档--根据单元楼按性别统计数据
export const getSexData = (data) => api.post(Intelligent_com+'/personnel/selByTungUnitDeptIdSex',data);
//一人一档--根据单元楼按年龄段统计数据
export const getAgeData = (data) => api.post(Intelligent_com+'/personnel/selByAge',data);
//重点人口列表
export const getFocalPersonnel = (data) => api.post(Intelligent_com+'/focalPersonnel/selAll',data);
//重点人口左侧菜单
export const getKeyPeopleMenu = (data) => api.get(Intelligent_com+'/focalPersonnel/selByCout',data);
//右侧统计图表
export const getKeyPeopChart = (data) => api.get(Intelligent_com+'/focalPersonnel/selByDeptIdCout',data);
//重点类型列表
export const getKeyPeopType = (data) => api.get(Intelligent_com+'/focalPersonnel/selList',data);


//一车一档左侧菜单：根据小区查询单元楼
export const getCarTable = (data) => api.get(Intelligent_com+'/personnelVehicle/selByTungCont',data);
//一车一档左侧菜单：根据小区查询单元楼
export const getCarArea = (data) => api.post(Intelligent_com+'/personnelVehicle/selByTungUnitDeptId',data);

//一一企一档
export const getCompanyList = (data) => api.post(Intelligent_com+'/enterprise/list',data);

/*人脸识别--数据统计*/
export const getDataAnalysis = (data) => api.post(Intelligent_com+'/face/dataAnalysis',data);
/*人脸识别--搜索查询轨迹*/
export const getTrajectory = (data) => api.post(Intelligent_com+'/face/trajectory',data);
/*人脸识别--搜索查询列表*/
export const getSelAll = (data) => api.post(Intelligent_com+'/face/selAll',data);
/*人脸识别--获取卡口名称*/
export const getCameraName = (data) => api.get(Intelligent_com+'/face/getCameraName',data);
/*人脸识别--告警管理-列表*/
export const getFaceAlertList = (data) => api.post(Intelligent_com+'/face/selList',data);
/*人脸识别--告警管理-修改*/
export const getFaceAlertUpdate = (data) => api.post(Intelligent_com+'/face/updateList',data);

/*应急预案列表*/
export const getPlanList = (data) => api.post(Intelligent_com+'/emergencyPlan/list',data);

/*智慧保安--保安巡更*/
export const getSecurityGuard = (data) => api.post(Intelligent_com+'/security/selSecurityWatchList',data);
/*智慧保安--小区保安信息*/
export const getSecurityInfo = (data) => api.post(Intelligent_com+'/security/selSecurityList',data);
/*智慧保安--保安坐班*/
export const getSecurityOffice = (data) => api.post(Intelligent_com+'/security/selSecurityDutyList',data);

/*车俩检索--车辆检索列表*/
export const getCarList = (data) => api.post(Intelligent_com+'/vehicle/search',data);
/*车俩检索--车辆轨迹*/
export const getCarTrack = (data) => api.post(Intelligent_com+'/vehicle/trajectory',data);
/*车俩检索--数据统计*/
export const getChart = (data) => api.post(Intelligent_com+'/vehicle/selSummary',data);
/*车俩检索--根据小区ID、区域查询列表*/
export const getCarMapList= (data) => api.post(Intelligent_com+'/personnelVehicle/selList',data);

/*实时预警--列表*/
export const getAlert = (data) => api.post(Intelligent_com+'/callPolice/selAll',data);
/*实时预警--详情*/
export const getAlertDetail = (data) => api.post(Intelligent_com+'/callPolice/selById',data);
/*实时预警--预警事件及预警当日总数*/
export const getAlertType = (data) => api.get(Intelligent_com+'/callPolice/getType',data);
/*实时预警--批量修改*/
export const getAlertUpdate = (data) => api.post(Intelligent_com+'/callPolice/updateList',data);

/*布控---布控库---我的布控库---库管理---列表--查看所有（添加黑名单使用）*/
export const getkuAll = (data) => api.post(Intelligent_com+'/control/selAll',data);
/*布控---布控库---我的布控库---库管理---列表*/
export const getkuList = (data) => api.post(Intelligent_com+'/control/selList',data);
/*布控---布控库---我的布控库---库管理---新增*/
export const saveKu = (data) => api.post(Intelligent_com+'/control/save',data);
/*布控---布控库---我的布控库---库管理---删除*/
export const deleteKu = (data) => api.get(Intelligent_com+'/control/delList',data);
/*布控---布控库---我的布控库---库管理---详情*/
export const detailKu = (data) => api.post(Intelligent_com+'/control/selById',data);
/*布控---布控库---我的布控库---库管理---修改*/
export const editKu = (data) => api.post(Intelligent_com+'/control/update',data);

/*布控---布控库---我的布控库---黑名单---列表*/
export const blackList = (data) => api.post(Intelligent_com+'/controlPersonnel/selAll',data);
/*布控---布控库---我的布控库---黑名单---删除*/
export const blackDelete = (data) => api.get(Intelligent_com+'/controlPersonnel/delList',data);
/*布控---布控库---我的布控库---黑名单---详情*/
export const blackDetail = (data) => api.get(Intelligent_com+'/controlPersonnel/selById',data);
/*布控---布控库---我的布控库---黑名单---修改*/
export const blackEdit = (data) => api.post(Intelligent_com+'/controlPersonnel/update',data);
/*布控---布控库---我的布控库---黑名单---新增*/
export const blackSave = (data) => api.post(Intelligent_com+'/controlPersonnel/save',data);


/*布控---布控库---我的布控库---布控类型---列表*/
// export const bkType = (data) => api.post(Intelligent_com+'/controlType/selAll',data);
export const bkType = (data) => api.post(Intelligent_com+'/controlType/selList',data);
/*布控---布控库---我的布控库---布控类型---修改*/
export const bkEdit = (data) => api.post(Intelligent_com+'/controlType/update',data);
/*布控---布控库---我的布控库---布控类型---新增*/
export const bkAdd = (data) => api.post(Intelligent_com+'/controlType/save',data);
/*布控---布控库---我的布控库---布控类型---删除*/
export const bkTypeDel = (data) => api.post(Intelligent_com+'/controlType/del',data);

/*门禁--左侧列表*/
export const doorBuildList = (data) => api.post(Intelligent_com+'/building/selByDeptId',data);
/*门禁--门禁推送列表*/
export const doorList = (data) => api.post(Intelligent_com+'/captureParameters/selAll',data);


/*监控设备*/
export const monitorList = (data) => api.get(Intelligent_com+'/equipment/list',data);

/*预警抓拍数量查询*/
export const faceCount = (data) => api.get(Intelligent_com+'/face/selCoutByDeptId',data);
