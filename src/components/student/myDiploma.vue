<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>证书相关</el-breadcrumb-item>
      <el-breadcrumb-item>学位证书</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="no" v-loading="loading" v-show="!IsExist">
      <span v-show="noneExist">未查询到你的毕业信息</span>
    </div>
    <div class="cert" v-show="IsExist">
      <span id="name" style="left: 565px; top: 93px">说啥啥都队</span>
      <span id="sex" style="left: 685px; top: 93px">{{this.sex}}</span>
      <span id="borthYear" style="left: 545px; top: 121px">2000</span>
      <span id="borthMonth" style="left: 638px; top: 121px">1</span>
      <span id="enYear" style="left: 535px; top: 155px">2020</span>
      <span id="enMonth" style="left: 608px; top: 155px">12</span>
      <span id="lssuingYear" style="left: 695px; top: 155px">{{this.lssuingTime.split('-')[0]}}</span>
      <span id="lssuingMonth" style="left: 775px; top: 155px">{{this.lssuingTime.split('-')[1]}}</span>
      <span id="picture" style="left: 820px; top: 59px; width: 140px; height: 175px;"><img :src='src'></span>
      <span id="major" style="left: 610px; top: 230px; font-size:25px">{{this.major}}</span>
      <span id="eSys" style="left: 645px; top: 295px">{{this.eSys}}</span>
      <span id="eSys" style="left: 780px; top: 575px">{{this.lssuingTime.split('-')[0]}}</span>
      <span id="eSys" style="left: 860px; top: 575px">{{this.lssuingTime.split('-')[1]}}</span>
      <span id="eSys" style="left: 905px; top: 575px">{{this.lssuingTime.split('-')[2]}}</span>
      <span id="eSys" style="left: 670px; top: 397px">{{this.learnType}}</span>
      <span id="CertNum" style="left: 700px; top: 630px; color: red">NO.{{this.certNo}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      IsExist: false,
      noneExist: false,
      name: '',
      lssuingTime: '',
      sex: '男',
      major: '',
      eSys: '',
      certNo: '',
      src: '',
      learnType: '',
      loading: false
    };
  },
  methods: {
    FormData(data) {
      var date = new Date(Number(data) * 1000);
      data = date.toLocaleDateString().replace(/\//g, "-");
      return data
    }
  },
  mounted() {
    //写在mounted或者activated生命周期内即可
    var that = this;
    var success = 0
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
            that.$alert("未查询到你的学位信息", "警告", {
              confirmButtonText: "确定",
              type: "warning",
            });
            that.loading = false;
            that.IsExist = false;
            that.noneExist = true;
          } else {
            that.name = response.data.studentName
            that.lssuingTime = that.FormData(response.data.lssuingTime)
            that.major = response.data.department
            that.eSys = response.data.educationalSystem
            that.certNo = response.data.certificateNum
            that.src = response.data.picture
            that.loading = false;
            that.IsExist = true;
            that.noneExist = false;
          }
        },
        function (err) {
            that.$alert("未查询到你的毕业信息", "警告", {
              confirmButtonText: "确定",
              type: "warning",
            })
            that.loading = false;
            that.IsExist = false;
            that.noneExist = true;
        }
      );
    this.axios
      .get("https://api-vnt.fdkevin.xyz/getStudentInfo", {
        headers: { Authorization: keystore, code: code },
      })
      .then(
        function (response) {
          console.log(response);
          
          switch(response.data.learnType){
            case "1" :
              response.data.learnType = "普通高等教育"
              break
            case "2" :
              response.data.learnType = "博士"
              break
            case "3" :
              response.data.learnType = "硕士"
              break
            case "4" :
              response.data.learnType = "学士学位"
              break
            case "5" :
              response.data.learnType = "成人高等教育"
              break
            case "6" :
              response.data.learnType = "自学考试"
              break
            case "7" :
              response.data.learnType = "网络教育"
              break
          }
          that.learnType = response.data.learnType
        },
        function (err) {
            that.$alert("未查询到你的毕业信息", "警告", {
              confirmButtonText: "确定",
              type: "warning",
            })
            that.loading = false
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
  width:1000px;
  height: 707px;
  margin-left: 20%;
  background: url('E:/网站/学位学历认证/server/src/img/diploma.jpg');
  background-size: contain;
}
.cert span {
  font-size: 18px;
  font-weight: 700;
  position: absolute;
}
.cert span img {
  height: 175px;
  width: 140px;
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
