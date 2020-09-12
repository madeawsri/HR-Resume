<template>
<div>

    <memberLayout>
        <div slot="content">
            <!-- Titlebar -->
            <form id="frmProfile" ref="frmdata" @submit.prevent="sendUpdateData" enctype="multipart/form-data">
                <div class="row">
                    <p style="margin-left:18px">
                        <button type="submit" class="button margin-top-0"><i class="fa fa-save"></i> บันทึกข้อมูล</button>
                    </p>
                    <!-- Profile -->
                    <div class="col-lg-4 col-md-12">
                        <div class="dashboard-list-box margin-top-0">
                            <h4 class="gray">รายละเอียดข้อมูลส่วนตัว</h4>
                            <div class="dashboard-list-box-static">

                                <!-- Avatar -->
                                <div class="edit-profile-photo">
                                    <img :src="profileImg" alt="" width="250px" height="250px">
                                    <div class="change-photo-btn">
                                        <div class="photoUpload">
                                            <span><i class="fa fa-upload"></i> อัพโหลดรูปภาพ</span>
                                            <input type="file" name='file' ref="myImage" class="upload" @change="onFileSelected" accept="image/jpg" />
                                        </div>
                                    </div>
                                </div>

                                <!-- Details -->
                                <div class="my-profile">
                                    <div class="col">
                                        <label>ชื่อ-สกุล (Eng)</label>
                                        <input @keydown="inputEngOnly" type="text" name="nameen" v-model="profileData.nameen">

                                    </div>
                                    <div class="col">
                                        <label>ชื่อ-สกุล (ไทย)</label>
                                        <input placeholder="" type="text" v-model="profileData.nameth" name="nameth">
                                    </div>

                                    <label>เบอร์โทร</label>
                                    <input placeholder="" type="text" v-model="profileData.phone" name="phone">

                                    <label>E-mail</label>
                                    <input placeholder="" type="text" v-model="profileData.email" name="email">

                                    <label><i class="fa fa-comments-o"></i> Line</label>
                                    <input placeholder="http://line.me/ti/p/9lw72vkPpq" type="text" v-model="profileData.lineid" name="lineid">

                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Change Password -->
                    <div class="col-lg-4 col-md-12">
                        <div class="dashboard-list-box margin-top-0">
                            <h4 class="gray">ข้อมูลส่วนตัว</h4>
                            <div class="dashboard-list-box-static">
                                <!-- Change Password -->
                                <div class="my-profile">

                                    <label>ส่วนสูง (เซนติเมตร)</label>
                                    <input type="number" v-model="profileData.height" name="height">

                                    <label>น้ำหนัก (กิโลกรัม)</label>
                                    <input type="number" v-model="profileData.weight" name="weight">

                                    <label>สัญชาติ</label>
                                    <input type="text" v-model="profileData.nation" name="nation">

                                    <label>เชื้อชาติ</label>
                                    <input type="text" v-model="profileData.origin" name="origin">

                                    <label>ศาสนา</label>
                                    <input type="text" v-model="profileData.religion" name="religion">

                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- Change Password -->
                    <div class="col-lg-4 col-md-12">
                        <div class="dashboard-list-box margin-top-0">
                            <h4 class="gray">ข้อมูลบัตรประชาชน</h4>
                            <div class="dashboard-list-box-static">

                                <!-- Change Password -->
                                <div class="my-profile">
                                    <label class="margin-top-0">เลขที่บัตรประจำตัวประชาชน</label>
                                    <input type="text" v-model="profileData.idcard" readonly style="background-color:lightblue" name="profileid">

                                    <label>วันเกิด</label>
                                    <input type="text" v-model="profileData.birthday" name="birthday">

                                    <label>วันที่ออกบัตร</label>
                                    <input type="text" v-model="profileData.placecard" name="placecard">

                                    <label>วันที่หมดอายุ</label>
                                    <input type="text" v-model="profileData.expiredcard" name="expiredcard">

                                    <label>ที่อยู่ตามบัตรประชาชน</label>
                                    <textarea name="addr" id="notes" cols="30" rows="10" v-model="profileData.addr"></textarea>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </form>

        </div>
    </memberLayout>

</div>
</template>

<script>
import memberLayout from '@/components/member-layouts/index'

export default {
    created() {

        let userData = JSON.parse(this.$store.state.user.data)
        this.profileData.nameth = userData.nameth
        this.profileData.idcard = userData.idcard
        this.profileData.birthday = userData.birthday

        this.getProfile();

        this.loadMyPicture()

    },
    mounted() {
        if (!this.$store.getters['user/isUser']) {
            this.alertAccess();
        }
    },
    data() {
        return {
            profileImg: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&amp;s=300",
            profileData: {
                nameth: '',
                nameen: '',
                addr: '',
                addrcur: '',
                flagaddr: '',
                email: '',
                phone: '',
                birthday: '',
                age: 0,
                height: 0,
                weight: 0,
                nation: '',
                origin: '',
                religion: '',
                idcard: '',
                placecard: '',
                expiredcard: '',
            },
            upload: {
                message: '',
                error: false
            }

        }
    },
    components: {
        memberLayout,
    },
    methods: {

        alertAccess: function () {
            this.$fire({
                title: "ข้อมูลส่วนตัว",
                text: "ไม่อนุญาติ",
                type: "warning",
                timer: 3000
            }).then(() => {
                //this.$router.push('/home')
                window.location.href = '/home';
            })
        },
        alertSuccess: function () {
            this.$fire({
                title: "ข้อมูลส่วนตัว",
                text: 'บันทึกเรียบร้อยแล้ว',
                type: "success",
                timer: 3000
            }).then(() => {
//                this.$router.push('/family')
this.$vLink('family')

            })
        },
        alertLoginFail: function () {
            this.$fire({
                title: "ข้อมูลส่วนตัว",
                text: 'ไม่สามารถเข้าใช้งานได้ ลองใหม่อีกครั้งครับ.',
                type: "warning",
                timer: 3000
            })
        },
        inputEngOnly: (e) =>
            (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 97 && e.keyCode <= 122 || e.keyCode == 32 || e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 39 || e.keyCode == 37) ? '' : e.preventDefault(),
        onFileSelected: function (e) {
            const file = e.target.files[0];

            const fileMaxSize = 250
            if (!file) {
                e.preventDefault();
                return;
            }
            const fileSize = parseInt(file.size / 1024)
            // 250 k
            if (fileSize > fileMaxSize) {
                e.preventDefault();
                alert(`ขนาดไฟล์ต้องไม่เกิน ${fileMaxSize} Kb.`);
                return;
            }
            if (file)
                this.profileImg = URL.createObjectURL(file);

            this.upload.error = false
            this.upload.message = ""

        },
        async sendUpdateData() {

            const objFrm = document.getElementById('frmProfile')
            const formData = new FormData(objFrm);
            try {
                const {
                    data
                } = await this.$http.post(`api/profile/${this.profileData.idcard}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                console.log(data)
                this.alertSuccess();

            } catch (err) {
                console.log(err)
                this.alertLoginFail();
            }
        },
        async loadMyPicture() {
            try {
                const {
                    data
                } = await this.$http.get(`api/profile/img/${this.profileData.idcard}`)
                if (data.success) {
                    //console.log('OK my picture')
                    this.profileImg = `data:image/png;base64,${data.data}`
                }
            } catch (err) {
                console.log(err)
            }
        },
        async getProfile() {
            try {
                const {
                    data
                } = await this.$http.get(`api/profile/${this.profileData.idcard}`)
                if (data.success && data.data) {
                    this.profileData = data.data
                    this.profileData.idcard = this.profileData.profileid
                    console.log(this.data)

                }
            } catch (err) {
                console.log(err)
            }
        }

    }
}
</script>
