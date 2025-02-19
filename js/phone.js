function updateTime() {
    const currentTime = document.getElementById('current-time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    currentTime.textContent = `${hours}:${minutes}`;
  }
  
  setInterval(updateTime, 60000); // Update every minute
  updateTime(); // Initialize immediately
  