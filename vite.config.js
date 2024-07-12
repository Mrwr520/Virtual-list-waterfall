import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { join } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 代理所有 /api 的请求，该求情将被代理到 target 中
      "/api": {
        // 代理请求之后的请求地址
        target: "",
        // 跨域
        changeOrigin: true,
      },
    },
  },
  // 配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
