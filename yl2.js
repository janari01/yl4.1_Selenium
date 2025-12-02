const { Builder, By, Key, until } = require('selenium-webdriver')
async function f3() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.saucedemo.com/')
    await driver.sleep(1000)

    let username_values = await driver.findElement(By.id("login_credentials"))
    let arr_values_username = (await username_values.getText()).split('\n')
    let accepted_username = arr_values_username.find(v => v === 'standard_user')

    let pswd_values = await driver.findElement(By.className("login_password"))
    let arr_values_pswd = (await pswd_values.getText()).split('\n')
    let accepted_pwsd = arr_values_pswd.find(v => v === 'secret_sauce')

    let inputField1 = await driver.findElement(By.id("user-name"))
    let inputField2 = await driver.findElement(By.id("password"))
    await inputField1.clear()
    await inputField2.clear()
    await inputField1.sendKeys(accepted_username)
    await inputField2.sendKeys(accepted_pwsd)

    await driver.findElement(By.css('input[type="submit"]')).click()
    await driver.sleep(500)

    let els = await driver.findElements(By.className('inventory_item_name '))
    for (let x = 0; x < els.length; x++) {
      console.log(await els[x].getText())
    }
  } finally {
    await driver.quit()
  }
}

f3()