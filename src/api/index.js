import api from './api'
const install = Vue => {
    if (install.installed)
        return;
    install.installed = true;
    Vue.prototype.$api=api;
    // Object.defineProperties(Vue.prototype, {
    //   // 注意，此处挂载在 Vue 原型的 $api 对象上
    //   $api: {
    //     get() {
    //       return api
    //     }
    //   }
    // })
}
export default install