import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import Antd from 'ant-design-vue';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css';
import '@/icons'

Vue.use(Antd);
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
  router,
  store,
  //事件总线
}).$mount('#app')
