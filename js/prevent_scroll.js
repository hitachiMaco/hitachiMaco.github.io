let scrollDistance = 0;       // 当前已滚动的距离
let maxScrollDistance = 1000;  // 用户滚动距离达到一定值之前，限制滚动
let scrollOffset = 1000;       // 用户滚动超过 maxScrollDistance 后，滚动一定的高度


// 在页面加载后禁用滚动
document.addEventListener('DOMContentLoaded', function() {
  // 禁用滚动
  if (scrollDistance < maxScrollDistance) {
  document.body.style.position = 'fixed';
  }

  // 监听滚动事件
window.addEventListener('scroll', function() {
    console.log(1)
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;
  
    // 如果滚动距离小于 maxScrollDistance，强制回到顶部
    if (scrollDistance < maxScrollDistance) {
      window.scrollTo(0, 0); // 强制回到顶部
    } 
    // 当滚动超过 maxScrollDistance 后，直接滚动到指定的高度
    else if (scrollDistance >= maxScrollDistance && scrollDistance < maxScrollDistance + scrollOffset) {
      window.scrollTo(0, scrollOffset); // 滚动至指定高度
    }
  
    // 更新滚动距离
    scrollDistance = currentScrollY;
  });
});

