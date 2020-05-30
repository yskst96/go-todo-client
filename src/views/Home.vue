<template>
    <div>
        <button @click="addingTask = true">TODOを追加する</button>
        <Modal :visible="addingTask">
            <div class="task-input">
                <div class="input-elm">
                    <div>タスク名</div>
                    <input type="text" v-model="taskInput.title" />
                </div>
                <div class="input-elm">
                    <div>詳細</div>
                    <textarea v-model="taskInput.detail" />
                </div>
                <div class="input-elm">
                    <div>期限</div>
                    <input type="text" v-model="taskInput.limit" />
                </div>
                <div class="input-elm">
                    <div>タグ</div>
                    <input type="text" v-model="tagfilterInput" />
                    <div>{{ taskInput.tags }}</div>
                    <div>
                        <button
                            v-for="(tag, index) in tagfilter(tagfilterInput)"
                            :key="index"
                            @click="taskInput.tags.push(tag)"
                        >
                            {{ tag.name }}
                        </button>
                    </div>
                </div>
                <div class="input-elm">
                    <button @click="newTask(taskInput)">ADD TASK</button>
                </div>
            </div>
        </Modal>
        <button @click="addingTag = true">タグを新規登録する</button>
        <Modal :visible="addingTag">
            <div class="tag-input">
                <input type="text" v-model="tagInput" />
                <div>{{ tags }}</div>
                <button @click="newTag()">
                    ADD NEW TAG
                </button>
            </div>
            <div>{{ taskInput.value }}</div>
        </Modal>
        <div class="task-list">
            <div class="task" v-for="(task, index) in tasks" :key="index">
                <div>{{ task.title }}</div>
                <div>期限:{{ task.limit }}</div>
                <div>{{ task.detail }}</div>
                <div>
                    <div>タグ</div>
                    <div v-if="task.tags.length != 0">
                        {{ task.tags.map(t => t.name) }}
                    </div>
                    <div v-else>-</div>
                    <div>
                        <div>
                            <button
                                v-for="(tag, index) in tagfilter()"
                                :key="index"
                                @click="taskInput.tags.push(tag)"
                            >
                                {{ tag.name }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useTask, Task } from '@/components/task'
import { useTag } from '@/components/tag'
import Modal from '@/components/Modal.vue'

export default defineComponent({
    components: {
        Modal
    },
    async setup() {
        // created相当の処理はsetUp時に直接書く

        // task
        const { tasks, addTask } = await useTask()
        const initTask: Task = {
            // ダミーID
            id: 'ffffffffffffffffffffffff',
            title: '',
            detail: 'test detail',
            limit: '20200909',
            tags: [
                {
                    id: '5ed2881de41620edb9e8664e',
                    name: 'aaaa',
                    user: 'yskst96'
                }
            ],
            user: 'yskst96'
        }
        const taskInput = reactive(initTask)
        const addingTask = ref(false)

        const newTask = async (task: Task) => {
            await addTask({ ...task })
            taskInput.title = ''
            taskInput.detail = ''
            taskInput.tags = []
            taskInput.limit = ''
            addingTask.value = false
        }

        //tag
        const { tags, addTag, tagfilter } = await useTag()

        const tagInput = ref('')
        const tagfilterInput = ref('')
        const addingTag = ref(false)
        const newTag = async () => {
            await addTag(tagInput.value)
            addingTag.value = false
        }

        return {
            tasks,
            taskInput,
            newTask,
            addingTask,
            tags,
            tagInput,
            newTag,
            tagfilter,
            tagfilterInput,
            addingTag
        }
    }
})
</script>
<style scoped>
.task-input {
    padding: 16px;
    background-color: rgb(145, 229, 156);
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

.tag-input {
    background-color: rgb(145, 181, 229);
}

.task-list .task {
    border: solid 2px black;
    margin: 4px 0px;
}
</style>
