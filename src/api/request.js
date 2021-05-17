import request from '@/utils/httpRequest'
class AjaxRequest{
	post(url,params,path){
		return request({
			url: request.adornUrl(url),
			path:path,
			method: 'post',
			data: request.adornData(params)
		})
	}
	get(url,params){
		return request({
			url: request.adornUrl(url),
			method: 'get',
			params: request.adornParams(params)
		})
	}
}
export default new AjaxRequest
