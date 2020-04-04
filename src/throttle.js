export function throttle(fn, delay = 0) {
    // console.log('fn',fn)
    let lastCallTime;
    let timer = null;
    let currentTime;
    let context;
    let args = [];
    const callFn = function () {
        fn.call(context, ...args);
        lastCallTime = +new Date();
        console.log('lastCallTime',lastCallTime)
    };
    return function () {
        context = this;
        args = [...arguments];
        currentTime = +new Date(); 
        console.log('currentTime',currentTime)
        // 当前点击时间
        // 第一次没有lastCallTime，所以返回的值是NaN，所以下面判断依旧是false
        // 最后一次执行之后，再过delay的时间，用户没有操作，会恢复状态，因为此时canRun的值会比较大
        const canRun = currentTime - lastCallTime - delay;
        console.log('canRun',canRun)
        clearTimeout(timer);
        if (canRun < 0) {
            // 说明还没有到执行时间点
            timer = setTimeout(() => {
            callFn(); // 防止在中间段，然后用户不点了，防止数据丢失
            }, -canRun);
        } else {
            // 已经到了执行时间点，可以执行
            callFn();
        }
    };
}
// export function throttle(func, wait) {
//     var context, args;
//     var previous = 0;

//     return function() {
//         var now = +new Date();
//         context = this;
//         args = arguments;
//         if (now - previous > wait) {
//             func.apply(context, args);
//             previous = now;
//         }
//     }
// }
export function debounce(func, wait) {
    let timeout = null
    return function() {
        if(timeout !== null) clearTimeout(timeout)     
        timeout = setTimeout(func, wait);
  }
}