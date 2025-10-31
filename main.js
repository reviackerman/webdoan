    
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
});
document.addEventListener("DOMContentLoaded", function () {
  // === Banner trượt ngang ===
  const bannerContainer = document.querySelector('.flip-container');
  const bannerNextBtn = document.querySelector('.next');
  const bannerPrevBtn = document.querySelector('.prev');
  let bannerIndex = 0;
  const bannerTotal = bannerContainer.children.length;
  let bannerSlideCount = 0;
  const maxBannerSlides = 2;


  function updateBannerSlide() {
    bannerContainer.style.transform = `translateX(-${bannerIndex * 100}vw)`;
  }

  bannerNextBtn.addEventListener('click', () => {
    bannerIndex = (bannerIndex + 1) % bannerTotal;
    updateBannerSlide();
  });

  bannerPrevBtn.addEventListener('click', () => {
    bannerIndex = (bannerIndex - 1 + bannerTotal) % bannerTotal;
    updateBannerSlide();
  });

  setInterval(() => {
    bannerIndex = (bannerIndex + 1) % bannerTotal;
    updateBannerSlide();
  }, 5000);

  // === Carousel sản phẩm ===
  const track = document.querySelector('.carousel-track');
  const carouselPrevBtn = document.querySelector('.carousel-prev');
  const carouselNextBtn = document.querySelector('.carousel-next');
  const items = document.querySelectorAll('.product-item');

  let carouselIndex = 0;
  const visibleCount = 3;

  function updateCarousel() {
    const itemWidth = items[0].offsetWidth + 20;
    track.style.transform = `translateX(-${carouselIndex * itemWidth}px)`;
  }

  carouselNextBtn.addEventListener('click', () => {
    if (carouselIndex < items.length - visibleCount) {
      carouselIndex++;
    } else {
      carouselIndex = 0;
    }
    updateCarousel();
  });

  carouselPrevBtn.addEventListener('click', () => {
    if (carouselIndex > 0) {
      carouselIndex--;
    } else {
      carouselIndex = items.length - visibleCount;
    }
    updateCarousel();
  });

  updateCarousel();

  // === Hiệu ứng chạy lên khi cuộn tới ===
  const productItems = document.querySelectorAll('.product-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  productItems.forEach(item => observer.observe(item));
});