import React, { useRef, useState, Fragment } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumnType } from '@ant-design/pro-table';
import { Button, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAllServices } from '@/services/organization';
import { FormModeEnum, LayoutInterface, FormItemLayoutInterface } from '@/data';
import { OrganizationInterface } from './data';
import CCDrawer from './CCDrawer';

interface Extra<T> extends ProColumnType<T> {
  colLayout?: LayoutInterface;
  formItemLayout?: FormItemLayoutInterface;
  content?: any;
}

const Organization = () => {
  const actionRef = useRef<ActionType>();
  // const [visible, setVisible] = useState<boolean>(false);
  const [record, setRecord] = useState<OrganizationInterface | null>();
  // const [formMode, setFormMode] = useState<FormModeEnum>(FormModeEnum.view)

  // const handler = (record: OrganizationInterface | null) => {
  //   setRecord(record)
  // }

  console.log('setRecord', setRecord);

  const onFinish = (values?: OrganizationInterface) => {
    console.log('values', values);
  };

  const columns: Extra<OrganizationInterface>[] = [
    {
      title: '机构名称',
      dataIndex: 'organizationName',
      tip: '机构名称',
      tooltip: '123',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '机构名称为必填项',
          },
        ],
      },
      render: (dom) => (
        <CCDrawer formmode={FormModeEnum.view} columns={columns} record={record}>
          <a>{dom}</a>
        </CCDrawer>
      ),
      content: {
        colLayout: { span: 12 },
        formItemLayout: {
          labelCol: {
            span: 6,
          },
          wrapperCol: {
            span: 18,
          },
        },
        dom: <Input placeholder="ppp" />,
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
            record={record}
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
