module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });

    // Inject CSS into the page
    await page.addStyleTag({
      content: `
        .ot-sdk-container {
          display: none !important;
        }
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        [data-aos], .aos-animate, .aos-init {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
        }
      `
    });
};
