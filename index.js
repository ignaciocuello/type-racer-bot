const {Builder, By, until} = require('selenium-webdriver');

//TODO: clean this up
(async function openGoogle() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://play.typeracer.com/');
    try {
      const maxWaitTimeMs = 10000;
      const buttonContainerSelector = '#gwt-uid-1 > a';
      await driver.wait(until.elementLocated(By.css(buttonContainerSelector), maxWaitTimeMs));
      let buttonContainer = await driver.findElement(By.css(buttonContainerSelector));
      await buttonContainer.click();
      const textDivSelector = 'table.inputPanel > tbody > tr > td > table > tbody > tr > td > div > div';

      await driver.wait(until.elementLocated(By.css(textDivSelector), maxWaitTimeMs));
      let textDiv = await driver.findElement(By.css(textDivSelector));

      let text = await textDiv.getText();
      console.log(text);
    } catch (e) {
      console.log(e);
    }
})();
