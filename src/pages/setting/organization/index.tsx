import React, { useRef, Fragment } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAllServices } from '@/services/organization';
import { FormModeEnum } from '@/data';
import { OrganizationInterface } from './data';
import CCDrawer from './CCDrawer';
import { CCColumns } from './interface';

const Organization = () => {
  const actionRef = useRef<ActionType>();

  const onFinish = (values?: OrganizationInterface) => {
    console.log('values', values);
  };

  const columns: CCColumns<OrganizationInterface>[] = [
    {
      title: '机构名称',
      dataIndex: 'organizationName',
      tooltip: '机构名称',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '机构名称为必填项',
          },
        ],
      },
      render: (dom, entity) => (
        <CCDrawer formmode={FormModeEnum.view} columns={columns} record={entity}>
          <a>{dom}</a>
        </CCDrawer>
      ),
      formItem: {
        colLayout: { span: 12 },
        formItemLayout: {
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 16,
          },
        },
        element: <Input placeholder="ppp" />,
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
      tooltip: '123',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请填写密码',
          },
        ],
      },
      hideInTable: true,
      formItem: {
        colLayout: { span: 12 },
        formItemLayout: {
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 16,
          },
        },
        element: <Input placeholder="ppp" />,
      },
    },
    {
      title: '输入1',
      dataIndex: 'a',
      tooltip: '123',
      hideInTable: true,
      formItem: {
        element: <Input placeholder="ppp" />,
      },
    },
    {
      title: '创建时间',
      dataIndex: 'dtCreaDateTime',
      search: false,
      hideInForm: true,
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      dataIndex: 'dtUpdateDateTime',
      search: false,
      hideInForm: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, entity) => (
        <Fragment>
          <CCDrawer
            formmode={FormModeEnum.update}
            columns={columns}
            record={entity}
            onFinish={onFinish}
          >
            <a>修改</a>
          </CCDrawer>
          <Divider type="vertical" />
          <a>删除</a>
        </Fragment>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<OrganizationInterface>
        headerTitle=""
        onSubmit={(params) => getAllServices({ ...params })}
        onReset={() => getAllServices({})}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <CCDrawer
            key="create"
            formmode={FormModeEnum.create}
            columns={columns}
            record={null}
            onFinish={onFinish}
          >
            <Button type="primary">
              <PlusOutlined />
              新建机构
            </Button>
          </CCDrawer>,
        ]}
        request={(params, sorter, filter) => getAllServices({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Organization;
