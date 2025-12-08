/* ========================================
   SUMUKA 共通JavaScript
   全ページで使用
   ======================================== */

// ハンバーガーメニュー開閉
function toggleNav() {
  const navArea = document.getElementById('navArea');
  navArea.classList.toggle('open');
}

function closeNav() {
  document.getElementById('navArea').classList.remove('open');
}

// Room Typeドロップダウン開閉
function toggleRoomType() {
  const section = document.querySelector('.room-type-section');
  if (section) {
    section.classList.toggle('open');
  }
}

// ESCキーでメニューを閉じる
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeNav();
  }
});

// スムーズスクロール（アンカーリンク）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});
