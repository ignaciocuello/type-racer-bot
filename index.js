const {Builder, By, until} = require('selenium-webdriver');

//TODO: clean this up
(async function runTypeRacerBot() {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://play.typeracer.com/');

    const maxWaitTimeMs = 10 * 1000;

    const enterRaceButtonSelector = '#gwt-uid-1 > a';
    await driver.wait(
      until.elementLocated(By.css(enterRaceButtonSelector), maxWaitTimeMs));
    const enterRaceButton =
      await driver.findElement(By.css(enterRaceButtonSelector));
    await enterRaceButton.click();

    const targetTextDivSelector =
      'table.inputPanel > tbody > tr > td > table > tbody > tr > td > div > div';
    await driver.wait(
      until.elementLocated(By.css(targetTextDivSelector), maxWaitTimeMs));
    const targetTextDiv =
      await driver.findElement(By.css(targetTextDivSelector));
    const targetText = await targetTextDiv.getText();

    console.log(targetText);
})();
