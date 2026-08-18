document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const slideshow = document.getElementById("hero-slideshow");
  if (slideshow) {
    const slides = slideshow.querySelectorAll(".hero-slide");
    const dots = slideshow.querySelectorAll(".hero-slide-dot");
    let current = 0;
    let timer = null;

    const showSlide = (index) => {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const startAutoplay = () => {
      if (prefersReducedMotion || slides.length < 2) return;
      timer = setInterval(() => showSlide(current + 1), 5000);
    };
    const stopAutoplay = () => clearInterval(timer);

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        stopAutoplay();
        startAutoplay();
      });
    });

    slideshow.addEventListener("mouseenter", stopAutoplay);
    slideshow.addEventListener("mouseleave", startAutoplay);

    startAutoplay();
  }
});
