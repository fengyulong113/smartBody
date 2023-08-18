import Vue from "vue";
import VueRouter from 'vue-router';

import SmartBody from '../views/smartBody.vue';
import BigModel from '../views/bigModel.vue';
import SmallModel from  '../views/smallModel.vue';
import DataSet from '../views/dataSet.vue';
import Script from '../views/script.vue';
import Prompt from '../views/prompt/index.vue';
import AiModel from '../views/aiModel/index.vue';
import ModelsDetail from '../views/aiModel/modelsDetail.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/smartBody"
  },
  {
    path: "/smartBody",
    name: "smartBody",
    component: SmartBody
  },
  {
    path: "/bigModel",
    name: "bigModel",
    component: BigModel
  },
  {
    path: "/smallModel",
    name: "smallModel",
    component: SmallModel
  },
  {
    path: "/dataSet",
    name: "dataSet",
    component: DataSet
  },
  {
    path: "/script",
    name: "script",
    component: Script
  },
  {
    path: "/prompt",
    name: "prompt",
    component: Prompt
  },
  {
    path: "/aiModel",
    name: "aiModel",
    component: AiModel
  },
  {
    path: "/modelsDetail",
    name: "modelsDetail",
    component: ModelsDetail
  },
]

const router = new VueRouter({
  routes
})

export default router;