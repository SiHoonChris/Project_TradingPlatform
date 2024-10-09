import { createApp } from 'vue'
import App    from './App.vue'
import router from './router'
import store  from './store'
import axios  from 'axios'
import mixins from "./mixins";
import PageMoving from './plugin/PageMoving.js'
import CreateChart1      from './plugin/CreateChart1.js'
import DonutChart        from './plugin/DonutChart.js'
import CreateChart3      from './plugin/CreateChart3.js'
import ScatterplotChart  from './plugin/ScatterplotChart.js'
import CreateTable       from './plugin/CreateTable.js'
import FinancialStatements from './plugin/FinancialStatements.js'

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(store);
app.use(router);
app.mixin(mixins);
app.use(PageMoving);
app.use(CreateChart1);
app.use(DonutChart);
app.use(CreateChart3);
app.use(ScatterplotChart);
app.use(CreateTable);
app.use(FinancialStatements);
app.mount('#app');
