import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueCookies from 'vue-cookies'
import axios from 'axios';
import VModal from 'vue-js-modal';

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

Vue.config.productionTip = false;
Vue.use(VueCookies);

Vue.use(VModal, { dialog: true });
import VueExpandPanel from 'vue-expand-panel'
 
// import styles
import 'vue-expand-panel/dist/vue-expand-panel.css'
 
// mount with global
Vue.use(VueExpandPanel)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')