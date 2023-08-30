/*
 * @Description: 
 * @Author: sunyue
 * @Date: 2023-08-16 14:45:56
 * @LastEditTime: 2023-08-17 10:26:38
 * @LastEditors: sunyue
 */
import Vue from "vue";
import VueRouter from 'vue-router';

import SmartBody from '../views/smartBody.vue';
import BigModel from '../views/bigModel.vue';
import SmallModel from  '../views/smallModel.vue';
import Script from '../views/script.vue';
import Prompt from '../views/prompt/index.vue'
// 0816
import Evaluate from '../views/evaluate/evaluating.vue'
import Testing from '../views/evaluate/testing.vue'
import AiModel from '../views/aiModel/index.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/evaluate"
  },
  {
    path:"/evaluate",
    name:"Evaluate",
    component:Evaluate
  },
  {
    path:"/evalute_detail",
    name:"Testing",
    component:Testing
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
    component: AiModel,
  },
]

const router = new VueRouter({
  routes
})

export default router;