import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import Antd from 'ant-design-vue';
import Vue2Editor from "vue2-editor";
import VueMarkdown from 'vue-markdown'
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css';
import '@/icons'

Vue.use(Antd);
Vue.use(ElementUI);
Vue.use(Vue2Editor);
Vue.use(VueMarkdown);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
