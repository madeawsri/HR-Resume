<template>
<nav id="navigation" class="menu">
    <ul id="responsive" v-if="0">

        <li><a href="#" id="current">บัญชีผู้ใช้</a>
            <ul>
                <li><a href="/profile">ข้อมูลส่วนตัว</a></li>
                <li><a href="/family">ข้อมูลครอบครัว</a></li>
                <li><a href="/education">ข้อมูลการศึกษา</a></li>
                <li><a href="/work">ข้อมูลการทำงาน</a></li>
                <li><a href="/training">ข้อมูลการฝึกอบรม</a></li>
                <li><a href="/knowledge">ข้อมูลความสามารถพิเศษ</a></li>
            </ul>
        </li>

    </ul>

    <ul class="responsive float-right">

        <li><a href="/home"><i class="fa fa-home"></i> หน้าแรก</a></li>

        <li v-if="isWebAdmin"><a href="/message"><i class="fa fa-envelope"></i> ผู้สมัคร <span class="nav-tag text-green"> 0 </span> </a> </li>
        <li v-if="isUser"><a href="/message" style="color: blue  "><i class="fa fa-envelope"></i> ตำแหน่งว่าง <span class="nav-tag text-red"> 0 </span> </a> </li>

        <li><router-link :to="'logout'"><i class="fa fa-lock"></i> ออกจากระบบ</router-link></li>
    </ul>

  

</nav>
</template>

<script>
export default {
    data() {
        return {
            isWebAdmin: this.$store.getters['user/isWebAdmin'],
            isUser: this.$store.getters['user/isUser'],
        }
    }
}
</script>

<style scoped>
.text-red {
    color: red
}

.text-green {
    color: green;
}
</style>
