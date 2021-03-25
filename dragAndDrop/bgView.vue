<template>
  <div class="bgView">
    <div class="title">
      <h3>浏览背景</h3>
      <a-icon type="close-circle" style="fontSize: 24px; color: #fff;padding-top: 8px;" @click="close" />
    </div>
    <div class="content">
      <a-radio-group style="width: 100%; display: flex;" name="radioGroup" :default-value="bgs[0].key">
        <div class="bg" v-for="item in bgs" :key="item.key">
          <img :src="item.bg" alt="">
            <a-radio :value="item.key" @focus="changeBg(item)">{{item.key}}</a-radio>
        </div>
      </a-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgs: [
        { bg: require('../../../assets/imgs/lab1.png'), key: 'lab1', checked: false,},
        { bg: require('../../../assets/imgs/lab2.png'), key: 'lab2', checked: false, },
        { bg: require('../../../assets/imgs/lab3.png'), key: 'lab3', checked: false, }
      ]
    }
  },
  created() {
    // this.changeBg(this.bgs[0]);
  },
  methods: {
    close() {
      // 关闭背景浏览框
      this.$emit('close', false);
    },
    changeBg(val) {
      // 选择背景
      // val.checked = true;
      this.$emit('changeBg', val.bg)
    }
  },
}
</script>

<style lang="less" scoped>
.bgView {
  position: absolute;
  left: 200px;
  top: 100px;
  width: 444px;
  height: 450px;
  z-index: 3;
  overflow-y: auto;
  border: 1px solid #4392cf;
  .content {
    background-color: rgb(25,91,142);
    padding: 10px 30px;
    // width: 100%;
    height: calc(100% - 40px);
    .bg {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 70%;
      height: 60px;
      img {
        width: 105px;
        height: 30px;
        margin: 0 auto;
      }
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #4392cf;
    background-color: rgb(25,91,142);
    h3 {
      color: #fff;
    }
  }
}
</style>