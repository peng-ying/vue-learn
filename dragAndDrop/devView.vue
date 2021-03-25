<template>
	<div class="bgView">
		<div class="title">
			<h3>添加设备</h3>
			<a-icon type="close-circle" style="fontSize: 24px; color: #fff;padding-top: 8px;" @click="close" />
		</div>
		<div class="content">
			<a-form-model layout="horizontal" :model="form" :labelCol="labelCol" :wrapperCol="wrapperCol">
				<a-form-model-item label="设备列表">
					<a-cascader :options="cgqList" :load-data="loadData" placeholder="请选择" change-on-select @change="handleSelectChange" />
					<!-- <a-select size="small" placeholder="请选择" v-model="form.dev" style="width: 200px" @change="handleSelectChange">
						<a-select-option v-for="(i, index) in deviceLists" :key="index" :value="i.value">
							{{ i.name }}
						</a-select-option>x
					</a-select> -->
				</a-form-model-item>
				<!-- <a-form-model-item label="上传图标">
          <div class="pic">
            <img src="../../../../src/assets/imgs/bg.png" alt="">
          </div>
          <a-upload
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            :showUploadList="false"
            @change="handleChange"
          >
            <a-button type="primary">上传</a-button>
          </a-upload>
        </a-form-model-item> -->
				<a-form-model-item>
					<a-button type="primary" @click="saveDev">
						保存
					</a-button>
				</a-form-model-item>
			</a-form-model>
		</div>
	</div>
</template>

<script>
	import {
		sblbList,
		sblb2List,
    sxtData
	} from '../../../api/api.js'
	import {cgqList} from '../../../../public/dpOptions.js'
	export default {
		data() {
			return {
				cgqList,
				options: [],
				form: {
					dev: ''
				},
				labelCol: {
					span: 5,
					offset: 0
				},
				wrapperCol: {
					span: 15,
					offset: 1
				},
				devLists: [
					'a', 'b', 'c'
				],
				headers: {},
        currentKey: 0, // 当前选中的设备序号
        sensorType: ''
			}
		},
		props: {
			deviceLists: {
				type: Array,
				default: () => []
			}
		},
		created() {
			// this.getList()
		},
		methods: {
			async getList() {
				var res = await sblbList()
				console.log(res)
				this.options = [];
				for (var i in res.result.records) {
					this.options.push({
						value: res.result.records[i].id,
						label: res.result.records[i].shortName,
						isLeaf: false,
					})
				}
			},
			close() {
				// 关闭背景浏览框
				this.$emit('close', false);
			},
			handleSelectChange(value, selectedOptions) {
				// select选择框事件
        console.log(value)
        this.sensorType = selectedOptions[0].value;
        console.log(this.sensorType, 'sensortype')
				this.form.dev = value[0]
				this.currentKey = value[1];
			},
			saveDev() {
				// 新增设备保存
				this.$emit('saveDev', this.form.dev, this.currentKey, this.sensorType);
				this.$emit('close', false);
			},
			handleChange() {

			},
			async loadData(selectedOptions) {
				const targetOption = selectedOptions[selectedOptions.length - 1];
				targetOption.loading = false;

        var sensorType = selectedOptions[0].value;
				//如果类型为摄像头999，则为单独的请求；其它设备为同一个请求
        if(sensorType == 999){
          var res = await sxtData(sensorType);
          targetOption.loading = false;
          console.log(res,'shexiangtou999');
          targetOption.children = [];
          for(var i in res.result.records){
            targetOption.children.push({
              label : targetOption.label + res.result.records[i].id,
              sensorType: res.result.records[i].sensorType,
              value: res.result.records[i].id
            })
          }
        }else{
          var res = await sblb2List(sensorType);
          console.log(res)
          this.$set(targetOption, 'loading', false);
          targetOption.children = [];
          for(var i in res.result.records){
            targetOption.children.push({
              label : targetOption.label + res.result.records[i].modbusAddressCode,
              sensorType: res.result.records[i].sensorType,
              value: res.result.records[i].id
            })
          }
        }
				this.options = [...this.options];
				// targetOption.loading = false;
				// setTimeout(() => {
				// 	targetOption.loading = false;
				// 	targetOption.children = [{
				// 			label: `${targetOption.label} Dynamic 1`,
				// 			value: 'dynamic1',
				// 		},
				// 		{
				// 			label: `${targetOption.label} Dynamic 2`,
				// 			value: 'dynamic2',
				// 		},
				// 	];
				// 	this.options = [...this.options];
				// }, 1000);
			},
		},
	}
</script>

<style lang="less" scoped>
	.bgView {
		position: absolute;
		left: 200px;
		top: 100px;
		width: 444px;
		height: 190px;
		z-index: 3;
		overflow-y: auto;
		border: 1px solid #4392cf;

		.content {
			background-color: rgb(25, 91, 142);
			padding: 20px 20px;
			// width: 100%;
			height: calc(100% - 40px);

			.ant-form-item {
				margin-bottom: 0;
				color: #fff;
			}

			.pic {
				width: 132px;
				height: 46px;
				display: inline-block;
				margin-right: 20px;

				img {
					width: 100%;
					height: 100%;
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
			background-color: rgb(25, 91, 142);

			h3 {
				color: #fff;
			}
		}
	}
</style>

<style>
	.content .ant-form-item-label>label {
		color: rgba(255, 255, 255, 0.85);
	}
</style>
