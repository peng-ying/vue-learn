<template>
  <div class="data-view-setting">
    <div class="content">
      <div class="title">
        <h3>可视化设置</h3>
        <a-icon
          type="close-circle"
          style="fontSize: 24px; color: #fff; padding-top: 8px;"
          @click="close"
        />
      </div>
      <div class="bottom" id="bottom">
        <div class="toolbox">
          <a-select
            class="select"
            dropdownClassName="selectOpen"
            :dropdownStyle="{color: '#fff'}"
            default-value="lucy"
            size="small"
            style="width: 170px"
            @change="handleSelectChange"
          >
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
          </a-select>
          <!-- <div class="part">
            <div class="tool">
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                :showUploadList="false"
                :beforeUpload="handleBeforeUpload"
                @change="handleBgChange"
              >
                <a-icon type="upload" style="fontSize: 32px; color: #fff; padding-top: 8px;" />
              </a-upload>
              <p>上传背景</p>
            </div>
            <div class="tool"  @click="showBgLists">
              <a-icon type="picture" style="fontSize: 32px; color: #fff; padding-top: 8px;" />
              <p>浏览背景</p>
            </div>
            <div class="tool">
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                :showUploadList="false"
                :beforeUpload="handleBeforeUpload"
                @change="handleIconChange"
              >
                <a-icon type="upload" style="fontSize: 32px; color: #fff; padding-top: 8px;" />
              </a-upload>
              <p>上传图标</p>
            </div>
            <div class="tool"  @click="showIconLists">
              <a-icon type="picture" style="fontSize: 32px; color: #fff; padding-top: 8px;" />
              <p>浏览图标</p>
            </div>
          </div>-->
          <div class="part">
            <div class="tool" @click="addDevice">
              <a-icon type="plus-circle" style="fontSize: 32px; color: #fff; padding-top: 8px;" />
              <p>增加设备</p>
            </div>
            <div class="tool" @click="deleteDevice">
              <a-icon type="minus-circle" style="fontSize: 32px; color: #fff; padding-top: 8px;" />
              <p>删除设备</p>
            </div>
          </div>
          <div class="part">
            <div class="tool" @click="saveThisPage">
              <a-icon type="save" style="fontSize: 32px; color: #fff; padding-top: 8px;" />
              <p>保存</p>
            </div>
            <div class="tool" @click="resetThisPage">
              <a-icon type="delete" style="fontSize: 32px; color: #fff; padding-top: 8px;" />
              <p>清空</p>
            </div>
          </div>
        </div>

        <bg-view v-if="showBg" @close="closeBgView" @changeBg="changeBg" />
        <icon-view v-if="showIcon" @close="closeIconView" />
        <dev-view
          v-if="showDev"
          :deviceLists="deviceLists"
          @close="closeDevView"
          @saveDev="saveDevice"
        />
        <img class="drag-container_img" :src="backgroundURL" alt />
        <div class="drag-container" id="container" @drop="dropMethod($event)" @dragover.prevent>
          <!-- <div class="item" style="position:absolute;left:0;top:0;" id="1" draggable="true" @dragstart="dragMethod($event, '1')">
            <img class="image" src="../../../../public/imgs/icon-19.png" alt="">
            <span>网络摄像机1</span>
          </div>
          <div class="item" style="position:absolute;left:0;top:50px;" id="2" draggable="true" @dragstart="dragMethod($event, '2')">
            <img class="image" src="../../../../public/imgs/icon-dial2_red.png" alt="">
            <span>温度检测</span>
          </div>
          <div class="item" style="position:absolute;left:0;top:100px;" id="3" draggable="true" @dragstart="dragMethod($event, '3')">
            <img class="image" src="../../../../public/imgs/icon-water_red.png" alt="">
            <span>漏水检测</span>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bgView from './bgView.vue'
import iconView from './iconView.vue'
import devView from './devView.vue'
import { sblbList, sblb2List, sbglAddList, sxtData } from '../../../api/api.js'
export default {
  components: {
    bgView,
    iconView,
    devView
  },
  props: ['info', 'show'],
  data() {
    const deviceLists = [
      { name: '温湿度感应器', img: require('../../../../public/imgs/icon-dial2_red.png'), value: 1 },
      { name: '空气质量云测仪', img: require('../../../../public/imgs/icon-kongtiao3_red.png'), value: 4 },
      { name: '烟雾感应器', img: require('../../../../public/imgs/icon-20_red.png'), value: 3 },
      { name: '漏水感应器', img: require('../../../../public/imgs/icon-water_red.png'), value: 2 },
      { name: '蓄电池智能参数传感器', img: require('../../../../public/imgs/icon-ec2_red.png'), value: 5 },
      { name: '摄像头', img: require('../../../../public/imgs/icon-19_red.png'), value: 999 }
    ]
    return {
      showBg: false,
      showIcon: false,
      showDev: false,
      backgroundURL: '',
      dragOffset: {
        X1: null,
        Y1: null
      },
      domElement: null,
      elLeftAndTop: {},
      imgList: [
        { id: 1, src: 'imgs/海绵icon.png' }
        // {id: 2, src: 'imgs/插画.png'}
      ],
      deviceLists: deviceLists,
      currentDevice: null
    }
  },
  created() {
    this.initContainer()
    this.getList()
  },
  // watch:{
  //  show(val,old){
  //   console.log(val);
  //   if(val){
  // 	  this.initContainer();
  //   }
  //  }
  // },
  methods: {
    async getList() {
      var res = await sblbList()
      console.log(res)
    },
    initContainer() {
      this.backgroundURL = window._CONFIG['domianURL'] + '/sys/common/static/' + this.info.roomPhoto
      // 获取当前container的内容
      this.$nextTick(() => {
        console.log(this.info)

        document.getElementById('container').innerHTML = this.info.devicePlace
      })
      // debugger
      // container.innerHTML = this.info.devicePlace;
      // console.log(window.atob(this.info.devicePlace), '11111')
      // container.appendChild(JSON.parse(this.info.devicePlace));
    },
    close() {
      // 关闭弹窗
      this.backgroundURL = ''
      document.getElementById('container').innerHTML = ''
      this.$emit('close', false)
    },
    handleSelectChange() {
      // 选择机房
    },
    handleBeforeUpload(file) {
      // 上传文件前的钩子函数
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('请上传jpg或者png格式的图片')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleBgChange(info) {
      // 上传背景文件状态改变的函数
      console.log(info, 'info')
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    handleIconChange() {
      // 上传图标状态改变的函数
    },
    getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },
    showBgLists() {
      // 浏览背景
      this.showIcon = false
      this.showDev = false
      this.showBg = true
    },
    closeBgView(val) {
      // 关闭浏览背景框 子级触发事件
      this.showBg = val
    },
    showIconLists() {
      // 浏览图标
      this.showBg = false
      this.showDev = false
      this.showIcon = true
    },
    closeIconView(val) {
      // 关闭图标框
      this.showIcon = val
    },
    addDevice() {
      // 增加设备
      this.showBg = false
      this.showIcon = false
      this.showDev = true
    },
    deleteDevice() {
      // 删除设备
      let container = document.getElementById('container')
      container.removeChild(this.currentDevice)
    },
    closeDevView(val) {
      // 关闭设备弹窗
      this.showDev = val
    },
    changeBg(val) {
      // 切换背景
      this.$set(this, 'backgroundURL', val)
    },
    async saveDevice(val, key, sensorType) {
      //如果设备为摄像头，需要单独处理
      console.log(val, key, sensorType, 'save接收的参数')
      // 保存设备 val是设备value
      // debugger
      let item = this.deviceLists.filter(i => {
        return i.value === val
      })
      // console.log(item);
      var res1 = await sblbList()

      var str1 = res1.result.records.filter(item => item.id == val)[0].shortName
      //如果为摄像头，这里存摄像头的URL
      var res2 = {}
      var str2 = '', str3;
      if (sensorType == 999) {
        res2 = await sxtData(val)
        console.log(res2, 'camera res2')
        str3 = res2.result.records.length > 1 ? res2.result.records.filter(item => item.id == key)[0].cameraRtmpUrl : ''
      } else {
        res2 = await sblb2List(val)
        str2 = res2.result.records.filter(item => item.id == key)[0].modbusAddressCode
      }
      // var typecode = res2.result.records.filter(item=>item.id == key)[0].sensorType;
      var params = {
        roomId: this.info.id,
        deviceId: key,
        deviceCode: sensorType + '',
      }
      var res3 = await sbglAddList(params)
      item[0].name = str1 + str2
      item[0].id = key
      item[0].cameraRtmpUrl = str3 || '';
      this.create(item[0])
      // this.deviceLists.splice(key, 1);
    },
    create(item) {
      // 创建元素20201102
      console.log(item, 'item')
      let container = document.getElementById('container')
      let div = document.createElement('div')
      div.id = item.id
      // 如果有值就是摄像头
      var cameraRtmpUrl = item.cameraRtmpUrl ? item.cameraRtmpUrl : '';
      div.setAttribute('cameraRtmpUrl', cameraRtmpUrl);
      div.className = 'element'
      div.style.cssText =
        'position: absolute;left: 0;top: 0;background: #636363;color: #fff;border-radius: 10px;line-height: 45px;padding: 0 8px;height: 45px'
      div.setAttribute('class', 'item')
      div.draggable = true
      // 创建img元素
      let img = document.createElement('img')
      img.src = item.img
      img.style.cssText = 'width: 30px;height: 30px;'
      img.setAttribute('class', 'image')
      div.appendChild(img)
      // 创建文字span元素
      let span = document.createElement('span')
      span.innerHTML = item.name
      div.appendChild(span)
      container.appendChild(div)
      let that = this
      // 添加事件 点击事件保存当前item 拖拽事件让元素可拖动
      div.addEventListener('click', function(e) {
        e.currentTarget.style['border'] = '1px solid #13ff00'
        // debugger
        that.currentDevice = div
        console.log(item)
      })
      div.addEventListener('dragstart', function(e) {
        that.domElement = document.getElementById(div.id)
        that.dragOffset.X1 = e.clientX - parseInt(that.domElement.style.left)
        that.dragOffset.Y1 = e.clientY - parseInt(that.domElement.style.top)
      })
      // div.dragstart = this.dragMethod(event, div.id);
      // container.on('dragstart', 'div', this.dragMethod(event, div.id))
    },
    getRandomNum() {
      let num = Math.random() * 100
      return num
    },
    dragMethod(e, id) {
      this.domElement = document.getElementById(id)
      console.log('拖开始了', this.domElement)
      if (this.domElement) {
        // debugger
        this.dragOffset.X1 = e.clientX - parseInt(this.domElement.style.left)
        this.dragOffset.Y1 = e.clientY - parseInt(this.domElement.style.top)
      }
      // 鼠标点击的位置在整个页面上的坐标是（e.clientX，e.clientY）
      // 鼠标点击的位置在图片的位置坐标为（X1，Y1）
      console.log(this.dragOffset, id, 'dragoffset')
    },
    dropMethod(e) {
      // this.domElement = document.getElementById('domElement');
      let fatherWidth = document.getElementById('container').offsetWidth
      let fatherHeight = document.getElementById('container').offsetHeight
      let thisWidth = this.domElement.offsetWidth
      let thisHeight = this.domElement.offsetHeight
      // debugger
      let left = e.clientX - this.dragOffset.X1
      let top = e.clientY - this.dragOffset.Y1
      console.log(left, 'left')
      if (left <= 0) {
        // 左边的距离小于父容器
        left = 0
      } else if (left > fatherWidth - thisWidth) {
        // 右边超出父容器
        left = fatherWidth - this.domElement.offsetWidth
      } else {
        // 正常在父容器里
        this.domElement.style.left = left + 'px'
      }
      if (top <= 0) {
        top = 0
      } else if (top > fatherHeight - thisHeight) {
        top = fatherHeight - this.domElement.offsetHeight
      } else {
        this.domElement.style.top = top + 'px'
      }
      // 根据鼠标点击的位置在整个页面上的坐标和在图片上的坐标来确定整个图片的坐标
      console.log(this.domElement.style)

      this.elLeftAndTop = {
        id: this.domElement,
        left: left,
        top: top
      }
    },
    saveThisPage() {
      // 保存当前页面
      let container = document.getElementById('container')
      // debugger
      // console.log(JSON.stringify(container.innerHTML), 'container')
      // debugger
      // console.log(window.btoa(JSON.stringify(container.innerHTML)), 'axios')
      let that = this
      this.axios
        .put(window._CONFIG['domianURL'] + '/tuopu/tpEngineRoom/edit', {
          // params: {
          id: this.info.id,
          devicePlace: container.innerHTML
          // }
        })
        .then(function(response) {
          if (response.success) {
            that.$emit('close', false)
            that.$message.success('保存成功')
          }
          console.log(response, 'response')
        })
        .catch(function(error) {
          that.$message.error(error.message)
          console.log(error)
        })
      // sessionStorage.setItem('container', container);
    },
    resetThisPage() {
      // 清空当前页面
      let container = document.getElementById('container')
      this.$confirm({
        title: '确定清空当前页面吗？',
        okText: '确认',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          container.innerHTML = ''
        },
        onCancel() {
          console.log('Cancel')
        },
        class: 'test'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.data-view-setting {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 9;
  // background-color: rgba(0,0,0,.5);
  padding-top: 3%;

  .content {
    position: relative;
    width: 86%;
    height: 90%;
    // margin: 0 auto;
    margin-left: 0px;
    margin-top: 20px;
    background-color: rgb(25, 91, 142);
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    height: calc(100% - 40px);
    .toolbox {
      padding: 0 10px;
      background: #306b98;
      width: 200px;
      opacity: 0.8;
      .select {
        margin-top: 14px;
      }

      .part {
        border-bottom: 1px solid #fff;
        margin-top: 10px;
        text-align: center;
        .tool {
          width: 90px;
          height: 90px;
          display: inline-block;
          color: #fff;
          cursor: pointer;
        }
        .tool:hover {
          i {
            opacity: 0.2;
          }
        }
      }
      .part:last-child {
        border: none;
      }
    }
    .drag-container_img {
      // width: 1400px;
      // height: 800px;
      // width: calc(100% - 200px);
      height: calc(100% - 50px);
      position: absolute;
      left: 200px;
      top: 50px;
    }
    .drag-container {
      // width: 1400px;
      // height: 800px;
      width: calc(100% - 200px);
      height: calc(100% - 50px);
      position: absolute;
      left: 200px;
      top: 50px;
      // width: calc(100% - 200px);
      // background-repeat: no-repeat;
      // background-position: center;
      // position: relative;
      // background: url('http://182.92.235.41:8083/ahuboot_tuopu/sys/common/static/temp/F2(2)_1602336483227.png')
    }
  }
}

.toolbox .ant-select-selection {
  background-color: #004882;
  border: 1px solid #487ca4;
  color: #fff;
}
.selectOpen {
  background: #004882;
  color: #fff !important;
}

/* // 可视化设置弹窗title */
.title {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  border-bottom: 1px solid #4392cf;
  background-color: rgb(25, 91, 142);
  h3 {
    color: #fff;
  }
}
.element {
  // position: absolute;
  // left: 10px;
  // top: 20px;
  width: 100px;
  height: 100px;
  cursor: move;
  background: #dedede;
  // padding-left: 10px;
  // padding-right: 5px;
}
.images {
  width: 100%;
  height: 100%;
}
</style>

<style lang="less">
/*
// 创建的设备样式 只能放在公共样式里 */
.item {
  min-width: 100px;
  height: 45px;
  color: #fff;
  padding: 0 8px;
  /* // border: 1px solid #dedede; */
  background: #636363;
  font-size: 14px;
  line-height: 45px;
  border-radius: 10px;
  cursor: move;
}
.image {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  vertical-align: middle;
}
</style>