import React, { Fragment } from 'react';
import { CCDrawer, CCColumns, FormModeEnum } from 'easycc-rc-4';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Divider, Popconfirm } from 'antd';
import { TestInterface } from '../DrawerForm/data';
// import CCDrawer from '../DrawerForm/CCDrawer'
import { getAllServices } from '../DrawerForm/service';

const Index = () => {
  const onCreate = async (values: TestInterface) => {
    console.log('onCreate', values);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
        console.log('onCreate - ok');
      }, 2000);
    });
  };

  const onUpdate = async (values: TestInterface) => {
    console.log('onUpdate', values);
    return new Promise((_, reject) => {
      setTimeout(() => {
        // eslint-disable-next-line
        reject({ success: false });
        console.log('onCreate - error');
      }, 2000);
    });
  };

  const columns: CCColumns<TestInterface>[] & ProColumns<TestInterface>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      tooltip: '用户名',
      valueType: 'text',
      formItem: {
        // colLayout: { span: 12 },
        // formItemLayout: {
        //   labelCol: { span: 6 },
        //   wrapperCol: { span: 18 }
        // },
        props: {
          placeholder: '请输入待办事项',
          rules: [
            {
              required: true,
              message: '请输入待办事项',
            },
          ],
        },
      },
      render: (val: any, entity: TestInterface) => (
        <CCDrawer formmode={FormModeEnum.view} columns={columns} record={entity}>
          <a>{val}</a>
        </CCDrawer>
      ),
    },
    {
      title: '单选',
      dataIndex: 'select',
      valueEnum: {
        0: { text: '选项一' },
        1: { text: '选项二' },
        2: { text: '选项三' },
        3: { text: '选项四' },
      },
    },
    {
      title: '多行文本',
      dataIndex: 'textarea',
      valueType: 'textarea',
      ellipsis: true,
    },
    {
      title: '多选',
      dataIndex: 'multiple',
      fieldProps: {
        mode: 'multiple',
      },
      valueEnum: {
        a: { text: '多选项0' },
        b: { text: '多选项1' },
        c: { text: '多选项2' },
        d: { text: '多选项3' },
      },
      renderText: (val: any) =>
        val.map(
          (item: string) =>
            ({
              a: { text: '多选项0' },
              b: { text: '多选项1' },
              c: { text: '多选项2' },
              d: { text: '多选项3' },
            }[item].text),
        ),
    },

    {
      title: '创建时间',
      dataIndex: 'dtCreaDateTime',
      valueType: 'date',
    },
    {
      title: '时间范围',
      dataIndex: 'dateRange',
      valueType: 'dateRange',
    },
    {
      title: '数字',
      dataIndex: 'digit',
      search: false,
      valueType: 'digit',
    },
    {
      title: '切换',
      dataIndex: 'switch',
      search: false,
      formItem: {
        props: { elType: 'switch' },
      },
      renderText: (val: any) => (val ? '选中' : '未选中'),
    },
    {
      title: '附件',
      dataIndex: 'uploadFile',
      search: false,
      formItem: {
        props: {
          elType: 'upload',
        },
      },
      render: (val: any, entity: TestInterface) => {
        if (entity.uploadFile && entity.uploadFile.length > 0) {
          return entity.uploadFile.map((file) => {
            return <img alt="" src={file.url} key={file.id} style={{ width: 40 }} />;
          });
        }
        return null;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, entity: TestInterface) => (
        <Fragment>
          <CCDrawer
            formmode={FormModeEnum.update}
            columns={columns}
            record={entity}
            onFinish={onUpdate}
          >
            <a>修改</a>
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
        </Fragment>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TestInterface>
        columns={columns}
        toolBarRender={() => [
          <CCDrawer
            key="create"
            formmode={FormModeEnum.create}
            columns={columns}
            title="待办"
            onFinish={onCreate}
          >
            <Button type="primary">新建待办</Button>
          </CCDrawer>,
        ]}
        request={(params, sorter, filter) => getAllServices({ ...params, sorter, filter })}
        onSubmit={(params) => console.log('查询', params)}
        rowKey="id"
      />
    </PageContainer>
  );
};

export default Index;
