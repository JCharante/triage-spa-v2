<template>
    <q-page class="flex flex-center">
        <div class="row" style="width: 390px; max-width: 90%;">
            <div class="col-12">
                <q-input v-model="username" label="Username"/>
            </div>
            <div class="col-12">
                <q-input v-model="password" label="Password" type="password"/>
            </div>
            <div class="col-12" v-if="creatingAccount">
                <q-input v-model="displayName" label="Display Name"/>
            </div>
            <hr>
            <div class="col-12 row">
                <div class="col">
                    <q-btn @click="creatingAccount ? signup() : signin()" :label="creatingAccount ? `Create Account` : `Sign in`" color="primary" :disable="(username.length === 0 || password.length === 0) || creatingAccount ? displayName.length === 0 : false"/>
                </div>

                <q-btn :label="!creatingAccount? `Need an account?` : `I already have an account`" @click="creatingAccount = !creatingAccount" color="secondary"/>
            </div>
        </div>
    </q-page>
</template>


<script>
    import { Notify } from 'quasar';
    import axios, { axiosInstance } from '../boot/axios';

    export default {
        name: 'Login',
        data() {
            return {
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
