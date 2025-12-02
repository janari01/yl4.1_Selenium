const { Builder, By, Key, until } = require('selenium-webdriver')
async function f3() {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_submit')
    await driver.manage().setTimeouts({implicit: 5000})
    await driver.switchTo().frame('iframeResult')

    let inputField1 = await driver.findElement(By.id("fname"))
    let inputField2 = await driver.findElement(By.id("lname"))
    await inputField1.clear()
    await inputField1.sendKeys('Janari')
    await inputField2.clear()
    await inputField2.sendKeys('Minu_p2ris_perenimi')

    
    
    let submitButton = await driver.findElement(By.css('input[type="submit"]'))
    await submitButton.click()

    console.log('Vorm on esitatud')
  } finally {
    await driver.quit()
  }
}

f3()