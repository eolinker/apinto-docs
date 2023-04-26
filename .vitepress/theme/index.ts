import { h } from 'vue'
import Theme  from "vitepress/theme"
import './overrides.css'
import './rainbow.css'
import './vars.css'
import 'uno.css'

import FeatureAfter from './components/FeatureAfter.vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(FeatureAfter),
    })
  },
}
