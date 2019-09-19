<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Triage V2
        </q-toolbar-title>

        <div></div>
        <q-btn v-if="isProbablySignedIn" flat @click="logout().then($router.push('/login'))" icon="exit_to_app">Log out</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'MyLayout',
        computed: {
            ...mapGetters([
                'isProbablySignedIn',
            ]),
        },
        methods: {
            ...mapActions([
                'logout',
            ]),
        },
    };
</script>

<style>
</style>
