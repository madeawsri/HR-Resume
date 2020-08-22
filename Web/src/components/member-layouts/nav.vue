<template lang="">
<div>
    <a href="#" class="dashboard-responsive-nav-trigger"><i class="fa fa-reorder"></i>เมนู</a>

    <div class="dashboard-nav">
        <div class="dashboard-nav-inner">

            <ul data-submenu-title="บัญชีผู้ใช้" v-if="isUser ">
                <li class="active-submenu"><a>ข้อมูลเบื้องต้น</a>
                    <ul>
                        <li>
                            <router-link :to="'profile'">ข้อมูลส่วนตัว</router-link>
                        </li>
                        <li>
                            <router-link :to="'family'">ข้อมูลครอบครัว</router-link>
                        </li>
                        <li>
                            <router-link :to="'education'">ข้อมูลการศึกษา</router-link>
                        </li>
                        <li>
                            <router-link :to="'work'">ข้อมูลการทำงาน</router-link>
                        </li>
                        <li>
                            <router-link :to="'training'">ข้อมูลการฝึกอบรม</router-link>
                        </li>
                        <li>
                            <router-link :to="'knowledge'">ข้อมูลความสามารถพิเศษ</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link :to="'logout'" style="color:red;font-weight: bold;">ออกจากระบบ</router-link>
                </li>
            </ul>

            <ul data-submenu-title="เจ้าหน้าที่" v-if="isWebAdmin">
                <li class="active-submenu"><a>ข้อมูลเบื้องต้น</a>
                    <ul>
                        <li>
                            <router-link :to="'qualify'">ข้อมูลคุณสมบัติผู้สมัคร</router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'proof'}">ข้อมูลหลักฐานการสมัคร</router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'benefits'}">ข้อมูลสวัสดิการและสิทธิประโยชน์</router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'position'}">ข้อมูลตำแหน่ง</router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <router-link :to="{name:'jobattr'}" style="font-weight: bold;">คุณสมบัติประจำตำแหน่ง</router-link>
                </li>
                <li>
                    <router-link :to="{name:'jobs'}" style="font-weight: bold;">ข้อมูลประกาศรับสมัครงาน</router-link>
                </li>
                <li><a href="#" style="color:#000099;font-weight: bold;">นำข้อมูลออก Resume</a></li>

                <li class="active-submenu"><a>จัดการผู้สมัครงาน</a>
                    <ul>
                        <li>
                            <router-link to="ajobinterest" style="color:#000">ค้นหา/ รับสมัครงาน </router-link>
                        </li>
<li><router-link to="ajobinterest" style="color:#000">นัดสัมภาษณ์</router-link></li>

                    </ul>
                </li>

                <li>
                    <router-link :to="{name:'Logout'}" style="color:red;font-weight: bold;">ออกจากระบบ</router-link>
                </li>
            </ul>

            <div id="footer">
                <div class="copyrights">© 2020 JOBKSL-NP. All Rights Reserved.</div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
//this.$store.getters['user/isLogged']
export default {
    computed: {
        isLogged() {
            return this.$store.getters.isLogged
        }
    },
    created() {
        this.isWebAdmin = this.$store.getters['user/isWebAdmin']
        this.isAdmin = this.$store.getters['user/isAdmin']
        this.isUser = !(this.isWebAdmin) && !(this.isAdmin)
    },
    mounted() {
        console.log('check status isWebAdmin')
        console.log(this.isUser)

        this.$nextTick(() => {

            const $ = require('jquery')
            window.$ = $;
            $('.dashboard-nav ul li a').on('click', function (e) {
                if ($(this).closest("li").children("ul").length) {
                    if ($(this).closest("li").is(".active-submenu")) {
                        $('.dashboard-nav ul li').removeClass('active-submenu');
                    } else {
                        $('.dashboard-nav ul li').removeClass('active-submenu');
                        $(this).parent('li').addClass('active-submenu');
                    }
                    e.preventDefault();
                }
            });
            $(window).on('load resize', function () {
                var wrapperHeight = window.innerHeight;
                var headerHeight = $("#header-container").height();
                var winWidth = $(window).width();
                if (winWidth > 992) {
                    $(".dashboard-nav-inner").css('max-height', wrapperHeight - headerHeight);
                } else {
                    $(".dashboard-nav-inner").css('max-height', '');
                }
            });
            $('.dashboard-responsive-nav-trigger').on('click', function (e) {
                e.preventDefault();
                $(this).toggleClass('active');
                var dashboardNavContainer = $('body').find(".dashboard-nav");
                if ($(this).hasClass('active')) {
                    $(dashboardNavContainer).addClass('active');
                } else {
                    $(dashboardNavContainer).removeClass('active');
                }
            });
        })

    },
    data() {
        return {
            isAdmin: false,
            isWebAdmin: false,
            isUser: false
        }
    }

}
</script>

<style scoped>
#footer {
    background-color: transparent;
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>
