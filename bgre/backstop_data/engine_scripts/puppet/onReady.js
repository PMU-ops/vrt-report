module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Hide cookie banner + kill CSS animations/transitions.
  await page.addStyleTag({
    content: `
      .onetrust-pc-dark-filter,
      #onetrust-banner-sdk {
        display: none !important;
      }
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
        caret-color: transparent !important;
      }
    `
  });

  // Give GSAP time to initialize (it sets the initial hidden states on load).
  await sleep(500);

  // Scroll through the whole page so every ScrollTrigger fires and lazy
  // content loads. Height is re-read each step because pinned sections and
  // lazy content can grow the page while scrolling.
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(200, Math.floor(window.innerHeight / 2));
    let y = 0;
    let guard = 0;
    while (y < document.documentElement.scrollHeight && guard < 200) {
      window.scrollTo(0, y);
      y += step;
      guard += 1;
      await sleep(100);
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await sleep(300);
  });

  // Force every GSAP/ScrollTrigger animation to its finished state, then
  // freeze the global timeline so carousels/loops stop moving. CSS overrides
  // can't do this: GSAP writes inline styles from its own ticker.
  await page.evaluate(() => {
    if (window.gsap) {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((st) => {
          if (st.animation) {
            st.animation.progress(1).pause();
          }
        });
      }
      window.gsap.globalTimeline.pause();
    }

    // Normalize GSAP carousels to a deterministic state: first slide fully
    // visible, all others hidden (autoplay timing otherwise makes test and
    // reference capture different slides).
    document.querySelectorAll('.slider-bgs').forEach((wrap) => {
      wrap.querySelectorAll('.slide-bg').forEach((slide, i) => {
        slide.style.setProperty('opacity', i === 0 ? '1' : '0', 'important');
        const inner = slide.querySelector('.slide-bg-inner');
        if (inner) {
          inner.style.setProperty('transform', 'none', 'important');
        }
      });
    });

    window.scrollTo(0, 0);
  });

  // Let layout settle at the top before capture.
  await sleep(500);
};
