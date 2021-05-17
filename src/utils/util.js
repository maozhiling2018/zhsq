import md5 from 'js-md5'
import Vue from 'vue'
import axios from'axios'
/*下载图片*/
export function getUrlBase64(url) {
    return new Promise(resolve => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let img = new Image()
        img.crossOrigin = 'Anonymous' //允许跨域
        img.src = url
        img.onload = function() {
            canvas.height = 300
            canvas.width = 300
            ctx.drawImage(img, 0, 0, 300, 300)
            let dataURL = canvas.toDataURL('image/png')
            canvas = null
            resolve(dataURL)
        }
    })
}
// 密码加密
export function passwordMd5(password) {
    return md5(password)
}
// 密码加密
export function cameraName(array,name) {
    var cameraInfo = {name:'',id:''}
    array.map(item=>{
        console.log(item,'8888888888888');
        if(item.videoStreams[0].accessPoint == name){
            cameraInfo = {
                name: item.displayName,
                id:item.displayId
            }
        }
    })
    return cameraInfo
}
/**
 * 清除登录信息
 */
export function clearLoginInfo () {
    Vue.cookie.delete('token')

}
/**
 * 获取style属性值
 */
export function getStyle(obj,attr)
{
    if(obj.currentStyle){
        return obj.currentStyle[attr]
    }else{
        return getComputedStyle(obj,null)[attr]
    }
}
/**
 * 获取所有摄像头
 */
export function getCamera(url,data)
{
    axios.get(url,{
        auth: {
            username: 'root',
            password: 'root'
        }
    }).then((response)=>{
        if(response.data){
            data = response.data.cameras
        }
    })
    return data
}
/**
 * 获取监控摄像头路径，根据所选id
 */
export function getCameraUrl(id,data,url,backUrl)
{
    var videoList = []
    var storage = ''
    var comment = ''
    var ptzs = null
    var obj ={}
    data.map(item=>{
        if(id == item.displayId){
            console.log(item,'ssssssssssss');
            videoList = item.videoStreams
            storage = item.archives[0].storage
            ptzs = item.ptzs
            comment = JSON.parse(item.comment)
        }
    })
    obj = {
        backUrl:videoList[0].accessPoint.slice(6),
        url:videoList[0].accessPoint.slice(6),
        storage:storage,
        comment:comment,
        ptzs:ptzs
    }
    return obj
}
/**
 * 图片裁切
 */
export function resizeImage(url, width, height, x, y,oCanvas) {
    var oGc = oCanvas.getContext( '2d' );
    var oImg = new Image();
    oImg.src = url;
    oImg.onload = function(){
        oGc.drawImage( oImg, 1920*x,1072*y,1920*width,1072*height, 0, 0, 120, 100 );
    }
}

/***
 *
 * base64转二进制
 */
export
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}

/**
**转换成UTC
* */
export function formatTime(time){
    var startTime = new Date(time).toISOString()
    return startTime.replace(/-/g,'').replace(/:/g,'').split('.')[0]

}

/**
 * 获取uuid
 */
export function getUUID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
}
/**
 * 云控
 * */
export function getZoom(url1,url2,url3,sessionId,ballFile,value){
    axios.get(url1+ ballFile + '?session_priority=1').then(res => {
        sessionId = res.data.session_id;
    }).then(() => {
        axios.head(url2 + ballFile + '?session_id=' + sessionId)
            .then(() => {
                let data = {
                    mode: 'continuous',
                    value:value,
                    session_id: sessionId
                }
                axios.get(url3 + ballFile, {params: data})
                    .then(() => {
                        setTimeout(() => {
                            let data = {
                                mode: 'continuous',
                                value: 0,
                                session_id: sessionId
                            }
                            axios.get(url3 + ballFile, {params: data})
                        }, 200)
                    })
            })
    })
}
export function getDirection(url1,url2,url3,sessionId,ballFile,pan1,pan2,tilt1,tilt2){
    axios.get(url1+ ballFile + '?session_priority=1').then(res => {
        sessionId = res.data.session_id;
    }).then(() => {
        axios.head(url2 + ballFile + '?session_id=' + sessionId)
            .then(() => {
                let data = {
                    mode: 'continuous',
                    tilt:tilt1,
                    pan:pan1,
                    session_id: sessionId
                }
                axios.get(url3 + ballFile, {params: data})
                    .then(() => {
                        setTimeout(() => {
                            let data = {
                                mode: 'continuous',
                                tilt:tilt2,
                                pan:pan2,
                                session_id: sessionId
                            }
                            axios.get(url3 + ballFile, {params: data})
                        }, 200)
                    })
            })
    })
}

/**
 * 人脸截图定位
 * */
export function cropImgBox(data,parentId,drawId){
    var reactFile= JSON.parse(data)[0]
    var dom = document.getElementById(parentId)
    var drawReact = document.getElementById(drawId); // 获取矩形框元素
    drawReact.style.width = reactFile.w*1920+'px'; // 宽
    drawReact.style.height = reactFile.w*1072+'px'; // 高
    drawReact.style.visibility = 'visible'; // 进入画布按下鼠标显示默认矩形框
    drawReact.style.top = reactFile.y*1072 + 'px';
    drawReact.style.left = reactFile.x*1920 + 'px';
}
/**
 * UTC转北京时间
 * */
export function utc2beijing(utc_datetime) {
// 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0,T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
    var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

// 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp/1000;

// 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp+8*60*60;

// 时间戳转为时间
    var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return beijing_datetime; // 2017-03-31 16:02:06
}

/**
 * 时间转换20201020T071243   ----2020-10-20 07:12:34
 * */
export function changeTime(date){
    var year = date.slice(0,4)
    var month = date.slice(4,6)
    var day = date.slice(6,8)
    var hour = date.slice(9,11)
    var minute = date.slice(11,13)
    var second = date.slice(13,15)
    var startTime = year+'-'+month+'-'+day +' ' + hour +':'+minute+':'+second
    return startTime
}

/***
 * 年月日时分秒转时间戳
 */
export function getTimestamp(time) { //把时间日期转成时间戳
    return (new Date(time)).getTime() / 1000
}
/**
 * 实现方法 @return 返回2个值，一个是带时分秒，另一个不带。
 * console.log(msToDate(myTime1).hasTime);//--->2017-10-23 17:20:13
 console.log(msToDate(myTime1).withoutTime);//--->2017-10-23
 console.log(msToDate(myTime2).hasTime);//--->2017-09-19 08:00:00
 console.log(msToDate(myTime2).withoutTime);//--->2017-09-19
 * */


export function msToDate (msec) {
    let datetime = new Date(msec);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let date = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();

    let result1 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) < 10 ? '0' + date : date) +
      ' ' +
      ((hour + 1) < 10 ? '0' + hour : hour) +
      ':' +
      ((minute + 1) < 10 ? '0' + minute : minute) +
      ':' +
      ((second + 1) < 10 ? '0' + second : second);

    let result2 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) < 10 ? '0' + date : date);

    let result = {
        hasTime: result1,
        withoutTime: result2
    };

    return result;
}
