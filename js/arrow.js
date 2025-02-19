// document.addEventListener('DOMContentLoaded', () => {
// // 获取当前主题
// const theme = document.documentElement.getAttribute('data-theme');

// // 设置箭头颜色
// const arrow1 = document.querySelector('.arrow1');
// const arrow2 = document.querySelector('.arrow2');

// // 根据当前主题设置箭头颜色
// function setArrowColors() {
//   if (theme === 'dark') {
//     // 深色主题，使用浅色箭头
//     arrow1.style.filter = 'brightness(1.5)';
//     arrow2.style.filter = 'brightness(1.5)';
//   } else {
//     // 浅色主题，使用深色箭头
//     arrow1.style.filter = 'brightness(0.8)';
//     arrow2.style.filter = 'brightness(0.8)';
//   }
// }

// // 每1秒切换一次箭头的高亮
// let currentArrow = 1; // 当前亮的箭头
// setInterval(() => {
//   // 清除当前高亮
//   if (currentArrow === 1) {
//     arrow1.classList.remove('highlight');
//     arrow2.classList.add('highlight');
//     currentArrow = 2;
//   } else {
//     arrow2.classList.remove('highlight');
//     arrow1.classList.add('highlight');
//     currentArrow = 1;
//   }
// }, 1000);

// // 初始化时设置颜色
// setArrowColors();

// })