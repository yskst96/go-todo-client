<template>
    <div
        class="label"
        :class="{ selectable: selectable, deletable: deletable }"
    >
        <span>{{ tag.name }}</span>
        <img
            v-if="deletable"
            class="delete-icon"
            src="@/assets/clear-w.svg"
            alt="delete"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Tag } from '@/hooks/tag'

type Props = {
    tag: Tag
}

export default defineComponent({
    props: {
        tag: { type: Object as PropType<Tag> },
        selectable: { type: Boolean as PropType<boolean>, default: false },
        deletable: { type: Boolean as PropType<boolean>, default: false }
    },
    setup(props) {
        //
    }
})
</script>
<style scoped>
.label {
    display: inline-block;
    padding: 2px 8px;
    text-align: center;
    border-radius: 6px;
    color: #fffffe;
    @apply bg-indigo-900;
}

.selectable {
    @apply bg-orange-400;
    @apply cursor-pointer;
}

.deletable {
    @apply bg-indigo-900;
    @apply cursor-pointer;
}

.delete-icon {
    vertical-align: middle;
    margin-left: 4px;
    display: inline;
}
</style>
