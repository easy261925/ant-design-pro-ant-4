import { BaseBean } from '@/data';

export interface TodoInterface extends BaseBean {
  status?: number;
  content?: string;
  handler?: string;
}
