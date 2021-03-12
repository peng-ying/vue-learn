<template>
<!-- 首页管理页 -->
  <div class="home-manage">
    <div class="menus-con">
      <div class="my-menus">
        <el-menu v-for="(item,index) in menus" :key="index" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true" @select="handleSelect">
          <component class="menu-item"
            :is="(item.children&&item.children.length>0)?'el-submenu':'el-menu-item'" :index="item.index">
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            <template v-if="item.children&&item.children.length>0">
              <el-menu-item class="menu-item" v-for="(v,i) in item.children" :key="i" :index="`${v.index}?index=${i}`">
                <span slot="title">{{v.name}}</span>
              </el-menu-item>
            </template>
          </component>
        </el-menu>
    </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      activeIndex: '/home/homepage'
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.activeIndex = this.$route.fullPath;
      },
      immediate: true,
      // deep: true, //深度监听，同时也可监听到param参数变化
    }
  },
  methods: {
    handleSelect(indexpath) {
      // 选中菜单项
      this.activeIndex = indexpath;
      // sessionStorage.setItem('indexPath', indexpath);
    },
  }
}
</script>


<style lang="less" scoped>
.home-manage {
  .menus-con {
    width: 100%;
    position: relative;
    z-index: 2;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.13);
  }
  .my-menus {
    width: 1200px;
    margin: 0 auto;
    text-align: left;
    padding-bottom: 28px;
    .el-menu-demo {
      display: inline-block;
    }
  }
  .content {
    background:#f7f7f7;
  }
}
</style>

<style lang="less">
.my-menus {
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    color: #333333;
  }
  .el-menu--horizontal>.el-menu-item {
    color: #333333;
  }
  .el-menu-item.is-active {
    color: #00a0e9;
  }
  .el-menu-item {
    font-size: 18px;
  }
  .el-submenu__title {
    font-size: 18px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
}
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title {
  color: #333333 !important;
}
</style>
