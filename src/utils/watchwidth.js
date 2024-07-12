import { useElementSize } from '@vueuse/core'

import { ref, onMounted, onUnmounted ,watch,computed} from 'vue';
const { width } = useElementSize(document.querySelector('html'))
/**
 * 判断宽度变化
 * @returns true表示是移动端设备  false不是
 */


export const currentWidth = computed(()=>{
    return width.value
}
)