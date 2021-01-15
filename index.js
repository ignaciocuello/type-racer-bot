const {Builder, By, until} = require('selenium-webdriver');

(async function openGoogle() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://play.typeracer.com/');
    try {
      const maxWaitTimeMs = 10000;
      await driver.wait(until.elementLocated(By.id('gwt-uid-1'), maxWaitTimeMs));
      let buttonContainer = await driver.findElement(By.css('#gwt-uid-1 > a'));
      await buttonContainer.click();
      console.log(buttonContainer);
    } catch (e) {
      console.log(e);
    }
})();
