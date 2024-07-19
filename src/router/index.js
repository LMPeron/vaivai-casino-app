import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import AppLayoutAdmin from '@/layouts/AppLayoutAdmin.vue';
import useUserStore from '@/stores/user.js';

const routes = [
  {
    path: '/:auth',
    component: () => import('@/pages/AuthMiddleware.vue'),
  },
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'game/:category',
        name: 'main',
        meta: {
          breadcrumb: ['Main'],
        },
        component: () => import('@/pages/Main.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: AppLayoutAdmin,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'admin',
        meta: {
          breadcrumb: ['Admin'],
        },
        component: () => import('@/pages/Admin/Dashboard.vue'),
      },
      {
        path: 'casino',
        component: () => import('@/pages/Admin/Casino.vue'),
      },
      {
        path: 'banner',
        component: () => import('@/pages/Admin/Banner.vue'),
      },
      {
        path: 'report',
        component: () => import('@/pages/Admin/Report.vue'),
      },
      {
        path: 'report/player/:username',
        component: () => import('@/pages/Admin/Player.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta?.requiresAuth)) {
    const store = useUserStore();
    if (store.token) next();
    else window.location.replace('https://pitstopbet.com/?page=cassino');
  }
  next();
});

export default router;
