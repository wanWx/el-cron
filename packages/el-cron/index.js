import elCron from './index.vue'

elCron.install = function (Vue) {
  Vue.component(elCron.name, elCron)
}

export default elCron