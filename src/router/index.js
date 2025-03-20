import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import TestListPage from '../views/TestListPage.vue';
import WeatherPage from '../views/WeatherPage.vue';
import UserListPage from '../views/UserListPage.vue';
import EditUserPage from '../views/EditUserPage.vue';

const routes = [
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/test-list',
        component: TestListPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/weather',
        component: WeatherPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/user-list',
        component: UserListPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/edit-user/:id',
        component: EditUserPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        redirect: '/login'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token');
        if (!token) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;