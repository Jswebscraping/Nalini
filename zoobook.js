const puppeteer = require('puppeteer');
const fs = require('fs');



(async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://en.wikipedia.org/wiki/Zoobooks#List_of_Zoobooks_by_alphabetical_order',{ waitUntil: 'networkidle2', timeout: 0 });
    var i = 1;
    while (1) {
        try {
            await page.waitForXPath(`//*[@id="mw-content-text"]/div[1]/ul[1]/li[${i}]`, { timeout: 2000 })
            const title = await page.$x(`//*[@id="mw-content-text"]/div[1]/ul[1]/li[${i}]`)
            let result = await page.evaluate(h1 => h1.innerText, title[0])
            console.log(result)
            i = i + 1;
        }
        catch (e) {
            break;
        }
    }



    await browser.close();
})();