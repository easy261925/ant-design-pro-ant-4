import React from 'react';
import { Col, Form, Row } from 'antd';
import { ProColumns } from '@ant-design/pro-table';
import { get } from 'lodash';
import { LayoutInterface, FormItemLayoutInterface } from '@/data';
import { OrganizationInterface } from './data';
import { CCColumns } from './interface';

interface CCFormProps {
  columns?: ProColumns<OrganizationInterface>[];
  colLayout?: LayoutInterface;
  formItemLayout?: FormItemLayoutInterface;
  record?: any;
}

const CCForm: React.FC<CCFormProps> = ({
  columns = [],
  colLayout = { span: 24 },
  formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  },
  record,
}) => {
  const renderFormItems = () => {
    if (columns && columns.length > 0) {
      const formItems = columns
        .filter((column) => column && !column.hideInForm && column.dataIndex !== 'option')
        .map((item: CCColumns<any>, key) => {
          const newColLayout = {
            ...colLayout,
            ...item.formItem?.colLayout,
          };
          const newFormItemLayout = {
            ...formItemLayout,
            ...item.formItem?.formItemLayout,
          };
          let initialValue = null;
          if (record && get(record, String(item.dataIndex))) {
            initialValue = get(record, String(item.dataIndex));
          }
          if (item.formItem && item.formItem.element) {
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
                  {React.cloneElement(item.formItem?.element, {
                    ...item.formItemProps,
                    ...item.formItem.props,
                  })}
                </Form.Item>
              </Col>
            );
          }
          return null;
        });
      return formItems;
    }
    return null;
  };

  return <Row>{renderFormItems()}</Row>;
};

export default CCForm;
