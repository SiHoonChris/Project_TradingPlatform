import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import mixins from "./mixins";
import CommonFunction from './plugin/CommonFunction.js'

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(store);
app.use(router);
app.mixin(mixins);
app.use(CommonFunction);
app.mount('#app');
