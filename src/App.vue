<template>
    <div>
        <header>
            TODO APP
        </header>
        <Suspense>
            <template #default>
                <router-view></router-view>
            </template>
            <template #fallback>
                loading...
            </template>
        </Suspense>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
