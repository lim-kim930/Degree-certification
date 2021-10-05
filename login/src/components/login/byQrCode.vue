<template>
  <el-form ref="form">
    <h3 style="font-weight: 400; margin-bottom: 30px; color:#909399">密钥登陆</h3>
    <el-form-item style="margin-bottom: 27px">
      <el-button type="primary" style="width: 330px; height: 40px;" onclick="path.click()">请选择密钥文件<i class="el-icon-upload el-icon--right"></i></el-button>
      <input type="file" id="path" style="display:none" @change="readFile()">
    </el-form-item>
    <el-form-item  style="margin-bottom: 27px">
      <el-input type="password" placeholder="请输入密钥" v-model='code' style="width: 330px;" prefix-icon="el-icon-key" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit()" style="width: 330px;" :loading="btnLoad">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      code: "",
      keystore: "",
      btnLoad: false,
    };
  },
  methods: {
    onSubmit() {
      this.btnLoad = true
      localStorage.setItem('keystore', this.keystore)
      localStorage.setItem('code', this.code)
      this.axios({
          method: "get",
          url: "https://api-vnt.fdkevin.xyz/getRole",
          headers: { Authorization: this.keystore, code: this.code },
      })
      .then(function (response) {
          if(response.data.role == 'student')
            window.location.href = '../student/index.html'
          else if(response.data.role == 'HR')
            window.location.href = '../hr/index.html'
          else if(response.data.role == 'deansOffice')
            window.location.href = '../deansoffice/index.html'
          else if(response.data.role == 'superisoryBody')
            window.location.href = '../superisoryBody/index.html'
      });
    },
    readFile() {
      var input = document.querySelector('#path')
      var reader = new FileReader()
	    reader.readAsText(input.files[0], 'utf8') // input.files[0]为第一个文件
	    reader.onload = () => {
		  this.keystore = reader.result;
      console.log(reader.result);
		//document.body.innerHTML += reader.result  // reader.result为获取结果
	    }
    }
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
