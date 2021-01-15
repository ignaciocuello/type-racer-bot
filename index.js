const {Builder, By, until} = require('selenium-webdriver');

//TODO: clean this up a little more
(async function runTypeRacerBot() {
    const driver = await new Builder().forBrowser('chrome').build();
    
    //Enter a race in type racer, once it loads get the race's target text.
    await driver.get('https://play.typeracer.com/');
    await clickEnterRaceButton(driver);
    const raceTargetText = await getRaceTargetText(driver);

    console.log(raceTargetText);

    async function waitAndFindElement(driver, locator) {
      const maxWaitTimeMs = 10 * 1000;

      await driver.wait(until.elementLocated(locator, maxWaitTimeMs));
      const element = await driver.findElement(locator);

      return element;
    }

    async function clickEnterRaceButton(driver) {
      const enterRaceButtonSelector = '#gwt-uid-1 > a';
      const enterRaceButton =
        await waitAndFindElement(driver, By.css(enterRaceButtonSelector));
      return await enterRaceButton.click();
    }

    async function getRaceTargetText(driver) {
      const raceTargetTextDivSelector =
        'table.inputPanel > tbody > tr > td > table > tbody > tr > td > div > div';
      const raceTargetTextDiv =
        await waitAndFindElement(driver, By.css(raceTargetTextDivSelector));
      const raceTargetText = await raceTargetTextDiv.getText();
      return raceTargetText;
    }
})();
