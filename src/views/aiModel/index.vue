<template>
  <div class="aiModelCenterMain">
    <a-form layout="horizontal">
      <div class="aiModelTop">

        <div class="aiModelTopInfo">
          <div class="aiModelTopInfoTitle">模型库 Models</div>
          <div class="aiModelTopInfoDesc">
            包含计算机视觉、自然语言处理、文心大模型等任务方向算法，覆盖通用，军事领域等场景范例
          </div>
        </div>

        <div class="aiModelTopRight">
          <div class="aiModelTopSearch">
            <a-form-item style="row-gap: 0px;">
              <div class="aiModelTopSearchInput">
                <a-input-search size="large" placeholder="请输入模型名称" @search="onSearch" />
              </div>
            </a-form-item>
          </div>
        </div>

      </div>
      <a-divider />
      <div class="aiModelContent">

        <div class="aiModelLeft">
          <div class="aiModelLeftItem" v-for="(item, i) in labelList" :key="i">
            <div class="aiModelLeftItemTitle">
              {{ item.title }}
            </div>
            <div class="aiModelLeftItemContent">
              <a-radio-group v-model="modelType">
                <a-radio-button
                  v-for="(e, i) in item.labelVals"
                  :key="i"
                  :value="e">
                  {{ e }}
                </a-radio-button>
              </a-radio-group>
            </div>
          </div>
        </div>

        <div class="aiModelList">

          <div class="aiModelListHeader">
            <div class="aiModelListHeaderTitle">模型列表</div>
            <div class="aiModelListHeaderCreate">
              <a-button @click="createModel" style="height: 100%;font-size: 13px;color: #2b32d8;" type="link">创建模型</a-button>
            </div>
            <div class="aiModelListHeaderTatalCount">
              共{{ '100' }}个结果
            </div>
            <div class="aiModelListHeaderFunc">
              <a-checkbox-group
                v-model="checkboxValue"
                name="checkboxgroup"
                :options="plainOptions"
                @change="checkboxChange"
                style="margin-right: 10px"
              />
              <a-select 
                v-model="selectValue"
                style="width: 150px"
              >
                <a-select-option 
                  v-for="(item, i) in selectList" 
                  :key="i"
                  :value="item"
                  >
                  {{ item }}
                </a-select-option>
              </a-select>
            </div>
          </div>

          <div class="aiModelListWapper">
            <div class="aiModelListWapperCardcontainer" @click="modelClick(item)" v-for="(item, i) in cardList" :key="i">
              <div class="aiModelListWapperCard">
                <div class="aiModelListWapperCardRight">

                  <div class="aiModelListWapperCardRightTop">
                    <div class="aiModelListWapperCardRightName">{{ item.name }}</div>
                  </div>

                  <div class="aiModelListWapperCardRightBolongto">
                    <a-radio-button v-for="(e, i) in item.labels" :key="e">
                      {{ e }}
                    </a-radio-button>
                    <a-popover>
                      <template slot="content">
                        <div style="display: flex;">
                          <a-radio-button>
                            目标检测
                          </a-radio-button>
                          <a-radio-button>
                            图像分割
                          </a-radio-button>
                        </div>
                      </template>
                      <a-radio-button>
                        <SvgIcon icon-class="more" @click.native.stop="e => e.preventDefault()" />
                      </a-radio-button>
                    </a-popover>
                  </div>

                  <div class="aiModelListWapperCardRightDesc">
                    {{ item.desc }}
                  </div>

                  <div class="aiModelListWapperCardRightDetail">
                    <div v-for="(e, i) in item.selects" :key="i">
                      <SvgIcon icon-class="dot" />
                      <span class="aiModelListWapperCardRightDetailTrain">{{ e }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="aiModelListPagination"></div>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'AiModel',
  components: {
    SvgIcon
  },
  data() {
    return {
      modelType: "",
      checkboxValue: [],
      plainOptions: [
        { label: "支持训练", value: "支持训练"},
        { label: "在线体验", value: "在线体验"},
        { label: "支持PaddleX", value: "支持PaddleX"},
      ],
      selectValue: "综合排序",
      selectList: ["综合排序","按更新时间","按点赞数","按浏览量"],
      cardList: [
        { id: 1, 
          name: 'ERNIE-VILG', 
          desc: "文心知识增强跨模态图文生成大模型", 
          labels: ['基础模型', '文心大模型', '图文生成', '跨模态'],
          // selects: ['支持训练', '在线体验', '支持PaddleX'],
        },
        { id: 2, 
          name: 'ERNIE 3.0', 
          desc: "ERNIE 3.0 轻量级模型", 
          labels: ['基础模型', '预训练模型', '自然语言处理'],
          selects: ['支持训练'],
        },
        { id: 3, 
          name: 'PP-LCNetv2', 
          desc: "面向Intel CPU端的轻量级卷积神经网络", 
          labels: ['图像分类', '基础模型', '计算机视觉'],
          selects: ['支持训练', '支持体验'],
        },
        { id: 4, 
          name: 'ResNet50', 
          desc: "ResNet50是图像分类模型", 
          labels: ['图像分类', '基础模型', '计算机视觉'],
          selects: ['支持训练', '支持体验', '支持PaddleX'],
        },
        { id: 5, 
          name: 'PP-ChatOCR', 
          desc: "PP-ChatOCR是一款结合PP-OCR和文心大模型的应用，致力于实现从图片到关键信息抽取的端到端体验，适用于所有通用场景。", 
          labels: ['关系抽取', '产业方案', '计算机视觉'],
          selects: ['支持体验', '支持PaddleX'],
        },
        { id: 6, 
          name: 'PP-TTS', 
          desc: "飞桨开源流式语音合成系统", 
          labels: ['语音合成', '基础模型', '智能语音'],
          selects: ['支持体验', '支持体验'],
        },
      ],
      modelTypeList: ['图像分类', '文字识别', '目标检测'],
      labelList: [
        { title: '模型类型', labelVals: ['基础模型', '产业方案', '创意工坊'] },
        { title: '任务类型', labelVals: ['图像分类', '目标检测', '图像分割', '文字识别', '预训练模型', '关系抽取', '图文生成', '语音识别', '语音合成'] },
        { title: '数据集类型', labelVals: ['lmageNet1k', 'ICDAR2017-RCTW-17', 'Kinetics-400', 'LibriSpeech', 'Aishell3', 'MSCOCO', 'ADE20K', 'RCSB PDB', 'Aliproduct', 'GLDv2'] },
      ]
    };
  },

  mounted() {
    
  },

  methods: {
    onSearch() {},

    checkboxChange() {},

    modelClick(item) {
      console.log(item)
      let routeData = this.$router.resolve({
        path: `/modelsDetail`,
        query: { modelId: item.id }
      });
      console.log(routeData)
      window.open(routeData.href, "_blank");
    },

    createModel() {
      let routeData = this.$router.resolve({
        path: '/createModel'
      });
      window.open(routeData.href, "_blank");
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/aiModel.scss';
.aiModelCenterMain {
  background: url(../../assets/img/mainbg.png) 0 0 no-repeat;
  background-position: top right;
  background-position-y: -50px;
  background-size: auto 360px;
  // padding-top: 120px;
  .aiModelTop {
    height: 190px;
    margin: 0 auto;
    padding-bottom: 44px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @media (max-width: 1134px) {
      width: 934px;
      margin: 0 100px;
    }
    @media (min-width: 1134px) and (max-width: 1222px) {
      width: calc(100% - 200px);
      min-width: 934px;
      max-width: 1022px;
      margin: 0 100px;
    }
    @media (min-width: 1222px) and (max-width: 1412px) {
      width: 1022px;
    }
    @media (min-width: 1412px) and (max-width: 1876px) {
      width: calc(100% - 200px);
      min-width: 1212px;
      max-width: 1676px;
      margin: 0 100px;
    }
    @media (min-width: 1876px) {
      width: 1676px;
    }
    .aiModelTopInfo {
      width: calc(100% - 555px);
      margin-top: 50px;
      .aiModelTopInfoTitle {
        font-family: PingFangTC-Semibold;
        font-size: 38px;
        color: #000;
        letter-spacing: 0;
        line-height: 40px;
        font-weight: 600;
        margin-bottom: 12px;
      }
      .aiModelTopInfoDesc {
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
        line-height: 26px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
      }
    }
    .aiModelTopRight {
      width: 390px;
      align-self: flex-end;
      display: flex;
      .aiModelTopSearch {
        flex: 1;
        height: 60px;
        .aiModelTopSearchInput {
          padding: 11px 20px !important;
          border-radius: 0 !important;
        }
      }
    }
  }
  .aiModelContent {
    margin: 0 100px;
    display: flex;
    @media (max-width: 1134px) {
      width: 934px;
      margin: 0 100px;
    }
    @media (min-width: 1134px) and (max-width: 1222px) {
      width: calc(100% - 200px);
      min-width: 934px;
      max-width: 1022px;
    }
    @media (min-width: 1222px) and (max-width: 1412px) {
      margin: auto;
      width: 1022px;
    }
    @media (min-width: 1412px) and (max-width: 1876px) {
      width: calc(100% - 200px);
      min-width: 1212px;
      max-width: 1676px;
    }
    @media (min-width: 1876px) {
      margin: auto;
      width: 1676px;
    }
    .aiModelLeft {
      width: 314px;
      min-height: 1093px;
      margin-right: 70px;
      position: relative;
      .aiModelLeftItem {
        box-sizing: border-box;
        .aiModelLeftItemTitle {
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #000;
          line-height: 26px;
          font-weight: 500;
          margin-bottom: 16px;
        }
        .aiModelLeftItemContent {
          margin-bottom: 10px;
        }
      }
    }
  }
  .aiModelList {
    overflow: hidden;
    width: calc(100% - 384px);
    height: 100%;
    @media (max-width: 1134px) {
      width: 550px;
    }
    @media (min-width: 1134px) and (max-width: 1222px) {
      min-width: 550px;
      max-width: 638px;
    }
    @media (min-width: 1222px) and (max-width: 1412px) {
      width: 638px;
    }
    @media (min-width: 1412px) and (max-width: 1876px) {
      min-width: 828px;
      max-width: 1292px;
    }
    @media (min-width: 1876px) {
      width: 1292px;
    }
    .aiModelListHeader {
      display: flex;
      justify-content: space-between;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 400;
      height: 60px;
      align-items: flex-start;
      .aiModelListHeaderTitle {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #000;
        line-height: 26px;
        font-weight: 500;
      }
      .aiModelListHeaderCreate {
        height: 28px;
        line-height: 28px;
      }
      .aiModelListHeaderTatalCount {
        flex-grow: 1;
        height: 22px;
        // margin-left: 20px;
        width: fit-content;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        line-height: 28px;
        font-weight: 400;
      }
      .aiModelListHeaderFunc {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
    .aiModelListWapper {
      min-height: 1050px;
      --cardNumber: 3;
      --language: "zh-CN";
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
      .aiModelListWapperCardcontainer {
        max-width: 638px;
        height: 216px;
        display: flex;
        flex: 0 0 auto;
        margin-right: 16px;
        margin-bottom: 16px;
        background-image: linear-gradient(179deg, rgba(248, 249, 251, 0.8) 0%, #f8f9fb 100%);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04);
        border: 1.5px solid #eeeeee;
        cursor: pointer;
        @media (max-width: 1134px) {
          width: 550px;
        }
        @media (min-width: 1134px) and (max-width: 1222px) {
          min-width: 550px;
          width: 100%;
        }
        @media (min-width: 1222px) and (max-width: 1412px) {
          width: 638px;
        }
        @media (min-width: 1412px) and (max-width: 1876px) {
          min-width: 406px;
          width: calc((100% - 16px) / 2);
        }
        @media (min-width: 1876px) {
          width: 638px;
        }
        &:nth-child(even) {
          margin-right: 0;
        }
        &:hover {
          border-color: $themeColor;
        }
        &:hover .aiModelListWapperCard .aiModelListWapperCardRight .aiModelListWapperCardRightTop .aiModelListWapperCardRightName {
          color: $themeColor;
        }
        .aiModelListWapperCard {
          display: flex;
          width: 100%;
          border: 1px solid #f8f9fb;
          background-position: top right;
          background-repeat: no-repeat;
          background-size: auto 76px;
          .aiModelListWapperCardRight {
            flex-direction: column;
            justify-content: space-between;
            display: flex;
            flex-wrap: nowrap;
            margin: 20px;
            margin-bottom: 6px;
            width: calc(100% - 52px);
            background-position: top right;
            background-repeat: no-repeat;
            .aiModelListWapperCardRightTop {
              width: 100%;
              position: relative;
              display: flex;
              .aiModelListWapperCardRightName {
                position: relative;
                width: fit-content;
                margin-right: 8px;
                max-width: calc(100% - 88px);
                font-family: PingFangSC-Medium;
                font-size: 18px;
                color: #000;
                letter-spacing: 0;
                line-height: 26px;
                font-weight: 500;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
            .aiModelListWapperCardRightBolongto {
              display: flex;
              width: 100%;
              height: 26px;
              margin-top: 10px;
              margin-bottom: 6px;
            }
            .aiModelListWapperCardRightDesc {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #666666;
              letter-spacing: 0;
              line-height: 20px;
              font-weight: 400;
              width: calc(100% - 48px);
              height: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
            }
            .aiModelListWapperCardRightDetail {
              width: 100%;
              padding-top: 20px;
              display: flex;
              align-items: center;
              span {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                letter-spacing: 0;
                line-height: 18px;
                font-weight: 400;
                max-width: 60px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-right: 12px;
                color: #999;
              }
            }
          }
        }
      }
    }
    .aiModelListPagination {
      display: flex;
      margin: 24px 0 60px 0;
      justify-content: center;
    }
  }
}

</style>