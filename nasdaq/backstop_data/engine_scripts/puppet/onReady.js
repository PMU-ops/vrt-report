/* eslint-disable */
module.exports = async (page, _scenario) => {

async function disableAnimations(page) {
    await page.addStyleTag({
      content: `
[data-aos] {
  pointer-events: auto !important;
  visibility: visible !important;
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
  transition-duration: 0s !important;
}
      `
    });
  }

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  await disableAnimations(page);
  await autoScroll(page);
  
};  