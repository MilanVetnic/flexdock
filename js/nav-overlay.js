/**
 * Nav overlay
 * Adds a full-page overlay that appears while the mobile nav (hamburger) is open.
 * It sits between the nav links and the rest of the page content, and does not
 * block the nav links (the navigation has a higher z-index than the overlay).
 *
 * The overlay is kept in sync with Webflow's own open/close state by observing
 * the `w--open` class Webflow toggles on the menu button. This means it closes
 * correctly for every trigger: hamburger click, nav-link click, outside click,
 * Escape key and viewport resize.
 */
(function () {
  function init() {
    var button = document.querySelector('.menu-button.w-nav-button');
    if (!button) return;

    // Create the overlay once and place it in the page-wrapper (falls back to body).
    var overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      var host = document.querySelector('.page-wrapper') || document.body;
      host.appendChild(overlay);
    }

    function sync() {
      var isOpen = button.classList.contains('w--open');
      overlay.classList.toggle('is-active', isOpen);
    }

    // Clicking the overlay closes the menu (mirrors the hamburger).
    overlay.addEventListener('click', function () {
      if (button.classList.contains('w--open')) button.click();
    });

    // Keep the overlay in sync with the menu's open state.
    new MutationObserver(sync).observe(button, {
      attributes: true,
      attributeFilter: ['class'],
    });

    sync();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
