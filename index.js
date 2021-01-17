const {Builder, By, until} = require('selenium-webdriver');

(async function runTypeRacerBot() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://play.typeracer.com/');
    await enterRace(driver);
    const raceTargetText = await getRaceTargetText(driver);
    const raceTargetWords = raceTargetText.split(' ');

    const textInput =
      await driver.wait(until.elementLocated(By.css('.txtInput')));
    await driver.wait(until.elementIsEnabled(textInput));

    for (raceTargetWord of raceTargetWords) {
      textInput.sendKeys(raceTargetWord + ' ');
      await textInput.getAttribute('maxlength');
    }

    console.log(raceTargetWords);
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
