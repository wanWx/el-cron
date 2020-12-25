import Vue from 'vue'
import App from './App.vue'
import {
  Card,
  Radio,
  RadioGroup,
  Input,
  InputNumber,
  Checkbox,
  CheckboxGroup,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  DatePicker,
  Tooltip,
  Select,
  Option,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import elCron from './../packages/index'

Vue.use(Card);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Tooltip);
Vue.use(Select);
Vue.use(Option);
Vue.use(elCron);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
