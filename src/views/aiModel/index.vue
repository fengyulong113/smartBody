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
                <a-input-search size="large" v-model="modelName" placeholder="请输入模型名称" @search="search" />
              </div>
            </a-form-item>
          </div>
        </div>

      </div>
      <a-divider />
      <div class="aiModelContent">

        <div class="aiModelLeft">
          <a-tabs default-active-key="1" @change="tabsChange">
            <a-tab-pane key="1" tab="标签">
              <div v-if="categoryForm.modelLabel !== ''" class="clearChoose">
                <a-button type="link" size="small" @click="categoryForm.modelLabel = ''">清除选中</a-button>
              </div>
              <a-radio-group v-model="categoryForm.modelLabel">
                <a-radio-button
                  v-for="(e, i) in dictionary.model_label"
                  :key="i"
                  :value="e.value">
                  {{ e.text }}
                </a-radio-button>
              </a-radio-group>
            </a-tab-pane>
            <a-tab-pane
              v-for="(item, i) in categotyList"
              :key="item.id" 
              :tab="item.name">
              <div v-if="categoryForm.modelLibrary !== ''" class="clearChoose">
                <a-button type="link" size="small" @click="categoryForm.modelLibrary = ''">清除选中</a-button>
              </div>
              <a-radio-group v-if="subCategroy.level < 2" v-model="categoryForm.modelLibrary">
                <a-radio-button
                  v-for="(e, i) in subCategroy.data"
                  :key="i"
                  :value="e.name">
                  {{ e.name }}
                </a-radio-button>
              </a-radio-group>
              
              <div v-else>
                <div v-if="categoryForm.modelTask !== ''" class="clearChoose">
                  <a-button type="link" size="small" @click="categoryForm.modelTask = ''">清除选中</a-button>
                </div>
                <div class="aiModelLeftItem" v-for="(item, i) in subCategroy.data" :key="i">
                  <div class="aiModelLeftItemTitle">
                    {{ item.name }}
                  </div>
                  <div v-if="item.childData && item.childData.length > 0" class="aiModelLeftItemContent">
                    <a-radio-group v-model="categoryForm.modelTask">
                      <a-radio-button
                        v-for="(e, i) in item.childData"
                        :key="i"
                        :value="e.name">
                        {{ e.name }}
                      </a-radio-button>
                    </a-radio-group>
                  </div>
                </div>
              </div>

            </a-tab-pane>
          </a-tabs>
          
        </div>

        <div class="aiModelList">

          <div class="aiModelListHeader">
            <div class="aiModelListHeaderTitle">模型列表</div>
            <div class="aiModelListHeaderCreate">
              <a-button @click="createModel" style="height: 100%;font-size: 13px;color: #2b32d8;" type="link">创建模型</a-button>
            </div>
            <div class="aiModelListHeaderTatalCount">
              共{{ total }}个结果
            </div>
            <div class="aiModelListHeaderFunc">
              <a-checkbox-group
                v-model="checkboxValue"
                name="checkboxgroup"
                :options="plainOptions"
                style="margin-right: 10px"
              />
            </div>
          </div>

          <div class="aiModelListWapper">
            <div class="aiModelListWapperCardcontainer" @click="modelClick(item)" v-for="(item, i) in modelList" :key="i">
              <div class="aiModelListWapperCard">
                <div class="aiModelListWapperCardRight">

                  <div class="aiModelListWapperCardRightTop">
                    <div class="aiModelListWapperCardRightName">{{ item.modelName }}</div>
                  </div>

                  <div class="aiModelListWapperCardRightBolongto">
                    <a-radio-button v-for="(e, i) in item.labels.slice(0, 3)" :key="i">
                      {{ e }}
                    </a-radio-button>
                    <a-popover v-if="item.labels.length > 3">
                      <template slot="content">
                        <div style="display: flex;">
                          <a-radio-button v-for="(e, i) in item.labels.slice(3)" :key="i">
                            {{ e }}
                          </a-radio-button>
                        </div>
                      </template>
                      <a-radio-button>
                        <SvgIcon icon-class="more" @click.native.stop="e => e.preventDefault()" />
                      </a-radio-button>
                    </a-popover>
                  </div>

                  <div class="aiModelListWapperCardRightDesc">
                    {{ item.modelDesc }}
                  </div>

                  <div class="aiModelListWapperCardRightDetail">
                    <div v-if="item.isOnlineUse !== '否'">
                      <SvgIcon icon-class="dot" />
                      <span class="aiModelListWapperCardRightDetailTrain">在线体验</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="aiModelListPagination">
            <a-pagination
              show-size-changer
              v-model="pageNo"
              :page-size="pageSize"
              :default-current="1"
              :page-size-options="pageSizeOptions"
              :total="total"
              style="line-height: 3.5"
              @change="currentChange"
              @showSizeChange="showSizeChange">
              <template slot="buildOptionText" slot-scope="props">
                <span style="color: #000">{{ props.value }}条/页</span>
              </template>
            </a-pagination>
          </div>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';
import { mapGetters } from 'vuex';
import {
  selectByConditions,
  insertModel,
} from '@/api/aiModel'
import {
  getRootList,
  getChildList
} from '../../api/dictionary'
export default {
  name: 'AiModel',
  components: {
    SvgIcon
  },
  data() {
    return {
      categotyList: [],
      subCategroy: {},
      categoryForm: {
        modelLabel: "",
        modelTask: "",
        modelLibrary: "",
        modelLanguage: "",
      },
      modelName: "",
      modelList: [],
      total: 0,
      checkboxValue: [],
      pageSizeOptions: ['20', '40', '60', '80'],
      pageNo: 1,
      pageSize: 20,
      plainOptions: [
        { label: "在线体验", value: "在线体验"},
      ],
    };
  },

  mounted() {
    this.search();
    this.getCategotyData()
  },
  computed: {
    ...mapGetters(['dictionary'])
  },
  watch: {
    categoryForm: {
      handler(val) {
        this.search();
      },
      deep: true
    },
    checkboxValue: {
      handler(val) {
        this.search();
      }
    }
  },
  methods: {
    search() {
      const params = {
        isOnlineUse: this.checkboxValue.includes('在线体验') ? '是' : '',
        labels: this.categoryForm.modelLabel,
        modelLibrary: this.categoryForm.modelLibrary,
        modelName: this.modelName,
        modelTask: this.categoryForm.modelTask,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      selectByConditions(params).then(res => {
        this.modelList = res.data.data.list;
        this.total = res.data.data.total;
      })
    },

    getCategotyData() {
      const params = {
        column: "createTime",
        order: "desc",
        filed: "id, name",
        pageNo: 1,
        pageSize: 200
      }
      getRootList(params).then(res => {
        this.categotyList = res.data.result.records;
      })
    },

    // 标签页更改
    tabsChange(key) {
      if(key !== 1) {
        const params = {
          pid: key,
          column: "createTime",
          order: "desc",
          filed: "id, name",
          pageNo: 1,
          pageSize: 200
        }
        getChildList(params).then(res => {
          res = res.data.result;
          if(res.every((item) =>  item.hasChild === '1')) {
            res.forEach((record) => {
              getChildList({ 
                pid: record.id,
                column: "createTime",
                order: "desc",
                filed: "id, name",
                pageNo: 1,
                pageSize: 200
              }).then(r => {
                record.childData = r.data.result;
                this.subCategroy = {
                  data: res,
                  level: 2
                };
              })
            })
          } else {
            this.subCategroy = {
              data: res,
              level: 1
            };
          }
        })
      }
    },

    // 模型点击
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
    },


    // 分页
    showSizeChange(pageNo, pageSize) {
      this.pageSize = pageSize;
      this.pageNo = pageNo;
      this.search()
    },
    currentChange(pageNo, pageSize) {
      this.pageSize = pageSize;
      this.pageNo = pageNo;
      this.search()
    },
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
      .clearChoose {
        height: 30px;
        line-height: 30px;
        text-align: right;
      }
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
/deep/ .ant-tabs-nav .ant-tabs-tab {
  padding: 17px 0 17px;
}
</style>