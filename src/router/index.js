import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: '/',
        component: () => import('@/components/waterfall/index.vue'),
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router;
