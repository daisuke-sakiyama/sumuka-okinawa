/* ========================================
   トップページ用JavaScript
   ======================================== */

// スライダー変数
let slidePosition = 0;
const slideWidth = 300;
const totalSlides = 6;

// スライダーボタン更新
function updateSliderButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slidesVisible = Math.floor(window.innerWidth / slideWidth);
  const maxPosition = -((totalSlides - slidesVisible) * slideWidth);
  
  if (prevBtn) prevBtn.disabled = slidePosition >= 0;
  if (nextBtn) nextBtn.disabled = slidePosition <= maxPosition;
}

// 左スライド
function slideLeft() {
  slidePosition = Math.min(slidePosition + slideWidth, 0);
  const track = document.getElementById('sliderTrack');
  if (track) {
    track.style.transform = `translateX(${slidePosition}px)`;
  }
  updateSliderButtons();
}

// 右スライド
function slideRight() {
  const slidesVisible = Math.floor(window.innerWidth / slideWidth);
  const maxPosition = -((totalSlides - slidesVisible) * slideWidth);
  slidePosition = Math.max(slidePosition - slideWidth, maxPosition);
  const track = document.getElementById('sliderTrack');
  if (track) {
    track.style.transform = `translateX(${slidePosition}px)`;
  }
  updateSliderButtons();
}

// スクロールトップボタン
window.addEventListener('scroll', function() {
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    if (window.scrollY > 500) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
  updateSliderButtons();
});
