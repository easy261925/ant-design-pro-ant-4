import { Effect, Reducer } from 'umi';
import { query as queryUsers, getUserInfoService } from '@/services/user';
import { getPageQuery } from '@/utils/utils';
import { setToken, getToken } from '@/utils/axios';

export interface CurrentUser {
  avatar?: string;
  username?: string;
  nickname?: string;
  createTime?: string;
  gender?: string;
  loginIp?: string;
  loginTime?: string;
  phone?: string;
  userType?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  id?: string;
  unreadCount?: number;
  userRoles?: number[];
  loginName?: string;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const { token } = getPageQuery();
      // TODO 预览登录，真实开发请注释掉 mockToken 相关代码
      const mockToken = getToken();
      if (mockToken === 'test-token') {
        const mockUserInfo = {
          avatar: null,
          ban: 0,
          createTime: '2020-12-16 11:00:46',
          deleted: 0,
          gender: '0',
          id: 30,
          loginIp: '0',
          loginTime: '2020-12-16 11:01:09',
          nickname: 'test',
          openId: null,
          password: '96e79218965eb72c92a549dd5a330112',
          phone: null,
          sign: null,
          updateTime: '2020-12-23 12:57:36',
          userType: null,
          username: 'test',
          version: 1,
        };
        yield put({
          type: 'saveCurrentUser',
          payload: mockUserInfo,
        });
        return { success: true, data: { userInfo: mockUserInfo }, message: '登录成功！' };
        // eslint-disable-next-line
      } else {
        const { success, data, message } = yield call(getUserInfoService, token || '');
        if (token) {
          setToken(token as string);
        }
        if (success) {
          yield put({
            type: 'saveCurrentUser',
            payload: data.userInfo,
          });
        }
        return { success, data, message };
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
