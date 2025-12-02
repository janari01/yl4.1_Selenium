const { Builder, By, Key, until } = require('selenium-webdriver')
const fs = require('fs')
async function f3() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.demoblaze.com')
    await driver.manage().setTimeouts({implicit: 5000})
    
    const menu = await driver.findElements(By.id("itemc"))
    await menu[1].click()
    await driver.sleep(1000)

    let firstResults = await driver.findElements(By.className("hrefch"))
    for(let x = 0; x < 5; x++) {
      console.log(await firstResults[x].getText())
    }

    driver.takeScreenshot().then((img) => {
      fs.writeFile('miniProject.png', img, 'base64', (err) => {if (err) console.log(err)})
    })
    
  } finally {
    await driver.quit()
  }
}

f3()