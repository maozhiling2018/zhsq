/**
 * 指挥屏
 */
import api from '../request'
const Intelligent_com="/api"
//首页统计数据
export const getlinkData = (data) => api.post(Intelligent_com+'/deptStyle/selAll',data);

//
//指挥屏数据
export const getlinkVal = (data) => api.post(Intelligent_com+'/deptStyle/selAll',data);
//指挥屏数据新增修改
export const getlinkUpdate = (data) => api.post(Intelligent_com+'/deptStyle/save',data);
//指挥屏数据新增修改
export const getdeviceDetail = (data) => api.get(Intelligent_com+'/deptStyle/selById',data);



