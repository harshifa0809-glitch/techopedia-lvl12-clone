document.addEventListener("DOMContentLoaded", () => {
  // Purple FAQ Accordion Toggle
  const purpleFaqBtns = document.querySelectorAll(".purple-faq-btn");
  purpleFaqBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      document.querySelectorAll(".purple-faq-item").forEach((i) => {
        if (i !== item) i.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

  // Countdown Timer
  const targetDate = new Date("Feb 1, 2027 00:00:00").getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      document.getElementById("days").innerText = Math.floor(difference / (1000 * 60 * 60 * 24));
      document.getElementById("hours").innerText = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById("minutes").innerText = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById("seconds").innerText = Math.floor((difference % (1000 * 60)) / 1000);
    }
  }, 1000);

  // Filter Tabs
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

  // Search Logic
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
});
