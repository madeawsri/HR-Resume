import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import Profile from '../views/account/profile.vue';
import Family from '../views/account/family.vue';
import Education from '../views/account/education.vue';
import Work from '../views/account/work.vue';
import Knowledge from '../views/account/knowledge.vue';
import Training from '../views/account/training.vue';

import Login from '../views/account/Login.vue';
import Logout from '../views/account/Logout.vue';

import Qualify from '../views/jobs/qualify.vue';
import Proof from '../views/jobs/proof.vue';
import Benefits from '../views/jobs/benefits.vue';
import Position from '../views/jobs/position.vue';
import Jobs from '../views/jobs/jobs.vue';
import Jobattr from '../views/jobs/jobsattr.vue';

Vue.use(VueRouter);



const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/qualify',
        name: 'qualify',
        component: Qualify,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/jobattr',
        name: 'jobattr',
        component: Jobattr,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/proof',
        name: 'proof',
        component: Proof,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/benefits',
        name: 'benefits',
        component: Benefits,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/position',
        name: 'position',
        component: Position,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/jobs',
        name: 'jobs',
        component: Jobs,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/family',
        name: 'Family',
        component: Family,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/education',
        name: 'Education',
        component: Education,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/work',
        name: 'Work',
        component: Work,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/training',
        name: 'Training',
        component: Training,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/knowledge',
        name: 'Knowledge',
        component: Knowledge,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue'),
    },
    { path: '*', redirect: '/' }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;