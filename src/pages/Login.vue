<template>
    <q-page class="flex flex-center">
        <div class="row" style="width: 390px; max-width: 90%;">
            <template v-if="!enterCodeMode">
                <div class="col-12">
                    <p class="text-center">Log in or sign up with your phone number</p>
                </div>
                <div class="col-12">
                    <VueTelInput ref="telInput" v-model="tel" :preferredCountries="['US', 'CA', 'VN', 'AU', 'CN', 'TH', 'GB']"/>
                </div>
                <div class="col-12 row justify-center" style="margin-top: 30px;">
                    <q-btn label="Send Verification Code"
                           :color="tel.length < 10 ? 'black' : 'primary' "
                           :disable="tel.length < 10"
                           @click="requestCode"
                    />
                </div>
                <div class="col-12" style="margin-top: 50px">
                    <p class="text-center">Your phone number is only used to log in / sign up.</p>
                </div>
                <div class="col-12">
                    <p class="text-center">No need to remember any passwords.</p>
                </div>
                <div class="col-12">
                    <p class="text-center">Concerns? Email triagev2@jcharante.com</p>
                </div>
            </template>
            <template v-else>
                <div class="col-12">
                    <p class="text-center">Check your phone for a 6-digit verification code.</p>
                </div>
                <div class="col-12 row justify-center">
                    <q-input v-model="code"
                             :max="6"
                             mask="######"
                             label="Verification Code"
                             fill-mask="#"/>
                    <q-btn label="submit"
                           :color="code.includes('#') ? 'black' : 'primary' "
                           :disable="code.includes('#')"
                    />
                </div>
                <div class="col-12" style="margin-top: 20px;">
                    <p class="text-center">We sent a code to +{{ dialCode }} {{ tel }}.</p>
                </div>
                <div class="col-12">
                    <p class="text-center"><span class="fake-link" @click="changeNumber">Wrong number?</span></p>
                </div>
                <div class="col-12">
                    <p class="text-center">
                        <template v-if="waiting">
                            <span>Wait {{ time }}s before resending code.</span>
                        </template>
                        <template v-else>
                            <span class="fake-link" @click="resendCode">Resend code</span>
                        </template>
                    </p>
                </div>
            </template>
        </div>
    </q-page>
</template>

<style lang="stylus">
    .fake-link {
        color: $primary;
        text-decoration:underline;
    }
    .fake-link:hover {
        text-decoration: none;
        cursor: pointer;
    }
</style>


<script>
    import { Notify } from 'quasar';
    import { VueTelInput } from 'vue-tel-input';
    import axios, { axiosInstance } from '../boot/axios';

    export default {
        name: 'Login',
        components: {
            VueTelInput,
        },
        data() {
            return {
                tel: '',
                dialCode: 0,
                enterCodeMode: false,
                code: '',
                username: '',
                password: '',
                displayName: '',
                creatingAccount: false,
                waiting: false,
                time: 0,
            };
        },
        methods: {
            changeNumber() {
                this.enterCodeMode = false;
                this.waiting = false;
            },
            timer() {
                if (this.time <= 0) {
                    this.waiting = false;
                } else if (this.waiting) {
                    // eslint-disable-next-line no-plusplus
                    this.time--;
                    setTimeout(this.timer, 1000);
                }
            },
            requestCode() {
                this.dialCode = this.$refs.telInput.activeCountry.dialCode;
                this.enterCodeMode = true;
                this.time = 60;
                this.waiting = true;
                setTimeout(this.timer, 1000);
                this.sendVerificationRequest();
            },
            resendCode() {
                this.time = 60;
                const oldWaiting = this.waiting;
                this.waiting = true;
                if (!oldWaiting) {
                    setTimeout(this.timer, 1000);
                }
                this.sendVerificationRequest();
            },
            sendVerificationRequest() {
                axiosInstance.post('/auth', { dialCode: this.dialCode, phoneNumber: this.tel })
                    .then((response) => {
                        console.log(response);
                    });
            },
            signin() {
                axiosInstance.post('/login', { username: this.username, password: this.password })
                    .then((response) => {
                        console.log(response);
                        this.$store.dispatch('setSessionDoc', response.data).then(this.$router.push('/'));
                        return response;
                    })
                    .then((response) => {
                        return axiosInstance.post('/', { sessionKey: response.data.sessionKey, requestType: 'userDetails' });
                    })
                    .then((response) => {
                        this.$store.dispatch('setDisplayName', response.data);
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            Notify.create({
                                message: "(」゜ロ゜)」 Invalid Credentials",
                                timeout: 2000,
                                color: 'red',
                            });
                        }
                        console.error(err);
                    });
            },
            signup() {
                axiosInstance.post('/signup', { username: this.username, password: this.password, displayName: this.displayName })
                    .then((response) => {
                        console.log(response);
                        this.$store.dispatch('setSessionDoc', response.data).then(this.$router.push('/'));
                        return response;
                    })
                    .then((response) => {
                        return axiosInstance.post('/', { sessionKey: response.data.sessionKey, requestType: 'userDetails' });
                    })
                    .then((response) => {
                        this.$store.dispatch('setDisplayName', response.data);
                    })
                    .catch((err) => {
                        if (err.response.status === 500) {
                            Notify.create({
                                message: "Try a different username ┗(•̀へ •́ ╮ )",
                                timeout: 2000,
                                color: 'red',
                            });
                        }
                        console.error(err);
                    });
            },
        },
    };
</script>

<style scoped>

</style>
