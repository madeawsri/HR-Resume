<template lang="">
<div>
    <a href="#" class="dashboard-responsive-nav-trigger"><i class="fa fa-reorder"></i>เมนู</a>

    <div class="dashboard-nav" style="zoom:0.8">
        <div class="dashboard-nav-innerx">
            <ul v-if="isUser ">
                <li :class="(cmenu1)?'active-submenu':''"><a>ข้อมูลเบื้องต้น</a>
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
                    <router-link :to="'my-job'" style="color:green;font-weight: bold;">คิดตามการสมัครงาน</router-link>
                </li>
                <li>
                    <router-link :to="'logout'" style="color:red;font-weight: bold;">ออกจากระบบ</router-link>
                </li>
            </ul>

            <ul v-if="isWebAdmin">
                <li :class="(cmenu)?'active-submenu':''" @click="onShow"><a>ข้อมูลเบื้องต้น</a>
                    <ul v-show="cmenu">
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
                        <li>
                            <router-link :to="{name:'jobattr'}">คุณสมบัติประจำตำแหน่ง</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link :to="{name:'jobs'}" style="font-weight: bold;">ข้อมูลประกาศรับสมัครงาน</router-link>
                </li>
                <li>
                    <router-link :to="{name:'members'}" style="font-weight: bold;">ข้อมูลผู้ลงทะเบียน</router-link>
                </li>
                <li v-if="0"><a href="#" style="color:#000099;font-weight: bold;">นำข้อมูลออก Resume</a></li>

                <li :class="(cmenu2)?'active-submenu':''" @click="onShow2"><a>จัดการผู้สมัครงาน</a>
                    <ul v-show="cmenu2">
                        <li>
                            <router-link to="ajobinterest" style="color:#000">ค้นหา/ รับสมัครงาน </router-link>
                        </li>
                        <li>
                            <router-link to="interview" style="color:#000">นัดสัมภาษณ์</router-link>
                        </li>

                        <li>
                            <router-link to="interview-report" style="color:#000">นัดทำสัญญา</router-link>
                        </li>

                        <li>
                            <router-link to="jobclosed" style="color:#000">สิ้นสุดการทำสัญญา</router-link>
                        </li>

                        <li>
                            <router-link to="layoff" style="color:#000">** เลิกจ้าง / ลาออก</router-link>
                        </li>

                    </ul>
                </li>

                <li v-if="0">
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

    },
    data() {
        return {
            isAdmin: false,
            isWebAdmin: false,
            isUser: false,
            cmenu: true,
            cmenu1: true,
            cmenu2: true,
        }
    },
    methods: {
        onShow() {
            this.cmenu = !this.cmenu
            //console.log(this.cmenu)
        },
        onShow1() {
            this.cmenu1 = !this.cmenu1
            //console.log(this.cmenu1)
        },
        onShow2() {
            this.cmenu2 = !this.cmenu2
            //console.log(this.cmenu2)
        }
    },

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
