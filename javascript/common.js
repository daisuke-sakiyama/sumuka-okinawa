/* ========================================
   SUMUKA 共通JavaScript
   全ページで使用
   ======================================== */

// スクロール位置保存用
let scrollPosition = 0;

// ハンバーガーメニュー開閉
function toggleNav() {
  const navArea = document.getElementById('navArea');
  const toggleBtn = navArea.querySelector('.toggle_btn');
  const isCurrentlyOpen = navArea.classList.contains('open');

  if (!isCurrentlyOpen) {
    // メニューを開く前にスクロール位置を保存
    scrollPosition = window.scrollY;
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    // メニューを閉じる時にスクロール位置を復元
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
  }

  navArea.classList.toggle('open');

  // aria-expanded属性を更新（アクセシビリティ）
  const isOpen = navArea.classList.contains('open');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  }

  // html/bodyにクラスを追加（固定CTAの表示制御用・スクロール防止）
  document.documentElement.classList.toggle('nav-open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
}

function closeNav() {
  const navArea = document.getElementById('navArea');
  const toggleBtn = navArea.querySelector('.toggle_btn');

  // メニューを閉じる時にスクロール位置を復元
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPosition);

  navArea.classList.remove('open');

  // aria-expanded属性を更新（アクセシビリティ）
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'メニューを開く');
  }

  // html/bodyからクラスを削除
  document.documentElement.classList.remove('nav-open');
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

// スクロール時のヘッダー縮小・固定CTA表示制御
(function() {
  const header = document.querySelector('.header');
  const headerScrollThreshold = 50;
  const ctaScrollThreshold = 900;

  // トップページかどうかを判定
  function isTopPage() {
    const path = window.location.pathname;
    return path === '/' || path === '/index.html' || path.endsWith('/sumuka-okinawa/') || path.endsWith('/sumuka-okinawa/index.html');
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const isMobile = window.innerWidth <= 767;

    // ヘッダー縮小（スマホのみ: 767px以下）
    if (header) {
      if (isMobile && currentScrollY > headerScrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // 固定CTA表示制御（スマホのみ: 767px以下）
    const fixedCta = document.querySelector('.fixed-cta');
    if (fixedCta && isMobile) {
      // 下層ページでは常に表示、トップページではスクロール後に表示
      if (!isTopPage() || currentScrollY > ctaScrollThreshold) {
        fixedCta.classList.add('visible');
      } else {
        fixedCta.classList.remove('visible');
      }
    }
  }

  // PCでは固定CTAを常に表示
  function handleResize() {
    const fixedCta = document.querySelector('.fixed-cta');
    if (fixedCta && window.innerWidth > 767) {
      fixedCta.classList.add('visible');
    }
    // リサイズ時にスクロール状態も再評価
    handleScroll();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });

  // 初期化（ヘッダーのみ）
  handleScroll();
})();

// ページ読み込み後にハンバーガーボタンと固定CTAを初期化
window.addEventListener('load', function() {
  const navArea = document.getElementById('navArea');
  if (navArea) {
    navArea.classList.add('loaded');
  }

  // 固定CTAの初期表示設定
  const fixedCta = document.querySelector('.fixed-cta');
  if (fixedCta) {
    const isMobile = window.innerWidth <= 767;
    const path = window.location.pathname;
    const isTopPage = path === '/' || path === '/index.html' || path.endsWith('/sumuka-okinawa/') || path.endsWith('/sumuka-okinawa/index.html');

    // PCでは常に表示、スマホの下層ページでも常に表示
    if (!isMobile || !isTopPage) {
      fixedCta.classList.add('visible');
    }
  }
});
