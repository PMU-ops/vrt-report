module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  // add more ready handlers here...
};

module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });

    // Inject CSS into the page
    await page.addStyleTag({
      content: `
        .osano-cm-window {
          display: none !important;
        }
      `
    });
};