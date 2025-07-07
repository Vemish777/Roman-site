document.addEventListener("DOMContentLoaded", () => {
  let prevScroll = window.pageYOffset;
  const header = document.getElementById("nav");
  const headerHeight = header.offsetHeight;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > prevScroll) {
      header.style.top = `-${headerHeight}px`;
    } else {
      header.style.top = "0";
    }

    prevScroll = currentScroll;
  });

  const isSmallScreen = window.innerWidth <= 900;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  AOS.init({
    disable: prefersReducedMotion,
    duration: isSmallScreen ? 500 : 700,
    once: false,
  });

  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("navLinks");
  const mobileLinks = mobileMenu.querySelectorAll("a, button");

  function toggleMenu() {
    const willClose = burger.classList.contains("open");
    burger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = willClose ? "" : "hidden";

    mobileLinks.forEach((el) => {
      el.setAttribute("tabindex", willClose ? "-1" : "0");
    });

    burger.setAttribute("aria-expanded", !willClose);

    if (willClose) burger.focus();
  }

  burger.addEventListener("click", toggleMenu);
  mobileLinks.forEach((el) => {
    el.addEventListener("click", () => {
      if (mobileMenu.classList.contains("open")) {
        toggleMenu();
      }
    });
  });

  const items = document.querySelectorAll("#faq .item");

  items.forEach((item) => {
    const question = item.querySelector(".question");
    const answer = item.querySelector(".answer");

    const toggleItem = () => {
      const isActive = item.classList.contains("active");
      answer.style.maxHeight = isActive ? "0" : answer.scrollHeight + 30 + "px";
      answer.style.paddingTop = isActive ? "0" : "10px";
      answer.style.paddingBottom = isActive ? "0" : "20px";
      answer.style.opacity = isActive ? "0" : "1";
      item.classList.toggle("active");
    };

    question.addEventListener("click", toggleItem);
    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleItem();
      }
    });

    answer.style.maxHeight = "0";
    answer.style.paddingTop = "0";
    answer.style.paddingBottom = "0";
    answer.style.opacity = "0";
  });

  const bookBtn = document.getElementById("bookBtn");
  const bookInfo = document.querySelector(".book-info");

  if (bookBtn && bookInfo) {
    bookBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      bookBtn.classList.toggle("active");

      bookInfo.classList.toggle("active");

      if (bookBtn.classList.contains("active")) {
        bookBtn.style.backgroundColor = "#ffffff";
        bookBtn.style.color = "#000000";
      } else {
        bookBtn.style.backgroundColor = "#1d1d1f";
        bookBtn.style.color = "#ffffff";
      }
    });

    document.addEventListener("click", (e) => {
      if (!bookBtn.contains(e.target) && !bookInfo.contains(e.target)) {
        bookBtn.classList.remove("active");
        bookInfo.classList.remove("active");

        bookBtn.style.backgroundColor = "#1d1d1f";
        bookBtn.style.color = "#ffffff";
      }
    });
  }

  const aboutBook = document.getElementById("about-book");
  const aboutBookInner = aboutBook.querySelector(".about-book__inner");
  const aboutBookBack = aboutBook.querySelector(".about-book__back");

  function getClosedHeight() {
    const w = window.innerWidth;
    if (w <= 480) return 600;
    if (w <= 920) return 700;
    return 600;
  }

  aboutBook.style.height = getClosedHeight() + "px";
  aboutBookInner.style.height = "100%";

  aboutBook.addEventListener("click", () => {
    aboutBook.classList.toggle("open");

    if (aboutBook.classList.contains("open")) {
      const backHeight = aboutBookBack.scrollHeight;
      aboutBook.style.height = backHeight + "px";
      aboutBookInner.style.height = backHeight + "px";
    } else {
      aboutBook.style.height = getClosedHeight() + "px";
      aboutBookInner.style.height = "100%";
    }
  });

  window.addEventListener("resize", () => {
    if (!aboutBook.classList.contains("open")) {
      aboutBook.style.height = getClosedHeight() + "px";
      aboutBookInner.style.height = "100%";
    }
  });

  const OFFSET = header.offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - OFFSET;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery img").forEach((img) => {
    img.addEventListener("click", () => {
      console.log("Картинка нажата:", img.src);
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  window.addEventListener("load", () => {
    const track1 = document.querySelector(".gallery-track-1");
    const track2 = document.querySelector(".gallery-track-2");

    const duration1 = 40;
    const width1 = track1.scrollWidth;
    const width2 = track2.scrollWidth;

    const duration2 = (width2 / width1) * duration1;

    track1.style.animationDuration = duration1 + "s";
    track2.style.animationDuration = duration2 + "s";

    track1.style.animation = "none";
    track1.offsetHeight;
    track1.style.animation = "";

    track2.style.animation = "none";
    track2.offsetHeight;
    track2.style.animation = "";
  });
});
