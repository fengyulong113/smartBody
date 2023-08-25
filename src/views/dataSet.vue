<!-- <template>
  <div class="datasetContainer">
    <div class="tips">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="工具介绍" name="1">
          <div>
            <p>LLMs中⽂语⾔评测⼯具</p>
            <p>
              本评测⼯具是针对⼤语⾔模型进⾏的摘要抽取、对话问答进⾏定量评测。评测依赖于领域应⽤的专
              ⽤数据集，形式为：
              提供⼀段话进⾏输⼊：
            </p>
            <div class="text">这件⻙恩泽维尔宽松休闲纯⾊短裤，本⾝在设计⻛格中就是⾮常的与众不同的，主要就是体现在裤
              ⼦上的翻盖⼝袋装饰，让⼀条再简单不过的裤⼦展现出不⼀样的潮流。裤⼦采⽤的宽松的版型设
              计，让你不管有再粗的腿也能很好的穿着，采⽤的优质⾯料，透⽓吸汗，也是⾮常的亲肤。
            </div>
            <p>参考关键词：</p>
            <div class="text">版型：宽松，颜⾊：纯⾊，⻛格：休闲，⻛格：潮，图案：纯⾊，裤⻓：短裤，裤款式：⼝袋</div>
            <p>提供⼀段话进⾏提问：</p>
            <div class="text">⼀根钢材⻓18.4⽶，锯下3.8⽶后，剩下的⽐锯下的⻓⼏⽶？</div>
            <p>参考回答：</p>
            <div class="text">10.8</div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="example">
      <div class="dataset">
        <div><el-tag>数据集</el-tag></div>
        <div style="height: 111px;overflow-y:auto">
          <el-radio-group v-model="dataRadioVal" @>
            <el-radio class="radioStyle" v-for="(item, i) in dataRadioList" :key="i" :label="item">{{ item }}</el-radio>
          </el-radio-group>
        </div>
        <div v-for="(item, i) in exampleData" :key="i">
          <p>提供一段话进行输入：</p>
          <div class="text" style="width: 100%">
            {{ item.Q }}
          </div>
          <p>标准答案：</p>
          <div class="text" style="width: 100%">
            {{ item.A }}
          </div>
        </div>
        <!-- <el-table :data="exampleData" :border="true">
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="summary" label="评估"></el-table-column>
        </el-table> -->
      </div>
      <div class="model">
        <div style="display: flex;justify-content: space-between;align-items: center;height: 32px">
          <el-tag>模型</el-tag>
          <div>
            <el-button type="primary" size="small" style="margin-top: 10px" @click="handleEvaluate">评测</el-button>
          </div>
        </div>
        <div style="height: 111px;overflow-y:auto">
          <el-radio-group v-model="modelRadioVal">
            <el-radio class="radioStyle" v-for="(item, i) in modelRadioList" :key="i" :label="item">{{ item }}</el-radio>
          </el-radio-group>
        </div>
        <div class="result" v-loading="loading">
          <span>数据集：</span><el-tag type="info">{{ this.resDataSet }}</el-tag><br>
          <span>模型： <el-tag type="info">{{ this.resModel }}</el-tag></span>
          <div v-for="(item, i) in Object.keys(pointsData)" :key="i" class="resSlip">
            <div class="slipName">{{ item }}</div>
            <div>
              <div class="flex">
                <div class="slip">{{  Object.values(pointsData)[i] }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tips">
      <el-collapse v-model="actice">
        <el-collapse-item title="结果" name="1">
          <el-table :data="resData.predictions">
            <el-table-column label="labels" prop="labels"></el-table-column>
            <el-table-column label="predict" prop="predict"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// const mock1 = {
//   input: "当地时间6月24日晚间，已控制俄南部罗斯托夫并自称已行军至“距离莫斯科约200公里范围”的瓦格纳集团创始人普里戈任发布音频声明，“认识到可能会为俄罗斯人的流血负责，我们正在掉转我们的纵队，按计划掉头返回营地”。而在此前的不到24小时内，普里戈任被诉“武装叛乱”，俄罗斯多地进入紧急状态和“反恐”模式，普京发表讲话痛批“叛国者”并要求“消灭那些组织武装暴动的人”……俄罗斯内部的武装冲突看似一触即发。随着俄罗斯总统新闻秘书佩斯科夫称针对瓦格纳集团负责人普里戈任的刑事立案将被撤销、普里戈任将前往白俄罗斯，以及俄媒报道称普里戈任与瓦格纳集团所有武装人员已全部从俄罗斯南部军区司令部撤离，牵动全球神经的瓦格纳武装“反戈”俄罗斯国防部事件似乎暂告一段落。",
//   answer: "事件：瓦格纳武装叛乱，地点：俄罗斯罗斯托夫，时间：6月24日晚，事件制造者：普里戈任，结果：瓦格纳撤离"
// }
const mock1 = [
  {"Q": "歼16什么时候曝光？","A": "2013年，网上也曝出一组关于歼-16携霹雳-13惊艳亮相的图片，引发外界强烈关注。"},
  {"Q": "苏-30最初称为什么？","A": "苏-30最初称为苏-27PU，是串列双座远程拦截机。"},
  {"Q": "F-15E“打击鹰”的武器挂架有多少？","A": "F-15E“打击鹰”的武器挂架增加了1倍，除原挂架外，在每个保形油箱边还有6个挂架。"},
]
// const mock2 = {
//   input: "一次阵地转移共需要行军18.4公里，行军3.8公里后，剩余路程比已行军路程多几公里？",
//   answer: "10.8"
// }
const mock2 = [
  {"Q": "中国的海疆线有多长?", "A": "3.2万公里或三点二万公里"},
  {"Q": "中俄边界有多长?", "A": "四千公里或4000公里"},
  {"Q": "中国的大陆海岸线有多长", "A": "1.8万公里或一点八万公里"},
]
const mock3 = {
  input: "国防的类型有哪些，我国国防属于什么类型的国防？",
  answer: "国防的类型主要有四种，扩张型、自卫型、联盟型、中立型，我国的国防类型为自卫型国防。"
}
import { evaluate } from '../api/dataSet'
export default {
  name: 'dataSet',
  data() {
    return {
      exampleData: mock1,
      dataRadioVal: 'sh_dev',
      dataRadioList: [
        "sh_dev",
        "m_dev",
      ],
      modelRadioVal: 'ChatGLM-6B-INT4',
      modelRadioList: [
        "ChatGLM-6B-INT4",
        "ChatGLM-6B-INT4-Checkpoint-3000",
      ],
      resData: {},
      loading: false,
      activeNames: '',
      active: '',
      resDataSet: "",
      resModel: "",
      pointsData: {},
    }
  },
  watch: {
    dataRadioVal(val) {
      switch (val) {
        case "sh_dev":
          this.exampleData = mock1;
          break;
        case "m_dev":
          this.exampleData = mock2;
          break;
        default:
          break;
      }
    }
  },
  methods: {
    handleEvaluate() {
      this.loading = true;
      this.resData = []
      this.resDataSet = ''
      this.resModel = ''
      const params = {
        dataset: this.dataRadioVal,
        model: this.modelRadioVal
      }
      let a = "{ \"predict_bl\": 1.899, \"predict_rouge\": 2.77 }"
      // let res = JSON.parse(a)
      // console.log(a)
      // console.log(res)
      // this.pointsData = JSON.parse((JSON.stringify(JSON.parse(res.data.points))))

      //   this.resData =  {
      //     points: {"predict_bleu-4": 1.7585324999999998, "predict_rouge-1": 4.561915},
      //     "predictions": [
      //       {
      //         "labels": "3.2万公里或三点二万公里",
      //         "predict": "中国的海疆线是指中国的领海疆域,也就是中国的领土范围。中国的领海线长为 200 海里,而中国的领海宽度为 1"
      //       },
      //       {
      //         "labels": "四千公里或4000公里",
      //         "predict": "中俄边界线长度因不同的历史时期和不同国家的法律要求而有所不同。目前,中国和俄罗斯之间的边界线是在1921年11月11日通过的"
      //       },
      //       {
      //         "labels": "1.8万公里或一点八万公里",
      //         "predict": "中国的大陆海岸线长度约为10,000公里。"
      //       },
      //       {
      //         "labels": "094型核动力潜艇",
      //         "predict": "巨浪2是卫星,其发射平台是一款由中国的长征长征3号运载火箭。"
      //       },
      //       {
      //         "labels": "巨浪-2号",
      //         "predict": "2019年中华人民共和国国庆70周年大阅兵中,中国展示了最新的潜基导弹,它是一款名为“潜基导弹”的导弹系统。"
      //       },
      //       {
      //         "labels": "2013年11月23日",
      //         "predict": "2018年5月19日,中华人民共和国国防部宣布划设东海防空识别区。"
      //       },
      //       {
      //         "labels": "大陆架自然延伸原则",
      //         "predict": "我国主张以“大陆架”原则进行大陆架的划分。大陆架是指由大陆和海洋组成的大陆部分,而海洋部分则被称为“海洋”。\n\n这个原则是"
      //       }
      //     ]
      //   }
        // this.pointsData = JSON.parse(a)

      evaluate(params).then(res => {
        console.log(res.data.data)
        this.resData = res.data.data;
        this.pointsData = JSON.parse(res.data.data.points)
        this.resDataSet = this.dataRadioVal;
        this.resModel = this.modelRadioVal;
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>
.example {
  border: 1px solid #c0c4cc;
  border-radius: 4px;
  padding: 10px 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
}
.dataset {
  width: 50%;
  padding: 10px 20px;
  box-sizing: border-box;
}
.model {
  width: 50%;
  padding: 10px 20px;
  box-sizing: border-box;
}
.result {
  border: 1px solid #c0c4cc;
  border-radius: 4px;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 13px;
  height: 577px;
  overflow-y: auto;
}
.resSlip {
  display: flex;
  width: 100%;
  margin-top: 3px;
}
.slipName {
  border: 1px solid #c0c4cc;
  height: 50px;
  line-height: 50px;
  width: 200px;
  text-align: center;
  box-sizing: border-box;
}
.slip {
  border: 1px solid #c0c4cc;
  height: 50px;
  line-height: 50px;
  width: 200px;
  text-align: center;
  box-sizing: border-box;
}
.flex {
  display: flex;
}
.text {
  width: 800px;
  padding: 20px 40px;
  font-size: 13px;
  background-color: #F5F6F7;
  border: 1px solid #E4E5E8;
  border-radius: 4px;
  box-sizing: border-box;
}
.tips {
  border: 1px solid #c0c4cc;
  border-radius: 4px;
  padding: 10px 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.radioStyle {
  width: 100%;
  margin: 10px 0;
}
</style> -->