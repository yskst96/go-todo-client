<template>
    <div class="card paragraph">
        <div class="info">
            <div class="title">{{ task.title }}</div>
            <div>期限:{{ taskLimit }}</div>
            <div>
                <template v-for="(tag, index) in task.tags">
                    <TagLabel
                        class="tag-label"
                        :tag="tag"
                        :key="index"
                    ></TagLabel>
                </template>
            </div>
            <div>
                {{ task.detail }}
            </div>
        </div>
        <div class="delete">
            <span @click.stop="deleteTask(task.id)">delete</span>
        </div>
    </div>
</template>
<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, PropType, computed } from 'vue'
import { Task } from '@/hooks/task'
import TagLabel from '@/components/TagLabel.vue'

type Props = {
    task: Task
}

export default defineComponent({
    props: {
        task: { type: Object as PropType<Task> },
        delete: { type: Function as PropType<(id: string) => Promise<void>> }
    },
    components: { TagLabel },
    setup(props) {
        if (!props.task) {
            throw new Error('props:task is not recieved')
        }

        const taskLimit = computed(() => {
            return dayjs(props.task?.limit).format('YYYY/MM/DD HH時')
        })

        const deleteTask = async (id: string) => {
            if (!props.delete) return

            await props.delete(id)
        }

        return {
            taskLimit,
            deleteTask
        }
    }
})
</script>
<style scoped>
.card {
    height: 120px;
    display: flex;
    justify-content: space-between;
    background-color: #f3d2c1;
    color: #172c66;
    border-radius: 8px;
    border: none;
    cursor: pointer;
}

.card:hover {
    background-color: #f1b99d;
    transition: background-color 250ms;
}

.info {
    padding: 8px 8px;
}
.title {
    font-size: 1.1rem;
    color: #001858;
    font-weight: bold;
}
.tag-label {
    margin-right: 4px;
}
.delete {
    padding-top: 8px;
    padding-right: 8px;
    color: #f31e29;
    cursor: pointer;
}
</style>
