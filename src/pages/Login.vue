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
                    <q-btn @click="creatingAccount ? signup() : signin()" :label="creatingAccount ? `Create Account` : `Sign in`" color="primary" :disable="username.length === 0 || password.length === 0"/>
                </div>

                <q-btn :label="!creatingAccount? `Need an account?` : `I already have an account`" @click="creatingAccount = !creatingAccount" color="secondary"/>
            </div>
        </div>
    </q-page>
</template>


<script>
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
                console.log(1);
            },
            signup() {
                console.log(2);
            },
        },
    };
</script>

<style scoped>

</style>
