// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
// let scrollDistance = 0;       // 当前已滚动的距离
// let maxScrollDistance = 1000;  // 用户滚动距离达到一定值之前，限制滚动
// let scrollOffset = 1000;       // 用户滚动超过 maxScrollDistance 后，滚动一定的高度
// let canScroll = false;         // 用于控制是否允许滚动

// function disableScroll(){
//     console.log(121121)
//     window.scrollTo(0,0)
// }

document.addEventListener('DOMContentLoaded', function() {
    disableScroll()
    document.addEventListener('wheel', function (e) {
        if (e.deltaY > 0) {
          // 向下滚动
          if (window.scrollY <= window.innerHeight) {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
            setTimeout(function() {
                enableScroll()
            }, 10); 
        }
        } else {
          // 向上滚动
          if (window.scrollY <= window.innerHeight) {
            disableScroll()
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        }
    })
});
document.addEventListener('DOMContentLoaded', function() {
    // 获取背景条元素
    const backgroundBarTop = document.querySelector('.background-bar-top');
    const backgroundBarBottom = document.querySelector('.background-bar-bottom');
    // 给背景条添加点击事件监听
    backgroundBarTop.addEventListener('click', function() {
        //平滑滚动到 top=100vh 位置
        window.scrollTo({
            top: window.innerHeight, // 100vh 的位置
            behavior: 'smooth' // 平滑滚动
        });
        setTimeout(function() {
            enableScroll()
        }, 10); 
    })
    backgroundBarBottom.addEventListener('click', function() {
        //平滑滚动到 top=100vh 位置
        window.scrollTo({
            top: 0, 
            behavior: 'smooth' // 平滑滚动
        });
        setTimeout(function() {
            enableScroll()
        }, 10); 
    })
});

    document.addEventListener('wheel', function (e) {

        // if (e.deltaY > 0) {
        //   // 向下滚动
        //   if (window.scrollY <= window.innerHeight) {
        //     document.body.style.position = 'auto'; 
        //     window.scrollTo({
        //       top: window.innerHeight,
        //       behavior: 'smooth'
        //     });
        //   }
        // } else {
        //   // 向上滚动
        //   if (window.scrollY === window.innerHeight) {
        //     window.scrollTo({
        //       top: 0,
        //       behavior: 'smooth'
        //     });
        //   }
        // }
      });
//   });

// // 在页面加载后禁用滚动，直到满足条件
// document.addEventListener('DOMContentLoaded', function() {
//   const windowHeight = window.innerHeight;

//   maxScrollDistance = windowHeight;  // 设置最大滚动距离为窗口高度
//   scrollOffset = windowHeight;      // 设置目标滚动高度为窗口高度
//   console.log(maxScrollDistance,scrollOffset)


//   // 禁用滚动
//   document.body.style.position = 'fixed';  // 禁止页面滚动
//   document.body.style.top = '0';            // 确保页面顶部对齐

//   // 监听滚轮事件，设置 passive: false 来允许 preventDefault
//   window.addEventListener('wheel', function(event) {
//     // 如果滚动距离小于 maxScrollDistance，累加 scrollDistance
//     if (!canScroll && scrollDistance < maxScrollDistance) {
//       scrollDistance += event.deltaY;  // 累加滚动的距离
//       console.log(scrollDistance,event.deltaY)
//     }
//   }, { passive: false });  // 设置 passive: false，允许 preventDefault


//   window.addEventListener('wheel', function(event) {
//     // 如果达到 maxScrollDistance，则滚动到指定的高度
//     if (scrollDistance >= maxScrollDistance) {
//       document.body.style.position = 'relative';  // 禁止页面滚动
    
//       scrollTo(0, scrollOffset);

//       setTimeout(function() {
//         canScroll = true;  // 达到阈值后，允许自由滚动
//         scrollDistance = 0;  // 重置滚动距离
//       }, 1000); 
//     }
//     }, { passive: false });  // 设置 passive: false，允许 preventDefault

// window.addEventListener('wheel', function(event) {
// // 如果页面顶部距离小于 maxScrollDistance，强制回到顶部
// const currentScrollY = window.scrollY || document.documentElement.scrollTop;
// if (canScroll && currentScrollY < maxScrollDistance) {
//   console.log("999")
//   window.scrollTo(0, 0);  // 强制回到顶部
//   scrollDistance = 0;  // 重置滚动距离
//   canScroll = false
//   setTimeout(function() {
//     document.body.style.position = 'fixed';  // 禁止页面滚动
//     document.body.style.top = '0';            // 确保页面顶部对齐
//   }, 1000); 
// }
// }, { passive: false });  // 设置 passive: false，允许 preventDefault
// // // 监听滚动事件，判断页面位置
// // window.addEventListener('scroll', function() {
// //   const currentScrollY = window.scrollY || document.documentElement.scrollTop;

// //   // 如果页面顶部距离小于 maxScrollDistance，强制回到顶部
// //   if (canScroll && currentScrollY < maxScrollDistance) {
// //     window.scrollTo(0, 0);  // 强制回到顶部
// //     scrollDistance = 0;  // 重置滚动距离
// //     canScroll = false
// //   }
// });
