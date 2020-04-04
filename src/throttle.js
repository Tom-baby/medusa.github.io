export function throttle(fn, delay, debounce) {
    let current_time;
      let last_run_time;
      let timer;
      let context;
      let args;
      let call_fn = function() {
        fn.call(context, [...args]);
        last_run_time = +new Date();
      }
      return function() {
        context = this;
        args = [...arguments];
        let current_time = +new Date;
        let canRun = current_time - last_run_time - delay;
        console.log(current_time, last_run_time, delay, canRun)
        clearTimeout(timer)
        if(debounce) {
          timer = setTimeout(() => {
            call_fn();
          }, delay);
        } else {
          if(call_fn < 0) {
            call_fn();
          } else {
            timer = setTimeout(() => {
              call_fn();
            }, -canRun);
          }
        }
    }
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