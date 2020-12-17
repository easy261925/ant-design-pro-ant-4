import request from '@/utils/axios';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/server/api/msmservice/sendMsg`, {
    method: 'POST',
    data: mobile
  });
}

export async function loginService(params: LoginParamsType) {
  return request('/server/api/userservice/login', {
    method: 'POST',
    data: params,
  });
}
