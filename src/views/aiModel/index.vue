<template>
  <div class="aiModelCenterMain">
    <a-form layout="horizontal">
      <div class="aiModelTop">
        <div class="aiModelTopInfo">
          <div class="aiModelTopInfoTitle">模型库 Models</div>
          <div class="aiModelTopInfoDesc">
            包含计算机视觉、自然语言处理、智能语音、文心大模型、科学计算、量子计算等任务方向算法，覆盖智慧金融、智慧安防、智慧工业/能源、智慧城市、智慧交通等多行业场景范例
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
        <div class="aiModelLeft"></div>
        <div class="aiModelList"></div>
      </div>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'AiModel',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    onSearch() {},
  },
};
</script>

<style lang="scss" scoped>

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
        height: 52px;
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
    }
  }
}
/deep/ .ant-input-affix-wrapper .ant-input {
  font-size: 13px;
}
/deep/ .ant-divider-horizontal {
    margin: auto;
    margin-bottom: 45px;
}
</style>