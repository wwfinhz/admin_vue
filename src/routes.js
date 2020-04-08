import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Fangchan from './views/nav2/Fangchan.vue'
import User from './views/nav1/User.vue'
import Gonggao from './views/system/Gonggao.vue'
import Register from './views/Register.vue'
import Tingche from './views/nav2/Tingche.vue'
import Calendar from './views/system/Calendar.vue'
import Shebei from './views/nav2/Shebei.vue'
import Jiaofei from './views/nav2/Jiaofei.vue'
import BaoxiuMsg from './views/nav2/Baoxiu.vue'
import TousuMsg from './views/nav2/Tousu.vue'
import Yibiao from './views/nav2/Yibiao.vue'
import Addyibiao from './views/nav2/Addyibiao.vue'
import Huzhu from './views/nav2/Huzhu.vue'

let routes = [

    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '个人管理',
        iconCls: 'fa fa-id-card-o',//图标样式class
        children: [
           
            { path: '/user', component: User, name: '用户信息' },
            
        ]
    },
    {
        path: '/',
        component: Home,
        name: '社区服务',
        iconCls: 'el-icon-service',
        children: [
            { path: '/huzhu', component: Huzhu, name: '住户管理' },
            { path: '/fangchan', component: Fangchan, name: '房产信息' },
            { path: '/tingche', component: Tingche, name: '停车位信息' },
            { path: '/shebei', component: Shebei, name: '设备信息' },
            { path: '/jiaodei', component: Jiaofei, name: '缴费信息' },
            { path: '/baoxiumsg', component: BaoxiuMsg, name: '报修管理'},
            { path: '/tousumsg', component: TousuMsg, name: '投诉管理' },
            { path: '/yibiao', component: Yibiao, name: '仪表管理' },
            { path: '/addyibiao', component: Addyibiao, name: '抄写仪表' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '系统信息',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/gonggao', component: Gonggao, name: '公告' },
            { path: '/calendar', component: Calendar,name: '日历'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;