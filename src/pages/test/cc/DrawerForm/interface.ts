import { ReactNode } from 'react';
import { Rule } from 'antd/lib/form';
import { LayoutInterface, FormItemLayoutInterface } from '@/data';
import { ProColumnType } from '@ant-design/pro-table';
import { TextAreaProps } from 'antd/lib/input/TextArea';

interface FormItemPropsInterface {
  rules?: Rule[];
  placeholder?: string;
}

export interface FormItemContent {
  colLayout?: LayoutInterface;
  formItemLayout?: FormItemLayoutInterface;
  element?: ReactNode | null | any;
  props?: FormItemPropsInterface & TextAreaProps;
}

export interface CCColumns<T> extends ProColumnType<T> {
  formItem?: FormItemContent;
}
