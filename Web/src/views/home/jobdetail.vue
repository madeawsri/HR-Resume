<template>
<homeLayout>
    <div slot="homecontent">

        <!-- Recent Jobs -->
        <div class="eleven columns">
            <div class="padding-right">

                <!-- Company Info -->
                <div class="company-info">
                    <img src="images/company-logo.png" alt="" v-if="0">
                    <div class="content">
                        <h4>{{dataDetail.xtopic}} <strong>{{dataDetail.num}}</strong> ตำแหน่ง </h4>
                        <span v-if="0"><a href="#"><i class="fa fa-link"></i> Website</a></span>
                        <span><a href="#"><i class="fa fa-twitter"></i> @admin</a></span>
                        <span style=""><i class="ln ln-icon-Affiliate"></i> {{$vStrToJson(dataDetail.stype).topic}}</span>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <p class="margin-reset" v-if="0">
                    The Food Service Specialist ensures outstanding customer service is provided to food customers and that all food offerings meet the required stock levels and presentation standards. Beginning your career as a Food Steward will give you a strong foundation in Speedway’s food segment that can make you a vital member of the front line team!
                </p>

                <p><strong>คุณสมบัติผู้สมัคร</strong> </p>
                <ul class="list-1" v-for="(item, index) in $vStrToJson(dataDetail.qualifys)" :key="'a'+index">
                    <li>{{item.topic}}</li>
                </ul>

                <p><strong>หลักฐานการสมัคร</strong> </p>
                <ul class="list-1" v-for="(item,index) in $vStrToJson(dataDetail.proofs)" :key="'b'+index">
                    <li>{{item.topic}}</li>
                </ul>

                <p><strong>สวัสดิการและผลประโยชน์ตอบแทน</strong> </p>
                <ul class="list-1" v-for="(item,index) in $vStrToJson(dataDetail.benefits)" :key="'c'+index">
                    <li>{{item.topic}}</li>
                </ul>

            </div>
        </div>

        <!-- Widgets -->
        <div class="five columns">

            <!-- Sort by -->
            <div class="widget">

                <div class="job-overview">

                    <ul>
                        <li>
                            <i class="fa fa-map-marker"></i>
                            <div>
                                <strong>กรอกใบสมัครด้วยต้นเองได้</strong>
                                <span>ชั้น 1: แผนกบุคคล โทร.043-432-902-6 ต่อ 7053</span>
                            </div>
                        </li>
                        <li>
                            <i class="fa fa-user"></i>
                            <div>
                                <strong>ลักษณะงาน:</strong>
                                <span>{{$vStrToJson(dataDetail.ptype).topic}}</span>
                            </div>
                        </li>
                        <li>
                            <i class="fa fa-clock-o"></i>
                            <div>
                                <strong>ระยะเวลาเปิดรับสมัคร:</strong>
                                <span> {{dataDetail.datein | moment("DD MMM YYYY ")}} ถึง {{dataDetail.dateout|moment("DD MMM YYYY")}} </span>
                            </div>
                        </li>
                        <li>
                            <i class="fa fa-money"></i>
                            <div>
                                <strong>อัตราค่าจ้าง:</strong>
                                <span>ขึ้นอยู่กับโครงสร้างของบริษัท</span>
                            </div>
                        </li>
                    </ul>

                    <a href="#" @click="sentData" class="popup-with-zoom-anim button" v-show="isLogged && !isApplyJod"> ส่งใบสมัครงาน </a>
                    <a class=" button disabled" v-show="isApplyJod"> <i class="ln ln-icon-Mail-Send"></i> ส่งใบสมัครงานเรียบร้อยแล้ว. </a>

                    <router-link class="button" to="login" v-show="this.idcard==null"> ส่งใบสมัครงาน </router-link>

                </div>

            </div>

        </div> 
        <!-- Widgets / End -->

    </div>
</homeLayout>
</template>

<script>
import homeLayout from '../../components/layouts/index'

export default {
    computed: {
        isLogged() {
            return this.$store.getters['user/isLogged']
        },
        getIDCard(){
			return this.$vStrToJson(this.$store.state.user.data)?this.$vStrToJson(this.$store.state.user.data).idcard:null;
		}
    },
    async mounted() {
		this.idcard = this.getIDCard
        this.isSent();
		 
    },
    async created() {
        if (this.jobid === undefined) {
            this.alertFail();
        } else {
            await this.showDetail();
        }
		
    },
    data() {
        return {
            jobid: this.$route.params.jobid,
            dataDetail: [],
            isApplyJod: false,
            idcard: this.getIDCard
        }
    },
    components: {
        homeLayout,

    },
    methods: {
        async isSent() {

            try {
//console.log(this.idcard + "xxx")
                if (this.idcard != null) {
                    const {
                        data
                    } = await this.$http.get(`api/jobinterest/${this.idcard}/${this.jobid}`)
                    console.log(data)
                    this.isApplyJod = (data.success && data.data)

                } else {
                    this.isApplyJod = false
                }

                //  
            } catch (e) {
                console.log(e)
            }

        },
        sentData: async function () {

            try {
                const {
                    data
                } = await this.$http.post(`api/jobinterest/${this.idcard}/${this.jobid}`)
                console.log(data)
                if (data.success) {
                    this.isApplyJod = true;
                    this.alertAccess();
                }
                //  
            } catch (e) {
                console.log(e)
            }

        },
        alertAccess: function () {
            this.$fire({
                title: "ส่งใบสมัครงาน",
                text: "เรียบร้อยแล้ว.",
                type: "success",
                timer: 3000
            }).then(() => {
                //this.$router.push('/home')
                window.location.href = '/home';
            })
        },
        alertFail: function () {
            this.$fire({
                title: "รายละเอียดงาน",
                text: 'ไม่สามารถเข้าดูได้',
                type: "warning",
                timer: 3000
            }).then(() => {
                this.$vLink('home')
            })
        },
        async showDetail() {
            try {
                const {
                    data
                } = await this.$http.get(`/api/jobs/${this.jobid}`)

                if (data.success == 1) {

                    const xdata = data.data
                    this.dataDetail = {
                        ...xdata
                    }
                    console.log(this.dataDetail)
                    /*
                    if (data.data) {
                        console.log(data.data)
                        this.dataDetail.push(...data.data)
                        console.log(this.dataDetail)
                    } else return*/

                } else {
                    this.alertFail()
                }

            } catch (e) {
                console.log(e)

            }

        },
    },
}
</script>

<style>
.company-info {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 33px;
    margin-bottom: 0px;
}
</style><style lang="postcss" scoped>
.disabled {
    cursor: not-allowed;
    color: gray;
    background-color: lightgrey;
}
</style>
