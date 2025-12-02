const { Builder, By, Key, until } = require('selenium-webdriver')
const fs = require('fs')
async function f3() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.duckduckgo.com')
    await driver.manage().setTimeouts({implicit: 5000})

    await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.ENTER)
    let firstResults = await driver.findElements(By.css("h2 a"))  
    
    for(let x = 0; x < 3; x++) {
      console.log(await firstResults[x].getText())
    }

    driver.takeScreenshot().then((img) => {
      fs.writeFile('webdrive.png', img, 'base64', (err) => {if (err) console.log(err)})
    })

  } finally {
    await driver.quit()
  }
}

f3()