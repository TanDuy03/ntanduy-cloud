import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EnvironmentPlugin from "vite-plugin-environment"
delete process.env['CommonProgramFiles(x86)'];
delete process.env['ProgramFiles(x86)']

export default defineConfig({
  plugins: [vue(), EnvironmentPlugin("all")],
  build: {
    outDir: 'dist',
    assetsDir: '',
    minify: 'terser',
    sourcemap: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
      toplevel: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'group-auth': [
            './src/components/auth/Login.vue',
            './src/components/auth/Register.vue',
            './src/components/auth/ResetPassword.vue',
          ],
          'group-layout': [
            './src/components/layout/Footer.vue',
          ],
          'group-page': [
            './src/components/pages/About.vue',
            './src/components/pages/Pricing.vue',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
})
