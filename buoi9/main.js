const header = document.querySelector(".header-section");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 50) {
    header.classList.add("header-section-scrolled");
  } else {
    header.classList.remove("header-section-scrolled");
  }

  if (currentScrollY > 200) {
    if (currentScrollY > lastScrollY) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }
  } else {
    header.classList.remove("hidden");
  }

  lastScrollY = currentScrollY;
});
