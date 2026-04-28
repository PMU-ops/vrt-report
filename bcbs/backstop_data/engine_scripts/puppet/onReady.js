module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });

    // Inject CSS into the page
    await page.addStyleTag({
      content: `
        .be-related-link-container, .oho-alert__wrapper, #klaro-cookie-notice {
          display: none !important;
        }
      `
    });
};