let startX, startY, endX, endY;

// Detect the start of a touch event
document.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

// Detect the end of a touch event and determine swipe direction
document.addEventListener("touchend", (event) => {
  endX = event.changedTouches[0].clientX;
  endY = event.changedTouches[0].clientY;
  handleSwipe();
});

// Handle swipe direction
function handleSwipe() {
  const diffX = endX - startX;
  const diffY = endY - startY;

  // Check if the swipe is horizontal
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 50) {
      // Swipe right - navigate to the previous page
      navigatePage("previous");
    } else if (diffX < -50) {
      // Swipe left - navigate to the next page
      navigatePage("next");
    }
  }
}

// Navigation function based on swipe direction
function navigatePage(direction) {
  const links = Array.from(document.querySelectorAll(".menu-items a"));
  const activeLink = document.querySelector(".menu-items a.active");
  const currentIndex = links.indexOf(activeLink);

  let targetIndex;
  if (direction === "next") {
    targetIndex = (currentIndex + 1) % links.length;
  } else if (direction === "previous") {
    targetIndex = (currentIndex - 1 + links.length) % links.length;
  }

  // Navigate to the target link if it exists
  if (targetIndex !== undefined && links[targetIndex]) {
    window.location.href = links[targetIndex].href;
  }
}
