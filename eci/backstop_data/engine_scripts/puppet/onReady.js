module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  // Hide cookie consent dialog
  await page.evaluate(() => {
    const el = document.getElementById('CybotCookiebotDialog');
    if (el) el.style.display = 'none';
  });
};
