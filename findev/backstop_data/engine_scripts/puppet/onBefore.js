/* eslint-disable */
module.exports = async (page, scenario, vp) => {
  page.setDefaultNavigationTimeout(0);

      // Inject CSS into the page
    await page.addStyleTag({
      content: `
        .aos-animate, [data-aos] {
          transform: none !important;
          transition: unset !important;
        }
      `
    });
};