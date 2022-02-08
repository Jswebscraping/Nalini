const puppeteer=require('puppeteer');
const fs=require('fs');
(async function main(){
   const browser=await puppeteer.launch()
   const page=await browser.newPage()
   await page.goto('https://www.google.com/') 
   page.on('dialog',async dialog=>{
       console.log(dialog.message())
       await dialog.dismiss()
   })
   await page.evaluate(()=>alert('this message is inside an alert box'))
   await browser.close()
})()