<template>
    <div>
        <AccentButton @click="isAddingTask = true">TODOを追加する</AccentButton>
        <!-- TODO新規追加モーダル -->
        <Modal :visible="isAddingTask" :close="closeAddModal">
            <AddTask :addTask="newTask" :tagfilter="tagfilter"></AddTask>
        </Modal>

        <!-- タスク編集モーダル -->
        <Modal :visible="isEditingTask" :close="closeEditModal">
            <div v-if="isEditingTask">
                <EditTask
                    :updateTask="editTask"
                    :tagfilter="tagfilter"
                    :target="selectedTaskId"
                ></EditTask>
            </div>
        </Modal>

        <!-- タスクフィルタ  -->
        <!-- <div class="tasl-filter">
            <div>
                <span>タグでフィルタ：</span>
                <SuggestInput
                    :items="tags.map(t => t.name)"
                    :value="taskFilterInput"
                    @input="onFilterInput"
                ></SuggestInput>
            </div>
        </div> -->

        <!-- タスク一覧 -->
        <div class="task-list mx-2 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            <div class="task my-2" v-for="(task, index) in tasks" :key="index">
                <TaskCard
                    :task="task"
                    :delete="deleteTask"
                    @click="openEditModal(task)"
                ></TaskCard>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useTask, Task } from '@/hooks/task'
import { useTag } from '@/hooks/tag'
import Modal from '@/components/Modal.vue'
import TaskCard from '@/components/TaskCard.vue'
import AccentButton from '@/components/AccentButton.vue'
import AddTask from '@/components/AddTask.vue'
import EditTask from '@/components/EditTask.vue'

// import SuggestInput from '@/components/SuggestInput.vue'

export default defineComponent({
    components: {
        Modal,
        TaskCard,
        AccentButton,
        AddTask,
        EditTask

        // SuggestInput,
    },
    async setup() {
        // created相当の処理はsetUp時に直接書く

        // task
        const { tasks, addTask, deleteTask, updateTask } = await useTask()
        const initTask: Task = {
            // ダミーID
            id: 'ffffffffffffffffffffffff',
            title: '',
            detail: 'test detail',
            limit: '20200909',
            tags: [],
            user: 'yskst96'
        }
        const taskInput = reactive(initTask)
        const isAddingTask = ref(false)
        const isEditingTask = ref(false)
        const taskFilterInput = ref('')
        const selectedTaskId = ref('')

        const editTask = async (task: Task) => {
            await updateTask(task)
            isEditingTask.value = false
        }

        const newTask = async (task: Task) => {
            await addTask(task)
            isAddingTask.value = false
        }

        //tag
        const { tags, addTag, tagfilter } = await useTag()

        const tagInput = ref('')
        const tagfilterInput = ref('')
        const isAddingTag = ref(false)

        const newTag = async () => {
            await addTag(tagInput.value)
            isAddingTag.value = false
        }

        const onFilterInput = (event: { type: string; value: string }) => {
            if (event.type !== 'filter') return
            taskFilterInput.value = event.value
        }

        const openEditModal = (task: Task) => {
            selectedTaskId.value = task.id
            isEditingTask.value = true
        }

        const closeAddModal = () => {
            isAddingTask.value = false
        }

        const closeEditModal = () => {
            isEditingTask.value = false
        }

        return {
            //task
            tasks,
            taskInput,
            newTask,
            deleteTask,
            editTask,
            isAddingTask,
            isEditingTask,
            taskFilterInput,
            openEditModal,
            closeAddModal,
            closeEditModal,
            selectedTaskId,

            //Tag
            tags,
            tagInput,
            newTag,
            tagfilter,
            tagfilterInput,
            isAddingTag,

            onFilterInput
        }
    }
})
</script>
<style lang="postcss" scoped>
.task-input {
    padding: 16px;
}
.input-elm {
    margin-bottom: 24px;
}
.input-elm input {
    width: 16rem;
}
.input-elm textarea {
    width: 16rem;
}
</style>
