//import axios from '@/util/axios'

import axios from '@/util/axios'
import { ref, Ref } from 'vue'

export type Tag = {
    id: string
    name: string
    user: string
}

let tags: Ref<Tag[]>

export async function useTag() {
    const headers = { 'x-user': 'yskst96' }

    // タグ一覧
    if (!tags) {
        const resp = await axios.get('/tags', { headers })
        const tags_: Tag[] = resp.data || []

        tags = ref(tags_)
    }

    console.log('tags:', tags.value)

    //新規タグ登録
    const addTag = async (name: string) => {
        const tag: Tag = {
            id: 'ffffffffffffffffffffffff',
            name,
            user: 'yskst96'
        }
        const res = await axios.post('/tags', tag, { headers })
        tag.id = res.data
        tags.value.push(tag)
        console.log('add tag:', tag)
        return tag
    }

    const tagfilter: (text: string) => Tag[] = text => {
        if (!tags) return []
        return tags.value.filter(t => t.name.indexOf(text) != -1)
    }

    return {
        tags,
        addTag,
        tagfilter
    }
}
