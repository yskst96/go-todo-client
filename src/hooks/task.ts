//import axios from '@/util/axios'

import axios from '@/util/axios'
import { ref } from 'vue'
import { Tag } from '@/hooks/tag'

export type Task = {
    id: string
    title: string
    detail: string
    limit: string
    tags: Tag[]
    user: string
}

export async function useTask() {
    const headers = { 'x-user': 'yskst96' }

    // タスク一覧
    const resp = await axios.get('/tasks', { headers })
    const tasks_: Task[] = resp.data
    console.log('get tasks result:', tasks_)
    const tasks = ref(tasks_)

    console.log(tasks)

    //タスク追加
    const addTask = async (task: Task) => {
        console.log('add:', task)
        const res = await axios.post('/tasks', task, { headers })
        console.log('added:', task)
        task.id = res.data
        tasks.value.push(task)
        console.log(task, tasks.value)
    }

    //タスク削除
    const deleteTask = async (id: string) => {
        const params = {
            id
        }
        const res = await axios.delete('/tasks', { params, headers })
        console.log(res)
        tasks.value = tasks.value.filter(t => t.id !== id)
    }

    return {
        tasks,
        addTask,
        deleteTask
    }
}
