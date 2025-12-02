const { Builder, By, Key, until } = require('selenium-webdriver')
async function basicSearch() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://en.wikipedia.org/wiki/Selenium_(software)')

    console.log("Pealkiri ", await driver.getTitle())
  } finally {
    await driver.quit()
  }
}

basicSearch()
