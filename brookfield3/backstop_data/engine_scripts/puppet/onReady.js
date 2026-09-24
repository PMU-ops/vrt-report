module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  // add more ready handlers here...
  await page.addStyleTag({
    content: `.onetrust-pc-dark-filter, #onetrust-banner-sdk { display: none; }`
  });

  // disable animations/transitions so screenshots are deterministic
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
      scroll-behavior: auto !important;
    }`
  });

  // trigger scroll-based reveal animations and lazy-loaded images, then reset to top
  await require('./autoScroll')(page);

};
