<template>
    <q-tr :props="props">
        <q-td key="task" :props="props">
            {{ task }}
            <q-popup-edit buttons v-model="task_" @save="task = task_">
                <q-input v-model="task_"/>
            </q-popup-edit>
        </q-td>
        <q-td key="tags" :props="props">
            {{ tags }}
            <q-popup-edit buttons v-model="tags_" @save="tags = tags_">
                <q-input v-model="tags_"/>
            </q-popup-edit>
        </q-td>
        <q-td key="recommendedDeadline" :props="props">
            {{ recommendedDeadline }}
            <q-popup-edit buttons v-model="recommendedDeadline_" @save="recommendedDeadline = recommendedDeadline_">
                <q-input v-model="recommendedDeadline_">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="recommendedDeadline_" @input="() => $refs.qDateProxy.hide()" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-popup-edit>
        </q-td>
        <q-td key="priorityPoints" :props="props">
            {{ props.row.priorityPoints }}
        </q-td>
    </q-tr>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'ItemTableRow',
        props: ['props'],
        computed: {
            ...mapGetters([
                'getItemById',
            ]),
            task: {
                get() {
                    return this.getItemById(this.props.key).task;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.props.key,
                        task: newVal,
                    });
                },
            },
            tags: {
                get() {
                    return this.getItemById(this.props.key).tags;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.props.key,
                        tags: newVal,
                    });
                },
            },
            recommendedDeadline: {
                get() {
                    return this.getItemById(this.props.key).recommendedDeadline;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.props.key,
                        recommendedDeadline: newVal,
                    });
                },
            },
            hardDeadline: {
                get() {
                    return this.getItemById(this.props.key).hardDeadline;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.props.key,
                        hardDeadline: newVal,
                    });
                },
            },
            difficulty: {
                get() {
                    return this.getItemById(this.props.key).difficulty;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.props.key,
                        difficulty: newVal,
                    });
                },
            },
            importance: {
                get() {
                    return this.getItemById(this.props.key).importance;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.props.key,
                        importance: newVal,
                    });
                },
            },
            status: {
                get() {
                    return this.getItemById(this.props.key).status;
                },
                set(newVal) {
                    return this.setItemPropertiesById({
                        id: this.props.key,
                        status: newVal,
                    });
                },
            },
        },
        methods: {
            ...mapActions([
                'setItemPropertiesById',
            ]),
        },
        mounted() {
            this.task_ = this.task;
            this.tags_ = this.tags;
            this.recommendedDeadline_ = this.recommendedDeadline;
        },
        data() {
            return {
                task_: '',
                tags_: '',
                recommendedDeadline_: '',
                hardDeadline_: '',
                difficulty_: '',
                importance_: '',
                status_: '',
            };
        },
    };
</script>

<style scoped>

</style>
