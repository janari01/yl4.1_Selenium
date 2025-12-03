const { Builder, By, Key } = require('selenium-webdriver')
let cookies = []

async function enter_values(driver, u, p) {
  const username = await driver.findElement(By.css('input[placeholder="Username"]'))
  await username.clear()
  await username.sendKeys(u)

  const password = await driver.findElement(By.css('input[placeholder="Password"]'))
  await password.clear()
  await password.sendKeys(p, Key.ENTER)

  await driver.sleep(2000)
}

async function f3() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://opensource-demo.orangehrmlive.com')
    await driver.sleep(2000)

    await enter_values(driver, 'Admin', 'admin123')

    cookies = await driver.manage().getCookies()
  } finally {
    await driver.quit()
  }
}

async function main() {
  await f3()

  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://opensource-demo.orangehrmlive.com')
    await driver.sleep(1000)

    for (const cookie of cookies) {
      await driver.manage().addCookie(cookie)
    }

    await driver.get('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')

    await driver.sleep(3000)
  } finally {
    await driver.quit()
  }
}

main()