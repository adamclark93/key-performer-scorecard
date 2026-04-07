import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 627, deviceScaleFactor: 4 });
await page.goto('http://localhost:5173/linkedin-v2-cream.html', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3000));
await page.screenshot({
  path: '/Users/adamclark/Desktop/linkedin-featured-cream.png',
  fullPage: false
});
await browser.close();
console.log('Done');
