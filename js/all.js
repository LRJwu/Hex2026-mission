//  導航選單切換
$('.nav-toggle').on('click', function () {
    $('.nav-menu').toggleClass('d-none');
    if($('i.modal-overlay.d-block').length === 0){
        $('body').append('<i class="modal-overlay d-block"></i>')
    }else{
        $('i.modal-overlay.d-block').remove();
    }
});

// 點擊 .collapse 元素時，觸發內部 summary 的點擊事件
$('.collapse').on('click', function (e) {
    $(this).toggleClass('bg-dark');
    // 關鍵防護：如果使用者是直接點到 details 或 summary 本身，就不要重複觸發點擊
    if ($(e.target).closest('summary').length) {
        return;
    }
    
    // 點擊 li 時，去觸發內部 summary 的點擊事件
    $(this).find('summary').trigger('click');
});

//Modal
//  1. 運用 querySelectorAll 抓取所有的聯絡按鈕 與 關閉按鈕
const contactButtons = document.querySelectorAll('.openModal');
const closeBtn = document.querySelectorAll('.closeModalBtn');

// 2. 抓取 Modal
const modal = document.getElementById('Modal');

// 3. 幫每一個聯絡按鈕都加上開啟 Modal 的監聽器
contactButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        modal.classList.remove('d-none'); // 刪除 d-none，視窗彈出
    });
});

// 4. 幫關閉按鈕加上隱藏 Modal 的監聽器
closeBtn.forEach(function(btn) {
    btn.addEventListener('click', function() {
        modal.classList.add('d-none'); // 加上 d-none，視窗彈出
    });
});

// 滑鼠左右滑動
$(document).ready(function () {
    const $slider = $('.scroll-x');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // 1. 滑鼠按下：開始偵測拖曳
    $slider.on('mousedown', function (e) {
        isDown = true;
        startX = e.pageX - $slider.offset().left;
        scrollLeft = $slider.scrollLeft();
        $slider.css('cursor', 'grabbing'); // 變成抓取手勢
    });
    
    // 2. 滑鼠放開或離開區域：取消拖曳
    $(window).on('mouseup', function () {
        if (isDown) {
            isDown = false;
            $slider.css('cursor', 'grab'); // 還原手勢
        }
    });
    
    // 3. 滑鼠移動：計算並同步滾動距離
    $slider.on('mousemove', function (e) {
        if (!isDown) return; // 沒按下就跳過
        e.preventDefault();
        const x = e.pageX - $slider.offset().left;
        const walk = (x - startX) * 2; // *2 代表加倍滑動速度，可自由調整
        $slider.scrollLeft(scrollLeft - walk);
    });
    
    // 4. 直接用滑鼠滾輪控制左右滑動
    $slider.on('wheel', function (e) {
        // 檢查是否有垂直滾動
        if (e.originalEvent.deltaY !== 0) {
            e.preventDefault();
            // 將垂直滾動量 (deltaY) 加給水平滾動 (scrollLeft)
            const currentScroll = $slider.scrollLeft();
            $slider.scrollLeft(currentScroll + e.originalEvent.deltaY);
        }
    });
});
// 首頁滑鼠視差
const container = document.querySelector('.layerBox');
const Layers = document.querySelectorAll('.illus');

container.addEventListener('mousemove', (e) => {
  // 取得容器的寬高與中心點
  const { width, height, left, top } = container.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  Layers.forEach((l) =>{
      // 計算滑鼠相對於容器中心點的 X 與 Y 偏移量
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
    
      // 設定各層的移動係數（數字越大移動幅度越大）
      const speed = l.getAttribute('layer-speed')|| 0.08; // 前景移動較快

      // 套用 CSS transform 產生移動效果 (反向移動以模擬景深)
      l.style.transform = `translate(-50%, -50%) translate(${-mouseX * speed}px, ${-mouseY * speed}px)`;
  });
});

// 當滑鼠離開容器時，平滑重置回原始位置
container.addEventListener('mouseleave', () => {
  Layer.style.transform = 'translate(-50%, -50%) translate(0, 0)';
  
  // 註：若有搭配 CSS 的 transition: transform 0.3s ease，效果會更平滑
});

// 滾動動畫
AOS.init();