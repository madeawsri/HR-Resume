<template>
<nav id="navigation" class="menu">
    <ul id="responsive" >
    
        <li>
            <a id="current" href="/home">หน้าแรก</a>
            
        </li>

        <li v-if="0">
            <a href="#">Pages</a>
            <ul>
                <li><a href="job-page.html">Job Page</a></li>
                <li><a href="job-page-alt.html">Job Page Alternative</a></li>
                <li><a href="resume-page.html">Resume Page</a></li>
                <li><a href="shortcodes.html">Shortcodes</a></li>
                <li><a href="icons.html">Icons</a></li>
                <li><a href="pricing-tables.html">Pricing Tables</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </li>

        <li v-if="0">
            <a href="#">Browse Listings</a>
            <ul>
                <li><a href="browse-jobs.html">Browse Jobs</a></li>
                <li><a href="browse-resumes.html">Browse Resumes</a></li>
                <li>
                    <a href="browse-categories.html">Browse Categories</a>
                </li>
            </ul>
        </li>

        <li v-if="0">
            <a href="#">Dashboard</a>
            <ul>
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="dashboard-messages.html">Messages</a></li>
                <li>
                    <a href="dashboard-manage-resumes.html">Manage Resumes</a>
                </li>
                <li><a href="dashboard-add-resume.html">Add Resume</a></li>
                <li><a href="dashboard-job-alerts.html">Job Alerts</a></li>
                <li><a href="dashboard-manage-jobs.html">Manage Jobs</a></li>
                <li>
                    <a href="dashboard-manage-applications.html">Manage Applications</a>
                </li>
                <li><a href="dashboard-add-job.html">Add Job</a></li>
                <li><a href="dashboard-my-profile.html">My Profile</a></li>
            </ul>
        </li>
    </ul>

    <ul class="float-right">
        <li v-if="!isLogged">
            <a href="login" > <i class="fa fa-user"></i> ฝากประวัติ </a> 
            <!--<router-link to="login" > <i class="fa fa-user"></i> ฝากประวัติ </router-link> -->
        </li>
        <li v-if="isUser">
            <a href="/profile"><i class="fa fa-user"></i> บัญชีของฉัน</a>
        </li>
        <li v-if="isWebAdmin">
            <a href="/jobs"><i class="fa fa-user"></i> บัญชีของฉัน</a>
        </li>
        <li v-if="isLogged">
            <a href="/logout"><i class="fa fa-lock"></i> ออกจากระบบ</a>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
    computed: {
        isLogged() {
            return this.$store.getters['user/isLogged']
        },
        isUser() {
            return  (this.$store.getters['user/isLogged']) ? this.$store.getters['user/isUser'] :  false
        },
        isWebAdmin() {
            return  (this.$store.getters['user/isLogged']) ? this.$store.getters['user/isWebAdmin'] :  false
        }
    },
    
}
</script>
