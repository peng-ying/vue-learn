<template>
  <div class="container">
    <div class="login-form">
      <el-form ref="form" class="form" :model="form" :rules="formRule">
        <el-form-item label="用户名" prop="username">
          <!-- <el-input v-model="form.username"></el-input> -->
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="btn" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
// import { Form as ElForm } from 'element-ui'
import { UserModule } from '../../store/modules/user'
export default class extends Vue {
    private form: object = {username: '', password: ''};
    private formRule: object = {
        username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
        ],
    }

    private login() {
        // 直接写this.$refs.form.validate 提示validate不是方法
        (this as any).$refs.form.validate(async (valid: boolean) => {
            if(valid) {
                UserModule.Login({
                    ...this.form,
                    router: this.$router
                })
            }
        })
        // (this.$refs.form as ElForm).validate(valid => {

        // })
        // this.$notify.success({
        //     title: '提示',
        //     message: '登录成功！'
        // })
        // this.$router.push({name: 'dashboard'})
    }
}
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    background-color: rgb(46, 138, 243);
    overflow: hidden;

    .login-form {
        width: 600px;
        height: 450px;
        margin: 0 auto;
        border: 1px solid #eeeeee;
        padding: 20px;
        background-color: #ffffff;
        margin-top: 15%;

        .form {
            margin-top: 80px;
        }

        .btn {
            width: 90px;
            height: 45px;
            margin-top: 65px;
        }
    }
}
</style>