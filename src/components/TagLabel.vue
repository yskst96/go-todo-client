<template>
    <div class="label">
        <span>{{ tag.name }}</span>
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
        tag: { type: Object as PropType<Tag> }
    },
    setup(props) {
        console.log(props.tag)
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
    background-color: #001858;
}
</style>
