const puppeteer = require('puppeteer');
const fs = require('fs');
(async function main() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.nseindia.com/get-quotes/equity?symbol=SBIN', { waitUntil: 'networkidle2', timeout: 0 });
        await page.waitForSelector('.securityinfo');
        const lis = await page.$$('.securityinfo');
        let demo = [];
        for (const i of lis) {
            var p = await i.$eval('h2', h2 => h2.innerText);
            var header = await i.$eval('#securityInfo thead>tr', tr => tr.innerText);
            var dis = await i.$eval('#securityInfo tbody', tr => tr.innerText);
        }
        demo.push({
            title: p,
            header: header,
            value: dis
        })
        console.log(demo)
        fs.appendFile('demo1.txt', JSON.stringify(demo), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("file created");
        })

        await browser.close();

    } catch (e) {
        console.log('error', e);
    }
})();
