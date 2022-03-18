const puppeteer = require('puppeteer');
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
async function getdata(url, page) {
    var data1 = fs.readFileSync("loblawsxpath.csv", "utf8");
    data1 = data1.split("\n");
    for (let i in data1) {
        data1[i] = data1[i].split(",");
    }
    await page.goto(url);
    await page.waitForXPath(data1[0], { timeout: 0})
    const ti = await page.$x(data1[0])
    let title = await page.evaluate(h1 => h1.innerText, ti[0]);
    await page.waitForXPath(data1[1], { timeout: 30000})
    const pr = await page.$x(data1[1])
    let price = await page.evaluate(span => span.innerText, pr[0]);
    try {
        await page.waitForXPath(data1[2], { visible: true }, { timeout: 3000 })
        const compp = await page.$x(data1[2])
        let compprice = await page.evaluate(h1 => h1.innerText, compp[0])
        return ({ title, price, compprice });
    }
    catch (e) {
        return ({ title, price });
    }
}
async function geturl(page) {

    const xpath_expression = `//a[@class="product-tile__details__info__name__link"]`;
    await page.waitForXPath(xpath_expression, { timeout: 0 });
    const links = await page.$x(xpath_expression);
    const link_urls = await page.evaluate((...links) => {
        return links.map(e => e.href);
    }, ...links);
    return link_urls;
}

(async function main() {
    try {
        var data = fs.readFileSync("loblaws.csv", "utf8");
        data = data.split("\n");
        for (let i in data) {
            data[i] = data[i].split(",");
        }
        console.log(data);
        for (let j of data) {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            await page.goto("https://www.loblaws.ca/", { waitUntil: 'networkidle2', timeout: 0 });
            const search = await page.waitForXPath(`//*[@id="autocomplete-listbox-site-header-"]`, { timeout: 0 });
            await search.type(j);
            await page.keyboard.press("Enter");
            const links = await geturl(page)
            for (let k of links) {
                const data = await getdata(k, page);
                    var mydata = [];

                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbmy = db.db('loblawsdb');
                    mydata = [{name:data}];

                    dbmy.collection('loblawsdb').insertMany(mydata, function (err, res) {
                        if (err) throw err;


                        db.close();
                        console.log('document inserted');
                    });
                });
                console.log(data);
            }
           
        }

        await browser.close();
    }

    catch (e) {
        console.log("error", e)
    }





})(); 
