import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  devServer: {
    port: 8008,
    host: '0.0.0.0',
  },
  dva: {
    immer: true, // 开启了触发reducers时不会报错
    hmr: true,
  },
  routes,
});
