import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';  //element-ui
import httpRequest from '@/utils/httpRequest'
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map-v3'
import { Tree } from 'ant-design-vue';
import VueCookie from 'vue-cookie'
import Global from '@/utils/global'
import './assets/scss/index.scss'  //引入scss
import 'element-ui/lib/theme-chalk/index.css';
import './mock/index'
import './assets/icons'
import '@/assets/fonts/font.scss'; // 引入字体样式
import 'ant-design-vue/dist/antd.css';
import 'echarts/map/js/china.js';
import api from './api/index'
import Eventbus from './eventBus'
import './utils/rem'
import $ from 'jquery'
Vue.use(BaiduMap, { ak: 'FffSlBYSo22DMP43GvazHq0B8bWckVfK'})
Vue.use(Tree);
Vue.use(ElementUI);
Vue.use(api);
Vue.use(VueCookie)

Vue.prototype.$echarts = echarts
Vue.prototype.$http = httpRequest
Vue.prototype.$global = Global
Vue.prototype.eventbus = Eventbus



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
