document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let slideInterval;

    // 初始化轮播
    function initSlider() {
        slides[0].classList.add('active');
        indicators[0].classList.add('active');
        startAutoSlide();
    }

    // 切换幻灯片
    function goToSlide(index) {
        // 移除当前活动状态
        slides[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        
        // 更新索引
        currentIndex = (index + slides.length) % slides.length;
        
        // 添加新活动状态
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    // 自动轮播
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 3000);
    }

    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            startAutoSlide();
        });
    });

    // 初始化
    initSlider();
});

// 数字动画函数
// 数字动画函数（优化版）
function animateNumbers() {
    const numbers = document.querySelectorAll('.number');
    
    numbers.forEach(number => {
        number.classList.add('animating'); // 添加动画状态类
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
                number.classList.remove('animating'); // 动画结束移除类
            }
            number.textContent = Math.floor(current);
        }, 20);
    });
}

// 滚动触发检测函数
function setupScrollTrigger() {
    const statsSection = document.querySelector('.stats');
    let triggered = false;

    function checkScroll() {
        if (triggered) return;
        
        const rect = statsSection.getBoundingClientRect();
        // 当stats区域进入视口时触发（距离顶部小于窗口高度80%）
        if (rect.top < window.innerHeight * 0.8) {
            triggered = true;
            animateNumbers();
            window.removeEventListener('scroll', checkScroll); // 移除监听避免重复触发
        }
    }

    // 添加滚动监听和初始检查
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 立即检查一次（如果页面加载时已经在视图中）
}

// 替换原来的DOMContentLoaded监听
window.addEventListener('DOMContentLoaded', setupScrollTrigger);
