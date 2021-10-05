<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>证书相关</el-breadcrumb-item>
      <el-breadcrumb-item>毕业证书</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="no" v-loading="loading" v-show="!IsExist">
      <span v-show="noneExist">未查询到你的毕业信息</span>
    </div>
    <div class="cert" v-show="IsExist">
      <span id="name" style="left: 654px; top: 109px">说啥啥都队</span>
      <span id="sex" style="left: 830px; top: 108px">{{ this.sex }}</span>
      <span id="borthYear" style="left: 885px; top: 109px">2000</span>
      <span id="borthMonth" style="left: 645px; top: 158px">1</span>
      <span id="borthDay" style="left: 723px; top: 158px">1</span>
      <span id="enYear" style="left: 854px; top: 158px">2020</span>
      <span id="enMonth" style="left: 595px; top: 215px">12</span>
      <span id="lssuingYear" style="left: 690px; top: 215px">{{
        this.lssuingTime.split("-")[0]
      }}</span>
      <span id="lssuingMonth" style="left: 795px; top: 215px">{{
        this.lssuingTime.split("-")[1]
      }}</span>
      <span
        id="picture"
        style="left: 170px; top: 270px; width: 170px; height: 195px"
        ><img :src="src"
      /></span>
      <span id="major" style="left: 690px; top: 272px">{{ this.major }}</span>
      <span id="eSys" style="left: 510px; top: 329px">{{ this.eSys }}</span>
      <span id="eSys" style="left: 680px; top: 498px; font-size: 25px">区块链大学</span>
      <span id="eSys" style="left: 745px; top: 550px">{{
        this.lssuingTime.split("-")[0]
      }}</span>
      <span id="eSys" style="left: 825px; top: 550px">{{
        this.lssuingTime.split("-")[1]
      }}</span>
      <span id="eSys" style="left: 875px; top: 550px">{{
        this.lssuingTime.split("-")[2]
      }}</span>
      <span id="CertNum" style="left: 150px; top: 570px; color: red"
        >NO.{{ this.certNo }}</span
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      IsExist: false,
      noneExist: false,
      name: "",
      lssuingTime: "",
      sex: "男",
      major: "",
      eSys: "",
      certNo: "",
      src: "",
      loading: false,
    };
  },
  methods: {
    FormData(data) {
      var date = new Date(Number(data) * 1000);
      data = date.toLocaleDateString().replace(/\//g, "-");
      return data;
    },
  },
  mounted() {
    //写在mounted或者activated生命周期内即可
    var that = this;
    this.loading = true;
    // var range = ['姓名 ', '部门 ', '证书编号 ', '发证时间 ', '身份证号 ', '特殊情况 ', '处罚情况 ', '院校名称 ', '学历类别 ', '培养层次 ', '学制 ', '入学年份 ', '是否毕业 ', '照片 '];
    // var getRange = [];
    var keystore = localStorage.getItem("keystore");
    var code = localStorage.getItem("code");
    sessionStorage.removeItem("CertInfo");
    // localStorage.removeItem('tokenInfo')
    this.axios
      .get("https://api-vnt.fdkevin.xyz/getCertificateInfo", {
        headers: { Authorization: keystore, code: code },
      })
      .then(
        function (response) {
          console.log(response);
          if (response.data.certificateNum == "") {
            that.$alert("未查询到你的毕业信息", "警告", {
              confirmButtonText: "确定",
              type: "warning",
            });
            that.loading = false;
            that.IsExist = false;
            that.noneExist = true;
          } else {
            that.name = response.data.studentName;
            that.lssuingTime = that.FormData(response.data.lssuingTime);
            that.major = response.data.department;
            that.eSys = response.data.educationalSystem;
            that.certNo = response.data.certificateNum;
            that.src = response.data.picture;
            that.IsExist = true;
            that.noneExist = false;
            that.loading = false;
          }
        },
        function (err) {
          that.$alert("未查询到你的毕业信息", "警告", {
            confirmButtonText: "确定",
            type: "warning",
          });
          that.loading = false;
          that.IsExist = false;
          that.noneExist = true;
        }
      );
  },
};
</script>
<style scoped>
.cert {
  position: relative;
  width: 1000px;
  height: 707px;
  margin-left: 20%;
  background: url("E:/网站/学位学历认证/server/src/img/cert.jpg");
  background-size: contain;
}
.cert span {
  font-size: 18px;
  font-weight: 700;
  position: absolute;
}
.cert span img {
  width: 170px;
  height: 195px;
}
.no {
  width: 1000px;
  height: 707px;
  margin-left: 20%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0);
}
.el-breadcrumb__item {
  font-size: 16px !important;
}
</style>
