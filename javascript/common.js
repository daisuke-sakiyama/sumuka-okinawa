/* ========================================
   SUMUKA 共通JavaScript
   全ページで使用
   ======================================== */

// ハンバーガーメニュー開閉
function toggleNav() {
  const navArea = document.getElementById('navArea');
  const toggleBtn = navArea.querySelector('.toggle_btn');
  navArea.classList.toggle('open');

  // aria-expanded属性を更新（アクセシビリティ）
  const isOpen = navArea.classList.contains('open');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  }

  // bodyにクラスを追加（固定CTAの表示制御用）
  document.body.classList.toggle('nav-open', isOpen);
}

function closeNav() {
  const navArea = document.getElementById('navArea');
  const toggleBtn = navArea.querySelector('.toggle_btn');
  navArea.classList.remove('open');

  // aria-expanded属性を更新（アクセシビリティ）
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'メニューを開く');
  }

  // bodyからクラスを削除
  document.body.classList.remove('nav-open');
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

// スマホ：スクロール時ヘッダー透明化
(function() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = 0;
  const scrollThreshold = 50; // スクロール量のしきい値

  function handleScroll() {
    // スマホのみ（767px以下）
    if (window.innerWidth > 767) {
      header.classList.remove('scrolled');
      return;
    }

    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
})();
