<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>令牌相关</el-breadcrumb-item>
      <el-breadcrumb-item>创建新令牌</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      v-loading="loading"
    >
      <el-form-item label="查询范围" prop="type" required>
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="姓名" name="type" disabled></el-checkbox>
          <el-checkbox label="部门" name="type" disabled></el-checkbox>
          <el-checkbox label="证书编号" name="type" disabled></el-checkbox>
          <el-checkbox label="发证时间" name="type" disabled></el-checkbox>
          <el-checkbox label="身份证号" name="type"></el-checkbox>
          <el-checkbox label="特殊情况" name="type"></el-checkbox>
          <el-checkbox label="处罚情况" name="type"></el-checkbox>
          <el-checkbox label="院校名称" name="type"></el-checkbox>
          <el-checkbox label="学历类别" name="type"></el-checkbox>
          <el-checkbox label="培养层次" name="type"></el-checkbox>
          <el-checkbox label="学制" name="type"></el-checkbox>
          <el-checkbox label="入学年份" name="type"></el-checkbox>
          <el-checkbox label="是否毕业" name="type"></el-checkbox>
          <el-checkbox label="照片" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="有效时间" prop="date">
        <el-input
          v-model="ruleForm.date"
          style="width: 150px"
          placeholder="默认为30天"
        ></el-input>
      </el-form-item>
      <el-form-item label="可访问次数" prop="times">
        <el-input
          v-model="ruleForm.times"
          style="width: 150px"
          placeholder="默认为30次"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
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
          <el-button type="primary" @click="dialogClose" v-show="!diaLoading">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      loading: false,
      diaLoading: false,
      ruleForm: {
        times: "",
        // region: "",
        date: "",
        // delivery: false,
        type: ["姓名", "部门", "证书编号", "发证时间"],
        // resource: "",
        // desc: "",
      },
    };
  },
  created(){
    window.copyToken=this.copyToken;
  },
  methods: {
    dialogClose() {
      this.dialogTableVisible = false;
      this.$router.push("/manageToken");
    },
    copyToken() {
      var input = document.createElement("input");   // 直接构建input
      input.value = this.token;  // 设置内容
      document.body.appendChild(input);    // 添加临时实例
      input.select();   // 选择实例内容
      document.execCommand("Copy");   // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 提交按钮
    submitForm() {
      this.openConfirm();
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
    // 成功弹窗
    openSuccess(token, hash) {
      this.$confirm(
        "令牌值: 5s43rpu38e <i class='el-icon-document-copy el-icon--right' onmouseover="+"this.style.color='#409eff'"+" onmouseout="+"this.style.color='#606266'"+" onclick='copyToken()' style='cursor: pointer;' title='复制令牌'></i><br>" + "此次交易号: " + hash + "</a>",
        "新的令牌生成成功!",
        {
          confirmButtonText: "确定",
          cancelButtonText: "查看交易详情",
          dangerouslyUseHTMLString: true,
          customClass: "message_box_confirm",
          type: "success",
        }
      )
        .then(() => {
          this.$router.push("/manageToken");
        })
        .catch(() => {
          this.hashInfo();
        });
    },
    openConfirm() {
      // this.$confirm("此操作将永久删除已有令牌, 是否继续?", "警告", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
      var that = this;
      var type = this.ruleForm.type;
      // 加载画面
      that.loading = true;
      // 初始化参数
      var params = {
        range: "",
      };
      // 提交前的数据处理
      var keystore = localStorage.getItem("keystore");
      var code = localStorage.getItem("code");
      params.maxVisitCount =
        this.ruleForm.times == "" ? 30 : Number(this.ruleForm.times);
      for (var i = 0; i < type.length; i++) {
        if (i != type.length - 1)
          params.range += this.rangeFormat(type[i]) + ",";
        else params.range += this.rangeFormat(type[i]);
      }
      // 提交北京时间请求
      this.axios
        .get("https://api.limkim.xyz/getSysTime")
        .then(function (response) {
          var sDate = parseInt(response.data.Systime2 / 1000);
          params.cutOffTime =
            that.ruleForm.date == ""
              ? sDate + 30 * 24 * 60 * 60
              : sDate + that.ruleForm.date * 24 * 60 * 60;
          // 创建新令牌请求
          that
            .axios({
              method: "post",
              url: "https://api-vnt.fdkevin.xyz/generateNewToken",
              data: params,
              headers: { Authorization: keystore, code: code },
            })
            .then(function (response) {
              that.token = response.data.newTokenKey;
              params = { range: "" };
              that.openSuccess(response.data.newTokenKey, response.data.txHash);
              that.loading = false;
              that.txHash = response.data.txHash;
            });
        });
      // })
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消",
      //   });
      // });
    },
    rangeFormat(range) {
      switch (range) {
        case "姓名":
          return "0";
        case "部门":
          return "1";
        case "证书编号":
          return "2";
        case "发证时间":
          return "3";
        case "身份证号":
          return "4";
        case "特殊情况":
          return "5";
        case "处罚情况":
          return "6";
        case "院校名称":
          return "7";
        case "学历类别":
          return "8";
        case "培养层次":
          return "9";
        case "学制":
          return "10";
        case "入学年份":
          return "11";
        case "是否毕业":
          return "12";
        case "照片":
          return "13";
      }
    },
  },
};
</script>

<style scoped>
.el-form {
  margin: 70px 7%;
  width: 1400px;
  padding: 80px 250px;
  background-color: rgba(255, 255, 255);
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
<style>
.message_box_confirm {
  word-break: break-all !important;
}
</style>