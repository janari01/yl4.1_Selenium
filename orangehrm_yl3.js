const { Builder, By, until, Key } = require('selenium-webdriver')

async function login(driver, username, password) {
  await driver.findElement(By.css('input[placeholder="Username"]')).sendKeys(username)
  await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys(password, Key.ENTER)
  await driver.sleep(2000)
}

async function logout(driver) {
  await driver.findElement(By.css('.oxd-userdropdown-tab')).click()
  await driver.sleep(1000)
  await driver.findElements(By.className('oxd-userdropdown-link'))[3].click()
  await driver.sleep(2000)
}

async function adminTest() {
  const driver = await new Builder().forBrowser('chrome').build()

  try {
    await driver.get('https://opensource-demo.orangehrmlive.com/')
    await login(driver, "Admin", "admin123")

    await driver.findElements(By.className('oxd-main-menu-item--name'))[0].click()
    await driver.findElements(By.className('oxd-topbar-body-nav-tab'))[0].click()
    await driver.findElement(By.className('oxd-topbar-body-nav-tab-link')).click()
    await driver.sleep(1500)

    const addUserBtn = await driver.findElement(By.css(".orangehrm-header-container > .oxd-button"))
    const visible = await addUserBtn.isDisplayed()
    console.log(visible)

    await logout(driver)

    await login(driver, "Paul Collings", "admin123") 
    await driver.sleep(2000)

    let menuExists = true
    try {
      await driver.findElement(By.xpath("//span[text()='Admin']")).isDisplayed()
    } catch (e) {
      menuExists = false
    }

    console.log(menuExists)

    await driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
    await driver.sleep(2000)

    let currentUrl = await driver.getCurrentUrl()
    let pageSource = await driver.getPageSource()

    if (currentUrl.includes("dashboard")) {
      console.log('redirected')
    } else if (pageSource.includes("Access") || pageSource.includes("Denied")) {
      console.log('access denied message')
    } else {
      console.log("err", currentUrl)
    }

  } finally {
    await driver.quit()
  }
}

adminTest()
