// 防抖节流封装函数：


// fn 是需要防抖的函数，delay 是延迟的时间 ：  防抖是指在一定时间内，多次触发同一个事件，只执行最后一次的回调函数。
/**
 * 
 * @param {*} fn 传入需要防抖的函数 
 * @param {*} delay  设置在多少时间后会执行
 * @returns 
 */
export const debounce = function (fn, delay) {
    // 用闭包保存一个定时器的引用
    let timer = null;
    // 返回一个新的函数
    return function() {
      // 清除上一次的定时器
      clearTimeout(timer);
      // 重新设置一个新的定时器
      timer = setTimeout(function() {
        // 执行防抖的函数
        fn();
      }, delay);
    };
  }


  // 定义一个节流函数，接受一个函数 func 和一个延迟时间 wait 作为参数 ： 节流是指在一定时间内，多次触发同一个事件，只执行第一次的回调函数。
export const throttle =function (func, wait) {
  // 定义一个变量，用来记录上一次函数执行的时间
  let previous = 0;
  // 返回一个新的函数，这个函数会在合适的时间执行 func
  return function() {
    // 获取当前时间
    let now = Date.now();
    // 获取函数执行的上下文和参数
    let context = this;
    // arguments是一个类数组对象
    let args = arguments;
    // 如果当前时间减去上一次执行时间大于等于延迟时间，就执行函数
    if (now - previous >= wait) {
      // 执行函数
      func.apply(context, args);
      // 更新上一次执行时间为当前时间
      previous = now;
    }
  }
}
