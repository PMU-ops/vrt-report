module.exports = async (page, scenario, vp) => {
  await require('./loadCookies')(page, scenario);

  // Freeze all motion so captures are deterministic:
  // - killing rAF stops GSAP's ticker entirely (parallax scrub, infinite
  //   hexagon float/rotate, scroll-triggered reveals never advance)
  // - the injected CSS forces GSAP's randomized/hidden/mid-tween inline
  //   styles (transform, background-position, opacity) back to a fixed,
  //   fully-visible resting state, since !important in a stylesheet beats
  //   an inline style that isn't itself !important
  // Registered here (before first navigation) so it also applies after
  // onReady.js's page.reload().
  await page.evaluateOnNewDocument(() => {
    window.requestAnimationFrame = () => 0;
    window.cancelAnimationFrame = () => {};

    const css = `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
      /* WP Popups Lite renders the site-wide announcement bar client-side
         on a delay (.wppopups-whole > .spu-box.spu-position-bottom-bar);
         its nondeterministic appearance shifts page layout between
         captures, so hide it outright. The plugin's own stylesheet also
         forces "display: flex !important" and loads after this one, so a
         plain CSS rule loses the cascade tie -- the MutationObserver below
         removes the element from the DOM outright instead. */
      .wppopups-whole {
        display: none !important;
      }
      .parallax-bg, .block-parallax-bg {
        background-position: 50% 0% !important;
      }
      .parallax-bg, .block-parallax-bg,
      .hexagon, .hexagon > img, .hexagon .border > img,
      #hexagon-1, #hexagon-2, #hexagon-3, #hexagon-4,
      #hexagon-texture, #custom-overlay,
      .featured-thumbnail .entry-thumbnail.overlay,
      .to-animate-reveal, .to-animate-scale {
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        filter: none !important;
      }
    `;

    // document.documentElement (<html>) is still null at the moment this
    // callback fires -- the HTML parser hasn't created it yet -- so
    // appending directly to it throws and silently aborts the rest of
    // this script. `document` itself (the Document node) always exists,
    // even before <html> is parsed, so observing IT catches the moment
    // documentElement appears, plus every later DOM mutation (i.e. the
    // popup being added).
    let styleInjected = false;
    const ensureStyleInjected = () => {
      if (styleInjected || !document.documentElement) {
        return;
      }
      const style = document.createElement('style');
      style.textContent = css;
      document.documentElement.appendChild(style);
      styleInjected = true;
    };

    const removePopups = () => {
      document.querySelectorAll('.wppopups-whole').forEach(el => el.remove());
    };

    const tick = () => {
      ensureStyleInjected();
      removePopups();
    };

    new MutationObserver(tick).observe(document, {
      childList: true,
      subtree: true
    });
    tick();
  });
};
