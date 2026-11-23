import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pages, pageTitle } from './src/pages'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-page-entries',
      enforce: 'post',
      generateBundle: {
        order: 'post',
        handler(_, bundle) {
          const home = bundle['index.html']
          if (home?.type !== 'asset' || typeof home.source !== 'string') {
            this.error('Missing built index.html')
          }
          for (const page of pages.filter(page => page.path !== '/')) {
            this.emitFile({
              type: 'asset',
              fileName: page.path.slice(1) + '/index.html',
              source: home.source.replace(/<title>.*?<\/title>/, `<title>${pageTitle(page.label)}</title>`),
            })
          }
        },
      },
    },
  ],
})
