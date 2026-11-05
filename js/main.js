// Hero photo slideshow — to add or remove a photo:
// 1. Drop the image file into assets/images/hero/
// 2. Add or remove its filename in this list (any order — it's shuffled below)
const HERO_PHOTOS = [
  "studio-mats-day.jpg",
  "studio-mats-night.jpg",
  "group-class-plank.jpg",
  "coach-side-plank.jpg",
  "coach-backbend.jpg",
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
      img.width = 1280;
      img.height = 1600;
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

  const dropdownToggle = document.getElementById("classes-toggle");
  const dropdownItem = dropdownToggle ? dropdownToggle.closest(".nav-dropdown") : null;
  if (dropdownToggle && dropdownItem) {
    const closeDropdown = () => {
      dropdownItem.classList.remove("is-open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    };
    dropdownToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = dropdownItem.classList.toggle("is-open");
      dropdownToggle.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", (event) => {
      if (!dropdownItem.contains(event.target)) closeDropdown();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDropdown();
    });
  }

  const mapFacadeBtn = document.getElementById("map-facade-btn");
  if (mapFacadeBtn) {
    mapFacadeBtn.addEventListener("click", () => {
      const wrap = document.getElementById(mapFacadeBtn.dataset.target || "location-map-wrap");
      const src = mapFacadeBtn.dataset.mapSrc;
      if (wrap && src) {
        const iframe = document.createElement("iframe");
        iframe.title = "Map to Peak Mobility Yoga, 1510 Whiskey Rd, Aiken, SC";
        iframe.src = src;
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        wrap.innerHTML = "";
        wrap.appendChild(iframe);
      }
    });
  }

  const mindbodySlot = document.querySelector("[data-lazy-mindbody]");
  if (mindbodySlot && "IntersectionObserver" in window) {
    const src = mindbodySlot.dataset.lazyMindbody;
    const loadWidget = () => {
      mindbodySlot.innerHTML = '<div class="mindbody-widget" data-widget-type="Schedules" data-widget-id="b3605859fe2"></div>';
      const script = document.createElement("script");
      script.async = true;
      script.src = src;
      document.body.appendChild(script);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadWidget();
          observer.disconnect();
        }
      });
    });
    observer.observe(mindbodySlot);
  }

  const coachTabs = document.querySelectorAll(".coach-tab");
  const coachPanels = document.querySelectorAll("[data-coach-panel]");
  if (coachTabs.length && coachPanels.length) {
    coachTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-coach");
        coachTabs.forEach((t) => {
          const isActive = t === tab;
          t.classList.toggle("is-active", isActive);
          t.setAttribute("aria-selected", String(isActive));
        });
        coachPanels.forEach((panel) => {
          panel.hidden = panel.id !== `coach-${target}`;
        });
      });
    });
  }
});