/*!

 =========================================================
 * Vue Now UI Kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import * as firebase from "firebase";

Vue.config.productionTip = false;
const firebaseConfig = {
  apiKey: "AIzaSyCTek0mLj6mrlreMLw-fs0qsoiqbsxDDcQ",
  authDomain: "cool-clarity-186913.firebaseapp.com",
  databaseURL: "https://cool-clarity-186913.firebaseio.com",
  projectId: "cool-clarity-186913",
  storageBucket: "cool-clarity-186913.appspot.com",
  messagingSenderId: "662626120442",
  appId: "1:662626120442:web:57ca064ddca39a2349cf43"
};
firebase.initializeApp(firebaseConfig);
Vue.use(NowUiKit);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
