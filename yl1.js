const { Builder, By, Key, until } = require('selenium-webdriver')
const fs = require('fs')
async function f3() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://practice.expandtesting.com/add-remove-elements')
    await driver.sleep(5000)
    
    const addbtn = await driver.findElement(By.className("mt-3"))
    for (let x = 0; x < 5; x++) {
      await addbtn.click()
    }
    await driver.sleep(500)

    const rembtn = await driver.findElements(By.className("added-manually"))
    for (let x of rembtn) {
      await x.click()
    }

  } finally {
    await driver.quit()
  }
}

f3()