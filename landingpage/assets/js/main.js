$(document).ready(function () {
  $(".banner-slider").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".ecosystem-slider").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: `
      <button class="slick-arrow custom-prev">
        <i class="fa-solid fa-angle-left"></i>
      </button>
    `,
    nextArrow: `
      <button class="slick-arrow custom-next">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    `,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".projects-slider").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: `
      <button class="slick-arrow custom-prev">
        <i class="fa-solid fa-angle-left"></i>
      </button>
    `,
    nextArrow: `
      <button class="slick-arrow custom-next">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    `,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  // Intersection Observer for Animations
  const animatedElements = document.querySelectorAll(
    ".fade-up, .fade-right, .fade-left",
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  animatedElements.forEach((el) => observer.observe(el));

  // Scroll to Top Button
  const bannerHeight = $(".banner-slider").outerHeight();
  const $scrollTopBtn = $("#scrollTopBtn");

  $(window).scroll(function () {
    if ($(this).scrollTop() > bannerHeight) {
      $scrollTopBtn.addClass("show");
    } else {
      $scrollTopBtn.removeClass("show");
    }
  });

  $scrollTopBtn.click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  // Search Functionality
  const $searchGroup = $("#searchInputGroup");
  const $searchBtn = $("#searchBtn");
  const $searchInput = $("#searchInput");
  const $searchResult = $("#searchResult");
  const $menuList = $(".menu-list");

  // Xử lý khi bấm vào icon kính lúp
  $searchBtn.on("click", function (e) {
    e.stopPropagation();

    if (!$searchGroup.hasClass("active")) {
      // Mở thanh search
      $searchGroup.addClass("active");
      $menuList.addClass("hide-menu");
      setTimeout(() => {
        $searchInput.focus();
        $searchResult.addClass("show");
      }, 200);
    } else {
      if ($searchInput.val().trim() === "") {
        closeSearch();
      }
    }
  });

  function closeSearch() {
    $searchGroup.removeClass("active");
    $searchResult.removeClass("show");
    $menuList.removeClass("hide-menu");
    $searchInput.val("");
  }

  // Đóng khi click ra ngoài
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".search-box, #searchResult").length) {
      closeSearch();
    }
  });
});
