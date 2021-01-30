const {Builder, By, until} = require('selenium-webdriver');
const HomePage = require('./pom/HomePage');
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy');

(async function runTypeRacerBot() {
  const options = new chrome.Options();
  //options.addArguments('--proxy-server=http://localhost:8081');
  //options.addArguments('--ignore-ssl-errors=yes');
  //options.addArguments('--ignore-certificate-errors');
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://play.typeracer.com/');
    const homePage = new HomePage(driver);

    await homePage.enterRace(driver);

    const raceTargetText = await getRaceTargetText(driver);
    const raceTargetWords = raceTargetText.split(' ');

    const textInput =
      await driver.wait(until.elementLocated(By.css('.txtInput')));
    await driver.wait(until.elementIsEnabled(textInput));

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    //div.bodyWidgetHolder > table > tbody > tr > td > button.gwt-Button
    for (raceTargetWord of raceTargetWords) {
      textInput.sendKeys(raceTargetWord + ' ');
      await textInput.getAttribute('maxlength');
      await sleep(125);
    }

  } finally {
    //await driver.quit();
  }

  async function getRaceTargetText(driver) {
    const raceTargetTextDivSelector =
      'table.inputPanel > tbody > tr > td > table > tbody > tr > td > div > div';
    const raceTargetTextDiv =
      await driver.wait(until.elementLocated(By.css(raceTargetTextDivSelector)));
    const raceTargetText = await raceTargetTextDiv.getText();
    return raceTargetText;
  }
})();
