const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const heroSlider = document.querySelector(".hero-slider");

if (heroSlider) {
  const desktopSlideImages = (heroSlider.dataset.slideImages || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const isMobileHero = window.matchMedia("(max-width: 768px)").matches;
  const mobileHeroImage = "assets/Top/Senzai_Diamond_beige.png";
  const slideImages = isMobileHero ? [mobileHeroImage] : desktopSlideImages;
  const slideLayers = heroSlider.querySelectorAll(".hero-slide-img");

  if (slideLayers.length > 0) {
    slideLayers[0].setAttribute("src", slideImages[0]);
    slideLayers[0].classList.add("is-active");

    for (let i = 1; i < slideLayers.length; i += 1) {
      slideLayers[i].classList.remove("is-active");
      slideLayers[i].setAttribute("src", slideImages[0]);
    }
  }

  if (slideImages.length > 1 && slideLayers.length >= 2) {
    slideImages.forEach((src) => {
      const preloaded = new Image();
      preloaded.src = src;
    });

    let currentIndex = slideImages.indexOf(slideLayers[0].getAttribute("src"));
    if (currentIndex < 0) currentIndex = 0;
    let activeLayerIndex = 0;
    let isTransitioning = false;

    const switchIntervalMs = 4500;

    window.setInterval(() => {
      if (isTransitioning) return;

      const nextLayerIndex = activeLayerIndex === 0 ? 1 : 0;
      const activeLayer = slideLayers[activeLayerIndex];
      const nextLayer = slideLayers[nextLayerIndex];

      currentIndex = (currentIndex + 1) % slideImages.length;
      const nextSrc = slideImages[currentIndex];
      isTransitioning = true;

      const buffered = new Image();
      buffered.onload = () => {
        nextLayer.setAttribute("src", nextSrc);
        nextLayer.classList.add("is-active");
        activeLayer.classList.remove("is-active");
        activeLayerIndex = nextLayerIndex;
        isTransitioning = false;
      };
      buffered.onerror = () => {
        isTransitioning = false;
      };
      buffered.src = nextSrc;
    }, switchIntervalMs);
  }
}
