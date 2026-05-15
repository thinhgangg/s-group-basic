const header = document.querySelector(".header-section");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("header-section-scrolled");
  } else {
    header.classList.remove("header-section-scrolled");
  }
});
