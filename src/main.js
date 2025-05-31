import { createApp } from 'vue'
import App    from './App.vue'
import router from './router'
import store  from './store'
import axios  from 'axios'
import mixins from "./mixins";
import CreateChart1      from './plugin/CreateChart1.js'
import CreateChart3      from './plugin/CreateChart3.js'
import CreateTable       from './plugin/CreateTable.js'

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(store);
app.use(router);
app.mixin(mixins);
app.use(CreateChart1);
app.use(CreateChart3);
app.use(CreateTable);
app.mount('#app');
