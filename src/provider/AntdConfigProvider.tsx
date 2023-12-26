import { ConfigProvider } from 'antd';

export default function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5599D6',
          fontFamily: 'Inter, sans-serif',
          borderRadius: 5,
        },
        components: {
          Form: {
            labelColor: '#7D7D7D',
            itemMarginBottom: 0,
          },
        },
      }}>
      {children}
    </ConfigProvider>
  );
}
