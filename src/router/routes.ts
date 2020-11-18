import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
       { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'ArquivoOrdem',
        name: 'arquivoOrdem',
        component: () => import('pages/ArquivoOrdem/ArquivoOrdemList.vue')
      },
      {
        path: 'Ordem',
        name: 'Ordem',
        component: () => import('pages/Ordem/OrdemList.vue')
      },
      {
        path: 'PainelGerencial',
        name: 'painelGerencial',
        component: () => import('pages/PainelGerencial/PainelGerencialList.vue')
      },
      {
        path: 'auth-register',
        name: 'register',
        component: () => import('pages/Auth/Register.vue')
      },
      {
        path: 'auth-login',
        name: 'login',
        component: () => import('pages/Auth/Login.vue')
      },


    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
