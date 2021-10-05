<template>
  <!-- template 中，只能有唯一的一个根元素 -->
  <el-container>
    <!-- 头部 -->
    <el-header class="logo">
      <el-menu
        :default-active="activeIndex2"
        class="header-nav"
        mode="horizontal"
        @select="handleSelect"
        background-color="#fff"
        text-color="#909399"
        active-text-color="#7fcef4"
      >
        <el-menu-item index="1" style="font-size: 20px"><i class="el-icon-s-home" style="margin:0 0 3px 0; font-size: 20px;"></i>首页</el-menu-item>
        <el-menu-item index="2" style="font-size: 20px"><i class="el-icon-menu" style="margin:0 0 3px 0; font-size: 20px;"></i>我的工作台</el-menu-item>
        <el-menu-item index="3" style="font-size: 20px"><i class="el-icon-chat-dot-square" style="margin:0 0 3px 0; font-size: 20px;"></i>消息中心</el-menu-item>
        <el-menu-item index="4" style="font-size: 20px">
          <i class="el-icon-question" style="margin:0 0 3px 0; font-size: 20px;"></i>问题反馈
        </el-menu-item>
        <div style="margin-left:95%;margin-top:20px;">
          <el-link :underline="false" @click="logOut()" style="font-size: 16px">注销<i class="el-icon-caret-right"></i></el-link>
        </div>
      </el-menu>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="240px" v-show="asideShow">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              :default-active="activeIndex1"
              @open="handleOpen"
              @close="handleClose"
              @select="btn"
              background-color="#d9dee4"
              text-color="#222222"
              active-text-color="#f29b76"
              class="aside"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-lock"></i>
                  <span style="font-size: 20px">令牌相关</span>
                </template>
                  <el-menu-item index="1-1" style="padding:0 0 0 80px; font-size: 18px !important">创建令牌</el-menu-item>
                  <el-menu-item index="1-2" style="padding:0 0 0 80px; font-size: 18px !important">管理令牌</el-menu-item>
                  <el-menu-item index="1-3" style="padding:0 0 0 80px; font-size: 18px !important">创建新令牌</el-menu-item>
              </el-submenu>
               <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-tickets"></i>
                  <span style="font-size: 20px">证书相关</span>
                </template>
                <el-menu-item index="2-1" style="padding:0 0 0 80px; font-size: 18px !important">毕业证书</el-menu-item>
                <el-menu-item index="2-2" style="padding:0 0 0 80px; font-size: 18px !important">学位证书</el-menu-item>
              </el-submenu>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title" style="font-size: 20px">我的资料</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- 内容 -->
      <el-main v-loading="loading">
        <router-view></router-view>
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
      activeIndex1: "3",
      activeIndex2: "1",
      tokenInfo: '',
      loading: false,
      asideShow: false
    };
  },
  methods: {
    btn(key) {
      if (key == "1-1")
        this.$router.push("/createToken");
      else if (key == "1-2"){
        this.$router.push("/manageToken");
      } 
      else if (key == "1-3") {
        this.$router.push("/createNewToken");
      } 
      else if (key == "2-1") {
        this.$router.push("/myCert");
      }
      else if (key == "2-2") {
        this.$router.push("/myDiploma");
      }
      else if (key == "3") {
        this.$router.push("/myInfo");
      }        
    },
    handleSelect(key, keyPath) {
      if(keyPath == '1'){
        this.$router.push("/StudentHome");
        this.asideShow = false
      }
      else if(keyPath == '2'){
        this.$router.push("/createToken");
        this.asideShow = true
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logOut() {
      this.$confirm('确定要退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
      }).then(() => {
          localStorage.removeItem('keystore')
          localStorage.removeItem('code')
          window.location.href = '../login/index.html'
        })
    },
    redirect() {
      switch(this.$route.path) {
        case '/createToken':
          this.asideShow = true
          this.activeIndex1 = '1-1';
          this.activeIndex2 = '2';
          break
        case '/manageToken':
          this.asideShow = true
          this.activeIndex1 = '1-2';
          this.activeIndex2 = '2';
          break
        case '/createNewToken':
          this.asideShow = true
          this.activeIndex1 = '1-3';
          this.activeIndex2 = '2';
          break
        case '/myInfo':
          this.asideShow = true
          this.activeIndex1 = '3';
          this.activeIndex2 = '2';
          break
        case '/myCert':
          this.asideShow = true
          this.activeIndex1 = '2-1';
          this.activeIndex2 = '2';
          break
        case '/myDiploma':
          this.asideShow = true
          this.activeIndex1 = '2-2';
          this.activeIndex2 = '2';
          break
        case '/StudentHome':
          this.activeIndex2 = '1';
          this.asideShow = false
          break
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
      this.redirect()
      //  console.log(to , from )
        // to , from 分别表示从哪跳转到哪，都是一个对象
        // to.path  ( 表示的是要跳转到的路由的地址 eg: /home );
     }
  },
  mounted() {        //写在mounted或者activated生命周期内即可
    window.onload = e => {      //刷新时弹出提示
        console.log(this.$route.path); 
        this.redirect()
        var wh = this.windowHeight();
        document.querySelector(".el-main").style.height = wh - 60+'px';
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
.el-header {
  background-color: rgb(252, 250, 250);
  box-shadow: 0 2px 4px 1px var(--cb-color-shadow, rgba(0, 0, 0, 0.13));
  z-index: 99;
}
.el-main {
  padding: 20px;
  background-color: rgba(224, 224, 224, 0.685);
  background-size: 100%;
}
.el-header .el-menu-item {
  padding: 0 30px !important;
}
.logo {
  background: url(../img/logo.png) no-repeat;
  background-position: 20px;
}
.el-aside {
  margin-top: 1px;
  background-color: #d9dee4;
}
.option-tittle {
  text-align: center;
}
.header-nav {
  margin-left: 220px !important;
}
.aside .el-menu-item
 {
  height: 60px !important;
  line-height: 60px !important;
}
/* #logout {
  background: url('E:\网站\sever\src\img\logout2.png') no-repeat;
  background-size: 100%;
  background-position: 0 0;
} */
/* #logout:hover {

} */
</style>
