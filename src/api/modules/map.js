import api from '../request'
const Intelligent_com="/api"
console.log(api,'api');

/*设备数据*/
export const getDeviceData = (data,auth) => xpi.get('/xpi/camera/list',data,auth);
/*抓拍*/
export const getCropImg = (data) => api.post(Intelligent_com+'/captureParameters/selByDeptIdDays',data);
