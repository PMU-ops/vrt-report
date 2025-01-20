/* eslint-disable */
module.exports = async (page, _scenario) => {

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        var totalHeight = 0;
        var distance = 50;
        var timer = setInterval(async () => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          } else {
            await new Promise(r => setTimeout(r, 2000)); // Wait for 2 seconds
          }
        }, 100);
      });
    });
  }

  await autoScroll(page);
};