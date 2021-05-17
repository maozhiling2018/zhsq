/**
 * 登录模块
 */
import api from '../request'
const Intelligent_com="/api"
//登录
export const getLogin = (data) => api.post(Intelligent_com+'/login',data);
//退出登录
export const getLoginOut = (data) => api.get(Intelligent_com+'/delLoginUser',data);
//根据token获取登录信息
export const getLoginUser = (data) => api.get(Intelligent_com+'/loginUser',data);
//获取用户所能管理的部門列表
export const getTree = (data) => api.post(Intelligent_com+'/treeselect',data);

export const getSetting = (data) => api.get(Intelligent_com+'/settings',data);
//激活
export const activeCode = (data) => api.post('/effective/setUp',data);
//有效期
export const getValidity = (data) => api.get('/effective/termValidity',data);

