import { BaseBean, Pagination } from '@/data';

export interface TestInterface extends BaseBean {
  username?: string;
  password?: string;
  textarea?: string;
  select?: string;
  multiple?: string[];
  dateRange?: string[] | number[];
  switch?: boolean;
  digit?: number;
  uploadFile?: any[];
  selectUser?: any[];
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<Pagination>;
}

export interface TestParams {
  username?: string;
  password?: string;
  id?: string;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
