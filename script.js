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

  // 2. Countdown Timer Logic
  const targetDate = new Date("Feb 1, 2027 00:00:00").getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      document.getElementById("days").innerText = Math.floor(
        difference / (1000 * 60 * 60 * 24),
      );
      document.getElementById("hours").innerText = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      document.getElementById("minutes").innerText = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60),
      );
      document.getElementById("seconds").innerText = Math.floor(
        (difference % (1000 * 60)) / 1000,
      );
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
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. Instant Event Search Logic
  const searchInput = document.getElementById("eventSearch");
  searchInput.addEventListener("keyup", (e) => {
    const query = e.target.value.toLowerCase();
    eventCards.forEach((card) => {
      const title = card.getAttribute("data-title");
      if (title.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // 5. Modal Popup Logic
  const modalBtns = document.querySelectorAll(".modal-btn");
  const closeBtns = document.querySelectorAll(".close-btn");

  modalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      document.getElementById(modalId).classList.add("active");
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").classList.remove("active");
    });
  });
});
