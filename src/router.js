//  路由规则模块

import VueRouter from 'vue-router'
// 导入路由相关的组件
import StudentHome from './components/student/StudentHome.vue'
import createNewToken from './components/student/createNewToken.vue'
import createToken from './components/student/createToken.vue'
import manageToken from './components/student/manageToken.vue'
import myCert from './components/student/myCert.vue'
import myDiploma from './components/student/myDiploma.vue'
import myInfo from './components/student/myInfo.vue'
import queryToken from './components/hr/queryToken.vue'
// import deansOfficeHome from './components/deansOffice/deansOfficeHome.vue'
// import addStudent from './components/deansOffice/addStudent.vue'
// import batchAddStu from './components/deansOffice/batchAddStu.vue'
// import faceRec from './components/deansOffice/faceRec.vue'
// import checkCourse from './components/deansOffice/checkCourse.vue'
// import batchCkCourse from './components/deansOffice/batchCkCourse.vue'
// import modSpecStin from './components/deansOffice/modSpecStin.vue'
// import modPun from './components/deansOffice/modPun.vue'
// import IsGrad from './components/deansOffice/IsGrad.vue'
// import genCert from './components/deansOffice/genCert.vue'
// import getChainInfo from './components/superisoryBody/getChainInfo.vue'
// import getChainSpecInfo from './components/superisoryBody/getChainSpecInfo.vue'

// 创建路由对象，并把得到的路由对象，挂载到 VM 实例上
const router = new VueRouter({
  routes: [ // 路由规则
    { path: '/', redirect:'/StudentHome'},
    { path: '/createNewToken', component: createNewToken},
    { path: '/StudentHome', component: StudentHome},
    { path: '/createToken', component: createToken },
    { path: '/manageToken', component: manageToken},
    { path: '/myCert', component: myCert},
    { path: '/myDiploma', component: myDiploma},
    { path: '/myInfo', component: myInfo},
    { path: '/queryToken', component: queryToken },
    // { path: '/deansOfficeHome', component: deansOfficeHome },
    // { path: '/addStudent', component: addStudent },
    // { path: '/batchAddStu', component: batchAddStu},
    // { path: '/faceRec', component: faceRec},
    // { path: '/checkCourse', component: checkCourse},
    // { path: '/batchCkCourse', component: batchCkCourse},
    // { path: '/modSpecStin', component: modSpecStin},
    // { path: '/modPun', component: modPun},
    // { path: '/IsGrad', component: IsGrad},
    // { path: '/genCert', component: genCert},
    // { path: '/getChainInfo', component: getChainInfo},
    // { path: '/getChainSpecInfo', component: getChainSpecInfo},
  ]
})

// 导出路由对象
export default router
