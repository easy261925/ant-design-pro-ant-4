import React, { Fragment } from 'react';
import { Col, Form } from 'antd';
import { ProColumns } from '@ant-design/pro-table';
import { get } from 'lodash';
import { LayoutInterface, FormItemLayoutInterface } from '@/data';
import { OrganizationInterface } from './data';

interface Extra {
  colLayout?: LayoutInterface;
  formItemLayout?: FormItemLayoutInterface;
  content?: any;
}

interface Props {
  columns?: ProColumns<OrganizationInterface>[];
  colLayout?: LayoutInterface;
  formItemLayout?: FormItemLayoutInterface;
  record?: OrganizationInterface | null;
}

const CCForm: React.FC<Props> = ({ columns, colLayout, formItemLayout, record }) => {
  const renderFormItems = () => {
    if (columns && columns.length > 0) {
      const formItems = columns
        .filter((column) => column && !column.hideInForm && column.dataIndex !== 'option')
        .map((item: Extra & ProColumns, key) => {
          const newColLayout = {
            ...colLayout,
            ...item.content?.colLayout,
          };
          const newFormItemLayout = {
            ...formItemLayout,
            ...item.content?.formItemLayout,
          };
          let initialValue = null;
          if (record && get(record, String(item.dataIndex))) {
            initialValue = get(record, String(item.dataIndex));
          }
          return (
            <Col key={key} {...newColLayout}>
              <Form.Item
                shouldUpdate
                label={item.title}
                name={item.dataIndex}
                {...newFormItemLayout}
                {...item.formItemProps}
                initialValue={initialValue}
              >
                {React.cloneElement(item.content.dom, {
                  ...item.formItemProps,
                  ...item.content.props,
                })}
              </Form.Item>
            </Col>
          );
        });
      return formItems;
    }
    return null;
  };

  return <Fragment>{renderFormItems()}</Fragment>;
};

export default CCForm;
