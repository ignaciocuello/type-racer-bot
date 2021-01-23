const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy');

(async function runTypeRacerBot() {
  const options = new chrome.Options();
  options.addArguments('--proxy-server=http://localhost:8081');
  options.addArguments('--ignore-ssl-errors=yes');
  options.addArguments('--ignore-certificate-errors');
  //options.setProxy(proxy.manual({http: 'localhost:8081'}));
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://play.typeracer.com/');
    await enterRace(driver);
    const raceTargetText = await getRaceTargetText(driver);
    const raceTargetWords = raceTargetText.split(' ');

    const textInput =
      await driver.wait(until.elementLocated(By.css('.txtInput')));
    await driver.wait(until.elementIsEnabled(textInput));

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    for (raceTargetWord of raceTargetWords) {
      textInput.sendKeys(raceTargetWord + ' ');
      await textInput.getAttribute('maxlength');
      await sleep(125);
    }

  } finally {
    //await driver.quit();
  }

  async function enterRace(driver) {
    const enterRaceButton =
      await driver.wait(until.elementLocated(By.css('#gwt-uid-1 > a')));
    return await enterRaceButton.click();
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
