module.exports = async (page, scenario, vp) => {
  await require('./loadCookies')(page, scenario);

  const cacheBuster = `cb=${Date.now()}${Math.floor(Math.random() * 1000)}`;
    if (scenario.url) {
      scenario.url += (scenario.url.includes('?') ? '&' : '?') + cacheBuster;
    }
    if (scenario.referenceUrl) {
      scenario.referenceUrl += (scenario.referenceUrl.includes('?') ? '&' : '?') + cacheBuster;
    }
};