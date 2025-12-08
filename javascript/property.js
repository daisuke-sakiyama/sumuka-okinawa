/* ========================================
   物件ページ用JavaScript
   asato, shintoshin1, shintoshin2, omoromachi, urasoe, nago_garden で使用
   ======================================== */

// モーダルギャラリー
function openModal() {
  document.getElementById('photoModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('photoModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ライトボックス
let currentImageIndex = 0;
let allImages = [];

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  
  if (allImages[index]) {
    lightboxImg.src = allImages[index];
    counter.textContent = (index + 1) + ' / ' + allImages.length;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function prevImage() {
  if (currentImageIndex > 0) {
    openLightbox(currentImageIndex - 1);
  }
}

function nextImage() {
  if (currentImageIndex < allImages.length - 1) {
    openLightbox(currentImageIndex + 1);
  }
}

// キーボード操作（モーダル・ライトボックス）
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
    closeLightbox();
  }
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});

// 写真ツアーナビゲーション
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.photo-tour-nav .nav-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.photo-tour-nav .nav-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      const target = this.getAttribute('data-target');
      if (target) {
        document.getElementById(target).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
