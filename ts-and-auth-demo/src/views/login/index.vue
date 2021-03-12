<template>
  <!-- 登录 -->
  <div class="login">
    <div class="title">
      <h1>彭彭网欢迎您</h1>
    </div>
    <div class="login-form">
      <a-form-model layout="horizontal" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="用户名">
          <a-input v-model="form.name" placeholder="请输入用户名" />
        </a-form-model-item>
        <a-form-model-item label="密码">
          <a-input v-model="form.password" placeholder="请输入密码" />
        </a-form-model-item>
      </a-form-model>
      <a-button class="btn" type="primary" @click="userLogin">
        登录
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue';
import { Vue, Component } from 'vue-property-decorator';
import { userLogin } from '../../api/login';

// 没声明装饰器读取的this是null
@Component
export default class Login extends Vue{
  private form: object = {name: '', password: ''};
  labelCol = { span: 7 };
  wrapperCol = { span: 10 };

  created(): void {
    console.log(this,'this111')
  }

  private async userLogin(): Promise<any> {
    // 用户登录
    const params = {
      name: (this as any).form.name,
      password: (this as any).form.password
    }
    const res = await userLogin(params);
    const { code, data } = res as any;
    if(code == 200) {
      console.log(data, 'data');
      sessionStorage.setItem('role', data.lists[0].role);
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 800px;
  height: 400px;
  padding-top: 80px;
  background-image: linear-gradient(-70deg, 
		#2982fe 0%, 
		#04d4e7 100%, 
		#7cb1bc 100%, 
		#f38d90 100%), 
	linear-gradient(90deg, 
		#fe9c5f 0%, 
		#f8323f 100%);
	background-blend-mode: normal, 
		normal;
	border-radius: 15px;
  margin: 0 auto;
  margin-top: 256px;

  .btn {
    margin-top: 30px;
    width: 200px;
  }
}
</style>