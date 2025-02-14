let flipped = false;  // 用于记录图片是否已经翻转过
let isProcessing = false;  // 用于防止重复点击和 hover

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.image-item').forEach(item => {
    // 给每个图片设置随机倾斜并保存在自定义属性中
    const randomRotation = Math.random() * 10 - 5; // 随机倾斜角度，范围是 -5 到 5 度
    item.dataset.initialRotation = randomRotation; // 将初始倾斜角度存储到自定义属性中
  
    // 初始状态倾斜
    item.style.transform = `rotate(${randomRotation}deg)`;
  })
  document.querySelectorAll('.image-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      if(flipped){
        setTimeout(() => {}, 1000);
        return 
      }
      // 鼠标 hover 时，放大并恢复当前图片垂直
      item.style.transform = `scale(1.1) rotate(0deg)`; // 只改变当前图片的缩放，旋转恢复为0
  
      // 让其它兄弟元素挤开
      const siblings = [...item.parentNode.children];
      const index = siblings.indexOf(item);
  
      siblings.forEach((sibling, i) => {
        if (i < index) {
          sibling.style.transform = `translateX(-5%) rotate(${sibling.dataset.initialRotation}deg)`;  // 左侧图片向左挤
        } else if (i > index) {
          sibling.style.transform = `translateX(5%) rotate(${sibling.dataset.initialRotation}deg)`;   // 右侧图片向右挤
        }
      });
    });
  
    item.addEventListener('mouseleave', () => {
      document.querySelectorAll('.image-item').forEach(img => {
        if(flipped){
          setTimeout(() => {}, 1000); 
          return
        }
        img.style.transform = `rotate(${img.dataset.initialRotation}deg) translateX(0)`;  // 恢复旋转并重置位置
      });
    });
  });
})

document.addEventListener('DOMContentLoaded', () => {
  // 遍历每个 image-item
  document.querySelectorAll('.image-item').forEach(item => {
    const imageCover = item.querySelector('.image-cover');
    const imageBack = item.querySelector('.image-back');

    // 为每个 image-cover 添加点击事件
    imageCover.addEventListener('click', () => {
      if (isProcessing) return;  // 如果正在处理，直接返回

      isProcessing = true;  // 开始处理，禁用后续点击和 hover
      // 禁用点击和 hover 事件
      item.classList.add('disabled');
      
      // 禁用其他所有的 image-item 除了当前点击的
      document.querySelectorAll('.image-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.style.transition = 'all 1s'; // 设置平滑过渡
          otherItem.style.pointerEvents = 'none'; // 禁止所有鼠标事件
          otherItem.style.opacity = '0'; // 设置透明度为0
        }
      });
      if(!flipped){
        // 禁用页面滚动，并固定页面位置
        const scrollY =  document.documentElement.scrollTop || document.body.scrollTop;
        const currentLeft = item.getBoundingClientRect().left; // 获取元素当前离屏幕左侧的距离
        const targetTop = (window.innerHeight - item.offsetHeight) / 2 + scrollY;
        const targetLeft = 200; // 目标位置是离屏幕左侧 200px

        const event = new CustomEvent("hideElements");
  
        // 触发事件，通知其他元素
        document.body.dispatchEvent(event);

        // 计算需要移动的距离
        const moveX = targetLeft - currentLeft;
        // 计算需要垂直移动的距离
        const moveY = targetTop - item.getBoundingClientRect().top - scrollY; // 减去当前的滚动位置

        console.log(scrollY,moveX,moveY)

        document.body.style.top = `-${scrollY}px`;  // 保持当前滚动位置
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';  // 防止横向滚动

      // 第一阶段：平移一半，缩放一半，旋转 180°
      item.style.transition = 'transform 0.8s linear';  // 使用线性过渡
      item.style.transform = `translateX(${moveX / 2}px) translateY(${moveY / 2}px) rotateY(180deg) scaleX(1.5) scaleY(1.5)`;

      setTimeout(() => {
        // 第二阶段：完成剩余平移，缩放，旋转
        item.style.transition = 'transform 0.8s linear';  // 保持线性过渡，确保两个动画连贯
        item.style.transform = `translateX(${moveX}px) translateY(${moveY}px) rotateY(360deg) scaleX(2) scaleY(2)`;

        setTimeout(() => {
          item.classList.remove('disabled');  // 重新启用点击和 hover
          isProcessing = false;  // 允许再次点击
        }, 2000);  // 第二阶段动画时间
      }, 797);  // 第一阶段动画完成后的延时（确保时间一致，动画无空隙）
        flipped = true; // 更新状态为已变换
      }
    });
  });
});
