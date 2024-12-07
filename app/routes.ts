import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  layout('ui/home-layout.tsx', [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('login', 'routes/login.tsx'),
    route('posts', 'routes/posts.tsx'),
  ]),
  ...prefix('app', [
    //
    layout('ui/app-layout.tsx', [
      //
      index('routes/app/dashboard.tsx'),
    ]),
  ]),
] satisfies RouteConfig
