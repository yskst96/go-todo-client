<template>
    <div>
        <AccentButton @click="isAddingTask = true">TODOを追加する</AccentButton>

        <!-- TODO新規追加モーダル -->
        <Modal
            :visible="isAddingTask"
            :close="
                () => {
                    isAddingTask = false
                }
            "
        >
            <AddTask :addTask="newTask" :tagfilter="tagfilter"></AddTask>
        </Modal>

        <!-- <button @click="isAddingTag = true">タグを新規登録する</button>
        タグ新規追加モーダル
        <Modal :visible="isAddingTag">
            <div class="tag-input">
                <input type="text" v-model="tagInput" />
                <div>{{ tags }}</div>
                <button @click="newTag()">
                    ADD NEW TAG
                </button>
            </div>
            <div>{{ taskInput.value }}</div>
        </Modal>
        -->

        <!-- タスク編集モーダル -->
        <Modal :visible="isEditingTask">
            <div>編集</div>
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
        <div class="task-list">
            <div class="task" v-for="(task, index) in tasks" :key="index">
                <TaskCard :task="task" :delete="deleteTask"></TaskCard>
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
// import SuggestInput from '@/components/SuggestInput.vue'

export default defineComponent({
    components: {
        Modal,
        TaskCard,
        AccentButton,
        AddTask
        // SuggestInput,
    },
    async setup() {
        // created相当の処理はsetUp時に直接書く

        // task
        const { tasks, addTask, deleteTask } = await useTask()
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

        return {
            //task
            tasks,
            taskInput,
            newTask,
            deleteTask,
            isAddingTask,
            isEditingTask,
            taskFilterInput,

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
<style scoped>
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

.task-list .task {
    margin: 4px 0px;
}
</style>
