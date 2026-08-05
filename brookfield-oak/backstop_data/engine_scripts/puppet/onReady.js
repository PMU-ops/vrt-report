module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  await page.evaluate(() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = '.perregionpopup-content, #onetrust-consent-sdk, .perregionpopup-backdrop { display: none !important; }';
    document.head.appendChild(style);
  });

  // add more ready handlers here...
};
  