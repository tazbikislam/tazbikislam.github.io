document.addEventListener("DOMContentLoaded", () => {

  const swiperCards = new Swiper(".card__content", {
    slidesPerView: 1, 
    loop: true,
    spaceBetween: 24,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    observer: true, 
    observeParents: true,
    allowTouchMove: true,
    breakpoints: {
      600: { slidesPerView: 2 }, 
      968: { slidesPerView: 3 },
    },
  });


  const cursor = document.querySelector(".drawing-cursor");
  const links = document.querySelectorAll("a");
  const footer = document.querySelector(".portfolio-footer");
  const shapes = document.querySelectorAll(".shape");


  document.addEventListener("mousemove", (e) => {
    if (cursor) {
      cursor.style.opacity = "1";
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }

    if (shapes && shapes.length) {
      const moveX = e.clientX - window.innerWidth / 2;
      const moveY = e.clientY - window.innerHeight / 2;

      shapes.forEach((shape, index) => {
        const factor = (index + 1) * 0.01;
        shape.style.transform = `translate(${moveX * factor}px, ${
          moveY * factor
        }px) rotate(${moveX * 0.02}deg)`;
      });
    }
  });

  document.addEventListener("mouseleave", () => {
    if (cursor) cursor.style.opacity = "0";
  });

  if (links && links.length) {
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        if (cursor) {
          cursor.style.width = "40px";
          cursor.style.height = "40px";
          cursor.style.backgroundColor = "var(--primary)";
        }
      });

      link.addEventListener("mouseleave", () => {
        if (cursor) {
          cursor.style.width = "20px";
          cursor.style.height = "20px";
          cursor.style.backgroundColor = "var(--accent)";
        }
      });

      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href") || "";
        const external =
          link.target === "_blank" ||
          href.startsWith("http") ||
          href.startsWith("mailto:");
        if (!external) e.preventDefault();

        const ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.width = "5px";
        ripple.style.height = "5px";
        ripple.style.background = "var(--accent)";
        ripple.style.borderRadius = "50%";
        ripple.style.pointerEvents = "none";
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        ripple.style.transform = "translate(-50%, -50%)";
        ripple.style.animation = "ripple 0.6s linear forwards";
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  if (footer) {
    footer.addEventListener("mousemove", (e) => {
      const footerRect = footer.getBoundingClientRect();
      const x = e.clientX - footerRect.left;
      const y = e.clientY - footerRect.top;

      const xPercent = x / footerRect.width - 0.5;
      const yPercent = y / footerRect.height - 0.5;

      footer.style.transform = `rotateX(${yPercent * -5}deg) rotateY(${
        xPercent * 5
      }deg)`;
    });

    footer.addEventListener("mouseleave", () => {
      footer.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes ripple {
      0% { width: 5px; height: 5px; opacity: 1; }
      100% { width: 100px; height: 100px; opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function handleResponsive() {
    if (window.innerWidth <= 640) {
      const projectLinks = document.querySelectorAll(".project-link");
      projectLinks.forEach((link) => {
        const year = link.querySelector(".project-year");
        if (year) link.appendChild(year);
      });
    }
  }
  window.addEventListener("resize", handleResponsive);
  handleResponsive();

  const year = document.querySelector("#year");
  if (year) year.innerText = new Date().getFullYear();
});
