# community

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

###工作日志
- 2020/10/26-10.30
1:项目框架搭建
2:登录页面制作
3:AR屏制作（头部的天气，及点击弹出层暂未实现）


 ###/*对列表图片进行裁切*/
this.$nextTick(()=>{
    this.dataSearch.map((item,index)=>{
        var url =this.beforeUrl + item.image
        console.log(url,'人脸路径');
        var position = JSON.parse(item.rectangles)[0]
        resizeImage(url,position.w,position.h,position.x,position.y,index)
    })
})

//智慧社区二次开发
