
const puppeteer = require("puppeteer");
const fs = require("fs");
const csv = require('csv-parser');
async function getpagedata(url, page) {
    await page.goto(url);
    await page.waitForXPath(`/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/h1/span`, { timeout: 0 });
    const ti = await page.$x(`/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/h1/span`)
    const title = await page.evaluate(title => title.innerText, ti[0]);
    await page.waitForXPath(`/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[4]/div[1]/div/div[1]`, { timeout: 0 })
    const pr = await page.$x(`/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[4]/div[1]/div/div[1]`);
    const price = await page.evaluate(div => div.innerText, pr[0]);
    try {
        await page.waitForXPath(`/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[2]/div/div/span[1]/div`, { visible: true }, { timeout: 0 });
        const rat = await page.$x(`/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[2]/div/div/span[1]/div`);
        const rating = await page.evaluate(div => div.innerText, rat[0]);
        return ({ title, price, rating });
    }
    catch (e) {
        return ({ title, price })
    }
}
async function geturl(page) {

    const xpath_expression = `//a[@class="_2rpwqI"]`;
    await page.waitForXPath(xpath_expression, { timeout: 0 });
    const links = await page.$x(xpath_expression);
    const link_urls = await page.evaluate((...links) => {
        return links.map(e => e.href);
    }, ...links);
    return link_urls;
}


(async function main() {
    var data = fs.readFileSync("my.csv", "utf8");
    data = data.split("\n");
    for (let i in data) {
        data[i] = data[i].split(",");
    }
    console.log(data);

     for (let j of data) {
        var result = [];
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://www.flipkart.com/", { timeout: 0 })
        const search = await page.waitForXPath("/html/body/div/div/div[1]/div[1]/div[2]/div[2]/form/div/div/input", { timeout: 0 });
        await search.type(j);
        await page.keyboard.press("Enter");
        const links = await geturl(page);
        //console.log(links);
        for (let i of links) {
            const data = await getpagedata(i, page)
            result.push(data);
        }
        var details = JSON.stringify(result, null, 2)
        fs.writeFile('flipkart.json', details, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("file created");
        })
   }

    await browser.close();
})();