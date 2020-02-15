<template>
    <q-page class="flex flex-center">
        <div class="row" style="width: 390px; max-width: 90%;">
            <div class="col-12">
                Log in or sign up with your phone number
            </div>
            <template>
                <div class="col-12">
                    <VueTelInput v-model="tel" :preferredCountries="['US', 'CA', 'VN', 'AU', 'CN', 'TH']"/>
                </div>
                <div class="col-12" style="margin-top: 30px;">
                    <q-btn label="Send Verification Code"/>
                </div>
            </template>
            <template style="margin-top: 50%">
                <q-input/>
            </template>
            <div class="col-12 row" style="margin-top: 50px">
                <p>Why a phone number?</p>
            </div>
        </div>
    </q-page>
</template>


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
                username: '',
                password: '',
                displayName: '',
                creatingAccount: false,
            };
        },
        methods: {
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
