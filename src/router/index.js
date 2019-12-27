import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import UserPage from '../components/index/UserPage.vue';
const router = new VueRouter({
routes: [
        {
            path: '/',
            component: UserPage,
            children: [
            ]
        },
        // {
        //     path: '*',
        //     component: ErrorPage,
        // }
],
mode: 'history'
});
export default router;

