function updateTime() {
    const currentTime = document.getElementById('current-time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    currentTime.textContent = `${hours}:${minutes}`;
  }

function adjustImageLayout() {
  const container = document.querySelector('.article-imgs');
  const images = container.querySelectorAll('img');
  const imageCount = images.length;

  // 移除旧的类名
  container.classList.remove('one', 'two', 'three', 'four');

  // 根据图片数量添加对应的类名
  if (imageCount === 1) {
      container.classList.add('one');
  } else if (imageCount === 2) {
      container.classList.add('two');
  } else if (imageCount === 3) {
      container.classList.add('three');
  } else if (imageCount === 4) {
      container.classList.add('four');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // 调整布局
  adjustImageLayout();
  setInterval(updateTime, 60000); // Update every minute
  updateTime(); // Initialize immediately
})

let isLarge = false

// 打开全屏显示
function openFullscreen(imgElement) {
  var fullscreenContainer = document.getElementById("fullscreen-container");
  var fullscreenImg = document.getElementById("fullscreen-img");
  
  // 设置放大图片的 src
  fullscreenImg.src = imgElement.src;
  
  // 显示放大图片的容器
  fullscreenContainer.style.display = "flex";
}

// 关闭全屏显示
function closeFullscreen(event) {
  // 只有点击遮罩时才会关闭
  if (event.target === event.currentTarget) {
    var fullscreenContainer = document.getElementById("fullscreen-container");
    fullscreenContainer.style.display = "none";
  }else{
    console.log(222)
    var fullscreenImg = document.getElementById("fullscreen-img");
    fullscreenImg.style.transition = "all 0.5s";
    if(isLarge){
      fullscreenImg.style.transform = "scale(1)";
      isLarge = false;
    }else{
      fullscreenImg.style.transform = "scale(1.2)"; // 放大 1.2 倍
      isLarge = true;
    }
  }
}

