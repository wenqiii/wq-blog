export default [
  { path: '/create', component: '@/pages/blog/add' },
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/blog' },
      { path: '/blog', component: '@/pages/blog' },
      { path: '/blog-detail/:id', component: '@/pages/blog/detail' },
      { path: '/about', component: '@/pages/about' },
    ],
  },
];
