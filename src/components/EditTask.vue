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

            <div class="selectTag">
                <template
                    v-for="(tag, index) in tagfilter(tagfilterInput).filter(
                        t => !taskInput.tags.includes(t)
                    )"
                >
                    <div :key="index" class="selectable-tags">
                        <TagLabel
                            :tag="tag"
                            :selectable="true"
                            @click="taskInput.tags.push(tag)"
                        ></TagLabel>
                    </div>
                </template>
            </div>
            <div class="tagged">
                <template v-for="(tag, index) in taskInput.tags">
                    <div :key="index" class="tagged-tags">
                        <TagLabel
                            :tag="tag"
                            :deletable="true"
                            @click="
                                taskInput.tags = taskInput.tags.filter(
                                    t => t !== tag
                                )
                            "
                        ></TagLabel>
                    </div>
                </template>
            </div>
        </div>
        <div class="input-elm add-button">
            <AccentButton>
                <span class="add-text" @click="update">タスクを更新する</span>
            </AccentButton>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import clonedeep from 'lodash.clonedeep'
import { Task } from '@/hooks/task'
import { Tag } from '@/hooks/tag'

import TagLabel from '@/components/TagLabel.vue'
import AccentButton from '@/components/AccentButton.vue'
import TextInput from '@/components/TextInput.vue'
import TextAreaInput from '@/components/TextAreaInput.vue'
import { useTask } from '@/hooks/task'

export default defineComponent({
    props: {
        updateTask: {
            type: Function as PropType<(task: Task) => Promise<void>>,
            required: true
        },
        tagfilter: {
            type: Function as PropType<(text: string) => Tag[]>,
            required: true
        },
        target: { type: String as PropType<string>, required: true }
    },
    components: { TagLabel, AccentButton, TextInput, TextAreaInput },
    async setup(props) {
        console.log('target:', props.target)
        const tagfilterInput = ref('')

        const { tasks } = await useTask()
        const editingTask = clonedeep(tasks.value)

        const current = editingTask.find(t => t.id === props.target)

        const taskInput = ref(current)

        const update = async () => {
            console.log('update', taskInput.value)
            if (taskInput.value) await props.updateTask(taskInput.value)
        }

        return {
            tagfilterInput,
            taskInput,
            update
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
