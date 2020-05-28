//import axios from '@/util/axios'

import axios from '@/util/axios'
import { ref } from 'vue'

type Tag = {
    id: string
    name: string
}

type Task = {
    id: string
    title: string
    detail: string
    limit: string
    tags: Tag[]
    user: string
}

export default async function useTask() {
    const headers = { 'x-user': 'yskst96' }

    const inititalTaskInput: Task = {
        // ダミーID
        id: 'ffffffffffffffffffffffff',
        title: '',
        detail: 'test detail',
        limit: '20200909',
        tags: [],
        user: 'yskst96'
    }

    const taskInput = ref(inititalTaskInput)

    // タスク一覧
    const resp = await axios.get('/tasks', { headers })
    const tasks_: Task[] = resp.data
    console.log('get tasks result:', tasks_)
    const tasks = ref(tasks_)

    console.log(tasks)

    //タスク更新
    const addTask = async () => {
        const task = { ...taskInput.value }
        console.log('add:', task)
        tasks.value.push(task)
        await axios.post('/tasks', task, { headers })
        taskInput.value.title = ''
        taskInput.value.detail = ''
        taskInput.value.limit = ''
    }

    return {
        tasks,
        taskInput,
        addTask
    }
}
