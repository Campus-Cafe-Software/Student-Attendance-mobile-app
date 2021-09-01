import { createRouter, createWebHistory } from '@ionic/vue-router';

import ClassListPage from '../pages/ClassListPage.vue';
//const base = '/cafeweb/mobile/';

const routes = [{
        path: '/cafeweb/mobile/',
        redirect: '/cafeweb/mobile/classList'
    },
    {
        path: '/cafeweb/mobile/classList',
        component: ClassListPage,
        name: 'classList'
    },
    {
        path: '/cafeweb/mobile/submitTime/:id',
        component: () =>
            import ('../pages/SubmitTimePage.vue'),
        props: true,
        name: 'submitTime'
    },
    {
        path: '/cafeweb/mobile/studentList/:id',
        component: () =>
            import ('../pages/StudentListPage.vue'),
        props: true,
        name: 'studentList'
    },
    {
        path: '/cafeweb/mobile/login',
        component: () =>
            import ('../pages/loginPage.vue'),
        props: true,
        name: 'login'
    },
    {
        path: '/cafeweb/mobile/editTimes/:cid/:sid',
        component: () =>
            import ('../pages/EditTimes.vue'),
        props: true,
        name: 'editTimes'
    },
]

const router = createRouter({
    base: '/cafeweb/mobile/',
    //history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory('/cafeweb/mobile/'),
    routes
})

export default router