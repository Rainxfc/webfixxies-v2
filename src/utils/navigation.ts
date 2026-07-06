/**
 * Smooth-scroll to a section by ID.
 * Works from any page:
 *   - If on home, scrolls immediately.
 *   - If on the all-projects page, navigates home first then scrolls
 *     once the page has had time to mount (two rAF ticks + small buffer).
 */
export function navTo(sectionId: string) {
  const isOnAllProjects = window.location.hash === '#all-projects';

  if (isOnAllProjects) {
    // Clear the hash → triggers App to render the home page
    window.location.hash = '';

    // Wait for React to re-render the home page sections, then scroll
    const attempt = (triesLeft: number) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (triesLeft > 0) {
        setTimeout(() => attempt(triesLeft - 1), 80);
      }
    };
    // Give React ~160ms to mount, then retry up to 5× every 80ms
    setTimeout(() => attempt(5), 160);
  } else {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
