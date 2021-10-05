<template>
  <el-form ref="form">
    <h3 style="font-weight: 400; margin-bottom: 30px; color:#909399">密码登陆</h3>
    <el-form-item style="margin-bottom: 27px">
      <el-input placeholder="请输入帐号" v-model="snum" clearable></el-input>
    </el-form-item>
    <el-form-item  style="margin-bottom: 27px">
      <el-input type="password" placeholder="请输入密码" v-model='password' style="width: 330px;" prefix-icon="el-icon-lock" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" style="width: 330px;" :loading="btnLoad">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      snum: "",
      password: "",
      btnLoad: false,
    };
  },
  methods: {
    onSubmit() {
      var that = this
      this.btnLoad = true
      // localStorage.setItem('code', this.code)
      this.axios({
          method: "get",
          url: "https://api-vnt.fdkevin.xyz/getRoleStudent",
          headers: { Authorization: this.snum, code: this.password },
      })
      .then(function (response) {
        console.log(response.data);
        // console.log(JSON.parse(response));
          if(response.data.role == 'student'){
            localStorage.setItem('keystore', response.data.keystore)
            localStorage.setItem('code', that.password)
            window.location.href = '../student/index.html'
          }
          that.btnLoad = false
      });
    },
  },
};
</script>

<style scoped>
.el-form {
  margin: 70px 130px;
  width: 340px;
  height: 270px;
  padding: 5px 5px;
  background-color: rgba(255, 255, 255, 0);
}
</style>
