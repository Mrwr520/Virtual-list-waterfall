// 图片懒加载  用户没看到图片不加载  看到图片才加载
import {useIntersectionObserver} from '@vueuse/core'
export default {
    mounted(el){
            // 获取图片标签
            const src= el.src
            el.src = 'https://res.lgdsunday.club/img-load.png'
            const {stop} =  useIntersectionObserver(el,([{isIntersecting}])=>{
                if(isIntersecting){
                    el.src = src
                    stop()
                }
            })
        }

}