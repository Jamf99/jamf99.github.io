import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import store from "./config/store"
// import firebase from 'firebase';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import UsersList from './components/UsersList.vue';
import TopicList from './components/TopicList.vue';
import Messages from './components/Messages.vue';
// require('firebase/firestore');
Vue.config.productionTip = false;
Vue.use(VueRouter);
// firebase.initializeApp(config);
// Vue.prototype.$firebase = firebase;

const routes=[
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/usersList", component: UsersList},
  { path: "/topicList", component: TopicList},
  { path: "/messages", component: Messages}
]

const router= new VueRouter({routes});

new Vue({
  vuetify,router,store,
  render: h => h(App),
}).$mount('#app')