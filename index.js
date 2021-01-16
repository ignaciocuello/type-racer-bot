const {Builder, By, until} = require('selenium-webdriver');

//TODO: clean this up a little more
(async function runTypeRacerBot() {
    const driver = await new Builder().forBrowser('chrome').build();
    
    await driver.get('https://play.typeracer.com/');
    await enterRace(driver);
    const raceTargetText = await getRaceTargetText(driver);

    console.log(raceTargetText);

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
