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
            redirect: '/welcome',
          },
          EASYCC === 'test'
            ? {
                path: '/test',
                name: '测试页面',
                icon: 'setting',
                routes: [
                  {
                    path: '/test/drawer',
                    name: '管理页面',
                    component: './test/cc/DrawerForm',
                  },
                  {
                    path: '/test/todo',
                    name: '待办任务',
                    component: './test/cc/Todo',
                  },
                ],
              }
            : null,
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            // authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                // authority: ['admin'],
              },
            ],
          },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
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
