module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);

  try {
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch (err) {
    console.log('Reload timed out for ' + scenario.label + ': ' + err.message);
  }

    // Inject CSS into the page
    // (#header-notification is dead -- no such element exists anywhere in
    // the codebase; the real announcement-bar hiding is handled in
    // onBefore.js, which also covers .wppopups-whole)
    await page.addStyleTag({
      content: `
        #header-notification {
          display: none !important;
        }
      `
    });

    // Several Slick Carousels on this theme run with autoplay: true
    // (.inti-carousel, .inti-slider, .inti-resources-slider), rotating
    // slides on a setInterval -- unaffected by disabling requestAnimationFrame
    // in onBefore.js. Whichever slide is showing therefore depends on real
    // wall-clock time since page load, which varies run to run. Pause them
    // (before the settle delay below, to minimize how much autoplay time
    // elapses first) so every capture shows the same (initial) slide.
    // Slick initializes synchronously during page load, well before this
    // point in the pipeline, so a single check suffices -- no need to poll.
    await page.evaluate(() => {
      if (window.jQuery && window.jQuery.fn && window.jQuery.fn.slick) {
        window.jQuery('.slick-initialized').slick('slickPause');
      }
    });

    // Give lazy-loaded/async content (images, fonts, ajax blocks) a moment
    // to settle since we navigate with 'domcontentloaded' rather than
    // waiting on the 'load' event, which some pages on this site never fire.
    await new Promise(resolve => setTimeout(resolve, 2000));
};