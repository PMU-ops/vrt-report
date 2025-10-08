module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });

    // Inject CSS into the page
    await page.addStyleTag({
      content: `
        #header-notification {
          display: none !important;
        }
      `
    });
};