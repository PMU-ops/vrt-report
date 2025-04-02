module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

    // Inject CSS into the page
    await page.addStyleTag({
      content: `
        .aos-animate, [data-aos] {
          opacity: 1 !important;
          transform: none !important;
          transition: unset !important;
        }
      `
    });
};
