<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>令牌相关</el-breadcrumb-item>
      <el-breadcrumb-item>管理令牌</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form
      v-loading="loading"
    >
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 1200px; font-size: 16px; margin-top: 70px;"
      v-loading='loading'
    >
      <el-table-column prop="name" label="令牌信息" width="270" style="">
      </el-table-column>
      <el-table-column prop="value" label="对应值" width="929">
      </el-table-column>
    </el-table>
    <el-table
      :data="visitData"
      v-show="visitShow"
      stripe
      border
      style="width: 1200px; font-size: 16px;"
      v-loading='loading'
      :show-header="false"
      :cell-style="cellStyle"
    >
      <el-table-column prop="name" label="令牌信息" width="270" style="">
      </el-table-column>
      <el-table-column label="对应值" width="929">
        <template>
            <el-collapse accordion style="">
              <el-collapse-item>
                <template slot="title">
                  展开详情<i class="el-icon-info el-icon--right"></i>
                </template>
                <div class="block" style="width: 700px;">
                  <el-timeline style="margin: 40px 0 0 50px">
                    <el-timeline-item :timestamp="activity.timestamp1" placement="top" v-for="(activity, index) in activities" :key="index" type="primary" icon="el-icon-more" size="large">
                      <el-card>
                        <h4>{{activity.action}}</h4>
                        <p>{{activity.address}}</p>
                        <p>{{activity.timestamp2}}</p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-collapse-item>
            </el-collapse>
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
      reverse: true,
      activities: [],
      loading: false,
      tokenKey:'',
      range:'',
      visitShow: false,
      visitData: [
        {
          name: "令牌访问监控",
        },
      ],
      tableData: [
        {
          name: "SHA3加密值",
          value: ''
        },
        {
          name: "查询范围",
          value: ''
        },
        {
          name: "最大访问次数",
          value: ''
        },
        {
          name: "已访问次数",
          value: ''
        },
        {
          name: "最后有效时间",
          value: ''
        },
      ],
    };
  },
  methods: {
    cellStyle(row,column,rowIndex,columnIndex){//根据报警级别显示颜色
      return {
        backgroundColor: "#cccccc4d",
        padding: 0
      }
    }
  },
  mounted() { 
    //写在mounted或者activated生命周期内即可
        var that = this
        this.loading = true
        var range = ['姓名 ', '部门 ', '证书编号 ', '发证时间 ', '身份证号 ', '特殊情况 ', '处罚情况 ', '院校名称 ', '学历类别 ', '培养层次 ', '学制 ', '入学年份 ', '是否毕业 ', '照片 '];
        var getRange = [];
        var keystore = localStorage.getItem('keystore')
        var code = localStorage.getItem('code')
        // localStorage.removeItem('tokenInfo')
        this.axios.get("https://api-vnt.fdkevin.xyz/getTokenInfo", {headers: { Authorization: keystore, code: code }}).then(function (response) {
          if(response.data.tokenKey == ''){
              // $('#stuToken').html('你当前还没有令牌,现在去<a href="../createStuToken/index.html">生成吧!<a/>')
              that.loading = false
              return false 
          }
          for (var i = 0;i< response.data.range.split(",").length;i++){
            getRange += range[response.data.range.split(",")[i]];
          }
          response.data.range = getRange;
          if(response.data[0] !==  undefined){
            var name = Object.keys(response.data)
            for (var i = 0;i< name.length-7;i++){
              var date = new Date(Number(response.data[i].substr(42,10)) * 1000);
              that.activities.push({
                address: "企业地址: "+response.data[i].substr(0,42),
                timestamp1: date.toLocaleDateString().replace(/\//g, "-"),
                timestamp2: "时间: "+date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8),
              })
            }
            that.visitShow = true;
          }
          else{
            that.activities.push({
              address: "暂无访问记录",
              timestamp1: "",
              timestamp2: "",
            })
            that.visitShow = true;
          }
          var date = new Date(Number(response.data.cutOffTime) * 1000)
          response.data.cutOffTime = date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8);
          that.tableData[0].value=response.data.tokenKey
          that.tableData[1].value=response.data.range
          that.tableData[2].value=response.data.maxVisitCount
          that.tableData[3].value=response.data.visitCount
          that.tableData[4].value=response.data.cutOffTime
          that.loading = false;
        },
        function (err) {
          that.$alert("未查询到你的相关令牌信息", "警告", {
            confirmButtonText: "确定",
            type: "warning",
          });
        }
      );
  },
};
</script>

<style>
.el-form {
  margin: 10px 12%;
  width: 1200px;
  padding: 0;
  background-color: rgb(255, 255, 255);
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: rgba(204, 204, 204, 0.3) !important;
}
.el-table--enable-row-hover:first-child .el-table__body tr:hover>td {
  background: #f29b76 !important;
}
.el-breadcrumb__item {
  font-size: 16px !important;
}
</style>
<style>
.el-collapse-item__header {
  background-color: #cccccc00 !important;
  height: 50px !important;
}
.el-collapse {
  border: none !important;
}
.el-collapse-item__wrap {
  max-height: 400px;
  overflow-y: auto !important;
}
</style>
