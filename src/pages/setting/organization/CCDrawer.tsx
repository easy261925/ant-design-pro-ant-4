import React, { useState, ReactNode, Fragment } from 'react';
import { Drawer, Button, Row, Form } from 'antd';
import { FormModeEnum, FormModeLabelEnum } from '@/data';
import { DrawerProps } from 'antd/lib/drawer';
import { ProColumns } from '@ant-design/pro-table';
import styles from './CCDrawer.less';
import CCForm from './CCForm';

interface CCDrawerProps {
  propsVisible?: boolean;
  formmode?: FormModeEnum;
  title?: string;
  onClose?: () => void;
  footer?: ReactNode;
  loading?: boolean;
  onFinish?: (values?: any) => void;
  columns?: ProColumns<any>[];
  record?: any;
  onClickCallback?: () => void;
}

const CCDrawer: React.FC<CCDrawerProps & DrawerProps> = (props) => {
  const {
    propsVisible,
    children,
    title = '抽屉',
    formmode = FormModeEnum.view,
    width = 650,
    placement,
    closable = true,
    onClose,
    onFinish,
    footer,
    loading,
    columns,
    record,
    destroyOnClose = true,
    onClickCallback,
    ...ext
  } = props;
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const onClosed = () => {
    if (onClose) {
      onClose();
      setVisible(false);
    } else {
      setVisible(false);
    }
  };

  const onSubmit = () => {
    form.validateFields().then((values) => {
      if (onFinish) {
        onFinish(values);
        setVisible(false);
      }
    });
  };

  return (
    <Fragment>
      {children ? (
        <Fragment>
          {React.cloneElement(children as any, {
            onClick: () => {
              if (onClickCallback) {
                onClickCallback();
              }
              setVisible(true);
            },
            style: { display: 'inline-block' },
          })}
        </Fragment>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            if (onClickCallback) {
              onClickCallback();
            }
            setVisible(true);
          }}
        >
          打开
        </Button>
      )}
      <Drawer
        {...ext}
        title={formmode ? `${FormModeLabelEnum[formmode]}${title}` : title}
        placement={placement}
        width={width}
        closable={closable}
        onClose={onClosed}
        visible={visible}
        destroyOnClose={destroyOnClose}
      >
        <Form form={form}>
          <CCForm columns={columns} record={record} />
        </Form>
        <div style={{ width }} className={styles.btnWrap}>
          {footer || (
            <Fragment>
              {formmode === FormModeEnum.view ? (
                <Button onClick={onClosed}>关闭</Button>
              ) : (
                <Row>
                  <Button onClick={onClosed}>取消</Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: 8 }}
                    onClick={onSubmit}
                    loading={loading}
                  >
                    确定
                  </Button>
                </Row>
              )}
            </Fragment>
          )}
        </div>
      </Drawer>
    </Fragment>
  );
};

export default CCDrawer;
