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

            <DatePicker
                ref="datepicker"
                :picker="'add-task-limit'"
                :value="taskInput.limit"
                @input="taskInput.limit = $event"
            ></DatePicker>
        </div>
        <div class="input-elm">
            <div>タグ</div>
            <TextInput
                :value="tagfilterInput"
                @input="value => (tagfilterInput = value)"
                @enter="newTag"
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
            <AccentButton @click="newTask(taskInput)">
                <span class="add-text">追加する</span>
            </AccentButton>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, reactive } from 'vue'
import { Task } from '@/hooks/task'
import { Tag, useTag } from '@/hooks/tag'

import TagLabel from '@/components/TagLabel.vue'
import AccentButton from '@/components/AccentButton.vue'
import TextInput from '@/components/TextInput.vue'
import TextAreaInput from '@/components/TextAreaInput.vue'
import DatePicker from '@/components/DatePicker.vue'

export default defineComponent({
    props: {
        addTask: { type: Function as PropType<(task: Task) => Promise<void>> },
        tagfilter: { type: Function as PropType<(text: string) => Tag[]> }
    },
    components: {
        TagLabel,
        AccentButton,
        TextInput,
        TextAreaInput,
        DatePicker
    },
    async setup(props) {
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

        const { addTag } = await useTag()
        const newTag = async (value: string) => {
            console.log('addtag', value)
            const newTag = await addTag(value)
            taskInput.tags.push(newTag)
            tagfilterInput.value = ''
        }

        const datepicker = ref('')

        return {
            tagfilterInput,
            taskInput,
            newTask,
            datepicker,
            newTag
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

.selectTag {
    display: flex;
    flex-wrap: wrap;
}

.selectable-tags {
    margin: 4px 2px;
}

.tagged {
    display: flex;
    flex-wrap: wrap;
}

.tagged-tags {
    margin: 4px 2px;
}
</style>
