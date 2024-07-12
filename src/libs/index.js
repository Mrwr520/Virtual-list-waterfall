// 批量导入所有通用组件
import waterfall from './waterfall/index.vue'

export default {
        install(app){
            app.component('m-waterfall',waterfall)
        }
}