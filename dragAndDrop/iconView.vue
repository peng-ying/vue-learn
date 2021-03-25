<template>
  <div class="bgView">
    <div class="title">
      <h3>浏览图标</h3>
      <a-icon type="close-circle" style="fontSize: 24px; color: #fff;padding-top: 8px;" @click="close" />
    </div>
    <div class="content">
      <img v-for="item in icons" :key="item.key" :src="item.icon" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        { icon: 'imgs/icon-19.png', key: '19', },
        { icon: 'imgs/icon-dial2_red.png', key: 'dial2', },
        { icon: 'imgs/icon-ec2_red.png', key: 'ec2', },
        { icon: 'imgs/icon-water_red.png', key: 'water', },
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close', false);
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
    padding: 20px 30px;
    // width: 100%;
    height: calc(100% - 40px);
    text-align: left;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
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