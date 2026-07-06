/**
 * Smooth-scroll to a section by ID.
 * Works from any page:
 *   - If already on home, scrolls immediately.
 *   - If on the all-projects page, clears the hash first (which triggers
 *     App to render the home page), then polls until the target section
 *     is in the DOM before scrolling.
 */
export function navTo(sectionId: string) {
  const isOnAllProjects = window.location.hash === '#all-projects';

  if (isOnAllProjects) {
    // 1. Store where we want to go so we can read it after the page switch
    sessionStorage.setItem('scrollTarget', sectionId);
    // 2. Clear the hash → App switches to home page
    window.location.hash = '';
  } else {
    scrollToSection(sectionId);
  }
}

/**
 * Called on home page load/hash-clear to check if there's a pending
 * scroll target left by navTo(). Place this call in App's useEffect.
 */
export function consumeScrollTarget() {
  const target = sessionStorage.getItem('scrollTarget');
  if (!target) return;
  sessionStorage.removeItem('scrollTarget');
  // Poll until the section exists in the DOM (React may still be mounting)
  scrollToSection(target, 10);
}

function scrollToSection(sectionId: string, retriesLeft = 0) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (retriesLeft > 0) {
    setTimeout(() => scrollToSection(sectionId, retriesLeft - 1), 100);
  }
}
