<template>
  <!-- template 中，只能有唯一的一个根元素 -->
  <el-container>
    <!-- 头部 -->
    <el-header class="logo">
      <span class="tittle">登录</span>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 内容 -->
      <el-main>
        <div class="log_content">
          <div class="method_switch">
            <div id="byCode" :style="codeIcon" @click="byChange(0)">
              <i class="el-icon-key"></i><span>扫码登录</span>
            </div>
            <div id="byPassword" :style="psIcon" @click="byChange(1)">
              <i class="el-icon-lock"></i><span>账号密码登陆</span>
            </div>
          </div>
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 使用 JS Component 之前，先按需导入一下需要的组件
// import { Toast } from "mint-ui";
export default {
  data() {
    return {
      flag: 0,
      codeIcon: {
        color: "#5eacf0",
        borderBottomColor: "#5eacf0",
        borderBottomWidth: "2px",
      },
      psIcon: {
        color: "",
        borderBottomColor: "#ccc",
        borderBottomWidth: "1px",
      },
    };
  },
  methods: {
    byChange(e){
      if(this.flag == 1&&e == 0){
        this.codeIcon.color = this.codeIcon.borderBottomColor = "#5eacf0";
        this.psIcon.color = this.psIcon.borderBottomColor = "#909399";
        this.codeIcon.borderBottomWidth = '2px'
        this.psIcon.borderBottomWidth = "1px";
        this.$router.push("/byQrCode");
        this.flag = 0
      }
      else if(this.flag == 0&&e == 1){
        this.psIcon.color = this.psIcon.borderBottomColor = "#5eacf0";
        this.codeIcon.color = this.codeIcon.borderBottomColor = "#909399";
        this.psIcon.borderBottomWidth = '2px'
        this.codeIcon.borderBottomWidth = "1px";
        this.$router.push("/byPassword");
        this.flag = 1
      }
    },
    windowHeight() {
      var de = document.documentElement;
      return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
    }
  },
  filters: {},
  components: {},
  directives: {},
  props: [],
  watch:{   //监听路由变化
    $route(){
      switch(this.$route.path) {
        case '/byPassword':
          this.byChange(1)
          break
        case '/byQrCode':
          this.byChange(0)
          break
      }
      //  console.log(to , from )
        // to , from 分别表示从哪跳转到哪，都是一个对象
        // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
     }
  },
  mounted() {        //写在mounted或者activated生命周期内即可
    window.onpageshow = window.onload = e => {      //刷新时弹出提示
      var wh = this.windowHeight();
        document.querySelector(".el-main").style.height = wh - 80+'px';
        switch(this.$route.path) {
        case '/byPassword':
          this.byChange(1)
          break
        case '/byQrCode':
          this.byChange(0)
          break
      }
    };
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  list-style: none;
  outline: none;
  box-sizing: border-box;
}
body {
  margin: 0 !important;
}
.el-header {
  background-color: #fff;
  box-shadow: 0 2px 4px 1px var(--cb-color-shadow, rgba(0, 0, 0, 0.13));
  z-index: 99;
  height: 80px !important;
}
.el-header .el-menu-item {
  padding: 0 30px !important;
}
.el-main {
  padding: 20px;
  background: url(../img/bg6.jpg) no-repeat;
  background-size: 100%;
}
.logo {
  background: url(../img/logo.png) no-repeat;
  background-position: 300px;
}
.tittle {
  height: 80px;
  margin-left: 505px;
  padding-left: 10px;
  font-size: 24px;
  line-height: 80px;
  border-left: 1px solid ;
}
.log_content {
  margin: 135px 0 0 calc(50% - 300px);
  width: 600px;
  height: 540px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 2px 15px rgb(0 0 0 / 15%);
}
.method_switch {
  height: 52px;
  
}
.method_switch div {
  float: left;
  margin: 0 !important;
  width: 300px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
#byCode {
  border-right: 1px solid #ccc;
}
</style>
