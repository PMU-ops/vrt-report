module.exports = async (page, scenario) => {
  await require('./loadCookies')(page, scenario);
  page.setDefaultNavigationTimeout(120000);
};
