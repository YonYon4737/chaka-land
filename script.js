const revealTargets = document.querySelectorAll(".section, .hero, .footer");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const contactLinks = document.querySelectorAll(".contact-links a");

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

contactLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => link.classList.add("is-hovered"));
  link.addEventListener("mouseleave", () => link.classList.remove("is-hovered"));
  link.addEventListener("focus", () => link.classList.add("is-hovered"));
  link.addEventListener("blur", () => link.classList.remove("is-hovered"));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealTargets.forEach((target) => {
  target.classList.add("reveal");
  observer.observe(target);
});
