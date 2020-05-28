<template>
    <div>
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
                <button @click="addTask">ADD TASK</button>
            </div>
        </div>
        <div>{{ taskInput }}</div>
        <div>
            <div v-for="(task, index) in tasks" :key="index">
                {{ task.title }}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import useTask from '@/components/task'

export default defineComponent({
    async setup() {
        // created相当の処理はsetUp時に直接書く

        const { tasks, addTask, taskInput } = await useTask()

        console.log(tasks.value[0])

        return { tasks, taskInput, addTask }
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
    width: 20rem;
}
.input-elm textarea {
    width: 20rem;
}
</style>
