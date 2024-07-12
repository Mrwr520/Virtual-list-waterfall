import lazy from "./modules/lazy"

/**
 * 指令全局注册
 * 
 * 
 */
export default {
    install(app){
        app.directive('img-lazy',lazy)
    }
}