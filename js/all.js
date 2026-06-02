//  導航選單切換
$('.nav-toggle').on('click', function () {
    $('.nav-menu').toggleClass('d-none');
});
// 滾動動畫
AOS.init();

// 點擊 .collapse 元素時，觸發內部 summary 的點擊事件
$('.collapse').on('click', function (e) {
    // 關鍵防護：如果使用者是直接點到 details 或 summary 本身，就不要重複觸發點擊
    if ($(e.target).closest('summary').length) {
        return;
    }
    
    // 點擊 li 時，去觸發內部 summary 的點擊事件
    $(this).find('summary').trigger('click');
});

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