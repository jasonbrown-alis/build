import DefaultTheme from 'vitepress/theme'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import './custom.css'
import './tabs.css'
import '../shims.d.ts'
import 'prismjs/themes/prism-tomorrow.css';

export default {
	...DefaultTheme,
    enhanceApp({ app }) {
        app.component('tabs', Tabs);
        app.component('tab', Tab);
    }
};