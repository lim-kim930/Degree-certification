<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>我的资料</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form
      v-loading="loading"
    >
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 1200px; font-size: 16px; box-shadow: 0px -1px 5px 1px rgba(0, 0, 0, 0.1);"
    >
      <el-table-column prop="name" label="信息" width="270"></el-table-column>
      <el-table-column prop="value" label="对应值" width="929"></el-table-column>
    </el-table>
    <el-table
      :data="picData"
      stripe
      border
      style="width: 1200px; font-size: 16px; border-top: none; box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);"
      v-loading="loading"
      :show-header="false"
      :cell-style="cellStyle"
    >
      <el-table-column prop="name" label="信息" width="270"></el-table-column>
      <el-table-column label="对应值" width="929">
       <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="scope.row.src" alt="" style="width: 150px; height: 150px">
              <img slot="reference" :src="scope.row.src" style="width: 30px; height: 30px">
            </el-popover>
        </template>
      </el-table-column>
    </el-table>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      picData: [{
          name: "照片",
          src: '',
        },],
      loading: false,
      tableData: [
        {
          name: "学生地址",
          value: '',
        },
        {
          name: "姓名",
          value: '',
        },
        {
          name: "身份证号",
          value: '',
        },
        {
          name: "专业",
          value: '',
        },
        {
          name: "学校名称",
          value: '',
        },
        {
          name: "学历类别",
          value: '',
        },
        {
          name: "培养层次",
          value: '',
        },
        {
          name: "学制",
          value: '',
        },
        {
          name: "入学年份",
          value: '',
        },
        {
          name: "毕业",
          value: '',
        },
        {
          name: "证书编号",
          value: '',
        },
        {
          name: "特殊情况",
          value: '',
        },
        {
          name: "惩罚情况",
          value: '',
        },
      ],
    };
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){//根据报警级别显示颜色
      return {
        backgroundColor: "#cccccc4d",
        padding: "5px 0"
      }
    }
  },
  mounted() { 
    //写在mounted或者activated生命周期内即可
    var that = this;
    this.loading = true;
    var keystore = localStorage.getItem("keystore");
    var code = localStorage.getItem("code");
    this.axios
      .get("https://api-vnt.fdkevin.xyz/getStudentInfo", {
        headers: { Authorization: keystore, code: code },
      })
      .then(
        function (response) {
          console.log(response);
          switch(response.data.educationalLevel){
            case "01" :
              response.data.educationalLevel = "博士生"
              break
            case "02" :
              response.data.educationalLevel = "硕士生"
              break
            case "03" :
              response.data.educationalLevel = "学士学位"
              break
            case "04" :
              response.data.educationalLevel = "本科"
              break
            case "05" :
              response.data.educationalLevel = "专科(含高职)"
              break
          }
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
          that.tableData[0].value=response.data.address
          that.tableData[1].value="说啥啥都队"
          that.tableData[2].value=response.data.IDNumber
          that.tableData[3].value=response.data.department
          that.tableData[4].value=response.data.collegeName
          that.tableData[5].value=response.data.learnType || "无"
          that.tableData[6].value=response.data.educationalLevel || "无"
          that.tableData[7].value=response.data.educationalSystem
          that.tableData[8].value=response.data.enrollmentYear
          that.tableData[9].value=response.data.isGraduate = response.data.isGraduate === '0'?'未毕业':'已毕业'
          that.tableData[10].value=response.data.certificateNum || "无"
          that.tableData[11].value=response.data.specialSituation || "无"
          that.tableData[12].value=response.data.punishment || "无"
          that.picData[0].src=response.data.picture
          that.loading = false;
        },
        function (err) {
          that.$alert("未查询到你的相关信息", "警告", {
            confirmButtonText: "确定",
            type: "warning",
          });
        }
      );
  },
};
</script>

<style scoped>
.el-form {
  margin: 10px 12%;
  width: 1200px;
  padding: 0;
  background-color: rgba(255, 255, 255, 0);
}
.el-breadcrumb__item {
  font-size: 16px !important;
}
</style>
