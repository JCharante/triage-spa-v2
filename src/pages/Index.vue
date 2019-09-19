<template>
  <q-page class="">
    <item-table/>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" @click="prompt = true" />
    </q-page-sticky>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 400px">
          <q-card-section>
              <div class="text-h6">New Task Title</div>
          </q-card-section>

          <q-card-section>
              <q-input dense v-model="name" autofocus @keyup.enter="submit(), prompt = false" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Add item" v-close-popup @click="submit"/>
          </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
</style>

<script>
    import { mapActions } from 'vuex';
    import ItemTable from '../components/ItemTable';

    export default {
        name: 'PageIndex',
        components: { ItemTable },
        data() {
            return {
                prompt: false,
                name: '',
            };
        },
        beforeMount() {
            this.initializeStoreFromServer();
        },
        methods: {
            ...mapActions([
                'initializeStoreFromServer',
            ]),
            submit() {
                this.$store.dispatch('createItem', this.name).then(() => {
                    this.name = '';
                });
            },
        },
    };
</script>
