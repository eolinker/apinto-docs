import { defineClientConfig } from 'vuepress/client'
import { inject } from '@vercel/analytics'

export default defineClientConfig({
  setup() {
    // Inject Vercel Analytics
    inject()
  },
})
