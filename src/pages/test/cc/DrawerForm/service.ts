import request from '@/utils/request';
import { TestParams } from './data';

export async function getAllServices(params: TestParams) {
  return request('/api/test', {
    params,
  });
}
