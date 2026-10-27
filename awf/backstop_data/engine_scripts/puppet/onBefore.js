const BLOCKED = /google-analytics|googletagmanager|doubleclick|facebook\.net|facebook\.com\/tr|hotjar|segment\.|clarity\.ms|newrelic|nr-data|bat\.bing|linkedin\.com\/px|twitter\.com\/i\/adsct|onetrust|cookielaw|youtube\.com|vimeo\.com/i;

module.exports = async (page, scenario, vp) => {
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
  );
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (BLOCKED.test(req.url())) req.abort();
    else req.continue();
  });
  await require('./loadCookies')(page, scenario);
};
