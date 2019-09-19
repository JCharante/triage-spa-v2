<template>
    <div class="q-pa-md">
        <q-table
            :title="`Welcome Back ${getDisplayName} °˖✧◝(⁰▿⁰)◜✧˖°`"
            :data="getItems"
            :columns="columns"
            row-key="id"
            hide-bottom
            ref="table"
        >
            <template v-slot:body="props">
                <ItemTableRow :props="props"/>
            </template>
        </q-table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ItemTableRow from './ItemTableRow';

    export default {
        name: 'ItemTable',
        components: { ItemTableRow },
        computed: {
            ...mapGetters([
                'getItems',
                'getDisplayName',
            ]),
        },
        mounted() {
            this.$refs.table.innerPagination.rowsPerPage = 0;
        },
        data() {
            return {
                columns: [
                    {
                        name: 'task',
                        field: 'task',
                        label: 'Task',
                        required: true,
                        sortable: true,
                    },
                    {
                        name: 'tags',
                        field: 'tags',
                        label: 'Tags',
                        required: true,
                        sortable: true,
                    },
                    {
                        name: 'recommendedDeadline',
                        field: 'recommendedDeadline',
                        label: 'Recommended Deadline',
                        required: false,
                        sortable: true,
                    },
                    {
                        name: 'hardDeadline',
                        field: 'hardDeadline',
                        label: 'Hard Deadline',
                        required: false,
                        sortable: true,
                    },
                    {
                        name: 'priorityPoints',
                        field: 'priorityPoints',
                        label: 'Priority Points',
                        required: false,
                        sortable: true,
                    },
                    {
                        name: 'difficulty',
                        field: 'difficulty',
                        label: 'Difficulty',
                        required: false,
                        sortable: true,
                    },
                    {
                        name: 'importance',
                        field: 'importance',
                        label: 'Importance',
                        required: false,
                        sortable: true,
                    },
                    {
                        name: 'status',
                        field: 'status',
                        label: 'Status',
                        required: true,
                        sortable: true,
                    },
                ],
            };
        },
    };
</script>

<style scoped>
    .p {
        color: red;
    }
</style>
