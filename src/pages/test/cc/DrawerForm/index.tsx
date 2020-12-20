import React, { useRef, Fragment } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAllServices } from './service';
import { FormModeEnum } from '@/data';
import { TestInterface } from './data';
import CCDrawer from './CCDrawer';
import { CCColumns } from './interface';

const Organization = () => {
  const actionRef = useRef<ActionType>();

  const onFinish = (values?: TestInterface) => {
    console.log('values', values);
  };

  const columns: CCColumns<TestInterface>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      tooltip: '用户名',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用户名为必填项',
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
        element: <Input placeholder="请输入用户名" />,
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
      tooltip: 'password',
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
        element: <Input.Password placeholder="请输入密码" />,
      },
    },
    {
      title: '多行文本',
      dataIndex: 'textarea',
      tooltip: '这是多行文本',
      valueType: 'textarea',
      ellipsis: true,
      formItem: {
        props: {
          placeholder: '请输入多行文本',
          autoSize: {
            minRows: 4,
            maxRows: 6,
          },
        },
      },
      // hideInTable: true,
      // formItem: {
      //   element: <Input.TextArea placeholder="请输入多行文本" />,
      // },
    },
    {
      title: '选择',
      dataIndex: 'select',
      tooltip: '这是选择',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择',
          },
        ],
      },
      valueEnum: {
        0: { text: '选项0', status: 'Default' },
        1: { text: '选项1', status: 'Processing' },
        2: { text: '选项2', status: 'Success' },
        3: { text: '选项3', status: 'Error' },
      },
      // formItem: {
      //   props: {
      //     rules: [
      //       {
      //         required: true,
      //         message: '请选择选项'
      //       }
      //     ]
      //   },
      //   element: <Select placeholder='请选择'>
      //     <Select.Option value="0">
      //       选项一
      //     </Select.Option>
      //     <Select.Option value="1">
      //       选项二
      //     </Select.Option>
      //     <Select.Option value="2">
      //       选项三
      //     </Select.Option>
      //     <Select.Option value="3">
      //       选项四
      //     </Select.Option>
      //   </Select>
      // }
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
      <ProTable<TestInterface>
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
