const { EASYCC } = process.env;

export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        // authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome/drawer',
          },
          {
            path: '/welcome',
            name: '系统功能',
            icon: 'setting',
            routes: [
              {
                path: '/welcome/drawer',
                name: 'API',
                component: './test/cc/DrawerForm',
              },
              {
                path: '/welcome/todo',
                name: '权限管理',
                component: './test/cc/Todo',
              },
              {
                path: '/welcome/user',
                name: '人员管理',
                component: './test/cc/User/index.jsx',
              },
              {
                path: '/welcome/dnd',
                name: 'ReactDnd',
                component: './test/ReactDnd/index.jsx',
              },
              {
                path: '/welcome/GGEditor',
                name: 'GGEditor',
                component: './test/GGEditor',
              },
              {
                path: '/welcome/LayoutEditor',
                name: 'LayoutEditor',
                component: './test/LayoutEditor',
              },
            ],
          },
          {
            path: '/setting',
            name: '系统管理',
            icon: 'setting',
            routes: [
              {
                path: '/setting/organization',
                name: '机构管理',
                icon: 'smile',
                component: './setting/organization',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
