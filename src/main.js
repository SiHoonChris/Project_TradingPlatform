import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CommonFunction from './plugin/CommonFunction.js'

const app = createApp(App);
app.use(store);
app.use(router);
app.use(CommonFunction);
app.mount('#app');


