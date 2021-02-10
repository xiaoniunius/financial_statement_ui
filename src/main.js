import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Routers from './router/router';
import Util from './libs/util';
import ViewUI from 'view-design';
import moment from 'moment';

// import style
import 'view-design/dist/styles/iview.css';
Vue.prototype.$moment = moment;
Vue.use(VueRouter);
Vue.use(ViewUI);

Vue.config.productionTip = false
// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  let f=from
  ViewUI.LoadingBar.start();
  Util.title(to.meta.title);
  next();
});

router.afterEach((to, from, next) => {
  let a=to + ';' + from + ';' + next
  ViewUI.LoadingBar.finish();
  window.scrollTo(0, 0);
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
