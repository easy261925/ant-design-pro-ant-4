import { ReactNode } from 'react';
import { Rule } from 'antd/lib/form';
import { LayoutInterface, FormItemLayoutInterface } from '@/data';
import { ProColumnType } from '@ant-design/pro-table';

export interface FormItemContent {
  colLayout?: LayoutInterface;
  formItemLayout?: FormItemLayoutInterface;
  element?: ReactNode | null | any;
  rules?: Rule[];
  props?: Object;
}

export interface CCColumns<T> extends ProColumnType<T> {
  formItem?: FormItemContent;
}
