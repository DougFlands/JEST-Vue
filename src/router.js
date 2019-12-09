import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin/list',
      name: 'adminList',
      component: () => import('./views/containers/Admin/list.vue')
    },
    {
      path: '/Todolist',
      name: 'todolist',
      component: () => import('./views/containers/TodoList/list.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '*',
      component: () => import('./views/Home.vue')
    }

  ],
});
