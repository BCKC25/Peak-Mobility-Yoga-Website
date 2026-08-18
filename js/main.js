// Hero photo slideshow — to add or remove a photo:
// 1. Drop the image file into assets/images/hero/
// 2. Add or remove its filename in this list (any order — it's shuffled below)
const HERO_PHOTOS = [
  "IMG_9654.JPG",
  "IMG_9655.JPG",
  "IMG_9657.JPG",
  "IMG_9658.JPG",
];

function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

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
  if (slideshow && HERO_PHOTOS.length > 0) {
    const photos = shuffle(HERO_PHOTOS);

    photos.forEach((filename, index) => {
      const slide = document.createElement("div");
      slide.className = "hero-slide" + (index === 0 ? " is-active" : "");
      const img = document.createElement("img");
      img.src = `assets/images/hero/${filename}`;
      img.alt = `Studio photo ${index + 1}`;
      img.loading = index === 0 ? "eager" : "lazy";
      slide.appendChild(img);
      slideshow.appendChild(slide);
    });

    if (photos.length > 1) {
      const dotsWrap = document.createElement("div");
      dotsWrap.className = "hero-slide-dots";
      photos.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-slide-dot" + (index === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", `Show photo ${index + 1}`);
        dotsWrap.appendChild(dot);
      });
      slideshow.appendChild(dotsWrap);
    }

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

    startAutoplay();
  }
});
