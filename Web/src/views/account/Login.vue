<template>
<div class="container " style="margin-top:30px;">

    <div class="my-account">
        <img src="images/LogoKSL.png" class="img-responsive" style="width:50%" />
        <h2> ระบบฝากประวัติเพื่อสมัครงาน </h2>
        <ul class="tabs-nav">
            <li class=""><a href="#tab1">เข้าสู้ระบบ</a></li>
            <li><a href="#tab2">ลงทะเบียนเข้าใช้งาน</a></li>
        </ul>

        <div class="tabs-container">
            <!-- Login -->
            <div class="tab-content" id="tab1" style="display: none;">
                <form method="post" class="login" @submit.prevent="handleSubmitLogin">

                    <p class="form-row form-row-wide">
                        <label for="username">รหัสบัตรประจำประชาชน:
                            <i class="ln ln-icon-Male"></i>
                            <masked-input type="text" ref="username" class="form-control input-text" v-model="login.username" :mask="[/[0-9]/,' ', /\d/,/\d/, /\d/,/\d/,' ', /\d/, /\d/, /\d/,/\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/]" :guide="false" placeholderChar="#" :class="{ 'is-invalid': submitted && $v.user.idcard.$error  }">
                            </masked-input>
                        </label>
                    </p>

                    <p class="form-row form-row-wide">
                        <label for="password">รหัสผ่าน:
                            <i class="ln ln-icon-Lock-2"></i>
                            <input class="input-text" type="password" v-model="login.password" name="password" id="password" />
                        </label>
                    </p>

                    <p class="form-row">
                        <input type="submit" class="button border fw margin-top-10" name="login" value="เข้าสู่ระบบ" />

                        <label for="rememberme" class="rememberme" v-show="0">
                            <input name="rememberme" type="checkbox" v-show="0" id="rememberme" value="forever" /> Remember Me</label>
                    </p>

                    <p class="lost_password" v-show="0">
                        <a href="#">Lost Your Password?</a>
                    </p>

                </form>
            </div>

            <!-- Register -->
            <div class="tab-content" id="tab2" style="display: none;">
                <form method="post" ref="frmReg" class="register" @submit.prevent="handleSubmit">

                    <p class="form-row form-row-wide">
                        <label for="username2">เลขที่บัตรประจำตัวประชาชน
                            <i class="ln ln-icon-Credit-Card2"></i>
                            <masked-input type="text" ref="refidcard" class="form-control input-text" v-model="user.idcard" :mask="[/[0-9]/,' ', /\d/,/\d/, /\d/,/\d/,' ', /\d/, /\d/, /\d/,/\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/]" :guide="false" placeholderChar="#" :class="{ 'is-invalid': submitted && $v.user.idcard.$error  }">
                            </masked-input>

                        </label>
                    </p>

                    <p class="form-row form-row-wide">
                        <label for="password1">วันเกิด (วัน/เดือน/ปี พ.ศ.)
                            <i class="ln ln-icon-Birthday-Cake"></i>
                            <masked-input type="text" class="form-control input-text" v-model="user.birthday" :mask="[/[0-9]/,/[0-9]/,'/',/[0-9]/,/[0-9]/,'/',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/]" :guide="false" placeholderChar="#" :class="{ 'is-invalid': submitted && $v.user.birthday.$error  }">
                            </masked-input>
                        </label>
                    </p>

                    <div class="form-row form-row-wide">
                        <div class="form-group">
                            <label for="email2">ชื่อ-สกุล
                                <i class="ln ln-icon-Boy"></i>
                                <input type="text" v-model="user.nameth" class="form-control input-text" :class="{ 'is-invalid': submitted && $v.user.nameth.$error  }" />

                            </label>
                        </div>
                    </div>

                    <p class="form-row">
                        <VueLoadingButton aria-label="ลงทะเบียน" type="submit" class="button" :loading="button.isLoading" :styled="button.isStyled"> <i class="ln ln-icon-Save"></i> ลงทะเบียน
                        </VueLoadingButton>
                    </p>

                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import VueLoadingButton from 'vue-loading-button'

import {
    required,
    minLength
} from "vuelidate/lib/validators";
export default {
    data() {
        return {
            login: {
                username: '',
                password: ''
            },
            user: {
                idcard: '',
                birthday: '',
                nameth: ''
            },
            submitted: false,
            button: {
                isLoading: false,
                isStyled: false
            }
        }
    },
    validations: {
        user: {
            nameth: {
                required
            },
            idcard: {
                required,
                minLength: minLength(17)
            },
            birthday: {
                required,
                minLength: minLength(10),
                isUnique() {
                    return this.isValidDate();
                }
            }

        }
    },
    mounted() {
        setTimeout(() => {
            this.$refs.username.$el.focus();
        }, 300);

    },
    methods: {
        handleSubmitLogin: async function () {
            console.log('Login doing')
            this.$store.dispatch('user/retrieveToken', this.login).then(() => {
                if (this.$store.getters['user/isLogged'])
                    this.$router.push('/home')
                else {
                    this.alertLoginFail();
                }
            })
        },
        async handleSubmit() {
            this.button.isLoading = true;
            this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.button.isLoading = false
                return;
            }

           // console.log(' ---- register -----')
           // console.log(this.user)

            const dataUser = {
                ...this.user
            }
            const dataLogin = {
                username: dataUser.idcard,
                password: dataUser.birthday.split("/").join("")
            }

            await this.$http.post('api/login/register', this.user)
                .then((response) => {
                    if (response.data.success == 0)
                        this.alertWarning(response.data.message)
                    else {

                        this.alertSuccess();

                        this.$store.dispatch('user/retrieveToken', dataLogin).then(() => {
                            if (this.$store.getters['user/isLogged'])
                                this.$router.push('/profile')
                            else {
                                this.alertLoginFail();
                            }
                        })

                    }
                    this.button.isLoading = false;
                })
                .catch((error) => {
                    console.log(error)
                    this.alertError()
                });

        },
        isValidDate: async function () {
            const [date, month, year] = this.user.birthday.split("/")
            const engYear = +year - 543
            if (!(2000 <= year && year <= 2800))
                return false
            if (month === 0 || month > 12)
                return false;
            var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (engYear % 400 === 0 || (engYear % 100 !== 0 && engYear % 4 === 0))
                monthLength[1]++;
            return date > 0 && date <= monthLength[month - 1];
        },
        alertSuccess: function () {
            this.$fire({
                title: "ลงทะเบียนฝากประวัติสมัครงาน",
                text: 'บันทึกเรียบร้อยแล้ว',
                type: "success",
                timer: 3000
            }).then(() => {
                //  this.$refs.frmReg.reset();
                location.reload();
            });
        },
        alertWarning: function (message) {
            this.$fire({
                title: "ลงทะเบียนฝากประวัติสมัครงาน",
                text: message,
                type: "warning",
                timer: 3000
            })
        },
        alertError: function () {
            this.$fire({
                title: "ลงทะเบียนฝากประวัติสมัครงาน",
                text: 'Api มีปัญหาขอให้ลองดูใหม่อีกครั้ง',
                type: "error",
                timer: 3000
            })
        },
        alertLoginFail: function () {
            this.$fire({
                title: "เข้าใช้งานฝากประวัติสมัครงาน",
                text: 'ไม่สามารถเข้าใช้งานได้ ลองใหม่อีกครั้งครับ.',
                type: "warning",
                timer: 3000
            })
        },
    },
    components: {
        VueLoadingButton

    }
}
</script>

<style scoped>
.is-invalid {
    /*border: 1px solid #f6d5d3;*/
    background: #ffeceb;
}

.input-invalid {
    margin: 0px;
    background: #ffeceb;
}
</style>
