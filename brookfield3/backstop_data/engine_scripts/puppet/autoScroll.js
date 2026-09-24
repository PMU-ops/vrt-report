/**
 * Scrolls the full page from top to bottom in small steps and back to top.
 * BackstopJS's full-page screenshot resizes the viewport rather than actually
 * scrolling, so scroll-triggered reveal animations (IntersectionObserver,
 * AOS/WOW/ScrollTrigger-style libraries) and lazy-loaded images never fire
 * unless we force real scroll events first.
 */
module.exports = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      const step = Math.max(200, Math.floor(window.innerHeight / 2));
      let scrolled = 0;
      const maxScrolls = 500; // safety cap against infinite-scroll pages
      let count = 0;

      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, step);
        scrolled += step;
        count++;

        if (scrolled >= scrollHeight - window.innerHeight || count >= maxScrolls) {
          clearInterval(timer);
          resolve();
        }
      }, 150);
    });
  });

  // let any in-flight lazy-loaded images / transitions settle
  await new Promise((resolve) => setTimeout(resolve, 500));

  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((resolve) => setTimeout(resolve, 250));
};
