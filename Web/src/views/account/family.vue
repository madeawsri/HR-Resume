<template>
<div>

    <memberLayout>
        <div slot="content">
            <!-- Titlebar -->
            <form id="frmData" ref="frmdata" @submit.prevent="saveData">
                <div class="row">
                    <p style="margin-left:18px">
                        <button type="submit" class="button margin-top-0"> <i class="fa fa-save"></i> บันทึกข้อมูล</button>
                    </p>

                    <div class="col-lg-4 col-md-12">

                        <div class="dashboard-list-box margin-top-0">
                            <h4>ข้อมูลครอบครัว</h4>
                            <div class="dashboard-list-box-content">

                                <div class="submit-page">

                                    <!-- Email -->
                                    <div class="form">
                                        <h5>ชื่อ-สกุล (ภรรยา / สามี)</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.namewh" name="namewh" />
                                    </div>

                                    <!-- Title -->
                                    <div class="form">
                                        <h5>อาชีพ</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.career" name="career" />
                                    </div>

                                    <!-- Title -->
                                    <div class="form">
                                        <h5>ตำแหน่ง</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.position" name="position" />
                                    </div>

                                    <div class="form">
                                        <h5>สถานที่ทำงาน</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.workplace" name="workplace" />
                                    </div>

                                    <!-- Email -->
                                    <div class="form">
                                        <h5>จำนวนบุตร {{formdata.numchild}}</h5>
                                        <select data-placeholder="0 คน" class="" v-model="formdata.numchild" name="numchild">
                                            <option value="0">0 คน</option>
                                            <option value="1">1 คน</option>
                                            <option value="2">2 คน</option>
                                            <option value="3">3 คน</option>
                                            <option value="4">4 คน</option>
                                        </select>
                                    </div>

                                    <!-- Title -->
                                    <div class="form">
                                        <h5>จำนวนบุตรที่กำลังศึกษา</h5>
                                        <select data-placeholder="0 คน" class="" v-model="formdata.numchildedu" name="numchildedu">
                                            <option value="0">0 คน</option>
                                            <option value="1">1 คน</option>
                                            <option value="2">2 คน</option>
                                            <option value="3">3 คน</option>
                                            <option value="4">4 คน</option>
                                        </select>
                                    </div>

                                    <!-- Title -->
                                    <div class="form">
                                        <h5>จำนวนบุตรที่ไม่ได้ศึกษา</h5>
                                        <select data-placeholder="0 คน" class="" v-model="formdata.numchildeduno" name="numchildeduno">
                                            <option value="0">0 คน</option>
                                            <option value="1">1 คน</option>
                                            <option value="2">2 คน</option>
                                            <option value="3">3 คน</option>
                                            <option value="4">4 คน</option>
                                        </select>
                                    </div>

                                    <div class="form">
                                        <h5>จำนวนบุตรที่มีงานทำ</h5>
                                        <select data-placeholder="0 คน" class="" v-model="formdata.numchildwork" name="numchildwork">
                                            <option value="0">0 คน</option>
                                            <option value="1">1 คน</option>
                                            <option value="2">2 คน</option>
                                            <option value="3">3 คน</option>
                                            <option value="4">4 คน</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-12">

                        <div class="dashboard-list-box margin-top-0">
                            <h4>ข้อมูลบิดาและมารดา</h4>
                            <div class="dashboard-list-box-content">

                                <div class="submit-page">
                                    <div class="form">
                                        <h5>ชื่อ-สกุล (บิดา)</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.father" name="father" />
                                    </div>

                                    <div class="form">
                                        <h5>อายุบิดา</h5>
                                        <input class="search-field" type="number" placeholder="" v-model="formdata.fage" name="fage" />
                                    </div>

                                    <div class="form">
                                        <h5>เชื้อชาติบิดา</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.fnation" name="fnation" />
                                    </div>

                                    <div class="form">
                                        <h5>สัญชาติบิดา</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.forigin" name="forigin" />
                                    </div>

                                    <div class="form" style="width:100%">
                                        <h5>สถานะบิดา</h5>
                                        <select data-placeholder="" class="" v-model="formdata.flive" id="flive" ref="select" name="flive">
                                            <option value="0">- ไม่มีชีวิต - </option>
                                            <option value="1">- ยังมีชีวิต -</option>
                                        </select>
                                    </div>

                                    <div class="form">
                                        <h5>ชื่อ-สกุล (มารดา)</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.mother" name="mother" />
                                    </div>

                                    <div class="form">
                                        <h5>อายุมารดา</h5>
                                        <input class="search-field" type="number" placeholder="" v-model="formdata.mage" name="mage" />
                                    </div>

                                    <div class="form">
                                        <h5>เชื้อชาติมารดา</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.mnation" name="mnation" />
                                    </div>

                                    <div class="form">
                                        <h5>สัญชาติมารดา</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.morigin" name="morigin" />
                                    </div>

                                    <div class="form" style="width:100%">
                                        <h5>สถานะมารดา {{formdata.mlive}}</h5>
                                        <select v-model="formdata.mlive" name="mlive">
                                            <option v-for="option in liveOptions" :value="option.value" :key="option.value">
                                                {{ option.value }} {{ option.text }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-12">

                        <div class="dashboard-list-box margin-top-0">
                            <h4>ข้อมูลผู้ที่สามารถติดต่อได้</h4>
                            <div class="dashboard-list-box-content">

                                <div class="submit-page">
                                    <div class="form">
                                        <h5>ชื่อบุคคลที่สามารถติดต่อได้</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.nameo" name="nameo" />
                                    </div>

                                    <div class="form">
                                        <h5>เบอร์โทรผู้ติดต่อ</h5>
                                        <input class="search-field" type="number" placeholder="" v-model="formdata.phoneo" name="phoneo" />
                                    </div>

                                    <div class="form" style="width:100%">
                                        <h5>ความสัมพันธ์ผู้ติดต่อ</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="formdata.relationo" name="relationo" />
                                    </div>

                                    <div class="form" style="width:100%">
                                        <h5>ที่อยู่ผู้ติดต่อ</h5>
                                        <textarea id="notes" cols="30" rows="10" v-model="formdata.addro" name="addro">xx xx xx</textarea>
                                    </div>

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
    components: {
        memberLayout
    },
    created() {
        let loginData = JSON.parse(this.$store.state.user.data)
        this.profileid = loginData.idcard

        this.getData()
    },
    mounted() {
        if (!this.$store.getters['user/isUser']) {
            this.alertAccess();
        }
    },
    data() {
        return {
            profileid: null,
            liveOptions: [{
                text: " - ไม่มีชีวิต - ",
                value: 0
            }, {
                text: " - มีชีวิต - ",
                value: 1
            }],
            formdata: {
                namewh: '',
                career: '',
                workplace: '',
                position: '',
                numchild: 0,
                numchildedu: 0,
                numchildeduno: 0,
                numchildwork: 0,
                father: '',
                fage: 0,
                fnation: '',
                forigin: '',
                flive: '',
                mother: '',
                mage: 0,
                mnation: '',
                morigin: '',
                mlive: 0,
                nameo: '',
                phoneo: '',
                addro: '',
                relationo: '',
            }
        }
    },
    methods: {
        alertAccess: function () {
            this.$fire({
                title: "ข้อมูลบิดาและมารดา",
                text: "ไม่อนุญาติ",
                type: "warning",
                timer: 3000
            }).then(() => {
                this.$router.push('/home')
            })
        }, alertSuccess: function () {
            this.$fire({
                title: "ข้อมูลบิดาและมารดา",
                text: 'บันทึกเรียบร้อยแล้ว',
                type: "success",
                timer: 3000
            }).then(()=>{
                this.$router.push('/education')
            })
        },
        alertLoginFail: function () {
            this.$fire({
                title: "ข้อมูลบิดาและมารดา",
                text: 'ไม่สามารถเข้าใช้งานได้ ลองใหม่อีกครั้งครับ.',
                type: "warning",
                timer: 3000
            })
        },
        async saveData() {

            const objFrm = document.getElementById('frmData')
            const formData = new FormData(objFrm);
            try {
                const {
                    data
                } = await this.$http.post(`api/family/${this.profileid}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                console.log(data)
                this.alertSuccess()

            } catch (err) {
                console.log(err)
                this.alertLoginFail()
            }
        },
        async getData() {
            console.log(this.profileid)
            try {
                const {
                    data
                } = await this.$http.get(`api/family/${this.profileid}`)
                if (data.success && data.data) {
                    console.log(this.formdata)
                    this.formdata = data.data
                    //document.getElementById('flive').trigger("chosen:updated");
                }
            } catch (err) {
                //console.log(err)
            }
        }
    }

}
/*
function updateSelect(){
    this.$refs.select.trigger("chosen:updated");
}
*/
</script>

<style scoped>
h5 {
    font-weight: bold;
}

.form2 {
    margin: 0;
    width: 25%;
    padding: 0 10px;
    margin-bottom: 25px;
}

select {
    padding: 14px 18px;
    outline: none;
    font-size: 14px;
    color: #909090;
    margin: 0;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    display: block;
    background-color: #fcfcfc;
    font-weight: 500;
    border: 1px solid #e0e0e0;
    opacity: 1;
}
</style>
