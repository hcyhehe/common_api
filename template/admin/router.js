const tool = require('../../commons/tool');

exports.content = function (data) {
  let routerStr = '';
  for(let i=0;i<data.length;i++){
    let name = data[i].name;
    let cname = data[i].cname;
    let icon = data[i].icon;
    if(data[i].is_order==1){
      routerStr += `
      {
        path: '/${name}',
        component: Layout,
        redirect: '/${name}/list',
        meta: {roles: ['admin','editor']},
        children: [
          {
            path: 'list',
            component: () => import('@/myviews/${name}/list'),
            name: '${name}List',
            meta: { title: '${cname}管理', icon: '${icon}', noCache: true }
          },
          {
            path: 'add',
            component: () => import('@/myviews/${name}/add'),
            name: '${name}Add',
            meta: { title: '添加${cname}', icon: '', noCache: true },
            hidden: true,
          },
          {
            path: 'edit',
            component: () => import('@/myviews/${name}/edit'),
            name: '${name}Edit',
            meta: { title: '编辑${cname}', icon: '', noCache: true },
            hidden: true,
          },
        ]
      },
      `;
    } else {  //订单类或其他（基础信息）
      routerStr += `
      {
        path: '/${name}',
        component: Layout,
        redirect: '/${name}/list',
        meta: {roles: ['admin','editor']},
        children: [
          {
            path: 'list',
            component: () => import('@/myviews/${name}/list'),
            name: '${name}List',
            meta: { title: '${cname}管理', icon: '${icon}', noCache: true }
          }
        ]
      },
      `;
    }
    
  }
  //console.log(routerStr);

  const str = `
    import Vue from 'vue'
    import Router from 'vue-router'
    
    Vue.use(Router)
    
    /* Layout */
    import Layout from '@/views/layout/Layout'
    
    
    /**
     * constantRouterMap： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
     * asyncRouterMap： 代表那些需求动态判断权限并通过 addRouters 动态添加的页面。
    */
    export const constantRouterMap = [
      {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
          {
            path: '/redirect/:path*',
            component: () => import('@/views/redirect/index')
          }
        ]
      },
      {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
      },
      {
        path: '/auth-redirect',
        component: () => import('@/views/login/authredirect'),
        hidden: true
      },
      {
        path: '/404',
        component: () => import('@/views/errorPage/404'),
        hidden: true
      },
      {
        path: '/401',
        component: () => import('@/views/errorPage/401'),
        hidden: true
      },
      {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [
          {
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
          }
        ]
      },
    ]
    
    export const asyncRouterMap = [
      {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        meta: {roles: ['admin', 'editor']},
        children: [
          {
            path: 'list',
            component: () => import('@/myviews/user/list'),
            name: 'userList',
            meta: { title: '会员管理', icon: 'wechat', noCache: true }
          }
        ]
      },
      ${routerStr}
      {
        path: '/admin',
        component: Layout,
        redirect: '/admin/list',
        meta: { roles: ['admin'] },
        children: [
          {
            path: 'list',
            component: () => import('@/myviews/admin/list'),
            name: 'adminList',
            meta: { title: '平台账号管理', icon: 'peoples', noCache: true }
          }
        ]
      },
      
      { path: '*', redirect: '/404', hidden: true }
    ]
    
    export default new Router({
      // mode: 'history', // require service support
      scrollBehavior: () => ({ y: 0 }),
      routes: constantRouterMap
    })
  `;

  return tool.beautyFile(str);
}