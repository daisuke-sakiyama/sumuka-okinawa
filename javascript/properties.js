/* ========================================
   SUMUKA 物件一覧ページ用JavaScript
   properties.html
   ======================================== */

// フィルター機能
function filterProperties() {
  const areaFilter = document.getElementById('filterArea').value;
  const layoutFilter = document.getElementById('filterLayout').value;
  const capacityFilter = document.getElementById('filterCapacity').value;
  
  const cards = document.querySelectorAll('.property-card');
  let visibleCount = 0;
  
  cards.forEach(card => {
    const area = card.dataset.area;
    const layouts = card.dataset.layout.split(',');
    const capacity = parseInt(card.dataset.capacity);
    
    let showByArea = (areaFilter === 'all' || area === areaFilter);
    let showByLayout = (layoutFilter === 'all' || layouts.includes(layoutFilter));
    let showByCapacity = true;
    
    if (capacityFilter !== 'all') {
      if (capacityFilter === '1-2') {
        showByCapacity = capacity >= 1 && capacity <= 2;
      } else if (capacityFilter === '3-4') {
        showByCapacity = capacity >= 3 && capacity <= 4;
      } else if (capacityFilter === '5+') {
        showByCapacity = capacity >= 5;
      }
    }
    
    if (showByArea && showByLayout && showByCapacity) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });
  
  // 結果なしメッセージの表示/非表示
  const noResults = document.getElementById('noResults');
  if (visibleCount === 0) {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
  }
}

// フィルターリセット
function resetFilters() {
  document.getElementById('filterArea').value = 'all';
  document.getElementById('filterLayout').value = 'all';
  document.getElementById('filterCapacity').value = 'all';
  
  const cards = document.querySelectorAll('.property-card');
  cards.forEach(card => {
    card.classList.remove('hidden');
  });
  
  document.getElementById('noResults').style.display = 'none';
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
  // URLパラメータからフィルターを設定
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.has('area')) {
    document.getElementById('filterArea').value = urlParams.get('area');
  }
  if (urlParams.has('layout')) {
    document.getElementById('filterLayout').value = urlParams.get('layout');
  }
  if (urlParams.has('capacity')) {
    document.getElementById('filterCapacity').value = urlParams.get('capacity');
  }
  
  // パラメータがあればフィルターを適用
  if (urlParams.has('area') || urlParams.has('layout') || urlParams.has('capacity')) {
    filterProperties();
  }
});
