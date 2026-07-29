document.addEventListener("DOMContentLoaded", () => {
  // 1. FAQ Accordion Logic
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

  // 2. Countdown Timer Logic (Target: Feb 1, 2027)
  const targetDate = new Date("Feb 1, 2027 00:00:00").getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
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

  // 3. Category Filter Tabs Logic
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
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. Instant Event Search Logic (Safe Check Added)
  const searchInput = document.getElementById("eventSearch");
  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      const query = e.target.value.toLowerCase();
      eventCards.forEach((card) => {
        // Checking title attribute or inner text fallback
        const titleAttr = card.getAttribute("data-title") || "";
        const cardText = card.innerText || "";
        const title = (titleAttr + " " + cardText).toLowerCase();

        if (title.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // 5. Modal Popup Logic
  const modalBtns = document.querySelectorAll(".modal-btn");
  const closeBtns = document.querySelectorAll(".close-btn");

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        modalElement.classList.add("active");
      }
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) {
        modal.classList.remove("active");
      }
    });
  });
});
