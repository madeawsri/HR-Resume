<template lang="dateFormatThai">
<memberLayout>
    <div slot="content">

        <div class="col-lg-12 col-md-12">
            <form @submit.prevent="sendData">
                <div class="dashboard-list-box margin-top-0">
                    <h4>{{headTitle}}
                        <button type="button" v-show="isSelectJob" class="button margin-bottom-0  float-xl-right pull-right " @click="alertLineNotify"> นัดสัมภาษณ์ LineNotify </button>
                        <!--<a href="#" @click="alertLineNotify" v-show="isSelectJob" class="button" style="margin-right:5px;"> นัดสัมภาษณ์ LineNotify </a>-->
                    </h4>

                    <div class="dashboard-list-box-content">

                        <div class="submit-page">
                            <div class="form" style="width:35%">
                                <h5> ตำแหน่งเปิดรับสมัคร </h5>
                                <v-multiselect placeholder="รายชื่อผู้สมัคร " label="topic" track-by="topic" v-model="dataForm.job" :options="lstJobs" :multiple="false" :close-on-select="true" :hide-selected="true" :show-labels="false" @select="selectJob"></v-multiselect>
                            </div>
                            <div class="form" style="width:30%">
                                <h5> วันที่นัดสัมภาษณ์ </h5>
                                <v-date v-model="dataForm.nuddate" class="datetime-picker" value-type="format" format="YYYY-MM-DD" :lang="dateFormatThai" type="date" placeholder="วันที่นัดสัมภาษณ์"></v-date>
                            </div>
                            <div class="form" style="width:35%">
                                <h5> ข้อความถึงผู้สมัคร </h5>
                                <input type="text" v-model="dataForm.nudnote" class="form-control input-text" />
                            </div>

                        </div>

                    </div>
                </div>
            </form>
            <div class="dashboard-list-box margin-top-30">
                <div class="dashboard-list-box-content">

                    <!-- Table <i class="fa fa-check"></i>-->

                    <table class="manage-table responsive-table">

                        <tr>
                            <th style="width:15%"><i class="fa fa-tasks"></i>บัตรประชาชน</th>
                            <th><i class="fa fa-file-text"></i> ชื่อ-สกุล</th>
                            <th><i class="fa fa-file-text"></i> เบอร์โทร</th>
                            <th><i class="fa fa-file-text"></i> วันที่นัดสัมภาษณ์</th>
                            <th><i class="fa fa-file-text"></i> ข้อความถึงผู้สมัคร</th>
                            <th></th>

                        </tr>

                        <tr style="padding: 2px 2px;" v-for="(item, index) in lstProfile" :key="index">
                            <td style="padding: 2px 2px;font-weight:bold;" class="title"> {{item.profileid}}</td>
                            <td style="padding: 2px 2px;font-weight:bold;" class="title"> {{ item.nameth}}</td>
                            <td style="padding: 2px 2px;font-weight:bold;" class="title"> {{ item.phone || " - "}}</td>
                            <td style="padding: 2px 2px;font-weight:bold;" class="title">

                                <div class="flex" style="height:20px">
                                    {{item.nuddate | moment('DD MMMM YYYY')}}
                                    <div class="pull-right" v-show="item.nuddate !== null">
                                        <div style="display:flex;height:30px;">
                                            <button type="button" class="button " style="padding: 0px 20px;" @click="cancelApplyJob(item.profileid)"><i class="ln ln-icon-Arrow-TurnRight"></i>ยกเลิก</button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td style="padding: 2px 2px;font-weight:bold;">{{item.nudnote}}</td>
                            <td style="padding: 2px 2px;">

                                <div class="flex" style="height:20px">
                                    <i class="ln ln-icon-Double-Tap" style="font-weight:bold" title="สมัครมาด้วยตนเอง" v-show="!item.regstatus"></i>
                                    <div class="pull-right" v-show="dataForm.nuddate">
                                        <div style="display:flex;height:30px;">
                                            <button @click="dialogInfo(item.profileid)" v-show="isSelectJob" class="button" style="margin-right:5px;padding: 0px 20px;"> นัดสัมภาษณ์ </button>
                                        </div>
                                    </div>
                                </div>

                            </td>
                        </tr>

                    </table>

                </div>
            </div>

            <div class="dashboard-list-box margin-top-30" v-show="0">
                <div class="" ref="info">

                    <div class="col-sm-2">
                        <img :src="profileImg" alt="" class="margin-top-0 img-rounded img-responsive">
                    </div>
                    <div class="col-sm-10" align="left">

                        <div>
                            <ul class="tabs-nav">
                                <li class=""><a href="#tab1">ข้อมูลส่วนตัว</a></li>
                                <li><a href="#tab2">ครอบครัว</a></li>
                                <li><a href="#tab3">ประวัติการศึกษา</a></li>
                                <li><a href="#tab4">ประวัติการงาน</a></li>
                                <li><a href="#tab5">ประวัติอบรม</a></li>
                                <li><a href="#tab6">ความสามารถพิเศษ</a></li>
                                <li><a href="#tab7">ตำแหน่งที่เคยสนใจ</a></li>

                            </ul>

                            <div class="tabs-container">
                                <!-- Login -->
                                <div class="tab-content" id="tab1" style="display: none;">

                                    <p class="text-h"><strong>เลขบัตรประจำตัวประชาชน</strong>: {{memberInfo.profileid}} </p>
                                    <p class="text-h"><strong>ชื่อ-สกุล</strong> : {{memberInfo.nameth}}</p>
                                    <p class="text-h"><strong>น้ำหนัก</strong>: {{memberInfo.weight}} <strong> กิโลกรัม</strong> <strong>ส่วนสูง</strong>: {{memberInfo.height}} <strong>เซ็นติเมตร</strong></p>
                                    <p class="text-h"><strong>วันเกิด</strong>: {{memberInfo.birthday }} <br>
                                        <strong>อายุ</strong>: {{ memberInfo.cbirthday | moment("from", "now", true) }}
                                    </p>
                                    <p class="text-h"><strong>เบอร์โทรที่ติดต่อได้</strong>: {{memberInfo.phone}} </p>
                                    <p class="text-h"><strong>อีเมล์</strong>: {{memberInfo.email}} <br>
                                        <strong>ไลน์ไอดี</strong>: {{memberInfo.lineid || " ไม่มีไลน์ไอดี "}}
                                    </p>
                                    <p class="text-h"><strong>ประเภทใบอนุญาตขับขี่</strong>: {{memberInfo.carid||"-"}} </p>
                                    <p class="text-h">
                                        <strong>วุฒิการศึกษาสูงสุด</strong>: {{getValue(memberInfo.edu,0) }}
                                        <!--{{ lstProfile.edu | getArray(0) }}-->
                                        <strong>สาขา</strong>: {{getValue(memberInfo.edu,1) }} <br>
                                        <strong>ปีที่จบ</strong>: {{getValue(memberInfo.edu,3) }}
                                        <strong>เกรดเฉลี่ย</strong>: {{getValue(memberInfo.edu,4) }}
                                    </p>
                                    <p class="text-h"><strong>ประสบการณ์ทำงาน</strong>:</p>
                                    <ul class="list-1" v-for="(item, index) in lstWorks" :key="index">

                                        <li style="padding:0px;">
                                            <p style="margin-bottom:0px;font-size:16px;">
                                                <strong>สถานที่ทำงาน</strong>: {{item.workplace}}
                                                <strong>ระยะเวลา</strong>: {{item.endtime - item.begintime}} <strong>ปี </strong><br>
                                                <strong>ตำแหน่ง</strong> {{item.position}}
                                                <strong>เงินเดือน</strong> {{(item.salary*1).toLocaleString()}} <strong> บาท</strong>
                                            </p>
                                        </li>

                                    </ul>

                                    <div class="message-by">
                                        <div class="message-by-headline">
                                            <h5>ตำแหน่งที่รับสมัคร <i style="font-size:18px;">{{selectJobTopic || "คุณยังไม่เลือกงานที่สมัคร "}}</i></h5><br>

                                        </div>

                                    </div>

                                </div>

                                <!-- Register -->
                                <div class="tab-content" id="tab2" style="display: none;">

                                    <!-- Main -->
                                    <div class="container">

                                        <div class="six columns">

                                            <h4><i class="text-topic"> ข้อมูลครอบครัว </i></h4>
                                            <ul class="footer-links">
                                                <li>
                                                    <p class="text-h"><strong>ชื่อ-สกุล (ภรรยา/สามี)</strong> : {{dataInfo.family.namewh}}</p>
                                                    <p class="text-h"><strong>อาชีพ</strong> : {{dataInfo.family.career}}</p>
                                                    <p class="text-h"><strong>ตำแหน่ง</strong> : {{dataInfo.family.position}}</p>
                                                    <p class="text-h"><strong>สภานที่ทำงาน</strong> : {{dataInfo.family.workplace}}</p>
                                                    <p class="text-h"><strong>จำนวนบุตร</strong> : {{dataInfo.family.numchild}}</p>
                                                    <p class="text-h"><strong>จำนวนบุตรที่กำลังศึกษา</strong> : {{dataInfo.family.numchildedu}}</p>
                                                    <p class="text-h"><strong>จำนวนบุตรที่ไม่ได้กำลังศึกษา</strong> : {{dataInfo.family.numchildeduno}}</p>
                                                    <p class="text-h"><strong>จำนวนบุตรที่มีงานทำ</strong> : {{dataInfo.family.numchildwork}}</p>
                                                </li>
                                            </ul>

                                        </div>

                                        <div class="six columns">
                                            <h4><i class="text-topic">ข้อมูลบิดา-มารดา</i></h4>
                                            <ul class="footer-links">
                                                <li>
                                                    <p class="text-h"><strong>ชื่อ-สกุล (บิดา)</strong> : {{dataInfo.family.father}}</p>
                                                    <p class="text-h"><strong> - อายุ</strong> : {{dataInfo.family.fage}}</p>
                                                    <p class="text-h"><strong> - เชื้อชาติ</strong> : {{dataInfo.family.fnation}}</p>
                                                    <p class="text-h"><strong> - สัญชาติ</strong> : {{dataInfo.family.forigin}}</p>
                                                    <p class="text-h"><strong> - สถานภาพ</strong> : {{dataInfo.family.flive}}</p>

                                                    <p class="text-h"><strong>ชื่อ-สกุล (มารดา)</strong> : {{dataInfo.family.mother}}</p>
                                                    <p class="text-h"><strong> - อายุ</strong> : {{dataInfo.family.mage}}</p>
                                                    <p class="text-h"><strong> - เชื้อชาติ</strong> : {{dataInfo.family.mnation}}</p>
                                                    <p class="text-h"><strong> - สัญชาติ</strong> : {{dataInfo.family.morigin}}</p>
                                                    <p class="text-h"><strong> - สถานภาพ</strong> : {{dataInfo.family.mlive}}</p>

                                                </li>
                                            </ul>
                                        </div>

                                        <div class="twelve columns">
                                            <h4><i class="text-topic">ข้อมูลผู้ที่สามารถติดต่อได้</i></h4>
                                            <ul class="footer-links">
                                                <li>
                                                    <p class="text-h"><strong>ชื่อ-สกุล (สามารถติดต่อได้)</strong> : {{dataInfo.family.nameo}}</p>
                                                    <p class="text-h"><strong> - เบอร์โทร</strong> : {{dataInfo.family.phoneo}}</p>
                                                    <p class="text-h"><strong> - ความสัมพันธ์</strong> : {{dataInfo.family.relation}}</p>
                                                    <p class="text-h"><strong> - ที่อยู่</strong> : </p>
                                                    <p class="text-h">
                                                        {{dataInfo.family.addro}}
                                                    </p>

                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                </div>

                                <div class="tab-content" id="tab3" style="display: none;">
                                    <!-- Main -->
                                    <div class="container">

                                        <div class="three columns" v-for="(item, index) in dataInfo.education" :key="'e'+index">
                                            <h4><i class="text-topic"> {{item.levelname}} </i></h4>
                                            <ul class="footer-links">
                                                <li>
                                                    <p class="text-h"><strong>ชื่อสถาบัน</strong> : <br> {{item.institution}}</p>
                                                    <p class="text-h"><strong>สาขาวิชาที่จบ</strong> : <br> {{item.subject}}</p>
                                                    <p class="text-h"><strong>ปีการศึกษา (เริ่ม)</strong> : {{item.begintime}} </p>
                                                    <p class="text-h"><strong>ปีการศึกษา (จบ)</strong> : {{item.endtime}} </p>
                                                    <p class="text-h"><strong>เกรดเฉลี่ย</strong> : {{item.gpa}}</p>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                <div class="tab-content" id="tab4" style="display: none;">
                                    <!-- Main -->
                                    <div class="container">
                                        <div class="three columns" v-for="(item, index) in dataInfo.work" :key="'w'+index">
                                            <h4><i class="text-topic"> {{item.workplace}} </i></h4>
                                            <ul class="footer-links">
                                                <li>
                                                    <p class="text-h"><strong>ระยะเวลาปี (จาก)</strong> : {{item.begintime}} </p>
                                                    <p class="text-h"><strong>ระยะเวลาปี (ถึง)</strong> : {{item.endtime}} </p>
                                                    <p class="text-h"><strong>ตำแหน่งงาน</strong> : {{item.position}}</p>
                                                    <p class="text-h"><strong>เงินเดือนล่าสุด (บาท)</strong> : {{item.salary}}</p>
                                                    <p class="text-h"><strong>ลักษณะงานโดยย่อ</strong> : <br> {{item.detail}}</p>
                                                    <p class="text-h"><strong>เหตุผลที่ออกงาน</strong> : <br> {{item.note}}</p>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                <div class="tab-content" id="tab5" style="display: none;">
                                    <!-- Main -->
                                    <div class="container">

                                        <div class="three columns" v-for="(item, index) in dataInfo.training" :key="'t'+index">
                                            <h4><i class="text-topic"> {{item.course}} </i></h4>
                                            <ul class="footer-links">
                                                <li>
                                                    <p class="text-h"><strong>สถานที่จัดอบรม</strong> : <br> {{item.location}} </p>
                                                    <p class="text-h"><strong>ปีที่อบรม</strong> : {{item.tyear}} </p>

                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                <div class="tab-content" id="tab7" style="display: none;">

                                    <div class="message-by" v-for="(item, index) in lstMyJob" :key="'myjob'+index">
                                        <div class="message-by-headline">
                                            <h5>
                                                ตำแหน่งที่รับสมัคร <i style="font-size:18px;">{{item.pname || "คุณยังไม่เลือกงานที่สมัคร "}}</i>
                                                วันที่สมัคร <i style="font-size:18px;">{{item.regdate | moment("DD MMMM YYYY") }}</i>
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-content" id="tab6" style="display: none;">
                                    <!-- Main -->
                                    <div class="container">

                                        <div class="four columns">
                                            <h4><i class="text-topic"> ทักษะด้านการใช้เครื่องมือ </i></h4>
                                            <ul class="footer-links">
                                                <li>
                                                    <p class="text-h"><strong>ความสามารถด้านการใช้คอมพิวเตอร์ / โปรแกรม</strong> : <br> {{dataInfo.knowledge.topic}} </p>
                                                    <p class="text-h"><strong>เครื่องมือที่เคยใช้ในสำนักงาน</strong> : <br> {{dataInfo.knowledge.detail}} </p>

                                                    <p class="text-h"><strong>งานด้านช่างฝีมือ</strong> : <br> {{dataInfo.knowledge.workid}} </p>
                                                    <p class="text-h"><strong>งานด้านช่างฝีมือ อื่นๆ</strong> : <br> {{dataInfo.knowledge.workname}} </p>

                                                    <p class="text-h"><strong>ใบอนุญาตขับขี่</strong> : <br> {{ memberInfo.carid || ' - '}} </p>

                                                </li>
                                            </ul>
                                        </div>

                                        <div class="four columns">
                                            <h4><i class="text-topic"> ทักษะด้านภาษา </i></h4>
                                            <ul class="footer-links">
                                                <li>

                                                    <p class="text-h"><strong>ทักษะด้านภาษา อังกฤษ (อ่าน)</strong> : {{dataInfo.knowledge.reng}} </p>
                                                    <p class="text-h"><strong>ทักษะด้านภาษา อังกฤษ (เขียน)</strong> : {{dataInfo.knowledge.weng}} </p>
                                                    <p class="text-h"><strong>ทักษะด้านภาษา อังกฤษ (พูด)</strong> : {{dataInfo.knowledge.seng}} </p>

                                                    <p class="text-h"><strong>ทักษะด้านภาษา จีน (อ่าน)</strong> : {{dataInfo.knowledge.rch}} </p>
                                                    <p class="text-h"><strong>ทักษะด้านภาษา จีน (เขียน)</strong> : {{dataInfo.knowledge.wch}} </p>
                                                    <p class="text-h"><strong>ทักษะด้านภาษา จีน (พูด)</strong> : {{dataInfo.knowledge.sch}} </p>

                                                    <p class="text-h"><strong>ทักษะด้านภาษา อื่น (ระบุ)</strong> : {{dataInfo.knowledge.oth}} </p>
                                                    <p class="text-h"><strong>ทักษะด้านภาษา อื่น (อ่าน)</strong> : {{dataInfo.knowledge.roth}} </p>
                                                    <p class="text-h"><strong>ทักษะด้านภาษา อื่น (เขียน)</strong> : {{dataInfo.knowledge.woth}} </p>
                                                    <p class="text-h"><strong>ทักษะด้านภาษา อื่น (พูด)</strong> : {{dataInfo.knowledge.soth}} </p>

                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div class="container">
                                        <div class="eight  columns">
                                            <h4><i class="text-topic"> ประวัติเจ็บป่วย/อาชญากรรม </i></h4>
                                            <ul class="footer-links">
                                                <li>

                                                    <p class="text-h"><strong>ท่านเคยเจ็บป่วยขนาดหนัก หรือมีโรคติดต่อร้ายแรงหรือไม่</strong> : {{(dataInfo.knowledge.sick)?'เคย':'ไม่เคย'}} </p>
                                                    <p class="text-h"><strong>ท่ายเคยเป็นโรคติดต่อ ระบุ</strong> : {{dataInfo.knowledge.sickname}} </p>
                                                    <p class="text-h"><strong>ท่ายเคยถูกจับกุม หรือต้องโทษในคดีอาญาหรือไม่</strong> : {{(dataInfo.knowledge.raw)?'เคย':'ไม่เคย'}} </p>
                                                    <p class="text-h"><strong>ท่านยินดีให้ตรวจสอบประวัติอาชญากรรมโดยการพิมพ์ลายน้ำมือหรือไม่</strong> : {{(dataInfo.knowledge.rawok)?'เคย':'ไม่เคย'}} </p>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    </div>
</memberLayout>
</template>

<script>
import "vue-select/src/scss/vue-select.scss";
import memberLayout from '@/components/member-layouts/index'

export default {
    components: {
        memberLayout
    },
    mounted() {
        if (!this.$store.getters['user/isWebAdmin']) {
            this.alertAccess();
        }

        this.$nextTick(() => {

            console.log("NEXT TICK Component++")

            const $ = require('jquery')
            window.$ = $;

            var $tabsNav = $('.tabs-nav'),
                $tabsNavLis = $tabsNav.children('li');
            $tabsNav.each(function () {
                var $this = $(this);
                $this.next().children('.tab-content').stop(true, true).hide().first().show();
                $this.children('li').first().addClass('active').stop(true, true).show();
            });
            $tabsNavLis.on('click', function (e) {
                var $this = $(this);
                $this.siblings().removeClass('active').end().addClass('active');
                $this.parent().next().children('.tab-content').stop(true, true).hide().siblings($this.find('a').attr('href')).fadeIn();
                e.preventDefault();
            });
        })
    },
    async created() {
        await this.getLstDatas();
        this.lstProfileCopy = [...this.lstProfile]

        this.$nextTick(() => {

            console.log("NEXT TICK Component++")

            const $ = require('jquery')
            window.$ = $;

            var $tabsNav = $('.tabs-nav'),
                $tabsNavLis = $tabsNav.children('li');
            $tabsNav.each(function () {
                var $this = $(this);
                $this.next().children('.tab-content').stop(true, true).hide().first().show();
                $this.children('li').first().addClass('active').stop(true, true).show();
            });
            $tabsNavLis.on('click', function (e) {
                var $this = $(this);
                $this.siblings().removeClass('active').end().addClass('active');
                $this.parent().next().children('.tab-content').stop(true, true).hide().siblings($this.find('a').attr('href')).fadeIn();
                e.preventDefault();
            });
        })
    },
    data() {
        return {
            dateFormatThai: {
                'days': ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
                'months': ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
                'pickers': ['7 วันถัดไป', '30 วันถัดไป', '7 ที่ผ่านมา', '30 วันที่ผ่านมา'],
                'placeholder': {
                    'date': 'เลือกวันที่',
                    'dateRange': 'เลือกช่วงวันที่'
                }
            },
            isLoading: false,
            isSelectJob: false,
            selectJobTopic: "",
            selectJobId: "",
            headTitle: 'นัดสัมภาษณ์',
            editForm: {
                keydb: 0,
                index: 0,
                mode: "save",
                modeTitle: "บันทึกข้อมูล"
            },
            dataForm: {
                topic: '',
                nudnote: "มาสัมภาษณ์ภายในวันและเวลาทำการ",
                job: [],
                member: [],
                keyword: ""

            },
            dataInfo: {
                family: {},
                education: {},
                work: {},
                training: {},
                knowledge: {}
            },
            dataFormReset: {
                ...this.dataForm
            },
            lstProfile: [],
            lstProfileCopy: [],
            memberInfo: {},
            lstWorks: [],
            profileImg: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&amp;s=300",
            lstEducation: [],
            lstMebers: [],
            lstJobs: [],
            lstJobsCopy: [],
            jobInter: " -- ไม่พบข้อมูล --",
            listDatas: [{
                id: 1,
                topic: 'xxx'
            }],
            fullUrl: window.location.origin,
            lstMyJob: []

        }
    },
    methods: {

        async loadDataInfo(idcard) {
            try {
                console.log("****get datat info ****")
                const family = `api/family/${idcard}`
                const education = `api/education/profile/${idcard}/0`
                const work = `api/work/profile/${idcard}`
                const training = `api/training/profile/${idcard}`
                const knowledge = `api/knowledge/profile/${idcard}`

                const data1 = await this.$http.get(family)
                const data2 = await this.$http.get(education)
                const data3 = await this.$http.get(work)
                const data4 = await this.$http.get(training)
                const data5 = await this.$http.get(knowledge)

                this.$http.all([data1, data2, data3, data4, data5]).then(
                    this.$http.spread((...res) => {

                        this.dataInfo.family = res[0].data.data
                        this.dataInfo.education = res[1].data.data
                        this.dataInfo.work = res[2].data.data
                        this.dataInfo.training = res[3].data.data
                        this.dataInfo.knowledge = (res[4].data.data === null) ? {} : res[4].data.data;

                    }))

            } catch (e) {
                console.log(e)
            }
        },
        getJobIn: async function (idcard) {
            try {
                console.log("job id")
                const {
                    data
                } = await this.$http.get(`api/jobinterest/${idcard}`)
                if (data.success == 1) {
                    if (data.data !== null) {

                        console.log(data.data)
                        this.lstMyJob = [...data.data]
                        this.jobInter = [...data.data].map((it) => it.pname).join(',');
                        console.log(this.jobInter)
                        this.lstJobs = this.lstJobs.filter(a => data.data.findIndex(b => b.jobid == a.id) < 0);
                        console.log(this.lstJobs)
                        console.log("MY JOB")
                        console.log(this.lstMyJob)

                    } else {
                        this.jobInter = " -- ไม่พบข้อมูล --"
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        dialogInfo: async function (idcard) {

            console.log(this.$refs.info)
            await this.getMemberInfo(idcard);
            await this.loadMyPicture(idcard);
            await this.getWork(idcard)
            await this.getJobIn(idcard)

            /*
             dataInfo: 
                family
                education
                work
                training
                knowledge
            */
            await this.loadDataInfo(idcard);

            console.log(this.dataInfo)

            this.$fire({
                title: '<span style="text-align:left;">รายละเอียดผู้สมัคร</span>',
                html: this.$refs.info,
                width: "90%",
                showCloseButton: false,
                cancelButtonText: 'ยกเลิก',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'รับสมัครงาน',
                showLoaderOnConfirm: true,
            }).then(async (result) => {
                if (result.value) {
                    try {
                        await this.applyJob(idcard);

                    } catch (e) {

                        console.log(e)

                    }
                }
            })

        },

        cancelApplyJob: async function (idcard) {
            let saveData = {

                nudnote: '',
                nuddate: null,
                idcard: idcard,
                jobid: this.selectJobId

            }

            this.$http.put(`api/interview/${idcard}/${this.selectJobId}`, saveData).then(async (data) => {
                let obj = data.data

                if (obj.success) {

                    await this.getProfile(this.selectJobId);
                    this.lstProfileCopy = [...this.lstProfile]

                } else {
                    this.$fire({
                        title: "นัดสัมภาษณ์",
                        text: "ระบบมีปัญหา กรุณาติดต่อเจ้าหน้าที่.",
                        type: "error",
                        timer: 3000
                    })
                }
                //console.log(obj)
            }).catch(e => {
                console.log(e)
                this.$fire({
                    title: "ยกเลิกนัดสัมภาษณ์",
                    text: "ระบบมีปัญหา กรุณาติดต่อเจ้าหน้าที่.",
                    type: "error",
                    timer: 3000
                })
            })

            // console.log(saveData)

        },
        applyJob: async function (idcard) {
            let saveData = {

                nudnote: this.dataForm.nudnote,
                nuddate: this.dataForm.nuddate,
                idcard: idcard,
                jobid: this.selectJobId

            }

            this.$http.put(`api/interview/${idcard}/${this.selectJobId}`, saveData).then(async (data) => {
                let obj = data.data

                if (obj.success) {

                    await this.getProfile(this.selectJobId);
                    this.lstProfileCopy = [...this.lstProfile]
                    console.log("save นัดสัมภาษณ์")
                    console.log(this.lstProfile)

                    this.$fire({
                        title: "นัดสัมภาษณ์",
                        text: "เรียบร้อยแล้ว.",
                        type: "success",
                        timer: 3000
                    })

                } else {
                    this.$fire({
                        title: "นัดสัมภาษณ์",
                        text: "ระบบมีปัญหา กรุณาติดต่อเจ้าหน้าที่.",
                        type: "error",
                        timer: 3000
                    })
                }
                //console.log(obj)
            }).catch(e => {
                console.log(e)
                this.$fire({
                    title: "นัดสัมภาษณ์",
                    text: "ระบบมีปัญหา กรุณาติดต่อเจ้าหน้าที่.",
                    type: "error",
                    timer: 3000
                })
            })

            // console.log(saveData)

        },
        /* dialogInfo: async function (idcard) {

             console.log(this.$refs.info)

             if (this.dataForm.nuddate && this.dataForm.nudnote) {

                 await this.getMemberInfo(idcard);
                 await this.loadMyPicture(idcard);
                 await this.getWork(idcard)
                 this.$fire({
                     title: '<span style="text-align:left;">รายละเอียดผู้สมัคร</span>',
                     html: this.$refs.info,
                     width: 800,
                     showCloseButton: false,
                     cancelButtonText: 'ยกเลิก',
                     focusConfirm: false,
                     showCancelButton: true,
                     confirmButtonText: 'นัดสัมภาษณ์',
                     showLoaderOnConfirm: true,
                 }).then(async (result) => {

                     if (result.value) {
                         try {
                             await this.applyJob(idcard);

                         } catch (e) {

                             console.log(e)

                         }
                     }
                 })
             } else {
                 this.$fire({
                     title: "นัดสัมภาษณ์",
                     text: "กรอกข้อมูลให้ครบ.",
                     type: "warning",
                     timer: 3000
                 })
             }

         },*/
        getMemberInfo: async function (idcard) {
            console.log(idcard)

            try {
                const {
                    data
                } = await this.$http.get(`api/profile/${idcard}`)
                if (data.success == 1) {
                    //console.log(data.data)

                    if (data.data !== null) {
                        this.memberInfo = data.data

                        if (this.memberInfo.carid)
                            this.memberInfo.carid = this.$store.state.jobs.ctype.find(x => x.id == this.memberInfo.carid).topic

                        if (data.data.edu != null) {
                            let edu = this.memberInfo.edu.split("|")
                            let levelTopic = this.$store.state.jobs.etype
                            edu[0] = levelTopic.find(x => x.id == edu[0]).topic;
                            this.memberInfo.edu = edu
                        } else {
                            // this.lstEducation = []
                        }

                    } else {
                        this.memberInfo = {}
                        // this.lstEducation = []
                    }

                    //console.log(this.lstProfile)
                }
                //console.log(data)
            } catch (e) {
                console.log(e)
            }
        },
        findMember: function () {
            let keyword = this.dataForm.keyword

            if (keyword !== "")
                this.lstProfile = [...this.lstProfileCopy.filter(x => (String(x.edux).includes(keyword) ||
                    String(x.profileid).split(' ').join('').includes(keyword) ||
                    String(x.nameth).includes(keyword)))]
            else
                this.lstProfile = [...this.lstProfileCopy]

        },
        getValue(arr, i) {
            if (arr == undefined) {
                return ' - '
            } else {
                return arr[i]
            }
        },
        async loadMyPicture(idcard) {
            try {
                const {
                    data
                } = await this.$http.get(`api/profile/img/${idcard}`)
                if (data.success) {
                    //console.log('OK my picture')
                    this.profileImg = `data:image/png;base64,${data.data}`
                } else {
                    this.profileImg = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&amp;s=300"
                }
            } catch (err) {
                console.log(err)
            }
        },
        getWork: async function (idcard) {
            try {
                const {
                    data
                } = await this.$http.get(`api/work/profile/${idcard}`)
                if (data.success == 1) {
                    if (data.data !== null) {

                        this.lstWorks = [...data.data]
                        console.log(this.lstWorks)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        alertLineNotify: async function () {

            let msgFormat = `
ตรวจสอบรายชื่อนัดสัมภาษณ์ 
ตำแหน่ง : ${this.selectJobTopic} 
ตามลิงค์นี้ ${this.fullUrl}/jobdetail/${this.selectJobId}
            `;
            //let newData = [...this.lstProfile.filter(x => x.nuddate !== null)]
            //console.log(msgFormat)
            try {
                const {
                    data
                } = await this.$http.post(`api/linenotify`, {
                    message: msgFormat
                })
                if (data.success == 1) {
                    console.log('sent message in linenotify is succes')
                }
            } catch (e) {
                console.log(e)
            }

        },
        /* getJobIn: async function (idcard) {
             try {
                 console.log("job id")
                 const {
                     data
                 } = await this.$http.get(`api/jobinterest/${idcard}`)
                 if (data.success == 1) {
                     if (data.data !== null) {

                         console.log(data.data)
                         this.jobInter = [...data.data].map((it) => it.pname).join(',');
                         this.lstJobs = this.lstJobs.filter(a => data.data.findIndex(b => b.jobid == a.id) < 0);
                         console.log(this.lstJobs)

                     } else {
                         this.jobInter = " -- ไม่พบข้อมูล --"
                     }
                 }
             } catch (e) {
                 console.log(e)
             }
         },*/
        selectJob: async function (item) {

            this.isSelectJob = true;
            this.selectJobTopic = item.topic
            this.selectJobId = item.id

            await this.getProfile(item.id);

            ///console.log(this.lstProfile.filter(x => (x.profileid === '2 2222 22222 22 2' && x.jobid === '12')))

        },
        getProfile: async function (jobid) {
            try {
                const {
                    data
                } = await this.$http.get(`api/interview/jobid/${jobid}`)
                console.log(" loading profile ")
                console.log(data)
                let objCtype = this.$store.state.jobs.ctype
                let levelTopic = this.$store.state.jobs.etype
                if (data.success == 1) {
                    if (data.data !== null) {
                        this.lstProfile = data.data

                        this.lstProfile.forEach(function (item) {
                            console.log(item.carid)
                            if (item.carid)
                                item.carid = objCtype.find(x => x.id == item.carid).topic
                            if (item.edu != null) {
                                let edu = item.edu.split("|")
                                edu[0] = levelTopic.find(x => x.id == edu[0]).topic;
                                item.edu = [...edu]
                                item.edux = [...edu].join("|")

                            }
                        });

                    } else {
                        this.lstProfile = {}
                    }

                }
            } catch (e) {
                console.log(e)
            }
        },
        selectIdcard: async function (item) {
            console.log(item)
            this.lstJobs = [...this.lstJobsCopy]
            console.log(this.lstJobs)
            this.dataForm.topic = item.nameth
            await this.getWork(item.idcard)
            await this.loadMyPicture(item.idcard)
            await this.getJobIn(item.idcard)
            try {
                const {
                    data
                } = await this.$http.get(`api/profile/${item.idcard}`)
                if (data.success == 1) {
                    if (data.data !== null) {
                        this.lstProfile = data.data

                        if (this.lstProfile.carid)
                            this.lstProfile.carid = this.$store.state.jobs.ctype.find(x => x.id == this.lstProfile.carid).topic

                        if (data.data.edu != null) {
                            let edu = this.lstProfile.edu.split("|")
                            let levelTopic = this.$store.state.jobs.etype
                            edu[0] = levelTopic.find(x => x.id == edu[0]).topic;
                            this.lstProfile.edu = edu
                        } else {
                            // this.lstEducation = []
                        }

                    } else {
                        this.lstProfile = {}
                        //this.lstEducation = []
                    }

                    //console.log(this.lstProfile)
                }
                //console.log(data)
            } catch (e) {
                console.log(e)
            }

        },
        alertAccess: function () {
            this.$fire({
                title: this.headTitle,
                text: "ไม่อนุญาติ",
                type: "warning",
                timer: 3000
            }).then(() => {
                //this.$router.push('/home')
                window.location.href = '/home';
            })
        },
        getLstDatas: async function () {
            try {

                //const dataM = await this.$http.get('api/register/all')
                const dataJ = await this.$http.get('api/jobs/list')

                this.$http.all([dataJ]).then(
                    this.$http.spread((...res) => {
                        //this.lstMebers = res[0].data.data
                        //console.log(this.lstMebers)
                        this.lstJobs = res[0].data.data
                        this.lstJobsCopy = [...this.lstJobs]
                    })
                )

            } catch (e) {
                console.log(e)
            }
        },
        alertSuccess: function (msg = "บันทึกเรียบร้อยแล้ว") {
            this.$fire({
                title: this.headTitle,
                text: msg,
                type: "success",
                timer: 3000
            })
        },
        alertFail: function () {
            this.$fire({
                topic: this.headTitle,
                text: 'ไม่สามารถเข้าใช้งานได้ ลองใหม่อีกครั้งครับ.',
                type: "warning",
                timer: 3000
            })
        },
        focusInput: function (inputRef) {
            this.$refs[inputRef].focus();
        },
        async sendData() {
            try {
                console.log('save')
                if (this.dataForm.member.length === 0 || this.dataForm.job.length === 0) {
                    console.log("Input not yet!")
                } else {
                    const saveData = {
                        idcard: this.dataForm.member.idcard,
                        jobid: this.dataForm.job.id,
                        regstatus: 1
                    }
                    console.log(saveData)
                }

            } catch (e) {
                console.log(e)
                this.alertFail()
            }
        },

    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style><style>
.vs--searchable .vs__dropdown-toggle {
    cursor: text;
    height: 48px;
}

.vs__dropdown-option--highlight {
    background: #5897fb;
    color: blue;
}

.multiselect__option {

    padding: 0px;
    min-height: 0px;
    line-height: 0px;

}

.multiselect__option--highlight {
    background: #41b883;
    outline: none;
    color: mediumblue;
}

.multiselect__option--selected.multiselect__option--highlight {
    background: #ff6a6a;
    color: slategrey;
}
</style><style scoped>
.text-h {
    margin-bottom: 2px;
    font-size: 14px;
}

.text-topic {
    background: rgba(219, 255, 23, 0.52);
    border-radius: 30px;

    /*background-color: #64bc36;
    border-radius: 50px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
    font-style: normal;
    */
    font-weight: bold;
    padding: 3px 8px;
    margin-left: 3px;
}
</style>
