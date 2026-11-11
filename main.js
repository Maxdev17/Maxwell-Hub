/* ==========================================================
   MAXWELL HUB — main.js
   1. Navigation: inline links when they fit, menu button when not
   2. Close the dropdown menu after a link is tapped
   3. Portfolio filter buttons
   ========================================================== */

(() => {
  "use strict";

  /* ---------- 1. NAVIGATION FIT ---------- */
  const header = document.querySelector(".site-header");
  const inner = header ? header.querySelector(".header-inner") : null;

  function fitNavigation() {
    if (!header || !inner) return;
    // Try the wide (inline) layout first...
    header.classList.add("is-wide");
    // ...and if anything overflows the header, fall back to the menu button.
    if (inner.scrollWidth > inner.clientWidth + 1) {
      header.classList.remove("is-wide");
    }
  }

  if (header && inner) {
    fitNavigation();
    // Re-check when the window changes size or fonts finish loading
    if ("ResizeObserver" in window) {
      new ResizeObserver(fitNavigation).observe(inner);
    } else {
      window.addEventListener("resize", fitNavigation);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitNavigation);
    }
  }

  /* ---------- 2. CLOSE MENU AFTER TAPPING A LINK ---------- */
  const menu = document.getElementById("site-menu");
  if (menu) {
    menu.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      try {
        if (menu.matches(":popover-open")) menu.hidePopover();
      } catch (error) {
        /* Older browsers without the popover API: nothing to close */
      }
    });
  }

  /* ---------- 3. PORTFOLIO FILTERS ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll("#project-grid .project");

  if (filterButtons.length && projects.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        // Update which button looks selected
        filterButtons.forEach((b) =>
          b.setAttribute("aria-pressed", String(b === button)),
        );

        // Show or hide each project card
        projects.forEach((card) => {
          const show = filter === "all" || card.dataset.category === filter;
          card.hidden = !show;
        });
      });
    });
  }
})();
