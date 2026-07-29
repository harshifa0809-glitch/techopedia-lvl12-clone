document.addEventListener("DOMContentLoaded", () => {
  // 1. Particle Background Animation Logic
  const canvas = document.getElementById("particleCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = "rgba(43, 232, 213, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 40; i++) {
      particlesArray.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 2. FAQ Accordion Logic
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.parentElement;
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) item.classList.remove("active");
      });
      faqItem.classList.toggle("active");
    });
  });

  // 3. Countdown Timer Logic (Feb 1, 2027)
  const targetDate = new Date("Feb 1, 2027 00:00:00").getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const daysEl = document.getElementById("days");
      const hoursEl = document.getElementById("hours");
      const minsEl = document.getElementById("minutes");
      const secsEl = document.getElementById("seconds");

      if (daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
      if (hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
      if (minsEl) minsEl.innerText = minutes < 10 ? "0" + minutes : minutes;
      if (secsEl) secsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    }
  }, 1000);

  // 4. Category Filter Tabs Logic
  const tabBtns = document.querySelectorAll(".tab-btn");
  const eventCards = document.querySelectorAll(".event-card");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      eventCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 5. Instant Event Search Logic
  const searchInput = document.getElementById("eventSearch");
  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      const query = e.target.value.toLowerCase();
      eventCards.forEach((card) => {
        const titleAttr = card.getAttribute("data-title") || "";
        const cardText = card.innerText || "";
        const title = (titleAttr + " " + cardText).toLowerCase();

        if (title.includes(query)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // 6. Modal Popup Logic
  const modalBtns = document.querySelectorAll(".modal-btn");
  const closeBtns = document.querySelectorAll(".close-btn");

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const modalElement = document.getElementById(modalId);
      if (modalElement) modalElement.classList.add("active");
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) modal.classList.remove("active");
    });
  });

  // 7. Scroll to Top Button Logic
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  window.onscroll = () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      if (scrollTopBtn) scrollTopBtn.style.display = "block";
    } else {
      if (scrollTopBtn) scrollTopBtn.style.display = "none";
    }
  };

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 8. 3D Tilt Card Effect
  eventCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      card.style.transform = `perspective(1000px) rotateX(${-y / 12}deg) rotateY(${x / 12}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
});
