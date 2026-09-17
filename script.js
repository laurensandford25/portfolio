// Prefer clean URLs: /about/ not /about/index.html, / not /index.html
if (location.pathname.endsWith("/index.html")) {
  const clean = location.pathname.slice(0, -"index.html".length) || "/";
  location.replace(clean + location.search + location.hash);
}

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

const contactForm = document.querySelector(".contact-form");
const formSuccess = document.querySelector("[data-form-success]");

if (formSuccess && new URLSearchParams(location.search).get("sent") === "1") {
  formSuccess.hidden = false;
  formSuccess.focus();
}

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    const submitButton = contactForm.querySelector("[type=submit]");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrollToHashTarget() {
  const id = location.hash.slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  target.classList.add("is-visible");
  target.scrollIntoView({ behavior: "auto", block: "start" });
}

if (location.hash) {
  scrollToHashTarget();
  window.addEventListener("load", scrollToHashTarget);
}

if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}
