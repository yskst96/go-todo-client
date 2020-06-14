<template>
    <div class="task-input">
        <div class="input-elm">
            <div>タスク名</div>
            <TextInput
                :value="taskInput.title"
                @input="value => (taskInput.title = value)"
            />
        </div>
        <div class="input-elm">
            <div>詳細</div>
            <TextAreaInput
                :value="taskInput.detail"
                @input="value => (taskInput.detail = value)"
            />
        </div>
        <div class="input-elm">
            <div>期限</div>
            <TextInput
                :value="taskInput.limit"
                @input="value => (taskInput.limit = value)"
            />
        </div>
        <div class="input-elm">
            <div>タグ</div>
            <TextInput
                :value="tagfilterInput"
                @input="value => (tagfilterInput = value)"
            />

            <div>
                <button
                    v-for="(tag, index) in tagfilter(tagfilterInput).filter(
                        t => !taskInput.tags.includes(t)
                    )"
                    :key="index"
                    @click="taskInput.tags.push(tag)"
                >
                    {{ tag.name }}
                </button>
            </div>
            <div class="tagged">
                <template v-for="(tag, index) in taskInput.tags">
                    <TagLabel :tag="tag" :key="index"></TagLabel>
                </template>
            </div>
        </div>
        <div>{{ taskInput }}</div>
        <div class="input-elm add-button">
            <AccentButton @click="newTask(taskInput)">
                <span class="add-text">追加する</span>
            </AccentButton>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, reactive } from 'vue'
import { Task } from '@/hooks/task'
import { Tag } from '@/hooks/tag'

import TagLabel from '@/components/TagLabel.vue'
import AccentButton from '@/components/AccentButton.vue'
import TextInput from '@/components/TextInput.vue'
import TextAreaInput from '@/components/TextAreaInput.vue'

export default defineComponent({
    props: {
        addTask: { type: Function as PropType<(task: Task) => Promise<void>> },
        tagfilter: { type: Function as PropType<(text: string) => Tag[]> }
    },
    components: { TagLabel, AccentButton, TextInput, TextAreaInput },
    setup(props) {
        const tagfilterInput = ref('')
        const initTask: Task = {
            // ダミーID
            id: 'ffffffffffffffffffffffff',
            title: '',
            detail: '',
            limit: '',
            tags: [],
            user: 'yskst96'
        }
        const taskInput: Task = reactive(initTask)

        const newTask = async (task: Task) => {
            if (!props.addTask) return

            await props.addTask({ ...task })
            taskInput.title = ''
            taskInput.detail = ''
            taskInput.tags = []
            taskInput.limit = ''
        }

        const h = (e: any) => {
            console.log(e.toString())
        }

        return {
            tagfilterInput,
            taskInput,
            newTask,
            h
        }
    }
})
</script>
<style scope>
.task-input {
    width: 240px;
}
.input-elm {
    margin: 8px 0px;
}
.tagged {
    margin-top: 20px;
}
.add-button {
    margin-top: 20px;
}
</style>
