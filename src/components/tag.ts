//import axios from '@/util/axios'

import axios from '@/util/axios'
import { ref } from 'vue'

export type Tag = {
    id: string
    name: string
    user: string
}

export async function useTag() {
    const headers = { 'x-user': 'yskst96' }

    // タグ一覧
    const resp = await axios.get('/tags', { headers })
    const tags_: Tag[] = resp.data
    console.log('get tags result:', tags_)
    const tags = ref(tags_)

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
    }

    const tagfilter: (text: string) => Tag[] = text => {
        return tags.value.filter(t => t.name.indexOf(text) != -1)
    }

    return {
        tags,
        addTag,
        tagfilter
    }
}
