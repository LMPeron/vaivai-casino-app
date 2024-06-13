import { createRouter, createWebHistory } from 'vue-router';
// import AppLayout from "@/layout/AppLayout.vue";
import useUserStore from '@/stores/user.js';

const routes = [
  {
    path: '/',
    // component: AppLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        name: 'main',
        meta: {
          breadcrumb: ['Main'],
        },
        component: () => import('@/pages/Main.vue'),
      },
    ],
  },
  {
    path: '/:auth',
    component: () => import('@/pages/AuthMiddleware.vue'),
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
    else next('/login');
  }
  next();
});

export default router;
