<template lang="">
<div>
    <a href="#" class="dashboard-responsive-nav-trigger"><i class="fa fa-reorder"></i>เมนู</a>

    <div class="dashboard-nav">
        <div class="dashboard-nav-inner">

            <ul data-submenu-title="" v-show="0">
                <li class="active"><a href="/dashboard">Dashboard</a></li>
                <li><a href="/messages">ข้อความ <span class="nav-tag"> 2 </span></a></li>
            </ul>

            <ul data-submenu-title="บัญชีผู้ใช้">
                <li><a href="/profile">ข้อมูลส่วนตัว</a></li>
                <li><a href="/family">ข้อมูลครอบครัว</a></li>
                <li><a href="/education">ข้อมูลการศึกษา</a></li>
                <li><a href="/work">ข้อมูลการทำงาน</a></li>
                <li><a href="/training">ข้อมูลการฝึกอบรม</a></li>
                <li><a href="/knowledge">ข้อมูลความสามารถพิเศษ</a></li>
                <li><a href="/logout" style="color:red;font-weight: bold;">ออกจากระบบ</a></li>
            </ul>

            <ul data-submenu-title="เจ้าหน้าที่">
                <li><a href="/qualify">ข้อมูลคุณสมบัติผู้สมัคร</a></li>
                <li><a href="/proof">ข้อมูลหลักฐานการสมัคร</a></li>
                <li><a href="/benefits">ข้อมูลสวัสดิการและสิทธิประโยชน์</a></li>
                <li><a href="/position">ข้อมูลตำแหน่งสมัครงาน</a></li>
                <li><a href="/jobs">ข้อมูลประกาศรับสมัครงาน</a></li>
                
                <li><a href="#">นำข้อมูลออก Resume</a></li>

                <li><a href="/logout" style="color:red;font-weight: bold;">ออกจากระบบ</a></li>

            </ul>

            <div id="footer">
                <div class="copyrights">© 2020 JOBKSL-NP. All Rights Reserved.</div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    computed: {
        isLogged() {
            return this.$store.getters.isLogged
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
