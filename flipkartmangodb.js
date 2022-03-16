
const puppeteer = require("puppeteer");
const fs = require("fs");
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
async function getpagedata(url, page) {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
    await page.waitForXPath(`//a[@class="s1Q9rs"]`, { timeout: 0 });
    const ti = await page.$x(`//a[@class="s1Q9rs"]`)
    const title = await page.evaluate(title => title.innerText, ti[0]);
    await page.waitForXPath(`//div[@class="_30jeq3"]`, { timeout: 0 })
    const pr = await page.$x(`//div[@class="_30jeq3"]`);
    const price = await page.evaluate(div => div.innerText, pr[0]);
    await page.waitForXPath(`//div[@class="_3LWZlK"] `, { visible: true }, { timeout: 0 });
    const rat = await page.$x(`//div[@class="_3LWZlK"]`);
    const rating = await page.evaluate(div => div.innerText, rat[0]);
    return ({ title, price, rating });
}
async function geturl(page) {
    const xpath_expression = `//a[@class="_8VNy32"]`;
    await page.waitForXPath(xpath_expression, { timeout: 0 });
    const links = await page.$x(xpath_expression);
    const link_urls = await page.evaluate((...links) => {
        return links.map(e => e.href);
    }, ...links);
    return link_urls;
}
(async function main() {
    try {
        var output = [];
        //var result = [];
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://www.flipkart.com/", { waitUntil: 'networkidle2', timeout: 0 });
        const search = await page.waitForXPath(`//*[@id="container"]/div/div[1]/div[1]/div[2]/div[2]/form/div/div/input`, { timeout: 0 })
        await search.type('chocolate')
        await page.keyboard.press("Enter")
        const links = await geturl(page);
        for (let i of links) {
            const data = await getpagedata(i, page)
            
            //console.log(data);
        
        var mydata = [];

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbmy = db.db('flipkart');
            mydata = [{name:data}];

            dbmy.collection('flipkart').insertMany(mydata, function (err, res) {
                if (err) throw err;
                console.log('document inserted');

                db.close();
            });
        });}
        await browser.close();
    }


    catch (e) {
        console.log("error", e);
    }


})();