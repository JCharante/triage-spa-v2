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
        <q-td key="hardDeadline" :props="props">
            {{ hardDeadline }}
            <q-popup-edit buttons v-model="hardDeadline_" @save="hardDeadline = hardDeadline_">
                <q-input v-model="hardDeadline_">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
                                <q-date v-model="hardDeadline_" @input="() => $refs.qDateProxy2.hide()" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-popup-edit>
        </q-td>
        <q-td key="priorityPoints" :props="props">
            {{ props.row.priorityPoints }}
        </q-td>
        <q-td key="difficulty" :props="props">
            <q-select dense class="col" v-model="difficulty" :options="['', 'Easy', 'Medium', 'Hard']"/>
        </q-td>
        <q-td key="importance" :props="props">
            <q-select dense class="col" v-model="importance" :options="['', 'Low', 'Medium', 'High', 'Mission Critical']"/>
        </q-td>
        <q-td key="status" :props="props">
            <q-select dense class="col" v-model="status" :options="[`Not Started`, 'In Progress', 'Done', 'Delete']"/>
        </q-td>
        <q-dialog v-model="showDeletePrompt" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="primary" text-color="white" />
                    <span class="q-ml-sm">This will delete this item.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Yes, Delete." color="primary" v-close-popup @click="deleteItemById({ id: props.key })"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
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
                    if (newVal !== 'Delete') {
                        return this.setItemPropertiesById({
                            id: this.props.key,
                            status: newVal,
                        });
                    }
                    this.showDeletePrompt = true;
                    return new Promise((resolve, reject) => resolve());
                },
            },
        },
        methods: {
            ...mapActions([
                'setItemPropertiesById',
                'deleteItemById',
            ]),
        },
        mounted() {
            this.task_ = this.task;
            this.tags_ = this.tags;
            this.recommendedDeadline_ = this.recommendedDeadline;
            this.hardDeadline_ = this.hardDeadline;
        },
        data() {
            return {
                task_: '',
                tags_: '',
                recommendedDeadline_: '',
                hardDeadline_: '',
                showDeletePrompt: false,
            };
        },
    };
</script>

<style scoped>

</style>
