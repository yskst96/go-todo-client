<template>
    <div>
        <div
            :id="tag.id"
            class="tag"
            v-for="(tag, index) in tags"
            :key="index"
            @click="onClick"
        >
            {{ tag.name }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, SetupContext } from 'vue'
import { Tag } from '@/components/tag'
import { HTMLElementEvent } from '@/components/event'

export default defineComponent({
    props: {
        tags: { type: Array as PropType<Tag[]> },
        clickable: { type: Boolean as PropType<boolean> }
    },
    setup(props, context: SetupContext) {
        const onClick = (event: HTMLElementEvent<HTMLDivElement>) => {
            if (!props.clickable) {
                return
            }

            if (event === null || event.target === null) return

            context.emit('click', event.target.id)
        }

        return { onClick }
    }
})
</script>

<style scoped>
.tag {
    border: solid 1px black;
    padding: 4px;
    width: 60px;
}
</style>
