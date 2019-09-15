<template>
    <div class="q-pa-md">
        <q-table
            title="Your Items"
            :data="data"
            :columns="columns"
            row-key="id"
            hide-bottom/>
    </div>
</template>

<script>
    export default {
        name: 'ItemTable',
        data() {
            return {
                data: [
                    {
                        id: '1',
                        task: 'idk',
                        tags: 'school, CN 1541',
                        recommendedDeadline: '2019/09/13',
                        hardDeadline: '2019/09/14',
                        priorityPoints: 12,
                        difficulty: 'Medium',
                        importance: 'Mission Critical',
                        status: 'Done',
                    },
                ],
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

</style>
