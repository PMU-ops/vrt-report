module.exports = async (page, scenario, vp) => {
  await require('./loadCookies')(page, scenario);

  const url = scenario.referenceUrl || scenario.url;
  if (url && url.includes('qa.bhhc.com')) {
    await page.authenticate({ username: 'WCPCMarc0m!', password: 'Sup3rP0rtal2030!' });
  }

  await page.setCacheEnabled(false);
  await page.setExtraHTTPHeaders({ 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' });
};
