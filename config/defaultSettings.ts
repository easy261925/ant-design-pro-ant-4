import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
  version: string;
};

const proSettings: DefaultSettings = {
  version: '1.0.0',
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '演示系统',
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;
