import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { CCDrawer } from 'easycc-rc-4';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Popconfirm } from 'antd';
import { getAllServices } from '../DrawerForm/service';

const Index = () => {
  const onFinish = (values) => {
    console.log('values', values);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
      }, 1500);
    });
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
      formItem: {
        props: {
          rules: [
            {
              required: true,
              message: '请填写用户名',
            },
          ],
        },
      },
      render: (val, entity) => {
        return (
          <CCDrawer
            title="用户"
            formmode="view"
            columns={columns}
            onFinish={onFinish}
            record={entity}
          >
            <a>{val}</a>
          </CCDrawer>
        );
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
      valueType: 'text',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (val, entity) => {
        return (
          <div>
            <CCDrawer
              title="用户"
              formmode="update"
              columns={columns}
              onFinish={onFinish}
              record={entity}
            >
              <a>编辑</a>
            </CCDrawer>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除?"
              onConfirm={() => {
                console.log('确认删除', entity);
              }}
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="id"
        request={(params, sorter, filter) => getAllServices({ ...params, sorter, filter })}
        toolBarRender={() => [
          <CCDrawer title="用户" formmode="create" columns={columns} onFinish={onFinish}>
            <Button type="primary">新建用户</Button>
          </CCDrawer>,
        ]}
      />
    </PageContainer>
  );
};

export default Index;
