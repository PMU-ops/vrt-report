/* eslint-disable */
module.exports = async (page, _scenario) => {

  async function waitForPageReady(page) {
    await page.evaluate(() => {
      return new Promise((resolve) => {
        if (document.readyState === 'complete') return resolve();
        window.addEventListener('load', resolve);
      });
    });
  }

  async function waitForAllImages(page) {
    await page.evaluate(async () => {
      const images = Array.from(document.querySelectorAll('img'));
      await Promise.all(images.map(img => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
          setTimeout(resolve, 5000);
        });
      }));
    });
  }

  async function waitForFonts(page) {
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
  }

  async function waitForDomStable(page, timeout) {
    await page.evaluate((t) => {
      return new Promise((resolve) => {
        var timer = null;
        var observer = new MutationObserver(() => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            observer.disconnect();
            resolve();
          }, 1000);
        });
        observer.observe(document.body, {
          childList: true, subtree: true, attributes: true
        });
        timer = setTimeout(() => {
          observer.disconnect();
          resolve();
        }, t);
      });
    }, timeout || 8000);
  }

  async function removeOverlaysAndWidgets(page) {
    await page.evaluate(() => {
      var selectors = [
        '[class*="BettyBot"]', '[id*="BettyBot"]',
        '[class*="bettybot"]', '[id*="bettybot"]',
        '[class*="betty-bot"]',
        '.cookie-consent-banner', '.cookie-banner',
        '[class*="cookie-consent"]', '[id*="cookie-consent"]',
        '#adContainerTopMain',
        '.cf-turnstile', '[class*="turnstile"]',
        '[class*="hotjar"]', '#_hj_feedback_container',
      ];
      selectors.forEach(function(sel) {
        document.querySelectorAll(sel).forEach(function(el) { el.remove(); });
      });

      document.querySelectorAll('iframe').forEach(function(iframe) {
        var src = (iframe.src || '').toLowerCase();
        if (src.includes('turnstile') || src.includes('cloudflare') ||
            src.includes('hotjar') || src.includes('bettybot')) {
          iframe.remove();
        }
      });

      document.querySelectorAll('div, section, aside').forEach(function(el) {
        var style = window.getComputedStyle(el);
        if ((style.position === 'fixed' || style.position === 'sticky') &&
            parseInt(style.zIndex, 10) > 999 &&
            el.offsetHeight > window.innerHeight * 0.3) {
          el.remove();
        }
      });
    });
  }

  async function disableAnimations(page) {
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
          scroll-behavior: auto !important;
        }
      `
    });
  }

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        var totalHeight = 0;
        var distance = 200;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 150);
      });
    });
  }

  async function scrollToTop(page) {
    await page.evaluate(() => { window.scrollTo(0, 0); });
  }

  async function waitForNetworkIdle(page, idleTime, timeout) {
    try {
      await page.waitForNetworkIdle({ idleTime: idleTime || 1500, timeout: timeout || 15000 });
    } catch (_) {}
  }

  // 1. Wait for initial page load
  await waitForPageReady(page);
  await waitForFonts(page);

  // 2. Remove overlays before scrolling
  await removeOverlaysAndWidgets(page);

  // 3. Scroll full page to trigger all lazy-loaded content
  await autoScroll(page);

  // 4. Wait for everything triggered by scroll to finish loading
  await waitForNetworkIdle(page, 1500, 15000);
  await waitForAllImages(page);

  // 5. Second scroll pass — some sites add more content after first lazy load
  await autoScroll(page);
  await waitForNetworkIdle(page, 1500, 10000);
  await waitForAllImages(page);

  // 6. Wait for DOM to stop changing (no mutations for 1 second)
  await waitForDomStable(page, 8000);

  // 7. Clean up for screenshot
  await removeOverlaysAndWidgets(page);
  await scrollToTop(page);
  await disableAnimations(page);

  // 8. Final settle
  await new Promise(resolve => setTimeout(resolve, 1000));

};
