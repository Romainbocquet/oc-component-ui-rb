import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({insertTypesEntry: true})
  ],
  build: {
    lib: {
      entry: {
        'forms': path.resolve(__dirname, 'src/forms'),
        'nav': path.resolve(__dirname, 'src/nav'),
        'common': path.resolve(__dirname, 'src/common'),
        '': path.resolve(__dirname, 'src/index.ts'),
      },
      name: 'oc-component-ui-rb',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName ? entryName + "/" : ""}oc-component-ui-rb.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})