<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>查询相关</el-breadcrumb-item>
      <el-breadcrumb-item>令牌查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form
      status-icon
      label-width="135px"
      class="ruleForm"
      v-loading="loading"
    >
      <el-table
        :data="tableData"
        stripe
        border
      style="width: 1000px; margin-left: 10%; font-size: 16px;"
      >
        <el-table-column prop="name" label="令牌信息" width="220">
        </el-table-column>
        <el-table-column prop="value" label="对应值" width="779">
        </el-table-column>
      </el-table>
      <el-table
      :data="picData"
      stripe
      border
      style="width: 1000px; margin-left: 10%; font-size: 16px; border-top: none;"
      :show-header="false"
      :cell-style="cellStyle"
      v-show = 'pic'
    >
      <el-table-column prop="name" label="信息" width="220"></el-table-column>
      <el-table-column label="对应值" width="779">
       <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="scope.row.src" alt="" style="width: 150px;height: 150px">
              <img slot="reference" :src="scope.row.src" style="width: 30px;height: 30px">
            </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="hashData"
      stripe
      border
      style="width: 1000px; margin-left: 10%; font-size: 16px; border-top: none;"
      :show-header="false"
      :cell-style="cellStyle"
      v-show = 'hash'
    >
      <el-table-column prop="name" label="信息" width="220"></el-table-column>
      <el-table-column prop="value" label="对应值" width="659"></el-table-column>
      <el-table-column label="查看" width="120">
        <template>
            <el-button @click="hashInfo()" type="text" size="big">查看交易详情</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-input
        placeholder="请输入要查询的密钥"
        v-model="input"
        clearable
        style="width: 20%; margin: 80px 0 0 150px"
      >
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="query()"
        :loading="btn_loading"
        >查询</el-button
      >
      <el-dialog title="交易详情" :visible.sync="dialogTableVisible">
        <el-table :data="gridData" v-loading="diaLoading">
          <el-table-column
            property="name"
            label="交易信息"
            width="150"
          ></el-table-column>
          <el-table-column property="value" label="对应值"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false" v-show="diaLoading">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisible = false" v-show="!diaLoading">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hash: false,
      token: '',
      txHash: '',
      gridData: [
        {
          name: "交易哈希值",
          value: "",
        },
        {
          name: "状态",
          value: "",
        },
        {
          name: "时间戳",
          value: "",
        },
        {
          name: "区块编号",
          value: "",
        },
        {
          name: "发送方",
          value: "",
        },
        {
          name: "接收方",
          value: "",
        },
        {
          name: "燃料限制",
          value: "",
        },
        {
          name: "实际消耗燃料",
          value: "",
        },
        {
          name: "合约地址",
          value: "",
        },
        {
          name: "交易序号",
          value: "",
        },
      ],
      dialogTableVisible: false,
      diaLoading: false,
      pic: false,
      loading: false,
      btn_loading: false,
      input: "",
      newRes: {},
      tableData: [],
      picData: [],
      hashData: []
    };
  },
  methods: {
    hashInfo() {
      this.diaLoading = true;
      this.dialogTableVisible = true;
      var that = this;
      var keystore = localStorage.getItem("keystore");
      var code = localStorage.getItem("code");
      this.axios({
        method: "post",
        url: "https://api-vnt.fdkevin.xyz/getReceipt",
        data: {
          txHash: this.txHash
        },
        headers: { Authorization: keystore, code: code },
      }).then(function (response) {
        var timestamp =new Date().getTime();
        console.log(response);
        that.gridData[0].value=response.data.transactionHash
        that.gridData[1].value=response.data.status
        that.gridData[2].value=timestamp.toString().substr(0,10);
        that.gridData[3].value=response.data.blockNumber
        that.gridData[4].value=response.data.from
        that.gridData[5].value=response.data.to
        that.gridData[6].value=response.data.cumulativeGasUsed
        that.gridData[7].value=response.data.gasUsed
        that.gridData[8].value=response.data.contractAddress||"-"
        that.gridData[9].value=response.data.transactionIndex
        that.diaLoading = false;
      });
    },
    FormData(data) {
      var date = new Date(Number(data) * 1000);
      data = date.toLocaleDateString().replace(/\//g, "-");
      return data;
    },
    cellStyle(row,column,rowIndex,columnIndex){//根据报警级别显示颜色
      return 'background-color: #fff'
    },
    query() {
      this.btn_loading = true;
      var that = this;
      var range = {
        studentName: "姓名",
        department: "部门",
        certificateNumber: "证书编号",
        lssuingTime: "发证时间",
        IDNumber: "身份证号",
        specialSituation: "特殊情况",
        punishment: "处罚情况",
        collegeName: "院校名称",
        learnType: "学历类别",
        educationalLevel: "培养层次",
        educationalSystem: "学制",
        enrollmentYear: "入学年份",
        isGraduate: "是否毕业",
        picture: "照片",
        isExistence: "令牌存在",
        txHash: "此次交易号"
      };
      var keystore = localStorage.getItem("keystore");
      var code = localStorage.getItem("code");
      this.axios({
        method: "post",
        url: "https://api-vnt.fdkevin.xyz/companyQuery",
        data: { tokenKey: that.input },
        headers: { Authorization: keystore, code: code },
      }).then(function (response) {
        if (response.data.isExitence == false) return false;
        that.tableData= [];
        that.picData= [];
        that.hashData= [];
        that.hash =false;
        that.txHash = response.data.txHash;
        var tNmae = Object.keys(response.data);
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
          switch(response.data.isGraduate){
            case '1':
              response.data.isGraduate = '是'
              break
            case '0':
              response.data.isGraduate = '否'
              break
          }
        if (response.data.specialSituation == "") response.data.specialSituation = "无";
        if (response.data.punishment == "") response.data.punishment = "无";
        for (var i = 0; i <= tNmae.length - 1; i++) {
          that.newRes[range[tNmae[i]]] = response.data[tNmae[i]];
          if(range[tNmae[i]] != '照片'&&range[tNmae[i]] != '发证时间'&&range[tNmae[i]] != '令牌存在'&&range[tNmae[i]] != '此次交易号')
            that.tableData.push({
              name: [range[tNmae[i]]],
              value: response.data[tNmae[i]],
            });
          else if(range[tNmae[i]] == '照片'){
            that.pic = true
            that.picData.push({
              name: [range[tNmae[i]]],
              src: response.data[tNmae[i]],
            });
          }
          else if(range[tNmae[i]] == '发证时间'){
            that.tableData.push({
              name: [range[tNmae[i]]],
              value: that.FormData(response.data[tNmae[i]]),
            });
          }
          else if(range[tNmae[i]] == '此次交易号'){
            that.hash = true
            that.hashData.push({
              name: [range[tNmae[i]]],
              value: response.data[tNmae[i]],
            });
          }
        }
        // console.log(that.newRes[1]);
        // console.log(that.tableData[0].name);
        that.btn_loading = false;
        console.log(that.tableData);
      });
    },
  },
};
</script>

<style scoped>
.el-form {
  margin: 30px 7%;
  width: 1400px;
  padding: 80px 0px;
  background-color: #fff;
  border: 1px solid rgba(204, 204, 204, 0.5);
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
}
.line {
  text-align: center;
  margin-top: 50px;
}
.el-checkbox {
  width: 80px;
  margin-right: 50px;
}
.el-breadcrumb__item {
  font-size: 16px !important;
}
</style>
