import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import CommonFunction from './plugin/CommonFunction.js'

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(store);
app.use(router);
app.use(CommonFunction);
app.mount('#app');
