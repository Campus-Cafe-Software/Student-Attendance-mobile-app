import { createRouter, createWebHistory } from '@ionic/vue-router';

import ClassListPage from '../pages/ClassListPage.vue';

const routes = [{
        path: '/',
        redirect: '/classList'
    },
    {
        path: '/classList',
        component: ClassListPage,
        name: 'classList'
    },
    {
        path: '/submitTime/:id',
        component: () =>
            import ('../pages/SubmitTimePage.vue'),
        props: true,
        name: 'submitTime'
    },
    {
        path: '/studentList/:id',
        component: () =>
            import ('../pages/StudentListPage.vue'),
        props: true,
        name: 'studentList'
    },
    {
        path: '/login',
        component: () =>
            import ('../pages/loginPage.vue'),
        props: true,
        name: 'login'
    },
    {
        path: '/editTimes/:cid/:sid',
        component: () =>
            import ('../pages/EditTimes.vue'),
        props: true,
        name: 'editTimes'
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router