import DefaultTheme from 'vitepress/theme'
import {Tabs, Tab} from 'vue3-tabs-component';
import './custom.css'
import './tabs.css'

export default {
	...DefaultTheme,
    enhanceApp({ app }) {
        app.component('tabs', Tabs);
        app.component('tab', Tab);
    }
};