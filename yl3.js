const { Builder, By, Key, until } = require('selenium-webdriver')
const fs = require('fs')
async function f3() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://parabank.parasoft.com/parabank/index.htm')
    await driver.sleep(1000)

    const registerLink = await driver.findElement(By.linkText('Register'))
    await driver.wait(until.elementIsVisible(registerLink), 500)
    await registerLink.click()

    const firstNameInput = await driver.findElement(By.id('customer.firstName'))
    await driver.wait(until.elementIsVisible(firstNameInput), 500)
    await firstNameInput.clear()
    await firstNameInput.sendKeys('Selenium')

    const lastNameInput = await driver.findElement(By.id('customer.lastName'))
    await driver.wait(until.elementIsVisible(lastNameInput), 500)
    await lastNameInput.clear()
    await lastNameInput.sendKeys('User')

    const addressInput = await driver.findElement(By.id('customer.address.street'))
    await driver.wait(until.elementIsVisible(addressInput), 500)
    await addressInput.clear()
    await addressInput.sendKeys('123 Test Street')

    const cityInput = await driver.findElement(By.id('customer.address.city'))
    await driver.wait(until.elementIsVisible(cityInput), 500)
    await cityInput.clear()
    await cityInput.sendKeys('Testville')

    const stateInput = await driver.findElement(By.id('customer.address.state'))
    await driver.wait(until.elementIsVisible(stateInput), 500)
    await stateInput.clear()
    await stateInput.sendKeys('TestState')

    const zipCodeInput = await driver.findElement(By.id('customer.address.zipCode'))
    await driver.wait(until.elementIsVisible(zipCodeInput), 500)
    await zipCodeInput.clear()
    await zipCodeInput.sendKeys('12345')

    const phoneInput = await driver.findElement(By.id('customer.phoneNumber'))
    await driver.wait(until.elementIsVisible(phoneInput), 500)
    await phoneInput.clear()
    await phoneInput.sendKeys('123-456-7890')

    const ssnInput = await driver.findElement(By.id('customer.ssn'))
    await driver.wait(until.elementIsVisible(ssnInput), 500)
    await ssnInput.clear()
    await ssnInput.sendKeys('123-45-6789')

    const usernameInput = await driver.findElement(By.id('customer.username'))
    await driver.wait(until.elementIsVisible(usernameInput), 500)
    await usernameInput.clear()
    await usernameInput.sendKeys('seleniumuser03-')

    const passwordInput = await driver.findElement(By.id('customer.password'))
    await driver.wait(until.elementIsVisible(passwordInput), 500)
    await passwordInput.clear()
    await passwordInput.sendKeys('TestPassword123')

    const confirmPasswordInput = await driver.findElement(By.id('repeatedPassword'))
    await driver.wait(until.elementIsVisible(confirmPasswordInput), 500)
    await confirmPasswordInput.clear()
    await confirmPasswordInput.sendKeys('TestPassword123', Key.ENTER)


    const view = await driver.getPageSource()
    await driver.sleep(1000)
    if (view.includes('Your account was created successfully. You are now logged in')) {
      await driver.findElement(By.linkText('Accounts Overview')).click()
      driver.takeScreenshot().then((img) => {
        fs.writeFile('yl3.png', img, 'base64', (err) => {if (err) console.log(err)})
      })
    }
  } finally {
    await driver.quit()
  }
}

f3()