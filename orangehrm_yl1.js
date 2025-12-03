const { Builder, By, Key, until } = require('selenium-webdriver')
const fs = require('fs')

async function enter_values(driver, u, p) {
  const username = await driver.findElement(By.css(`input[placeholder="Username"]`))
  await username.clear()
  await username.sendKeys(`${u}`)

  const password = await driver.findElement(By.css(`input[placeholder="Password"]`))
  await password.clear()
  await password.sendKeys(`${p}`, Key.ENTER)

  await driver.sleep(1000 * 5)
}

async function f3() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://opensource-demo.orangehrmlive.com')
    await driver.sleep(2000)
    await enter_values(driver, 'e', '123')

    const view = await driver.getPageSource()
    await driver.sleep(100)
    if (view.includes('Invalid credentials')) {
      await enter_values(driver, 'Admin', 'admin123')

      let somevalue = await driver.findElement(By.css(".oxd-topbar-header-breadcrumb > .oxd-topbar-header-breadcrumb-module"))
      if (await somevalue.getText() == 'Dashboard') {
        console.log('Dasboard view')
      }
    }
  } finally {
    await driver.quit()
  }
}

f3()