import Vue from 'vue';
import VueRouter from 'vue-router';
import Flow from '../views/flow/index.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Flow',
        component: Flow
    }
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router;
