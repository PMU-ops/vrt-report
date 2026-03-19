module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  // add more ready handlers here...
  await page.addStyleTag({
    content: `.onetrust-pc-dark-filter, #onetrust-banner-sdk { display: none; }`
  });

};
